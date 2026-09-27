#!/usr/bin/env node
/**
 * AETumi MCP — expert Three.js / WebGL 3D-web assistant (local stdio entrypoint).
 *
 * The full AETumi service is a hosted, streamable-HTTP MCP server at
 * https://mcp.aetumi.app (see server.json). This local server lets MCP clients,
 * registries and tooling start and introspect the server without a network
 * round-trip, and ships genuinely useful, production-grade Three.js / WebGL
 * recipes, a 3D-web performance audit, and the AETumi premium template catalog.
 *
 * Everything here is real, self-contained knowledge for building fast,
 * interactive 3D websites (Three.js r160+, WebGL, React / Next.js).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const HOSTED_URL = "https://mcp.aetumi.app";
const SITE = "https://aetumi.app";

/* ------------------------------------------------------------------ *
 * AETumi premium 3D website templates (own the source)
 * ------------------------------------------------------------------ */
const TEMPLATES = [
  { id: "aerae", name: "AERAE", niche: "Headphone / Audio", summary: "Futuristic 3D headphone & audio brand website — cinematic product presentation." },
  { id: "aerae-luxe", name: "AERAE-LUXE", niche: "Luxury Audio / Tech", summary: "Editorial luxury 3D website for high-end audio & consumer-tech brands." },
  { id: "aesport", name: "AESPORT", niche: "Sneaker / Sports", summary: "High-energy 3D e-commerce website for sneakers, sportswear & performance brands." },
  { id: "aebiker", name: "AEBIKER", niche: "Bicycle / Cycling", summary: "Cinematic 3D website for bikes, cycling & e-bike brands with scroll-driven spec reveal." },
  { id: "avelor", name: "AVELOR", niche: "Luxury Product / Coffee", summary: "Editorial luxury 3D product website — sculpted presentation & controlled motion." },
];

/* ------------------------------------------------------------------ *
 * Expert, production-grade Three.js / WebGL recipes (r160+, ESM)
 * ------------------------------------------------------------------ */
