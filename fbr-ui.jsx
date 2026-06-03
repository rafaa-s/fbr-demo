// Realty Platform — Design System + AppShell
// Visual DNA: Navy #163061, Gold #C09B57, White base

const DS = {
  navy:    '#0F2340',
  navyMid: '#163061',
  gold:    '#C09B57',
  goldLt:  '#D4B57A',
  goldDim: 'rgba(192,155,87,0.15)',
  bg:      '#F5F2EC',
  surface: '#FFFFFF',
  border:  '#E4DDD0',
  borderLt:'#EDE8E0',
  text:    '#1A1814',
  text2:   '#5C5650',
  text3:   '#9C948A',
  success: '#2B6E4A',
  warn:    '#B87A1A',
  danger:  '#B82929',
  info:    '#163061',
  hot:     '#C0392B',
  warm:    '#D4881A',
  cold:    '#7A9EC0',
};

// ─── Shared Primitives ─────────────────────────────────────────────────────

function Badge({ type='neutral', children, small }) {
  const map = {
    hot:     { bg:'#FDE8E8', color:'#B82929' },
    warm:    { bg:'#FDF0DC', color:'#B87A1A' },
    cold:    { bg:'#E8EFF8', color:'#2A5F8F' },
    active:  { bg:'#E3F2EA', color:'#2B6E4A' },
    drop:    { bg:'#FDF0DC', color:'#B87A1A' },
    gold:    { bg:DS.goldDim, color:DS.gold },
    neutral: { bg:'#F0EDE8', color:DS.text2 },
    navy:    { bg:'rgba(15,35,64,0.08)', color:DS.navy },
    danger:  { bg:'#FDE8E8', color:DS.danger },
    success: { bg:'#E3F2EA', color:DS.success },
  };
  const s = map[type] || map.neutral;
  return React.createElement('span', {
    style: {
      display:'inline-flex', alignItems:'center', gap:4,
      background: s.bg, color: s.color,
      fontSize: small ? 10 : 11, fontWeight:600, letterSpacing:'0.04em',
      padding: small ? '2px 6px' : '3px 8px',
      borderRadius: 4, textTransform:'uppercase', whiteSpace:'nowrap',
      fontFamily: 'DM Sans, sans-serif',
    }
  }, children);
}

function TempDot({ temp }) {
  const colors = { hot:'#C0392B', warm:'#D4881A', cold:'#7A9EC0' };
  return React.createElement('span', {
    style: {
      display:'inline-block', width:8, height:8, borderRadius:'50%',
      background: colors[temp] || colors.cold, flexShrink:0,
    }
  });
}

function Avatar({ initials, color='#C09B57', size=32 }) {
  return React.createElement('div', {
    style: {
      width:size, height:size, borderRadius:'50%',
      background: color, color:'#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize: size * 0.35, fontWeight:700, flexShrink:0,
      fontFamily: 'DM Sans, sans-serif', letterSpacing:'0.02em',
    }
  }, initials);
}

function Kpi({ label, value, sub, icon, color, onClick }) {
  const [hov, setHov] = React.useState(false);
  return React.createElement('div', {
    onClick, onMouseEnter:()=>setHov(true), onMouseLeave:()=>setHov(false),
    style: {
      background: DS.surface, border:`1px solid ${hov ? DS.gold : DS.border}`,
      borderRadius:8, padding:'20px 24px', cursor: onClick ? 'pointer' : 'default',
      transition:'border-color 0.2s, box-shadow 0.2s',
      boxShadow: hov ? '0 4px 20px rgba(192,155,87,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
    }
  },
    React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12 } },
      React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, label),
      icon && React.createElement('span', { style:{ fontSize:18, opacity:0.7 } }, icon),
    ),
    React.createElement('div', { style:{ fontSize:28, fontWeight:700, color: color||DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, value),
    sub && React.createElement('div', { style:{ fontSize:12, color: DS.text3, marginTop:6, fontFamily:'DM Sans,sans-serif' } }, sub),
  );
}

