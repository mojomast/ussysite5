/**
 * USSYSITE5 // SOLARIS — VESPERS
 * SPRING-DAMPED COASTAL SKIFF & SANCTUARY CAMERA CHOREOGRAPHY
 *
 * Modes:
 * - 'skiff': Gentle coastal horizon orbit skimming above the mirror tidepool
 * - 'pavilion': Intimate close-up framing of the selected Pavilion sculpture & water reflection
 * - 'birdseye': High zenith archipelago map view showing the entire 11-pavilion lagoon ring
 */

import * as THREE from 'three';

export class SanctuaryCameraRig {
  constructor(camera) {
    this.camera = camera;
    this.mode = 'skiff'; // 'skiff' | 'pavilion' | 'birdseye'

    this.orbitAngle = -0.35;
    this.targetOrbitAngle = -0.35;
    this.orbitElevation = 7.8;
    this.targetElevation = 7.8;
    this.orbitRadius = 64.0;
    this.targetRadius = 64.0;

    this.currentPos = new THREE.Vector3(0, 12, 68);
    this.desiredPos = new THREE.Vector3(0, 12, 68);
    this.currentLookAt = new THREE.Vector3(0, 2.2, 0);
    this.desiredLookAt = new THREE.Vector3(0, 2.2, 0);

    this.focusedPavilion = null;
    this.pointerParallax = { x: 0, y: 0 };
    this.autoDrift = true;

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentLookAt);
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'birdseye') {
      this.focusedPavilion = null;
      this.autoDrift = false;
    } else if (mode === 'skiff') {
      this.focusedPavilion = null;
      this.autoDrift = true;
    }
  }

  focusPavilion(pavilionEntry) {
    if (!pavilionEntry) {
      this.setMode('skiff');
      return;
    }
    this.focusedPavilion = pavilionEntry;
    this.mode = 'pavilion';
    this.autoDrift = false;
    this.targetOrbitAngle = pavilionEntry.project.tideAngle;
  }

  nudgeOrbit(deltaAngle, deltaHeight = 0) {
    this.targetOrbitAngle += deltaAngle;
    this.targetElevation = Math.max(2.6, Math.min(28.0, this.targetElevation + deltaHeight));
    if (this.mode === 'pavilion') {
      this.mode = 'skiff';
      this.focusedPavilion = null;
    }
  }

  setPointerNdc(ndcX, ndcY) {
    this.pointerParallax.x = ndcX;
    this.pointerParallax.y = ndcY;
  }

  update(dt, elapsed) {
    const damping = 1.0 - Math.exp(-3.4 * Math.min(dt, 0.1));

    // Gentle wave bobbing
    const tideBob = Math.sin(elapsed * 1.1) * 0.22;

    if (this.mode === 'pavilion' && this.focusedPavilion) {
      const p = this.focusedPavilion.worldPos;
      const angle = this.focusedPavilion.project.tideAngle;
      // Position camera slightly outside and to the side of the pavilion looking inward toward the sculpture and sunset horizon
      const camDist = this.focusedPavilion.project.tideRadius + 11.2;
      const sideAngle = angle + 0.11 + this.pointerParallax.x * 0.06;

      this.desiredPos.set(
        Math.cos(sideAngle) * camDist,
        4.6 + tideBob + this.pointerParallax.y * 0.85,
        Math.sin(sideAngle) * camDist
      );

      this.desiredLookAt.set(
        p.x * 0.92,
        2.95 + Math.sin(elapsed * 0.9) * 0.12,
        p.z * 0.92
      );
    } else if (this.mode === 'birdseye') {
      const slowSpin = elapsed * 0.035;
      this.desiredPos.set(
        Math.cos(slowSpin) * 26.0 + this.pointerParallax.x * 4.0,
        92.0,
        Math.sin(slowSpin) * 26.0 + this.pointerParallax.y * 4.0
      );
      this.desiredLookAt.set(0, 0, 0);
    } else {
      // 'skiff' coastal horizon drift mode
      if (this.autoDrift) {
        this.targetOrbitAngle += dt * 0.042;
      }
      this.orbitAngle += (this.targetOrbitAngle - this.orbitAngle) * damping;
      this.orbitElevation += (this.targetElevation - this.orbitElevation) * damping;
      this.orbitRadius += (this.targetRadius - this.orbitRadius) * damping;

      const effectiveAngle = this.orbitAngle + this.pointerParallax.x * 0.08;
      this.desiredPos.set(
        Math.cos(effectiveAngle) * this.orbitRadius,
        this.orbitElevation + tideBob + this.pointerParallax.y * 1.2,
        Math.sin(effectiveAngle) * this.orbitRadius
      );

      // Look slightly ahead along the archipelago curve toward the central solar lotus
      const lookAheadAngle = effectiveAngle + 0.45;
      this.desiredLookAt.set(
        Math.cos(lookAheadAngle) * 18.0,
        2.4 + tideBob * 0.4,
        Math.sin(lookAheadAngle) * 18.0
      );
    }

    this.currentPos.lerp(this.desiredPos, damping);
    this.currentLookAt.lerp(this.desiredLookAt, damping);

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentLookAt);
  }
}
