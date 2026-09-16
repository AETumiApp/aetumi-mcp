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

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("aetumi-mcp stdio server running (Three.js / WebGL 3D-web expert)");