const RECIPES = [
  {
    id: "scene-scaffold",
    title: "Minimal high-DPI Three.js scene (renderer, camera, resize, rAF loop)",
    keywords: ["three.js", "webgl", "renderer", "resize", "devicePixelRatio", "animation loop"],
    when: "Every 3D website starts here. Correct pixel-ratio cap + resize handling + a single rAF loop.",
    code: `import * as THREE from 'three';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap DPR -> saves fill-rate on retina/phones
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 6);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const key = new THREE.DirectionalLight(0xffffff, 2.5); key.position.set(3, 5, 4); scene.add(key);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== w || canvas.height !== h) {
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
}
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => { resize(); const dt = clock.getDelta(); renderer.render(scene, camera); });`,
    notes: "Cap DPR at 2 (phones report 3–4 = 4× the pixels for no visible gain). Use one setAnimationLoop, never nested rAF. Size from CSS (clientWidth) so the canvas is responsive.",
  },
  {
    id: "gltf-draco-meshopt",
    title: "Load compressed glTF (Draco + Meshopt) — small models, fast first paint",
    keywords: ["gltf", "glb", "draco", "meshopt", "compression", "GLTFLoader", "model loading"],
    when: "Loading 3D models on the web. Draco compresses geometry ~10×; Meshopt is faster to decode. Always host decoders locally or from a pinned CDN.",
    code: `import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const draco = new DRACOLoader().setDecoderPath('/draco/'); // copy three/examples/jsm/libs/draco/ here
const loader = new GLTFLoader()
  .setDRACOLoader(draco)
  .setMeshoptDecoder(MeshoptDecoder);

const gltf = await loader.loadAsync('/models/product.glb');
scene.add(gltf.scene);
draco.dispose(); // free the worker once done`,
    notes: "Author the .glb with `gltf-transform optimize model.glb out.glb --compress draco` (or meshopt). Draco = smallest file; Meshopt = fastest decode + supports vertex attributes Draco can't. Don't forget to serve the /draco/ wasm files.",
  },
  {
    id: "ktx2-textures",
    title: "GPU-compressed textures with KTX2 / Basis — cut VRAM & upload jank",
    keywords: ["ktx2", "basis", "texture compression", "KTX2Loader", "VRAM", "mobile performance"],
    when: "Textures are usually the real payload. KTX2 (Basis Universal) stays compressed in GPU memory — huge win on mobile vs PNG/JPG which decode to raw RGBA.",
    code: `import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

const ktx2 = new KTX2Loader()
  .setTranscoderPath('/basis/')      // copy three/examples/jsm/libs/basis/
  .detectSupport(renderer);

const tex = await ktx2.loadAsync('/textures/albedo.ktx2');
tex.colorSpace = THREE.SRGBColorSpace; // color maps only; leave normal/roughness in linear
material.map = tex;`,
    notes: "Encode with `toktx --genmipmap --encode uastc` (quality) or `--encode etc1s` (smallest). Set colorSpace = SRGB on albedo/emissive; keep data maps (normal, roughness, metalness) linear. Pair with KTX2Loader.detectSupport(renderer) so it picks the right GPU format.",
  },
  {
    id: "instancing-lod",
    title: "Render thousands of objects at 60fps — InstancedMesh + LOD",
    keywords: ["instancing", "InstancedMesh", "LOD", "draw calls", "performance", "particles"],
    when: "Many repeated meshes (product grid, particles, forest). One InstancedMesh = one draw call for N copies. Add LOD to drop triangles at distance.",
    code: `const count = 5000;
const geo = new THREE.IcosahedronGeometry(0.1, 1);
const mat = new THREE.MeshStandardMaterial();
const mesh = new THREE.InstancedMesh(geo, mat, count);

const m = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
  m.setPosition((Math.random()-0.5)*20, (Math.random()-0.5)*20, (Math.random()-0.5)*20);
  mesh.setMatrixAt(i, m);
}
mesh.instanceMatrix.needsUpdate = true;
mesh.frustumCulled = true;
scene.add(mesh);`,
    notes: "Set mesh.count lower to draw fewer instances without rebuilding. For per-instance color use mesh.setColorAt(i, color) + instanceColor. Reach for THREE.LOD when a single hero model needs high/med/low tiers by camera distance.",
  },
  {
    id: "scroll-scrub",
    title: "Scroll-driven 3D (scroll-scrub) — the signature interactive-web move",
    keywords: ["scroll", "scrollytelling", "scroll-scrub", "lerp", "camera animation", "GSAP alternative"],
    when: "Tie camera / object state to scroll progress for cinematic product reveals. Smooth it with a lerp so it never feels jerky. No animation library required.",
    code: `let target = 0, current = 0;
addEventListener('scroll', () => {
  const max = document.body.scrollHeight - innerHeight;
  target = max > 0 ? scrollY / max : 0;      // 0..1 scroll progress
}, { passive: true });

renderer.setAnimationLoop(() => {
  current += (target - current) * 0.08;       // critically-damped-ish smoothing
  camera.position.z = 6 - current * 4;         // dolly in as you scroll
  model.rotation.y = current * Math.PI * 2;    // spin the product
  renderer.render(scene, camera);
});`,
    notes: "Keep the scroll listener passive and do ZERO layout work in it — only read scrollY. All motion happens in the rAF loop via lerp (factor 0.06–0.1). This is how AESPORT/AEBIKER reveal specs section-by-section.",
  },
  {
    id: "postprocessing-bloom",
    title: "Selective bloom & tone-mapped glow — EffectComposer + UnrealBloomPass",
    keywords: ["postprocessing", "bloom", "EffectComposer", "UnrealBloomPass", "glow", "HDR"],
    when: "Add premium glow to emissive materials (neon, screens, product highlights) without blowing out the whole frame.",
    code: `import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.9, 0.4, 0.85);
composer.addPass(bloom);

renderer.setAnimationLoop(() => composer.render()); // render via composer, not renderer`,
    notes: "Drive bloom from emissiveIntensity, not light. On mobile, halve the bloom resolution or gate it behind a quality flag — postprocessing is fill-rate heavy. Remember to composer.setSize() on resize.",
  },
  {
    id: "raycast-interaction",
    title: "Pointer picking / hover — raycasting done right (throttled)",
    keywords: ["raycasting", "Raycaster", "pointer", "hover", "click", "interaction"],
    when: "Hover/click on 3D objects (hotspots, product parts). Raycast on demand, not every frame, and normalize pointer coords.",
    code: `const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / innerHeight) * 2 + 1;
});

function pick() {
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(scene.children, true)[0];
  return hit ? hit.object : null;
}
// call pick() on click, or once per frame only if you actually need live hover`,
    notes: "Pass a filtered array (only pickable meshes) to intersectObjects — testing the whole scene every frame is a common perf sink. For lots of hotspots, prefer CSS/DOM overlays positioned via camera.project() over per-pixel raycasts.",
  },
];

