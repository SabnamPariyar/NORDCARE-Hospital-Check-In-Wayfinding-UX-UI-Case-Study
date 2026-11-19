/* NORDCARE speculative hospital arrival experience — local simulation only. */
(() => {
  const root = document.querySelector('#kiosk');
  if (!root) return;

  const content = {
    en: {
      home:'Start over',end:'End',size:'Larger text',contrast:'Higher contrast',step:'STEP',of:'OF',help:'I need help from staff',back:'Back',continue:'Continue',welcome:'Welcome to NORDCARE',welcomeSub:'Let’s make your visit a little easier. Who are you checking in today?',adult:'Myself',adultSub:'I am here for my appointment',family:'A child',familySub:'I’m here with a child or young person',familyNote:'Hello, little explorer! We will take this one step at a time.',select:'How would you like to check in?',selectSub:'Choose the option that works best for you. You can always ask someone for help.',kela:'Kela card',kelaSub:'Use the card barcode',qr:'Appointment QR',qrSub:'Use the code on your invitation',staff:'Ask at reception',staffSub:'A person can help you',scanKela:'Scan your Kela card',scanQr:'Scan your appointment code',scanSub:'Place your card or appointment code near the scanner below.',scanCue:'SIMULATED SCANNER',simulate:'Simulate scan',scanTrouble:'My card or code is not working',privacy:'This is a portfolio demonstration. No real Kela card or personal identity code is collected.',match:'Is this your appointment?',matchSub:'Please check the sample appointment information before continuing.',sample:'DEMO PATIENT · FICTIONAL DETAILS',child:'Child',guardian:'Accompanied by guardian',appointment:'YOUR APPOINTMENT',adultClinic:'Imaging department',childClinic:'Children’s outpatient clinic',date:'19 NOV',time:'10:40',waitingA:'Waiting area A',waitingC:'Waiting area C',confirm:'Yes, check in',wrong:'This is not my appointment',done:'You are checked in.',doneSub:'Thank you. You can now head to the waiting area.',number:'YOUR QUEUE NUMBER',next:'YOUR DESTINATION',level:'Level 2 · Wing B',levelA:'Level 1 · Wing A',showRoute:'Show the way',print:'Print ticket',route:'Here is your way.',routeSub:'Follow the highlighted route from the main lobby. Look for the matching signs.',routeC:'Lift B → Level 2 → Waiting area C',routeA:'Main corridor → Wing A → Waiting area A',stepFree:'Step-free route',stairs:'Standard route',entrance:'MAIN ENTRANCE',destination:'YOUR DESTINATION',arrive:'You have reached the right place.',finish:'Finish session',helpTitle:'We can help you in person.',helpSub:'Please go to the reception desk in the main entrance lobby. A staff member will help with registration and directions.',helpPlace:'MAIN LOBBY · RECEPTION',helpMore:'If this is an emergency, seek staff or emergency services immediately. This kiosk concept is for planned visits only.',helpReturn:'Return to check-in',screenFooter:'CONCEPT ONLY · NO REAL REGISTRATION',session:'Session resets after inactivity',printNote:'This ticket is an example, not valid at a real hospital.',guardianNotice:'A scan does not establish legal guardian authority. In a real service, hospital policy must verify eligibility or hand off to staff.'
    },
    fi: {
      home:'Aloita alusta',end:'Lopeta',size:'Suurempi teksti',contrast:'Suurempi kontrasti',step:'VAIHE',of:'/',help:'Tarvitsen henkilökunnan apua',back:'Takaisin',continue:'Jatka',welcome:'Tervetuloa NORDCAREEN',welcomeSub:'Tehdään käynnistäsi helpompi. Kenet ilmoitat vastaanotolle?',adult:'Itseni',adultSub:'Olen tullut omalle vastaanotolleni',family:'Lapsen',familySub:'Olen täällä lapsen kanssa',familyNote:'Hei pieni seikkailija! Edetään rauhassa, askel kerrallaan.',select:'Miten haluat ilmoittautua?',selectSub:'Valitse sinulle sopiva tapa. Voit aina pyytää apua.',kela:'Kela-kortti',kelaSub:'Näytä kortin viivakoodi',qr:'Ajanvarauksen QR',qrSub:'Näytä kutsun QR-koodi',staff:'Kysy vastaanotosta',staffSub:'Henkilökunta auttaa',scanKela:'Lue Kela-kortti',scanQr:'Lue ajanvarauksen koodi',scanSub:'Aseta kortti tai ajanvarauksen koodi lukijan lähelle.',scanCue:'SIMULOITU LUKIJA',simulate:'Simuloi lukeminen',scanTrouble:'Kortti tai koodi ei toimi',privacy:'Tämä on suunnitteludemo. Oikeita Kela-kortteja tai henkilötunnuksia ei käsitellä.',match:'Onko tämä sinun käyntisi?',matchSub:'Tarkista esimerkkiajanvarauksen tiedot ennen jatkamista.',sample:'ESIMERKKIASIAKAS · KUVITTEELLISET TIEDOT',child:'Lapsi',guardian:'Huoltajan kanssa',appointment:'AJANVARAUS',adultClinic:'Kuvantaminen',childClinic:'Lasten poliklinikka',date:'19. MARRAS',time:'10.40',waitingA:'Odotusalue A',waitingC:'Odotusalue C',confirm:'Kyllä, ilmoittaudu',wrong:'Tämä ei ole käyntini',done:'Ilmoittautuminen onnistui.',doneSub:'Kiitos. Voit nyt siirtyä odotusalueelle.',number:'VUORONUMERO',next:'MÄÄRÄNPÄÄ',level:'2. kerros · B-siipi',levelA:'1. kerros · A-siipi',showRoute:'Näytä reitti',print:'Tulosta lippu',route:'Tässä on reittisi.',routeSub:'Seuraa korostettua reittiä pääaulasta. Etsi samoja opasteita.',routeC:'Hissi B → 2. kerros → Odotusalue C',routeA:'Pääkäytävä → A-siipi → Odotusalue A',stepFree:'Esteetön reitti',stairs:'Tavallinen reitti',entrance:'PÄÄSISÄÄNKÄYNTI',destination:'MÄÄRÄNPÄÄ',arrive:'Olet oikeassa paikassa.',finish:'Lopeta',helpTitle:'Autamme sinua henkilökohtaisesti.',helpSub:'Siirry pääsisäänkäynnin aulan vastaanottotiskille. Henkilökunta auttaa ilmoittautumisessa ja opastuksessa.',helpPlace:'PÄÄAULA · VASTAANOTTO',helpMore:'Hätätilanteessa ota heti yhteys henkilökuntaan tai hätänumeroon. Tämä demo on tarkoitettu vain ajanvarauskäynneille.',helpReturn:'Palaa ilmoittautumiseen',screenFooter:'KONSEPTI · EI OIKEA ILMOITTAUTUMINEN',session:'Istunto nollautuu, jos sitä ei käytetä',printNote:'Tämä on esimerkkilippu, ei voimassa sairaalassa.',guardianNotice:'Kortin lukeminen ei todista huoltajuutta. Oikeassa palvelussa sairaalan on tarkistettava asiointioikeus.'
    },
    sv: {
      home:'Börja om',end:'Avsluta',size:'Större text',contrast:'Högre kontrast',step:'STEG',of:'AV',help:'Jag behöver hjälp av personalen',back:'Tillbaka',continue:'Fortsätt',welcome:'Välkommen till NORDCARE',welcomeSub:'Vi hjälper dig med ditt besök. Vem vill du anmäla?',adult:'Mig själv',adultSub:'Jag har en egen bokad tid',family:'Ett barn',familySub:'Jag är här med ett barn',familyNote:'Hej lilla upptäckare! Vi tar ett steg i taget.',select:'Hur vill du anmäla dig?',selectSub:'Välj det alternativ som passar dig. Du kan alltid be om hjälp.',kela:'FPA-kort',kelaSub:'Skanna kortets streckkod',qr:'Tidsbokningens QR',qrSub:'Skanna koden i kallelsen',staff:'Fråga i receptionen',staffSub:'Personalen hjälper dig',scanKela:'Skanna ditt FPA-kort',scanQr:'Skanna bokningskoden',scanSub:'Håll kortet eller koden nära läsaren.',scanCue:'SIMULERAD LÄSARE',simulate:'Simulera skanning',scanTrouble:'Kortet eller koden fungerar inte',privacy:'Detta är en designdemo. Inga riktiga FPA-kort eller personbeteckningar behandlas.',match:'Är detta din bokade tid?',matchSub:'Kontrollera de fiktiva bokningsuppgifterna.',sample:'DEMOPATIENT · FIKTIVA UPPGIFTER',child:'Barn',guardian:'Med vårdnadshavare',appointment:'DIN BOKADE TID',adultClinic:'Bilddiagnostik',childClinic:'Barnpoliklinik',date:'19 NOV',time:'10.40',waitingA:'Väntrum A',waitingC:'Väntrum C',confirm:'Ja, anmäl mig',wrong:'Det här är inte min tid',done:'Du är anmäld.',doneSub:'Tack. Du kan nu gå till väntrummet.',number:'DITT KÖNUMMER',next:'DIN DESTINATION',level:'Våning 2 · Flygel B',levelA:'Våning 1 · Flygel A',showRoute:'Visa vägen',print:'Skriv ut biljett',route:'Här är din väg.',routeSub:'Följ den markerade rutten från huvudentrén och skyltningen.',routeC:'Hiss B → Våning 2 → Väntrum C',routeA:'Huvudkorridor → Flygel A → Väntrum A',stepFree:'Stegfri väg',stairs:'Vanlig väg',entrance:'HUVUDENTRÉ',destination:'DIN DESTINATION',arrive:'Du är på rätt plats.',finish:'Avsluta',helpTitle:'Vi hjälper dig på plats.',helpSub:'Gå till receptionen i huvudentréns lobby. Personalen hjälper med anmälan och vägbeskrivning.',helpPlace:'HUVUDLOBBY · RECEPTION',helpMore:'Vid nödfall, kontakta personal eller räddningstjänst omedelbart. Denna konceptkiosk gäller endast planerade besök.',helpReturn:'Tillbaka till anmälan',screenFooter:'KONCEPT · INGEN VERKLIG ANMÄLAN',session:'Sessionen nollställs vid inaktivitet',printNote:'Detta är ett exempel, inte en giltig biljett.',guardianNotice:'Att skanna ett kort bekräftar inte vårdnad. En riktig tjänst måste kontrollera behörigheten enligt sjukhusets regler.'
    }
  };

  const state = { language:'en',journey:'adult',screen:'welcome',method:'kela',large:false,contrast:false,stepFree:true,floor:1,mapExpanded:false,lastAction:Date.now() };
  const alternateDirections = {
    en:'Stairs B → Level 2 → Waiting area C',
    fi:'Portaat B → 2. kerros → Odotusalue C',
    sv:'Trappa B → Våning 2 → Väntrum C'
  };
  const t = key => content[state.language][key] || content.en[key] || key;
  const stages = ['welcome','identify','scan','verify','ticket','route'];
  const stepNumber = () => state.screen === 'welcome' ? 1 : state.screen === 'identify' ? 1 : state.screen === 'scan' ? 2 : state.screen === 'verify' ? 3 : 4;
  const button = (action,label,cls='kiosk-continue') => `<button type="button" class="${cls}" data-action="${action}">${label}</button>`;
  const backAndHelp = (back='back') => `<div class="kiosk-below">${button(back,t('back'),'kiosk-back')}${button('staff',t('help'),'kiosk-help')}</div>`;
  const staffButton = () => `<div class="kiosk-below">${button('staff',t('help'),'kiosk-help')}</div>`;
  const kidWelcome = () => state.journey === 'family' ? `<div class="kiosk-friend"><span>🦊</span><p>${t('familyNote')}</p></div>` : '';
  const patient = () => state.journey === 'family' ? { initials:'ME',name:'Mika Example',tag:`${t('child')} · ${t('guardian')}`,clinic:t('childClinic'),zone:t('waitingC'),level:t('level'),number:'C–042' } : {initials:'AE',name:'Aino Example',tag:t('sample'),clinic:t('adultClinic'),zone:t('waitingA'),level:t('levelA'),number:'A–018'};

  function screenWelcome() {
    return `<div class="kiosk-step">${t('step')} 01 ${t('of')} 04</div><h3>${t('welcome')}</h3><p class="kiosk-subtitle">${t('welcomeSub')}</p>${kidWelcome()}
      <div class="kiosk-options">
      <button type="button" class="kiosk-option" data-action="adult"><span>◉</span><span><strong>${t('adult')}</strong><small>${t('adultSub')}</small></span></button>
      <button type="button" class="kiosk-option" data-action="family"><span>✿</span><span><strong>${t('family')}</strong><small>${t('familySub')}</small></span></button>
      </div>${staffButton()}`;
  }
  function screenIdentify() {
    return `<div class="kiosk-step">${t('step')} 01 ${t('of')} 04</div><h3>${t('select')}</h3><p class="kiosk-subtitle">${t('selectSub')}</p>${kidWelcome()}
      <div class="kiosk-choice-list">
        <button type="button" class="kiosk-option" data-action="kela"><span>▣</span><strong>${t('kela')}</strong><small>${t('kelaSub')}</small></button>
        <button type="button" class="kiosk-option" data-action="qr"><span>▦</span><strong>${t('qr')}</strong><small>${t('qrSub')}</small></button>
        <button type="button" class="kiosk-option" data-action="staff"><span>♡</span><strong>${t('staff')}</strong><small>${t('staffSub')}</small></button>
      </div>${backAndHelp()}`;
  }
  function screenScan() {
    return `<div class="kiosk-step">${t('step')} 02 ${t('of')} 04</div><h3>${state.method === 'kela'?t('scanKela'):t('scanQr')}</h3><p class="kiosk-subtitle">${t('scanSub')}</p>
      <div class="kiosk-scan-panel"><div class="scan-card-illustration" aria-hidden="true"></div><div class="scan-line" aria-hidden="true"></div><span>${t('scanCue')}</span></div>
      <p class="kiosk-mini-note">${t('privacy')}</p><div class="kiosk-below">${button('back',t('back'),'kiosk-back')}${button('simulate',t('simulate'))}</div><div class="kiosk-below" style="padding-top:0;justify-content:flex-end">${button('staff',t('scanTrouble'),'kiosk-help')}</div>`;
  }
  function screenVerify() {
    const p=patient();
    return `<div class="kiosk-step">${t('step')} 03 ${t('of')} 04</div><h3>${t('match')}</h3><p class="kiosk-subtitle">${t('matchSub')}</p>
      <div class="kiosk-patient-card"><div class="patient-avatar">${p.initials}</div><div><strong>${p.name}</strong><span>${p.tag}</span></div></div>
      <div class="kiosk-appointment"><div class="date-square"><strong>19</strong><small>NOV</small></div><div><small>${t('appointment')}</small><strong>${p.clinic}</strong></div><b>${t('time')}</b></div>
      ${state.journey==='family'?`<p class="kiosk-mini-note">${t('guardianNotice')}</p>`:''}
      <div class="kiosk-below">${button('staff',t('wrong'),'kiosk-help')}${button('confirm',t('confirm'))}</div>`;
  }
  function screenTicket() {
    const p=patient();
    return `<div class="kiosk-step">${t('step')} 04 ${t('of')} 04</div><div class="success-hero"><div class="success-check">✓</div><div><h3>${t('done')}</h3><p class="kiosk-subtitle" style="margin:0">${t('doneSub')}</p></div></div>
      <div class="kiosk-queue-grid"><div class="queue-number"><small>${t('number')}</small><strong>${p.number}</strong></div><div class="queue-destination"><small>${t('next')}</small><strong>${p.zone}</strong><span>${p.level}</span></div></div>
      <div class="kiosk-privacy">${t('printNote')}</div><div class="kiosk-below">${button('print',t('print'),'kiosk-print')}${button('route',t('showRoute'))}</div>`;
  }
  const routeOptions = () => ({family:state.journey==='family',stepFree:state.stepFree,selectedFloor:state.floor,language:state.language});
  function screenRoute() {
    return `<div class="kiosk-step">${t('step')} 04 ${t('of')} 04</div><h3>${t('route')}</h3><p class="kiosk-subtitle">${t('routeSub')}</p>
      ${NordcareWayfinding.render(routeOptions())}
      <div class="route-controls"><button type="button" class="route-toggle ${state.stepFree?'on':''}" aria-pressed="${state.stepFree}" data-action="stepfree">${state.stepFree?'♿ ':''}${state.stepFree?t('stepFree'):t('stairs')}</button><span class="kiosk-readout">${state.journey==='family'?(state.stepFree?t('routeC'):alternateDirections[state.language]):t('routeA')}</span></div>
      <div class="print-route-sheets">${NordcareWayfinding.routePlan(routeOptions()).map(step=>`<div class="print-route-sheet"><strong>${step.title}</strong><p>${step.text}</p>${NordcareWayfinding.mapSvg({...routeOptions(),selectedFloor:step.floor,print:true})}</div>`).join('')}</div>
      <div class="kiosk-below">${button('print',t('print'),'kiosk-print')}${button('finish',t('finish'))}</div>`;
  }
  function screenStaff() {
    return `<div class="kiosk-icon-badge">♡</div><h3>${t('helpTitle')}</h3><p class="kiosk-subtitle">${t('helpSub')}</p><div class="kiosk-staff"><strong>${t('helpPlace')}</strong><p>${t('helpMore')}</p></div><div class="kiosk-below">${button('welcome',t('helpReturn'),'kiosk-continue')}</div>`;
  }
  const screens = { welcome:screenWelcome,identify:screenIdentify,scan:screenScan,verify:screenVerify,ticket:screenTicket,route:screenRoute,staff:screenStaff };

  function render() {
    root.classList.toggle('large-text',state.large);
    root.classList.toggle('high-contrast',state.contrast);
    const progress = [1,2,3,4].map(n=>`<i class="${n<=stepNumber()?'done':''}"></i>`).join('');
    root.innerHTML = `<div class="kiosk-top"><div class="brand"><span class="brand-mark"><span class="plus-vertical"></span><span class="plus-horizontal"></span></span><span>NORD<span>CARE</span></span></div><div class="kiosk-top-controls">
        <select id="kiosk-language" class="kiosk-mini" aria-label="Choose language"><option value="en" ${state.language==='en'?'selected':''}>EN</option><option value="fi" ${state.language==='fi'?'selected':''}>FI</option><option value="sv" ${state.language==='sv'?'selected':''}>SV</option></select>
        <button class="kiosk-mini ${state.large?'on':''}" aria-label="${t('size')}" aria-pressed="${state.large}" data-action="size">Aa+</button>
        <button class="kiosk-mini ${state.contrast?'on':''}" aria-label="${t('contrast')}" aria-pressed="${state.contrast}" data-action="contrast">◐</button>
        <button class="kiosk-mini kiosk-end" data-action="finish">${t('end')}</button></div></div>
        <div class="kiosk-content"><div class="kiosk-progress" aria-hidden="true">${progress}</div>${screens[state.screen]()}</div><div class="kiosk-bottom"><span>${t('screenFooter')}</span><span>${t('session')}</span></div>`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.querySelectorAll('animate').forEach(node => node.remove());
    for(const tile of document.querySelectorAll('.journey-tile')) tile.classList.toggle('active',tile.dataset.journey===state.journey);
  }

  function reset(keepSettings=true) {
    const language=state.language,large=state.large,contrast=state.contrast;
    state.screen='welcome';state.journey='adult';state.method='kela';state.stepFree=true;state.floor=1;closeMapDialog();
    if (!keepSettings){state.language='en';state.large=false;state.contrast=false;}
    else {state.language=language;state.large=large;state.contrast=contrast;}
  }
  function action(name) {
    state.lastAction=Date.now();
    if (name.startsWith('floor:')) {
      const floor=Number(name.split(':')[1]);
      if ([1,2,3].includes(floor)){state.floor=floor;render();if(state.mapExpanded)updateMapDialog();}
      return;
    }
    switch(name){
      case 'adult':case 'family':state.journey=name;state.screen='identify';break;
      case 'kela':case 'qr':state.method=name;state.screen='scan';break;
      case 'simulate':state.screen='verify';break;
      case 'confirm':state.screen='ticket';break;
      case 'route':state.screen='route';state.floor=1;break;
      case 'stepfree':state.stepFree=!state.stepFree;break;
      case 'expandmap':openMapDialog();return;
      case 'closemap':closeMapDialog();return;
      case 'staff':state.screen='staff';break;
      case 'welcome':state.screen='welcome';break;
      case 'back':state.screen=state.screen==='scan'?'identify':state.screen==='identify'?'welcome':state.screen==='verify'?'scan':'welcome';break;
      case 'size':state.large=!state.large;break;
      case 'contrast':state.contrast=!state.contrast;break;
      case 'print':if(state.mapExpanded)closeMapDialog();window.print();return;
      case 'finish':reset();break;
      default:return;
    }
    render();
    if(state.mapExpanded)updateMapDialog();
  }

  let mapReturnFocus=null;
  function updateMapDialog() {
    const modal=document.querySelector('#nordcare-map-modal');
    if(!modal)return;
    modal.classList.toggle('high-contrast',state.contrast);
    modal.innerHTML=`<div class="map-modal-backdrop" data-action="closemap"></div><div class="map-modal-panel" role="dialog" aria-modal="true" aria-label="${NordcareWayfinding.copy[state.language].title}"><div class="map-modal-bar"><div><strong>NORDCARE</strong><span> / ${NordcareWayfinding.copy[state.language].mapConcept}</span></div><button type="button" class="map-modal-close" data-action="closemap">✕ ${NordcareWayfinding.copy[state.language].close}</button></div>${NordcareWayfinding.render({...routeOptions(),expanded:true})}</div>`;
  }
  function openMapDialog() {
    if(state.mapExpanded)return;
    mapReturnFocus=document.activeElement;
    state.mapExpanded=true;
    const modal=document.createElement('div');modal.id='nordcare-map-modal';modal.className='wayfinding-modal';
    document.body.appendChild(modal);document.body.classList.add('map-dialog-open');
    modal.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target)action(target.dataset.action);});
    updateMapDialog();modal.querySelector('.map-modal-close')?.focus();
  }
  function closeMapDialog() {
    state.mapExpanded=false;
    document.querySelector('#nordcare-map-modal')?.remove();
    document.body.classList.remove('map-dialog-open');
    if(mapReturnFocus?.isConnected)mapReturnFocus.focus();
    mapReturnFocus=null;
  }
  document.addEventListener('keydown',e=>{
    if(!state.mapExpanded)return;
    if(e.key==='Escape')closeMapDialog();
    if(e.key==='Tab'){
      const modal=document.querySelector('#nordcare-map-modal');
      const controls=[...modal.querySelectorAll('button:not([disabled])')];
      const first=controls[0],last=controls[controls.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  root.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target)action(target.dataset.action);});
  root.addEventListener('change',e=>{if(e.target.id==='kiosk-language'){state.language=e.target.value;state.lastAction=Date.now();render();if(state.mapExpanded)updateMapDialog();}});
  for(const tile of document.querySelectorAll('.journey-tile'))tile.addEventListener('click',()=>{state.journey=tile.dataset.journey;state.screen='identify';state.lastAction=Date.now();render();document.querySelector('#kiosk').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});});
  setInterval(()=>{if(state.screen!=='welcome' && Date.now()-state.lastAction>180000){reset(false);render();}},10000);
  render();

  const menu=document.querySelector('#mobile-menu');
  menu?.addEventListener('click',()=>{const nav=document.querySelector('.site-nav');const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.site-nav').classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
  const feedback=document.querySelector('#component-feedback');
  document.querySelector('#sample-action')?.addEventListener('click',()=>{feedback.textContent='✓ Action complete — clear confirmation state.';});
  document.querySelector('#sample-feedback')?.addEventListener('click',()=>{feedback.textContent='♡ Human-help pathway is always available.';});
})();
