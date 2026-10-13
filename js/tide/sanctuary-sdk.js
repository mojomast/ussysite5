/**
 * USSYSITE5 // SOLARIS — VESPERS
 * SANCTUARY SDK & FLOATING WISH LANTERN / TIDEPOOL MEMORY FOUNDATION
 *
 * Exposes `window.SanctuarySDK` (and `window.AnomalySDK` alias) for interactive
 * floating paper lanterns, tidepool reflections, atmospheric mood shifts, and
 * future easter-egg hooks.
 */

const STORAGE_KEY = 'ussysite5.sanctuary.state.v1';

export class SanctuarySDK {
  constructor() {
    this.state = {
      v: 1,
      mood: 'solaris',
      unlocked: [],
      lanterns: [
        {
          id: 'seed-1',
          pavilionId: 'becomussy',
          reflection: 'May every system we build remember the warmth of human hands.',
          createdAt: Date.now() - 3600_000
        }
      ],
      counters: {
        ripplesCast: 0,
        lanternsReleased: 1,
        pavilionsVisited: 0
      },
      flags: {},
      tideLevel: 0.55,
      updatedAt: Date.now()
    };

    this.listeners = new Set();
    this._loadLocal();
  }

  _loadLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        this.state = {
          ...this.state,
          ...parsed,
          counters: { ...this.state.counters, ...(parsed.counters || {}) },
          lanterns: Array.isArray(parsed.lanterns) && parsed.lanterns.length > 0
            ? parsed.lanterns.slice(0, 24)
            : this.state.lanterns
        };
      }
    } catch {
      // Ignore storage access errors in private browsing
    }
  }

  _persist() {
    this.state.updatedAt = Date.now();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Ignore quota errors
    }

    for (const fn of this.listeners) {
      try {
        fn(this.state);
      } catch {
        // Ignore listener error
      }
    }

    if (typeof fetch === 'function') {
      fetch('/api/sanctuary/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: this.state })
      }).catch(() => {});
    }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  setMood(moodId) {
    this.state.mood = moodId;
    this._persist();
  }

  setTideLevel(level) {
    this.state.tideLevel = Math.max(0, Math.min(1, Number(level) || 0.5));
    this._persist();
  }

  recordRipple() {
    this.state.counters.ripplesCast = (this.state.counters.ripplesCast || 0) + 1;
    if (this.state.counters.ripplesCast >= 7 && !this.state.unlocked.includes('tide-whisperer')) {
      this.state.unlocked.push('tide-whisperer');
    }
    this._persist();
  }

  recordPavilionVisit(pavilionId) {
    this.state.counters.pavilionsVisited = (this.state.counters.pavilionsVisited || 0) + 1;
    this.state.flags[`visited_${pavilionId}`] = true;
    this._persist();
  }

  releaseWishLantern(reflectionText, pavilionId = 'becomussy') {
    const clean = String(reflectionText || '').trim().slice(0, 180);
    if (!clean) return null;
    const entry = {
      id: `lantern-${Date.now()}`,
      pavilionId,
      reflection: clean,
      createdAt: Date.now()
    };
    this.state.lanterns = [entry, ...this.state.lanterns].slice(0, 24);
    this.state.counters.lanternsReleased = (this.state.counters.lanternsReleased || 0) + 1;
    if (!this.state.unlocked.includes('lantern-keeper')) {
      this.state.unlocked.push('lantern-keeper');
    }
    this._persist();
    return entry;
  }

  getState() {
    return structuredClone ? structuredClone(this.state) : JSON.parse(JSON.stringify(this.state));
  }
}
