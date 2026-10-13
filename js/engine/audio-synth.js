/**
 * USSYSITE5 // SOLARIS — VESPERS
 * GENERATIVE COASTAL SOUNDSCAPE, AEOLIAN HARP & SEA-GLASS CHIME SYNTHESIZER
 *
 * Pure WebAudio procedural synthesis:
 * - Warm coastal surf swell (filtered pink-noise ocean waves breathing at 0.14 Hz)
 * - Aeolian plucked harp & sea-glass kalimba harmonic arpeggiator (plays each pavilion's chordNotes)
 * - Soft water droplet ripple chime when users click the tidepool or release a wish lantern
 */

export class SanctuaryAudioSynth {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.surfGain = null;
    this.reverbConvolver = null;
    this.enabled = false;
    this.energyPulse = 0;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.0;
    this.masterGain.connect(this.ctx.destination);

    this.reverbConvolver = this._createLushCoastalReverb(3.4, 2.2);
    const wetGain = this.ctx.createGain();
    wetGain.gain.value = 0.55;
    this.reverbConvolver.connect(wetGain);
    wetGain.connect(this.masterGain);

    this.dryGain = this.ctx.createGain();
    this.dryGain.gain.value = 0.65;
    this.dryGain.connect(this.masterGain);

    this._startOceanSurfBed();
  }

  _createLushCoastalReverb(durationSec, decay) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * durationSec);
    const impulse = this.ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        const t = i / length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * 0.5;
      }
    }
    const convolver = this.ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  _startOceanSurfBed() {
    if (!this.ctx) return;
    const rate = this.ctx.sampleRate;
    const bufferSize = rate * 4;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, rate);
    const output = noiseBuffer.getChannelData(0);

    // Pink-ish noise for warm ocean surf
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 340;
    filter.Q.value = 0.7;

    // LFO modulating ocean wave filter cutoff & swell volume
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12; // ~8.3 second coastal wave period
    const lfoFilterGain = this.ctx.createGain();
    lfoFilterGain.gain.value = 210;
    lfo.connect(lfoFilterGain);
    lfoFilterGain.connect(filter.frequency);
    lfo.start();

    this.surfGain = this.ctx.createGain();
    this.surfGain.gain.value = 0.18;

    whiteNoise.connect(filter);
    filter.connect(this.surfGain);
    this.surfGain.connect(this.dryGain);
    whiteNoise.start();
  }

  toggle(forceState) {
    if (!this.ctx) this.init();
    if (!this.ctx) return false;

    this.enabled = typeof forceState === 'boolean' ? forceState : !this.enabled;
    if (this.ctx.state === 'suspended' && this.enabled) {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(this.enabled ? 0.55 : 0.0, now, 0.35);

    if (this.enabled) {
      this.playPavilionChord([261.63, 329.63, 392.00, 493.88, 587.33]);
    }
    return this.enabled;
  }

  /**
   * Plucks a warm, emotional Aeolian harp & sea-glass chime arpeggio for a Pavilion.
   */
  playPavilionChord(chordNotes = [261.63, 329.63, 392.0, 493.88]) {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    this.energyPulse = 1.0;
    const now = this.ctx.currentTime;

    chordNotes.forEach((freq, idx) => {
      const start = now + idx * 0.095;

      // Fundamental warm harp string (triangle) + glassy overtone (sine 2x)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, start);
      osc2.frequency.setValueAtTime(freq * 2.0, start);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, start);
      noteGain.gain.linearRampToValueAtTime(0.11 / Math.sqrt(idx + 1), start + 0.025);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, start + 3.2);

      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.value = 0.22;

      osc1.connect(noteGain);
      osc2.connect(overtoneGain);
      overtoneGain.connect(noteGain);

      noteGain.connect(this.dryGain);
      noteGain.connect(this.reverbConvolver);

      osc1.start(start);
      osc2.start(start);
      osc1.stop(start + 3.3);
      osc2.stop(start + 3.3);
    });
  }

  /**
   * Plays a delicate crystalline water droplet chime when clicking the tidepool or releasing a lantern.
   */
  playWaterRippleChime(pitchMultiplier = 1.0) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = (523.25 + Math.random() * 260) * pitchMultiplier;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.18, now + 0.14);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(0.08, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(g);
    g.connect(this.reverbConvolver);
    g.connect(this.dryGain);

    osc.start(now);
    osc.stop(now + 1.45);
    this.energyPulse = Math.max(this.energyPulse, 0.55);
  }

  update(dt) {
    this.energyPulse = Math.max(0, this.energyPulse - dt * 1.4);
    return this.energyPulse;
  }
}
