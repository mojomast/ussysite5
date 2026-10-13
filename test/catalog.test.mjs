import test from 'node:test';
import assert from 'node:assert/strict';
import { SANCTUARY_META, USSY_PROJECTS, getProjectById } from '../js/projects.js';
import { buildSanctuaryPavilions, updateSanctuaryPavilions } from '../js/sanctuary/pavilion-builder.js';

const CANONICAL_IDS = [
  'orbitdesktop',
  'velvetrp',
  'jammate',
  'cocs',
  'cocs-godot',
  'routetok',
  'rgbagentflightindicator',
  'mothbake',
  'warpi',
  'hermesdashboard',
  'becomussy'
];

test('SOLARIS // VESPERS catalog contains all 11 canonical mojomast repositories with emotional reflections & chord voicings', () => {
  assert.equal(USSY_PROJECTS.length, 11);
  assert.deepEqual(
    USSY_PROJECTS.map((p) => p.id),
    CANONICAL_IDS
  );

  for (const proj of USSY_PROJECTS) {
    assert.ok(proj.title && proj.pavilionTitle, `Missing titles for ${proj.id}`);
    assert.ok(proj.emotionalReflection && proj.emotionalReflection.length > 30, `Missing emotionalReflection for ${proj.id}`);
    assert.ok(proj.fieldNote && proj.fieldNote.length > 20, `Missing fieldNote for ${proj.id}`);
    assert.ok(Array.isArray(proj.chordNotes) && proj.chordNotes.length >= 5, `Missing chordNotes for ${proj.id}`);
    assert.ok(proj.repoUrl.startsWith('https://github.com/mojomast/'), `Invalid repoUrl for ${proj.id}`);
    assert.equal(getProjectById(proj.id)?.id, proj.id);
  }

  assert.equal(getProjectById('cocs')?.liveUrl, 'https://cocs.ussyco.de');
  assert.equal(SANCTUARY_META.moods.length, 4);
});

test('buildSanctuaryPavilions constructs all 11 3D kinetic coastal sculptures cleanly and animates them', () => {
  const { rootGroup, pavilionEntries, pickableMeshes } = buildSanctuaryPavilions(USSY_PROJECTS);
  assert.equal(pavilionEntries.length, 11);
  assert.equal(pickableMeshes.length, 11);
  assert.equal(rootGroup.children.length, 11);

  // Run animation update tick across all 11 sculptures
  updateSanctuaryPavilions(pavilionEntries, 2.5, 'becomussy', 'orbitdesktop', 0.6);
  const focused = pavilionEntries.find((e) => e.id === 'becomussy');
  assert.ok(focused.activeEnergy > 0);
});
