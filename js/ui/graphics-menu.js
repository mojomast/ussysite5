/**
 * USSYSITE5 // GRAPHICS & PERFORMANCE PANEL
 *
 * Live, per-feature toggles for the heavy visual systems, plus a Copy button
 * that emits the current effective settings as JSON so they can be shared and
 * turned into defaults. Values route through SanctuarySceneEngine.setGraphics().
 */

export function initGraphicsPanel(engine) {
  const $ = (id) => document.getElementById(id);
  const modal = $('graphics-modal');
  if (!modal || !engine) return null;

  const els = {
    open: $('btn-open-graphics'),
    close: $('btn-close-graphics'),
    copy: $('graphics-copy-btn'),
    reset: $('graphics-reset-btn'),
    fps: $('graphics-fps'),
    renderer: $('graphics-renderer'),
    quality: $('gfx-quality'),
    dpr: $('gfx-dpr'),
    dprVal: $('gfx-dpr-val'),
    particles: $('gfx-particles'),
    pcount: $('gfx-particles-count'),
    pcountVal: $('gfx-particles-count-val'),
    bloom: $('gfx-bloom'),
    cinematic: $('gfx-cinematic'),
    water: $('gfx-water'),
    sky: $('gfx-sky'),
    central: $('gfx-central'),
    pavilions: $('gfx-pavilions'),
    lanterns: $('gfx-lanterns'),
    auto: $('gfx-auto')
  };

  function refresh() {
    const s = engine.getGraphicsSettings?.();
    if (!s) return;
    els.quality.value = s.quality;
    els.dpr.value = String(s.pixelRatio);
    els.dprVal.textContent = Number(s.pixelRatio).toFixed(2);
    els.particles.checked = s.particles;
    els.pcount.value = String(s.particleCount);
    els.pcountVal.textContent = String(s.particleCount);
    els.pcount.disabled = !s.particles;
    els.bloom.checked = s.bloom;
    els.cinematic.checked = s.cinematic;
    els.water.checked = s.water;
    els.sky.checked = s.sky;
    els.central.checked = s.central;
    els.pavilions.checked = s.pavilions;
    els.lanterns.checked = s.lanterns;
    els.auto.checked = s.autoQuality;
    els.fps.textContent = `${s.fps} FPS`;
    const ri = engine.getRendererInfo?.();
    if (ri) {
      els.renderer.textContent =
        `three r${ri.threeRevision} · ${ri.webglVersion}\n` +
        `GPU: ${ri.gpu}\n` +
        `draw calls: ${ri.drawCalls} · triangles: ${Number(ri.triangles).toLocaleString()}\n` +
        `geometries: ${ri.geometries} · textures: ${ri.textures} · programs: ${ri.programs}`;
    }
  }

  const apply = (partial) => { engine.setGraphics(partial); refresh(); };

  els.quality?.addEventListener('change', () => apply({ quality: els.quality.value }));
  els.dpr?.addEventListener('input', () => {
    els.dprVal.textContent = Number(els.dpr.value).toFixed(2);
    apply({ pixelRatio: Number(els.dpr.value) });
  });
  els.particles?.addEventListener('change', () => apply({ particles: els.particles.checked }));
  els.pcount?.addEventListener('input', () => {
    els.pcountVal.textContent = els.pcount.value;
    apply({ particles: true, particleCount: Number(els.pcount.value) });
  });
  els.bloom?.addEventListener('change', () => apply({ bloom: els.bloom.checked }));
  els.cinematic?.addEventListener('change', () => apply({ cinematic: els.cinematic.checked }));
  els.water?.addEventListener('change', () => apply({ water: els.water.checked }));
  els.sky?.addEventListener('change', () => apply({ sky: els.sky.checked }));
  els.central?.addEventListener('change', () => apply({ central: els.central.checked }));
  els.pavilions?.addEventListener('change', () => apply({ pavilions: els.pavilions.checked }));
  els.lanterns?.addEventListener('change', () => apply({ lanterns: els.lanterns.checked }));
  els.auto?.addEventListener('change', () => { engine.autoQualityEnabled = els.auto.checked; refresh(); });

  els.reset?.addEventListener('click', () => {
    engine.autoQualityEnabled = false;
    engine.setGraphics({
      pixelRatio: null, particles: null, particleCount: null, bloom: null, cinematic: null,
      water: true, sky: true, central: true, pavilions: true, lanterns: true
    });
    refresh();
  });

  els.copy?.addEventListener('click', async () => {
    const s = engine.getGraphicsSettings?.() || {};
    const text = JSON.stringify(s, null, 2);
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); ok = true; } catch { ok = false; }
      ta.remove();
    }
    const prev = els.copy.textContent;
    els.copy.textContent = ok ? 'COPIED ✓' : 'COPY FAILED';
    setTimeout(() => { els.copy.textContent = prev; }, 1400);
  });

  const open = () => { modal.hidden = false; refresh(); };
  const close = () => { modal.hidden = true; };
  els.open?.addEventListener('click', open);
  els.close?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) { close(); e.stopPropagation(); }
  }, true);

  // Keep the FPS/stats readout live while open.
  setInterval(() => { if (!modal.hidden) refresh(); }, 600);

  refresh();
  return { open, close, refresh, apply };
}