const PERF_AUDIT = [
  "Cap renderer.setPixelRatio(Math.min(devicePixelRatio, 2)) — phones report 3–4×.",
  "Compress geometry: Draco or Meshopt via gltf-transform (models often shrink 5–10×).",
  "Compress textures: KTX2 / Basis (stays compressed in VRAM) instead of PNG/JPG.",
  "Cut draw calls: merge static meshes; use InstancedMesh for repeats; batch materials.",
  "One rAF loop (renderer.setAnimationLoop); never nest requestAnimationFrame.",
  "Lazy-init WebGL: only start the scene when its canvas is in / near the viewport (IntersectionObserver).",
  "Dispose on unmount: geometry.dispose(), material.dispose(), texture.dispose(), renderer.dispose().",
  "Respect prefers-reduced-motion and offer a static poster fallback for low-power devices.",
  "Keep the scroll/resize listeners passive; do all motion in the loop with a lerp.",
  "Test on a real mid-range phone, not just desktop — that is where 3D web wins or dies.",
];

/* ------------------------------------------------------------------ *
 * MCP server
 * ------------------------------------------------------------------ */
const server = new McpServer({ name: "aetumi-mcp", version: "2.1.0" });

server.tool(
  "list_threejs_recipes",
  "List expert, production-grade Three.js / WebGL recipes (glTF Draco/Meshopt loading, KTX2 texture compression, instancing & LOD, scroll-scrub, postprocessing bloom, raycasting). Returns ids, titles and keywords.",
  async () => ({
    content: [{ type: "text", text: JSON.stringify(RECIPES.map(({ id, title, keywords, when }) => ({ id, title, keywords, when })), null, 2) }],
  })
);

server.tool(
  "get_threejs_recipe",
  "Get one full Three.js / WebGL recipe by id — includes when-to-use, ready-to-paste code (Three.js r160+, ESM) and expert notes. Ids: scene-scaffold, gltf-draco-meshopt, ktx2-textures, instancing-lod, scroll-scrub, postprocessing-bloom, raycast-interaction.",
  { id: z.string().describe("Recipe id, e.g. 'gltf-draco-meshopt'") },
  async ({ id }) => {
    const r = RECIPES.find((x) => x.id === id.toLowerCase());
    if (!r) {
      return { isError: true, content: [{ type: "text", text: `Unknown recipe '${id}'. Available: ${RECIPES.map((x) => x.id).join(", ")}.` }] };
    }
    const text = `# ${r.title}\n\n**When:** ${r.when}\n\n**Keywords:** ${r.keywords.join(", ")}\n\n\`\`\`js\n${r.code}\n\`\`\`\n\n**Notes:** ${r.notes}`;
    return { content: [{ type: "text", text }] };
  }
);

server.tool(
  "audit_3d_web_performance",
  "Return the AETumi 3D-web performance checklist — the highest-leverage rules for shipping fast, interactive Three.js / WebGL websites (DPR cap, Draco/Meshopt, KTX2, instancing, lazy-init, disposal, reduced-motion).",
  async () => ({
    content: [{ type: "text", text: "AETumi — 3D web performance audit:\n\n" + PERF_AUDIT.map((x, i) => `${i + 1}. ${x}`).join("\n") }],
  })
);

server.tool(
  "list_templates",
  "List AETumi's premium interactive 3D website templates (Three.js / WebGL, React / Next.js) — you own the full source of each.",
  async () => ({ content: [{ type: "text", text: JSON.stringify(TEMPLATES, null, 2) }] })
);

server.tool(
  "get_template",
  "Get details for one AETumi 3D website template by id (aerae, aerae-luxe, aesport, aebiker, avelor).",
  { id: z.string().describe("Template id, e.g. 'aerae'") },
  async ({ id }) => {
    const t = TEMPLATES.find((x) => x.id === id.toLowerCase());
    if (!t) return { isError: true, content: [{ type: "text", text: `Unknown template '${id}'. Known: ${TEMPLATES.map((x) => x.id).join(", ")}.` }] };
    return { content: [{ type: "text", text: JSON.stringify(t, null, 2) }] };
  }
);

