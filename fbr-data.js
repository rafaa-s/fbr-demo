// Realty Platform — Mock Data Layer
// All values fictional. For prototype / demo purposes only.

window.FBR = {};

// Striped placeholder image generator — used in place of real property photos
const _ph = (label, hue) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stop-color='hsl(${hue},22%,72%)'/>
        <stop offset='1' stop-color='hsl(${hue},26%,48%)'/>
      </linearGradient>
      <pattern id='p' patternUnits='userSpaceOnUse' width='28' height='28' patternTransform='rotate(45)'>
        <rect width='28' height='28' fill='url(#g)'/>
        <line x1='0' y1='0' x2='0' y2='28' stroke='rgba(255,255,255,0.12)' stroke-width='6'/>
      </pattern>
    </defs>
    <rect width='800' height='600' fill='url(#p)'/>
    <g fill='rgba(255,255,255,0.7)' font-family='ui-monospace,Menlo,monospace' font-size='22' font-weight='600' text-anchor='middle'>
      <text x='400' y='312' letter-spacing='2'>${label}</text>
    </g>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};
window.FBR._ph = _ph;

window.FBR.listings = [
  {
    id:'AR-001', title:'Reserve Point Land', location:'Reserve Cove',
    neighborhood:'Reserve Cove', zone:'Reserve Cove Corridor',
    beds:null, baths:null, sqft:null, lot:'755 acres', lotVal:755,
    price:'$29,900,000', priceVal:29900000, pricePerSqft:null,
    status:'Active', type:'Land', daysOnMarket:42,
    lat:10.382, lng:-85.758,
    photo1:_ph('AR-001 · LAND', 198), photo2:_ph('AR-001 · ALT', 210),
    headline:'755-Acre Oceanfront Development Parcel',
    about:'Mock data — large coastal land parcel spanning two beaches. Ideal for ultra-private estate, resort, or land bank.',
    agent:'Jennifer Walsh', matchedLeads:3, views:284
  },
  {
    id:'AR-002', title:'Villa Azure', location:'Cape Vista',
    neighborhood:'Cape Vista', zone:'Cape Vista',
    beds:3, baths:3.5, sqft:7007, lot:'1.1 acres', lotVal:1.1,
    price:'$7,500,000', priceVal:7500000, pricePerSqft:1071,
    status:'Active', type:'Home', daysOnMarket:18,
    lat:10.584, lng:-85.688,
    photo1:_ph('AR-002 · VILLA', 210), photo2:_ph('AR-002 · ALT', 220),
    headline:'Ocean View Estate at the Cape',
    about:'Mock data — custom ocean-view residence. Designer interiors, infinity pool, walking distance to private beach.',
    agent:'Carlos Rodríguez', matchedLeads:7, views:521
  },
  {
    id:'AR-003', title:'Beachfront Villa No. 1', location:'Bay Heights',
    neighborhood:'Bay Heights', zone:'Bay Heights–Cove Beach',
    beds:6, baths:5, sqft:3200, lot:'4,836 sq.m.', lotVal:1.19,
    price:'$5,995,000', priceVal:5995000, pricePerSqft:1873,
    status:'Active', type:'Home', daysOnMarket:67,
    lat:10.432, lng:-85.801,
    photo1:_ph('AR-003 · BEACH', 188), photo2:_ph('AR-003 · ALT', 175),
    headline:'Legacy Beachfront Estate — 72m of Direct Frontage',
    about:'Mock data — hacienda-style estate on titled beachfront. Main residence plus guest house. Walking distance to marina.',
    agent:'Jennifer Walsh', matchedLeads:5, views:412
  },
  {
    id:'AR-004', title:'Cove Beach Estate', location:'Cove Beach',
    neighborhood:'Cove Beach', zone:'Bay Heights–Cove Beach',
    beds:6, baths:6, sqft:7100, lot:'1,050 sq.m.', lotVal:0.26,
    price:'$4,500,000', priceVal:4500000, pricePerSqft:634,
    status:'Active', type:'Home', daysOnMarket:31,
    lat:10.408, lng:-85.801,
    photo1:_ph('AR-004 · POOL', 168), photo2:_ph('AR-004 · ALT', 180),
    headline:'Titled Beachfront — Infinity Pool, Ocean Views',
    about:'Mock data — titled beachfront estate. Infinity pool, panoramic views of offshore islands. Sleeps 12.',
    agent:'Jennifer Walsh', matchedLeads:4, views:389
  },
  {
    id:'AR-005', title:'Ridge Estate + Guest House', location:'Bay Heights',
    neighborhood:'Bay Heights', zone:'Bay Heights–Cove Beach',
    beds:5, baths:7, sqft:7500, lot:'1,604 sq.m.', lotVal:0.40,
    price:'$4,400,000', priceVal:4400000, pricePerSqft:587,
    status:'Active', type:'Home', daysOnMarket:88,
    lat:10.430, lng:-85.797,
    photo1:_ph('AR-005 · RIDGE', 158), photo2:_ph('AR-005 · ALT', 145),
    headline:'Ridge Masterpiece — Ocean Views, Guest House Included',
    about:'Mock data — opulent estate with separate guest house. Zero-edge saltwater pool. Ocean views from every room.',
    agent:'Carlos Rodríguez', matchedLeads:6, views:467
  },
  {
    id:'AR-006', title:'Stone Ridge Residence', location:'Stone Ridge',
    neighborhood:'Stone Ridge', zone:'Stone Ridge',
    beds:5, baths:5.5, sqft:5000, lot:null, lotVal:null,
    price:'$3,990,000', priceVal:3990000, pricePerSqft:798,
    status:'Active', type:'Home', statusBadge:'Price Drop', daysOnMarket:112,
    lat:10.478, lng:-85.867,
    photo1:_ph('AR-006 · STONE', 32), photo2:_ph('AR-006 · ALT', 22),
    headline:'Car-Free Community — Jungle & Ocean Views',
    about:'Mock data — custom residence in a pedestrian community. Media room, studio apartment. Steps to beach clubs and restaurants.',
    agent:'Jennifer Walsh', matchedLeads:8, views:603
  },
  {
    id:'AR-007', title:'Pine Estate Villa', location:'Pine Estate',
    neighborhood:'Pine Estate', zone:'Pine Estate',
    beds:6, baths:6.5, sqft:9000, lot:'1,939 sq.m.', lotVal:0.48,
    price:'$3,600,000', priceVal:3600000, pricePerSqft:400,
    status:'Active', type:'Home', daysOnMarket:55,
    lat:10.261, lng:-85.789,
    photo1:_ph('AR-007 · GOLF', 92), photo2:_ph('AR-007 · ALT', 105),
    headline:'Italian-Inspired Estate — Golf Course, Smart Home',
    about:'Mock data — luxury estate on a championship golf course. Three primary suites, gym, 4-car garage. Furnished and turnkey.',
    agent:'Roberto Méndez', matchedLeads:5, views:341
  },
  {
    id:'AR-008', title:'The Palms — Unit 33', location:'Bay Heights',
    neighborhood:'Bay Heights', zone:'Bay Heights–Cove Beach',
    beds:3, baths:3.5, sqft:2831, lot:null, lotVal:null,
    price:'$3,600,000', priceVal:3600000, pricePerSqft:1272,
    status:'Active', type:'Condo', statusBadge:'Price Drop', daysOnMarket:144,
    lat:10.429, lng:-85.802,
    photo1:_ph('AR-008 · CONDO', 250), photo2:_ph('AR-008 · ALT', 260),
    headline:'Beachfront Condo — Direct Beach Access',
    about:'Mock data — prestigious beachfront condo. Travertine floors, premium appliances, wide ocean views. 1 of 34 exclusive units.',
    agent:'Jennifer Walsh', matchedLeads:9, views:728
  },
];

