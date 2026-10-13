/**
 * USSYSITE5 // SOLARIS — VESPERS
 * MAIN APPLICATION CONTROLLER
 *
 * Connects:
 * - `SanctuarySceneEngine` (Three.js r186 3D Golden Hour Tidepool Sanctuary)
 * - `SanctuaryAudioSynth` (Procedural Ocean Surf, Aeolian Harp & Water Ripple Chime)
 * - `SanctuarySDK` (`window.SanctuarySDK` & `window.AnomalySDK` compatibility)
 * - View Transitions API + Spring-Damped Glassmorphic Tidepool Field Journal UI
 */

import { SANCTUARY_META, USSY_PROJECTS, getProjectById } from './projects.js';
import { SanctuarySceneEngine } from './engine/scene.js';
import { SanctuaryAudioSynth } from './engine/audio-synth.js';
import { SanctuarySDK } from './tide/sanctuary-sdk.js';

function withViewTransition(updateFn) {
  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(() => updateFn());
  } else {
    updateFn();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sanctuary-canvas');
  const welcomeCard = document.getElementById('sanctuary-welcome-card');
  const welcomeTimecode = document.getElementById('welcome-timecode');
  const rippleCounterBadge = document.getElementById('ripple-counter-badge');
  const moodPoemBanner = document.getElementById('mood-poem-banner');
  const compassDock = document.getElementById('compass-dock');

  // Journal Drawer Elements
  const journalDrawer = document.getElementById('pavilion-journal');
  const journalRoman = document.getElementById('journal-roman');
  const journalZone = document.getElementById('journal-zone');
  const journalCategory = document.getElementById('journal-category');
  const journalTitle = document.getElementById('journal-title');
  const journalPavilionName = document.getElementById('journal-pavilion-name');
  const journalReflection = document.getElementById('journal-reflection');
  const journalFieldnote = document.getElementById('journal-fieldnote');
  const journalRepoLink = document.getElementById('journal-repo-link');
  const journalLiveLink = document.getElementById('journal-live-link');
  const journalHarmonicSig = document.getElementById('journal-harmonic-sig');
  const journalMetrics = document.getElementById('journal-metrics');
  const journalOverview = document.getElementById('journal-overview');
  const journalArchList = document.getElementById('journal-arch-list');
  const journalCapabilities = document.getElementById('journal-capabilities');
  const journalTechTags = document.getElementById('journal-tech-tags');
  const journalTerminal = document.getElementById('journal-terminal');

  // Hover Tooltip
  const tooltip = document.getElementById('pavilion-tooltip');
  const tooltipRoman = document.getElementById('tooltip-roman');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipPavilion = document.getElementById('tooltip-pavilion');

  // Wish Lantern Modal
  const lanternModal = document.getElementById('lantern-modal');
  const lanternForm = document.getElementById('lantern-form');
  const lanternInput = document.getElementById('lantern-input');
  const lanternRecentList = document.getElementById('lantern-recent-list');

  // Initialize SDKs & Synth
  const sdk = new SanctuarySDK();
  window.SanctuarySDK = sdk;
  window.AnomalySDK = sdk; // Backwards-compatible global hook

  const audioSynth = new SanctuaryAudioSynth();
  let currentProject = null;
  let pointerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  window.addEventListener('pointermove', (e) => {
    pointerPos.x = e.clientX;
    pointerPos.y = e.clientY;
    if (!tooltip.hidden) {
      tooltip.style.left = `${pointerPos.x}px`;
      tooltip.style.top = `${pointerPos.y}px`;
    }
  });

  // Initialize 3D Sanctuary Scene Engine
  const sceneEngine = new SanctuarySceneEngine({
    canvas,
    onPavilionSelect: (projectId) => selectPavilion(projectId),
    onPavilionHover: (project) => {
      if (!project) {
        tooltip.hidden = true;
        return;
      }
      tooltipRoman.textContent = project.Roman;
      tooltipTitle.textContent = project.title;
      tooltipPavilion.textContent = project.pavilionTitle;
      tooltip.style.left = `${pointerPos.x}px`;
      tooltip.style.top = `${pointerPos.y}px`;
      tooltip.hidden = false;
    },
    onWaterRipple: () => {
      sdk.recordRipple();
      audioSynth.playWaterRippleChime();
      updateCountersBadge();
    }
  });

  // Build Bottom Compass Dock Pills for all 11 Repositories
  function renderCompassDock() {
    compassDock.innerHTML = '';
    for (const proj of USSY_PROJECTS) {
      const btn = document.createElement('button');
      btn.className = 'compass-pill';
      btn.dataset.projectId = proj.id;
      btn.style.setProperty('--pill-color', proj.accentHex);
      btn.innerHTML = `
        <span class="compass-roman">${proj.Roman}</span>
        <span>${proj.title}</span>
      `;
      btn.addEventListener('click', () => selectPavilion(proj.id));
      compassDock.appendChild(btn);
    }
  }

  function updateCountersBadge() {
    const st = sdk.getState();
    const lanternsCount = st.lanterns?.length || 1;
    const ripplesCount = st.counters?.ripplesCast || 0;
    rippleCounterBadge.textContent =
      ripplesCount > 0
        ? `${lanternsCount} Lanterns · ${ripplesCount} Ripples`
        : `${lanternsCount} Wish Lantern${lanternsCount === 1 ? '' : 's'} Adrift`;
  }

  function populateJournal(project) {
    document.documentElement.style.setProperty('--pavilion-accent', project.accentHex);
    document.documentElement.style.setProperty('--pavilion-secondary', project.secondaryHex);

    journalRoman.textContent = project.Roman;
    journalZone.textContent = project.tideZone;
    journalCategory.textContent = project.category;
    journalTitle.textContent = project.title;
    journalPavilionName.textContent = `${project.pavilionTitle} — ${project.subtitle}`;
    journalReflection.textContent = `“${project.emotionalReflection}”`;
    journalFieldnote.textContent = `Sculpture Note: ${project.fieldNote}`;

    journalRepoLink.href = project.repoUrl;
    if (project.liveUrl) {
      journalLiveLink.href = project.liveUrl;
      journalLiveLink.hidden = false;
    } else {
      journalLiveLink.hidden = true;
    }

    journalHarmonicSig.textContent = project.harmonicSignature.split('//')[0].trim();

    // Metrics
    journalMetrics.innerHTML = project.metrics
      .map(
        (m) => `
        <div class="metric-card">
          <span class="metric-label">${m.label}</span>
          <span class="metric-val">${m.value}</span>
        </div>
      `
      )
      .join('');

    journalOverview.textContent = project.overview;

    journalArchList.innerHTML = project.architecture
      .map((item) => `<li>${item}</li>`)
      .join('');

    journalCapabilities.innerHTML = project.verifiedCapabilities
      .map((cap) => `<div class="cap-chip">${cap}</div>`)
      .join('');

    journalTechTags.innerHTML = project.techStack
      .map((t) => `<span class="tech-pill">${t}</span>`)
      .join('');

    journalTerminal.textContent = project.terminalStream.join('\n');
  }

  function selectPavilion(projectId, updateHash = true) {
    const project = getProjectById(projectId);
    if (!project) {
      closeJournal();
      return;
    }

    currentProject = project;
    sceneEngine.focusProject(project.id);
    sdk.recordPavilionVisit(project.id);
    audioSynth.playPavilionChord(project.chordNotes);

    withViewTransition(() => {
      populateJournal(project);
      journalDrawer.classList.add('is-open');
      journalDrawer.setAttribute('aria-hidden', 'false');
      welcomeCard.classList.add('is-minimized');

      document.querySelectorAll('.compass-pill').forEach((pill) => {
        pill.classList.toggle('is-active', pill.dataset.projectId === project.id);
      });

      document.querySelectorAll('.cam-btn').forEach((btn) => {
        btn.classList.remove('is-active');
      });
    });

    if (updateHash) {
      history.replaceState(null, '', `#${project.id}`);
    }
  }

  function closeJournal(mode = 'skiff') {
    currentProject = null;
    sceneEngine.setCameraMode(mode);

    withViewTransition(() => {
      journalDrawer.classList.remove('is-open');
      journalDrawer.setAttribute('aria-hidden', 'true');
      welcomeCard.classList.remove('is-minimized');

      document.querySelectorAll('.compass-pill').forEach((pill) => {
        pill.classList.remove('is-active');
      });

      document.querySelectorAll('.cam-btn').forEach((btn) => {
        btn.classList.toggle('is-active', btn.dataset.cam === mode);
      });
    });

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  // Mood Switcher Controls
  document.querySelectorAll('.mood-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const moodId = btn.dataset.mood;
      const moodObj = sceneEngine.setMood(moodId);
      sdk.setMood(moodId);

      document.documentElement.dataset.mood = moodId;
      moodPoemBanner.textContent = moodObj.poem;
      welcomeTimecode.textContent = `${moodObj.timeCode} // 11 PAVILIONS`;

      document.querySelectorAll('.mood-btn').forEach((b) => {
        b.classList.toggle('is-active', b.dataset.mood === moodId);
      });

      audioSynth.playWaterRippleChime(1.1);
    });
  });

  // Camera Mode Switcher
  document.querySelectorAll('.cam-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const camMode = btn.dataset.cam;
      closeJournal(camMode);
    });
  });

  // Home / Brand Button
  document.getElementById('btn-home-sanctuary').addEventListener('click', () => {
    closeJournal('skiff');
  });

  // Begin Pilgrimage CTA
  document.getElementById('btn-begin-pilgrimage').addEventListener('click', () => {
    selectPavilion(USSY_PROJECTS[0].id);
  });

  // Tide Swell Slider
  const tideSlider = document.getElementById('tide-swell-slider');
  tideSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    sceneEngine.setTideSwell(val);
    sdk.setTideLevel(val);
  });

  // Journal Navigation Buttons
  document.getElementById('btn-close-journal').addEventListener('click', () => {
    closeJournal('skiff');
  });

  document.getElementById('btn-prev-pavilion').addEventListener('click', () => {
    if (!currentProject) return;
    const idx = USSY_PROJECTS.findIndex((p) => p.id === currentProject.id);
    const prevIdx = (idx - 1 + USSY_PROJECTS.length) % USSY_PROJECTS.length;
    selectPavilion(USSY_PROJECTS[prevIdx].id);
  });

  document.getElementById('btn-next-pavilion').addEventListener('click', () => {
    if (!currentProject) return;
    const idx = USSY_PROJECTS.findIndex((p) => p.id === currentProject.id);
    const nextIdx = (idx + 1) % USSY_PROJECTS.length;
    selectPavilion(USSY_PROJECTS[nextIdx].id);
  });

  // Pluck Pavilion Chord Button
  document.getElementById('btn-pluck-chord').addEventListener('click', () => {
    if (!audioSynth.enabled) {
      toggleAudio(true);
    } else if (currentProject) {
      audioSynth.playPavilionChord(currentProject.chordNotes);
    }
  });

  // Audio Toggle Button
  const audioBtn = document.getElementById('btn-audio-toggle');
  const audioLabel = document.getElementById('audio-label');

  function toggleAudio(force) {
    const active = audioSynth.toggle(force);
    audioBtn.setAttribute('aria-pressed', String(active));
    audioLabel.textContent = active ? 'Tide Chimes Singing' : 'Awaken Tide Chimes';
    if (active && currentProject) {
      audioSynth.playPavilionChord(currentProject.chordNotes);
    }
  }

  audioBtn.addEventListener('click', () => toggleAudio());

  // Wish Lantern Modal
  function renderRecentLanterns() {
    const lanterns = sdk.getState().lanterns || [];
    lanternRecentList.innerHTML = lanterns
      .slice(0, 5)
      .map((l) => `<div class="lantern-note-item">✦ “${l.reflection}”</div>`)
      .join('');
  }

  document.getElementById('btn-open-lantern').addEventListener('click', () => {
    renderRecentLanterns();
    lanternModal.hidden = false;
    lanternInput.focus();
  });

  document.getElementById('btn-close-lantern-modal').addEventListener('click', () => {
    lanternModal.hidden = true;
  });

  lanternForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = lanternInput.value.trim();
    if (!text) return;
    sdk.releaseWishLantern(text, currentProject?.id || 'becomussy');
    sceneEngine.spawnFloatingLantern(
      Math.random() * Math.PI * 2,
      20 + Math.random() * 20,
      currentProject?.accentHex || '#fda4af'
    );
    audioSynth.playWaterRippleChime(1.25);
    lanternInput.value = '';
    renderRecentLanterns();
    updateCountersBadge();
    setTimeout(() => {
      lanternModal.hidden = true;
    }, 550);
  });

  // Keyboard Navigation (`ArrowLeft`, `ArrowRight`, `Escape`, `1..9`, `0`, `-`)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

    if (e.key === 'Escape') {
      if (!lanternModal.hidden) {
        lanternModal.hidden = true;
      } else {
        closeJournal('skiff');
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      const idx = currentProject
        ? (USSY_PROJECTS.findIndex((p) => p.id === currentProject.id) + 1) % USSY_PROJECTS.length
        : 0;
      selectPavilion(USSY_PROJECTS[idx].id);
    } else if (e.key === 'ArrowLeft') {
      const idx = currentProject
        ? (USSY_PROJECTS.findIndex((p) => p.id === currentProject.id) - 1 + USSY_PROJECTS.length) %
          USSY_PROJECTS.length
        : USSY_PROJECTS.length - 1;
      selectPavilion(USSY_PROJECTS[idx].id);
    }
  });

  // Initialize UI & Deep Link Hash
  renderCompassDock();
  updateCountersBadge();

  const initialHash = window.location.hash.replace(/^#/, '').trim().toLowerCase();
  if (initialHash && getProjectById(initialHash)) {
    selectPavilion(initialHash, false);
  }

  // Main 60fps Render & Audio Pulse Loop
  function animate() {
    requestAnimationFrame(animate);
    const pulse = audioSynth.update(0.016);
    sceneEngine.setAudioPulse(pulse);
    sceneEngine.update();
  }

  requestAnimationFrame(animate);
});
