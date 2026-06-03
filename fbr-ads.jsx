// Realty Platform — Ads Intelligence Module
// Main tabs: Dashboard · Campaign Performance · Creative Performance ·
// Campaign Detail: Overview · Geographic Performance · Recommendations
// Depends on: fbr-data.js, fbr-ui.jsx

const _adsDS  = window.DS;
const _adsBadge = window.Badge;
const _adsAvatar = window.Avatar;
const _adsKpi = window.Kpi;

// ─── SHARED ADS ATOMS ─────────────────────────────────────────────────────────

function PlatformTag({ platform }) {
  const meta   = { bg:'#1877F2', label:'Meta' };
  const google = { bg:'#EA4335', label:'Google' };
  const c = platform === 'Meta' ? meta : google;
  return React.createElement('span', {
    style:{ background:c.bg, color:'#fff', fontSize:10, fontWeight:700, padding:'2px 7px',
      borderRadius:3, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.04em' }
  }, c.label);
}

function Trend({ val }) {
  const up = val && val.startsWith('+');
  const dn = val && val.startsWith('-');
  return React.createElement('span', {
    style:{ fontSize:11, fontWeight:700, color: up?_adsDS.success: dn?'#B82929':_adsDS.text3,
      fontFamily:'DM Sans,sans-serif' }
  }, val || '—');
}

function QualityBar({ score, showLabel=true }) {
  const color = score >= 80 ? _adsDS.success : score >= 60 ? _adsDS.gold : score >= 40 ? _adsDS.warn : '#B82929';
  return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
    React.createElement('div', { style:{ flex:1, height:5, background:_adsDS.borderLt, borderRadius:3 } },
      React.createElement('div', { style:{ width:`${score}%`, height:'100%', background:color, borderRadius:3, transition:'width 1s' } }),
    ),
    showLabel && React.createElement('span', { style:{ fontSize:11, fontWeight:700, color, fontFamily:'DM Sans,sans-serif', minWidth:24 } }, score),
  );
}