// Mock leads
window.FBR.leads = [
  { id:'L-001', name:'Lead 001 — Buyer Persona A', country:'USA', flag:'🇺🇸', budget:'$3M–$5M', looking:'Beachfront Home', zone:'Bay Heights', temp:'hot', status:'New — 2h ago', agent:'Jennifer Walsh', phone:'+1 555 555 0101', email:'lead001@example.com', lastTouch:null, score:94, timeline:'3 months', use:'Vacation + Rental', lang:'EN', source:'Web', matched:['AR-003','AR-004','AR-005'], avatar:'L1' },
  { id:'L-002', name:'Lead 002 — Buyer Persona B', country:'Germany', flag:'🇩🇪', budget:'$7M+', looking:'Ocean View Estate', zone:'Cape Vista', temp:'hot', status:'Contacted 1d ago', agent:'Carlos Rodríguez', phone:'+49 555 555 0102', email:'lead002@example.com', lastTouch:'Yesterday', score:88, timeline:'6 months', use:'Private Residence', lang:'DE', source:'Referral', matched:['AR-002'], avatar:'L2' },
  { id:'L-003', name:'Lead 003 — Family Trust', country:'Canada', flag:'🇨🇦', budget:'$4M–$6M', looking:'Estate + Guest House', zone:'Bay Heights–Cove Beach', temp:'warm', status:'Proposal sent 3d', agent:'Jennifer Walsh', phone:'+1 555 555 0103', email:'lead003@example.com', lastTouch:'3 days', score:72, timeline:'12 months', use:'Family Compound', lang:'EN', source:'Instagram', matched:['AR-005','AR-003'], avatar:'L3' },
  { id:'L-004', name:'Lead 004 — Buyer Persona C', country:'Japan', flag:'🇯🇵', budget:'$3M–$4M', looking:'Golf Community Home', zone:'Pine Estate', temp:'warm', status:'Visit scheduled Thu', agent:'Roberto Méndez', phone:'+81 555 555 0104', email:'lead004@example.com', lastTouch:'Today', score:81, timeline:'2 months', use:'Vacation Home', lang:'EN/JA', source:'Web', matched:['AR-007'], avatar:'L4' },
  { id:'L-005', name:'Lead 005 — Investor', country:'Mexico', flag:'🇲🇽', budget:'$2M–$4M', looking:'Beachfront Condo', zone:'Bay Heights', temp:'cold', status:'No contact 14d ⚠️', agent:'Jennifer Walsh', phone:'+52 555 555 0105', email:'lead005@example.com', lastTouch:'14 days', score:41, timeline:'Ready now', use:'Investment', lang:'ES', source:'WhatsApp', matched:['AR-008'], avatar:'L5' },
  { id:'L-006', name:'Lead 006 — Buyer Persona D', country:'UK', flag:'🇬🇧', budget:'$5M–$8M', looking:'Turnkey Luxury Estate', zone:'Stone Ridge', temp:'hot', status:'Offer pending', agent:'Jennifer Walsh', phone:'+44 555 555 0106', email:'lead006@example.com', lastTouch:'Today', score:97, timeline:'Immediate', use:'Primary Residence', lang:'EN', source:'Referral', matched:['AR-006','AR-002'], avatar:'L6' },
  { id:'L-007', name:'Lead 007 — Development Group', country:'Local', flag:'🌐', budget:'$20M+', looking:'Development Land', zone:'Reserve Cove', temp:'warm', status:'Due diligence', agent:'Carlos Rodríguez', phone:'+1 555 555 0107', email:'lead007@example.com', lastTouch:'2 days', score:78, timeline:'6 months', use:'Development', lang:'ES', source:'Direct', matched:['AR-001'], avatar:'L7' },
  { id:'L-008', name:'Lead 008 — Buyer Persona E', country:'Other', flag:'🌐', budget:'$3M–$5M', looking:'Beachfront Home', zone:'Cove Beach', temp:'cold', status:'No contact 21d ⚠️', agent:'Jennifer Walsh', phone:'+1 555 555 0108', email:'lead008@example.com', lastTouch:'21 days', score:28, timeline:'Flexible', use:'Vacation Home', lang:'EN', source:'Web', matched:['AR-004'], avatar:'L8' },
];

// Zone reference data (used internally by Map view for lead coordinates)
window.FBR.market = {
  zones: [
    { name:'Bay Heights',     supply:24, demand:38, avgPrice:3850000, priceChg:'+4.2%', absorption:62, hotScore:88, listings:['AR-003','AR-005','AR-008'], lat:10.430, lng:-85.800 },
    { name:'Stone Ridge',     supply:12, demand:21, avgPrice:3200000, priceChg:'+2.8%', absorption:58, hotScore:82, listings:['AR-006'], lat:10.478, lng:-85.867 },
    { name:'Pine Estate',     supply:18, demand:14, avgPrice:2800000, priceChg:'-1.1%', absorption:41, hotScore:52, listings:['AR-007'], lat:10.261, lng:-85.789 },
    { name:'Cape Vista',      supply:9,  demand:16, avgPrice:6200000, priceChg:'+6.1%', absorption:71, hotScore:91, listings:['AR-002'], lat:10.584, lng:-85.688 },
    { name:'Cove Beach',      supply:15, demand:11, avgPrice:2100000, priceChg:'-0.5%', absorption:38, hotScore:45, listings:['AR-004'], lat:10.408, lng:-85.801 },
    { name:'Surf Point',      supply:31, demand:44, avgPrice:1450000, priceChg:'+3.3%', absorption:67, hotScore:79, listings:[], lat:10.299, lng:-85.837 },
    { name:'Wild Coast',      supply:8,  demand:13, avgPrice:1800000, priceChg:'+5.7%', absorption:72, hotScore:85, listings:[], lat:10.335, lng:-85.854 },
  ],
  kpis: {
    totalInventory: 117, activeLeads: 84, avgDaysOnMarket: 71,
    closedLast30d: 6, pipelineValue: 48700000, conversionRate: 18.4,
    monthlyVolume: 12300000, yearlyVolume: 94800000
  }
};

// Pipeline stages
window.FBR.pipeline = {
  stages: ['New Lead','Contacted','Qualified','Visit Scheduled','Offer Sent','Negotiation','Closed Won'],
  deals: [
    { id:'D-001', lead:'Lead 006', prop:'Stone Ridge Residence', value:3990000, stage:'Negotiation',      agent:'Jennifer Walsh',  days:12, temp:'hot' },
    { id:'D-002', lead:'Lead 002', prop:'Villa Azure',           value:7500000, stage:'Visit Scheduled',  agent:'Carlos Rodríguez',days:4,  temp:'hot' },
    { id:'D-003', lead:'Lead 004', prop:'Pine Estate Villa',     value:3600000, stage:'Visit Scheduled',  agent:'Roberto Méndez',  days:2,  temp:'warm' },
    { id:'D-004', lead:'Lead 003', prop:'Ridge Estate',          value:4400000, stage:'Offer Sent',       agent:'Jennifer Walsh',  days:8,  temp:'warm' },
    { id:'D-005', lead:'Lead 007', prop:'Reserve Point Land',    value:29900000,stage:'Qualified',        agent:'Carlos Rodríguez',days:21, temp:'warm' },
    { id:'D-006', lead:'Lead 005', prop:'The Palms — Unit 33',   value:3600000, stage:'Contacted',        agent:'Jennifer Walsh',  days:14, temp:'cold' },
    { id:'D-007', lead:'Lead 001', prop:'Beachfront Villa No. 1',value:5995000, stage:'New Lead',         agent:'Jennifer Walsh',  days:0,  temp:'hot' },
    { id:'D-008', lead:'Lead 008', prop:'Cove Beach Estate',     value:4500000, stage:'Contacted',        agent:'Jennifer Walsh',  days:21, temp:'cold' },
  ]
};

