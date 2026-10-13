/**
 * USSYSITE5 // SOLARIS — VESPERS
 * BESPOKE COASTAL PAVILION & KINETIC SCULPTURE BUILDER
 *
 * Constructs 11 distinct, emotionally evocative coastal tidepool pavilions
 * arranged around the Golden Hour Lagoon. Each pavilion sits on a stepped
 * travertine/basalt pier with a glowing tidal reflection ring, brass/glass
 * architectural arches, and a unique kinetic centerpiece matching its repository's soul.
 */

import * as THREE from 'three';

function createPavilionBase(accentColor, secondaryColor, emissiveColor) {
  const baseGroup = new THREE.Group();

  // 1. Submerged Glowing Bioluminescent Reef Ring
  const reefGeo = new THREE.RingGeometry(4.4, 5.15, 48);
  reefGeo.rotateX(-Math.PI / 2);
  const reefMat = new THREE.MeshBasicMaterial({
    color: emissiveColor,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide
  });
  const reefRing = new THREE.Mesh(reefGeo, reefMat);
  reefRing.position.y = 0.06;
  baseGroup.add(reefRing);

  // 2. Stepped Sun-Bleached Travertine & Basalt Pier Plinth
  const lowerStepGeo = new THREE.CylinderGeometry(4.1, 4.5, 0.45, 32);
  const stoneMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e293b'),
    roughness: 0.65,
    metalness: 0.18
  });
  const lowerStep = new THREE.Mesh(lowerStepGeo, stoneMat);
  lowerStep.position.y = 0.22;
  baseGroup.add(lowerStep);

  const upperStepGeo = new THREE.CylinderGeometry(3.3, 3.65, 0.38, 32);
  const travertineMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#334155'),
    roughness: 0.45,
    metalness: 0.25
  });
  const upperStep = new THREE.Mesh(upperStepGeo, travertineMat);
  upperStep.position.y = 0.62;
  baseGroup.add(upperStep);

  // 3. Inlaid Spun-Brass Compass Rim
  const brassRimGeo = new THREE.TorusGeometry(3.35, 0.065, 16, 64);
  brassRimGeo.rotateX(Math.PI / 2);
  const brassMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: emissiveColor,
    emissiveIntensity: 0.35,
    roughness: 0.22,
    metalness: 0.88
  });
  const brassRim = new THREE.Mesh(brassRimGeo, brassMat);
  brassRim.position.y = 0.82;
  baseGroup.add(brassRim);

  // 4. Mirror Tidepool Basin inside the Pier
  const basinGeo = new THREE.CircleGeometry(3.05, 36);
  basinGeo.rotateX(-Math.PI / 2);
  const basinMat = new THREE.MeshStandardMaterial({
    color: secondaryColor,
    emissive: accentColor,
    emissiveIntensity: 0.22,
    roughness: 0.08,
    metalness: 0.75
  });
  const basin = new THREE.Mesh(basinGeo, basinMat);
  basin.position.y = 0.83;
  baseGroup.add(basin);

  return { baseGroup, reefRing, brassRim, brassMat };
}

/**
 * Builds all 11 bespoke kinetic sculptures.
 */
