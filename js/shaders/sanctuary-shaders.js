/**
 * USSYSITE5 // SOLARIS — VESPERS
 * CUSTOM GLSL SHADER LIBRARY FOR THE GOLDEN HOUR TIDEPOOL SANCTUARY
 *
 * Includes:
 * 1. TIDE_WATER_VERTEX / FRAGMENT:
 *    Multi-octave Gerstner coastal wave surface with golden-hour sun path glitter,
 *    Schlick Fresnel sky reflection, interactive ripple rings (up to 4 simultaneous drops),
 *    and subsurface bioluminescent dinoflagellate caustic veins.
 * 2. SKY_DOME_VERTEX / FRAGMENT:
 *    Atmospheric Rayleigh/Mie sunset & twilight sky dome with glowing solar corona,
 *    drifting dusk cloud wisps, and emerging evening stars.
 * 3. BIOLUM_SWARM_VERTEX / FRAGMENT:
 *    80,000-particle curl-drift firefly & marine plankton shader with warm gold / electric cyan
 *    breathing luminescence and soft bokeh discs.
 * 4. SOLAR_HEART_VERTEX / FRAGMENT:
 *    Central Sovereign Lighthouse & Memory Well crystalline water-lily shader with concentric
 *    golden caustic ripples.
 * 5. CINEMATIC_POST_SHADER:
 *    Filmic ACES warm golden-hour color grade, subtle halation, and organic coastal vignette.
 */

export const TIDE_WATER_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uTideSwell;
  uniform vec4 uRipples[4]; // xyz = world pos, w = startTime

  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vWaveHeight;
  varying float vCrest;
  varying float vRippleEnergy;

  const float GRAVITY = 9.81;

  // One Gerstner (trochoidal) wave with the deep-water dispersion relation
  // omega = sqrt(g*k) (long swells travel faster than short chop). Accumulates
  // displacement, the analytic tangent/binormal, and the horizontal Jacobian terms.
  void gerstner(vec2 p, vec2 dir, float wavelength, float steepness, float scale, float time,
                inout vec3 disp, inout vec3 tang, inout vec3 bin, inout vec4 jac) {
    float k = 6.28318530718 / wavelength;
    float omega = sqrt(GRAVITY * k);
    float a = (steepness / k) * scale;
    float f = k * dot(dir, p) - omega * time;
    float sf = sin(f);
    float cf = cos(f);

    disp.x += dir.x * a * cf;
    disp.z += dir.y * a * cf;
    disp.y += a * sf;

    float q = steepness * scale;
    tang += vec3(-dir.x * dir.x * (q * sf), dir.x * (q * cf), -dir.x * dir.y * (q * sf));
    bin  += vec3(-dir.x * dir.y * (q * sf), dir.y * (q * cf), -dir.y * dir.y * (q * sf));

    jac.x += -q * dir.x * dir.x * sf; // dDx/dx
    jac.y += -q * dir.x * dir.y * sf; // dDx/dz
    jac.z += -q * dir.y * dir.x * sf; // dDz/dx
    jac.w += -q * dir.y * dir.y * sf; // dDz/dz
  }

  void main() {
    vUv = uv;
    vec4 worldInitial = modelMatrix * vec4(position, 1.0);
    vec2 p = worldInitial.xz;

    // Gentle tidepool swell. Steepness sum stays well under 1 so the surface
    // never self-intersects; amplitude is authored through steepness.
    float scale = 0.16 + uTideSwell * 0.34;

    vec3 disp = vec3(0.0);
    vec3 tang = vec3(1.0, 0.0, 0.0);
    vec3 bin  = vec3(0.0, 0.0, 1.0);
    vec4 jac = vec4(0.0);

    gerstner(p, normalize(vec2( 0.85,  0.53)), 34.0, 0.16, scale, uTime, disp, tang, bin, jac);
    gerstner(p, normalize(vec2(-0.55,  0.83)), 22.0, 0.13, scale, uTime, disp, tang, bin, jac);
    gerstner(p, normalize(vec2( 0.30, -0.95)), 13.0, 0.11, scale, uTime, disp, tang, bin, jac);
    gerstner(p, normalize(vec2(-0.90, -0.30)),  8.5, 0.09, scale, uTime, disp, tang, bin, jac);
    gerstner(p, normalize(vec2( 0.62,  0.78)),  5.0, 0.07, scale, uTime, disp, tang, bin, jac);
    gerstner(p, normalize(vec2(-0.35,  0.94)),  3.2, 0.06, scale, uTime, disp, tang, bin, jac);

    // Interactive ripple rings: height plus an analytic radial gradient so the
    // rings also perturb the surface normal (not just the height).
    float rippleSum = 0.0;
    float rippleEnergy = 0.0;
    vec2 rippleGrad = vec2(0.0);
    for (int i = 0; i < 4; i++) {
      float age = uTime - uRipples[i].w;
      if (age > 0.0 && age < 9.0) {
        vec2 rel = p - uRipples[i].xz;
        float dist = max(length(rel), 0.0001);
        float radius = age * 9.5;
        float band = exp(-abs(dist - radius) * 0.45) * exp(-age * 0.38);
        float phase = (dist - radius) * 3.4;
        rippleSum += sin(phase) * band * 0.24;
        rippleEnergy += band;
        rippleGrad += (rel / dist) * (cos(phase) * 3.4 * band) * 0.24;
      }
    }
    disp.y += rippleSum;

    // Analytic Gerstner normal (no finite differencing), then ripple perturbation.
    vec3 n = normalize(cross(bin, tang));
    n.xz += -rippleGrad;
    n = normalize(n);

    // Jacobian of the horizontal displacement map: compressing crests -> foam.
    float J = (1.0 + jac.x) * (1.0 + jac.w) - jac.y * jac.z;

    vec3 displacedPos = worldInitial.xyz + disp;
    vWorldPos = displacedPos;
    vNormal = n;
    vWaveHeight = disp.y;
    vCrest = J;
    vRippleEnergy = clamp(rippleEnergy, 0.0, 1.5);

    gl_Position = projectionMatrix * viewMatrix * vec4(displacedPos, 1.0);
  }
