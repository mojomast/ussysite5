# SOLARIS // VESPERS (`ussysite5`)

**The Golden Hour Tidepool Sanctuary for the Ussyverse Open-Source Archipelago**

`ussysite5` abandons dark subterranean/industrial tropes in favor of an emotionally resonant, sunlit coastal tidepool and bioluminescent twilight sanctuary built with **Three.js `r186`**, custom GLSL ocean & atmospheric shaders, generative WebAudio Aeolian harp & surf synthesis, and October 2026 web platform standards (CSS `@property`, `linear()` spring physics, and the View Transitions API).

---

## ✨ Concept & Emotional Architecture

- **Four Living Coastal Moods**:
  1. **I. Solaris (17:48 Golden Hour)** — Warm peach and honeyed amber sunlight skimming across mirror-flat turquoise shallows.
  2. **II. Vespers (19:14 Violet Dusk)** — Amethyst and rose-gold twilight as paper lanterns awaken along the travertine piers.
  3. **III. Nocturne (23:02 Bioluminescent Tide)** — Electric cyan dinoflagellates and 80,000 firefly/plankton particles illuminating every ripple under a starry vault.
  4. **IV. Aurora (05:36 Dawn Mist)** — Pale celadon morning mist rising over calm tidepools.
- **Interactive Water Ripples & Wish Lanterns**:
  - Click anywhere on the water to cast expanding physical wave rings that glow with subsurface bioluminescence and sound a crystalline droplet chime.
  - Open **Set Lantern Adrift** to write a personal reflection and release a glowing paper lantern onto the lagoon via `window.SanctuarySDK`.
- **Generative Coastal Soundscape & Aeolian Harp**:
  - Pure procedural WebAudio synthesizer generating breathing ocean surf and plucking each pavilion's signature extended ninth/eleventh chord (`Cmaj9`, `Dm9`, `Em11`, `Fmaj9`, `G6/9`, `Am9`, `Bbmaj9`, `Cm9`, `Dmaj9`, `Ebmaj9`, and the `Cmaj9` Lighthouse Crown).

---

## 🏛️ The Eleven Sanctuary Pavilions (`mojomast`)

| # | Pavilion | Repository | Harmonic Voicing | Sculpture Centerpiece |
|---|----------|------------|------------------|-----------------------|
| **I** | The Astrolabe Pier | [`mojomast/orbitdesktop`](https://github.com/mojomast/orbitdesktop) | `Cmaj9` | Concentric spun-brass armillary rings & floating sea-glass desktop panes |
| **II** | The Silk Lantern Pavilion | [`mojomast/velvetrp`](https://github.com/mojomast/velvetrp) | `Dm9` | Rose-gold & coral silk lanterns breathing above a mirror tidepool |
| **III** | The Aeolian Hydrophone | [`mojomast/jammate`](https://github.com/mojomast/jammate) | `Em11` | Sweeping cedar & brass wind-harp with 11 vibrating harmonic strings |
| **IV** | The Sun-Bleached Amphitheatre | [`mojomast/cocs`](https://github.com/mojomast/cocs) ([`cocs.ussyco.de`](https://cocs.ussyco.de)) | `Fmaj9` | Tiered travertine colosseum arches & rotating sighting rings |
| **V** | The Prismatic Sea-Glass Spire | [`mojomast/cocs-godot`](https://github.com/mojomast/cocs-godot) | `G6/9` | Spiraling cluster of frosted aquamarine & violet sea-glass shards |
| **VI** | The Tidal Lock & Weir | [`mojomast/routetok`](https://github.com/mojomast/routetok) | `Am9` | Interlocking jade & bronze aqueduct sluice gates & token droplets |
| **VII** | The Bioluminescent Beacon Array | [`mojomast/rgbagentflightindicator`](https://github.com/mojomast/rgbagentflightindicator) | `Bbmaj9` | Rotating Fresnel lighthouse lens & 8 orbiting harbor signal buoys |
| **VIII** | The Amber & Mother-of-Pearl Kiln | [`mojomast/mothbake`](https://github.com/mojomast/mothbake) | `Cm9` | Crystallized Baltic amber dodecahedron & Fibonacci nacre spiral |
| **IX** | The Navigator’s Sextant Dock | [`mojomast/warpi`](https://github.com/mojomast/warpi) | `Dmaj9` | Precision brass marine sextant, pendulum arm & sapphire horizon mirror |
| **X** | The Weathervane Conservatory | [`mojomast/hermesdashboard`](https://github.com/mojomast/hermesdashboard) | `Ebmaj9` | Victorian sea-glass rotunda dome & spinning copper anemometer cups |
| **XI** | The Sanctuary Lighthouse & Memory Well | [`mojomast/becomussy`](https://github.com/mojomast/becomussy) | `Cmaj9 Crown` | Five-tiered Memory Stratigraphy rings & sovereign golden lighthouse heart |

---

## 🚀 Quickstart

> **Note on Vendored Three.js (`js/vendor/`)**: `js/vendor/` is listed in `.gitignore` to keep the repository lightweight. Run `npm run setup:vendor` once after cloning to populate Three.js `0.186.0` (`r186`) locally.

```bash
# 1. Populate local Three.js r186 vendor modules (if not already present)
npm run setup:vendor

# 2. Verify syntax, catalog mirrors, and test suite
npm run check:syntax
npm run check:mirrors
npm test

# 3. Launch the SOLARIS // VESPERS server (defaults to http://127.0.0.1:3000)
npm start
```