// ─── ACTIVITIES DATA ─────────────────────────────────────────────────────────
window.FBR.activities = [
  { id:'A-001', type:'call',    agent:'Jennifer Walsh',  lead:'Lead 006', prop:'Stone Ridge Residence',  time:'09:00', date:'today',     status:'done',    duration:'18 min', notes:'Mock note — client confirmed interest, requesting final counter-offer by EOD.', outcome:'positive' },
  { id:'A-002', type:'visit',   agent:'Carlos Rodríguez',lead:'Lead 002', prop:'Villa Azure',            time:'10:30', date:'today',     status:'done',    duration:'2h 15min', notes:'Mock note — full property tour completed. Follow-up with legal docs.', outcome:'positive' },
  { id:'A-003', type:'whatsapp',agent:'Jennifer Walsh',  lead:'Lead 001', prop:'Beachfront Villa No. 1', time:'11:45', date:'today',     status:'pending', duration:null, notes:'Mock note — send updated comps for Bay Heights beachfront properties.', outcome:null },
  { id:'A-004', type:'email',   agent:'Jennifer Walsh',  lead:'Lead 005', prop:'The Palms — Unit 33',    time:'08:00', date:'today',     status:'overdue', duration:null, notes:'Mock note — no contact in 14 days. Send re-engagement email.', outcome:null },
  { id:'A-005', type:'call',    agent:'Roberto Méndez',  lead:'Lead 004', prop:'Pine Estate Villa',      time:'14:00', date:'today',     status:'scheduled',duration:null, notes:'Mock note — confirm Thursday visit logistics and send property brief.', outcome:null },
  { id:'A-006', type:'visit',   agent:'Carlos Rodríguez',lead:'Lead 007', prop:'Reserve Point Land',     time:'09:00', date:'tomorrow',  status:'scheduled',duration:null, notes:'Mock note — site visit with development team. Prepare topography docs.', outcome:null },
  { id:'A-007', type:'email',   agent:'Jennifer Walsh',  lead:'Lead 003', prop:'Ridge Estate',           time:'16:00', date:'today',     status:'scheduled',duration:null, notes:'Mock note — send financing package and updated offer comparison.', outcome:null },
  { id:'A-008', type:'whatsapp',agent:'Jennifer Walsh',  lead:'Lead 006', prop:'Stone Ridge Residence',  time:'07:30', date:'today',     status:'done',    duration:'4 min', notes:'Mock note — morning check-in. Confirmed availability for signing this week.', outcome:'positive' },
  { id:'A-009', type:'call',    agent:'Carlos Rodríguez',lead:'Lead 005', prop:'The Palms — Unit 33',    time:'15:30', date:'yesterday', status:'done',    duration:'0 min', notes:'Mock note — no answer. Left voicemail. Third attempt.', outcome:'negative' },
  { id:'A-010', type:'note',    agent:'Jennifer Walsh',  lead:'Lead 008', prop:'Cove Beach Estate',      time:'10:00', date:'yesterday', status:'done',    duration:null, notes:'Mock note — internal: lead has gone cold. Recommend re-assigning.', outcome:'neutral' },
  { id:'A-011', type:'visit',   agent:'Jennifer Walsh',  lead:'Lead 006', prop:'Stone Ridge Residence',  time:'11:00', date:'tomorrow',  status:'scheduled',duration:null, notes:'Mock note — pre-signing walkthrough with buyer attorney.', outcome:null },
  { id:'A-012', type:'email',   agent:'Roberto Méndez',  lead:'Lead 004', prop:'Pine Estate Villa',      time:'09:00', date:'yesterday', status:'done',    duration:null, notes:'Mock note — sent property brochure and HOA documents.', outcome:'neutral' },
];

// ─── OFFERS & CLOSINGS DATA ───────────────────────────────────────────────────
window.FBR.offers = [
  {
    id:'OFF-001', lead:'Lead 006', flag:'🇬🇧', prop:'Stone Ridge Residence', propId:'AR-006',
    photo:_ph('AR-006 · STONE', 32),
    neighborhood:'Stone Ridge', agent:'Jennifer Walsh',
    listPrice:3990000, offerHistory:[
      { date:'Apr 8',  party:'buyer',  amount:3600000, note:'Mock — initial offer, contingent on inspection' },
      { date:'Apr 11', party:'seller', amount:3850000, note:'Mock — counter-offer with 30-day closing window' },
      { date:'Apr 14', party:'buyer',  amount:3780000, note:'Mock — revised offer, all cash, 21-day close' },
      { date:'Apr 18', party:'seller', amount:3820000, note:'Mock — final counter, includes all furnishings' },
    ],
    currentAmount:3820000, status:'negotiation', daysInNegotiation:12,
    closing:{ deposit:191000, depositPaid:true, inspection:'Completed — minor items noted', legal:'In review', dueDiligence:'90% complete', signingDate:'Apr 28', transferDate:'May 5' },
    commission:{ rate:5, total:191000, agentSplit:95500, brokerage:95500 },
    nextAction:'Awaiting buyer signature on revised counter', urgency:'hot',
  },
  {
    id:'OFF-002', lead:'Lead 002', flag:'🇩🇪', prop:'Villa Azure', propId:'AR-002',
    photo:_ph('AR-002 · VILLA', 210),
    neighborhood:'Cape Vista', agent:'Carlos Rodríguez',
    listPrice:7500000, offerHistory:[
      { date:'Apr 16', party:'buyer',  amount:7000000, note:'Mock — initial offer with 60-day financing contingency' },
      { date:'Apr 19', party:'seller', amount:7350000, note:'Mock — counter-offer, 45-day close' },
    ],
    currentAmount:7350000, status:'countered', daysInNegotiation:4,
    closing:{ deposit:null, depositPaid:false, inspection:'Not started', legal:'Pending', dueDiligence:'15% complete', signingDate:null, transferDate:null },
    commission:{ rate:5, total:367500, agentSplit:183750, brokerage:183750 },
    nextAction:'Awaiting buyer response on counter. Follow up Apr 22.', urgency:'hot',
  },
  {
    id:'OFF-003', lead:'Lead 003', flag:'🇨🇦', prop:'Ridge Estate', propId:'AR-005',
    photo:_ph('AR-005 · RIDGE', 158),
    neighborhood:'Bay Heights', agent:'Jennifer Walsh',
    listPrice:4400000, offerHistory:[
      { date:'Apr 12', party:'buyer',  amount:4100000, note:'Mock — opening bid, subject to financing approval' },
      { date:'Apr 15', party:'seller', amount:4300000, note:'Mock — counter, no contingencies requested' },
    ],
    currentAmount:4300000, status:'stalled', daysInNegotiation:8,
    closing:{ deposit:null, depositPaid:false, inspection:'Not started', legal:'Pending', dueDiligence:'0% complete', signingDate:null, transferDate:null },
    commission:{ rate:5, total:215000, agentSplit:107500, brokerage:107500 },
    nextAction:'No buyer response in 3 days. Re-engage immediately.', urgency:'warm',
  },
  {
    id:'OFF-004', lead:'Lead 005', flag:'🇲🇽', prop:'The Palms — Unit 33', propId:'AR-008',
    photo:_ph('AR-008 · CONDO', 250),
    neighborhood:'Bay Heights', agent:'Jennifer Walsh',
    listPrice:3600000, offerHistory:[],
    currentAmount:null, status:'pre-offer', daysInNegotiation:0,
    closing:{ deposit:null, depositPaid:false, inspection:'Not started', legal:'Pending', dueDiligence:'0% complete', signingDate:null, transferDate:null },
    commission:{ rate:5, total:180000, agentSplit:90000, brokerage:90000 },
    nextAction:'Lead qualified. Visit to be scheduled. Prepare offer template.', urgency:'warm',
  },
];