`;

export const TIDE_WATER_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uBioluminescence;
  uniform vec3 uDeepColor;
  uniform vec3 uShallowColor;
  uniform vec3 uSkyHorizonColor;
  uniform vec3 uSkyZenithColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;
  uniform vec3 uAccentColor;

  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying float vWaveHeight;
  varying float vCrest;
  varying float vRippleEnergy;

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = vnoise(p) * 0.55;
    v += vnoise(p * 2.03 + 5.2) * 0.3;
    v += vnoise(p * 4.01 - 3.1) * 0.15;
    return v;
  }

  // Procedural Voronoi/Caustic pattern for subsurface bioluminescence
  float causticPattern(vec2 p, float time) {
    vec2 uv = p * 0.18;
    float a = sin(uv.x * 3.1 + time * 0.8 + cos(uv.y * 2.7 - time * 0.6));
    float b = cos(uv.y * 3.7 - time * 0.7 + sin(uv.x * 2.9 + time * 0.9));
    float c = sin((uv.x + uv.y) * 2.5 + time * 0.5);
    return pow(clamp((a * b + c) * 0.5 + 0.5, 0.0, 1.0), 3.0);
  }

  void main() {
    vec3 V = normalize(cameraPosition - vWorldPos);
    vec3 L = normalize(uSunDir);
    float dist = length(cameraPosition - vWorldPos);
    float detailFade = exp(-dist * 0.018);

    // ---- micro-detail normal: two scrolling bands, faded with distance so the
    // horizon reads as a soft streak instead of aliasing into shimmer. ----
    vec2 q = vWorldPos.xz;
    float t = uTime;
    vec2 micro = vec2(0.0);
    micro += vec2(cos(q.x * 1.7 + t * 1.3), cos(q.y * 1.5 - t * 1.1)) * 0.045;
    micro += vec2(cos((q.x + q.y) * 3.4 - t * 2.1), cos((q.y - q.x) * 2.9 + t * 1.8)) * 0.022;
    vec3 N = normalize(vNormal + vec3(micro.x * detailFade, 0.0, micro.y * detailFade));

    float NoV = clamp(dot(N, V), 0.0, 1.0);
    float NoL = clamp(dot(N, L), 0.0, 1.0);

    // ---- Fresnel (Schlick, water F0 = 0.02) ----
    float F0 = 0.02;
    float fresnel = F0 + (1.0 - F0) * pow(1.0 - NoV, 5.0);

    // ---- analytic sky reflection, matching the sky dome's gradient + sun ----
    vec3 R = reflect(-V, N);
    float skyElev = clamp(R.y, 0.0, 1.0);
    vec3 skyReflect = mix(uSkyZenithColor, uSkyHorizonColor, pow(1.0 - skyElev, 2.6));
    float sunAlign = max(dot(R, L), 0.0);
    skyReflect += uSunColor * exp(-abs(R.y - 0.06) * 9.0) * 0.45;          // horizon afterglow
    skyReflect += uSunColor * smoothstep(0.9982, 0.9996, sunAlign) * 2.2;  // reflected sun disc
    skyReflect += uSunColor * (pow(sunAlign, 12.0) * 0.55 + pow(sunAlign, 64.0) * 0.85);

    // ---- water body: depth gradient + Beer-Lambert-ish tint + subsurface ----
    float radialDist = length(vWorldPos.xz);
    float shallow = exp(-radialDist * 0.02);
    float heightMix = clamp(vWaveHeight * 1.6 + 0.5, 0.0, 1.0);
    vec3 body = mix(uDeepColor, uShallowColor, shallow * 0.78 + heightMix * 0.22);

    // subsurface scattering glows through thin, back-lit crests
    float sss = pow(clamp(dot(V, -L), 0.0, 1.0), 4.0) * smoothstep(0.02, 0.28, vWaveHeight);
    body += uShallowColor * sss * 0.55;

    // bioluminescent dinoflagellate veins & pavilion ring resonance (mood-driven)
    float caustics1 = causticPattern(vWorldPos.xz, uTime);
    float caustics2 = causticPattern(vWorldPos.xz * 1.6 + vec2(12.4, -7.8), -uTime * 0.85);
    float bioVeins = (caustics1 * 0.65 + caustics2 * 0.55) * uBioluminescence;
    float ringBand = exp(-abs(radialDist - 49.5) * 0.14);
    vec3 bioColor = mix(vec3(0.18, 0.88, 0.86), uAccentColor, 0.45);
    body += bioColor * bioVeins * (0.45 + ringBand * 0.85);
    body += mix(uSunColor, vec3(0.35, 0.95, 0.92), uBioluminescence * 0.6) * vRippleEnergy * 0.9;

    // ---- foam: breaking crests (Jacobian) + shoreline band, broken by fbm ----
    float n = fbm(q * 0.35 + vec2(t * 0.04, -t * 0.03));
    float crestFoam = smoothstep(0.72, 0.06, vCrest) * smoothstep(0.14, 0.36, vWaveHeight);
    float shoreFoam = exp(-abs(radialDist - 49.5) * 0.3) * 0.6 + smoothstep(0.74, 1.0, shallow) * 0.5;
    float foam = clamp(crestFoam * (0.45 + 0.75 * n) + shoreFoam * (0.22 + 0.5 * n), 0.0, 1.0) * 0.85;
    body = mix(body, vec3(1.0, 0.98, 0.94), foam);

    // ---- combine body + sky reflection via Fresnel ----
    vec3 color = mix(body, skyReflect, clamp(fresnel, 0.0, 1.0));

    // ---- sun specular: GGX micro-facet lobe + shattered glitter ----
    vec3 H = normalize(L + V);
    float NoH = max(dot(N, H), 0.0);
    float rough = 0.05 + 0.04 * detailFade;
    float a2 = rough * rough;
    float denom = NoH * NoH * (a2 - 1.0) + 1.0;
    float D = a2 / (3.14159265 * denom * denom);
    color += uSunColor * D * fresnel * 3.0;
    color += uSunColor * pow(NoH, 400.0) * detailFade * 3.5;

    // ---- distance atmospheric horizon mist blend ----
    float mist = smoothstep(90.0, 230.0, radialDist);
    color = mix(color, uSkyHorizonColor * 0.95, mist);

    gl_FragColor = vec4(color, 0.94);
  }
`;