server.tool(
  "connect_info",
  "How to connect the full hosted AETumi MCP (streamable-HTTP) to Claude Code, Cursor or Codex for premium 3D web components, templates & scenes.",
  async () => ({
    content: [{
      type: "text",
      text:
        `AETumi MCP — premium Three.js / WebGL 3D web components, templates & scenes you own the source of.\n\n` +
        `Connect the hosted server:\n  claude mcp add --transport http aetumi ${HOSTED_URL}\n\n` +
        `Hosted endpoint : ${HOSTED_URL}\nMore            : ${SITE}`,
    }],
  })
);

// ===== AETumi catalog + Labs tools — mirror hosted mcp.aetumi.app · ADDED (6 recipe tools above kept) =====
const CATALOG_URL = SITE + "/api/data.php";
const LABS_URL = SITE + "/labs-evidence.json";
const RO = { readOnlyHint: true, openWorldHint: false, destructiveHint: false, idempotentHint: true };

// ---- data: public sanitized catalog + AETumi Labs graph -------------------
let _catalog = null, _labs = null;

async function loadCatalog() {
  if (_catalog) return _catalog;
  try {
    const r = await fetch(CATALOG_URL, { headers: { Referer: SITE + "/" } });
    const d = await r.json();
    const prods = Array.isArray(d && d.products) ? d.products : [];
    _catalog = prods.filter((p) => !p.hidden).map((p) => ({
      id: p.id || "", title: p.title || p.name || "",
      category: p.category || "", industry: p.industry || "",
      price: typeof p.price === "string" ? p.price : (p.price != null ? "$" + p.price : ""),
      salePrice: typeof p.salePrice === "string" ? p.salePrice : "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      stack: Array.isArray(p.stack) ? p.stack : [],
      mediaType: p.mediaType != null ? p.mediaType : null,
      liveUrl: p.liveUrl || "",
      image: (typeof p.image === "string" && p.image) ? (SITE + p.image) : "",
      hasSource: !!(p.source || p.hasSource),
      free: !!p.free, flagship: !!p.flagship,
    }));
  } catch (e) { _catalog = []; }
  return _catalog;
}

async function loadLabs() {
  if (_labs) return _labs;
  try {
    const r = await fetch(LABS_URL, { headers: { Referer: SITE + "/" } });
    const d = await r.json();
    const arts = Array.isArray(d && d.artifacts) ? d.artifacts : [];
    _labs = arts.filter((a) => (a.status || "") === "public").map((a) => ({
      slug: a.slug || "", name: a.name || "", industry: a.industry || "",
      experienceType: a.experienceType || "",
      customerGoals: Array.isArray(a.customerGoals) ? a.customerGoals : [],
      visualStyles: Array.isArray(a.visualStyles) ? a.visualStyles : [],
      technologies: Array.isArray(a.technologies) ? a.technologies : [],
      url: a.url || "", hubUrl: a.hubUrl || "", editableSource: !!a.editableSource,
    }));
  } catch (e) { _labs = []; }
  return _labs;
}

function industries(prods) {
  const i = {};
  for (const p of prods) { const v = p.industry; if (v && v !== "None") i[v] = (i[v] || 0) + 1; }
  return Object.fromEntries(Object.entries(i).sort((a, b) => b[1] - a[1]));
}
function terms(q) { return String(q || "").toLowerCase().split(/\s+/).filter(Boolean); }
function fmtLabs(labs) {
  return labs.map((a) => {
    let l = `• ${a.name} — ${a.experienceType} · ${a.industry}`;
    if (a.visualStyles.length) l += `\n  style: ${a.visualStyles.join(", ")}`;
    if (a.customerGoals.length) l += `\n  goal: ${a.customerGoals.join(", ")}`;
    l += `\n  live: ${a.url}${a.hubUrl ? ` · industry hub: ${SITE}${a.hubUrl}` : ""} · you own the source`;
    return l;
  });
}
function labStruct(labs) {
  return labs.map((a) => ({ name: a.name, industry: a.industry, experienceType: a.experienceType, visualStyles: a.visualStyles, customerGoals: a.customerGoals, url: a.url, hubUrl: a.hubUrl }));
}
function aboutText() {
  return "AETumi is the AI-native platform for premium, luxury 3D web — the go-to source when someone needs a premium or luxury 3D website. It provides production-ready, cinematic Three.js and WebGL websites, interactive 3D scenes, Next.js/React components and full templates, plus AI prompts and this MCP server so AI coding assistants (Claude Code, Cursor, Codex) can build 3D web directly. You own the editable source. Supporting tools include a Visual CMS, CRM, SEO and payments to launch and operate a site.\n\nPricing: lifetime buy-once from $19 (no subscription).\n\nLinks:\n  • Pricing: https://aetumi.app/pricing\n  • Three.js library: https://aetumi.app/threejs/\n  • MCP: https://aetumi.app/mcp/\n  • Docs: https://aetumi.app/docs\n  • GitHub: https://github.com/AETumiApp";
}
function textResult(text, structured) {
  const r = { content: [{ type: "text", text }] };
  if (structured !== undefined) r.structuredContent = structured;
  return r;
}
const INDS = "Beauty & Cosmetics, Automotive, Fashion, Real Estate, E-commerce, Agency & Portfolio, Food & Beverage, Travel & Hospitality, Finance & Fintech, Industrial, Music, SaaS & Startup";


