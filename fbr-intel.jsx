// FBR Platform — Market Intelligence: Inventory Intelligence · Owners & Exclusivities
// Depends on: fbr-data.js, fbr-ui.jsx

// ═══════════════════════════════════════════════════════════════════════════════
// INVENTORY INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════════

function InventoryIntelligence({ setScreen, setSelectedProp }) {
  const _DS = window.DS;
  const _Badge = window.Badge;
  const _Kpi = window.Kpi;
  const _Avatar = window.Avatar;
  const _PropCard = window.PropCard;

  const listings = window.FBR.listings;
  const [localListings, setLocalListings] = React.useState(listings);
  const [invTab, setInvTab] = React.useState('inventory');
  const [viewMode, setViewMode] = React.useState('table'); // 'table' | 'grid'
  const [filterType, setFilterType] = React.useState('All');
  const [filterZone, setFilterZone] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('price');
  const [editListing, setEditListing] = React.useState(null);
  const [editData, setEditData] = React.useState({});
  const [editPanel, setEditPanel] = React.useState(false);

  const brokerList = ['Jennifer Walsh', 'Carlos Rodríguez', 'María Fernández', 'Roberto Méndez'];

  const totalValue    = localListings.reduce((a, l) => a + l.priceVal, 0);
  const avgPrice      = Math.round(totalValue / localListings.length);
  const medianPrice   = [...localListings].sort((a,b)=>a.priceVal-b.priceVal)[Math.floor(localListings.length/2)].priceVal;
  const stagnant      = localListings.filter(l => l.daysOnMarket >= 60).length;
  const types         = ['All', ...Array.from(new Set(localListings.map(l => l.type)))];
  const zones         = ['All', ...Array.from(new Set(localListings.map(l => l.zone)))];
  const brokerNames   = Array.from(new Set(localListings.map(l => l.agent)));

  const brokerCount = brokerNames.reduce((acc, name) => {
    acc[name] = localListings.filter(l => l.agent === name).length;
    return acc;
  }, {});

  let filtered = localListings
    .filter(l => filterType === 'All' || l.type === filterType)
    .filter(l => filterZone === 'All' || l.zone === filterZone);

  filtered = [...filtered].sort((a,b) => {
    if (sortBy === 'price') return b.priceVal - a.priceVal;
    if (sortBy === 'days') return b.daysOnMarket - a.daysOnMarket;
    if (sortBy === 'leads') return b.matchedLeads - a.matchedLeads;
    return 0;
  });

  function StatusChip({ days }) {
    if (days >= 90) return React.createElement(_Badge, { type:'danger', small:true }, `${days}d`);
    if (days >= 60) return React.createElement(_Badge, { type:'warm', small:true }, `${days}d`);
    if (days >= 30) return React.createElement(_Badge, { type:'neutral', small:true }, `${days}d`);
    return React.createElement(_Badge, { type:'active', small:true }, `${days}d`);
  }

  const inputStyle = { width:'100%', padding:'8px 10px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#fff', color:_DS.text, boxSizing:'border-box' };

  function fieldSection(label, input) {
    return React.createElement('div', { style:{ marginBottom:14 } },
      React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:5, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.08em' } }, label),
      input,
    );
  }

  function handleSave() {
    setLocalListings(prev => prev.map(l =>
      l.id === editListing.id
        ? { ...l, price: editData.price, priceVal: parseInt(editData.price.replace(/\D/g,'')||l.priceVal), status: editData.status, agent: editData.agent, description: editData.description }
        : l
    ));
    setEditPanel(false);
    setEditListing(null);
  }

  // Tab bar
  const tabBar = React.createElement('div', { style:{ display:'flex', background:_DS.surface, borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
    [
      { id:'inventory', label:'Inventory', icon:'🏠' },
      { id:'map', label:'Market Map', icon:'◎' },
      { id:'pricing', label:'Pricing Intelligence', icon:'◈' },
      { id:'owners', label:'Owners', icon:'👤' },
    ].map(tab =>
      React.createElement('button', { key:tab.id, onClick:()=>setInvTab(tab.id), style:{
        padding:'11px 18px', border:'none',
        borderBottom: invTab===tab.id ? `2px solid ${_DS.gold}` : '2px solid transparent',
        background:'transparent', cursor:'pointer', fontSize:13,
        fontWeight: invTab===tab.id ? 700 : 400,
        color: invTab===tab.id ? _DS.gold : _DS.text3,
        fontFamily:'DM Sans,sans-serif', display:'flex', alignItems:'center', gap:6,
      } },
        React.createElement('span', null, tab.icon), tab.label
      )
    )
  );

  // KPI row
  const kpiRow = React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12 } },
    React.createElement(_Kpi, { label:'Total Listings', value:localListings.length, sub:'Active portfolio', icon:'🏠' }),
    React.createElement(_Kpi, { label:'Total Value', value:`$${(totalValue/1e6).toFixed(1)}M`, sub:'Portfolio valuation', icon:'◈', color:_DS.gold }),
    React.createElement(_Kpi, { label:'Avg Listing Price', value:`$${(avgPrice/1e6).toFixed(1)}M`, sub:'Mean value', color:_DS.navyMid }),
    React.createElement(_Kpi, { label:'Median Price', value:`$${(medianPrice/1e6).toFixed(1)}M`, sub:'Mid-market value', color:_DS.navyMid }),
    React.createElement(_Kpi, { label:'Stagnant (60d+)', value:stagnant, sub:'Require attention', icon:'⚠', color:stagnant>0?'#B82929':_DS.success, alert:stagnant>0, onClick:()=>setSortBy('days') }),
    React.createElement(_Kpi, { label:'Avg Days on Market', value:`${Math.round(localListings.reduce((a,l)=>a+l.daysOnMarket,0)/localListings.length)}d`, sub:'Portfolio average' }),
  );

  // Filters bar
  const filtersBar = React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'12px 16px', display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' } },
    React.createElement('div', { style:{ display:'flex', gap:4 } },
      types.map(t =>
        React.createElement('button', { key:t, onClick:()=>setFilterType(t), style:{
          padding:'4px 12px', borderRadius:4, border:`1px solid ${filterType===t?_DS.gold:_DS.border}`,
          background: filterType===t?_DS.goldDim:'transparent', cursor:'pointer',
          fontSize:11, fontWeight:filterType===t?700:400, color:filterType===t?_DS.gold:_DS.text2, fontFamily:'DM Sans,sans-serif'
        } }, t),
      ),
    ),
    React.createElement('div', { style:{ width:1, height:20, background:_DS.border } }),
    React.createElement('select', {
      value:filterZone, onChange:e=>setFilterZone(e.target.value),
      style:{ padding:'4px 10px', border:`1px solid ${_DS.border}`, borderRadius:4, fontSize:11, fontFamily:'DM Sans,sans-serif', background:'transparent', color:_DS.text, outline:'none', cursor:'pointer' }
    },
      zones.map(z => React.createElement('option', { key:z, value:z }, z)),
    ),
    React.createElement('div', { style:{ marginLeft:'auto', display:'flex', gap:4, alignItems:'center' } },
      React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginRight:4 } }, 'Sort:'),
      [['price','Price'],['days','Days on Market'],['leads','Matched Leads']].map(([v,l]) =>
        React.createElement('button', { key:v, onClick:()=>setSortBy(v), style:{
          padding:'4px 10px', borderRadius:4, border:`1px solid ${sortBy===v?_DS.navyMid:_DS.border}`,
          background: sortBy===v?_DS.navyMid:'transparent', cursor:'pointer',
          fontSize:11, color:sortBy===v?'#fff':_DS.text2, fontFamily:'DM Sans,sans-serif'
        } }, l),
      ),
      React.createElement('div', { style:{ width:1, height:20, background:_DS.border, marginLeft:4 } }),
      [['table','≡'],['grid','⊞']].map(([v,l]) =>
        React.createElement('button', { key:v, onClick:()=>setViewMode(v), style:{
          padding:'4px 10px', borderRadius:4, border:`1px solid ${viewMode===v?_DS.gold:_DS.border}`,
          background: viewMode===v?_DS.goldDim:'transparent', cursor:'pointer',
          fontSize:14, color:viewMode===v?_DS.gold:_DS.text2,
        } }, l),
      ),
    ),
  );

  // Table or grid
  const tableOrGrid = viewMode === 'table' ?
    React.createElement('div', { style:{ display:'flex', gap:0, background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
      // Table section
      React.createElement('div', { style:{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' } },
        // Header
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 1fr 0.7fr 40px', padding:'10px 20px', background:_DS.bg, borderBottom:`1px solid ${_DS.border}`, fontSize:10, fontWeight:700, color:_DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
          ['Property','Zone','Type','Price','$/sqft','Days','Broker','Leads','Edit'].map(h => React.createElement('span', {key:h}, h)),
        ),
        React.createElement('div', { style:{ overflowY:'auto' } },
          filtered.map(l =>
            React.createElement('div', { key:l.id, onClick:()=>{ if(setSelectedProp) setSelectedProp(l); if(setScreen) setScreen('propdetail'); },
              style:{ display:'grid', gridTemplateColumns:'2.5fr 1fr 0.8fr 1fr 0.8fr 0.6fr 1fr 0.7fr 40px', padding:'12px 20px', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center', cursor:'pointer', transition:'background 0.1s' },
              onMouseEnter: e => e.currentTarget.style.background='rgba(192,155,87,0.03)',
              onMouseLeave: e => e.currentTarget.style.background='transparent',
            },
              React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
                React.createElement('img', { src:l.photo1, style:{ width:44, height:34, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, l.title),
                  React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, l.neighborhood),
                ),
              ),
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, l.zone.split('–')[0].trim()),
              React.createElement('span', null, React.createElement(_Badge, { type: l.type==='Land'?'neutral':l.type==='Condo'?'navy':'gold', small:true }, l.type)),
              React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, l.price),
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, l.pricePerSqft ? `$${l.pricePerSqft.toLocaleString()}` : '—'),
              React.createElement('span', null, React.createElement(StatusChip, { days: l.daysOnMarket })),
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, l.agent.split(' ')[0]),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
                React.createElement('span', { style:{ width:20, height:20, borderRadius:'50%', background:_DS.goldDim, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, l.matchedLeads),
              ),
              React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
                React.createElement('button', { onClick:e=>{ e.stopPropagation(); setEditListing(l); setEditData({ price:l.price, priceVal:l.priceVal, status:l.status||'Active', agent:l.agent, description:l.description||'' }); setEditPanel(true); }, style:{ background:'none', border:`1px solid ${_DS.border}`, borderRadius:4, padding:'3px 6px', cursor:'pointer', fontSize:12, color:_DS.text3 } }, '✏'),
              ),
            )
          ),
        ),
      ),
      // Edit panel (conditional)
      editPanel && editListing &&
        React.createElement('div', { style:{ width:320, borderLeft:`1px solid ${_DS.border}`, background:_DS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 } },
          // Header
          React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 } },
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Edit Listing'),
            React.createElement('button', { onClick:()=>{ setEditPanel(false); setEditListing(null); }, style:{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:_DS.text3 } }, '×'),
          ),
          // Photo + title
          React.createElement('div', null,
            React.createElement('img', { src:editListing.photo1, style:{ width:'100%', height:120, objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
            React.createElement('div', { style:{ padding:'10px 16px', borderBottom:`1px solid ${_DS.border}` } },
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, editListing.title),
              React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${editListing.id} · ${editListing.neighborhood}`),
            ),
          ),
          // Form fields
          React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
            fieldSection('List Price',
              React.createElement('input', { value:editData.price, onChange:e=>setEditData(p=>({...p,price:e.target.value})), style:inputStyle }),
            ),
            fieldSection('Status',
              React.createElement('select', { value:editData.status, onChange:e=>setEditData(p=>({...p,status:e.target.value})), style:inputStyle },
                ['Active','Under Contract','Sold','Off Market'].map(s => React.createElement('option',{key:s,value:s},s))
              ),
            ),
            fieldSection('Assigned Broker',
              React.createElement('select', { value:editData.agent, onChange:e=>setEditData(p=>({...p,agent:e.target.value})), style:inputStyle },
                brokerList.map(b => React.createElement('option',{key:b,value:b},b))
              ),
            ),
            fieldSection('Notes / Description',
              React.createElement('textarea', { value:editData.description, onChange:e=>setEditData(p=>({...p,description:e.target.value})), rows:3, style:{...inputStyle, resize:'vertical', height:'auto'} }),
            ),
          ),
          // Save / Cancel buttons
          React.createElement('div', { style:{ padding:'12px 16px', borderTop:`1px solid ${_DS.border}`, display:'flex', gap:8, flexShrink:0 } },
            React.createElement('button', { onClick:handleSave, style:{ flex:1, padding:'10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, 'Save Changes'),
            React.createElement('button', { onClick:()=>{ setEditPanel(false); setEditListing(null); }, style:{ padding:'10px 16px', background:'transparent', color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:13, fontFamily:'DM Sans,sans-serif' } }, 'Cancel'),
          ),
        ),
    )
  : React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 } },
    filtered.map(l =>
      React.createElement(_PropCard, { key:l.id, listing:l, compact:false, onClick:()=>{ if(setSelectedProp) setSelectedProp(l); if(setScreen) setScreen('propdetail'); } })
    ),
  );

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'calc(100vh - 104px)', overflow:'hidden', background:_DS.bg } },
    // Tab bar
    tabBar,
    // Content area
    React.createElement('div', { style:{ flex:1, overflow:'hidden' } },
      invTab === 'inventory' && React.createElement('div', { style:{ overflowY:'auto', height:'100%', padding:'20px 24px', display:'flex', flexDirection:'column', gap:20 } },
        kpiRow,
        filtersBar,
        tableOrGrid,
      ),
      invTab === 'map'      && React.createElement(MapTab, { listings:localListings, market:window.FBR.market }),
      invTab === 'pricing'  && React.createElement(PricingTab, { listings:localListings, market:window.FBR.market }),
      invTab === 'owners'   && React.createElement(OwnersExclusivities, { setScreen }),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAP TAB
// ═══════════════════════════════════════════════════════════════════════════════

function MapTab({ listings, market }) {
  const _DS = window.DS;
  const mapId = 'inv-map-tab-' + React.useId().replace(/:/g,'');

  React.useEffect(() => {
    var container = document.getElementById(mapId);
    if (!container || container._leafletMap) return;
    var map = L.map(container, { center:[10.42,-85.80], zoom:10, zoomControl:true });
    container._leafletMap = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; OpenStreetMap &copy; CARTO', maxZoom:19
    }).addTo(map);
    (listings || []).forEach(l => {
      if (!l.lat || !l.lng) return;
      var marker = L.circleMarker([l.lat, l.lng], {
        radius: 10, fillColor: '#C09B57', color: '#fff',
        weight: 2, opacity: 1, fillOpacity: 0.85,
      }).addTo(map);
      marker.bindPopup(`<div style="font-family:DM Sans,sans-serif;padding:8px"><b style="color:#0F2340">${l.title}</b><br/><span style="color:#9C948A;font-size:11px">${l.neighborhood}</span><br/><b style="color:#C09B57;font-size:14px">${l.price}</b></div>`);
    });
    // Zone heat circles from market data
    ((market && market.zones) || []).forEach(z => {
      L.circle([z.lat, z.lng], {
        radius: 3500, fillColor: z.hotScore > 80 ? '#C09B57' : z.hotScore > 60 ? '#B87A1A' : '#163061',
        fillOpacity: 0.08, color: z.hotScore > 80 ? '#C09B57' : '#163061', weight: 1, opacity: 0.3,
      }).addTo(map);
      L.marker([z.lat, z.lng], {
        icon: L.divIcon({ className:'', html:`<div style="background:rgba(15,35,64,0.85);color:#C09B57;font-family:DM Sans,sans-serif;font-size:10px;font-weight:700;padding:3px 7px;border-radius:4px;white-space:nowrap;border:1px solid rgba(192,155,87,0.3)">${z.name}</div>`, iconAnchor:[40,10] })
      }).addTo(map);
    });
    return () => { map.remove(); container._leafletMap = null; };
  }, [mapId]);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%' } },
    React.createElement('div', { id:mapId, style:{ flex:1 } }),
    // legend bar
    React.createElement('div', { style:{ padding:'8px 20px', background:_DS.surface, borderTop:`1px solid ${_DS.border}`, display:'flex', gap:16, alignItems:'center', flexShrink:0 } },
      React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Zones:'),
      [['Hot (80+)','#C09B57'],['Warm (60-80)','#B87A1A'],['Cool (<60)','#163061']].map(([l,c]) =>
        React.createElement('div', { key:l, style:{ display:'flex', alignItems:'center', gap:5 } },
          React.createElement('div', { style:{ width:10, height:10, borderRadius:'50%', background:c, opacity:0.7 } }),
          React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, l),
        )
      ),
      React.createElement('span', { style:{ marginLeft:'auto', fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${(listings||[]).length} FBR listings shown`),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRICING TAB
// ═══════════════════════════════════════════════════════════════════════════════

function PricingTab({ listings, market }) {
  const _DS = window.DS;
  const zones = (market && market.zones) || [];
  const allListings = listings || [];

  return React.createElement('div', { style:{ overflowY:'auto', height:'100%', padding:'24px' } },
    // Zone price metrics
    React.createElement('div', { style:{ marginBottom:24 } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Price Intelligence by Zone'),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 } },
        zones.map(z => {
          const zoneListings = allListings.filter(l => l.zone && l.zone.toLowerCase().includes(z.name.toLowerCase().split(' ')[0].toLowerCase()));
          const avgPsf = zoneListings.filter(l=>l.pricePerSqft).reduce((a,l)=>a+l.pricePerSqft,0) / Math.max(zoneListings.filter(l=>l.pricePerSqft).length, 1);
          return React.createElement('div', { key:z.name, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px 16px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, z.name),
            React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 } },
              [
                ['Avg Price', `$${(z.avgPrice/1e6).toFixed(1)}M`],
                ['Price Change', z.priceChg],
                ['Absorption', z.absorption+'%'],
                ['Heat Score', z.hotScore+'/100'],
              ].map(([l,v]) =>
                React.createElement('div', { key:l, style:{ background:_DS.bg, borderRadius:5, padding:'8px 10px' } },
                  React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, l),
                  React.createElement('div', { style:{ fontSize:14, fontWeight:700, color: v.startsWith('-')?'#B82929':v.startsWith('+')?_DS.success:_DS.gold, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, v),
                )
              )
            ),
          );
        })
      ),
    ),
    // Price distribution table
    React.createElement('div', null,
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'FBR Listing Price Distribution'),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'10px 16px', background:_DS.bg, borderBottom:`1px solid ${_DS.border}`, fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } },
          ['Property','Zone','List Price','$/sqft','Days on Mkt'].map(h => React.createElement('span',{key:h},h))
        ),
        [...allListings].sort((a,b)=>b.priceVal-a.priceVal).map(l =>
          React.createElement('div', { key:l.id, style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'11px 16px', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center', fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontWeight:600, color:_DS.text } }, l.title.length>32?l.title.slice(0,32)+'…':l.title),
              React.createElement('div', { style:{ fontSize:10, color:_DS.text3, marginTop:1 } }, l.type),
            ),
            React.createElement('span', { style:{ color:_DS.text2 } }, l.zone.split('–')[0].trim()),
            React.createElement('span', { style:{ fontWeight:700, color:_DS.gold } }, l.price),
            React.createElement('span', { style:{ color:_DS.text2 } }, l.pricePerSqft ? `$${l.pricePerSqft.toLocaleString()}` : '—'),
            React.createElement('span', { style:{ color: l.daysOnMarket>=60?'#B82929':l.daysOnMarket>=30?'#B87A1A':_DS.text2 } }, l.daysOnMarket+'d'),
          )
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SALES CLOSINGS TAB
// ═══════════════════════════════════════════════════════════════════════════════

function SalesClosings({ setScreen }) {
  const _DS = window.DS;
  const pipeline = window.FBR.pipeline || { deals:[], stages:[] };
  const deals = pipeline.deals || [];

  // Last-mile stages (last 3 stages)
  const allStages = pipeline.stages || [];
  const lastMileStages = allStages.slice(-4, -1); // e.g. Letter of Intent, Due Diligence, Closing
  const closedStage = allStages[allStages.length - 1]; // Closed Won

  const lastMileDeals = deals.filter(d => lastMileStages.includes(d.stage));
  const closedDeals = deals.filter(d => d.stage === closedStage);
  const totalClosedVol = closedDeals.reduce((a,d)=>a+d.value,0);
  const totalPendingVol = lastMileDeals.reduce((a,d)=>a+d.value,0);

  const [selDeal, setSelDeal] = React.useState(lastMileDeals[0] || closedDeals[0] || null);

  const CLOSING_STEPS = ['Offer Accepted', 'Attorney Review', 'Due Diligence', 'Title Search', 'SINAC/Registry Check', 'Mortgage/Financing', 'Signing — Purchase Agreement', 'Transfer at Notary', 'Keys Delivered'];

  return React.createElement('div', { style:{ display:'flex', height:'100%', overflow:'hidden' } },
    // Left: deals list
    React.createElement('div', { style:{ width:320, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, flexShrink:0 } },
      // KPI bar
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'Last Mile Pipeline'),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 } },
          [
            ['In Closing', lastMileDeals.length, _DS.gold],
            ['Closed', closedDeals.length, _DS.success],
            ['Pending Vol.', `$${(totalPendingVol/1e6).toFixed(1)}M`, _DS.navyMid],
            ['Closed Vol.', `$${(totalClosedVol/1e6).toFixed(1)}M`, _DS.success],
          ].map(([l,v,c]) =>
            React.createElement('div', { key:l, style:{ background:_DS.bg, borderRadius:6, padding:'8px 10px' } },
              React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, l),
              React.createElement('div', { style:{ fontSize:16, fontWeight:800, color:c, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, v),
            )
          )
        )
      ),
      // Deals list
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        [...lastMileDeals, ...closedDeals].map(d =>
          React.createElement('div', { key:d.id, onClick:()=>setSelDeal(d),
            style:{ padding:'12px 14px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
              borderLeft:`3px solid ${selDeal?.id===d.id?_DS.gold:'transparent'}`,
              background: selDeal?.id===d.id?'rgba(192,155,87,0.05)':'transparent' }
          },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:4 } },
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, d.lead),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'2px 6px', borderRadius:4,
                background: d.stage===closedStage?'#E3F2EA':'rgba(192,155,87,0.12)',
                color: d.stage===closedStage?_DS.success:_DS.gold,
                fontFamily:'DM Sans,sans-serif' } }, d.stage===closedStage?'✓ Closed':d.stage)
            ),
            React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:3 } }, d.prop),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
              React.createElement('span', { style:{ fontSize:13, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(d.value/1e6).toFixed(2)}M`),
              React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, d.agent.split(' ')[0]),
            )
          )
        ),
      ),
    ),
    // Right: deal detail
    selDeal ? React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      // Header
      React.createElement('div', { style:{ background:_DS.navy, padding:'16px 24px', flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' } },
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.gold, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, selDeal.stage),
            React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, selDeal.lead),
            React.createElement('div', { style:{ fontSize:13, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, selDeal.prop),
          ),
          React.createElement('div', { style:{ textAlign:'right' } },
            React.createElement('div', { style:{ fontSize:24, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(selDeal.value/1e6).toFixed(2)}M`),
            React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Transaction Value'),
          ),
        ),
        React.createElement('div', { style:{ display:'flex', gap:16, marginTop:12 } },
          [['Agent',selDeal.agent],['Days Active',selDeal.days+'d'],['Est. Commission','$'+Math.round(selDeal.value*0.035/1000)+'K']].map(([k,v]) =>
            React.createElement('div', { key:k, style:{ background:'rgba(255,255,255,0.08)', borderRadius:6, padding:'8px 12px', flex:1 } },
              React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif' } }, k),
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', marginTop:3 } }, v),
            )
          )
        ),
      ),
      // Closing checklist + details
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },
        // Closing checklist
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Closing Checklist'),
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
            CLOSING_STEPS.map((step, i) => {
              const stageIdx = lastMileStages.indexOf(selDeal.stage);
              const stageProgress = stageIdx >= 0 ? stageIdx : (selDeal.stage === closedStage ? lastMileStages.length : 0);
              const stepDone = i < Math.round(stageProgress / Math.max(lastMileStages.length, 1) * CLOSING_STEPS.length) + 1;
              const stepActive = !stepDone && i === Math.round(stageProgress / Math.max(lastMileStages.length, 1) * CLOSING_STEPS.length) + 1;
              return React.createElement('div', { key:step, style:{ display:'flex', gap:10, padding:'10px 14px', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center' } },
                React.createElement('div', { style:{ width:20, height:20, borderRadius:'50%', flexShrink:0, background: stepDone?_DS.success:stepActive?_DS.gold:_DS.borderLt, display:'flex', alignItems:'center', justifyContent:'center', border: stepActive?`2px solid ${_DS.gold}`:'none' } },
                  stepDone && React.createElement('span', { style:{ color:'#fff', fontSize:10, fontWeight:700 } }, '✓')
                ),
                React.createElement('span', { style:{ fontSize:12, fontFamily:'DM Sans,sans-serif', color: stepDone?_DS.text:stepActive?_DS.text:_DS.text3, fontWeight: stepActive||stepDone ? 600 : 400 } }, step),
              );
            })
          ),
        ),
        // Transaction details
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Transaction Details'),
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px 16px' } },
            [
              ['Property', selDeal.prop],
              ['Buyer', selDeal.lead],
              ['Listing Agent', selDeal.agent],
              ['Stage', selDeal.stage],
              ['Days Active', selDeal.days+'d'],
              ['Transaction Value', `$${(selDeal.value/1e6).toFixed(2)}M`],
              ['Est. Commission (3.5%)', `$${Math.round(selDeal.value*0.035/1000)}K`],
              ['Next Action', selDeal.next || 'Pending'],
            ].map(([k,v]) =>
              React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${_DS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
                React.createElement('span', { style:{ color:_DS.text3 } }, k),
                React.createElement('span', { style:{ color:_DS.text, fontWeight:600, textAlign:'right', maxWidth:'55%' } }, v),
              )
            ),
          ),
          React.createElement('div', { style:{ marginTop:12, display:'flex', flexDirection:'column', gap:8 } },
            React.createElement('button', { style:{ padding:'10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '📋 Generate Closing Sheet'),
            React.createElement('button', { style:{ padding:'10px', background:'transparent', color:_DS.text, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '📨 Notify Parties'),
          ),
        ),
      ),
    ) : React.createElement('div', { style:{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:_DS.text3, fontSize:13, fontFamily:'DM Sans,sans-serif' } }, 'Select a deal to view closing details'),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OWNERS & EXCLUSIVITIES
// ═══════════════════════════════════════════════════════════════════════════════

function OwnersExclusivities({ setScreen }) {
  const _DS = window.DS;
  const _Badge = window.Badge;
  const _Avatar = window.Avatar;
  const _Kpi = window.Kpi;

  const owners = window.FBR.owners;
  const listings = window.FBR.listings;
  const [selOwner, setSelOwner] = React.useState(owners[0]);
  const [filter, setFilter] = React.useState('all'); // 'all' | 'expiring' | 'no-contact' | 'very-high'

  const withExpiring = owners.filter(o => o.alert === 'expiring' || o.alert === 'expiring-urgent').length;
  const noContact    = owners.filter(o => o.alert === 'no-contact').length;
  const veryHigh     = owners.filter(o => o.strategicValue === 'very-high').length;

  const filtered = owners.filter(o => {
    if (filter === 'expiring') return o.alert === 'expiring' || o.alert === 'expiring-urgent';
    if (filter === 'no-contact') return o.alert === 'no-contact';
    if (filter === 'very-high') return o.strategicValue === 'very-high';
    return true;
  });

  const exclusivityStyle = {
    active:    { color:'#2B6E4A', bg:'#E3F2EA', label:'Active' },
    expiring:  { color:'#B87A1A', bg:'#FDF0DC', label:'Expiring' },
    expired:   { color:'#B82929', bg:'#FDE8E8', label:'Expired' },
  };

  const stratValueStyle = {
    'very-high': { color:_DS.gold, bg:_DS.goldDim, label:'Very High' },
    'high':      { color:_DS.navyMid, bg:'rgba(22,48,97,0.08)', label:'High' },
    'medium':    { color:_DS.text2, bg:'#F0EDE8', label:'Medium' },
  };

  function daysUntil(dateStr) {
    const target = new Date(dateStr);
    const today = new Date('2026-06-08');
    return Math.round((target - today) / (1000 * 60 * 60 * 24));
  }

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'100%', overflow:'hidden' } },

    // ── LEFT: Owner list ───────────────────────────────────────────────────────
    React.createElement('div', { style:{ width:380, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },

      // KPI strip
      React.createElement('div', { style:{ background:_DS.navy, padding:'14px 18px', flexShrink:0 } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:0 } },
          [
            { label:'Total Owners', value:owners.length, color:'rgba(255,255,255,0.85)' },
            { label:'Expiring', value:withExpiring, color:withExpiring>0?'#FF8080':_DS.gold },
            { label:'No Contact', value:noContact, color:noContact>0?'#FF8080':'rgba(255,255,255,0.5)' },
            { label:'Strategic', value:veryHigh, color:_DS.gold },
          ].map((k, i) =>
            React.createElement('div', { key:i, style:{ textAlign:'center', borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'' } },
              React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif' } }, k.value),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:2 } }, k.label),
            )
          ),
        ),
      ),

      // Filters
      React.createElement('div', { style:{ display:'flex', gap:4, padding:'10px 12px', borderBottom:`1px solid ${_DS.borderLt}`, flexShrink:0, flexWrap:'wrap' } },
        [
          { id:'all', label:`All (${owners.length})` },
          { id:'expiring', label:`⚠ Expiring (${withExpiring})` },
          { id:'no-contact', label:`No Contact (${noContact})` },
          { id:'very-high', label:`Strategic (${veryHigh})` },
        ].map(f =>
          React.createElement('button', { key:f.id, onClick:()=>setFilter(f.id), style:{
            padding:'4px 10px', borderRadius:4, border:`1px solid ${filter===f.id?_DS.gold:_DS.border}`,
            background: filter===f.id?_DS.goldDim:'transparent', cursor:'pointer',
            fontSize:11, fontWeight:filter===f.id?700:400,
            color: filter===f.id?_DS.gold:_DS.text3, fontFamily:'DM Sans,sans-serif'
          } }, f.label),
        ),
      ),

      // Owner list
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        filtered.map(owner => {
          const exStyle = exclusivityStyle[owner.exclusivity] || exclusivityStyle.active;
          const svStyle = stratValueStyle[owner.strategicValue] || stratValueStyle.medium;
          const days = daysUntil(owner.exclusivityExpires);
          return React.createElement('div', { key:owner.id, onClick:()=>setSelOwner(owner),
            style:{
              padding:'14px 16px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
              background: selOwner?.id===owner.id ? 'rgba(192,155,87,0.06)' : 'transparent',
              borderLeft:`3px solid ${selOwner?.id===owner.id?_DS.gold: owner.alert==='expiring-urgent'?'#B82929': owner.alert?_DS.warn:'transparent'}`,
              transition:'background 0.15s',
            }
          },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:8 } },
              React.createElement(_Avatar, { initials:owner.avatar, color: owner.strategicValue==='very-high'?_DS.gold: owner.strategicValue==='high'?_DS.navyMid:_DS.text3, size:36 }),
              React.createElement('div', { style:{ flex:1, minWidth:0 } },
                React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center', marginBottom:2 } },
                  React.createElement('span', { style:{ fontSize:14 } }, owner.flag),
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, owner.name),
                ),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:4 } },
                  `${owner.properties.length} propert${owner.properties.length===1?'y':'ies'} · Broker: ${owner.broker.split(' ')[0]}`),
                React.createElement('div', { style:{ display:'flex', gap:4, flexWrap:'wrap' } },
                  React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:exStyle.color, background:exStyle.bg, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, exStyle.label),
                  React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:svStyle.color, background:svStyle.bg, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, svStyle.label),
                  days <= 30 && React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:'#B82929', background:'#FDE8E8', padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, `${days}d left`),
                ),
              ),
            ),
          );
        }),
      ),
    ),

    // ── RIGHT: Owner detail ────────────────────────────────────────────────────
    selOwner && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Header
      React.createElement('div', { style:{ background:_DS.navy, padding:'20px 24px', flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'flex-start' } },
          React.createElement(_Avatar, { initials:selOwner.avatar, color: selOwner.strategicValue==='very-high'?_DS.gold:_DS.navyMid, size:52 }),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:4 } },
              React.createElement('span', { style:{ fontSize:20 } }, selOwner.flag),
              React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, selOwner.name),
            ),
            React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif', marginBottom:8 } },
              `${selOwner.country} · ${selOwner.properties.length} propert${selOwner.properties.length===1?'y':'ies'} · Broker: ${selOwner.broker}`),
            React.createElement('div', { style:{ display:'flex', gap:8 } },
              (() => { const es = exclusivityStyle[selOwner.exclusivity] || exclusivityStyle.active;
                return React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:es.color, background:es.bg, padding:'3px 8px', borderRadius:4, fontFamily:'DM Sans,sans-serif' } }, `EXCLUSIVITY: ${es.label.toUpperCase()}`);
              })(),
              (() => { const sv = stratValueStyle[selOwner.strategicValue] || stratValueStyle.medium;
                return React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:sv.color, background:sv.bg, padding:'3px 8px', borderRadius:4, fontFamily:'DM Sans,sans-serif' } }, `STRATEGIC: ${sv.label.toUpperCase()}`);
              })(),
              selOwner.renewalOpportunity && React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:'#5DBF8A', background:'rgba(43,110,74,0.15)', padding:'3px 8px', borderRadius:4, fontFamily:'DM Sans,sans-serif' } }, 'RENEWAL OPPORTUNITY'),
            ),
          ),
        ),
      ),

      // Body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'24px' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 } },

          // Exclusivity details
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Exclusivity Agreement'),
            [
              { label:'Status', value: (exclusivityStyle[selOwner.exclusivity]||exclusivityStyle.active).label, highlight:true },
              { label:'Expires', value: selOwner.exclusivityExpires },
              { label:'Days Remaining', value: `${daysUntil(selOwner.exclusivityExpires)} days`, color: daysUntil(selOwner.exclusivityExpires)<=30?'#B82929':_DS.success },
              { label:'Renewal Opportunity', value: selOwner.renewalOpportunity ? 'Yes — recommend renewal' : 'No', color: selOwner.renewalOpportunity?_DS.success:_DS.text2 },
            ].map(({ label, value, color, highlight }) =>
              React.createElement('div', { key:label, style:{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
                React.createElement('span', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, label),
                React.createElement('span', { style:{ fontSize:12, fontWeight: highlight?700:500, color: color||_DS.text, fontFamily:'DM Sans,sans-serif' } }, value),
              )
            ),
          ),

          // Contact & relationship
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Relationship Status'),
            [
              { label:'Assigned Broker', value: selOwner.broker },
              { label:'Last Contact', value: selOwner.lastContact },
              { label:'Days Since Contact', value: `${daysUntil(selOwner.lastContact) < 0 ? Math.abs(daysUntil(selOwner.lastContact)) : 0} days ago` },
              { label:'Strategic Value', value: (stratValueStyle[selOwner.strategicValue]||stratValueStyle.medium).label },
            ].map(({ label, value }) =>
              React.createElement('div', { key:label, style:{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
                React.createElement('span', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, label),
                React.createElement('span', { style:{ fontSize:12, fontWeight:500, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, value),
              )
            ),
          ),
        ),

        // Linked properties
        React.createElement('div', { style:{ marginBottom:20 } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Properties Under Exclusivity'),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:12 } },
            selOwner.properties.map(propId => {
              const prop = listings.find(l => l.id === propId);
              if (!prop) return null;
              return React.createElement('div', { key:propId, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden', cursor:'pointer' },
                onClick:()=>{}
              },
                React.createElement('img', { src:prop.photo1, style:{ width:'100%', height:80, objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ padding:'10px 12px' } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, prop.title),
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
                    React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, prop.neighborhood),
                    React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, prop.price),
                  ),
                  React.createElement('div', { style:{ fontSize:10, color: prop.daysOnMarket>=60?'#B82929':_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:3 } }, `${prop.daysOnMarket} days on market`),
                ),
              );
            }),
          ),
        ),

        // Next action
        React.createElement('div', { style:{ background: selOwner.alert==='expiring-urgent'?'rgba(184,41,41,0.05)':'rgba(192,155,87,0.06)', border:`1px solid ${selOwner.alert==='expiring-urgent'?'rgba(184,41,41,0.15)':'rgba(192,155,87,0.2)'}`, borderRadius:8, padding:'14px 16px', marginBottom:16 } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', marginBottom:6 } }, '⚡ Next Action'),
          React.createElement('div', { style:{ fontSize:13, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 } }, selOwner.nextAction),
        ),

        // Actions
        React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
          React.createElement('button', { style:{ padding:'9px 18px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '📞 Schedule Call'),
          selOwner.renewalOpportunity && React.createElement('button', { style:{ padding:'9px 18px', background:_DS.goldDim, color:_DS.gold, border:`1px solid rgba(192,155,87,0.3)`, borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'DM Sans,sans-serif' } }, '✦ Initiate Renewal'),
          React.createElement('button', { style:{ padding:'9px 18px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '📊 Send Market Report'),
        ),
      ),
    ),
  );
}

Object.assign(window, { InventoryIntelligence, OwnersExclusivities, SalesClosings, MapTab, PricingTab });