export const SKY_DOME_VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldDir;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldDir = normalize(worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const SKY_DOME_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uZenithColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;
  uniform float uBioluminescence;

  varying vec3 vWorldDir;
  varying vec2 vUv;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 dir = normalize(vWorldDir);
    float y = clamp(dir.y, 0.0, 1.0);

    // Smooth atmospheric gradient from glowing horizon to deep twilight zenith
    float horizonCurve = pow(1.0 - y, 2.6);
    vec3 sky = mix(uZenithColor, uHorizonColor, horizonCurve);

    // Warm golden-rose band just above the horizon
    float afterglow = exp(-abs(dir.y - 0.06) * 9.0) * 0.45;
    sky += uSunColor * afterglow;

    // Solar / Lunar disc & Mie scattering corona
    vec3 sunNorm = normalize(uSunDir);
    float sunCos = max(dot(dir, sunNorm), 0.0);
    float sunDisc = smoothstep(0.9982, 0.9996, sunCos);
    float sunCorona = pow(sunCos, 12.0) * 0.55 + pow(sunCos, 64.0) * 0.85;
    sky += uSunColor * (sunDisc * 2.2 + sunCorona);

    // Soft high-altitude dusk cloud ribbons
    if (dir.y > 0.02) {
      vec2 cloudUv = dir.xz / (dir.y + 0.18) * 1.4 + vec2(uTime * 0.012, -uTime * 0.008);
      float wisp = sin(cloudUv.x * 2.4 + cos(cloudUv.y * 3.1)) * 0.5 + 0.5;
      float wispMask = smoothstep(0.55, 0.92, wisp) * exp(-y * 3.5) * (1.0 - uBioluminescence * 0.5);
      sky = mix(sky, mix(uHorizonColor, uSunColor, 0.55), wispMask * 0.32);
    }

    // Twilight / Nocturne starfield in the upper dome
    if (dir.y > 0.12) {
      vec2 starGrid = floor(dir.xz / (dir.y + 0.35) * 190.0);
      float rnd = hash21(starGrid);
      if (rnd > 0.993) {
        float twinkle = 0.55 + 0.45 * sin(uTime * 2.6 + rnd * 62.8);
        float starVis = smoothstep(0.12, 0.55, dir.y) * (0.35 + uBioluminescence * 0.65);
        sky += vec3(0.95, 0.97, 1.0) * twinkle * starVis * 0.9;
      }
    }

    gl_FragColor = vec4(sky, 1.0);
  }