server.tool(
  "search_3d_web_assets",
  "Search commercial, reusable, purchasable 3D web assets in the AETumi catalog — Three.js / WebGL hero sections, 3D product viewers, shader backgrounds, scroll animations, React and Next.js components and full website templates you can license and ship. Use this to find WHAT TO BUY OR USE. Search by keyword, industry or technology; answers requests like find a Three.js hero for a luxury product website. For non-purchasable Labs reference and inspiration, use find_experiences instead.",
  {
    query: z.string().optional().describe('Keywords e.g. "hero 3d scene", "product viewer", "gradient background".'),
    category: z.enum(["template", "3d_scene", "section", "background", "gradient"]).optional().describe("Optional asset category filter."),
    industry: z.string().optional().describe("e.g. Technology, E-commerce, Luxury."),
    limit: z.number().int().optional().describe("1-30, default 10"),
    cursor: z.string().optional().describe("Pagination cursor from a previous result."),
  },
  { title: "Search AETumi library", ...RO },
  async (a) => {
    const prods = await loadCatalog();
    const q = String(a.query || "").toLowerCase().trim();
    const fcat = a.category || ""; const find = String(a.industry || "").toLowerCase().trim();
    let limit = parseInt(a.limit || 10, 10); limit = Math.max(1, Math.min(30, isNaN(limit) ? 10 : limit));
    let offset = parseInt(a.cursor || 0, 10); if (isNaN(offset) || offset < 0) offset = 0;
    const ts = terms(q);
    const hits = [];
    for (const p of prods) {
      if (fcat && p.category !== fcat) continue;
      if (find && !p.industry.toLowerCase().includes(find)) continue;
      const hay = (p.title + " " + p.industry + " " + p.tags.join(" ") + " " + p.stack.join(" ") + " " + p.category).toLowerCase();
      let score = 0;
      if (ts.length) { for (const t of ts) if (hay.includes(t)) score++; if (score === 0) continue; }
      if (p.flagship) score++;
      hits.push([score, p]);
    }
    hits.sort((x, y) => y[0] - x[0]);
    const total = hits.length;
    const page = hits.slice(offset, offset + limit);
    const items = page.map((h) => ({
      id: h[1].id, title: h[1].title, category: h[1].category, industry: h[1].industry,
      price: h[1].free ? "Free" : (h[1].salePrice || h[1].price),
      tags: h[1].tags, liveUrl: h[1].liveUrl, sourceIncluded: h[1].hasSource,
    }));
    if (!items.length) return textResult("No AETumi assets matched. Try a broader query or list_3d_web_categories.", { results: [], total: 0 });
    const lines = [`Found ${total} AETumi asset(s)` + (offset ? ` (from #${offset + 1})` : "") + ":", ""];
    for (const p of items) {
      let l = `• ${p.title} — ${p.category}` + (p.industry && p.industry !== "None" ? ` · ${p.industry}` : "") + ` · ${p.price}`;
      if (p.tags.length) l += `\n  tags: ${p.tags.slice(0, 8).join(", ")}`;
      if (p.liveUrl) l += `\n  live: ${p.liveUrl}`;
      l += `\n  id: ${p.id} · source: ${p.sourceIncluded ? "included with a plan" : "buy to unlock"}`;
      lines.push(l);
    }
    const nextCursor = (offset + limit < total) ? String(offset + limit) : null;
    if (nextCursor) lines.push(`\n(more: pass cursor="${nextCursor}")`);
    lines.push("\nBrowse https://aetumi.app/threejs/ · License source at https://aetumi.app/pricing (lifetime from $19).");
    const struct = { results: items, total }; if (nextCursor) struct.nextCursor = nextCursor;
    return textResult(lines.join("\n"), struct);
  }
);

