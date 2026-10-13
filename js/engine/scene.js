/**
 * USSYSITE5 // SOLARIS — VESPERS
 * MASTER THREE.JS r186 SCENE ENGINE & POST-PROCESSING PIPELINE
 *
 * Orchestrates:
 * - Atmospheric Golden-Hour / Twilight Sky Dome (`SKY_DOME_VERTEX/FRAGMENT_SHADER`)
 * - Interactive Gerstner Wave & Bioluminescent Tidepool Ocean (`TIDE_WATER_VERTEX/FRAGMENT_SHADER`)
 * - 80,000 Firefly & Marine Plankton Particle Swarm (`BIOLUM_SWARM_VERTEX/FRAGMENT_SHADER`)
 * - Central Sovereign Solar Lotus & Memory Well (`SOLAR_HEART_VERTEX/FRAGMENT_SHADER`)
 * - 11 Bespoke Coastal Sanctuary Pavilions (`buildSanctuaryPavilions`)
 * - Floating Paper Wish Lanterns set adrift on the lagoon
 * - Post-Processing (`EffectComposer`, `UnrealBloomPass`, `CINEMATIC_POST_SHADER`, `OutputPass`)
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { SANCTUARY_META, USSY_PROJECTS } from '../projects.js';
import {
  TIDE_WATER_VERTEX_SHADER,
  TIDE_WATER_FRAGMENT_SHADER,
  SKY_DOME_VERTEX_SHADER,
  SKY_DOME_FRAGMENT_SHADER,
  BIOLUM_SWARM_VERTEX_SHADER,
  BIOLUM_SWARM_FRAGMENT_SHADER,
  SOLAR_HEART_VERTEX_SHADER,
  SOLAR_HEART_FRAGMENT_SHADER,
  CINEMATIC_POST_SHADER
} from '../shaders/sanctuary-shaders.js';
import {
  buildSanctuaryPavilions,
  updateSanctuaryPavilions
} from '../sanctuary/pavilion-builder.js';
import { SanctuaryCameraRig } from './camera-rig.js';

export class SanctuarySceneEngine {
  constructor({ canvas, onPavilionSelect, onPavilionHover, onWaterRipple }) {
    this.canvas = canvas;
    this.onPavilionSelect = onPavilionSelect;
    this.onPavilionHover = onPavilionHover;
    this.onWaterRipple = onWaterRipple;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.5,
      600
    );

    this.cameraRig = new SanctuaryCameraRig(this.camera);
    this.clock = new THREE.Clock();

    this.activeMood = SANCTUARY_META.moods[0];
    this.activeProjectId = null;
    this.hoveredProjectId = null;
    this.tideSwell = 0.55;
    this.audioPulse = 0;

    this.rippleCursor = 0;
    this.ripples = [
      new THREE.Vector4(0, 0, 0, -100),
      new THREE.Vector4(0, 0, 0, -100),
      new THREE.Vector4(0, 0, 0, -100),
      new THREE.Vector4(0, 0, 0, -100)
    ];

    this.floatingLanterns = [];
    this.raycaster = new THREE.Raycaster();
    this.pointerNdc = new THREE.Vector2(0, 0);

    this._initRenderer();
    this._initLights();
    this._initSkyDome();
    this._initTideWater();
    this._initCentralSolarSanctuary();
    this._initPavilions();
    this._initBiolumSwarm();
    this._initPostProcessing();
    this._bindEvents();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
  }

  _initLights() {
    this.ambientLight = new THREE.HemisphereLight('#ffd6a5', '#0f172a', 1.25);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight('#ffd28a', 2.4);
    this.sunLight.position.set(-85, 28, -110);
    this.scene.add(this.sunLight);

    this.lagoonPointLight = new THREE.PointLight('#fbbf24', 3.2, 85, 1.4);
    this.lagoonPointLight.position.set(0, 6.5, 0);
    this.scene.add(this.lagoonPointLight);
  }

  _initSkyDome() {
    const skyGeo = new THREE.SphereGeometry(280, 48, 32);
    this.skyUniforms = {
      uTime: { value: 0 },
      uZenithColor: { value: new THREE.Color(this.activeMood.skyZenith) },
      uHorizonColor: { value: new THREE.Color(this.activeMood.skyHorizon) },
      uSunColor: { value: new THREE.Color(this.activeMood.sunColor) },
      uSunDir: { value: new THREE.Vector3(-0.62, 0.19, -0.76).normalize() },
      uBioluminescence: { value: this.activeMood.bioluminescence }
    };

    const skyMat = new THREE.ShaderMaterial({
      vertexShader: SKY_DOME_VERTEX_SHADER,
      fragmentShader: SKY_DOME_FRAGMENT_SHADER,
      uniforms: this.skyUniforms,
      side: THREE.BackSide,
      depthWrite: false
    });

    this.skyDome = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(this.skyDome);
  }

  _initTideWater() {
    const waterGeo = new THREE.PlaneGeometry(420, 420, 180, 180);
    waterGeo.rotateX(-Math.PI / 2);

    this.waterUniforms = {
      uTime: { value: 0 },
      uTideSwell: { value: this.tideSwell },
      uRipples: { value: this.ripples },
      uBioluminescence: { value: this.activeMood.bioluminescence },
      uDeepColor: { value: new THREE.Color(this.activeMood.waterDeep) },
      uShallowColor: { value: new THREE.Color(this.activeMood.waterShallow) },
      uSkyHorizonColor: { value: new THREE.Color(this.activeMood.skyHorizon) },
      uSkyZenithColor: { value: new THREE.Color(this.activeMood.skyZenith) },
      uSunColor: { value: new THREE.Color(this.activeMood.sunColor) },
      uSunDir: { value: new THREE.Vector3(-0.62, 0.19, -0.76).normalize() },
      uAccentColor: { value: new THREE.Color('#ffb703') }
    };

    const waterMat = new THREE.ShaderMaterial({
      vertexShader: TIDE_WATER_VERTEX_SHADER,
      fragmentShader: TIDE_WATER_FRAGMENT_SHADER,
      uniforms: this.waterUniforms,
      transparent: true
    });

    this.waterMesh = new THREE.Mesh(waterGeo, waterMat);
    this.waterMesh.name = 'TidepoolSurface';
    this.scene.add(this.waterMesh);
  }

  _initCentralSolarSanctuary() {
    this.centralGroup = new THREE.Group();
    this.centralGroup.name = 'CentralSolarSanctuary';

    // Submerged golden mother-of-pearl terrace rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(6.5 + i * 3.8, 0.08, 16, 80);
      ringGeo.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshStandardMaterial({
        color: '#fbbf24',
        emissive: '#f59e0b',
        emissiveIntensity: 0.45 - i * 0.1,
        roughness: 0.2,
        metalness: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = 0.15 + (2 - i) * 0.15;
      this.centralGroup.add(ring);
    }

    // Central Solar Heart Lotus Sculpture
    this.solarHeartUniforms = {
      uTime: { value: 0 },
      uPulse: { value: 0 },
      uPrimaryColor: { value: new THREE.Color('#ffd166') },
      uSecondaryColor: { value: new THREE.Color('#fb7185') }
    };

    const heartGeo = new THREE.IcosahedronGeometry(2.35, 4);
    const heartMat = new THREE.ShaderMaterial({
      vertexShader: SOLAR_HEART_VERTEX_SHADER,
      fragmentShader: SOLAR_HEART_FRAGMENT_SHADER,
      uniforms: this.solarHeartUniforms,
      transparent: true
    });

    this.solarHeartMesh = new THREE.Mesh(heartGeo, heartMat);
    this.solarHeartMesh.position.y = 4.2;
    this.centralGroup.add(this.solarHeartMesh);

    // Orbiting brass sundial halo around the central heart
    const sundialGeo = new THREE.TorusGeometry(4.2, 0.06, 16, 72);
    const sundialMat = new THREE.MeshStandardMaterial({
      color: '#fde047',
      emissive: '#f59e0b',
      emissiveIntensity: 0.5,
      roughness: 0.18,
      metalness: 0.9
    });
    this.centralHalo1 = new THREE.Mesh(sundialGeo, sundialMat);
    this.centralHalo1.position.y = 4.2;
    this.centralGroup.add(this.centralHalo1);

    this.centralHalo2 = this.centralHalo1.clone();
    this.centralHalo2.scale.setScalar(1.28);
    this.centralGroup.add(this.centralHalo2);

    this.scene.add(this.centralGroup);
  }

  _initPavilions() {
    const built = buildSanctuaryPavilions(USSY_PROJECTS);
    this.pavilionRoot = built.rootGroup;
    this.pavilionEntries = built.pavilionEntries;
    this.pickableMeshes = built.pickableMeshes;
    this.scene.add(this.pavilionRoot);

    // Spawn 5 initial floating wish lanterns drifting on the lagoon
    for (let i = 0; i < 5; i++) {
      this.spawnFloatingLantern((i / 5) * Math.PI * 2, 22 + (i % 3) * 7);
    }
  }

  spawnFloatingLantern(angle = Math.random() * Math.PI * 2, radius = 24 + Math.random() * 18, colorHex = '#fda4af') {
    const lanternGroup = new THREE.Group();
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    lanternGroup.position.set(x, 0.35, z);

    const mat = new THREE.MeshStandardMaterial({
      color: '#fff1f2',
      emissive: colorHex,
      emissiveIntensity: 0.95,
      roughness: 0.25
    });
    const lanternMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.65, 12), mat);
    lanternMesh.position.y = 0.32;
    lanternGroup.add(lanternMesh);

    this.scene.add(lanternGroup);
    this.floatingLanterns.push({
      group: lanternGroup,
      angle,
      radius,
      speed: 0.025 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2
    });

    this.triggerWaterRipple(new THREE.Vector3(x, 0, z));
  }

  _initBiolumSwarm() {
    const count = 80000;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const scales = new Float32Array(count);
    const species = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const isAerial = i % 3 === 0 ? 1.0 : 0.0;
      const r = isAerial
        ? 8.0 + Math.pow(Math.random(), 0.7) * 88.0
        : 4.0 + Math.pow(Math.random(), 0.8) * 96.0;
      const theta = Math.random() * Math.PI * 2;
      const y = isAerial ? 1.5 + Math.random() * 19.0 : 0.1 + Math.random() * 0.6;

      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      phases[i] = Math.random();
      scales[i] = 0.55 + Math.random() * 1.35;
      species[i] = isAerial;
    }

    const swarmGeo = new THREE.BufferGeometry();
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    swarmGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    swarmGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    swarmGeo.setAttribute('aSpecies', new THREE.BufferAttribute(species, 1));

    this.swarmUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uBioluminescence: { value: this.activeMood.bioluminescence },
      uAudioPulse: { value: 0 },
      uGoldColor: { value: new THREE.Color('#ffd166') },
      uCyanColor: { value: new THREE.Color('#38bdf8') }
    };

    const swarmMat = new THREE.ShaderMaterial({
      vertexShader: BIOLUM_SWARM_VERTEX_SHADER,
      fragmentShader: BIOLUM_SWARM_FRAGMENT_SHADER,
      uniforms: this.swarmUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.swarmPoints = new THREE.Points(swarmGeo, swarmMat);
    this.swarmPoints.name = 'BioluminescentSwarm80k';
    this.scene.add(this.swarmPoints);
  }

  _initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.activeMood.bloomStrength,
      0.55,
      0.72
    );
    this.composer.addPass(this.bloomPass);

    this.cinematicPass = new ShaderPass(CINEMATIC_POST_SHADER);
    this.composer.addPass(this.cinematicPass);

    this.composer.addPass(new OutputPass());
  }

  triggerWaterRipple(worldVec3) {
    const elapsed = this.clock.getElapsedTime();
    this.ripples[this.rippleCursor].set(worldVec3.x, worldVec3.y, worldVec3.z, elapsed);
    this.rippleCursor = (this.rippleCursor + 1) % 4;
  }

  setMood(moodId) {
    const found = SANCTUARY_META.moods.find((m) => m.id === moodId) || SANCTUARY_META.moods[0];
    this.activeMood = found;

    this.skyUniforms.uZenithColor.value.set(found.skyZenith);
    this.skyUniforms.uHorizonColor.value.set(found.skyHorizon);
    this.skyUniforms.uSunColor.value.set(found.sunColor);
    this.skyUniforms.uBioluminescence.value = found.bioluminescence;

    this.waterUniforms.uDeepColor.value.set(found.waterDeep);
    this.waterUniforms.uShallowColor.value.set(found.waterShallow);
    this.waterUniforms.uSkyHorizonColor.value.set(found.skyHorizon);
    this.waterUniforms.uSkyZenithColor.value.set(found.skyZenith);
    this.waterUniforms.uSunColor.value.set(found.sunColor);
    this.waterUniforms.uBioluminescence.value = found.bioluminescence;

    this.swarmUniforms.uBioluminescence.value = found.bioluminescence;
    this.bloomPass.strength = found.bloomStrength;
    this.sunLight.color.set(found.sunColor);

    return found;
  }

  setTideSwell(level) {
    this.tideSwell = Math.max(0.05, Math.min(1.0, Number(level) || 0.5));
    this.waterUniforms.uTideSwell.value = this.tideSwell;
  }

  focusProject(projectId) {
    if (!projectId) {
      this.activeProjectId = null;
      this.cameraRig.setMode('skiff');
      return null;
    }
    const entry = this.pavilionEntries.find((e) => e.id === projectId);
    if (!entry) return null;

    this.activeProjectId = entry.id;
    this.waterUniforms.uAccentColor.value.set(entry.project.accentHex);
    this.solarHeartUniforms.uPrimaryColor.value.set(entry.project.accentHex);
    this.solarHeartUniforms.uSecondaryColor.value.set(entry.project.secondaryHex);

    this.cameraRig.focusPavilion(entry);
    this.triggerWaterRipple(entry.worldPos);
    return entry.project;
  }

  setCameraMode(mode) {
    if (mode !== 'pavilion') {
      this.activeProjectId = null;
    }
    this.cameraRig.setMode(mode);
  }

  _bindEvents() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.composer.setSize(w, h);
    });

    let pointerDownPos = { x: 0, y: 0 };
    let isDragging = false;

    this.canvas.addEventListener('pointerdown', (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      isDragging = true;
    });

    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 6) {
        this._handleCanvasClick(e);
      }
    });

    window.addEventListener('pointermove', (e) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      this.pointerNdc.set(ndcX, ndcY);
      this.cameraRig.setPointerNdc(ndcX, ndcY);

      if (isDragging && this.cameraRig.mode !== 'pavilion') {
        this.cameraRig.nudgeOrbit(-e.movementX * 0.0035, e.movementY * 0.03);
      } else {
        this._handleHoverRaycast();
      }
    });

    this.canvas.addEventListener(
      'wheel',
      (e) => {
        this.cameraRig.nudgeOrbit(e.deltaY * 0.0008, 0);
      },
      { passive: true }
    );
  }

  _handleHoverRaycast() {
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickableMeshes, false);
    const hoveredId = hits.length > 0 ? hits[0].object.userData?.projectId : null;

    if (hoveredId !== this.hoveredProjectId) {
      this.hoveredProjectId = hoveredId;
      this.canvas.style.cursor = hoveredId ? 'pointer' : 'grab';
      if (this.onPavilionHover) {
        const entry = this.pavilionEntries.find((p) => p.id === hoveredId);
        this.onPavilionHover(entry ? entry.project : null);
      }
    }
  }

  _handleCanvasClick(e) {
    const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
    const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), this.camera);

    const pavilionHits = this.raycaster.intersectObjects(this.pickableMeshes, false);
    if (pavilionHits.length > 0) {
      const projectId = pavilionHits[0].object.userData?.projectId;
      if (projectId && this.onPavilionSelect) {
        this.onPavilionSelect(projectId);
        return;
      }
    }

    // Check if the user clicked the Tidepool Water Surface to cast a ripple
    const waterHits = this.raycaster.intersectObject(this.waterMesh, false);
    if (waterHits.length > 0) {
      const pt = waterHits[0].point;
      this.triggerWaterRipple(pt);
      if (this.onWaterRipple) {
        this.onWaterRipple(pt);
      }
    }
  }

  setAudioPulse(pulse) {
    this.audioPulse = pulse;
  }

  update() {
    const dt = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    this.skyUniforms.uTime.value = elapsed;
    this.waterUniforms.uTime.value = elapsed;
    this.swarmUniforms.uTime.value = elapsed;
    this.swarmUniforms.uAudioPulse.value = this.audioPulse;
    this.solarHeartUniforms.uTime.value = elapsed;
    this.solarHeartUniforms.uPulse.value = this.audioPulse;
    this.cinematicPass.uniforms.uTime.value = elapsed;

    // Animate central solar lotus & sundial halos
    this.solarHeartMesh.rotation.y = elapsed * 0.22;
    this.solarHeartMesh.position.y = 4.2 + Math.sin(elapsed * 1.3) * 0.25;
    this.centralHalo1.rotation.x = Math.PI * 0.35 + Math.sin(elapsed * 0.5) * 0.2;
    this.centralHalo1.rotation.y = elapsed * 0.32;
    this.centralHalo2.rotation.x = -Math.PI * 0.28 + Math.cos(elapsed * 0.4) * 0.2;
    this.centralHalo2.rotation.z = elapsed * 0.24;

    // Animate floating paper wish lanterns drifting on the tide
    for (const lantern of this.floatingLanterns) {
      lantern.angle += dt * lantern.speed;
      lantern.group.position.x = Math.cos(lantern.angle) * lantern.radius;
      lantern.group.position.z = Math.sin(lantern.angle) * lantern.radius;
      lantern.group.position.y = 0.22 + Math.sin(elapsed * 1.8 + lantern.phase) * 0.14;
      lantern.group.rotation.y = elapsed * 0.4 + lantern.phase;
    }

    updateSanctuaryPavilions(
      this.pavilionEntries,
      elapsed,
      this.activeProjectId,
      this.hoveredProjectId,
      this.audioPulse
    );

    this.cameraRig.update(dt, elapsed);
    this.composer.render();
  }
}