function buildKineticSculpture(project, accentColor, secondaryColor, emissiveColor) {
  const kineticGroup = new THREE.Group();
  kineticGroup.position.y = 3.2;

  const brassMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: emissiveColor,
    emissiveIntensity: 0.38,
    roughness: 0.2,
    metalness: 0.88
  });

  const seaGlassMat = new THREE.MeshPhysicalMaterial({
    color: secondaryColor,
    emissive: accentColor,
    emissiveIntensity: 0.25,
    roughness: 0.12,
    metalness: 0.1,
    transmission: 0.65,
    transparent: true,
    opacity: 0.86
  });

  const pearlMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fff7ed'),
    emissive: emissiveColor,
    emissiveIntensity: 0.55,
    roughness: 0.15,
    metalness: 0.35
  });

  const animatedParts = [];

  switch (project.sculptureType) {
    case 'astrolabe-pier': {
      // I. OrbitDesktop: Concentric brass armillary rings + floating sea-glass desktop panes
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.45 + i * 0.55, 0.055, 16, 64);
        const ring = new THREE.Mesh(ringGeo, i % 2 === 0 ? brassMat : seaGlassMat);
        ring.rotation.set(i * 0.5, i * 0.8, 0);
        kineticGroup.add(ring);
        animatedParts.push({ mesh: ring, mode: 'armillary', speed: 0.45 - i * 0.1, axis: i });
      }
      // Floating spatial window panes
      for (let w = 0; w < 4; w++) {
        const paneGeo = new THREE.BoxGeometry(0.95, 0.62, 0.04);
        const pane = new THREE.Mesh(paneGeo, seaGlassMat);
        const ang = (w / 4) * Math.PI * 2;
        pane.position.set(Math.cos(ang) * 2.1, Math.sin(ang * 2) * 0.4, Math.sin(ang) * 2.1);
        pane.lookAt(0, 0, 0);
        kineticGroup.add(pane);
        animatedParts.push({ mesh: pane, mode: 'float-orbit', speed: 0.35, phase: ang, radius: 2.1 });
      }
      const coreOrb = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 2), pearlMat);
      kineticGroup.add(coreOrb);
      break;
    }

    case 'silk-lanterns': {
      // II. VelvetRP: Floating rose-gold silk paper lanterns drifting in a spiral canopy
      for (let i = 0; i < 7; i++) {
        const lanternHolder = new THREE.Group();
        const ang = (i / 7) * Math.PI * 2;
        const rad = i === 0 ? 0 : 1.75 + (i % 2) * 0.55;
        const baseY = i === 0 ? 0.6 : (i % 3) * 0.65 - 0.5;
        lanternHolder.position.set(Math.cos(ang) * rad, baseY, Math.sin(ang) * rad);

        const bodyGeo = new THREE.CylinderGeometry(0.36, 0.28, 0.82, 16);
        const body = new THREE.Mesh(bodyGeo, i === 0 ? pearlMat : seaGlassMat);
        lanternHolder.add(body);

        const capGeo = new THREE.TorusGeometry(0.32, 0.035, 10, 24);
        capGeo.rotateX(Math.PI / 2);
        const topCap = new THREE.Mesh(capGeo, brassMat);
        topCap.position.y = 0.42;
        const botCap = topCap.clone();
        botCap.position.y = -0.42;
        lanternHolder.add(topCap, botCap);

        kineticGroup.add(lanternHolder);
        animatedParts.push({ mesh: lanternHolder, mode: 'bob', speed: 1.2 + i * 0.15, phase: i * 1.1, baseY });
      }
      break;
    }

    case 'aeolian-harp': {
      // III. JamMate: Sweeping wind-harp arch with 12 singing harmonic strings & wave rings
      const archGeo = new THREE.TorusGeometry(2.2, 0.11, 16, 48, Math.PI * 1.25);
      const arch = new THREE.Mesh(archGeo, brassMat);
      arch.rotation.z = -Math.PI * 0.12;
      kineticGroup.add(arch);

      for (let s = 0; s < 11; s++) {
        const x = (s - 5) * 0.32;
        const height = Math.sqrt(Math.max(0.4, 4.6 - x * x)) * 1.45;
        const strGeo = new THREE.CylinderGeometry(0.018, 0.018, height, 8);
        const strMesh = new THREE.Mesh(strGeo, s % 2 === 0 ? pearlMat : seaGlassMat);
        strMesh.position.set(x, 0, 0);
        kineticGroup.add(strMesh);
        animatedParts.push({ mesh: strMesh, mode: 'string-vibe', speed: 3.0 + s * 0.4, phase: s * 0.5 });
      }

      const soundWave = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.04, 12, 48), seaGlassMat);
      soundWave.rotation.x = Math.PI / 2;
      kineticGroup.add(soundWave);
      animatedParts.push({ mesh: soundWave, mode: 'pulse-ring', speed: 1.6, phase: 0 });
      break;
    }

    case 'tidal-amphitheatre': {
      // IV. CoCS: Tiered travertine colosseum colonnade & kinetic target sight-arcs
      for (let tier = 0; tier < 3; tier++) {
        const arcGeo = new THREE.TorusGeometry(2.3 - tier * 0.48, 0.09, 14, 48, Math.PI * 1.45);
        const arc = new THREE.Mesh(arcGeo, tier % 2 === 0 ? brassMat : seaGlassMat);
        arc.rotation.x = Math.PI / 2;
        arc.position.y = (tier - 1) * 0.72;
        kineticGroup.add(arc);
        animatedParts.push({ mesh: arc, mode: 'spin-y', speed: (tier % 2 === 0 ? 1 : -1) * (0.55 + tier * 0.2) });
      }
      const centerSun = new THREE.Mesh(new THREE.IcosahedronGeometry(0.68, 1), pearlMat);
      kineticGroup.add(centerSun);
      animatedParts.push({ mesh: centerSun, mode: 'spin-xyz', speed: 0.8 });
      break;
    }

    case 'seaglass-prism': {
      // V. CoCS-Godot: Spiraling cluster of tall frosted sea-glass crystal shards
      for (let c = 0; c < 8; c++) {
        const ang = (c / 8) * Math.PI * 2;
        const rad = c === 0 ? 0 : 1.35;
        const h = c === 0 ? 3.2 : 1.8 + (c % 3) * 0.45;
        const shardGeo = new THREE.ConeGeometry(0.38, h, 6);
        const shard = new THREE.Mesh(shardGeo, c % 2 === 0 ? seaGlassMat : pearlMat);
        shard.position.set(Math.cos(ang) * rad, (c % 2) * 0.2, Math.sin(ang) * rad);
        shard.rotation.z = c === 0 ? 0 : Math.cos(ang) * 0.28;
        shard.rotation.x = c === 0 ? 0 : Math.sin(ang) * 0.28;
        kineticGroup.add(shard);
        animatedParts.push({ mesh: shard, mode: 'bob', speed: 1.4, phase: c * 0.8, baseY: shard.position.y });
      }
      const halo = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.045, 12, 48), brassMat);
      halo.rotation.x = Math.PI * 0.38;
      kineticGroup.add(halo);
      animatedParts.push({ mesh: halo, mode: 'spin-y', speed: 0.65 });
      break;
    }

    case 'tidal-weir': {
      // VI. RouteTok: Interlocking jade & bronze aqueduct sluice gates and token droplets
      for (let g = 0; g < 3; g++) {
        const gateGeo = new THREE.TorusGeometry(1.85, 0.07, 12, 48);
        const gate = new THREE.Mesh(gateGeo, g === 1 ? seaGlassMat : brassMat);
        gate.rotation.y = (g / 3) * Math.PI;
        kineticGroup.add(gate);
        animatedParts.push({ mesh: gate, mode: 'spin-y', speed: 0.35 * (g % 2 === 0 ? 1 : -1) });
      }
      for (let d = 0; d < 6; d++) {
        const drop = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), pearlMat);
        const phase = (d / 6) * Math.PI * 2;
        kineticGroup.add(drop);
        animatedParts.push({ mesh: drop, mode: 'float-orbit', speed: 1.1, phase, radius: 1.85 });
      }
      break;
    }

    case 'beacon-buoys': {
      // VII. RGBAgentFlightIndicator: Fresnel lighthouse lens & orbiting harbor signal buoys
      const fresnelCore = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 24), pearlMat);
      kineticGroup.add(fresnelCore);

      for (let l = 0; l < 3; l++) {
        const lensRing = new THREE.Mesh(new THREE.CylinderGeometry(1.05 + l * 0.28, 1.05 + l * 0.28, 0.35, 24, 1, true), seaGlassMat);
        kineticGroup.add(lensRing);
        animatedParts.push({ mesh: lensRing, mode: 'spin-y', speed: (l % 2 === 0 ? 1 : -1) * 0.75 });
      }

      for (let b = 0; b < 8; b++) {
        const buoy = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), brassMat);
        const phase = (b / 8) * Math.PI * 2;
        kineticGroup.add(buoy);
        animatedParts.push({ mesh: buoy, mode: 'float-orbit', speed: 0.65, phase, radius: 2.35 });
      }
      break;
    }

    case 'amber-kiln': {
      // VIII. MothBake: Golden Baltic amber monoliths & Fibonacci mother-of-pearl spiral
      const amberCore = new THREE.Mesh(new THREE.DodecahedronGeometry(0.95, 0), seaGlassMat);
      kineticGroup.add(amberCore);
      animatedParts.push({ mesh: amberCore, mode: 'spin-xyz', speed: 0.35 });

      const innerPearl = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), pearlMat);
      kineticGroup.add(innerPearl);

      for (let n = 0; n < 9; n++) {
        const angle = n * 0.72;
        const r = 0.8 + n * 0.18;
        const shellNode = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), brassMat);
        shellNode.position.set(Math.cos(angle) * r, (n - 4) * 0.22, Math.sin(angle) * r);
        kineticGroup.add(shellNode);
        animatedParts.push({ mesh: shellNode, mode: 'bob', speed: 1.5, phase: n * 0.4, baseY: shellNode.position.y });
      }
      break;
    }

    case 'sextant-dock': {
      // IX. Warpi: Precision marine brass sextant arc, horizon mirror & starlight sightline
      const sextantArc = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.09, 16, 48, Math.PI * 0.85), brassMat);
      sextantArc.rotation.z = Math.PI * 0.08;
      kineticGroup.add(sextantArc);

      const indexArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.35, 0.12), pearlMat);
      kineticGroup.add(indexArm);
      animatedParts.push({ mesh: indexArm, mode: 'pendulum', speed: 0.9, phase: 0 });

      const horizonGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.08, 32), seaGlassMat);
      horizonGlass.rotation.x = Math.PI / 3;
      kineticGroup.add(horizonGlass);
      animatedParts.push({ mesh: horizonGlass, mode: 'spin-y', speed: 0.4 });
      break;
    }

    case 'weathervane-conservatory': {
      // X. HermesDashboard: Victorian sea-glass dome with spinning copper anemometer cups
      const domeGeo = new THREE.SphereGeometry(1.95, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const dome = new THREE.Mesh(domeGeo, seaGlassMat);
      dome.position.y = -0.3;
      kineticGroup.add(dome);

      const vaneSpinner = new THREE.Group();
      vaneSpinner.position.y = 0.85;
      for (let c = 0; c < 4; c++) {
        const ang = (c / 4) * Math.PI * 2;
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8), brassMat);
        arm.rotation.z = Math.PI / 2;
        arm.rotation.y = ang;
        arm.position.set(Math.cos(ang) * 0.7, 0, Math.sin(ang) * 0.7);
        vaneSpinner.add(arm);

        const cup = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 12, 0, Math.PI), pearlMat);
        cup.position.set(Math.cos(ang) * 1.4, 0, Math.sin(ang) * 1.4);
        vaneSpinner.add(cup);
      }
      kineticGroup.add(vaneSpinner);
      animatedParts.push({ mesh: vaneSpinner, mode: 'spin-y', speed: 1.8 });
      break;
    }

    case 'memory-lighthouse':
    default: {
      // XI. Becomussy: Five-tiered Memory Well & Sovereign Coastal Lighthouse
      for (let layer = 0; layer < 5; layer++) {
        const r = 2.25 - layer * 0.34;
        const strataRing = new THREE.Mesh(new THREE.TorusGeometry(r, 0.065, 16, 56), layer % 2 === 0 ? brassMat : seaGlassMat);
        strataRing.rotation.x = Math.PI / 2;
        strataRing.position.y = (layer - 2) * 0.58;
        kineticGroup.add(strataRing);
        animatedParts.push({
          mesh: strataRing,
          mode: 'bob',
          speed: 1.1 + layer * 0.15,
          phase: layer * 0.7,
          baseY: strataRing.position.y
        });
      }
      const lanternHeart = new THREE.Mesh(new THREE.OctahedronGeometry(0.78, 2), pearlMat);
      kineticGroup.add(lanternHeart);
      animatedParts.push({ mesh: lanternHeart, mode: 'spin-xyz', speed: 0.55 });
      break;
    }
  }

  return { kineticGroup, animatedParts };
}