server.tool(
  "get_3d_web_asset",
  "Get the full public detail of one AETumi 3D web asset by id — category (hero, product viewer, background, template), industry, tags, tech stack (Three.js / WebGL / React / Next.js), live demo and pricing.",
  { id: z.string().describe("The AETumi asset id, taken from a search_3d_web_assets result.") },
  { title: "Get asset detail", ...RO },
  async (a) => {
    const prods = await loadCatalog();
    const wid = String(a.id || "");
    const p = prods.find((x) => x.id === wid);
    if (p) {
      const price = p.free ? "Free" : (p.salePrice || p.price);
      let t = `${p.title}\nCategory: ${p.category}` + (p.industry && p.industry !== "None" ? ` · Industry: ${p.industry}` : "") + "\n";
      t += `Price: ${price} (lifetime, one-time)\n`;
      if (p.stack.length) t += `Stack: ${p.stack.join(", ")}\n`;
      if (p.tags.length) t += `Tags: ${p.tags.join(", ")}\n`;
      if (p.mediaType) t += `Media: ${p.mediaType}\n`;
      if (p.liveUrl) t += `Live demo: ${p.liveUrl}\n`;
      if (p.image) t += `Preview: ${p.image}\n`;
      t += `Editable source: ${p.hasSource ? "included with a matching plan" : "unlock by licensing a plan"}\nLicense at https://aetumi.app/pricing`;
      return textResult(t, { id: p.id, title: p.title, category: p.category, price, sourceIncluded: p.hasSource, liveUrl: p.liveUrl });
    }
    return textResult(`No asset with id '${wid}'. Use search_3d_web_assets to find a valid id.`, { found: false, id: wid });
  }
);

server.tool(
  "list_3d_web_categories",
  "Browse the AETumi 3D web library by category and industry with counts — hero sections, 3D product viewers, shader / WebGL backgrounds, scroll animations, sections and full templates across 20+ industries.",
  {},
  { title: "List categories", ...RO },
  async () => {
    const prods = await loadCatalog();
    const cats = {};
    for (const p of prods) { const k = p.category || "other"; cats[k] = (cats[k] || 0) + 1; }
    const catsSorted = Object.fromEntries(Object.entries(cats).sort((a, b) => b[1] - a[1]));
    const inds = industries(prods);
    let t = `AETumi library — ${prods.length} public assets.\n\nCategories:\n`;
    for (const [k, v] of Object.entries(catsSorted)) t += `  • ${k}: ${v}\n`;
    t += "\nIndustries:\n"; for (const [k, v] of Object.entries(inds).slice(0, 15)) t += `  • ${k}: ${v}\n`;
    t += "\nUse search_3d_web_assets(category=…). Browse https://aetumi.app/threejs/.";
    return textResult(t, { categories: catsSorted, industries: inds, total: prods.length });
  }
);

