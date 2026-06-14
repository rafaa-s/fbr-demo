// FBR Platform — Design System + AppShell v2
// 6-section navigation: Command Center · Revenue Engine · Market Intelligence · Marketing Performance · Operations · Admin

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

// ─── SECTION MAP ──────────────────────────────────────────────────────────────
const SECTION_MAP = [
  {
    id:'command', label:'Command Center', icon:'command', defaultScreen:'command-center',
    screens:['command-center'], subtabs:[],
    description: 'Executive visibility — pipeline, risk, brokers, alerts.',
  },
  { id:'crm', label:'CRM', icon:'revenue', defaultScreen:'re-omnichannel',
    screens:['re-omnichannel','re-pipeline','re-calendar'],
    subtabs:[{id:'re-omnichannel',label:'Omnichannel'},{id:'re-pipeline',label:'Pipeline'},{id:'re-calendar',label:'Calendar & Tours'}],
    description: 'Omnichannel leads, conversations, pipeline, calendar and tours.',
  },
  {
    id:'commercial-ops', label:'Commercial Ops', icon:'market', defaultScreen:'mi-inventory',
    screens:['mi-inventory','mi-closings','propdetail'],
    subtabs:[
      { id:'mi-inventory', label:'Inventory' },
      { id:'mi-closings',  label:'Sales & Closings' },
    ],
    description: 'Inventory, market map, pricing, owners, sales & closings.',
  },
  {
    id:'market-intel', label:'Market Intelligence', icon:'analytics', defaultScreen:'mkt-listings',
    screens:['mkt-listings','mkt-pricing-all','mkt-demographic','mkt-supdem'],
    subtabs:[
      { id:'mkt-listings',    label:'All Listings' },
      { id:'mkt-pricing-all', label:'Pricing Intelligence' },
      { id:'mkt-demographic', label:'Demographic' },
      { id:'mkt-supdem',      label:'Supply vs Demand' },
    ],
    description: 'All listings, pricing movement, demographic and supply vs demand.',
  },
  {
    id:'marketing', label:'Marketing Performance', icon:'ads', defaultScreen:'mkt-campaigns',
    screens:['mkt-campaigns','mkt-content','mkt-cms'],
    subtabs:[
      { id:'mkt-campaigns', label:'Campaign Center' },
      { id:'mkt-content',   label:'Content Managing' },
      { id:'mkt-cms',       label:'Website CMS' },
    ],
    description: 'Campaigns, content, website CMS and attribution.',
  },
  {
    id:'admin', label:'Admin', icon:'admin', defaultScreen:'re-brokers',
    screens:['re-brokers'],
    subtabs:[{ id:'re-brokers', label:'Broker Managing' }],
    description: 'Brokers, users, roles, routing, AI controls, audit.',
  },
  {
    id:'financial-ops', label:'Financial Ops', icon:'ops', defaultScreen:'ops-finance',
    screens:['ops-finance','ops-invoicing','ops-accounting','ops-payroll','ops-banking'],
    subtabs:[
      { id:'ops-finance',    label:'Finance Manager' },
      { id:'ops-invoicing',  label:'Electronic Invoicing' },
      { id:'ops-accounting', label:'Accounting' },
      { id:'ops-payroll',    label:'Payroll' },
      { id:'ops-banking',    label:'Banking Access' },
    ],
    description: 'Finance, invoicing, accounting, payroll, banking access.',
  },
  {
    id:'settings', label:'Settings', icon:'settings', defaultScreen:'admin-users',
    screens:['admin-users','admin-roles','admin-workflows','admin-data','admin-audit','admin-ai'],
    subtabs:[
      { id:'admin-users',     label:'Users' },
      { id:'admin-roles',     label:'Roles & Permissions' },
      { id:'admin-workflows', label:'Workflows' },
      { id:'admin-data',      label:'Data Management' },
      { id:'admin-audit',     label:'Audit Log' },
      { id:'admin-ai',        label:'AI Controls' },
    ],
    description: 'Users, roles, permissions, workflows, audit and AI settings.',
  },
];