window.FBR.closings = [
  { id:'CL-001', lead:'Closed Buyer 1', flag:'🇺🇸', prop:'Pine Estate Villa',     neighborhood:'Pine Estate',   agent:'Carlos Rodríguez', salePrice:2850000, commission:142500, closedDate:'Mar 28', daysToClose:34, photo:_ph('AR-007 · GOLF', 92) },
  { id:'CL-002', lead:'Closed Buyer 2', flag:'🇫🇷', prop:'Marina Cove Condo #14', neighborhood:'Marina Cove',   agent:'Jennifer Walsh',   salePrice:1200000, commission:60000,  closedDate:'Mar 14', daysToClose:22, photo:_ph('CL · MARINA', 200) },
  { id:'CL-003', lead:'Closed Buyer 3', flag:'🇯🇵', prop:'Pine Ridge Estate',     neighborhood:'Pine Estate',   agent:'Roberto Méndez',   salePrice:4100000, commission:205000, closedDate:'Feb 20', daysToClose:51, photo:_ph('CL · RIDGE', 95) },
  { id:'CL-004', lead:'Closed Buyer 4', flag:'🇮🇪', prop:'Stone Ridge Townhome',  neighborhood:'Stone Ridge',   agent:'Jennifer Walsh',   salePrice:1950000, commission:97500,  closedDate:'Feb 8',  daysToClose:19, photo:_ph('CL · STONE', 30) },
  { id:'CL-005', lead:'Closed Buyer 5', flag:'🌐', prop:'Marina Unit 8',          neighborhood:'Bay Heights',   agent:'Carlos Rodríguez', salePrice:890000,  commission:44500,  closedDate:'Jan 31', daysToClose:28, photo:_ph('CL · BAY', 190) },
];

// ─── INBOX DATA ───────────────────────────────────────────────────────────────
window.FBR.inbox = [
  {
    id:'CONV-001', channel:'whatsapp', lead:'Lead 006', flag:'🇬🇧', agent:'Jennifer Walsh',
    unread:2, lastMsg:'Mock — Perfect, I will have my attorney review by tomorrow morning.', lastTime:'09:41', temp:'hot', status:'active',
    messages:[
      { from:'lead',  text:'Mock — Good morning! Any update on the counter-offer from the sellers?', time:'07:28', channel:'whatsapp' },
      { from:'agent', text:'Mock — Yes, they came back at $3,820,000 and are including all furnishings. I think this is their final.', time:'07:45', channel:'whatsapp' },
      { from:'lead',  text:'Mock — Interesting. What does that include exactly?', time:'08:02', channel:'whatsapp' },
      { from:'agent', text:'Mock — Full inventory list attached. Doors, custom lighting, pool furniture — everything. I can send the full PDF.', time:'08:10', channel:'whatsapp' },
      { from:'lead',  text:'Mock — Please do. I am very close to saying yes.', time:'08:55', channel:'whatsapp' },
      { from:'agent', text:'Mock — Sent! Also confirming our walkthrough Tuesday 11am with your attorney.', time:'09:02', channel:'whatsapp' },
      { from:'lead',  text:'Mock — Perfect, I will have my attorney review by tomorrow morning.', time:'09:41', channel:'whatsapp' },
    ],
    aiSuggestion: 'Mock — buyer is signaling readiness to accept. Recommend sending a formal acceptance prompt with signing date and wire instructions now.',
    aiDraft: 'Mock — Wonderful news! I will prepare the formal acceptance document today and send it for your signature. Proposed signing: April 28. Wire instructions will follow from our legal team shortly.',
    matched:'AR-006',
  },
  {
    id:'CONV-002', channel:'email', lead:'Lead 002', flag:'🇩🇪', agent:'Carlos Rodríguez',
    unread:1, lastMsg:'Mock — Sehr gut. Mein Team wird die Unterlagen prüfen.', lastTime:'Yesterday', temp:'hot', status:'active',
    messages:[
      { from:'agent', text:'Mock — Following our visit to Villa Azure yesterday, I am pleased to forward the seller counter-offer of $7,350,000 with a 45-day closing window.', time:'Apr 19 · 09:15', channel:'email' },
      { from:'lead',  text:'Mock — Thanks for the quick reply. The price is acceptable but we need 60 days for due diligence.', time:'Apr 19 · 14:32', channel:'email' },
      { from:'agent', text:'Mock — Understood, I will communicate your request to the seller and expect a response within 24 hours.', time:'Apr 19 · 15:10', channel:'email' },
      { from:'lead',  text:'Mock — Sehr gut. Mein Team wird die Unterlagen prüfen.', time:'Apr 19 · 18:44', channel:'email' },
    ],
    aiSuggestion: 'Mock — buyer is engaged but needs 60-day due diligence. Bridge this gap by proposing 50 days with a larger deposit as security.',
    aiDraft: 'Mock — The seller has agreed to extend the closing window to 50 days in exchange for a 5% deposit upon signing. This is standard for international transactions of this scale.',
    matched:'AR-002',
  },
  {
    id:'CONV-003', channel:'whatsapp', lead:'Lead 005', flag:'🇲🇽', agent:'Jennifer Walsh',
    unread:0, lastMsg:'Mock — Ok. Avísame cuando haya disponibilidad para visitar.', lastTime:'14 days ago', temp:'cold', status:'stale',
    messages:[
      { from:'lead',  text:'Mock — Hola, ¿sigue disponible el departamento en Bay Heights?', time:'Apr 6 · 11:22', channel:'whatsapp' },
      { from:'agent', text:'Mock — Sí, The Palms #33 sigue activo. El precio bajó a $3,600,000. ¿Le interesa agendar una visita?', time:'Apr 6 · 12:01', channel:'whatsapp' },
      { from:'lead',  text:'Mock — Ok. Avísame cuando haya disponibilidad para visitar.', time:'Apr 6 · 12:15', channel:'whatsapp' },
    ],
    aiSuggestion: 'Mock — 14 days of silence. Send re-engagement message with urgency: another buyer is evaluating the unit. Include price-drop badge and a direct visit CTA.',
    aiDraft: 'Mock — Quería contactarte porque tenemos otro comprador evaluando The Palms #33 esta semana. El precio ya está en $3,600,000. ¿Te gustaría agendar una visita este jueves o viernes?',
    matched:'AR-008',
  },
  {
    id:'CONV-004', channel:'web', lead:'Lead 001', flag:'🇺🇸', agent:'Jennifer Walsh',
    unread:3, lastMsg:'Mock — We are very interested in properties with direct beach access.', lastTime:'2h ago', temp:'hot', status:'new',
    messages:[
      { from:'lead', text:'Mock — Hello! We found your site through search. We are a couple looking for a beachfront home.', time:'08:10', channel:'web' },
      { from:'ai',   text:'Mock — Welcome! We have several beachfront properties in Bay Heights. What is your approximate budget and timeline?', time:'08:11', channel:'ai' },
      { from:'lead', text:'Mock — Budget around $4-6 million. We want something move-in ready with a pool. Timeline 3-6 months.', time:'08:14', channel:'web' },
      { from:'ai',   text:'Mock — Based on your criteria I can suggest Beachfront Villa No. 1 ($5,995,000) and Cove Beach Estate ($4,500,000). Schedule a virtual or in-person tour?', time:'08:14', channel:'ai' },
      { from:'lead', text:'Mock — We are very interested in properties with direct beach access.', time:'08:41', channel:'web' },
    ],
    aiSuggestion: 'Mock — hot new lead. AI already matched two listings. Assign to Jennifer Walsh and schedule video call today.',
    aiDraft: 'Mock — I will arrange private showings of both Beachfront Villa No. 1 and Cove Beach Estate this week. Are you available for a quick 15-min call today to discuss?',
    matched:'AR-003',
  },
  {
    id:'CONV-005', channel:'phone', lead:'Lead 004', flag:'🇯🇵', agent:'Roberto Méndez',
    unread:0, lastMsg:'Mock — Call scheduled for today 2:00 PM', lastTime:'1h ago', temp:'warm', status:'active',
    messages:[
      { from:'system', text:'Mock — Incoming call · 8 min 34 sec', time:'Yesterday · 16:22', channel:'phone' },
      { from:'note',   text:'Mock — Discussed golf views and HOA. Client interested in the garage. Asked about rental yield potential.', time:'Yesterday · 16:31', channel:'note' },
      { from:'agent',  text:'Mock — Email follow-up sent. Property brochure, HOA docs, rental yield analysis.', time:'Yesterday · 17:05', channel:'email' },
      { from:'system', text:'Mock — Call scheduled for today 2:00 PM', time:'Today · 08:30', channel:'phone' },
    ],
    aiSuggestion: 'Mock — buyer asked about rental yield. Prepare a short analysis with comps from nearby vacation rental data.',
    aiDraft: null,
    matched:'AR-007',
  },
  {
    id:'CONV-006', channel:'whatsapp', lead:'Lead 007', flag:'🌐', agent:'Carlos Rodríguez',
    unread:1, lastMsg:'Mock — Necesitamos los planos de zonificación y el estudio de impacto ambiental.', lastTime:'2d ago', temp:'warm', status:'active',
    messages:[
      { from:'lead',  text:'Mock — Buenos días. Estamos avanzando con la due diligence de Reserve Point Land.', time:'Apr 18 · 09:00', channel:'whatsapp' },
      { from:'agent', text:'Mock — Excelente. Les envío el paquete de documentación completo hoy.', time:'Apr 18 · 09:30', channel:'whatsapp' },
      { from:'lead',  text:'Mock — Necesitamos los planos de zonificación y el estudio de impacto ambiental.', time:'Apr 18 · 14:15', channel:'whatsapp' },
    ],
    aiSuggestion: 'Mock — development buyer requesting zoning plans and environmental impact study. Critical for a $29.9M acquisition. Coordinate with legal team immediately.',
    aiDraft: 'Mock — Ya coordiné con nuestro equipo legal y les enviaré hoy: planos de zonificación actualizados, estudio de impacto ambiental, certificaciones. ¿Algún otro requerimiento?',
    matched:'AR-001',
  },
];