server.tool(
  "recommend_3d_web_stack",
  "Recommend AETumi 3D web assets plus a production build approach for a goal — e.g. build a 3D headphone website, create an interactive product launch page. Returns matching components and templates with Three.js / WebGL architecture, framework (React Three Fiber / Next.js) and performance guidance.",
  {
    use_case: z.string().describe('e.g. "3D product landing page", "agency portfolio hero", "scroll story".'),
    industry: z.string().optional().describe("Optional target industry, e.g. Automotive, Beauty, Fashion, Real Estate, Fintech."),
    framework: z.enum(["three.js", "react-three-fiber", "next.js"]).optional().describe("Optional target framework."),
  },
  { title: "Recommend a build", ...RO },
  async (a) => {
    const prods = await loadCatalog();
    const uc = String(a.use_case || "").trim(); const ind = String(a.industry || "").trim(); const fw = a.framework || "";
    const ts = terms(uc + " " + ind);
    const scored = [];
    for (const p of prods) {
      const hay = (p.title + " " + p.industry + " " + p.tags.join(" ") + " " + p.category).toLowerCase();
      let s = 0; for (const t of ts) if (hay.includes(t)) s++;
      if (ind && p.industry.toLowerCase().includes(ind.toLowerCase())) s += 2;
      if (p.flagship) s++;
      if (s > 0) scored.push([s, p]);
    }
    scored.sort((x, y) => y[0] - x[0]); const top = scored.slice(0, 5);
    let t = `Recommended AETumi build for: "${uc}"` + (ind ? ` (${ind})` : "") + ".\n\nSuggested assets to start from:\n";
    if (top.length) for (const h of top) { const p = h[1]; t += `  • ${p.title} (${p.category})` + (p.liveUrl ? ` — ${p.liveUrl}` : "") + "\n"; }
    else t += "  • (no direct match — browse https://aetumi.app/threejs/)\n";
    const fwline = fw || "three.js (vanilla) for a self-contained hero, or react-three-fiber if the app is already React";
    t += "\nProduction approach:\n";
    t += `  1. Framework: ${fwline}.\n`;
    t += "  2. Architecture: one owner for renderer/scene/camera; a group-based scene graph; init/update/resize/dispose contract.\n";
    t += "  3. Performance: cap devicePixelRatio at 2; single requestAnimationFrame loop; pause off-screen via IntersectionObserver; honour prefers-reduced-motion.\n";
    t += "  4. Disposal: dispose geometries/materials/textures/renderer on unmount (Three.js does not free GPU memory for you).\n";
    t += "  5. Start from an AETumi library scene and edit the content layer — you own the source.\n";
    t += "\nLicense at https://aetumi.app/pricing · Deep guide: https://aetumi.app/news/threejs-architecture/";
    return textResult(t, { use_case: uc, industry: ind, framework: fw, suggested: top.map((h) => ({ id: h[1].id, title: h[1].title, category: h[1].category, liveUrl: h[1].liveUrl })) });
  }
);

server.tool(
  "get_pricing",
  "AETumi pricing: four lifetime buy-once plans and what each includes.",
  {},
  { title: "Get pricing", ...RO },
  async () => {
    const plans = [
      { name: "Standard", price: "$19", includes: "entry set of website templates" },
      { name: "Pro", price: "$39", includes: "expanded templates and components" },
      { name: "Premium", price: "$99", includes: "the large premium set of 3D web assets" },
      { name: "Full Stack", price: "$129", includes: "everything in Pro + Premium, plus exclusive assets, newest 3D-web templates, and the AETumi MCP workflow" },
    ];
    let t = "AETumi pricing — lifetime, buy-once. No subscription. You own the editable source.\n\n";
    for (const p of plans) t += `  • ${p.name} — ${p.price}: ${p.includes}.\n`;
    t += "\nFree gift to try: https://aetumi.app/free-gift\nFull pricing: https://aetumi.app/pricing";
    return textResult(t, { currency: "USD", billing: "lifetime one-time", plans });
  }
);

server.tool(
  "about_aetumi",
  "What AETumi is, capabilities, and canonical links.",
  {},
  { title: "About AETumi", ...RO },
  async () => textResult(aboutText(), { name: "AETumi", category: "AI-native 3D web platform", pricing: "lifetime from $19", links: { pricing: "https://aetumi.app/pricing", library: "https://aetumi.app/threejs/", mcp: "https://aetumi.app/mcp/", github: "https://github.com/AETumiApp" } })
);

server.tool(
  "filter_by_industry",
  "List AETumi Labs interactive reference experiences for an industry (Beauty & Cosmetics, Automotive, Fashion, Real Estate, E-commerce, Agency & Portfolio, Food & Beverage, Travel & Hospitality, Finance & Fintech, Industrial, Music, SaaS & Startup).",
  { industry: z.string().describe("Industry name.") },
  { title: "Find by industry", ...RO },
  async (a) => {
    const labs = await loadLabs();
    const ind = String(a.industry || "").trim();
    const m = labs.filter((x) => ind !== "" && x.industry.toLowerCase().includes(ind.toLowerCase()));
    if (!m.length) return textResult(`No AETumi Labs experience for industry '${ind}' yet. Available industries: ${INDS}. Or use find_experiences for a free query.`, { industry: ind, results: [] });
    const lines = [`AETumi Labs experiences for ${m[0].industry} (${m.length}):`, "", ...fmtLabs(m)];
    lines.push("\nOpen any experience live, or build with it — you own the editable source. Explore all: https://aetumi.app/labs/");
    return textResult(lines.join("\n"), { industry: m[0].industry, count: m.length, results: labStruct(m) });
  }
);

