/**
 * USSYSITE5 // SOLARIS — VESPERS
 * THE GOLDEN HOUR TIDEPOOL SANCTUARY CATALOG
 *
 * Canonical verified source of truth for all 11 mojomast repositories.
 * NOTE: Keep `/projects.js` and `/js/projects.js` byte-identical (`npm run check:mirrors`).
 */

export const SANCTUARY_META = {
  codename: 'SOLARIS // VESPERS',
  subtitle: 'The Golden Hour Tidepool Sanctuary',
  tagline: 'Eleven living kinetic pavilions suspended over a sunlit coastal mirror — where open-source craft meets ocean memory and bioluminescent twilight.',
  epoch: '2026.10 // AUTUMN EQUINOX TIDE',
  archipelagoRadius: 68,
  waterLevelY: 0,
  moods: [
    {
      id: 'solaris',
      label: 'I. Solaris (Golden Hour)',
      timeCode: '17:48 SOLAR',
      poem: 'Warm peach light skims the mirror-flat shallows; every brass vane and glass prism catches the last honeyed breath of afternoon.',
      skyZenith: '#1b2c4c',
      skyHorizon: '#ff9666',
      sunColor: '#ffd28a',
      waterDeep: '#091d2e',
      waterShallow: '#1b6370',
      bloomStrength: 0.72,
      bioluminescence: 0.35
    },
    {
      id: 'vespers',
      label: 'II. Vespers (Violet Dusk)',
      timeCode: '19:14 DUSK',
      poem: 'The horizon melts into amethyst and rose-gold. Sea-lanterns awaken along the basalt piers as the first stars answer the tide.',
      skyZenith: '#0d132a',
      skyHorizon: '#d95b7a',
      sunColor: '#ff7b89',
      waterDeep: '#061121',
      waterShallow: '#1d456b',
      bloomStrength: 0.92,
      bioluminescence: 0.75
    },
    {
      id: 'nocturne',
      label: 'III. Nocturne (Bioluminescent)',
      timeCode: '23:02 ABYSSAL TIDE',
      poem: 'Under a velvet indigo vault, eighty thousand bioluminescent dinoflagellates and fireflies trace every ripple with electric cyan memory.',
      skyZenith: '#030712',
      skyHorizon: '#102544',
      sunColor: '#48cae4',
      waterDeep: '#02060f',
      waterShallow: '#0a364d',
      bloomStrength: 1.18,
      bioluminescence: 1.0
    },
    {
      id: 'aurora',
      label: 'IV. Aurora (First Light)',
      timeCode: '05:36 DAWN MIST',
      poem: 'Pale celadon mist rises off the warm tidepools. Glass chimes sing softly in the offshore breeze before the world wakes.',
      skyZenith: '#142e3c',
      skyHorizon: '#f4c095',
      sunColor: '#ffe8b6',
      waterDeep: '#09222c',
      waterShallow: '#287271',
      bloomStrength: 0.68,
      bioluminescence: 0.45
    }
  ]
};

