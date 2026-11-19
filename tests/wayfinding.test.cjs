const test = require('node:test');
const assert = require('node:assert/strict');
const map = require('../dist/wayfinding.js');

test('all three floors share physically aligned lift and stair cores', () => {
  for (const core of ['lift','stairs']) {
    const positions = [1,2,3].map(floor=>map.graph.nodes[`${floor}:${core}`]);
    assert.equal(new Set(positions.map(p=>`${p.x},${p.y}`)).size,1);
  }
});

test('all walkable map graph connections are axis aligned within a floor', () => {
  for (const edge of map.graph.edges.filter(e=>e.kind==='walk')) {
    const a=map.graph.nodes[edge.from],b=map.graph.nodes[edge.to];
    assert.equal(a.floor,b.floor);
    assert.ok(a.x===b.x || a.y===b.y, `${edge.from} => ${edge.to} cuts diagonally across rooms`);
  }
});

test('adult imaging route remains on the entrance level', () => {
  for (const accessible of [true,false]) {
    const path=map.shortestRoute(false,accessible);
    assert.equal(path[0].id,'1:entrance');
    assert.equal(path.at(-1).id,'1:waitingA');
    assert.deepEqual([...new Set(path.map(n=>n.floor))],[1]);
  }
});

test('family route takes the lift only when step-free is selected', () => {
  const path=map.shortestRoute(true,true);
  assert.equal(path[0].id,'1:entrance');
  assert.equal(path.at(-1).id,'2:waitingC');
  assert.deepEqual([...new Set(path.map(n=>n.floor))],[1,2]);
  assert.ok(path.some(p=>p.id==='1:lift'));
  assert.ok(path.some(p=>p.id==='2:lift'));
  assert.ok(!path.some(p=>p.name==='stairs'));
});

test('family standard route uses the stairs without an invisible floor jump', () => {
  const path=map.shortestRoute(true,false);
  assert.ok(path.some(p=>p.id==='1:stairs'));
  assert.ok(path.some(p=>p.id==='2:stairs'));
  assert.ok(!path.some(p=>p.name==='lift'));
  const jumps=path.slice(1).filter((p,i)=>p.floor!==path[i].floor);
  assert.equal(jumps.length,1);
  assert.equal(jumps[0].id,'2:stairs');
});

test('selecting floor three shows the building layout but no invented visit route', () => {
  const html=map.render({family:true,stepFree:true,selectedFloor:3,language:'en'});
  assert.match(html,/No route on this floor/);
  assert.match(html,/FLOOR 03/);
  assert.doesNotMatch(html,/<path class="map-route-main"/);
});

test('all three languages contain usable names for each floor and waiting area', () => {
  for (const language of ['en','fi','sv']) {
    const strings=map.copy[language];
    assert.equal(strings.floorNames.length,3);
    assert.ok(strings.rooms.waitingA && strings.rooms.waitingC);
    const html=map.render({family:true,stepFree:true,selectedFloor:2,language});
    assert.match(html,new RegExp(strings.rooms.waitingC));
  }
});
