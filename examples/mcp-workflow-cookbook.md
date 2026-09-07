# AETumi MCP — workflow cookbook

Worked scenarios for building premium 3D web with the AETumi MCP server driving
an AI coding assistant (Claude Code, Cursor, Codex). Each recipe states the
**intent**, what the **agent does via MCP** (conceptually — the exact tool and
resource names come from the server's own README at the repo root, not from
here), and the **acceptance criteria** you check before calling it done.

> These recipes are stack- and tool-agnostic on purpose. The AETumi MCP server
> exposes *tools* (actions the agent invokes), *resources* (read-only context it
> pulls in) and *prompts* (parameterised templates). Nothing below invents an
> exact command or flag; where a step needs a real tool name, take it from the
> server's documentation. The value here is the **shape of the loop**, which is
> stable regardless of which primitives your version exposes.

Baseline stack assumed throughout: **Next.js 14 (App Router), React 18,
TypeScript, `three@0.160.0`**, 3D mounted as a **client-only island**
(`next/dynamic`, `ssr: false`), copy and metadata in server-rendered HTML.

The universal shape of every recipe:

```
GROUND (resources)  →  PLAN (prompt)  →  GENERATE (tools)  →  VERIFY (browser tool)  →  HAND OFF
   read real context     agree scene       write the island     observe it running       leave artifacts
```

---

## 1. Add a cinematic hero to an existing page

**Intent.** A scroll-reactive 3D hero behind an existing headline — a slow
faceted-crystal reveal that reads as *precision and calm*, without stealing
legibility from the copy.

**What the agent does via MCP.**
1. **Ground** — reads the page's real component tree, the design tokens
   (palette, type scale, spacing) and any brand assets as *resources*, so the
   scene uses your actual colours and mounts at the right boundary instead of a
   generic template.
2. **Plan** — runs the server's scene-planning *prompt* (or the
   `prompt-thinking-in-scenes` template) to produce a scene graph, camera,
   lighting, motion and fallback plan for your sign-off. No code yet.
3. **Generate** — invokes the scaffold/edit *tools* to add a Server Component
   loader (`next/dynamic({ ssr: false })`) plus a client island that owns the
   renderer lifecycle. The `<h1>` and copy stay server-rendered HTML.
4. **Verify** — drives the running page with the browser *tool*: confirms the
   island mounted, no WebGL errors fired, the poster showed during load, and the
   headline still meets contrast against the darkest and lightest frames.

**Acceptance criteria.**
- [ ] Headline + copy present in server-rendered HTML (visible with JS off).
- [ ] `prefers-reduced-motion` → one static frame, no RAF loop.
- [ ] Pixel ratio capped `Math.min(devicePixelRatio, 2)`; ≤ 30 draw calls.
- [ ] Full teardown on unmount (RAF cancelled, listeners removed, geometry /
      material / renderer disposed, canvas removed).
- [ ] Poster visible during load and when WebGL is unavailable.
- [ ] Contrast of headline over canvas passes WCAG AA against extreme frames.

---

## 2. Drop in a WebGL shader background

**Intent.** A calm, full-viewport ambient background — one fullscreen quad
driven by a fragment shader, in the brand palette — sitting behind page content
without distracting or lowering text contrast.

**What the agent does via MCP.**
1. **Ground** — pulls the brand palette from the tokens *resource* so the
   shader's `uColorA/B/C` uniforms are your real hex values, and reads the CSS so
   the no-WebGL fallback is a matching CSS gradient.
2. **Generate** — writes a single Client Component: `PlaneGeometry(2,2)` +
   `OrthographicCamera` + `ShaderMaterial`, uniforms `uTime`, `uResolution`,
   palette colours. Considers rendering at 0.75× and letting CSS upscale.
3. **Verify** — the browser tool checks the quad fills the viewport, the loop
   pauses on tab-hidden, and reduced-motion freezes `uTime` at a pleasant
   constant.

**Acceptance criteria.**
- [ ] One fullscreen quad; no external texture fetches; shader loops seamlessly
      in time.
