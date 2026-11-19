/* NORDCARE indoor wayfinding concept.
 * Every highlighted segment is derived from the same corridor graph as the floor drawings.
 * The building is fictional: replace geometry, destinations and connections with surveyed
 * facility data before using this system to direct real patients.
 */
(function (scope) {
  'use strict';

  const copy = {
    en: {
      title: 'Three-floor hospital map', overview: 'Explore the building', mapEyebrow: 'WAYFINDING / 3 FLOORS', mapConcept: 'INDOOR WAYFINDING CONCEPT', mapScale: 'CONCEPT / NOT TO SCALE',
      floor: 'Floor', floorsWord: ['FLOOR', 'FLOORS'], floorNames: ['Entrance & diagnostics', 'Family clinics', 'Treatment & therapy'],
      route: 'YOUR ROUTE', leg: 'ROUTE LEG', of: 'OF', entrance: 'Main entrance',
      you: 'You start here', targetA: 'Waiting area A', targetC: 'Waiting area C',
      reception: 'Reception', corridor: 'Main corridor', lift: 'Lift B', stairs: 'Stairs B',
      routeA: 'Follow Wing A signs to Waiting area A.',
      route1Lift: 'From the lobby, follow the teal line to Lift B.',
      route1Stairs: 'From the lobby, follow the teal line to Stairs B.',
      route2Lift: 'Take Lift B to Floor 2, then follow Wing B to Waiting area C.',
      route2Stairs: 'Take Stairs B to Floor 2, then follow Wing B to Waiting area C.',
      explore: 'This floor is not part of your visit route.',
      exploreHint: 'Select Floor 1 or 2 to see your highlighted route.',
      switchFloor: 'Choose a floor', nextFloor: 'Continue on Floor 2',
      accessible: 'Step-free via lift', standard: 'Via stairs',
      directions: 'Turn-by-turn overview', mapKey: 'MAP KEY', routeKey: 'Your route',
      roomKey: 'Department', waitingKey: 'Destination', liftsKey: 'Lifts / stairs',
      planNote: 'Illustrative floor plan · not a real hospital · not to scale',
      help: 'Follow the matching signs and ask staff whenever unsure.',
      enlarge: 'Enlarge map', close: 'Close map', emptyRoute: 'No route on this floor',
      wingA: 'WING A', wingB: 'WING B', central: 'CENTRAL',
      rooms: {
        waitingA: 'Waiting A', imaging: 'Imaging', consultation: 'Consultation', lab: 'Laboratory',
        pharmacy: 'Pharmacy', lounge: 'Family lounge', reception: 'Reception', records: 'Records',
        waitingC: 'Waiting C', children: 'Children’s clinic', play: 'Play area',
        nurse: 'Nurse station', therapy: 'Physiotherapy', day: 'Day care',
        speech: 'Speech therapy', rehab: 'Rehabilitation', education: 'Education',
        wards: 'Wards', meeting: 'Meeting rooms', staff: 'Staff area', wc: 'Accessible WC'
      }
    },
    fi: {
      title: 'Kolmen kerroksen sairaalakartta', overview: 'Tutustu rakennukseen', mapEyebrow: 'OPASTUS / 3 KERROSTA', mapConcept: 'SISÄOPASTUKSEN KONSEPTI', mapScale: 'KONSEPTI / EI MITTAKAAVASSA',
      floor: 'Kerros', floorsWord: ['KERROS', 'KERROSTA'], floorNames: ['Sisäänkäynti ja tutkimukset', 'Lasten vastaanotot', 'Hoito ja kuntoutus'],
      route: 'REITTISI', leg: 'REITIN OSA', of: '/', entrance: 'Pääsisäänkäynti',
      you: 'Lähtöpiste', targetA: 'Odotusalue A', targetC: 'Odotusalue C',
      reception: 'Vastaanotto', corridor: 'Pääkäytävä', lift: 'Hissi B', stairs: 'Portaat B',
      routeA: 'Seuraa A-siiven opasteita odotusalueelle A.',
      route1Lift: 'Seuraa aulasta turkoosia reittiä hissille B.',
      route1Stairs: 'Seuraa aulasta turkoosia reittiä portaille B.',
      route2Lift: 'Mene hissillä B 2. kerrokseen ja seuraa B-siiven opasteita odotusalueelle C.',
      route2Stairs: 'Mene portaita B 2. kerrokseen ja seuraa B-siiven opasteita odotusalueelle C.',
      explore: 'Tämä kerros ei kuulu käyntireittiisi.',
      exploreHint: 'Valitse 1. tai 2. kerros nähdäksesi reittisi.',
      switchFloor: 'Valitse kerros', nextFloor: 'Jatka 2. kerrokseen',
      accessible: 'Esteetön, hissillä', standard: 'Portaita pitkin',
      directions: 'Reitin vaiheet', mapKey: 'KARTTAMERKIT', routeKey: 'Reittisi',
      roomKey: 'Osasto', waitingKey: 'Määränpää', liftsKey: 'Hissi / portaat',
      planNote: 'Kuvitteellinen pohjapiirros · ei oikea sairaala · ei mittakaavassa',
      help: 'Seuraa opasteita ja pyydä tarvittaessa apua henkilökunnalta.',
      enlarge: 'Suurenna kartta', close: 'Sulje kartta', emptyRoute: 'Ei reittiä tässä kerroksessa',
      wingA: 'A-SIIPI', wingB: 'B-SIIPI', central: 'KESKIOSA',
      rooms: {
        waitingA: 'Odotus A', imaging: 'Kuvantaminen', consultation: 'Vastaanottohuoneet', lab: 'Laboratorio',
        pharmacy: 'Apteekki', lounge: 'Perhetila', reception: 'Neuvonta', records: 'Arkisto',
        waitingC: 'Odotus C', children: 'Lasten poliklinikka', play: 'Leikkitila',
        nurse: 'Hoitajien tila', therapy: 'Fysioterapia', day: 'Päivähoito',
        speech: 'Puheterapia', rehab: 'Kuntoutus', education: 'Ohjaus',
        wards: 'Osastot', meeting: 'Kokoushuoneet', staff: 'Henkilökunta', wc: 'Esteetön WC'
      }
    },
    sv: {
      title: 'Sjukhuskarta i tre våningar', overview: 'Utforska byggnaden', mapEyebrow: 'VÄGVISNING / 3 VÅNINGAR', mapConcept: 'KONCEPT FÖR INOMHUSVÄGVISNING', mapScale: 'KONCEPT / EJ SKALENLIG',
      floor: 'Våning', floorsWord: ['VÅNING', 'VÅNINGAR'], floorNames: ['Entré och diagnostik', 'Barnmottagningar', 'Vård och terapi'],
      route: 'DIN VÄG', leg: 'ETAPP', of: 'AV', entrance: 'Huvudentré',
      you: 'Startpunkt', targetA: 'Väntrum A', targetC: 'Väntrum C',
      reception: 'Reception', corridor: 'Huvudkorridor', lift: 'Hiss B', stairs: 'Trappa B',
      routeA: 'Följ skyltarna mot flygel A och väntrum A.',
      route1Lift: 'Följ den turkosa linjen från entrén till Hiss B.',
      route1Stairs: 'Följ den turkosa linjen från entrén till Trappa B.',
      route2Lift: 'Ta Hiss B till våning 2 och följ flygel B till väntrum C.',
      route2Stairs: 'Ta Trappa B till våning 2 och följ flygel B till väntrum C.',
      explore: 'Denna våning ingår inte i din väg.',
      exploreHint: 'Välj våning 1 eller 2 för att se din väg.',
      switchFloor: 'Välj våning', nextFloor: 'Fortsätt till våning 2',
      accessible: 'Stegfri väg med hiss', standard: 'Via trappor',
      directions: 'Steg för steg', mapKey: 'KARTNYCKEL', routeKey: 'Din väg',
      roomKey: 'Avdelning', waitingKey: 'Mål', liftsKey: 'Hiss / trappa',
      planNote: 'Illustrativ planritning · inte ett riktigt sjukhus · ej skalenlig',
      help: 'Följ skyltningen och fråga personalen vid behov.',
      enlarge: 'Förstora kartan', close: 'Stäng kartan', emptyRoute: 'Ingen rutt på denna våning',
      wingA: 'FLYGEL A', wingB: 'FLYGEL B', central: 'CENTRALT',
      rooms: {
        waitingA: 'Väntrum A', imaging: 'Bilddiagnostik', consultation: 'Mottagning', lab: 'Laboratorium',
        pharmacy: 'Apotek', lounge: 'Familjerum', reception: 'Reception', records: 'Arkiv',
        waitingC: 'Väntrum C', children: 'Barnmottagning', play: 'Lekrum',
        nurse: 'Sköterskor', therapy: 'Fysioterapi', day: 'Dagvård',
        speech: 'Talterapi', rehab: 'Rehabilitering', education: 'Rådgivning',
        wards: 'Avdelningar', meeting: 'Mötesrum', staff: 'Personal', wc: 'Tillgänglig WC'
      }
    }
  };

  // All three floors share aligned cores and a common east-west corridor.
  // Coordinates refer to this SVG plan, not to an unverified physical site.
  const xy = {
    west: [130, 247], main: [260, 247], mid: [440, 247], stairHub: [460, 247],
    liftHub: [580, 247], east: [680, 247], waitingA: [130, 182],
    waitingC: [680, 182], stairs: [460, 312], lift: [580, 312],
    entrance: [160, 432], lobby: [160, 376], reception: [260, 376]
  };
  const corridorLines = [
    'M130 247H680', 'M130 247V182', 'M680 247V182',
    'M460 247V312', 'M580 247V312'
  ];

  const roomLayout = {
    1: [
      [60,85,145,84,'waitingA','A · 01','waiting'],
      [218,85,155,84,'imaging','A · 02–06'],
      [385,85,155,84,'consultation','C · 01–04'],
      [552,85,165,84,'lab','B · 01–03'],
      [60,292,150,62,'pharmacy','A · 07'],
      [285,292,140,57,'reception','C · 05'],
      [285,361,140,57,'records','C · 06'],
      [614,292,103,126,'wc','B · WC']
    ],
    2: [
      [60,85,145,84,'therapy','A · 21–24'],
      [218,85,155,84,'consultation','A · 25–30'],
      [385,85,155,84,'children','B · 21–24','children'],
      [552,85,165,84,'waitingC','B · 25','waiting'],
      [60,292,150,62,'lounge','A · 26'],
      [60,365,150,53,'pharmacy','A · 27'],
      [285,292,140,57,'nurse','C · 21'],
      [285,361,140,57,'play','C · 22','children'],
      [614,292,103,126,'wc','B · WC']
    ],
    3: [
      [60,85,145,84,'rehab','A · 31–34'],
      [218,85,155,84,'speech','A · 35–36'],
      [385,85,155,84,'day','C · 31–33'],
      [552,85,165,84,'wards','B · 31–36'],
      [60,292,150,62,'education','A · 37'],
      [60,365,150,53,'lounge','A · 38'],
      [285,292,140,57,'meeting','C · 34'],
      [285,361,140,57,'staff','C · 35'],
      [614,292,103,126,'wc','B · WC']
    ]
  };

  const graph = { nodes: {}, edges: [] };
  const nodeId = (floor, name) => `${floor}:${name}`;
  for (let floor = 1; floor <= 3; floor += 1) {
    for (const [name, coords] of Object.entries(xy)) {
      if (floor !== 1 && ['entrance', 'lobby', 'reception'].includes(name)) continue;
      graph.nodes[nodeId(floor, name)] = { id: nodeId(floor, name), floor, x: coords[0], y: coords[1], name };
    }
    const pairs = [
      ['west','main'],['main','mid'],['mid','stairHub'],['stairHub','liftHub'],
      ['liftHub','east'],['west','waitingA'],['east','waitingC'],
      ['stairHub','stairs'],['liftHub','lift']
    ];
    if (floor === 1) pairs.push(['entrance','lobby'],['lobby','reception'],['reception','main']);
    for (const [from,to] of pairs) graph.edges.push({ from:nodeId(floor,from), to:nodeId(floor,to), kind:'walk' });
  }
  for (let floor = 1; floor < 3; floor += 1) {
    for (const [name,kind] of [['stairs','stairs'],['lift','lift']]) {
      graph.edges.push({from:nodeId(floor,name),to:nodeId(floor+1,name),kind});
    }
  }

  function shortestRoute(family, stepFree) {
    const start = '1:entrance';
    const finish = family ? '2:waitingC' : '1:waitingA';
    const distances = new Map([[start,0]]);
    const previous = new Map();
    const visited = new Set();
    const adjacent = new Map();
    for (const edge of graph.edges) {
      if (family && ((stepFree && edge.kind === 'stairs') || (!stepFree && edge.kind === 'lift'))) continue;
      if (!adjacent.has(edge.from)) adjacent.set(edge.from,[]);
      if (!adjacent.has(edge.to)) adjacent.set(edge.to,[]);
      const a = graph.nodes[edge.from], b = graph.nodes[edge.to];
      const weight = a.floor !== b.floor ? 95 : Math.hypot(a.x-b.x,a.y-b.y);
      adjacent.get(edge.from).push({id:edge.to,weight});
      adjacent.get(edge.to).push({id:edge.from,weight});
    }
    while (true) {
      const choice = [...distances.entries()].filter(([id])=>!visited.has(id)).sort((a,b)=>a[1]-b[1])[0];
      if (!choice) return null;
      const [current,cost] = choice;
      if (current === finish) break;
      visited.add(current);
      for (const next of adjacent.get(current) || []) {
        const sum = cost + next.weight;
        if (sum < (distances.get(next.id) ?? Infinity)) { distances.set(next.id,sum); previous.set(next.id,current); }
      }
    }
    const path = [finish];
    while (path[0] !== start) {
      const parent = previous.get(path[0]);
      if (!parent) throw Error('Wayfinding route is disconnected.');
      path.unshift(parent);
    }
    return path.map(id=>graph.nodes[id]);
  }

  function svgRoute(floor, route) {
    const points = route.filter(node => node.floor === floor);
    if (points.length < 2) return '';
    const d = points.map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' ');
    return `<path class="map-route-glow" d="${d}"/><path class="map-route-main" d="${d}"/><path class="map-route-flow" d="${d}"/>`;
  }
  const roomSvg = (floor, language, destinationKey) => roomLayout[floor].map(([x,y,w,h,key,code,type]) => {
    const active = (floor === 1 && destinationKey === 'waitingA' && key === 'waitingA') ||
      (floor === 2 && destinationKey === 'waitingC' && key === 'waitingC');
    const label = copy[language].rooms[key];
    return `<g class="map-room ${type || ''} ${active?'is-destination':''}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/><text class="map-room-code" x="${x+13}" y="${y+21}">${code}</text><text class="map-room-label" x="${x+13}" y="${y+41}">${label}</text>${active?`<rect class="map-target-tag" x="${x+w-27}" y="${y+13}" width="16" height="16" rx="4"/><path d="M${x+w-23} ${y+21}h8m-4 -4v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`:''}</g>`;
  }).join('');

  function mapSvg({family,stepFree,selectedFloor,language='en',expanded=false,print=false}) {
    const lang = copy[language] || copy.en;
    const route = shortestRoute(family,stepFree);
    const destinationKey = family ? 'waitingC':'waitingA';
    const nodes = route.filter(n=>n.floor === selectedFloor);
    const isStart = selectedFloor===1;
    const isFinal = selectedFloor === (family ? 2:1);
    const startNode = nodes[0];
    const lastNode = nodes[nodes.length-1];
    const gridId=`mapGrid-${selectedFloor}-${print?'print':expanded?'large':'kiosk'}`;
    const marker = (node, label, kind) => node ? `<g class="map-pin ${kind}"><circle cx="${node.x}" cy="${node.y}" r="13"/><circle class="map-pin-inner" cx="${node.x}" cy="${node.y}" r="5"/><text x="${node.x+17}" y="${node.y-13}">${label}</text></g>` : '';
    return `<svg class="indoor-map" viewBox="0 0 780 490" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${lang.title}. ${lang.floor} ${selectedFloor}. ${nodes.length?lang.route:lang.emptyRoute}." preserveAspectRatio="xMidYMid meet">
      <title>${lang.floor} ${selectedFloor} — ${lang.floorNames[selectedFloor-1]}</title>
      <defs><pattern id="${gridId}" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#e4edeb" stroke-width=".7"/></pattern></defs>
      <rect x="0" y="0" width="780" height="490" rx="16" fill="#f6faf8"/><rect x="0" y="0" width="780" height="490" rx="16" fill="url(#${gridId})"/>
      <text class="map-overline" x="47" y="27">NORDCARE · ${lang.floor.toUpperCase()} 0${selectedFloor}</text>
      <g class="map-compass" transform="translate(725 24)"><path d="M0 10L7 0L14 10" fill="none" stroke="#567e73" stroke-width="2"/><text x="4" y="23">N</text></g>
      <rect class="map-building" x="37" y="51" width="704" height="385" rx="13"/>
      ${roomSvg(selectedFloor,language,destinationKey)}
      <g class="map-corridor">${[...corridorLines,...(selectedFloor===1?['M260 247V376H160V432']:[])].map(d=>`<path class="map-hall-edge" d="${d}"/><path class="map-hall" d="${d}"/>`).join('')}</g>
      <g class="map-zone-labels"><text x="65" y="67">${lang.wingA}</text><text x="320" y="67">${lang.central}</text><text x="607" y="67">${lang.wingB}</text></g>
      <g class="map-cores"><rect x="438" y="282" width="44" height="56" rx="8"/><path d="M447 321l10 -10l10 10m-20 -19l10 -10l10 10" stroke="#59756e" stroke-width="2" fill="none"/><rect x="555" y="282" width="50" height="56" rx="8"/><rect x="568" y="293" width="24" height="20" rx="3" fill="none" stroke="#59756e" stroke-width="2"/><path d="M574 304h12m-6 -6v13" stroke="#59756e" stroke-width="1.7"/><text x="460" y="353">${lang.stairs}</text><text x="580" y="353">${lang.lift}</text></g>
      ${selectedFloor===1?`<g class="map-entrance"><rect x="123" y="420" width="74" height="33" rx="8"/><text x="160" y="468">${lang.entrance}</text></g>`:''}
      ${nodes.length?`<g class="map-route">${svgRoute(selectedFloor,route)}${marker(startNode,isStart?lang.you:(stepFree?lang.lift:lang.stairs),'start')}${marker(lastNode,isFinal?(family?lang.targetC:lang.targetA):(stepFree?lang.lift:lang.stairs),'end')}</g>`:''}
      <g class="map-floor-stamp"><rect x="46" y="449" width="104" height="27" rx="13"/><text x="60" y="467">${lang.floor.toUpperCase()} 0${selectedFloor}</text></g>
      <text class="map-schematic" x="724" y="467" text-anchor="end">${lang.mapScale}</text>
    </svg>`;
  }

  function routePlan({family,stepFree,language='en'}) {
    const lang = copy[language] || copy.en;
    return family ? [
      {floor:1,title:`${lang.floor} 1 · ${lang.floorNames[0]}`,text:stepFree?lang.route1Lift:lang.route1Stairs},
      {floor:2,title:`${lang.floor} 2 · ${lang.floorNames[1]}`,text:stepFree?lang.route2Lift:lang.route2Stairs}
    ] : [{floor:1,title:`${lang.floor} 1 · ${lang.floorNames[0]}`,text:lang.routeA}];
  }
  function render(opts) {
    const {family,stepFree,selectedFloor,language='en',expanded=false} = opts;
    const lang = copy[language] || copy.en;
    const steps = routePlan(opts);
    const active = steps.find(x=>x.floor===selectedFloor);
    const tabs = [1,2,3].map(num=>`<button type="button" role="tab" class="floor-tab ${num===selectedFloor?'selected':''}" aria-selected="${num===selectedFloor}" tabindex="0" data-action="floor:${num}"><span>0${num}</span><small>${lang.floorNames[num-1]}</small>${steps.some(x=>x.floor===num)?'<i aria-hidden="true"></i>':''}</button>`).join('');
    return `<section class="wayfinding ${expanded?'wayfinding-expanded':''}" aria-label="${lang.title}">
      <div class="wayfinding-head"><div><span class="wayfinding-kicker">${lang.mapEyebrow}</span><h4>${lang.title}</h4></div>${expanded?'':`<button type="button" class="map-expand" data-action="expandmap" aria-label="${lang.enlarge}">⤢ <span>${lang.enlarge}</span></button>`}</div>
      <div class="floor-tabs" role="tablist" aria-label="${lang.switchFloor}">${tabs}</div>
      <div class="wayfinding-body"><div class="wayfinding-plan">${mapSvg(opts)}<div class="map-legend" aria-label="${lang.mapKey}"><span><i class="legend-line"></i>${lang.routeKey}</span><span><i class="legend-room"></i>${lang.roomKey}</span><span><i class="legend-destination"></i>${lang.waitingKey}</span><span><i class="legend-core"></i>${lang.liftsKey}</span></div></div>
      <aside class="wayfinding-guide"><div class="guide-top"><span>${lang.directions}</span><strong>${steps.length} ${lang.floorsWord[steps.length===1?0:1]}</strong></div><div class="route-legs">${steps.map((step,i)=>`<button type="button" class="route-leg ${selectedFloor===step.floor?'selected':''}" data-action="floor:${step.floor}" ${selectedFloor===step.floor?'aria-current="step"':''}><small>${lang.leg} ${i+1} ${lang.of} ${steps.length}</small><strong>${step.title}</strong><span>${step.text}</span></button>`).join('')}</div>${active?`<div class="guide-current"><span>${lang.floor} 0${selectedFloor}</span><p>${active.text}</p></div>`:`<div class="guide-current muted"><span>${lang.emptyRoute}</span><p>${lang.exploreHint}</p></div>`}<p class="guide-note">${lang.help}</p></aside></div>
      <div class="map-disclaimer"><span>ⓘ</span>${lang.planNote}</div>
    </section>`;
  }

  scope.NordcareWayfinding = {copy,graph,roomLayout,shortestRoute,mapSvg,routePlan,render};
  if (typeof module !== 'undefined' && module.exports) module.exports = scope.NordcareWayfinding;
})(typeof window !== 'undefined' ? window : globalThis);