// ─── ADS INTELLIGENCE DATA ────────────────────────────────────────────────────
// Mock 30-day window
window.FBR.ads = {

  summary: {
    period: 'Mock — last 30 days',
    totalSpend: 22840,
    totalLeads: 187,
    totalVisits: 14320,
    totalOpportunities: 31,
    closingsAttributed: 2,
    pipelineAttributed: 18700000,
    avgCPL: 122,
    avgCTR: 1.84,
    avgCPC: 3.12,
    avgCPM: 24.60,
    roas: 818,
    metaSpend: 14200,
    googleSpend: 8640,
    metaLeads: 124,
    googleLeads: 63,
  },

  daily: [
    {d:'D 1',spend:680,leads:5,visits:410},{d:'D 2',spend:720,leads:6,visits:438},
    {d:'D 3',spend:695,leads:4,visits:392},{d:'D 4',spend:810,leads:8,visits:521},
    {d:'D 5',spend:755,leads:7,visits:480},{d:'D 6',spend:840,leads:9,visits:560},
    {d:'D 7',spend:780,leads:6,visits:445},{d:'D 8',spend:720,leads:5,visits:410},
    {d:'D 9',spend:690,leads:4,visits:388},{d:'D10',spend:810,leads:8,visits:498},
    {d:'D11',spend:920,leads:9,visits:601},{d:'D12',spend:870,leads:8,visits:558},
    {d:'D13',spend:795,leads:6,visits:480},{d:'D14',spend:840,leads:7,visits:510},
    {d:'D15',spend:760,leads:5,visits:430},{d:'D16',spend:880,leads:9,visits:573},
    {d:'D17',spend:910,leads:10,visits:610},{d:'D18',spend:850,leads:8,visits:540},
    {d:'D19',spend:780,leads:6,visits:460},{d:'D20',spend:820,leads:7,visits:495},
    {d:'D21',spend:900,leads:9,visits:590},{d:'D22',spend:960,leads:11,visits:640},
    {d:'D23',spend:840,leads:7,visits:505},{d:'D24',spend:780,leads:6,visits:450},
    {d:'D25',spend:890,leads:8,visits:560},{d:'D26',spend:930,leads:10,visits:615},
    {d:'D27',spend:870,leads:8,visits:538},{d:'D28',spend:810,leads:7,visits:490},
    {d:'D29',spend:880,leads:9,visits:565},{d:'D30',spend:640,leads:5,visits:370},
  ],

  campaigns: [
    {
      id:'C-001', platform:'Meta', name:'Luxury Homes · USA Lookalike',
      objective:'Lead Gen', status:'active', budget:320, budgetType:'daily',
      spend:5840, impressions:287400, clicks:5602, leads:48, visits:3210,
      ctr:1.95, cpc:1.04, cpm:20.32, cpl:122, qualityScore:88,
      opportunities:9, closings:1, pipelineValue:7500000,
      targetCountry:'USA', audience:'Lookalike 1% — past buyers + HNW',
      zone:'Cape Vista, Bay Heights', listingFocus:'AR-002',
      trend:'+12%', fatigue:false, alert:null,
    },
    {
      id:'C-002', platform:'Meta', name:'Beachfront Villas · Retargeting USA/CA',
      objective:'Lead Gen', status:'active', budget:180, budgetType:'daily',
      spend:3240, impressions:98200, clicks:2940, leads:31, visits:1850,
      ctr:2.99, cpc:1.10, cpm:33.00, cpl:105, qualityScore:92,
      opportunities:7, closings:1, pipelineValue:5995000,
      targetCountry:'USA / Canada', audience:'Website visitors 180d + video views 75%',
      zone:'Bay Heights', listingFocus:'AR-003',
      trend:'+8%', fatigue:false, alert:null,
    },
    {
      id:'C-003', platform:'Meta', name:'Investment Property · Canada',
      objective:'Lead Gen', status:'active', budget:200, budgetType:'daily',
      spend:3620, impressions:142600, clicks:2138, leads:29, visits:1640,
      ctr:1.50, cpc:1.69, cpm:25.38, cpl:125, qualityScore:79,
      opportunities:5, closings:0, pipelineValue:3990000,
      targetCountry:'Canada', audience:'HNW investors, 35–65',
      zone:'Stone Ridge, Pine Estate', listingFocus:'AR-006',
      trend:'+3%', fatigue:false, alert:null,
    },
    {
      id:'C-004', platform:'Meta', name:'Ocean View · Broad USA',
      objective:'Traffic', status:'active', budget:240, budgetType:'daily',
      spend:4320, impressions:388000, clicks:5044, leads:16, visits:3820,
      ctr:1.30, cpc:0.86, cpm:11.13, cpl:270, qualityScore:38,
      opportunities:2, closings:0, pipelineValue:0,
      targetCountry:'USA', audience:'Broad — travel + luxury + 45–65',
      zone:'All coastal', listingFocus:null,
      trend:'-5%', fatigue:true, alert:'High spend, low lead quality. Recommend pausing or tightening audience.',
    },
    {
      id:'C-005', platform:'Google', name:'Real Estate For Sale · Search',
      objective:'Lead Gen', status:'active', budget:150, budgetType:'daily',
      spend:2880, impressions:41200, clicks:1854, leads:22, visits:1854,
      ctr:4.50, cpc:1.55, cpm:69.90, cpl:131, qualityScore:85,
      opportunities:5, closings:0, pipelineValue:4400000,
      targetCountry:'USA / Canada', audience:'Search intent: buy beach property',
      zone:'Bay Heights, Stone Ridge', listingFocus:'AR-005',
      trend:'+18%', fatigue:false, alert:null,
    },
    {
      id:'C-006', platform:'Google', name:'Luxury Coastal · Search',
      objective:'Lead Gen', status:'active', budget:120, budgetType:'daily',
      spend:2160, impressions:18900, clicks:1134, leads:19, visits:1134,
      ctr:6.00, cpc:1.90, cpm:114.29, cpl:114, qualityScore:91,
      opportunities:6, closings:0, pipelineValue:3600000,
      targetCountry:'USA', audience:'High intent: luxury coastal real estate',
      zone:'Pine Estate, Cape Vista', listingFocus:'AR-007',
      trend:'+22%', fatigue:false, alert:null,
    },
    {
      id:'C-007', platform:'Google', name:'Coastal Lifestyle Display · USA/CA',
      objective:'Awareness', status:'active', budget:80, budgetType:'daily',
      spend:1440, impressions:198400, clicks:992, leads:12, visits:992,
      ctr:0.50, cpc:1.45, cpm:7.26, cpl:120, qualityScore:62,
      opportunities:2, closings:0, pipelineValue:1200000,
      targetCountry:'USA / Canada', audience:'Display: luxury travel, second home interest',
      zone:'All coastal', listingFocus:null,
      trend:'-2%', fatigue:false, alert:'Awareness campaign — CPL acceptable but lead quality needs improvement.',
    },
    {
      id:'C-008', platform:'Google', name:'Buy Property · Search Broad',
      objective:'Lead Gen', status:'paused', budget:100, budgetType:'daily',
      spend:2160, impressions:52300, clicks:1882, leads:10, visits:1882,
      ctr:3.60, cpc:1.15, cpm:41.30, cpl:216, qualityScore:29,
      opportunities:1, closings:0, pipelineValue:0,
      targetCountry:'USA', audience:'Broad match — unqualified traffic',
      zone:'Generic', listingFocus:null,
      trend:'-18%', fatigue:true, alert:'⚠ Paused — CPL $216, quality score 29. Restructure keywords.',
    },
  ],

  creatives: [
    {
      id:'CR-001', campaignId:'C-001', platform:'Meta', type:'Video',
      name:'Villa Azure — Ocean View Walkthrough', thumb:_ph('CR · AZURE', 210),
      impressions:142800, clicks:3140, leads:28, ctr:2.20, cpl:98, qualityScore:91,
      frequency:2.1, fatigueRisk:'low', spend:2744, engagement:'8.4%',
      status:'top performer', note:'Mock — best performing creative overall. Scale budget.',
    },
    {
      id:'CR-002', campaignId:'C-002', platform:'Meta', type:'Carousel',
      name:'Bay Heights — 3 Properties Showcase', thumb:_ph('CR · BAY', 188),
      impressions:68400, clicks:2052, leads:22, ctr:3.00, cpl:88, qualityScore:94,
      frequency:1.8, fatigueRisk:'low', spend:1936, engagement:'9.1%',
      status:'top performer', note:'Mock — highest quality score. Retargeting audience resonates.',
    },
    {
      id:'CR-003', campaignId:'C-001', platform:'Meta', type:'Static Image',
      name:'"Your Coastal Life" — Lifestyle', thumb:_ph('CR · LIFESTYLE', 158),
      impressions:144600, clicks:2462, leads:20, ctr:1.70, cpl:155, qualityScore:58,
      frequency:4.8, fatigueRisk:'high', spend:3100, engagement:'3.2%',
      status:'fatigued', note:'Mock — frequency 4.8, audience saturated. Rotate or refresh creative.',
    },
    {
      id:'CR-004', campaignId:'C-003', platform:'Meta', type:'Video',
      name:'Pine Estate Golf & Ocean — Canada', thumb:_ph('CR · GOLF', 92),
      impressions:98200, clicks:1572, leads:18, ctr:1.60, cpl:134, qualityScore:76,
      frequency:2.4, fatigueRisk:'medium', spend:2412, engagement:'5.7%',
      status:'active', note:'Mock — good for Canadian investor audience. Test a testimonial variant.',
    },
    {
      id:'CR-005', campaignId:'C-005', platform:'Google', type:'Responsive Search',
      name:'Headline: "Luxury Coastal Homes"', thumb:null,
      impressions:22400, clicks:1120, leads:15, ctr:5.00, cpl:108, qualityScore:88,
      frequency:null, fatigueRisk:'low', spend:1620, engagement:null,
      status:'top performer', note:'Mock — top Google creative. CTR 5% above industry avg.',
    },
    {
      id:'CR-006', campaignId:'C-006', platform:'Google', type:'Responsive Search',
      name:'Headline: "Beachfront Estates"', thumb:null,
      impressions:10800, clicks:756, leads:14, ctr:7.00, cpl:102, qualityScore:93,
      frequency:null, fatigueRisk:'low', spend:1428, engagement:null,
      status:'top performer', note:'Mock — highest CTR in portfolio. Quality Score 9/10. Do not touch.',
    },
    {
      id:'CR-007', campaignId:'C-004', platform:'Meta', type:'Static Image',
      name:'Sunset Pool — Generic Ocean View', thumb:_ph('CR · SUNSET', 22),
      impressions:388000, clicks:5044, leads:16, ctr:1.30, cpl:270, qualityScore:38,
      frequency:5.2, fatigueRisk:'critical', spend:4320, engagement:'1.8%',
      status:'burn', note:'Mock — critical fatigue. Frequency 5.2. Pause immediately.',
    },
    {
      id:'CR-008', campaignId:'C-002', platform:'Meta', type:'Video',
      name:'Client Testimonial — Mock Story', thumb:_ph('CR · TESTIMONIAL', 32),
      impressions:29800, clicks:888, leads:9, ctr:2.98, cpl:122, qualityScore:84,
      frequency:1.4, fatigueRisk:'low', spend:1098, engagement:'7.6%',
      status:'active', note:'Mock — social proof works. Explore series with multiple client stories.',
    },
  ],

  countries: [
    { country:'United States', flag:'🇺🇸', spend:14820, leads:118, cpl:126, qualityScore:81, opportunities:21, closings:2, pipelineValue:13495000, topChannel:'Meta + Google', topZone:'Cape Vista',  avgBudget:'$4.2M', conversionRate:17.8 },
    { country:'Canada',        flag:'🇨🇦', spend:4940,  leads:41,  cpl:120, qualityScore:79, opportunities:7,  closings:0, pipelineValue:3990000,  topChannel:'Meta',          topZone:'Stone Ridge', avgBudget:'$3.1M', conversionRate:17.1 },
    { country:'Mexico',        flag:'🇲🇽', spend:1420,  leads:14,  cpl:101, qualityScore:62, opportunities:2,  closings:0, pipelineValue:1200000,  topChannel:'Meta',          topZone:'Bay Heights', avgBudget:'$2.8M', conversionRate:14.3 },
    { country:'United Kingdom',flag:'🇬🇧', spend:820,   leads:8,   cpl:103, qualityScore:88, opportunities:1,  closings:0, pipelineValue:3820000,  topChannel:'Google',        topZone:'Cape Vista',  avgBudget:'$5.8M', conversionRate:12.5 },
    { country:'Germany',       flag:'🇩🇪', spend:540,   leads:4,   cpl:135, qualityScore:84, opportunities:1,  closings:0, pipelineValue:7350000,  topChannel:'Google',        topZone:'Cape Vista',  avgBudget:'$7.5M', conversionRate:25.0 },
    { country:'Other',         flag:'🌐', spend:300,   leads:2,   cpl:150, qualityScore:71, opportunities:1,  closings:0, pipelineValue:29900000, topChannel:'Direct',        topZone:'Reserve Cove',avgBudget:'$15M+', conversionRate:50.0 },
  ],

  attribution: [
    { stage:'Ad Impressions',     value:736300, unit:'impressions', pct:100 },
    { stage:'Clicks',             value:20586,  unit:'clicks',      pct:2.8 },
    { stage:'Landing Visits',     value:14320,  unit:'visits',      pct:1.9 },
    { stage:'Leads Generated',    value:187,    unit:'leads',       pct:1.3 },
    { stage:'Qualified Leads',    value:84,     unit:'leads',       pct:0.57 },
    { stage:'Opportunities',      value:31,     unit:'deals',       pct:0.004 },
    { stage:'Offers Sent',        value:8,      unit:'offers',      pct:0.001 },
    { stage:'Closings Attributed',value:2,      unit:'closings',    pct:0.0003 },
  ],

  recommendations: [
    { priority:1, type:'urgent',      icon:'⛔', title:'Pause C-004 — Ocean View Broad USA',     impact:'Save $4,320/mo',          detail:'Mock — CPL $270, 3.2x portfolio average. Quality score 38. Reallocate budget to C-001 and C-002.',         action:'Pause Campaign',     campaign:'C-004' },
    { priority:2, type:'urgent',      icon:'⚠️', title:'Rotate CR-003 creative immediately',     impact:'Recover ~20 quality leads/mo', detail:'Mock — frequency 4.8. Engagement dropped 58% in 2 weeks. Create a fresh variant.',                     action:'Refresh Creative',   campaign:'C-001' },
    { priority:3, type:'scale',       icon:'🚀', title:'Scale C-006 — Luxury Coastal Search',     impact:'+$2.1M pipeline est.',    detail:'Mock — quality score 91, CPL $114, CTR 6%. Underbudgeted at $120/day. Increase to $200/day.',          action:'Increase Budget',    campaign:'C-006' },
    { priority:4, type:'scale',       icon:'🚀', title:'Scale CR-001 video — Villa Azure',        impact:'+12 qualified leads/mo',  detail:'Mock — CPL $98, quality score 91, frequency only 2.1. Room to scale 40%.',                              action:'Scale Creative',     campaign:'C-001' },
    { priority:5, type:'opportunity', icon:'🌍', title:'Germany converts above average — expand', impact:'+$3.6M pipeline est.',    detail:'Mock — 25% lead-to-opportunity rate vs 17% portfolio avg. Only $540 spent. Launch dedicated campaign.',  action:'New Campaign',       campaign:null },
    { priority:6, type:'opportunity', icon:'🇨🇦', title:'Canada CPL $120 — increase budget',       impact:'+8 qualified leads/mo',   detail:'Mock — Canada is second largest volume market. Increase C-003 to $280/day.',                            action:'Increase Budget',    campaign:'C-003' },
    { priority:7, type:'fix',         icon:'🔑', title:'C-008 restructure — broad keywords',      impact:'Save $2,160/mo',          detail:'Mock — broad match capturing low-intent traffic. CPL $216, quality 29. When relaunching, use phrase/exact only.', action:'Restructure',     campaign:'C-008' },
    { priority:8, type:'opportunity', icon:'📹', title:'Expand testimonial video series',         impact:'+15% quality score avg',  detail:'Mock — CR-008 has 7.6% engagement and 84 quality score with minimal spend. Produce 3–4 client stories.', action:'New Creative',       campaign:'C-002' },
  ],
};