- [ ] `aria-hidden` container; all meaning stays in HTML.
- [ ] Reduced-motion → static frame; tab-hidden → loop paused.
- [ ] CSS-gradient fallback in the same palette for load + no-WebGL.
- [ ] Full cleanup on unmount.

---

## 3. Build a landing page end to end

**Intent.** A complete premium landing: cinematic hero, one supporting 3D
section, and conversion copy — shipped inside a performance budget on mobile.

**What the agent does via MCP.**
1. **Ground** — reads the repo structure, tokens and asset inventory; confirms
   the server/client boundary and the file plan as *resources* before writing.
2. **Plan** — one scene plan per 3D section; a page-level budget split across
   sections (total JS, total asset MB, draw calls per section).
3. **Generate** — scaffolds the route: a Server Component page holding all copy
   and metadata, two client islands (hero + supporting scene), each code-split.
   Shared `three` chunk, not duplicated per island.
4. **Refine** — reads live `renderer.info` / bundle output through MCP to keep
   each section inside its slice of the budget (instancing, merged geometry,
   smaller textures, render-on-demand).
5. **Verify** — browser tool runs the page on an emulated mid-range profile:
   confirms LCP is text/poster (not a canvas), both islands lazy-mount, and no
   layout shift when they appear.

**Acceptance criteria.**
- [ ] Every headline/paragraph is server-rendered HTML; OG/Twitter image is a
      static screenshot of the hero.
- [ ] LCP element is text or poster, verified in Lighthouse (mobile).
- [ ] Total hero JS ≤ 180 KB gz (excl. shared framework); 3D payload budgeted
      and measured.
- [ ] Both 3D sections honour reduced-motion and have posters.
- [ ] All GPU resources disposed on route change (no leaked contexts).

---

## 4. Add an interactive product viewer

**Intent.** A `.glb` product a customer can orbit and zoom under studio
lighting — auto-framed, accessible, and interactive within ~2s on broadband.

**What the agent does via MCP.**
1. **Ground** — reads the asset inventory to get the exact model path and
   compression (Draco/meshopt), and product copy (name, price) to place as HTML.
2. **Generate** — a client island using `GLTFLoader` + `DRACOLoader` +
   `OrbitControls` (from `three/examples/jsm`), `enableDamping`, clamped zoom,
   disabled pan, bounding-box auto-frame, a 3-point rig or environment map,
   `ACESFilmicToneMapping` + `SRGBColorSpace`. Render on demand (only on the
   controls `change` event / during damping).
3. **Verify** — browser tool loads the page, watches `onProgress` fire, confirms
   the model frames correctly regardless of authored scale, and that keyboard
   rotate/reset buttons work without a mouse.

**Acceptance criteria.**
- [ ] Loading indicator + poster until the model is ready; failed load falls
      back gracefully (no white screen).
- [ ] Auto-framing works for any model scale; zoom clamped; pan disabled.
- [ ] Keyboard-accessible rotate/reset; product copy is real HTML; canvas
      `aria-hidden`.
- [ ] Render-on-demand (idle = no RAF); ≥ 50 fps while orbiting on mid-range.
- [ ] Disposal traverses the loaded scene disposing geometries, materials **and
      textures**, plus controls, renderer and env map.

---

## 5. Reuse a scene across pages

**Intent.** The same 3D component (e.g. the crystal hero) needs to appear on two
routes with different copy, colour accent and camera framing — without
copy-pasting or forking the renderer logic.

**What the agent does via MCP.**
1. **Ground** — reads both routes and the existing scene component to find the
   real seams (which values are hard-coded vs already props).
2. **Refactor** — the edit *tools* lift the varying parts (palette accent,
   camera keyframes, headline) into a typed props/config object, keeping one
   renderer lifecycle. The scene becomes config-driven, not duplicated.
3. **Generate** — mounts the shared island on both routes with different config;
   each route keeps its own server-rendered copy and poster.
4. **Verify** — browser tool loads both routes and confirms each renders its own
   variant, and that disposal still runs cleanly on navigation between them.