/**
 * Builds all 11 coastal sanctuary pavilions and returns their interactive descriptors.
 */
export function buildSanctuaryPavilions(projects) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'SanctuaryArchipelago';

  const pavilionEntries = [];
  const pickableMeshes = [];

  for (const project of projects) {
    const x = Math.cos(project.tideAngle) * project.tideRadius;
    const z = Math.sin(project.tideAngle) * project.tideRadius;

    const accentColor = new THREE.Color(project.accentHex);
    const secondaryColor = new THREE.Color(project.secondaryHex);
    const emissiveColor = new THREE.Color(project.emissiveHex);

    const pavilionGroup = new THREE.Group();
    pavilionGroup.name = `Pavilion_${project.id}`;
    pavilionGroup.position.set(x, 0, z);
    // Face inward toward the central Memory Lagoon
    pavilionGroup.lookAt(0, 0, 0);

    const { baseGroup, reefRing, brassRim, brassMat } = createPavilionBase(
      accentColor,
      secondaryColor,
      emissiveColor
    );
    pavilionGroup.add(baseGroup);

    const { kineticGroup, animatedParts } = buildKineticSculpture(
      project,
      accentColor,
      secondaryColor,
      emissiveColor
    );
    pavilionGroup.add(kineticGroup);

    // Invisible generous hit-volume for effortless clicking/hovering
    const hitGeo = new THREE.CylinderGeometry(4.4, 4.6, 7.2, 16);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.y = 3.2;
    hitMesh.userData = { projectId: project.id, project };
    pavilionGroup.add(hitMesh);
    pickableMeshes.push(hitMesh);

    // Tag all visible child meshes so raycasting works on any sculpture piece too
    pavilionGroup.traverse((child) => {
      if (child.isMesh) {
        child.userData.projectId = project.id;
        child.userData.project = project;
      }
    });

    rootGroup.add(pavilionGroup);

    pavilionEntries.push({
      id: project.id,
      project,
      group: pavilionGroup,
      kineticGroup,
      reefRing,
      brassRim,
      brassMat,
      animatedParts,
      worldPos: new THREE.Vector3(x, project.elevation, z),
      hoverEnergy: 0,
      activeEnergy: 0
    });
  }

  return {
    rootGroup,
    pavilionEntries,
    pickableMeshes
  };
}

