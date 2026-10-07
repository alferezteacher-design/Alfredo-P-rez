/**
 * Web Audio API Synthesizer for the SENA Institutional Anthem
 * Plays melodic brass/orchestral chords and melodic line using pure Web Audio oscillator nodes.
 */

// Musical notes and frequencies (in Hz)
const NOTES: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  G5: 783.99,
  REST: 0
};

// Simplified anthem fanfare theme sequence [note, duration in seconds]
const ANTHEM_SCORE: [string, number][] = [
  ['C4', 0.4], ['E4', 0.4], ['G4', 0.5], ['C5', 0.6],
  ['G4', 0.3], ['E4', 0.3], ['G4', 0.5], ['C5', 0.8],
  ['REST', 0.2],
  ['E4', 0.4], ['F4', 0.4], ['G4', 0.6], ['A4', 0.5],
  ['G4', 0.4], ['F4', 0.4], ['E4', 0.6], ['D4', 0.8],
  ['REST', 0.2],
  ['D4', 0.4], ['E4', 0.4], ['F4', 0.5], ['G4', 0.6],
  ['E4', 0.4], ['D4', 0.4], ['C4', 0.8]
];

class SenaAnthemPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private onNoteCallback?: (noteIndex: number, progressRatio: number) => void;
  private onEndCallback?: () => void;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public play(onNote?: (noteIndex: number, progressRatio: number) => void, onEnd?: () => void) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop();
    this.isPlaying = true;
    this.onNoteCallback = onNote;
    this.onEndCallback = onEnd;

    let currentTimeOffset = 0;
    const totalDuration = ANTHEM_SCORE.reduce((sum, item) => sum + item[1], 0);

    ANTHEM_SCORE.forEach((step, index) => {
      const [noteName, duration] = step;
      const scheduledTime = currentTimeOffset;

      const timerId = window.setTimeout(() => {
        if (!this.isPlaying) return;
        if (noteName !== 'REST' && this.ctx) {
          this.playTone(NOTES[noteName], duration);
        }
        if (this.onNoteCallback) {
          this.onNoteCallback(index, (scheduledTime + duration) / totalDuration);
        }
      }, scheduledTime * 1000);

      this.timer = timerId;
      currentTimeOffset += duration;
    });

    window.setTimeout(() => {
      if (this.isPlaying) {
        this.stop();
        if (this.onEndCallback) {
          this.onEndCallback();
        }
      }
    }, totalDuration * 1000 + 200);
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || freq === 0) return;

    try {
      const now = this.ctx.currentTime;
      // Main melody oscillator (warm brass timbre)
      const osc = this.ctx.createOscillator();
      const oscSub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      oscSub.type = 'sawtooth';
      oscSub.frequency.setValueAtTime(freq / 2, now); // 1 octave below for body

      // Sub gain
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.12, now);
      oscSub.connect(subGain);
      subGain.connect(gain);

      // Main gain envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      oscSub.start(now);
      osc.stop(now + duration);
      oscSub.stop(now + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const anthemSynthesizer = new SenaAnthemPlayer();