`;

export const BIOLUM_SWARM_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBioluminescence;
  uniform float uAudioPulse;

  attribute float aPhase;
  attribute float aScale;
  attribute float aSpecies; // 0.0 = sea-plankton (low), 1.0 = golden firefly (aerial)

  varying float vAlpha;
  varying float vSpecies;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;

    // Gentle orbital coastal breeze & vertical breathing tide
    float angle = uTime * (0.045 + aSpecies * 0.03) + aPhase * 6.28318;
    float radius = length(pos.xz);
    float swirlAngle = atan(pos.z, pos.x) + sin(uTime * 0.18 + aPhase * 12.0) * 0.08;

    pos.x = cos(swirlAngle) * radius + sin(uTime * 0.7 + aPhase * 20.0) * (0.8 + aSpecies * 1.4);
    pos.z = sin(swirlAngle) * radius + cos(uTime * 0.65 + aPhase * 17.0) * (0.8 + aSpecies * 1.4);

    if (aSpecies < 0.5) {
      // Marine bioluminescent plankton skimming the tidepool surface
      pos.y = 0.15 + sin(uTime * 1.3 + radius * 0.22 + aPhase * 9.0) * 0.45;
    } else {
      // Golden-hour fireflies & sea-mist motes drifting among the pavilions
      pos.y += sin(uTime * 0.95 + aPhase * 15.0) * 1.65;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float twinkle = 0.5 + 0.5 * sin(uTime * (2.1 + aSpecies * 1.4) + aPhase * 45.0);
    vTwinkle = twinkle;
    vSpecies = aSpecies;
    vAlpha = (0.32 + twinkle * 0.68) * (0.55 + uBioluminescence * 0.45);

    float baseSize = aScale * (14.0 + uAudioPulse * 8.0 + twinkle * 6.0);
    gl_PointSize = clamp(baseSize * uPixelRatio * (55.0 / max(-mvPosition.z, 6.0)), 1.2, 22.0);
  }
`;