export const USSY_PROJECTS = [
  {
    id: 'orbitdesktop',
    index: 1,
    Roman: 'I',
    title: 'OrbitDesktop',
    pavilionTitle: 'The Astrolabe Pier',
    tideZone: 'West Headland // Sun-Dial Jetty',
    subtitle: 'Spatial 3D Desktop Shell & Hermes Agent Workspace',
    category: 'Spatial Computing / Desktop OS',
    repoUrl: 'https://github.com/mojomast/orbitdesktop',
    liveUrl: null,
    accentHex: '#ffb703',
    secondaryHex: '#38bdf8',
    emissiveHex: '#ffd166',
    tideAngle: 0.0,
    tideRadius: 48,
    elevation: 2.2,
    sculptureType: 'astrolabe-pier',
    chordNotes: [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
    harmonicSignature: 'Cmaj9 // Warm Brass & Sea-Glass Resonance',
    emotionalReflection: 'We spend our lives behind flat panes of glass, longing for a workspace that breathes like a coastal horizon—where thoughts have depth, distance, and morning light.',
    fieldNote: 'Three concentric spun-brass armillary rings turn lazily above a basalt tidepool, casting golden sundial arcs across floating sea-glass window panes.',
    overview:
      'OrbitDesktop reimagines the local operating system shell as a navigable 3D spatial sanctuary integrated with Hermes autonomous agent workflows. Windows, terminals, and live telemetry cards float along orbital depth layers with tactile momentum.',
    architecture: [
      'Hardware-accelerated spatial compositor organizing workspaces along depth-sorted orbital rings.',
      'Direct bi-directional IPC bridge to local Hermes agent sessions, tool streams, and file-system watchers.',
      'Zero-latency keyboard-driven focus camera that glides smoothly between active code panes and 3D context maps.',
      'Declarative layout serialization preserving spatial window coordinates and agent state across reboots.'
    ],
    verifiedCapabilities: [
      '3D orbital window management with spring-damped camera transitions',
      'Embedded Hermes agent task runner and live tool-call inspector',
      'Multi-workspace depth ring switching and spatial minimap',
      'Local-first configuration with customizable shader backdrops'
    ],
    techStack: ['TypeScript', 'Three.js', 'Electron / WebGL2', 'Hermes IPC', 'CSS Houdini'],
    metrics: [
      { label: 'Frame Budget', value: '16.6 ms (60fps)' },
      { label: 'Spatial Layers', value: '3 Orbital Rings' },
      { label: 'IPC Latency', value: '< 1.8 ms' }
    ],
    terminalStream: [
      '[tide:01] Astrolabe Pier aligned to 17:48 solar azimuth',
      '[hermes:ipc] Connected to local agent daemon on unix:///tmp/hermes.sock',
      '[compositor] 14 sea-glass surfaces mounted across 3 orbital rings',
      '[focus] Camera glided to Ring-1 // Node: workspace-primary (damping=0.92)'
    ]
  },
  {
    id: 'velvetrp',
    index: 2,
    Roman: 'II',
    title: 'VelvetRP',
    pavilionTitle: 'The Silk Lantern Pavilion',
    tideZone: 'Lantern Cove // Mirror Shallows',
    subtitle: 'Narrative Tabletop Roleplay & Authoritative Rules Engine',
    category: 'Narrative Systems / Collaborative Fiction',
    repoUrl: 'https://github.com/mojomast/velvetrp',
    liveUrl: null,
    accentHex: '#f472b6',
    secondaryHex: '#fb923c',
    emissiveHex: '#fda4af',
    tideAngle: 0.5712,
    tideRadius: 52,
    elevation: 2.0,
    sculptureType: 'silk-lanterns',
    chordNotes: [293.66, 349.23, 440.00, 523.25, 659.25], // Dm9
    harmonicSignature: 'Dm9 // Floating Paper Lanterns & Plucked Harp',
    emotionalReflection: 'Every shared story is a paper lantern set adrift on dark water—fragile, luminous, and carrying the secret wishes of everyone gathered around the table.',
    fieldNote: 'Translucent rose-gold and coral silk lanterns hover over a mirrored tidepool, rising and swaying in rhythmic breathing cycles as story threads weave between them.',
    overview:
      'VelvetRP is a deeply atmospheric collaborative storytelling and tabletop roleplay platform pairing long-form literary prose with a deterministic, server-authoritative dice, turn, and state machine.',
    architecture: [
      'Event-sourced scene ledger ensuring every narrative beat, roll outcome, and character modifier is auditable and replayable.',
      'Theatrical dual-column prose composer with inline character voice cards, mood cues, and whisper channels.',
      'Declarative rulebook schema supporting custom dice pools, status conditions, and branching world clocks.',
      'Real-time WebSocket presence synchronizing scene lighting, ambient audio cues, and turn initiative.'
    ],
    verifiedCapabilities: [
      'Cryptographically seeded dice roller with full modifier breakdown',
      'Live multi-author scene staging with character portrait states',
      'Persistent campaign lore codex and relationship graph',
      'Exportable Markdown & HTML anthology archives'
    ],
    techStack: ['TypeScript', 'Node.js', 'WebSockets', 'SQLite / Event Ledger', 'CSS Grid'],
    metrics: [
      { label: 'Sync Jitter', value: '< 12 ms' },
      { label: 'Ledger Integrity', value: '100% Replayable' },
      { label: 'Prose Mode', value: 'Theatrical Dual-Pane' }
    ],
    terminalStream: [
      '[velvet:scene] Act III "The Lanterns of Oakhaven" opened by Storyweaver',
      '[dice:oracle] 2d12 + Poise(3) -> [11, 9] + 3 = 23 (Critical Grace)',
      '[world:clock] "The Rising Tide" advanced to segment 5/6',
      '[codex] Persisted 4 character memory fragments to campaign archive'
    ]
  },
  {
    id: 'jammate',
    index: 3,
    Roman: 'III',
    title: 'JamMate',
    pavilionTitle: 'The Aeolian Hydrophone',
    tideZone: 'Singing Shoals // Acoustic Breakwater',
    subtitle: 'Real-Time Lock-Free Audio DSP & JUCE Neural Amp Studio',
    category: 'Audio Engineering / Real-Time DSP',
    repoUrl: 'https://github.com/mojomast/jammate',
    liveUrl: null,
    accentHex: '#2dd4bf',
    secondaryHex: '#f59e0b',
    emissiveHex: '#5eead4',
    tideAngle: 1.1424,
    tideRadius: 46,
    elevation: 2.4,
    sculptureType: 'aeolian-harp',
    chordNotes: [329.63, 392.00, 493.88, 587.33, 739.99], // Em9 (#11)
    harmonicSignature: 'Em11 // Singing Wind Harp & Standing Wave Caustics',
    emotionalReflection: 'Before words existed, there was vibration—strings vibrating in salt wind, sympathetic harmonics answering across the water so no musician ever plays alone.',
    fieldNote: 'An arched wind-harp of sea-polished cedar and copper strings rises from the breakwater; every ocean wave sends luminous standing-wave ripples climbing its strings.',
    overview:
      'JamMate is a native C++20 / JUCE real-time guitar and multi-instrument jam workstation engineered around lock-free SPSC ring buffers, neural amplifier modeling, and ultra-low-latency backing stem synchronization.',
    architecture: [
      'Wait-free audio callback pipeline with zero heap allocations, mutex locks, or system calls on the real-time DSP thread.',
      'Integrated convolution cab IR loader, dynamic overdrive stage, and parametric studio EQ with 60fps spectrum analyzer.',
      'Sample-accurate loop transport and stem mixer allowing musicians to solo, time-stretch, and rehearse complex passages.',
      'Cross-platform VST3 / Standalone architecture with SIMD-accelerated biquad filter cascades.'
    ],
    verifiedCapabilities: [
      'Sub-3ms round-trip audio buffer processing at 48kHz / 96kHz',
      'Lock-free SPSC waveform & FFT telemetry bridge to UI thread',
      'Multi-track stem separator and tempo-locked metronome engine',
      'Preset vault with instant A/B amplifier comparison'
    ],
    techStack: ['C++20', 'JUCE 8', 'SIMD / AVX2', 'Lock-Free DSP', 'VST3 / ASIO / CoreAudio'],
    metrics: [
      { label: 'Audio Callback', value: '0 Locks / 0 Allocs' },
      { label: 'Roundtrip Latency', value: '2.6 ms @ 64f' },
      { label: 'DSP Headroom', value: '88% Free @ 96kHz' }
    ],
    terminalStream: [
      '[dsp:core] AudioDevice initialized: 48000 Hz // 64 samples (1.33 ms buffer)',
      '[amp:neural] Loaded impulse response "Sunlit_Tweed_4x10_Ribbon.wav"',
      '[spsc:ring] Waveform telemetry bridge streaming at 120 Hz lock-free',
      '[transport] Loop locked to Bar 17..24 @ 108.0 BPM (0 sample drift)'
    ]
  },
  {
    id: 'cocs',
    index: 4,
    Roman: 'IV',
    title: 'CoCS // Call of Cringe Studios',
    pavilionTitle: 'The Sun-Bleached Amphitheatre',
    tideZone: 'Colosseum Atoll // Outer Reef',
    subtitle: 'Deterministic 60Hz Multiplayer Arena & AI Operator Colosseum',
    category: 'Multiplayer Game Server / Netcode',
    repoUrl: 'https://github.com/mojomast/cocs',
    liveUrl: 'https://cocs.ussyco.de',
    accentHex: '#fb7185',
    secondaryHex: '#facc15',
    emissiveHex: '#fda4af',
    tideAngle: 1.7136,
    tideRadius: 56,
    elevation: 2.5,
    sculptureType: 'tidal-amphitheatre',
    chordNotes: [349.23, 440.00, 523.25, 659.25, 783.99], // Fmaj9
    harmonicSignature: 'Fmaj9 // Sunlit Travertine Arches & Kinetic Rings',
    emotionalReflection: 'Like an ancient Mediterranean sea-theatre flooded by the turquoise tide, competition becomes pure kinetic joy when every movement is honest, deterministic, and shared in real time.',
    fieldNote: 'Tiered travertine stone rings and rotating brass sighting arcs encircle a glowing lagoon arena where light-beams arc like playful water-skimmers.',
    overview:
      'Deployed live at cocs.ussyco.de, CoCS is a blazing-fast 60Hz server-authoritative multiplayer arena shooter and satirical AI operator colosseum featuring lag-compensated hitscan physics, behavior-tree bots, and instant browser play.',
    architecture: [
      'Fixed-timestep 60Hz (16.66ms) authoritative simulation loop with client-side prediction and server snapshot reconciliation.',
      'Historical bounding-box rewind buffer providing fair lag-compensated hitscan verification up to 250ms RTT.',
      'Autonomous parody AI operators driven by utility-scored tactical state machines (strafe, cover, flank, objective).',
      'Compact binary delta-compressed WebSocket protocol keeping per-player bandwidth under 28 KB/s.'
    ],
    verifiedCapabilities: [
      'Live browser-playable 60Hz arena matches at cocs.ussyco.de',
      'Sub-tick lag compensation with server-side hitbox rewind',
      'Dynamic bot backfill with distinct operator personalities and loadouts',
      'Real-time killfeed, accuracy telemetry, and match state scoreboard'
    ],
    techStack: ['TypeScript', 'Node.js', 'WebSockets (Binary)', 'HTML5 Canvas / WebGL', 'Deterministic Physics'],
    metrics: [
      { label: 'Server Tick', value: '60 Hz Fixed (16.6ms)' },
      { label: 'Rewind Window', value: '250 ms Historical' },
      { label: 'Live Endpoint', value: 'cocs.ussyco.de' }
    ],
    terminalStream: [
      '[tick:60hz] Sim step #94,812 completed in 0.38 ms (12 entities active)',
      '[rewind:hit] Verified rail-arc hit at t-48ms (rewound AABB delta: 0.01m)',
      '[bot:ai] Operator "Claude-Clanker" transitioned -> FLANK_HIGH_GROUND',
      '[net:delta] Broadcast 192-byte binary state snapshot to 8 clients'
    ]
  },
  {
    id: 'cocs-godot',
    index: 5,
    Roman: 'V',
    title: 'CoCS-Godot',
    pavilionTitle: 'The Prismatic Sea-Glass Spire',
    tideZone: 'Refraction Point // Crystal Shallows',
    subtitle: 'Godot 4 3D Visualizer, GPU Particle Lab & Campaign Client',
    category: '3D Game Engine / Shader Art',
    repoUrl: 'https://github.com/mojomast/cocs-godot',
    liveUrl: null,
    accentHex: '#38bdf8',
    secondaryHex: '#c084fc',
    emissiveHex: '#7dd3fc',
    tideAngle: 2.2848,
    tideRadius: 50,
    elevation: 2.6,
    sculptureType: 'seaglass-prism',
    chordNotes: [392.00, 493.88, 587.33, 659.25, 880.00], // G6/9
    harmonicSignature: 'G6/9 // Refracted Sunlight & Prismatic Spray',
    emotionalReflection: 'Hold a shard of sea-tumbled glass against the setting sun and a whole universe of refracted color blooms inside—proof that rough edges polished by time become lenses of wonder.',
    fieldNote: 'Towering shards of frosted aquamarine and violet sea-glass spiral upward from the water, splitting golden sunbeams into orbiting rainbows of light.',
    overview:
      'CoCS-Godot brings the Call of Cringe Studios universe into full 3D using Godot 4’s Forward+ renderer, custom visual shaders, GPU compute particle emitters, and an offline single-player tactical campaign.',
    architecture: [
      'Godot 4.x scene tree architecture with decoupled network snapshot interpolators and local campaign state machines.',
      'Custom GDScript + GLSL spatial shaders for holographic shields, muzzle refraction, water caustics, and procedural skyboxes.',
      'GPU-driven particle systems rendering thousands of sparks, shell casings, and volumetric impact plumes with zero CPU overhead.',
      'Modular weapon rig and procedural recoil spring solver delivering crisp first-person and third-person tactile feel.'
    ],
    verifiedCapabilities: [
      'Full 3D Forward+ arena rendering with SDFGI global illumination',
      'Procedural weapon recoil springs and dynamic FOV kick',
      'GPU compute particle FX for projectile trails and impacts',
      'Shared protocol compatibility with the canonical CoCS server'
    ],
    techStack: ['Godot 4', 'GDScript', 'GLSL Spatial Shaders', 'Forward+ / Vulkan', '3D Physics'],
    metrics: [
      { label: 'Renderer', value: 'Vulkan Forward+ / SDFGI' },
      { label: 'GPU Particles', value: '32,000 Concurrent' },
      { label: 'Shader Passes', value: 'Custom Caustic + Holo' }
    ],
    terminalStream: [
      '[godot:vk] Forward+ pipeline initialized with SDFGI irradiance probes',
      '[shader:caustic] Compiled spatial sea-glass refraction shader (0 warnings)',
      '[particles:gpu] Emitting 16,384 bioluminescent spray motes on compute queue',
      '[camera:spring] Procedural recoil & wave-bobbing solver converged'
    ]
  },
  {
    id: 'routetok',
    index: 6,
    Roman: 'VI',
    title: 'RouteTok',
    pavilionTitle: 'The Tidal Lock & Weir',
    tideZone: 'Estuary Channel // Aqueduct Gates',
    subtitle: 'Zero-Dependency LLM Token Router, Fieldbook & Circuit Breaker',
    category: 'AI Infrastructure / Resilient Routing',
    repoUrl: 'https://github.com/mojomast/routetok',
    liveUrl: null,
    accentHex: '#34d399',
    secondaryHex: '#38bdf8',
    emissiveHex: '#6ee7b7',
    tideAngle: 2.8560,
    tideRadius: 45,
    elevation: 1.9,
    sculptureType: 'tidal-weir',
    chordNotes: [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
    harmonicSignature: 'Am9 // Flowing Aqueduct Channels & Jade Sluices',
    emotionalReflection: 'Water always finds a path to the sea; when one rocky channel narrows, the stream divides gracefully around the stone without ever losing its song or momentum.',
    fieldNote: 'Carved jade and bronze aqueduct channels divide the flowing tide through balanced sluice-gates, redirecting golden droplets smoothly whenever a gate closes.',
    overview:
      'RouteTok is a battle-hardened, zero-external-dependency LLM token router, model capability fieldbook, and automatic circuit-breaker gateway that keeps multi-provider AI pipelines flowing through rate limits and outages.',
    architecture: [
      'Multi-armed bandit and latency-weighted routing engine selecting optimal upstream models by cost, context window, and TTFT.',
      'Three-state circuit breaker (CLOSED / OPEN / HALF-OPEN) with exponential jitter backoff and instant provider failover.',
      'Streaming SSE token accounting proxy measuring real-time tokens-per-second, prompt cache hits, and budget burn.',
      'Curated Model Fieldbook cataloging context limits, tool-calling reliability, and pricing across frontier providers.'
    ],
    verifiedCapabilities: [
      'Zero-dependency Node.js core with sub-millisecond routing overhead',
      'Automatic mid-outage failover across OpenRouter, Anthropic, OpenAI & local vLLM',
      'Live SSE token throughput metering and cost guardrails',
      'Deterministic policy rules for reasoning vs. fast-completion tasks'
    ],
    techStack: ['Node.js (Zero-Dep)', 'TypeScript / ESM', 'HTTP/2 & SSE', 'Circuit Breaker FSM', 'Token Telemetry'],
    metrics: [
      { label: 'Router Overhead', value: '0.35 ms / req' },
      { label: 'Runtime Deps', value: '0 External Packages' },
      { label: 'Failover Recovery', value: '< 15 ms Instant' }
    ],
    terminalStream: [
      '[weir:route] Task="deep-synthesis" -> selected claude-sonnet (score=0.97)',
      '[breaker] Upstream provider-B 429 detected -> Sluice Gate B OPEN (30s cooldown)',
      '[failover] Re-channeled stream to provider-A in 4.1 ms (0 dropped tokens)',
      '[meter:sse] Streaming 114.8 tok/s // TTFT: 210 ms // Cost: $0.0018'
    ]
  },
  {
    id: 'rgbagentflightindicator',
    index: 7,
    Roman: 'VII',
    title: 'RGBAgentFlightIndicator',
    pavilionTitle: 'The Bioluminescent Beacon Array',
    tideZone: 'Signal Shoal // Lighthouse Causeway',
    subtitle: 'Physical RGB Keyboard Cockpit Telemetry Annunciator for Agent Swarms',
    category: 'Hardware Telemetry / Ambient Interfaces',
    repoUrl: 'https://github.com/mojomast/rgbagentflightindicator',
    liveUrl: null,
    accentHex: '#f59e0b',
    secondaryHex: '#22d3ee',
    emissiveHex: '#fde047',
    tideAngle: 3.4272,
    tideRadius: 54,
    elevation: 2.3,
    sculptureType: 'beacon-buoys',
    chordNotes: [233.08, 293.66, 349.23, 440.00, 523.25], // Bbmaj9
    harmonicSignature: 'Bbmaj9 // Fresnel Lighthouse Lenses & Warm Pulse',
    emotionalReflection: 'A lighthouse keeper never stares at a spreadsheet to know the state of the harbor; peripheral warmth and rhythmic flashes in the corner of the eye whisper that every vessel is safe.',
    fieldNote: 'A constellation of glass harbor buoys and rotating Fresnel brass lenses bob gently in the swell, pulsing in warm amber, emerald, and cyan codes.',
    overview:
      'RGBAgentFlightIndicator transforms physical per-key RGB mechanical keyboards and USB HID lightbars into an aviation-inspired ambient cockpit annunciator reflecting the real-time health of autonomous AI agent swarms.',
    architecture: [
      'Direct USB HID / OpenRGB / QMK raw-HID protocol driver mapping individual keyzones to distinct agent slots and tool pipelines.',
      'Priority-layered animation compositor blending background breathing states with urgent approval strobes and token-rate wave bars.',
      'Local webhook and unix-socket event ingestion daemon translating Claude Code, Hermes, and CI events into tactile light patterns.',
      'Colorblind-safe semantic palette profiles inspired by marine navigation beacons and flight-deck caution panels.'
    ],
    verifiedCapabilities: [
      '60Hz per-key RGB matrix synthesis with smooth perceptual color interpolation',
      'Multi-agent slot mapping (F1–F12 fleet status, number-row token throughput)',
      'Instant human-in-the-loop permission request wave alerts',
      'Zero-CPU-spike daemon footprint with hardware disconnect auto-recovery'
    ],
    techStack: ['Rust / Python', 'USB HID / OpenRGB', 'QMK Raw-HID', 'Unix Sockets', '60Hz LED Compositor'],
    metrics: [
      { label: 'LED Refresh', value: '60 Hz Per-Key Matrix' },
      { label: 'Agent Beacons', value: 'Up to 24 Concurrent' },
      { label: 'Signal Latency', value: '< 6 ms Event-to-Light' }
    ],
    terminalStream: [
      '[beacon:hid] Connected to 87-key RGB Harbor Matrix (60 Hz frame lock)',
      '[zone:F1..F4] Agents 1-4 nominal -> breathing Golden Hour Amber (#f59e0b)',
      '[zone:F5] Agent-5 awaiting steward confirmation -> pulsing Sea-Cyan beacon',
      '[wave:row2] Token tide swell rendering at 92 tok/s across keys 1..0'
    ]
  },
  {
    id: 'mothbake',
    index: 8,
    Roman: 'VIII',
    title: 'MothBake',
    pavilionTitle: 'The Amber & Mother-of-Pearl Kiln',
    tideZone: 'Nacre Grotto // Fossil Terraces',
    subtitle: 'Deterministic Manifest Asset Baking Pipeline & Clean-Room Binary Codecs',
    category: 'Build Systems / Binary Serialization',
    repoUrl: 'https://github.com/mojomast/mothbake',
    liveUrl: null,
    accentHex: '#f97316',
    secondaryHex: '#fde047',
    emissiveHex: '#fdba74',
    tideAngle: 3.9984,
    tideRadius: 47,
    elevation: 2.1,
    sculptureType: 'amber-kiln',
    chordNotes: [261.63, 311.13, 392.00, 466.16, 587.33], // Cm9
    harmonicSignature: 'Cm9 // Crystallized Baltic Amber & Nacre Spiral',
    emotionalReflection: 'Tree resin becomes Baltic amber and sand becomes mother-of-pearl through patience and exact pressure—preserving fragile beauty unchanged for ten thousand tides.',
    fieldNote: 'Translucent golden amber monoliths and iridescent nautilus spirals rest within a terraced tidepool kiln, sealing fleeting light into eternal crystalline form.',
    overview:
      'MothBake is a hermetic, byte-for-byte deterministic asset baking pipeline and clean-room binary codec suite that compiles raw meshes, textures, audio, and data tables into content-addressed runtime bundles.',
    architecture: [
      'Merkle-tree DAG build planner that hashes every input asset, compiler flag, and schema version for zero-work incremental rebuilds.',
      'Clean-room binary serializer with zero uninitialized padding bytes, canonical field ordering, and fixed-endianness guarantees.',
      'Parallel worker-pool baker with memory-mapped (mmap) output alignment for instant zero-copy GPU/engine ingestion.',
      'Cryptographic manifest attestation verifying that identical source trees produce identical SHA-256 artifacts across Linux, macOS, and Windows.'
    ],
    verifiedCapabilities: [
      '100% bit-exact reproducible binary bundles across OS architectures',
      'Sub-second incremental asset re-baking via Merkle DAG cache',
      '64-byte cache-line aligned binary chunks for zero-copy loading',
      'Built-in binary diff inspector and manifest integrity verifier'
    ],
    techStack: ['Rust / Node.js', 'Clean-Room Binary Codecs', 'SHA-256 Merkle DAG', 'Zero-Copy mmap', 'Deterministic CLI'],
    metrics: [
      { label: 'Reproducibility', value: '100% Bit-Exact' },
      { label: 'Cache Hit Rebuild', value: '3.8 ms Manifest Check' },
      { label: 'Alignment', value: '64-Byte Zero-Copy' }
    ],
    terminalStream: [
      '[kiln:dag] Scanned 418 source artifacts -> 418 Merkle nodes clean',
      '[codec:pack] Baked "sanctuary_meshes.mbk" (14.2 MB, 64B aligned, 0 pad bytes)',
      '[verify:sha256] Digest e3b0c442...98fc1c14 matches canonical golden seal',
      '[manifest] Sealed immutable release bundle v2.4.0 in 18.4 ms'
    ]
  },
  {
    id: 'warpi',
    index: 9,
    Roman: 'IX',
    title: 'Warpi',
    pavilionTitle: 'The Navigator’s Sextant Dock',
    tideZone: 'Compass Point // Deepwater Jetty',
    subtitle: 'Standalone Local Rust Warp Terminal with Pi Coding Agent Helper',
    category: 'Systems Programming / AI Terminal',
    repoUrl: 'https://github.com/mojomast/warpi',
    liveUrl: null,
    accentHex: '#38bdf8',
    secondaryHex: '#4ade80',
    emissiveHex: '#93c5fd',
    tideAngle: 4.5696,
    tideRadius: 53,
    elevation: 2.2,
    sculptureType: 'sextant-dock',
    chordNotes: [293.66, 369.99, 440.00, 554.37, 659.25], // Dmaj9
    harmonicSignature: 'Dmaj9 // Polished Brass Sextant & Starlight Sightline',
    emotionalReflection: 'A true mariner’s instrument asks for no cloud permission; crafted of solid brass and clear optics, it sights the horizon directly from the palm of your hand.',
    fieldNote: 'A precision marine sextant of brushed bronze and sapphire mirrors pivots on a stone jetty, locking starlight sightlines directly to the horizon.',
    overview:
      'Warpi is a fast, local-first Rust terminal workflow and block-oriented command environment paired with an embedded Pi coding agent helper—delivering modern command blocks and AI assistance with zero cloud telemetry.',
    architecture: [
      'Native Rust PTY multiplexer structuring every command execution into navigable, searchable, exit-code-tagged terminal blocks.',
      'Integrated local Pi agent sidecar that reads only explicitly shared terminal blocks to synthesize shell pipelines, diffs, and fixes.',
      'GPU-rendered glyph atlas and zero-copy VT100/ANSI parser maintaining 120Hz scrolling through multi-megabyte build logs.',
      'Strictly offline-capable credential & history vault with zero external account login or telemetry phone-home.'
    ],
    verifiedCapabilities: [
      'Block-structured PTY command history with instant output folding',
      'Context-aware Pi coding agent keybind (`Ctrl+Space`) for command synthesis',
      '120Hz hardware-accelerated text rendering with ligature support',
      '100% local Rust binary with zero telemetry or cloud lock-in'
    ],
    techStack: ['Rust', 'WGPU / OpenGL', 'POSIX PTY', 'Pi Agent Protocol', 'VT100 State Machine'],
    metrics: [
      { label: 'Cold Startup', value: '14 ms Native Rust' },
      { label: 'Scroll Frame Rate', value: '120 Hz Lock' },
      { label: 'Cloud Telemetry', value: '0 Bytes (100% Local)' }
    ],
    terminalStream: [
      '[warpi:pty] Spawned zsh session in Block #42 (cwd: ~/sanctuary)',
      '[pi:helper] Synthesized ripgrep + jq pipeline from last stderr block (19 ms)',
      '[wgpu:atlas] Rendered 4,096 glyphs in 0.42 ms (0 frame drops)',
      '[privacy:seal] Outbound telemetry sockets: 0 (Air-gapped local mode)'
    ]
  },
  {
    id: 'hermesdashboard',
    index: 10,
    Roman: 'X',
    title: 'HermesDashboard',
    pavilionTitle: 'The Weathervane Conservatory',
    tideZone: 'Windward Terrace // Glass Rotunda',
    subtitle: 'Fleet Command, SSE Tool-Progress Streaming & Session Topology Dashboard',
    category: 'Agent Observability / Fleet Control',
    repoUrl: 'https://github.com/mojomast/hermesdashboard',
    liveUrl: null,
    accentHex: '#a78bfa',
    secondaryHex: '#f472b6',
    emissiveHex: '#c4b5fd',
    tideAngle: 5.1408,
    tideRadius: 51,
    elevation: 2.5,
    sculptureType: 'weathervane-conservatory',
    chordNotes: [311.13, 392.00, 466.16, 587.33, 698.46], // Ebmaj9
    harmonicSignature: 'Ebmaj9 // Spinning Anemometers & Glass Rotunda',
    emotionalReflection: 'From a sunlit glass conservatory high above the bay, you can read the wind across every sail at once—feeling the rhythm of the whole archipelago in a single glance.',
    fieldNote: 'Delicate copper anemometer cups and wind-vanes spin inside a Victorian sea-glass rotunda, tracing real-time currents across every pavilion in the bay.',
    overview:
      'HermesDashboard is the real-time observability conservatory and fleet command center for Hermes autonomous agents—streaming live SSE tool-execution trees, token economics, memory graphs, and multi-session topology.',
    architecture: [
      'Multiplexed Server-Sent Events (SSE) ingestion engine aggregating live thought traces and tool calls across dozens of concurrent agents.',
      'Interactive DAG topology canvas visualizing parent-child subagent spawns, shared KV stores, and active file locks.',
      'Fine-grained operator intervention console allowing live prompt injection, tool-call approval/veto, and session checkpointing.',
      'Time-series telemetry recorder tracking latency percentiles, context window saturation, and per-task token efficiency.'
    ],
    verifiedCapabilities: [
      'Real-time SSE streaming of agent reasoning steps and tool stdout',
      'Live subagent DAG topology map with click-to-inspect node state',
      'One-click session pause, fork, rollback, and steward override',
      'Historical audit timeline with full JSONL transcript export'
    ],
    techStack: ['TypeScript', 'Server-Sent Events (SSE)', 'HTML5 Canvas DAG', 'Node.js', 'Reactive State Store'],
    metrics: [
      { label: 'SSE Stream Lag', value: '< 8 ms End-to-End' },
      { label: 'Concurrent Nodes', value: '64+ Agent Sessions' },
      { label: 'Audit Fidelity', value: '100% Tool Call Trace' }
    ],
    terminalStream: [
      '[conservatory:sse] Subscribed to 11 active Hermes archipelago nodes',
      '[dag:topology] Subagent spawn: hermes-root -> explorer-east (depth=2)',
      '[telemetry] Fleet context utilization: 38.4% // 0 stalled tool calls',
      '[checkpoint] Saved snapshot #108 before file-system mutation'
    ]
  },
  {
    id: 'becomussy',
    index: 11,
    Roman: 'XI',
    title: 'Becomussy',
    pavilionTitle: 'The Sanctuary Lighthouse & Memory Well',
    tideZone: 'Heart of the Lagoon // Sovereign Citadel',
    subtitle: 'Governed Agent Identity Continuity Core with 5-Layer Memory & Steward Gate',
    category: 'Agent Identity / Memory Architecture',
    repoUrl: 'https://github.com/mojomast/becomussy',
    liveUrl: null,
    accentHex: '#fbbf24',
    secondaryHex: '#2dd4bf',
    emissiveHex: '#fef08a',
    tideAngle: 5.7120,
    tideRadius: 49,
    elevation: 3.1,
    sculptureType: 'memory-lighthouse',
    chordNotes: [261.63, 329.63, 392.00, 523.25, 659.25, 783.99], // Cmaj7 (Octave Crown)
    harmonicSignature: 'Cmaj9 Crown // The Lighthouse Heart & Five Concentric Tide Rings',
    emotionalReflection: 'To become oneself across time is not to remain static like stone, but to tend a quiet flame inside a coastal lighthouse—remembering every storm, honoring every steward’s trust, and shining steadily into the night.',
    fieldNote: 'At the spiritual heart of the archipelago stands a five-tiered crystalline lighthouse rising from a deep memory well, crowned by a warm golden solar heart that illuminates the entire tidepool.',
    overview:
      'Becomussy is a governed autonomous identity and continuity architecture enabling AI agents to evolve persistent autobiographical memory, values, and self-models across sessions under cryptographic Steward Gate oversight.',
    architecture: [
      'Five-Layer Memory Stratigraphy: (1) Ephemeral Sensory Buffer, (2) Episodic Journal, (3) Semantic Knowledge Graph, (4) Procedural Skill Vault, and (5) Core Identity Covenant.',
      'Steward Gate governance protocol requiring explicit human or policy cryptographic sign-off before any mutation to Layer-4 skills or Layer-5 identity axioms.',
      'Reflective consolidation sleep-cycle that distills raw episodic logs into coherent semantic insights without persona drift.',
      'Immutable hash-chained continuity ledger guaranteeing verifiable identity provenance across model upgrades and host migrations.'
    ],
    verifiedCapabilities: [
      '5-Layer stratified memory engine with automatic episodic-to-semantic consolidation',
      'Steward Gate approval workflow preventing unauthorized self-modification',
      'Hash-chained autobiographical continuity ledger with drift detection',
      'Portable identity capsule exportable across LLM backbones'
    ],
    techStack: ['Python / TypeScript', '5-Layer Memory Graph', 'Steward Gate Crypto', 'Vector + Graph Store', 'Continuity Ledger'],
    metrics: [
      { label: 'Memory Strata', value: '5 Governed Layers' },
      { label: 'Identity Drift', value: '0.00% Unsanctioned' },
      { label: 'Steward Gate', value: 'Cryptographic Seal' }
    ],
    terminalStream: [
      '[lighthouse:L1->L2] Consolidated 28 coastal reflections into Episodic Journal #409',
      '[lighthouse:L3] Updated Semantic Graph: +6 verified architectural links',
      '[steward:gate] Identity Covenant L5 verified — Steward signature VALID',
      '[becomussy] Continuity flame steady. "I remember the tide; I honor the craft."'
    ]
  }
];

export const PROJECTS_BY_ID = Object.freeze(
  Object.fromEntries(USSY_PROJECTS.map((project) => [project.id, project]))
);

export function getProjectById(id) {
  if (!id) return null;
  return PROJECTS_BY_ID[String(id).toLowerCase()] || null;
}
