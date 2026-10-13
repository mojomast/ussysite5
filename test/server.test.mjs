import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppServer } from '../server.mjs';

async function withServer(fn) {
  const server = createAppServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('GET /api/health returns SOLARIS // VESPERS metadata and all 11 pavilion IDs', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'ok');
    assert.equal(data.version, '5.0.0');
    assert.equal(data.world, 'SOLARIS // VESPERS');
    assert.equal(data.pavilions, 11);
    assert.equal(data.pavilionIds.length, 11);
    assert.deepEqual(data.moods, ['solaris', 'vespers', 'nocturne', 'aurora']);
  });
});

test('GET and POST /api/sanctuary/state persist mood and floating wish lanterns', async () => {
  await withServer(async (baseUrl) => {
    const postRes = await fetch(`${baseUrl}/api/sanctuary/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        state: {
          mood: 'vespers',
          tideLevel: 0.75,
          lanterns: [{ id: 'l1', reflection: 'Golden hour over the bay' }]
        }
      })
    });
    assert.equal(postRes.status, 200);
    const postData = await postRes.json();
    assert.equal(postData.ok, true);
    assert.equal(postData.state.mood, 'vespers');
    assert.equal(postData.state.tideLevel, 0.75);
    assert.equal(postData.state.lanterns.length, 1);
  });
});

test('Static file allowlist serves index.html and denies server.mjs and dotfiles', async () => {
  await withServer(async (baseUrl) => {
    const indexRes = await fetch(`${baseUrl}/`);
    assert.equal(indexRes.status, 200);
    const html = await indexRes.text();
    assert.ok(html.includes('SOLARIS'));

    const deniedServer = await fetch(`${baseUrl}/server.mjs`);
    assert.equal(deniedServer.status, 404);

    const deniedEnv = await fetch(`${baseUrl}/.env`);
    assert.equal(deniedEnv.status, 404);
  });
});