export const BIOLUM_SWARM_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uGoldColor;
  uniform vec3 uCyanColor;
  uniform float uBioluminescence;

  varying float vAlpha;
  varying float vSpecies;
  varying float vTwinkle;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r2 = dot(cxy, cxy);
    if (r2 > 1.0) discard;

    // Soft glowing bokeh orb
    float core = exp(-r2 * 4.2);
    float halo = (1.0 - r2) * 0.45;

    vec3 planktonColor = mix(uCyanColor, vec3(0.45, 0.98, 0.85), vTwinkle);
    vec3 fireflyColor = mix(uGoldColor, vec3(1.0, 0.68, 0.48), 1.0 - vTwinkle);
    vec3 particleColor = mix(planktonColor, fireflyColor, step(0.5, vSpecies));

    // In Nocturne mode, shift more toward luminous sea-cyan & starlight gold
    particleColor = mix(particleColor, mix(uCyanColor, uGoldColor, vSpecies), uBioluminescence * 0.35);

    gl_FragColor = vec4(particleColor * (core * 1.5 + halo), vAlpha * (core + halo));
  }
`;

export const SOLAR_HEART_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Organic lotus/tide breathing displacement
    float breathe = sin(uTime * 2.2 + position.y * 2.4) * (0.045 + uPulse * 0.08);
    vec3 displaced = position + normal * breathe;

    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const SOLAR_HEART_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPrimaryColor;
  uniform vec3 uSecondaryColor;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec2 vUv;

  void main() {
    vec3 V = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), V), 0.0), 2.2);

    float bands = 0.5 + 0.5 * sin(vWorldPos.y * 5.0 - uTime * 3.2);
    vec3 col = mix(uPrimaryColor, uSecondaryColor, fresnel * 0.7 + bands * 0.3);
    col += vec3(1.0, 0.96, 0.85) * pow(fresnel, 3.0) * 0.9;

    gl_FragColor = vec4(col, 0.92);
  }
`;

export const CINEMATIC_POST_SHADER = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uWarmth: { value: 0.25 },
    uVignette: { value: 0.28 }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uWarmth;
    uniform float uVignette;
    varying vec2 vUv;

    void main() {
      vec2 centered = vUv - 0.5;
      float dist = length(centered);

      // Gentle optical prism dispersion at screen edges
      vec2 offset = centered * dist * 0.0022;
      float r = texture2D(tDiffuse, vUv + offset).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - offset).b;
      vec3 col = vec3(r, g, b);

      // Warm golden-hour filmic tint
      col.r += uWarmth * 0.028;
      col.g += uWarmth * 0.012;

      // Subtle organic vignette that preserves luminosity
      float vig = smoothstep(0.92, 0.28, dist * (0.85 + uVignette * 0.4));
      col *= mix(0.76, 1.03, vig);

      gl_FragColor = vec4(col, 1.0);
    }
  `
};