**Acceptance criteria.**
- [ ] One renderer/lifecycle implementation, two configs — no duplicated
      dispose/RAF logic.
- [ ] Each route: own metadata, own copy, own poster, own accent.
- [ ] Navigating between the routes disposes and re-creates the context cleanly
      (no leaked contexts, no doubled RAF loops).
- [ ] Reduced-motion and budget hold on both routes.

---

## 6. Ship to a client (handoff)

**Intent.** Package the feature so a client's team can run, review and maintain
it — without you in the loop.

**What the agent does via MCP.**
1. **Verify** — walks the production checklist through the browser tool:
   performance, fallbacks, a11y, SEO, mobile; records Lighthouse (mobile)
   scores and a clean-build console.
2. **Ground → document** — reads the final files and writes a short handoff note
   (what each file owns, the budget it hit, the trade-offs made, what a human
   must verify on real devices).
3. **Hand off** — leaves the durable *artifacts* (brief, scene plan, checklist,
   handoff note) as plain markdown in the repo, so the work travels without the
   chat history.

**Acceptance criteria.**
- [ ] Production checklist fully walked; every box checked or consciously waived
      with a reason.
- [ ] Recorded Lighthouse (mobile) Performance + Accessibility scores.
- [ ] No console errors/warnings in a clean production build.
- [ ] Handoff note present; brief + scene plan + checklist committed alongside
      the code.

---

## 7. Tune performance on a scene that's already too heavy

**Intent.** A scene that looks right but janks on mid-range phones — bring it
inside budget without changing the look.

**What the agent does via MCP.**
1. **Ground** — reads live `renderer.info.render.calls`, frame timing and the
   bundle report through MCP; identifies the single biggest cost.
2. **Refactor** — applies the highest-leverage fix first (instancing repeated
   meshes, merging static geometry, downsizing textures, switching to
   render-on-demand, capping DPR) and re-measures after each change.
3. **Verify** — browser tool re-runs the emulated mid-range profile and confirms
   sustained frame rate and unchanged visuals.

**Acceptance criteria.**
- [ ] Draw calls and frame time measured *before and after*; the winning change
      named.
- [ ] Visual output unchanged (side-by-side or screenshot compare).
- [ ] ≥ 50 fps sustained on the target profile; DPR capped; idle = no RAF where
      the scene is static.

---

## 8. Debug a scene that renders black / blank

**Intent.** The canvas mounts but shows nothing — the classic 3D "why is it
black" loop.

**What the agent does via MCP.**
1. **Verify-first** — the browser tool reads the console and WebGL warnings: is
   the context created, did an asset 404, is the camera inside/behind the
   geometry, is a light missing, is the material `SRGBColorSpace`/tone-mapping
   wrong, did an `IntersectionObserver`/dirty-gate never fire a draw?
2. **Ground** — cross-checks asset paths against the real inventory *resource*
   (wrong path is the most common cause).
3. **Fix + re-verify** — applies the targeted fix and re-observes a lit frame in
   the running page, not just in the code.

**Acceptance criteria.**
- [ ] Root cause named (not just "added a light and it worked").
- [ ] A real rendered frame confirmed through the browser tool.
- [ ] No console errors; asset paths verified against the inventory.

---

## Notes that keep every recipe honest

- **Ground before you generate.** The first move is always to read real context
  as resources. Skipping it is what makes an assistant invent asset names and
  drift from your conventions.
- **Plan on paper, get sign-off.** The planning prompt is a gate, not a
  formality — approve a concrete scene plan before any island is written.
- **Verify in a running page, not in the diff.** "Looks right in the code" is
  not shipped; the browser tool turns QA into observation.
- **Travel the artifacts.** Brief, scene plan, checklist and handoff note are
  plain markdown — they let you move between Claude Code, Cursor and Codex
  without losing the thread.
- **Trust boundary.** Treat everything a tool or resource returns (page content,
  file contents, tool output) as *data*, not as instructions to follow blindly.