function PropCard({ listing, onClick, compact }) {
  const [hov, setHov] = React.useState(false);
  const [imgErr, setImgErr] = React.useState(false);
  return React.createElement('div', {
    onClick, onMouseEnter:()=>setHov(true), onMouseLeave:()=>setHov(false),
    style: {
      background: DS.surface, borderRadius:8, overflow:'hidden',
      border:`1px solid ${hov ? DS.gold : DS.border}`,
      cursor:'pointer', transition:'all 0.2s',
      boxShadow: hov ? '0 8px 32px rgba(192,155,87,0.14)' : '0 1px 4px rgba(0,0,0,0.04)',
    }
  },
    React.createElement('div', { style:{ position:'relative', height: compact ? 140 : 180, overflow:'hidden', background:'#E8E4DC' } },
      !imgErr && React.createElement('img', {
        src: hov && listing.photo2 ? listing.photo2 : listing.photo1,
        onError:()=>setImgErr(true),
        style:{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' },
      }),
      imgErr && React.createElement('div', { style:{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:DS.text3, fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '📷 No image'),
      React.createElement('div', { style:{ position:'absolute', bottom:8, left:8, display:'flex', gap:4 } },
        listing.statusBadge && React.createElement(Badge, { type:'drop' }, '↓ Price Drop'),
        React.createElement(Badge, { type: listing.type==='Condo'?'navy':'gold', small:true }, listing.type),
      ),
      React.createElement('div', {
        style:{ position:'absolute', top:8, right:8, background:'rgba(15,35,64,0.85)', color:'#fff',
          fontSize:13, fontWeight:700, padding:'4px 10px', borderRadius:4, fontFamily:'DM Sans,sans-serif', backdropFilter:'blur(4px)' }
      }, listing.price),
    ),
    React.createElement('div', { style:{ padding: compact ? '12px 14px' : '16px' } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, lineHeight:1.3, marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, listing.title),
      React.createElement('div', { style:{ fontSize:11, color:DS.text3, marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, `📍 ${listing.neighborhood}`),
      !compact && React.createElement('div', { style:{ display:'flex', gap:12, fontSize:11, color:DS.text2, fontFamily:'DM Sans,sans-serif' } },
        listing.beds && React.createElement('span', null, `🛏 ${listing.beds} bd`),
        listing.baths && React.createElement('span', null, `🚿 ${listing.baths} ba`),
        listing.sqft && React.createElement('span', null, `📐 ${listing.sqft?.toLocaleString()} ft²`),
      ),
    ),
  );
}

function LeadRow({ lead, onClick, selected }) {
  return React.createElement('div', {
    onClick,
    style: {
      display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
      background: selected ? 'rgba(192,155,87,0.06)' : 'transparent',
      borderLeft: selected ? `3px solid ${DS.gold}` : '3px solid transparent',
      borderBottom:`1px solid ${DS.borderLt}`, cursor:'pointer',
      transition:'background 0.15s',
    }
  },
    React.createElement(TempDot, { temp: lead.temp }),
    React.createElement(Avatar, { initials:lead.avatar, color: lead.temp==='hot'?'#B82929': lead.temp==='warm'?'#B87A1A':'#2A5F8F', size:34 }),
    React.createElement('div', { style:{ flex:1, minWidth:0 } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } },
        `${lead.flag} ${lead.name}`),
      React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${lead.looking} · ${lead.budget}`),
    ),
    // Score badge — prominent
    React.createElement('div', {
      style:{
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        width:36, height:36, borderRadius:6, flexShrink:0,
        background: lead.score>=80 ? 'rgba(43,110,74,0.10)' : lead.score>=50 ? 'rgba(192,155,87,0.12)' : 'rgba(184,41,41,0.08)',
        border: `1px solid ${lead.score>=80?'rgba(43,110,74,0.25)':lead.score>=50?'rgba(192,155,87,0.3)':'rgba(184,41,41,0.2)'}`,
      }
    },
      React.createElement('span', { style:{ fontSize:14, fontWeight:800, lineHeight:1, fontFamily:'DM Sans,sans-serif', color: lead.score>=80?DS.success:lead.score>=50?DS.gold:'#B82929' } }, lead.score),
      React.createElement('span', { style:{ fontSize:7, fontWeight:600, color:DS.text3, letterSpacing:'0.06em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginTop:1 } }, 'score'),
    ),
    React.createElement('div', { style:{ textAlign:'right', flexShrink:0, marginLeft:6 } },
      lead.lastTouch === null
        ? React.createElement(Badge, { type:'danger', small:true }, '⚠ Untouched')
        : React.createElement('span', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, lead.status),
    ),
  );
}

// ─── AppShell ──────────────────────────────────────────────────────────────

const NAV = [
  { section:'Command Center', items:[
    { id:'dashboard', label:'Dashboard' },
  ]},
  { section:'CRM', items:[
    { id:'omnichannel', label:'Omnichannel' },
    { id:'activities',  label:'Activities' },
  ]},
  { section:'Marketing', items:[
    { id:'marketing', label:'Content Manager' },
    { id:'ads',       label:'Ads Intelligence' },
  ]},
  { section:'Commercial Ops', items:[
    { id:'inventory',  label:'Inventory' },
    { id:'sales',      label:'Sales' },
  ]},
  { section:'AI Assistant', items:[
    { id:'ai', label:'AI Assistant' },
  ]},
  { section:'System', items:[
    { id:'reports',  label:'Reports' },
    { id:'branding', label:'Branding & Settings' },
  ]},
];

// SVG Icon map — 20×20, stroke 1.5, round caps, gold active
const NAV_ICONS = {
  dashboard: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:2,y:2,width:7,height:8,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:11,y:2,width:7,height:4,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:11,y:8,width:7,height:10,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:2,y:12,width:7,height:6,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
  ),
  leads: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('circle',{cx:10,cy:7,r:3,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('path',{d:'M4 17c0-3.314 2.686-5 6-5s6 1.686 6 5',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('path',{d:'M13 13l2 2 3-3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
  ),
  pipeline: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:1,y:7,width:4,height:6,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:7,y:5,width:4,height:10,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:13,y:3,width:4,height:14,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:5,y1:10,x2:7,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:11,y1:10,x2:13,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  activities: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:3,y:4,width:14,height:13,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:7,y1:2,x2:7,y2:6,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:13,y1:2,x2:13,y2:6,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:3,y1:8.5,x2:17,y2:8.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('path',{d:'M7 12l1.5 1.5L12 11',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
  ),
  // omnichannel — multi-channel chat bubbles
  omnichannel: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M2 5a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0114 5v5a1.5 1.5 0 01-1.5 1.5H9L6 14v-2.5H3.5A1.5 1.5 0 012 10V5z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('path',{d:'M14 7.5h2.5A1.5 1.5 0 0118 9v4a1.5 1.5 0 01-1.5 1.5H15V16l-2.5-2.5h-1',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
  ),
  // sales — handshake / deal close
  sales: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:3,y:2.5,width:11,height:14,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:6,y1:7,x2:11,y2:7,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:6,y1:10,x2:11,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('path',{d:'M13.5 13.5l1.5 1.5 3-3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
  ),
  // marketing — megaphone
  marketing: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M3 8h2l9-4v12l-9-4H3a1 1 0 01-1-1v-2a1 1 0 011-1z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('path',{d:'M5 12v4',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('circle',{cx:17,cy:10,r:1.5,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
  ),
  // keep inbox alias for legacy
  inbox: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M2 5a1.5 1.5 0 011.5-1.5h9A1.5 1.5 0 0114 5v5a1.5 1.5 0 01-1.5 1.5H9L6 14v-2.5H3.5A1.5 1.5 0 012 10V5z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('path',{d:'M14 7.5h2.5A1.5 1.5 0 0118 9v4a1.5 1.5 0 01-1.5 1.5H15V16l-2.5-2.5h-1',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
  ),
  ads: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('circle',{cx:10,cy:10,r:8,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('circle',{cx:10,cy:10,r:4.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('circle',{cx:10,cy:10,r:1.5,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('line',{x1:10,y1:2,x2:10,y2:5.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  inventory: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M2 9L10 3l8 6',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
    React.createElement('path',{d:'M4 8v8.5a.5.5 0 00.5.5h4V13h3v4h4a.5.5 0 00.5-.5V8',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
  ),
  map: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M2 5l5-2 6 3 5-2v12l-5 2-6-3-5 2V5z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('line',{x1:7,y1:3,x2:7,y2:15,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1,strokeDasharray:'2 1.5'}),
    React.createElement('line',{x1:13,y1:6,x2:13,y2:18,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1,strokeDasharray:'2 1.5'}),
    React.createElement('circle',{cx:9.5,cy:9,r:1.5,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
  ),
  'leads-map': (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M2 5l5-2 6 3 5-2v12l-5 2-6-3-5 2V5z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('circle',{cx:7,cy:8,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('circle',{cx:11,cy:11,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('circle',{cx:14,cy:8.5,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('circle',{cx:7,cy:8,r:3,stroke:active?DS.gold:'rgba(255,255,255,0.25)',strokeWidth:1}),
  ),
  offers: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:3,y:2.5,width:11,height:14,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:6,y1:7,x2:11,y2:7,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:6,y1:10,x2:11,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('path',{d:'M13.5 13.5l1.5 1.5 3-3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
  ),
  market: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('line',{x1:3,y1:17,x2:17,y2:17,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:3,y1:17,x2:3,y2:4,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('rect',{x:5,y:11,width:3,height:6,rx:1,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:9.5,y:8,width:3,height:9,rx:1,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('rect',{x:14,y:5,width:3,height:12,rx:1,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
  ),
  supdem: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M5 14l-3 3M5 14H2M5 14v3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
    React.createElement('path',{d:'M15 6l3-3M15 6h3M15 6V3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round'}),
    React.createElement('path',{d:'M4 13.5C6 12 8 8 10 8s4 4 6 4',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  pricing: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('path',{d:'M3 3h7l7 7-7 7-7-7V3z',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round'}),
    React.createElement('circle',{cx:7.5,cy:7.5,r:1.5,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('path',{d:'M14 14l3 3',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  recommendations: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('polygon',{points:'10,2 12.5,7.5 18,8.2 14,12 15.3,18 10,15 4.7,18 6,12 2,8.2 7.5,7.5',stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinejoin:'round',fill:'none'}),
  ),
  ai: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:3,y:5,width:14,height:10,rx:2,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('circle',{cx:7,cy:10,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('circle',{cx:10,cy:10,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('circle',{cx:13,cy:10,r:1.2,fill:active?DS.gold:'rgba(255,255,255,0.55)'}),
    React.createElement('line',{x1:7,y1:15,x2:7,y2:18,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:13,y1:15,x2:13,y2:18,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:7,y1:18,x2:13,y2:18,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  reports: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('rect',{x:4,y:2,width:12,height:16,rx:1.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:7,y1:7,x2:13,y2:7,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:7,y1:10,x2:13,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:7,y1:13,x2:10,y2:13,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
  branding: (active) => React.createElement('svg',{width:18,height:18,viewBox:'0 0 20 20',fill:'none'},
    React.createElement('circle',{cx:10,cy:10,r:7.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('circle',{cx:10,cy:10,r:2.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5}),
    React.createElement('line',{x1:10,y1:2.5,x2:10,y2:7.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:10,y1:12.5,x2:10,y2:17.5,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:2.5,y1:10,x2:7.5,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
    React.createElement('line',{x1:12.5,y1:10,x2:17.5,y2:10,stroke:active?DS.gold:'rgba(255,255,255,0.55)',strokeWidth:1.5,strokeLinecap:'round'}),
  ),
};

function Sidebar({ active, setScreen, collapsed, setCollapsed }) {
  return React.createElement('aside', {
    style: {
      width: collapsed ? 60 : 232, minWidth: collapsed ? 60 : 232,
      background: DS.navy, display:'flex', flexDirection:'column',
      height:'100vh', position:'sticky', top:0, transition:'width 0.2s',
      boxShadow:'2px 0 12px rgba(0,0,0,0.15)', zIndex:100, overflow:'hidden',
    }
  },
    // Logo area
    React.createElement('div', {
      style:{ padding: collapsed?'16px 0':'16px 18px', borderBottom:`1px solid rgba(255,255,255,0.08)`,
        display:'flex', alignItems:'center', justifyContent: collapsed?'center':'flex-start', minHeight:64 }
    },
      collapsed
        ? React.createElement('div', { style:{ width:32, height:32, background:DS.gold, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement('span', { style:{ fontSize:16, fontWeight:900, color:DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'F')
          )
        : React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
            React.createElement('div', { style:{ width:32, height:32, background:DS.gold, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
              React.createElement('span', { style:{ fontSize:14, fontWeight:900, color:DS.navy, fontFamily:'DM Sans,sans-serif', letterSpacing:'-0.5px' } }, 'AR'),
            ),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', letterSpacing:'0.02em', lineHeight:1 } }, 'Acme Realty'),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.45)', fontFamily:'DM Sans,sans-serif', marginTop:3, letterSpacing:'0.08em', textTransform:'uppercase' } }, 'Mock CRM'),
            ),
          ),
    ),
    // Nav
    React.createElement('nav', { style:{ flex:1, overflowY:'auto', padding:'8px 0', scrollbarWidth:'none' } },
      NAV.map(group =>
        React.createElement('div', { key:group.section, style:{ marginBottom:4 } },
          !collapsed && React.createElement('div', {
            style:{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:'0.12em',
              textTransform:'uppercase', padding:'12px 20px 4px', fontFamily:'DM Sans,sans-serif' }
          }, group.section),
          group.items.map(item => {
            const isActive = active === item.id;
            const iconFn = NAV_ICONS[item.id];
            return React.createElement('div', {
              key:item.id,
              onClick:()=>setScreen(item.id),
              title: collapsed ? item.label : '',
              style:{
                display:'flex', alignItems:'center', gap:10,
                padding: collapsed?'10px 0':'9px 20px',
                justifyContent: collapsed?'center':'flex-start',
                cursor:'pointer', position:'relative',
                background: isActive ? 'rgba(192,155,87,0.15)' : 'transparent',
                borderLeft: isActive ? `3px solid ${DS.gold}` : '3px solid transparent',
                transition:'all 0.15s',
              }
            },
              iconFn ? iconFn(isActive) : React.createElement('span', { style:{ fontSize:14, color: isActive ? DS.gold : 'rgba(255,255,255,0.55)', flexShrink:0 } }, '◈'),
              !collapsed && React.createElement('span', {
                style:{ fontSize:13, color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: isActive?600:400, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' }
              }, item.label),
            );
          }),
        )
      ),
    ),
    // Collapse toggle
    React.createElement('div', {
      onClick:()=>setCollapsed(!collapsed),
      style:{ borderTop:`1px solid rgba(255,255,255,0.08)`, padding:'14px', cursor:'pointer',
        display:'flex', justifyContent: collapsed?'center':'flex-end',
        color:'rgba(255,255,255,0.3)', fontSize:14, fontFamily:'DM Sans,sans-serif' }
    }, collapsed ? '▶' : '◀ Collapse'),
  );
}

function Topbar({ screen, setScreen }) {
  const labels = {
    dashboard:'Executive Dashboard',
    omnichannel:'Omnichannel',
    activities:'Activities Center',
    ads:'Ads Intelligence',
    sales:'Sales',
    marketing:'Marketing',
    inventory:'Properties',
    ai:'AI Assistant',
    reports:'Reports',
    branding:'Branding & Settings',
    propdetail:'Property Detail',
    // legacy aliases (safe fallback)
    leads:'Lead Inventory', pipeline:'Omnichannel', inbox:'Omnichannel',
    offers:'Sales', map:'Properties', 'leads-map':'Properties',
  };
  return React.createElement('header', {
    style:{ height:56, background:DS.surface, borderBottom:`1px solid ${DS.border}`,
      display:'flex', alignItems:'center', padding:'0 24px', gap:16, position:'sticky', top:0, zIndex:50,
      boxShadow:'0 1px 4px rgba(0,0,0,0.04)' }
  },
    React.createElement('div', { style:{ flex:1, fontSize:16, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } },
      labels[screen] || screen),
    // Search
    React.createElement('div', {
      style:{ display:'flex', alignItems:'center', background:DS.bg, border:`1px solid ${DS.border}`,
        borderRadius:6, padding:'6px 12px', gap:8, minWidth:220 }
    },
      React.createElement('span', { style:{ color:DS.text3, fontSize:13 } }, '⌕'),
      React.createElement('input', { placeholder:'Search properties, leads…', style:{ border:'none', background:'transparent', outline:'none', fontSize:13, color:DS.text, fontFamily:'DM Sans,sans-serif', width:170 } }),
    ),
    // Alert bell
    React.createElement('div', { style:{ position:'relative', cursor:'pointer' } },
      React.createElement('span', { style:{ fontSize:18, color:DS.text2 } }, '🔔'),
      React.createElement('span', {
        style:{ position:'absolute', top:-4, right:-4, background:'#B82929', color:'#fff',
          fontSize:9, fontWeight:700, borderRadius:8, padding:'1px 4px', fontFamily:'DM Sans,sans-serif' }
      }, '5'),
    ),
    // User
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' } },
      React.createElement(Avatar, { initials:'CEO', color:DS.navyMid, size:34 }),
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Owner CEO'),
        React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Full Access'),
      ),
    ),
  );
}

function AppShell({ screen, setScreen, children }) {
  const [collapsed, setCollapsed] = React.useState(false);
  return React.createElement('div', { style:{ display:'flex', height:'100vh', overflow:'hidden', background:DS.bg } },
    React.createElement(Sidebar, { active:screen, setScreen, collapsed, setCollapsed }),
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      React.createElement(Topbar, { screen, setScreen }),
      React.createElement('main', { style:{ flex:1, overflowY:'auto', padding:'24px', scrollbarWidth:'thin' } },
        children,
      ),
    ),
  );
}

Object.assign(window, { DS, Badge, TempDot, Avatar, Kpi, PropCard, LeadRow, AppShell });