function FatigueTag({ risk }) {
  const map = {
    low:      { bg:'#E3F2EA', color:'#2B6E4A', label:'Fresh' },
    medium:   { bg:'#FDF0DC', color:'#B87A1A', label:'Monitor' },
    high:     { bg:'rgba(184,41,41,0.08)', color:'#B82929', label:'⚠ Fatigued' },
    critical: { bg:'#FDE8E8', color:'#B82929', label:'⛔ Critical' },
  };
  const s = map[risk] || map.low;
  return React.createElement('span', {
    style:{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:'2px 7px',
      borderRadius:3, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' }
  }, s.label);
}

function Sparkline({ data, width=120, height=32, color='#C09B57' }) {
  const vals = data.map(d => d.spend);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const range = max - min || 1;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return React.createElement('svg', { width, height, viewBox:`0 0 ${width} ${height}`, style:{ display:'block' } },
    React.createElement('polyline', { points:pts, fill:'none', stroke:color, strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round' }),
    React.createElement('polyline', { points:`0,${height} ${pts} ${width},${height}`, fill:color, fillOpacity:0.08, stroke:'none' }),
  );
}

function MetricCell({ label, value, sub, color, small }) {
  return React.createElement('div', { style:{ textAlign:'center', padding:'0 10px' } },
    React.createElement('div', { style:{ fontSize: small?10:9, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:3 } }, label),
    React.createElement('div', { style:{ fontSize: small?15:18, fontWeight:800, color: color||_adsDS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, value),
    sub && React.createElement('div', { style:{ fontSize:9, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, sub),
  );
}

// ─── ADS SUB-NAV ──────────────────────────────────────────────────────────────
const ADS_VIEWS = [
  { id:'ads-dashboard',   label:'Dashboard',          icon:'◈' },
  { id:'ads-campaigns',   label:'Campaign Performance',icon:'⊞' },
  { id:'ads-attribution', label:'Source → Pipeline',  icon:'⇄' },
  { id:'ads-recs',        label:'Recommendations',     icon:'✦' },
];

function AdsSubNav({ active, setView }) {
  return React.createElement('div', {
    style:{ display:'flex', gap:0, borderBottom:`1px solid ${_adsDS.border}`, marginBottom:20,
      background:_adsDS.surface, borderRadius:'8px 8px 0 0', overflow:'hidden',
      border:`1px solid ${_adsDS.border}`, marginBottom:0 }
  },
    ADS_VIEWS.map(v =>
      React.createElement('button', { key:v.id, onClick:()=>setView(v.id), style:{
        flex:1, padding:'11px 6px', background:'transparent', border:'none',
        borderBottom:`2px solid ${active===v.id?_adsDS.gold:'transparent'}`,
        cursor:'pointer', fontSize:11, fontWeight: active===v.id?700:400,
        color: active===v.id?_adsDS.text:_adsDS.text3, fontFamily:'DM Sans,sans-serif',
        whiteSpace:'nowrap', transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'center', gap:5
      } },
        React.createElement('span', { style:{ fontSize:12 } }, v.icon),
        v.label,
      )
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 1 — ADS DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
function AdsDashboard({ setView, setScreen, onSelectCampaign }) {
  const ads = window.FBR.ads;
  const { summary, daily, campaigns } = ads;

  const burning = campaigns.filter(c => c.alert && c.status === 'active');
  const topCamp = [...campaigns].sort((a,b) => b.qualityScore - a.qualityScore)[0];

  // Chart: last 14 days spend + leads
  const last14 = daily.slice(-14);
  const maxSpend = Math.max(...last14.map(d=>d.spend));
  const maxLeads = Math.max(...last14.map(d=>d.leads));

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },

    // Alert bar
    burning.length > 0 && React.createElement('div', {
      onClick:()=>setView('ads-recs'),
      style:{ background:'#FDE8E8', border:`1px solid rgba(184,41,41,0.25)`, borderRadius:8,
        padding:'11px 20px', display:'flex', gap:12, alignItems:'center', cursor:'pointer' }
    },
      React.createElement('span', { style:{ fontSize:16 } }, '⚠️'),
      React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:'#7A1A1A', fontFamily:'DM Sans,sans-serif' } },
        `${burning.length} campaign${burning.length>1?'s':''} burning budget with low-quality leads — $${burning.reduce((a,c)=>a+c.spend,0).toLocaleString()} at risk. View recommendations →`),
    ),

    // KPI row
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(8,1fr)', gap:10 } },
      [
        { label:'Total Spend',  value:`$${(summary.totalSpend/1000).toFixed(1)}K`,  color:_adsDS.text,    sub:'30 days' },
        { label:'Leads',        value:summary.totalLeads,  color:_adsDS.navyMid,  sub:`$${summary.avgCPL} avg CPL` },
        { label:'Opportunities',value:summary.totalOpportunities, color:_adsDS.gold, sub:'31% qual. rate' },
        { label:'Pipeline',     value:`$${(summary.pipelineAttributed/1e6).toFixed(1)}M`, color:_adsDS.gold, sub:'Attributed' },
        { label:'ROAS',         value:`${summary.roas}x`,  color:_adsDS.success,  sub:'Pipeline / Spend' },
        { label:'Avg CTR',      value:`${summary.avgCTR}%`, color:_adsDS.text,    sub:'All campaigns' },
        { label:'Avg CPC',      value:`$${summary.avgCPC}`, color:_adsDS.text,    sub:'All platforms' },
        { label:'Closings',     value:summary.closingsAttributed, color:_adsDS.success, sub:'Attributed' },
      ].map((k,i) =>
        React.createElement('div', { key:i, style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:7, padding:'12px 10px', textAlign:'center' } },
          React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, k.label),
          React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, k.value),
          React.createElement('div', { style:{ fontSize:9, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:3 } }, k.sub),
        )
      ),
    ),

    // Main grid
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 } },

      // Spend + leads chart
      React.createElement('div', { style:{ gridColumn:'1/3', background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } },
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, 'Spend & Leads — Last 14 Days'),
            React.createElement('div', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, summary.period),
          ),
          React.createElement('div', { style:{ display:'flex', gap:16 } },
            [['#C09B57','Spend'],['#163061','Leads']].map(([c,l]) =>
              React.createElement('div', { key:l, style:{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } },
                React.createElement('div', { style:{ width:10, height:3, background:c, borderRadius:2 } }),
                l,
              )
            ),
          ),
        ),
        // Chart
        React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:3, height:100 } },
          last14.map((d,i) =>
            React.createElement('div', { key:i, style:{ flex:1, display:'flex', flexDirection:'column', gap:1, alignItems:'center' } },
              React.createElement('div', { style:{ width:'100%', display:'flex', gap:1, alignItems:'flex-end', height:80 } },
                React.createElement('div', { style:{ flex:1, background:_adsDS.gold, borderRadius:'2px 2px 0 0', height:`${(d.spend/maxSpend)*100}%`, minHeight:4, opacity:0.8 } }),
                React.createElement('div', { style:{ flex:1, background:_adsDS.navyMid, borderRadius:'2px 2px 0 0', height:`${(d.leads/maxLeads)*100}%`, minHeight:4, opacity:0.7 } }),
              ),
              React.createElement('div', { style:{ fontSize:8, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2, whiteSpace:'nowrap' } }, d.d.replace('Apr ','').replace('Mar ','')),
            )
          ),
        ),
      ),

      // Channel split
      React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Channel Split'),
        [
          { label:'Meta Ads', spend:summary.metaSpend, leads:summary.metaLeads, color:'#1877F2', pct:Math.round(summary.metaSpend/summary.totalSpend*100) },
          { label:'Google Ads', spend:summary.googleSpend, leads:summary.googleLeads, color:'#EA4335', pct:Math.round(summary.googleSpend/summary.totalSpend*100) },
        ].map(ch =>
          React.createElement('div', { key:ch.label, style:{ marginBottom:16 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6, alignItems:'center' } },
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
                React.createElement('div', { style:{ width:10, height:10, borderRadius:2, background:ch.color } }),
                React.createElement('span', { style:{ fontSize:12, fontWeight:600, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, ch.label),
              ),
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, `$${(ch.spend/1000).toFixed(1)}K`),
            ),
            React.createElement('div', { style:{ height:6, background:_adsDS.borderLt, borderRadius:3 } },
              React.createElement('div', { style:{ width:`${ch.pct}%`, height:'100%', background:ch.color, borderRadius:3 } }),
            ),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:3 } },
              React.createElement('span', null, `${ch.pct}% of spend`),
              React.createElement('span', null, `${ch.leads} leads · $${Math.round(ch.spend/ch.leads)} CPL`),
            ),
          )
        ),
        React.createElement('div', { style:{ borderTop:`1px solid ${_adsDS.borderLt}`, paddingTop:14, marginTop:4 } },
          React.createElement('div', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, 'Spend by Country'),
          [
            { flag:'🇺🇸', label:'USA', pct:65 },
            { flag:'🇨🇦', label:'Canada', pct:22 },
            { flag:'Other', label:'Other', pct:13 },
          ].map(c =>
            React.createElement('div', { key:c.label, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:5 } },
              React.createElement('span', { style:{ fontSize:12 } }, c.flag==='Other'?'🌎':c.flag),
              React.createElement('span', { style:{ fontSize:11, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', minWidth:40 } }, c.label),
              React.createElement('div', { style:{ flex:1, height:4, background:_adsDS.borderLt, borderRadius:2 } },
                React.createElement('div', { style:{ width:`${c.pct}%`, height:'100%', background:_adsDS.gold, borderRadius:2, opacity:0.7 } }),
              ),
              React.createElement('span', { style:{ fontSize:11, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif' } }, `${c.pct}%`),
            )
          ),
        ),
      ),
    ),

    // Campaign quick table
    React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 20px', borderBottom:`1px solid ${_adsDS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' } },
        React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, 'Active Campaigns — Overview'),
        React.createElement('span', { onClick:()=>setView('ads-campaigns'), style:{ fontSize:11, color:_adsDS.gold, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, 'Full Campaign View →'),
      ),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2.5fr 0.7fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr', padding:'8px 20px', background:_adsDS.bg, fontSize:9, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', borderBottom:`1px solid ${_adsDS.border}` } },
        ['Campaign','Platform','Spend','Leads','CPL','CTR','Pipeline','Quality','Status'].map(h=>React.createElement('span',{key:h},h)),
      ),
      campaigns.map(c =>
        React.createElement('div', { key:c.id,
          onDoubleClick:()=>onSelectCampaign&&onSelectCampaign(c),
          title:'Double-click to open Campaign Detail',
          style:{ display:'grid', gridTemplateColumns:'2.5fr 0.7fr 0.7fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr', padding:'11px 20px', borderBottom:`1px solid ${_adsDS.borderLt}`, alignItems:'center', fontSize:12, fontFamily:'DM Sans,sans-serif',
            background: c.alert&&c.status==='active'?'rgba(184,41,41,0.025)':'transparent',
            opacity: c.status==='paused'?0.55:1 }
        },
          React.createElement('div', null,
            React.createElement('div', { style:{ fontWeight:600, color:_adsDS.text, fontSize:12, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:260 } }, c.name),
            React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3, marginTop:1 } }, c.targetCountry),
          ),
          React.createElement(PlatformTag, { platform:c.platform }),
          React.createElement('span', { style:{ fontWeight:700, color:_adsDS.text } }, `$${(c.spend/1000).toFixed(1)}K`),
          React.createElement('span', { style:{ color:_adsDS.navyMid, fontWeight:600 } }, c.leads),
          React.createElement('span', { style:{ color: c.cpl>200?'#B82929': c.cpl<120?_adsDS.success:_adsDS.text, fontWeight:700 } }, `$${c.cpl}`),
          React.createElement('span', { style:{ color:_adsDS.text } }, `${c.ctr}%`),
          React.createElement('span', { style:{ color:_adsDS.gold, fontWeight:700 } }, c.pipelineValue>0?`$${(c.pipelineValue/1e6).toFixed(1)}M`:'—'),
          React.createElement(QualityBar, { score:c.qualityScore }),
          c.alert
            ? React.createElement('span', { style:{ fontSize:10, color:'#B82929', fontWeight:700 } }, c.status==='paused'?'Paused':'⚠ Alert')
            : React.createElement('span', { style:{ fontSize:10, color:_adsDS.success, fontWeight:600 } }, '● Active'),
        )
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 2 — CAMPAIGN PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════
function CampaignPerformance({ onSelectCampaign }) {
  const campaigns = window.FBR.ads.campaigns;
  const [sort, setSort] = React.useState('qualityScore');
  const [selCamp, setSelCamp] = React.useState(campaigns[0]);

  const sorted = [...campaigns].sort((a,b) => {
    if (sort==='qualityScore') return b.qualityScore - a.qualityScore;
    if (sort==='cpl') return a.cpl - b.cpl;
    if (sort==='spend') return b.spend - a.spend;
    if (sort==='leads') return b.leads - a.leads;
    if (sort==='pipeline') return b.pipelineValue - a.pipelineValue;
    return 0;
  });

  const metric = (label, sortKey) =>
    React.createElement('span', { onClick:()=>setSort(sortKey), style:{ cursor:'pointer', color: sort===sortKey?_adsDS.gold:_adsDS.text3, fontWeight:700, textDecoration: sort===sortKey?'underline':'none' } }, label);

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 160px)', overflow:'hidden' } },

    // Campaign list
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', borderRight:`1px solid ${_adsDS.border}` } },
      // Sort bar
      React.createElement('div', { style:{ padding:'10px 20px', background:_adsDS.bg, borderBottom:`1px solid ${_adsDS.border}`, fontSize:10, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', display:'flex', gap:16, alignItems:'center', flexShrink:0 } },
        React.createElement('span', { style:{ flex:2.5 } }, 'Campaign'),
        metric('Spend','spend'), metric('Leads','leads'), metric('CPL','cpl'),
        React.createElement('span', null, 'CTR'), React.createElement('span', null, 'CPC'),
        React.createElement('span', null, 'Opps'), metric('Pipeline','pipeline'), metric('Quality','qualityScore'),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        sorted.map(c =>
          React.createElement('div', { key:c.id, onClick:()=>setSelCamp(c),
            onDoubleClick:()=>onSelectCampaign&&onSelectCampaign(c),
            title:'Double-click to open Campaign Detail',
            style:{ display:'flex', gap:0, padding:'14px 20px', borderBottom:`1px solid ${_adsDS.borderLt}`, cursor:'pointer', alignItems:'center',
              background: selCamp?.id===c.id?'rgba(192,155,87,0.05)': c.alert&&c.status==='active'?'rgba(184,41,41,0.02)':'transparent',
              borderLeft:`3px solid ${selCamp?.id===c.id?_adsDS.gold: c.alert&&c.status==='active'?'#B82929':'transparent'}`,
            }
          },
            React.createElement('div', { style:{ flex:2.5, minWidth:0, paddingRight:12 } },
              React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center', marginBottom:2 } },
                React.createElement(PlatformTag, { platform:c.platform }),
                c.status==='paused' && React.createElement('span', { style:{ fontSize:9, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, '⏸ Paused'),
              ),
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginTop:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:280 } }, c.name),
              React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, `${c.targetCountry} · ${c.audience.slice(0,48)}…`),
            ),
            ...[
              { v:`$${(c.spend/1000).toFixed(1)}K`, color:_adsDS.text },
              { v:c.leads, color:_adsDS.navyMid },
              { v:`$${c.cpl}`, color: c.cpl>200?'#B82929':c.cpl<120?_adsDS.success:_adsDS.text },
              { v:`${c.ctr}%`, color:_adsDS.text },
              { v:`$${c.cpc}`, color:_adsDS.text },
              { v:c.opportunities, color:_adsDS.gold },
              { v: c.pipelineValue>0?`$${(c.pipelineValue/1e6).toFixed(1)}M`:'—', color:_adsDS.gold },
            ].map((m,i) =>
              React.createElement('div', { key:i, style:{ flex:1, textAlign:'center', fontSize:12, fontWeight:700, color:m.color, fontFamily:'DM Sans,sans-serif' } }, m.v)
            ),
            React.createElement('div', { style:{ flex:1.2 } },
              React.createElement(QualityBar, { score:c.qualityScore }),
            ),
          )
        ),
      ),
    ),

    // Campaign detail panel
    selCamp && React.createElement('div', { style:{ width:340, background:_adsDS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 } },
      React.createElement('div', { style:{ background:_adsDS.navy, padding:'20px' } },
        React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:8, alignItems:'center' } },
          React.createElement(PlatformTag, { platform:selCamp.platform }),
          selCamp.status==='paused' && React.createElement('span', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' } }, '⏸ Paused'),
          selCamp.fatigue && React.createElement(FatigueTag, { risk:'high' }),
        ),
        React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', lineHeight:1.3, marginBottom:12 } }, selCamp.name),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 } },
          [['Spend',`$${(selCamp.spend/1000).toFixed(1)}K`],['Leads',selCamp.leads],['CPL',`$${selCamp.cpl}`],['CTR',`${selCamp.ctr}%`],['CPC',`$${selCamp.cpc}`],['CPM',`$${selCamp.cpm}`]].map(([k,v])=>
            React.createElement('div', { key:k },
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif' } }, k),
              React.createElement('div', { style:{ fontSize:16, fontWeight:800, color: k==='CPL'&&selCamp.cpl>200?'#F87171':_adsDS.gold, fontFamily:'DM Sans,sans-serif' } }, v),
            )
          ),
        ),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
        // Performance indicators
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Lead Quality'),
          React.createElement(QualityBar, { score:selCamp.qualityScore }),
          React.createElement('div', { style:{ fontSize:11, color: selCamp.qualityScore>=80?_adsDS.success:selCamp.qualityScore>=50?_adsDS.warn:'#B82929', fontFamily:'DM Sans,sans-serif', marginTop:6, fontWeight:600 } },
            selCamp.qualityScore>=80?'Premium quality — prioritize':'Acceptable — monitor closely' + (selCamp.qualityScore<50?' — consider pausing':''),
          ),
        ),
        // Attribution
        React.createElement('div', { style:{ background:_adsDS.bg, borderRadius:8, padding:'12px 14px', marginBottom:14, border:`1px solid ${_adsDS.border}` } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Pipeline Attribution'),
          [['Opportunities',selCamp.opportunities],['Closings',selCamp.closings],['Pipeline Value',selCamp.pipelineValue>0?`$${(selCamp.pipelineValue/1e6).toFixed(2)}M`:'None yet'],['ROAS',selCamp.pipelineValue>0?`${Math.round(selCamp.pipelineValue/selCamp.spend)}x`:'—']].map(([k,v])=>
            React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
              React.createElement('span', { style:{ color:_adsDS.text3 } }, k),
              React.createElement('span', { style:{ color:_adsDS.text, fontWeight:700 } }, v),
            )
          ),
        ),
        // Targeting
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Targeting'),
          [['Audience',selCamp.audience],['Countries',selCamp.targetCountry],['Zone Focus',selCamp.zone],['Objective',selCamp.objective],['Budget',`$${selCamp.budget}/day`]].map(([k,v])=>
            React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:11, fontFamily:'DM Sans,sans-serif' } },
              React.createElement('span', { style:{ color:_adsDS.text3 } }, k),
              React.createElement('span', { style:{ color:_adsDS.text, fontWeight:600, textAlign:'right', maxWidth:200 } }, v),
            )
          ),
        ),
        // Alert
        selCamp.alert && React.createElement('div', { style:{ background:'#FDE8E8', border:`1px solid rgba(184,41,41,0.2)`, borderRadius:8, padding:'12px', fontSize:12, color:'#7A1A1A', fontFamily:'DM Sans,sans-serif', lineHeight:1.6, marginBottom:12 } },
          selCamp.alert,
        ),
        // Sparkline
        React.createElement('div', { style:{ background:_adsDS.bg, borderRadius:8, padding:'12px 14px', border:`1px solid ${_adsDS.border}` } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, '30d Spend Trend'),
          React.createElement(Sparkline, { data:window.FBR.ads.daily, width:280, height:40 }),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 3 — CREATIVE PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════
function CreativePerformance() {
  const creatives = window.FBR.ads.creatives;
  const [selCr, setSelCr] = React.useState(creatives[0]);

  const statusOrder = { 'top performer':0, 'active':1, 'fatigued':2, 'burn':3 };
  const sorted = [...creatives].sort((a,b) => (statusOrder[a.status]||1) - (statusOrder[b.status]||1));

  const statusStyle = {
    'top performer': { bg:'#E3F2EA', color:'#2B6E4A', label:'⭐ Top Performer' },
    'active':        { bg:_adsDS.bg, color:_adsDS.text3, label:'● Active' },
    'fatigued':      { bg:'#FDF0DC', color:'#B87A1A', label:'⚠ Fatigued' },
    'burn':          { bg:'#FDE8E8', color:'#B82929', label:'⛔ Burning' },
  };

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 160px)', overflow:'hidden' } },

    // Creative grid
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'4px' } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12, padding:'4px' } },
        sorted.map(cr => {
          const ss = statusStyle[cr.status] || statusStyle.active;
          const isSel = selCr?.id === cr.id;
          return React.createElement('div', { key:cr.id, onClick:()=>setSelCr(cr),
            style:{ background:_adsDS.surface, borderRadius:8, overflow:'hidden', cursor:'pointer',
              border:`1px solid ${isSel?_adsDS.gold: cr.status==='burn'?'rgba(184,41,41,0.35)': cr.status==='fatigued'?'rgba(184,122,26,0.3)':_adsDS.border}`,
              boxShadow: isSel?`0 0 0 2px ${_adsDS.goldDim}`:'0 1px 4px rgba(0,0,0,0.04)',
            }
          },
            // Visual
            cr.thumb
              ? React.createElement('div', { style:{ height:140, overflow:'hidden', background:'#E8E4DC', position:'relative' } },
                  React.createElement('img', { src:cr.thumb, style:{ width:'100%', height:'100%', objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
                  React.createElement('div', { style:{ position:'absolute', top:8, left:8, display:'flex', gap:4 } },
                    React.createElement(PlatformTag, { platform:cr.platform }),
                    React.createElement('span', { style:{ background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, cr.type),
                  ),
                  React.createElement('div', { style:{ position:'absolute', top:8, right:8 } },
                    React.createElement(FatigueTag, { risk:cr.fatigueRisk }),
                  ),
                )
              : React.createElement('div', { style:{ height:80, background:_adsDS.navyMid, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' } },
                  React.createElement('span', { style:{ fontSize:28, opacity:0.3 } }, '⌕'),
                  React.createElement('div', { style:{ position:'absolute', top:8, left:8, display:'flex', gap:4 } },
                    React.createElement(PlatformTag, { platform:cr.platform }),
                    React.createElement('span', { style:{ background:'rgba(0,0,0,0.6)', color:'#fff', fontSize:9, fontWeight:700, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, cr.type),
                  ),
                ),
            // Content
            React.createElement('div', { style:{ padding:'12px 14px' } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 } },
                React.createElement('span', { style:{ background:ss.bg, color:ss.color, fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, ss.label),
                cr.frequency && React.createElement('span', { style:{ fontSize:10, color: cr.frequency>4?'#B82929':_adsDS.text3, fontFamily:'DM Sans,sans-serif', fontWeight:700 } }, `freq ${cr.frequency}`),
              ),
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:8, lineHeight:1.3 } }, cr.name),
              React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:4 } },
                [['CTR',`${cr.ctr}%`],['CPL',`$${cr.cpl}`],['Leads',cr.leads],['Score',cr.qualityScore]].map(([k,v])=>
                  React.createElement('div', { key:k, style:{ textAlign:'center', background:_adsDS.bg, borderRadius:4, padding:'5px 2px' } },
                    React.createElement('div', { style:{ fontSize:8, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, k),
                    React.createElement('div', { style:{ fontSize:13, fontWeight:800, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, v),
                  )
                ),
              ),
            ),
          );
        }),
      ),
    ),

    // Creative detail
    selCr && React.createElement('div', { style:{ width:320, borderLeft:`1px solid ${_adsDS.border}`, background:_adsDS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 } },
      selCr.thumb && React.createElement('img', { src:selCr.thumb, style:{ width:'100%', height:160, objectFit:'cover', flexShrink:0 }, onError:e=>e.target.style.display='none' }),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
        React.createElement('div', { style:{ display:'flex', gap:6, marginBottom:10 } },
          React.createElement(PlatformTag, { platform:selCr.platform }),
          React.createElement('span', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', alignSelf:'center' } }, selCr.type),
          React.createElement(FatigueTag, { risk:selCr.fatigueRisk }),
        ),
        React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14, lineHeight:1.4 } }, selCr.name),
        [['Spend',`$${(selCr.spend/1000).toFixed(1)}K`],['Impressions',selCr.impressions.toLocaleString()],['Clicks',selCr.clicks.toLocaleString()],['CTR',`${selCr.ctr}%`],['Leads',selCr.leads],['CPL',`$${selCr.cpl}`],['Quality Score',selCr.qualityScore],['Engagement',selCr.engagement||'N/A'],['Frequency',selCr.frequency||'N/A (Search)']].map(([k,v])=>
          React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ color:_adsDS.text3 } }, k),
            React.createElement('span', { style:{ color:_adsDS.text, fontWeight:700 } }, v),
          )
        ),
        React.createElement('div', { style:{ marginTop:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:6 } }, 'AI Note'),
          React.createElement('div', { style:{ background: selCr.status==='burn'?'#FDE8E8': selCr.status==='fatigued'?'#FDF0DC': selCr.status==='top performer'?'#E3F2EA':_adsDS.bg, borderRadius:8, padding:'10px 12px', fontSize:12, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.65, border:`1px solid ${_adsDS.borderLt}` } },
            selCr.note),
        ),
        React.createElement('div', { style:{ display:'flex', gap:6, marginTop:14 } },
          React.createElement('button', { style:{ flex:1, padding:'8px', background:_adsDS.navy, color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, selCr.status==='burn'?'Pause Creative':'Duplicate & Test'),
          React.createElement('button', { style:{ flex:1, padding:'8px', background:_adsDS.bg, color:_adsDS.text2, border:`1px solid ${_adsDS.border}`, borderRadius:5, cursor:'pointer', fontSize:11, fontFamily:'DM Sans,sans-serif' } }, 'View Campaign'),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 4 — SOURCE TO PIPELINE ATTRIBUTION
// ═══════════════════════════════════════════════════════════════════════════════
function SourceAttribution({ setScreen }) {
  const { attribution, campaigns, summary } = window.FBR.ads;
  const maxVal = attribution[0].value;

  const campAttrib = campaigns.filter(c=>c.pipelineValue>0).sort((a,b)=>b.pipelineValue-a.pipelineValue);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 } },
      React.createElement(_adsKpi, { label:'Leads from Ads', value:summary.totalLeads, sub:'187 in 30 days', color:_adsDS.navyMid }),
      React.createElement(_adsKpi, { label:'Ad-Qualified Rate', value:'44.9%', sub:'84 of 187 qualified', color:_adsDS.gold }),
      React.createElement(_adsKpi, { label:'Attributed Pipeline', value:`$${(summary.pipelineAttributed/1e6).toFixed(1)}M`, sub:'From ad-sourced leads', color:_adsDS.gold }),
      React.createElement(_adsKpi, { label:'Attributed ROAS', value:`${summary.roas}x`, sub:'Pipeline / Ad Spend', color:_adsDS.success }),
    ),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },

      // Full attribution funnel
      React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:20 } }, 'Full Funnel Attribution — Ads → Closing'),
        attribution.map((step, i) => {
          const barW = Math.max(8, (step.value / maxVal) * 100);
          const isLast = i === attribution.length - 1;
          return React.createElement('div', { key:i, style:{ marginBottom:12 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:12, fontFamily:'DM Sans,sans-serif', marginBottom:4 } },
              React.createElement('span', { style:{ fontWeight:600, color: isLast?_adsDS.success:_adsDS.text } }, step.stage),
              React.createElement('div', { style:{ display:'flex', gap:12 } },
                React.createElement('span', { style:{ color:_adsDS.text, fontWeight:700 } }, step.value.toLocaleString()),
                React.createElement('span', { style:{ color:_adsDS.text3 } }, step.unit),
                i > 0 && React.createElement('span', { style:{ color:_adsDS.text3, fontSize:11 } }, `(${step.pct}%)`),
              ),
            ),
            React.createElement('div', { style:{ height:8, background:_adsDS.borderLt, borderRadius:4, overflow:'hidden' } },
              React.createElement('div', { style:{
                width:`${barW}%`, height:'100%', borderRadius:4, transition:'width 1s',
                background: isLast?`linear-gradient(90deg,${_adsDS.success},#5DBF8A)`: i===0?`linear-gradient(90deg,${_adsDS.navyMid},#2A5F8F)`:`linear-gradient(90deg,${_adsDS.gold},${_adsDS.goldLt})`,
              } }),
            ),
          );
        }),
        // Drop-off analysis
        React.createElement('div', { style:{ marginTop:16, padding:'12px', background:'rgba(192,155,87,0.06)', borderRadius:8, border:`1px solid ${_adsDS.goldDim}` } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_adsDS.gold, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, '💡 Key Drop-off Points'),
          React.createElement('div', { style:{ fontSize:12, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 } },
            'Clicks → Visits: 30.5% drop — landing page optimization opportunity. Visits → Leads: 1.3% conversion — test form simplification. Qualified → Opportunity: 36.9% — improve lead scoring criteria.'),
        ),
      ),

      // Campaign attribution table
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
        React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Pipeline by Campaign'),
          campAttrib.map(c =>
            React.createElement('div', { key:c.id, style:{ marginBottom:14 } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:4, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
                React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center' } },
                  React.createElement(PlatformTag, { platform:c.platform }),
                  React.createElement('span', { style:{ fontWeight:600, color:_adsDS.text } }, c.name.split('|')[0].trim()),
                ),
                React.createElement('span', { style:{ fontWeight:800, color:_adsDS.gold } }, `$${(c.pipelineValue/1e6).toFixed(1)}M`),
              ),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
                React.createElement('div', { style:{ flex:1, height:5, background:_adsDS.borderLt, borderRadius:3 } },
                  React.createElement('div', { style:{ width:`${(c.pipelineValue/summary.pipelineAttributed)*100}%`, height:'100%', background:_adsDS.gold, borderRadius:3, opacity:0.8 } }),
                ),
                React.createElement('span', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${c.opportunities} opps · ${c.closings} closed`),
              ),
            )
          ),
        ),

        // Attribution connections to CRM modules
        React.createElement('div', { style:{ background:_adsDS.navy, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,0.9)', fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Attribution Connections'),
          [
            { label:'Ad-sourced leads in Inbox', value:'6 of 8', icon:'◻', screen:'inbox' },
            { label:'Pipeline deals from ads', value:'5 of 8 deals', icon:'⊞', screen:'pipeline' },
            { label:'Active offers — ad sourced', value:'3 of 4', icon:'◫', screen:'offers' },
            { label:'Best matched inventory', value:'AR-002, AR-006', icon:'⊟', screen:'inventory' },
          ].map((r,i) =>
            React.createElement('div', { key:i, onClick:()=>setScreen(r.screen),
              style:{ display:'flex', gap:10, padding:'8px 0', borderBottom:`1px solid rgba(255,255,255,0.07)`, cursor:'pointer', alignItems:'center' } },
              React.createElement('span', { style:{ color:_adsDS.gold, fontSize:14 } }, r.icon),
              React.createElement('span', { style:{ flex:1, fontSize:12, color:'rgba(255,255,255,0.7)', fontFamily:'DM Sans,sans-serif' } }, r.label),
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_adsDS.gold, fontFamily:'DM Sans,sans-serif' } }, r.value),
              React.createElement('span', { style:{ color:'rgba(255,255,255,0.25)', fontSize:11 } }, '→'),
            )
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 5 — GEOGRAPHIC ADS PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════
function GeoPerformance() {
  const countries = window.FBR.ads.countries;
  const [selCountry, setSelCountry] = React.useState(countries[0]);

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 160px)', overflow:'hidden' } },

    // Country table
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', borderRight:`1px solid ${_adsDS.border}` } },
      React.createElement('div', { style:{ padding:'14px 20px', background:_adsDS.bg, borderBottom:`1px solid ${_adsDS.border}`, display:'grid', gridTemplateColumns:'1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr 1fr 0.8fr', fontSize:9, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', flexShrink:0 } },
        ['Market','Spend','Leads','CPL','Quality','Opps','Pipeline','Conv%'].map(h=>React.createElement('span',{key:h},h)),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        countries.map(c =>
          React.createElement('div', { key:c.country, onClick:()=>setSelCountry(c),
            style:{ display:'grid', gridTemplateColumns:'1.5fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr 1fr 0.8fr', padding:'14px 20px', borderBottom:`1px solid ${_adsDS.borderLt}`, cursor:'pointer', alignItems:'center', fontSize:13, fontFamily:'DM Sans,sans-serif',
              background: selCountry?.country===c.country?'rgba(192,155,87,0.05)':'transparent',
              borderLeft:`3px solid ${selCountry?.country===c.country?_adsDS.gold:'transparent'}`,
            }
          },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
              React.createElement('span', { style:{ fontSize:20 } }, c.flag),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontWeight:700, color:_adsDS.text } }, c.country),
                React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3 } }, c.topChannel),
              ),
            ),
            React.createElement('span', { style:{ fontWeight:700 } }, `$${(c.spend/1000).toFixed(1)}K`),
            React.createElement('span', { style:{ color:_adsDS.navyMid, fontWeight:600 } }, c.leads),
            React.createElement('span', { style:{ color: c.cpl<110?_adsDS.success:c.cpl>160?'#B82929':_adsDS.text, fontWeight:700 } }, `$${c.cpl}`),
            React.createElement('div', { style:{ maxWidth:80 } }, React.createElement(QualityBar, { score:c.qualityScore })),
            React.createElement('span', { style:{ color:_adsDS.gold, fontWeight:700 } }, c.opportunities),
            React.createElement('span', { style:{ color:_adsDS.gold, fontWeight:700 } }, c.pipelineValue>0?`$${(c.pipelineValue/1e6).toFixed(1)}M`:'—'),
            React.createElement('span', { style:{ fontWeight:700, color: c.conversionRate>20?_adsDS.success:c.conversionRate>15?_adsDS.text:'#B82929' } }, `${c.conversionRate}%`),
          )
        ),
      ),
      // Bar chart comparison
      React.createElement('div', { style:{ padding:'16px 20px', borderTop:`1px solid ${_adsDS.border}`, background:_adsDS.surface, flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Pipeline Value by Market'),
        React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'flex-end', height:60 } },
          countries.map(c => {
            const maxPV = Math.max(...countries.map(cc=>cc.pipelineValue));
            const h = Math.max(6, (c.pipelineValue/maxPV)*100);
            return React.createElement('div', { key:c.country, style:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 } },
              React.createElement('div', { style:{ width:'100%', background: selCountry?.country===c.country?_adsDS.gold:_adsDS.navyMid, borderRadius:'2px 2px 0 0', height:`${h}%`, minHeight:4, opacity:0.8 } }),
              React.createElement('span', { style:{ fontSize:9, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, c.flag),
            );
          }),
        ),
      ),
    ),

    // Country detail panel
    selCountry && React.createElement('div', { style:{ width:340, background:_adsDS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 } },
      React.createElement('div', { style:{ background:_adsDS.navy, padding:'20px', flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:32, marginBottom:6 } }, selCountry.flag),
        React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, selCountry.country),
        React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.45)', fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, `Top channel: ${selCountry.topChannel} · ${selCountry.topZone}`),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 } },
          [['Spend',`$${(selCountry.spend/1000).toFixed(1)}K`],['Leads',selCountry.leads],['CPL',`$${selCountry.cpl}`],['Conv. Rate',`${selCountry.conversionRate}%`]].map(([k,v])=>
            React.createElement('div', { key:k },
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif' } }, k),
              React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_adsDS.gold, fontFamily:'DM Sans,sans-serif' } }, v),
            )
          ),
        ),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
        [['Avg Buyer Budget',selCountry.avgBudget],['Opportunities',selCountry.opportunities],['Closings',selCountry.closings],['Pipeline Value',`$${(selCountry.pipelineValue/1e6).toFixed(2)}M`],['Lead Quality',selCountry.qualityScore+'/100'],['Top Zone',selCountry.topZone]].map(([k,v])=>
          React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:13, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ color:_adsDS.text3 } }, k),
            React.createElement('span', { style:{ color:_adsDS.text, fontWeight:700 } }, v),
          )
        ),
        React.createElement('div', { style:{ marginTop:16 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Lead Quality'),
          React.createElement(QualityBar, { score:selCountry.qualityScore }),
        ),
        React.createElement('div', { style:{ marginTop:14, background:_adsDS.bg, borderRadius:8, padding:'12px 14px', border:`1px solid ${_adsDS.border}` } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_adsDS.gold, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, '💡 Insight'),
          React.createElement('div', { style:{ fontSize:12, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 } },
            selCountry.country==='United States' ? 'Primary market. Scale Meta lookalike campaigns. Top zones: Cape Vista, Bay Heights. Avg budget $4.2M aligns well with top inventory.' :
            selCountry.country==='Canada' ? 'Second largest market. CPL competitive. Stone Ridge resonates strongly with Canadian lifestyle buyers. Increase budget by 30%.' :
            selCountry.country==='Germany' ? 'Smallest spend, highest conversion rate (25%). HNW buyers seeking ultra-premium assets. Expand immediately with dedicated campaign.' :
            selCountry.country==='United Kingdom' ? 'High avg budget $5.8M. Lead pattern suggests strong luxury demand. Expand Google Search targeting UK-based real estate queries.' :
            selCountry.country==='Other' ? 'Local development buyers. Direct channel dominates. The largest deal ($29.9M) originated here. Maintain relationship focus over paid.' :
            'Emerging market. Monitor CPL and quality. Consider small-scale test campaign targeting HNW in major cities.',
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// VIEW 6 — ADS RECOMMENDATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function AdsRecommendations({ setView }) {
  const recs = window.FBR.ads.recommendations;
  const typeColors = {
    urgent:      { bg:'#FDE8E8', border:'rgba(184,41,41,0.2)', titleColor:'#B82929', btnBg:'#B82929' },
    scale:       { bg:'#E3F2EA', border:'rgba(43,110,74,0.2)', titleColor:'#2B6E4A', btnBg:'#2B6E4A' },
    opportunity: { bg:_adsDS.goldDim, border:`rgba(192,155,87,0.3)`, titleColor:_adsDS.gold, btnBg:_adsDS.navyMid },
    fix:         { bg:'rgba(22,48,97,0.06)', border:'rgba(22,48,97,0.15)', titleColor:_adsDS.navyMid, btnBg:_adsDS.navyMid },
  };
  const totalSavings = recs.filter(r=>r.type==='urgent'||r.type==='fix').reduce((a,r)=>{ const m=r.impact.match(/\$[\d,]+/); return a+(m?parseInt(m[0].replace(/[$,]/g,''),10):0); },0);
  const totalGain    = recs.filter(r=>r.type==='scale'||r.type==='opportunity').reduce((a,r)=>{ const m=r.impact.match(/\$[\d.]+M/); return a+(m?parseFloat(m[0].replace('$','').replace('M',''))*1e6:0); },0);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
    // Summary strip
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 } },
      React.createElement(_adsKpi, { label:'Immediate Actions', value:recs.filter(r=>r.type==='urgent').length, sub:'Urgent — act today', color:'#B82929' }),
      React.createElement(_adsKpi, { label:'Budget Waste to Stop', value:`$${(totalSavings/1000).toFixed(0)}K/mo`, sub:'Recoverable spend', color:'#B82929' }),
      React.createElement(_adsKpi, { label:'Pipeline Opportunities', value:`$${(totalGain/1e6).toFixed(1)}M`, sub:'Scaling opportunities', color:_adsDS.success }),
      React.createElement(_adsKpi, { label:'Total Recommendations', value:recs.length, sub:'Across all campaigns', color:_adsDS.gold }),
    ),
    // Recs grid
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 } },
      recs.map((r,i) => {
        const s = typeColors[r.type] || typeColors.fix;
        return React.createElement('div', { key:i, style:{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:8, padding:'18px 20px' } },
          React.createElement('div', { style:{ display:'flex', gap:4, alignItems:'center', marginBottom:8 } },
            React.createElement('span', { style:{ fontSize:16 } }, r.icon),
            React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:s.titleColor, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.08em' } }, `#${r.priority} · ${r.type}`),
            React.createElement('span', { style:{ marginLeft:'auto', background:s.btnBg, color:'#fff', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:3, fontFamily:'DM Sans,sans-serif' } }, r.impact),
          ),
          React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:s.titleColor, fontFamily:'DM Sans,sans-serif', marginBottom:8, lineHeight:1.3 } }, r.title),
          React.createElement('div', { style:{ fontSize:12, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.7, marginBottom:12 } }, r.detail),
          React.createElement('div', { style:{ display:'flex', gap:8 } },
            React.createElement('button', { onClick:()=>setView('ads-campaigns'), style:{ padding:'7px 14px', background:s.btnBg, color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, r.action+' →'),
            r.campaign && React.createElement('span', { style:{ fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', alignSelf:'center' } }, r.campaign),
          ),
        );
      }),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ADS INTELLIGENCE WRAPPER
// ═══════════════════════════════════════════════════════════════════════════════
function AdsIntelligence({ setScreen }) {
  const [view, setView] = React.useState('ads-dashboard');
  const [selectedCampaign, setSelectedCampaign] = React.useState(null);

  const handleSelectCampaign = (c) => { setSelectedCampaign(c); setView('ads-campaign-detail'); };

  let content;
  switch(view) {
    case 'ads-dashboard':      content = React.createElement(AdsDashboard,       { setView, setScreen, onSelectCampaign:handleSelectCampaign }); break;
    case 'ads-campaigns':      content = React.createElement(CampaignPerformance, { onSelectCampaign:handleSelectCampaign }); break;
    case 'ads-attribution':    content = React.createElement(SourceAttribution,   { setView, setScreen }); break;
    case 'ads-recs':           content = React.createElement(AdsRecommendations,  { setView }); break;
    case 'ads-campaign-detail':content = React.createElement(CampaignDetail,      { campaign:selectedCampaign, onBack:()=>setView('ads-campaigns') }); break;
    default:                   content = React.createElement(AdsDashboard,        { setView, setScreen, onSelectCampaign:handleSelectCampaign });
  }

  const showSubNav = view !== 'ads-campaign-detail';
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },
    showSubNav && React.createElement('div', { style:{ flexShrink:0 } },
      React.createElement(AdsSubNav, { active:view, setView }),
    ),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 2px 20px 2px' } },
      React.createElement('div', { style:{ padding:'0 2px' } }, content),
    ),
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN DETAIL — opened via double-click from campaign rows
// ═══════════════════════════════════════════════════════════════════════════════
function CampaignDetail({ campaign, onBack }) {
  const [tab, setTab] = React.useState('overview');
  if (!campaign) return null;

  const allCreatives = window.FBR.ads.creatives || [];
  const allCountries = window.FBR.ads.countries  || [];
  const allRecs      = window.FBR.ads.recommendations || [];

  const creatives = allCreatives.filter(cr => cr.campaignId === campaign.id);

  const targetTags = (campaign.targetCountry || '').split('/').map(t => t.trim().toLowerCase());
  let geoData = allCountries.filter(c =>
    targetTags.some(t => c.country.toLowerCase().includes(t) || t.includes(c.country.split(' ')[0].toLowerCase()))
  );
  if (!geoData.length) geoData = allCountries.slice(0,2);

  const campRecs = allRecs.filter(r => r.campaign === campaign.id);

  const DETAIL_TABS = [
    { id:'overview', label:'Overview' },
    { id:'creative', label:'Creative Performance' },
    { id:'geo',      label:'Geographic' },
    { id:'attrib',   label:'Attribution' },
    { id:'recs',     label:'Recommendations' },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:0 } },
    // Back bar
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12, marginBottom:16 } },
      React.createElement('button', { onClick:onBack, style:{ background:'none', border:`1px solid ${_adsDS.border}`, borderRadius:6, padding:'6px 14px', cursor:'pointer', fontSize:12, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif' } }, '← Back'),
      React.createElement(PlatformTag, { platform:campaign.platform }),
      React.createElement('div', { style:{ flex:1 } },
        React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, campaign.name),
        React.createElement('div', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${campaign.targetCountry} · ${campaign.objective}`),
      ),
      React.createElement(_adsBadge, { type: campaign.status==='active'?'active':'neutral' }, campaign.status),
    ),
    // Sub-tabs
    React.createElement('div', { style:{ display:'flex', borderBottom:`1px solid ${_adsDS.border}`, marginBottom:20, background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:'8px 8px 0 0', overflow:'hidden' } },
      DETAIL_TABS.map(t =>
        React.createElement('button', { key:t.id, onClick:()=>setTab(t.id), style:{
          padding:'11px 20px', background:'transparent', border:'none',
          borderBottom:`2px solid ${tab===t.id?_adsDS.gold:'transparent'}`,
          cursor:'pointer', fontSize:12, fontWeight:tab===t.id?700:400,
          color:tab===t.id?_adsDS.text:_adsDS.text3, fontFamily:'DM Sans,sans-serif', transition:'all 0.15s'
        } }, t.label)
      ),
    ),
    tab === 'overview' && React.createElement(CDOverview, { campaign }),
    tab === 'creative' && React.createElement(CDCreative, { creatives, campaign }),
    tab === 'geo'      && React.createElement(CDGeo,      { geoData, campaign }),
    tab === 'attrib'   && React.createElement(CDAttrib,   { campaign }),
    tab === 'recs'     && React.createElement(CDRecs,     { recs:campRecs }),
  );
}

function CDOverview({ campaign: c }) {
  const qual  = c.qualityScore;
  const qColor = qual>=80 ? _adsDS.success : qual>=60 ? _adsDS.gold : '#B82929';
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 } },
      React.createElement(_adsKpi, { label:'Spend', value:`${(c.spend/1000).toFixed(1)}K`, sub:`${c.budget}/day`, color:_adsDS.gold }),
      React.createElement(_adsKpi, { label:'Leads', value:c.leads, sub:`CPL ${c.cpl}`, color:_adsDS.navyMid }),
      React.createElement(_adsKpi, { label:'Quality Score', value:qual, sub:qual>=80?'Excellent':qual>=60?'Good':'Needs work', color:qColor }),
      React.createElement(_adsKpi, { label:'Pipeline Value', value:c.pipelineValue?`${(c.pipelineValue/1e6).toFixed(1)}M`:'—', sub:`${c.opportunities} opps`, color:_adsDS.success }),
    ),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },
      React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Campaign Metrics'),
        [
          ['Impressions', c.impressions?.toLocaleString()],
          ['Clicks', c.clicks?.toLocaleString()],
          ['CTR', `${c.ctr}%`],
          ['CPC', `${c.cpc}`],
          ['CPM', `${c.cpm}`],
          ['Audience', c.audience],
          ['Zone', c.zone],
          ['Trend', c.trend],
        ].map(([k,v]) =>
          React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ color:_adsDS.text3 } }, k),
            React.createElement('span', { style:{ color:_adsDS.text, fontWeight:600 } }, v || '—'),
          )
        ),
      ),
      React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Health'),
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:11, fontFamily:'DM Sans,sans-serif', marginBottom:6 } },
            React.createElement('span', { style:{ color:_adsDS.text2, fontWeight:600 } }, 'Quality Score'),
            React.createElement('span', { style:{ color:_adsDS.text3 } }, `${qual}/100`),
          ),
          React.createElement(QualityBar, { score:qual }),
        ),
        c.fatigue
          ? React.createElement('div', { style:{ background:'#FDE8E8', border:'1px solid rgba(184,41,41,0.2)', borderRadius:6, padding:'10px 14px', marginBottom:12 } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, '⚠ Fatigue Detected'),
              React.createElement('div', { style:{ fontSize:11, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', marginTop:4 } }, c.alert),
            )
          : React.createElement('div', { style:{ background:'#E3F2EA', border:'1px solid rgba(43,110,74,0.2)', borderRadius:6, padding:'10px 14px', marginBottom:12 } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_adsDS.success, fontFamily:'DM Sans,sans-serif' } }, '✓ No fatigue — healthy'),
            ),
        React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_adsDS.text3, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6, fontFamily:'DM Sans,sans-serif' } }, 'Budget Utilisation'),
        React.createElement('div', { style:{ height:6, background:_adsDS.borderLt, borderRadius:3 } },
          React.createElement('div', { style:{ width:'84%', height:'100%', background:_adsDS.gold, borderRadius:3 } }),
        ),
      ),
    ),
  );
}

function CDCreative({ creatives, campaign }) {
  if (!creatives.length) return React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'48px', textAlign:'center', color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } },
    React.createElement('div', { style:{ fontSize:22, marginBottom:10 } }, '◧'),
    React.createElement('div', { style:{ fontSize:14, fontWeight:600 } }, 'No creatives assigned to this campaign'),
  );
  return React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, overflow:'hidden' } },
    React.createElement('div', { style:{ padding:'14px 20px', borderBottom:`1px solid ${_adsDS.border}` } },
      React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, `Creatives — ${campaign.name}`),
    ),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2.5fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr', padding:'8px 20px', background:_adsDS.bg, fontSize:10, fontWeight:700, color:_adsDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
      ['Creative','Type','Impressions','Leads','CTR','CPL','Status'].map(h=>React.createElement('span',{key:h},h)),
    ),
    creatives.map(cr =>
      React.createElement('div', { key:cr.id, style:{ display:'grid', gridTemplateColumns:'2.5fr 0.8fr 0.8fr 0.8fr 0.8fr 0.8fr 1fr', padding:'12px 20px', borderBottom:`1px solid ${_adsDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif', alignItems:'center' } },
        React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
          cr.thumb && React.createElement('img', { src:cr.thumb, style:{ width:44, height:34, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontWeight:600, color:_adsDS.text, fontSize:11, maxWidth:220, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, cr.name),
            cr.note && React.createElement('div', { style:{ fontSize:9, color:_adsDS.text3, marginTop:2 } }, cr.note),
          ),
        ),
        React.createElement('span', { style:{ color:_adsDS.text2 } }, cr.type),
        React.createElement('span', { style:{ color:_adsDS.text2 } }, cr.impressions?.toLocaleString()),
        React.createElement('span', { style:{ fontWeight:700, color:_adsDS.navyMid } }, cr.leads),
        React.createElement('span', { style:{ fontWeight:700, color:cr.ctr>4?_adsDS.success:_adsDS.text } }, `${cr.ctr}%`),
        React.createElement('span', { style:{ fontWeight:700, color:cr.cpl<120?_adsDS.success:cr.cpl>200?'#B82929':_adsDS.text } }, `${cr.cpl}`),
        React.createElement(FatigueTag, { risk:cr.fatigueRisk }),
      )
    ),
  );
}

function CDGeo({ geoData, campaign }) {
  const total = geoData.reduce((a,c)=>a+c.leads,0) || 1;
  return React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'24px' } },
    React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, `Geographic — ${campaign.name}`),
    React.createElement('div', { style:{ fontSize:11, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:20 } }, `Target: ${campaign.targetCountry}`),
    geoData.map(c =>
      React.createElement('div', { key:c.country, style:{ marginBottom:18 } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 } },
          React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
            React.createElement('span', { style:{ fontSize:18 } }, c.flag),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, c.country),
              React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, `CPL ${c.cpl} · Q:${c.qualityScore}`),
            ),
          ),
          React.createElement('div', { style:{ textAlign:'right' } },
            React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:_adsDS.gold, fontFamily:'DM Sans,sans-serif' } }, `${(c.pipelineValue/1e6).toFixed(1)}M`),
            React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${c.leads} leads`),
          ),
        ),
        React.createElement('div', { style:{ height:6, background:_adsDS.borderLt, borderRadius:3 } },
          React.createElement('div', { style:{ width:`${Math.round(c.leads/total*100)}%`, height:'100%', background:_adsDS.gold, borderRadius:3 } }),
        ),
      )
    ),
  );
}

function CDAttrib({ campaign: c }) {
  const steps = [
    { label:'Impressions',   value:(c.impressions||0).toLocaleString(), icon:'👁' },
    { label:'Clicks',        value:(c.clicks||0).toLocaleString(),       icon:'↗' },
    { label:'Visits',        value:(c.visits||0).toLocaleString(),       icon:'🌐' },
    { label:'Leads',         value:c.leads,                              icon:'⬡' },
    { label:'Opportunities', value:c.opportunities,                      icon:'◈' },
    { label:'Pipeline',      value:c.pipelineValue?`${(c.pipelineValue/1e6).toFixed(1)}M`:'—', icon:'💰' },
    { label:'Closings',      value:c.closings||0,                        icon:'✓' },
  ];
  return React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'24px' } },
    React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:20 } }, `Attribution Funnel — ${c.name}`),
    steps.map((step, i) =>
      React.createElement('div', { key:step.label, style:{ display:'flex', alignItems:'center', gap:14, marginBottom:14 } },
        React.createElement('div', { style:{ width:32, height:32, borderRadius:'50%', background:i===0?_adsDS.navyMid:i===steps.length-1?_adsDS.success:_adsDS.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0, border:`1px solid ${_adsDS.border}` } }, step.icon),
        React.createElement('div', { style:{ flex:1, height:6, background:_adsDS.bg, borderRadius:3 } },
          React.createElement('div', { style:{ width:`${Math.max(8, 100 - i*12)}%`, height:'100%', background:i===steps.length-1?_adsDS.success:_adsDS.gold, borderRadius:3 } }),
        ),
        React.createElement('div', { style:{ minWidth:100, textAlign:'right' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif' } }, step.value),
          React.createElement('div', { style:{ fontSize:10, color:_adsDS.text3, fontFamily:'DM Sans,sans-serif' } }, step.label),
        ),
      )
    ),
  );
}

function CDRecs({ recs }) {
  if (!recs || !recs.length) return React.createElement('div', { style:{ background:_adsDS.surface, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'48px', textAlign:'center', fontFamily:'DM Sans,sans-serif' } },
    React.createElement('div', { style:{ fontSize:22, marginBottom:10, color:_adsDS.success } }, '✓'),
    React.createElement('div', { style:{ fontSize:14, fontWeight:600, color:_adsDS.success } }, 'No urgent recommendations for this campaign.'),
  );
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
    recs.map((r,i) =>
      React.createElement('div', { key:i, style:{ background:_adsDS.bg, border:`1px solid ${_adsDS.border}`, borderRadius:8, padding:'16px 20px', display:'flex', gap:12 } },
        React.createElement('span', { style:{ fontSize:20 } }, r.icon),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_adsDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, r.title),
          React.createElement('div', { style:{ fontSize:12, color:_adsDS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.6 } }, r.detail),
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_adsDS.gold, marginTop:8, fontFamily:'DM Sans,sans-serif' } }, r.impact),
        ),
      )
    ),
  );
}

Object.assign(window, { AdsIntelligence, CampaignDetail });