/**
 * Animates all 11 kinetic sculptures on every frame with organic wave motion & harmonic excitation.
 */
export function updateSanctuaryPavilions(pavilionEntries, elapsed, activeProjectId, hoveredProjectId, audioPulse = 0) {
  for (const entry of pavilionEntries) {
    const isTarget = entry.id === activeProjectId;
    const isHovered = entry.id === hoveredProjectId;

    const targetActive = isTarget ? 1.0 : 0.0;
    const targetHover = isHovered || isTarget ? 1.0 : 0.0;

    entry.activeEnergy += (targetActive - entry.activeEnergy) * 0.08;
    entry.hoverEnergy += (targetHover - entry.hoverEnergy) * 0.12;

    const boost = 1.0 + entry.hoverEnergy * 0.85 + entry.activeEnergy * 1.1 + audioPulse * 0.6;

    // Gentle floating breath of the entire kinetic centerpiece
    entry.kineticGroup.position.y =
      3.25 + Math.sin(elapsed * 1.15 + entry.project.index * 0.7) * 0.18 + entry.activeEnergy * 0.25;
    entry.kineticGroup.rotation.y = elapsed * 0.14 * boost;

    // Glow intensity on the pier brass rim & submerged reef ring
    entry.brassMat.emissiveIntensity = 0.35 + entry.hoverEnergy * 0.55 + entry.activeEnergy * 0.75;
    entry.reefRing.material.opacity = 0.35 + entry.hoverEnergy * 0.35 + Math.sin(elapsed * 2.2 + entry.project.index) * 0.08;
    const scaleRing = 1.0 + entry.hoverEnergy * 0.08 + Math.sin(elapsed * 1.8 + entry.project.index) * 0.025;
    entry.reefRing.scale.set(scaleRing, 1, scaleRing);

    for (const part of entry.animatedParts) {
      const m = part.mesh;
      const spd = part.speed * boost;
      switch (part.mode) {
        case 'armillary':
          if (part.axis === 0) m.rotation.x = elapsed * spd;
          else if (part.axis === 1) m.rotation.y = elapsed * spd;
          else m.rotation.z = elapsed * spd;
          break;
        case 'float-orbit': {
          const ang = elapsed * spd + part.phase;
          m.position.x = Math.cos(ang) * part.radius;
          m.position.z = Math.sin(ang) * part.radius;
          m.position.y = Math.sin(ang * 2.0) * 0.45;
          m.lookAt(0, 0, 0);
          break;
        }
        case 'bob':
          m.position.y = part.baseY + Math.sin(elapsed * spd + part.phase) * 0.32;
          m.rotation.y = elapsed * 0.25;
          break;
        case 'string-vibe': {
          const vibe = 1.0 + Math.sin(elapsed * spd * 4.0 + part.phase) * (0.04 + entry.hoverEnergy * 0.12);
          m.scale.set(vibe, 1, vibe);
          break;
        }
        case 'pulse-ring': {
          const s = 0.85 + ((elapsed * 0.45 + part.phase) % 1.0) * 0.65;
          m.scale.set(s, s, s);
          break;
        }
        case 'spin-y':
          m.rotation.y = elapsed * spd;
          break;
        case 'spin-xyz':
          m.rotation.x = elapsed * spd * 0.7;
          m.rotation.y = elapsed * spd;
          break;
        case 'pendulum':
          m.rotation.z = Math.sin(elapsed * spd) * 0.48;
          break;
        default:
          break;
      }
    }
  }
}