function getSection(screenId) {
  return SECTION_MAP.find(s => s.screens.includes(screenId)) || null;
}

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

function Kpi({ label, value, sub, icon, color, onClick, alert }) {
  const [hov, setHov] = React.useState(false);
  return React.createElement('div', {
    onClick, onMouseEnter:()=>setHov(true), onMouseLeave:()=>setHov(false),
    style: {
      background: DS.surface, border:`1px solid ${hov ? DS.gold : (alert ? 'rgba(184,41,41,0.3)' : DS.border)}`,
      borderRadius:8, padding:'20px 24px', cursor: onClick ? 'pointer' : 'default',
      transition:'border-color 0.2s, box-shadow 0.2s',
      boxShadow: hov ? '0 4px 20px rgba(192,155,87,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
      position:'relative',
    }
  },
    alert && React.createElement('div', { style:{ position:'absolute', top:8, right:8, width:8, height:8, borderRadius:'50%', background:'#B82929' } }),
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

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function SvgIcon({ name, active, size=18 }) {
  const c = active ? DS.gold : 'rgba(255,255,255,0.55)';
  const sw = 1.5;
  const icons = {
    command: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('rect',{x:2,y:2,width:7,height:8,rx:1.5,stroke:c,strokeWidth:sw}),
      React.createElement('rect',{x:11,y:2,width:7,height:4,rx:1.5,stroke:c,strokeWidth:sw}),
      React.createElement('rect',{x:11,y:8,width:7,height:10,rx:1.5,stroke:c,strokeWidth:sw}),
      React.createElement('rect',{x:2,y:12,width:7,height:6,rx:1.5,stroke:c,strokeWidth:sw}),
    ),
    revenue: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('path',{d:'M3 17c0-3.314 2.686-5 6-5s6 1.686 6 5',stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('circle',{cx:9,cy:7,r:3,stroke:c,strokeWidth:sw}),
      React.createElement('path',{d:'M14 10l2 2 3-3',stroke:c,strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round'}),
    ),
    market: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('line',{x1:3,y1:17,x2:17,y2:17,stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('line',{x1:3,y1:17,x2:3,y2:4,stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('rect',{x:5,y:11,width:3,height:6,rx:1,stroke:c,strokeWidth:sw}),
      React.createElement('rect',{x:9.5,y:7,width:3,height:10,rx:1,stroke:c,strokeWidth:sw}),
      React.createElement('rect',{x:14,y:4,width:3,height:13,rx:1,stroke:c,strokeWidth:sw}),
    ),
    analytics: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('line',{x1:3,y1:17,x2:17,y2:17,stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('line',{x1:3,y1:17,x2:3,y2:4,stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('polyline',{points:'4,13 8,8 11,11 16,5',stroke:c,strokeWidth:sw,strokeLinecap:'round',strokeLinejoin:'round',fill:'none'}),
      React.createElement('circle',{cx:16,cy:5,r:1.5,fill:c,stroke:'none'}),
    ),
    ads: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('path',{d:'M10 3L17 10L10 17L3 10L10 3Z',stroke:c,strokeWidth:sw,strokeLinejoin:'round'}),
      React.createElement('circle',{cx:10,cy:10,r:2.5,stroke:c,strokeWidth:sw}),
      React.createElement('line',{x1:10,y1:1,x2:10,y2:3,stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
    ),
    ops: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('circle',{cx:10,cy:10,r:2.5,stroke:c,strokeWidth:sw}),
      React.createElement('path',{d:'M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42',stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
    ),
    admin: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('path',{d:'M10 2L12 6H17L13.5 9L15 13L10 10.5L5 13L6.5 9L3 6H8L10 2Z',stroke:c,strokeWidth:sw,strokeLinejoin:'round',fill:'none'}),
    ),
    settings: React.createElement('svg',{width:size,height:size,viewBox:'0 0 20 20',fill:'none'},
      React.createElement('path',{d:'M3 5h14M3 10h14M3 15h14',stroke:c,strokeWidth:sw,strokeLinecap:'round'}),
      React.createElement('circle',{cx:7,cy:5,r:1.8,fill:c,stroke:'none'}),
      React.createElement('circle',{cx:13,cy:10,r:1.8,fill:c,stroke:'none'}),
      React.createElement('circle',{cx:7,cy:15,r:1.8,fill:c,stroke:'none'}),
    ),
  };
  return icons[name] || icons.command;
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ activeScreen, setScreen, collapsed, setCollapsed }) {
  const activeSection = getSection(activeScreen);

  return React.createElement('aside', {
    style: {
      width: collapsed ? 60 : 228, minWidth: collapsed ? 60 : 228,
      background: DS.navy, display:'flex', flexDirection:'column',
      height:'100vh', position:'sticky', top:0, transition:'width 0.2s',
      boxShadow:'2px 0 12px rgba(0,0,0,0.15)', zIndex:100, overflow:'hidden',
    }
  },
    // Logo
    React.createElement('div', {
      style:{ padding: collapsed?'16px 0':'16px 18px', borderBottom:'1px solid rgba(255,255,255,0.08)',
        display:'flex', alignItems:'center', justifyContent: collapsed?'center':'flex-start', minHeight:64 }
    },
      collapsed
        ? React.createElement('div', { style:{ width:32,height:32,background:DS.gold,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 } },
            React.createElement('span', { style:{ fontSize:16,fontWeight:900,color:DS.navy,fontFamily:'DM Sans,sans-serif' } }, 'F')
          )
        : React.createElement('img', {
            src:'logo.png', alt:'Flamingo Beach Realty',
            style:{ height:40,maxWidth:192,objectFit:'contain',objectPosition:'left center',display:'block',mixBlendMode:'screen' },
          }),
    ),

    // Nav items
    React.createElement('nav', { style:{ flex:1, overflowY:'auto', padding:'8px 0 12px', scrollbarWidth:'none' } },
      SECTION_MAP.map((section, sIdx) => {
        const isActiveSection = activeSection?.id === section.id;
        const hasChildren = section.subtabs.length > 0;

        // ── Collapsed mode: one icon per section ─────────────────────────────
        if (collapsed) {
          return React.createElement('div', {
            key: section.id,
            onClick: () => setScreen(section.defaultScreen),
            title: section.label,
            style:{
              display:'flex', alignItems:'center', justifyContent:'center',
              padding:'11px 0', cursor:'pointer',
              background: isActiveSection ? 'rgba(192,155,87,0.15)' : 'transparent',
              borderLeft: isActiveSection ? `3px solid ${DS.gold}` : '3px solid transparent',
              transition:'all 0.15s',
            }
          }, React.createElement(SvgIcon, { name: section.icon, active: isActiveSection }));
        }

        // ── Expanded mode ─────────────────────────────────────────────────────
        return React.createElement('div', { key: section.id,
          style:{ marginBottom: hasChildren ? 4 : 0 }
        },
          // Section header
          React.createElement('div', {
            onClick: !hasChildren ? () => setScreen(section.defaultScreen) : undefined,
            style:{
              display:'flex', alignItems:'center', gap:9,
              padding: hasChildren ? '14px 18px 5px' : '10px 18px',
              cursor: hasChildren ? 'default' : 'pointer',
              background: !hasChildren && isActiveSection ? 'rgba(192,155,87,0.15)' : 'transparent',
              borderLeft: !hasChildren && isActiveSection ? `3px solid ${DS.gold}` : '3px solid transparent',
              transition:'all 0.15s',
            }
          },
            React.createElement(SvgIcon, { name: section.icon, active: isActiveSection, size: hasChildren ? 13 : 17 }),
            React.createElement('span', {
              style:{
                fontSize: hasChildren ? 10 : 13,
                fontWeight: hasChildren ? 700 : (isActiveSection ? 600 : 400),
                color: hasChildren
                  ? 'rgba(255,255,255,0.32)'
                  : (isActiveSection ? '#fff' : 'rgba(255,255,255,0.62)'),
                letterSpacing: hasChildren ? '0.13em' : '0.01em',
                textTransform: hasChildren ? 'uppercase' : 'none',
                fontFamily: 'DM Sans, sans-serif',
                whiteSpace:'nowrap',
              }
            }, section.label),
            section.id === 'financial-ops' && React.createElement('span', {
              title:'Not included in original plan · TBC',
              style:{
                fontSize:7, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
                padding:'2px 6px', borderRadius:99, background:'rgba(192,155,87,0.16)',
                color:DS.gold, fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap',
              }
            }, 'TBC'),
          ),

          // Subtab items
          hasChildren && section.subtabs.map(tab => {
            const isActive = activeScreen === tab.id;
            return React.createElement('div', {
              key: tab.id,
              onClick: () => setScreen(tab.id),
              style:{
                display:'flex', alignItems:'center',
                padding:'7px 18px 7px 40px',
                cursor:'pointer',
                background: isActive ? 'rgba(192,155,87,0.14)' : 'transparent',
                borderLeft: isActive ? `3px solid ${DS.gold}` : '3px solid transparent',
                transition:'all 0.12s',
              }
            },
              React.createElement('span', {
                style:{
                  fontSize:12, fontFamily:'DM Sans,sans-serif',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  whiteSpace:'nowrap',
                }
              }, tab.label),
              tab.id === 'mkt-cms' && React.createElement('span', {
                title:'Not included in original plan · TBC',
                style:{
                  marginLeft:7, fontSize:7, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase',
                  padding:'2px 6px', borderRadius:99, background:'rgba(192,155,87,0.16)',
                  color:DS.gold, fontFamily:'DM Sans, sans-serif', whiteSpace:'nowrap',
                }
              }, 'TBC'),
            );
          }),

          // Separator between sections (except last)
          hasChildren && sIdx < SECTION_MAP.length - 1 && React.createElement('div', {
            style:{ height:1, background:'rgba(255,255,255,0.06)', margin:'8px 0 0' }
          }),
        );
      }),
    ),

    // Collapse toggle
    React.createElement('div', {
      onClick:()=>setCollapsed(!collapsed),
      style:{ borderTop:'1px solid rgba(255,255,255,0.08)', padding:'14px', cursor:'pointer',
        display:'flex', justifyContent: collapsed?'center':'flex-end', alignItems:'center',
        color:'rgba(255,255,255,0.3)', fontSize:12, fontFamily:'DM Sans,sans-serif', gap:6 }
    },
      collapsed
        ? React.createElement('span', null, '▶')
        : React.createElement(React.Fragment, null,
            React.createElement('span', null, '◀'),
            React.createElement('span', { style:{ fontSize:11 } }, ' Collapse'),
          ),
    ),
  );
}

// ─── SubNav ───────────────────────────────────────────────────────────────────

function SubNav({ tabs, activeTab, setScreen }) {
  if (!tabs || tabs.length === 0) return null;
  return React.createElement('div', {
    style:{
      background: DS.surface, borderBottom:`1px solid ${DS.border}`,
      display:'flex', alignItems:'center', gap:0, padding:'0 24px',
      flexShrink:0, overflowX:'auto', scrollbarWidth:'none',
      boxShadow:'0 1px 0 rgba(0,0,0,0.03)',
    }
  },
    tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        onClick: () => setScreen(tab.id),
        style:{
          background:'transparent', border:'none', cursor:'pointer',
          padding:'11px 16px', fontSize:13, fontFamily:'DM Sans,sans-serif',
          color: activeTab === tab.id ? DS.text : DS.text3,
          fontWeight: activeTab === tab.id ? 600 : 400,
          borderBottom: `2px solid ${activeTab === tab.id ? DS.gold : 'transparent'}`,
          transition:'all 0.15s', whiteSpace:'nowrap', lineHeight:1,
        }
      }, tab.label),
    ),
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

function Topbar({ screen, setScreen }) {
  const labels = {
    'command-center':  'Command Center',
    're-leads':        'Lead Inventory',
    're-omnichannel':  'Omnichannel',
    're-pipeline':     'Pipeline',
    're-calendar':     'Calendar & Tours',
    're-brokers':      'Broker Managing',
    'mi-inventory':    'Inventory',
    'mi-closings':     'Sales & Closings',
    'mi-pricing':      'Pricing Intelligence',
    'mi-map':          'Market Map',
    'mi-owners':       'Owners & Exclusivities',
    'mkt-listings':    'All Listings',
    'mkt-pricing-all': 'Pricing Intelligence',
    'mkt-demographic': 'Demographic Analysis',
    'mkt-supdem':      'Supply vs Demand Intelligence',
    'mkt-campaigns':   'Campaign Center',
    'mkt-paid':        'Paid Media Performance',
    'mkt-content':     'Content Managing',
    'mkt-cms':         'Website CMS',
    'ops-finance':     'Finance Manager',
    'ops-invoicing':   'Electronic Invoicing',
    'ops-accounting':  'Accounting Manager',
    'ops-payroll':     'Payroll Management',
    'ops-banking':     'Banking Access',
    'admin-users':     'User Management',
    'admin-roles':     'Roles & Permissions',
    'admin-routing':   'Lead Routing Rules',
    'admin-workflows': 'Workflow Settings',
    'admin-data':      'Data Management',
    'admin-audit':     'Audit Log',
    'admin-ai':        'AI Controls',
    'propdetail':      'Property Detail',
  };
  const section = getSection(screen);

  return React.createElement('header', {
    style:{ height:56, background:DS.surface, borderBottom:`1px solid ${DS.border}`,
      display:'flex', alignItems:'center', padding:'0 24px', gap:16, position:'sticky', top:0, zIndex:50,
      boxShadow:'0 1px 4px rgba(0,0,0,0.04)', flexShrink:0 }
  },
    // Breadcrumb
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, flex:1 } },
      section && section.id !== 'command' && React.createElement(React.Fragment, null,
        React.createElement('span', { style:{ fontSize:12, color:DS.text3, fontFamily:'DM Sans,sans-serif', cursor:'pointer' }, onClick:()=>setScreen(section.defaultScreen) }, section.label),
        React.createElement('span', { style:{ fontSize:12, color:DS.text3 } }, '/'),
      ),
      React.createElement('span', { style:{ fontSize:15, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } },
        labels[screen] || screen),
    ),
    // Search
    React.createElement('div', {
      style:{ display:'flex', alignItems:'center', background:DS.bg, border:`1px solid ${DS.border}`,
        borderRadius:6, padding:'6px 12px', gap:8, minWidth:200 }
    },
      React.createElement('span', { style:{ color:DS.text3, fontSize:13 } }, '⌕'),
      React.createElement('input', { placeholder:'Search…', style:{ border:'none', background:'transparent', outline:'none', fontSize:13, color:DS.text, fontFamily:'DM Sans,sans-serif', width:150 } }),
    ),
    // Notifications
    React.createElement('div', { style:{ position:'relative', cursor:'pointer' } },
      React.createElement('span', { style:{ fontSize:18, color:DS.text2 } }, '🔔'),
      React.createElement('span', {
        style:{ position:'absolute', top:-4, right:-4, background:'#B82929', color:'#fff',
          fontSize:9, fontWeight:700, borderRadius:8, padding:'1px 4px', fontFamily:'DM Sans,sans-serif' }
      }, '5'),
    ),
    // User
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' } },
      React.createElement(Avatar, { initials:'ME', color:DS.navyMid, size:34 }),
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Melanie Engel'),
        React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Full Access'),
      ),
    ),
  );
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

function AppShell({ screen, setScreen, children }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return React.createElement('div', { style:{ display:'flex', height:'100vh', overflow:'hidden', background:DS.bg } },
    React.createElement(Sidebar, { activeScreen:screen, setScreen, collapsed, setCollapsed }),
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      React.createElement(Topbar, { screen, setScreen }),
      React.createElement('main', { style:{ flex:1, overflowY:'auto', padding:'24px', scrollbarWidth:'thin' } },
        children,
      ),
    ),
  );
}

Object.assign(window, { DS, Badge, TempDot, Avatar, Kpi, PropCard, LeadRow, AppShell, SECTION_MAP, getSection });