window.FBR.agents = [
  { name:'Jennifer Walsh',   listings:3, leads:12, closings:2, volume:9985000,  avatar:'JW', color:'#C09B57' },
  { name:'Carlos Rodríguez', listings:2, leads:9,  closings:3, volume:14200000, avatar:'CR', color:'#163061' },
  { name:'María Fernández',  listings:3, leads:11, closings:2, volume:7990000,  avatar:'MF', color:'#2B6E4A' },
  { name:'Roberto Méndez',   listings:1, leads:7,  closings:1, volume:3600000,  avatar:'RM', color:'#8B4B8B' },
];


// ─── MARKETING DATA ───────────────────────────────────────────────────────────
window.FBR.marketing = {

  channels: [
    {
      id:'ig', name:'Instagram', handle:'@acmerealty_mock', color:'#E1306C',
      followers:18420, followerGrowth:+312, posts:284, reach:142000,
      engagementRate:4.8, impressions:310000, avgLikes:620, avgComments:28,
      status:'connected', lastPost:'2h ago',
    },
    {
      id:'fb', name:'Facebook', handle:'Acme Realty (Mock)', color:'#1877F2',
      followers:9810,  followerGrowth:+88,  posts:196, reach:88000,
      engagementRate:2.1, impressions:204000, avgLikes:180, avgComments:14,
      status:'connected', lastPost:'5h ago',
    },
    {
      id:'li', name:'LinkedIn', handle:'Acme Realty Demo',  color:'#0A66C2',
      followers:4230,  followerGrowth:+54,  posts:112, reach:31000,
      engagementRate:3.4, impressions:68000, avgLikes:110, avgComments:19,
      status:'connected', lastPost:'1d ago',
    },
  ],

  socialPosts: [
    { id:'SP-001', platform:'ig', title:'New Listing — Villa Azure', previewText:'Stunning ocean-view estate now available in Cape Vista. 3 bed / 3.5 bath. Schedule your private showing.', date:'May 14', time:'10:00', reach:8420, likes:614, comments:34, campaign:'Listing Launch', owner:'Jennifer Walsh', status:'published', engagement:'8.3%' },
    { id:'SP-002', platform:'fb', title:'Buyer Education: What to Look for in Beachfront', previewText:'Five key questions to ask before purchasing beachfront property. Link in bio.', date:'May 14', time:'08:30', reach:4200, likes:148, comments:11, campaign:'Buyer Education', owner:'Carlos Rodríguez', status:'published', engagement:'3.8%' },
    { id:'SP-003', platform:'li', title:'Q1 Coastal Market Insights', previewText:'Our Q1 analysis shows a 4.2% price increase across Bay Heights. Full report attached.', date:'May 13', time:'12:00', reach:2800, likes:98, comments:22, campaign:'Market Insights', owner:'María Fernández', status:'published', engagement:'4.3%' },
    { id:'SP-004', platform:'ig', title:'Open House — Ridge Estate', previewText:'Join us this Saturday 10am–1pm. Tour the most breathtaking ocean-view estate on the ridge.', date:'May 13', time:'09:00', reach:6100, likes:490, comments:28, campaign:'Open House', owner:'Jennifer Walsh', status:'published', engagement:'8.5%' },
    { id:'SP-005', platform:'fb', title:'Client Story — Lead 006 finds her dream home', previewText:'"We never expected to fall in love so quickly." Hear our latest success story.', date:'May 12', time:'14:00', reach:5800, likes:322, comments:41, campaign:'Testimonials', owner:'Roberto Méndez', status:'published', engagement:'6.3%' },
    { id:'SP-006', platform:'li', title:'Luxury Property Investment: The Numbers', previewText:'Cape Vista properties have appreciated 6.1% in 12 months. Here is what the data says.', date:'May 11', time:'11:00', reach:3100, likes:142, comments:31, campaign:'Market Insights', owner:'María Fernández', status:'published', engagement:'5.6%' },
    { id:'SP-007', platform:'ig', title:'Coastal Living Feature: Pine Estate Villa', previewText:'Golf, nature, and ocean views — the trifecta of luxury living. Swipe to explore.', date:'May 10', time:'10:00', reach:7200, likes:580, comments:22, campaign:'Listing Launch', owner:'Carlos Rodríguez', status:'published', engagement:'8.4%' },
  ],

  calendar: [
    { id:'CAL-001', date:'2026-05-15', time:'09:00', platform:'ig', title:'Stone Ridge Residence — Price Drop Alert', campaign:'Listing Launch', owner:'Jennifer Walsh', status:'scheduled' },
    { id:'CAL-002', date:'2026-05-15', time:'12:00', platform:'fb', title:'Open House This Weekend — Join Us!', campaign:'Open House', owner:'Carlos Rodríguez', status:'scheduled' },
    { id:'CAL-003', date:'2026-05-16', time:'10:00', platform:'li', title:'New Listing: Reserve Point Land — 755 Acres', campaign:'Listing Launch', owner:'María Fernández', status:'scheduled' },
    { id:'CAL-004', date:'2026-05-16', time:'18:00', platform:'ig', title:'Coastal Living Reel — Bay Heights Sunset', campaign:'Coastal Living', owner:'Jennifer Walsh', status:'pending' },
    { id:'CAL-005', date:'2026-05-17', time:'09:30', platform:'fb', title:'Buyer FAQ: Coastal Real Estate 101', campaign:'Buyer Education', owner:'Roberto Méndez', status:'wip' },
    { id:'CAL-006', date:'2026-05-18', time:'11:00', platform:'ig', title:'Villa Azure — Walkthrough Video', campaign:'Listing Launch', owner:'Carlos Rodríguez', status:'approved' },
    { id:'CAL-007', date:'2026-05-19', time:'14:00', platform:'li', title:'Q2 Market Outlook — Coastal Region', campaign:'Market Insights', owner:'María Fernández', status:'wip' },
    { id:'CAL-008', date:'2026-05-20', time:'10:00', platform:'ig', title:'Client Story — Lead 003 Family Compound', campaign:'Testimonials', owner:'Jennifer Walsh', status:'pending' },
    { id:'CAL-009', date:'2026-05-21', time:'09:00', platform:'fb', title:'New to the Market: The Palms — Unit 33', campaign:'Listing Launch', owner:'Roberto Méndez', status:'scheduled' },
    { id:'CAL-010', date:'2026-05-22', time:'12:00', platform:'ig', title:'Pine Estate — Golf & Ocean Life', campaign:'Coastal Living', owner:'Carlos Rodríguez', status:'approved' },
  ],

  approvals: [
    { id:'APV-001', title:'Stone Ridge Residence — Price Drop Alert', platform:'ig', campaign:'Listing Launch', previewText:'Price reduced! Stone Ridge Residence now at $3,820,000. This is the one you have been waiting for.', status:'pending', lastUpdate:'May 14 · 11:30', note:'Needs legal to confirm price before posting.', owner:'Jennifer Walsh' },
    { id:'APV-002', title:'Open House This Weekend — Join Us!', platform:'fb', campaign:'Open House', previewText:'Join us Saturday at the Ridge Estate, 10am–1pm. Light refreshments. Private tours available.', status:'approved', lastUpdate:'May 14 · 09:15', note:'Approved by client. Ready to publish.', owner:'Carlos Rodríguez' },
    { id:'APV-003', title:'New Listing: Reserve Point Land', platform:'li', campaign:'Listing Launch', previewText:'755 acres of prime coastal land now available for acquisition. Development and resort potential.', status:'wip', lastUpdate:'May 13 · 16:00', note:'Draft copy pending final pricing confirmation.', owner:'María Fernández' },
    { id:'APV-004', title:'Coastal Living Reel — Bay Heights Sunset', platform:'ig', campaign:'Coastal Living', previewText:'Golden hour at Bay Heights. This is why people fall in love with coastal living. (video reel)', status:'rejected', lastUpdate:'May 13 · 14:20', note:'Client requested different angle — needs reshoot.', owner:'Jennifer Walsh' },
    { id:'APV-005', title:'Villa Azure — Walkthrough Video', platform:'ig', campaign:'Listing Launch', previewText:'Step inside Villa Azure. Ocean views, custom pool, designer interiors. DM to schedule.', status:'approved', lastUpdate:'May 12 · 10:00', note:'Approved. Schedule for May 18.', owner:'Carlos Rodríguez' },
    { id:'APV-006', title:'Q2 Market Outlook — Coastal Region', platform:'li', campaign:'Market Insights', previewText:'Our Q2 outlook shows continued demand growth in Cape Vista and Bay Heights. Full report inside.', status:'wip', lastUpdate:'May 12 · 08:00', note:'Data visualization still in progress.', owner:'María Fernández' },
    { id:'APV-007', title:'Client Story — Lead 003 Family Compound', platform:'ig', campaign:'Testimonials', previewText:'"This is more than a home — it is our family legacy." — Mock Client, May 2026.', status:'pending', lastUpdate:'May 11 · 17:30', note:'Waiting for client photo release sign-off.', owner:'Jennifer Walsh' },
    { id:'APV-008', title:'Pine Estate Golf & Ocean Life', platform:'ig', campaign:'Coastal Living', previewText:'Golf course views, tropical gardens, smart home tech — Pine Estate has it all.', status:'approved', lastUpdate:'May 10 · 09:00', note:'Approved. Schedule for May 22.', owner:'Carlos Rodríguez' },
  ],

  insights: {
    totalReach: 241000,
    totalEngagement: '5.2%',
    followerGrowth: '+454 this month',
    bestPlatform: 'Instagram',
    bestPost: 'Open House — Ridge Estate',
    pendingApprovals: 2,
    rejectedPosts: 1,
    wipPosts: 3,
    approvedPosts: 8,
    byPlatform: [
      { platform:'Instagram', color:'#E1306C', reach:142000, engagement:'6.1%', followers:18420, growth:'+312', posts:7, bestPost:'Open House — Ridge Estate' },
      { platform:'Facebook',  color:'#1877F2', reach:88000,  engagement:'3.4%', followers:9810,  growth:'+88',  posts:5, bestPost:'Client Story — Lead 006' },
      { platform:'LinkedIn',  color:'#0A66C2', reach:31000,  engagement:'4.3%', followers:4230,  growth:'+54',  posts:3, bestPost:'Q1 Coastal Market Insights' },
    ],
    campaignBreakdown: [
      { campaign:'Listing Launch',  posts:4, reach:89000, engagement:'7.8%', status:'active' },
      { campaign:'Open House',      posts:2, reach:51000, engagement:'6.2%', status:'active' },
      { campaign:'Buyer Education', posts:2, reach:28000, engagement:'3.4%', status:'active' },
      { campaign:'Market Insights', posts:3, reach:38000, engagement:'4.8%', status:'active' },
      { campaign:'Testimonials',    posts:2, reach:42000, engagement:'5.9%', status:'active' },
      { campaign:'Coastal Living',  posts:3, reach:61000, engagement:'7.1%', status:'active' },
    ],
  },
};