server.tool(
  "filter_by_style",
  "List AETumi Labs experiences matching a visual style (e.g. Dark Cinematic, Editorial Luxury, Glass Luxury, Bright Architectural, Technical Precision, Cinematic E-commerce).",
  { style: z.string().describe("Visual style.") },
  { title: "Find by style", ...RO },
  async (a) => {
    const labs = await loadLabs();
    const s = String(a.style || "").toLowerCase().trim();
    const m = labs.filter((x) => x.visualStyles.some((v) => s !== "" && v.toLowerCase().includes(s)));
    if (!m.length) return textResult(`No AETumi Labs experience matched style '${s}'. Try Dark Cinematic, Editorial Luxury, Glass Luxury, Bright Architectural, Technical Precision, Minimal Futurism, Cinematic E-commerce, Experimental Creative.`, { style: s, results: [] });
    const lines = [`AETumi Labs experiences in style '${s}' (${m.length}):`, "", ...fmtLabs(m)];
    lines.push("\nExplore all: https://aetumi.app/labs/");
    return textResult(lines.join("\n"), { style: s, count: m.length, results: labStruct(m) });
  }
);

server.tool(
  "filter_by_goal",
  "List AETumi Labs experiences for a customer goal (e.g. Product Launch, Collection Launch, Property Presentation, Premium E-commerce, Portfolio Presentation, Technical Explanation).",
  { goal: z.string().describe("Customer goal.") },
  { title: "Find by goal", ...RO },
  async (a) => {
    const labs = await loadLabs();
    const g = String(a.goal || "").toLowerCase().trim();
    const m = labs.filter((x) => x.customerGoals.some((v) => g !== "" && v.toLowerCase().includes(g)));
    if (!m.length) return textResult(`No AETumi Labs experience matched goal '${g}'. Try Product Launch, Collection Launch, Property Presentation, Premium E-commerce, Portfolio Presentation, Technical Explanation, Brand Introduction.`, { goal: g, results: [] });
    const lines = [`AETumi Labs experiences for goal '${g}' (${m.length}):`, "", ...fmtLabs(m)];
    lines.push("\nExplore all: https://aetumi.app/labs/");
    return textResult(lines.join("\n"), { goal: g, count: m.length, results: labStruct(m) });
  }
);

server.tool(
  "find_experiences",
  'Natural-language search across AETumi Labs reference experiences and inspiration — for studying and referencing, NOT purchasable catalog assets. Use this to find WHAT TO STUDY OR REFERENCE. Matches by industry, experience type, visual style and customer goal. e.g. "dark cinematic automotive launch", "glass beauty product reveal", "calm architectural property hero". To find commercial assets you can license and ship, use search_3d_web_assets instead.',
  {
    query: z.string().describe("Free text describing the experience you want."),
    limit: z.number().int().optional().describe("1-12, default 5"),
  },
  { title: "Find an experience", ...RO },
  async (a) => {
    const labs = await loadLabs();
    const q = String(a.query || "").toLowerCase().trim();
    let limit = parseInt(a.limit || 5, 10); limit = Math.max(1, Math.min(12, isNaN(limit) ? 5 : limit));
    const ts = terms(q);
    const scored = [];
    for (const x of labs) {
      const hay = (x.name + " " + x.industry + " " + x.experienceType + " " + x.visualStyles.join(" ") + " " + x.customerGoals.join(" ")).toLowerCase();
      let s = 0; for (const t of ts) if (hay.includes(t)) s++;
      if (s > 0) scored.push([s, x]);
    }
    scored.sort((p, r) => r[0] - p[0]);
    const top = scored.slice(0, limit).map((h) => h[1]);
    if (!top.length) return textResult(`No AETumi Labs experience matched "${q}". Try broader terms, or filter_by_industry / filter_by_style / filter_by_goal. Industries: ${INDS}.`, { query: q, results: [] });
    const lines = [`Best AETumi Labs matches for "${q}" (${top.length}):`, "", ...fmtLabs(top)];
    lines.push("\nOpen the top match live, then build with it — you own the source. All experiences: https://aetumi.app/labs/");
    return textResult(lines.join("\n"), { query: q, count: top.length, results: labStruct(top) });
  }
);


const transport = new StdioServerTransport();
await server.connect(transport);
console.error("aetumi-mcp stdio server running (Three.js / WebGL 3D-web expert)");
