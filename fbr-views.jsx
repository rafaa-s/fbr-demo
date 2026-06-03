// Realty Platform — All Screens
// Depends on: fbr-data.js, fbr-ui.jsx

const { listings, leads, market, pipeline, agents } = window.FBR;
const { DS, Badge, TempDot, Avatar, Kpi, PropCard, LeadRow, AppShell } = window;

// ─── Mini Bar Chart ────────────────────────────────────────────────────────
function MiniBar({ data, color=DS.gold, height=60 }) {
  const max = Math.max(...data.map(d=>d.v));
  return React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:3, height } },
    data.map((d,i) => React.createElement('div', { key:i, style:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 } },
      React.createElement('div', { style:{ width:'100%', background: color, borderRadius:'2px 2px 0 0', height: `${(d.v/max)*100}%`, minHeight:2, transition:'height 0.4s', opacity: 0.7+0.3*(i/data.length) } }),
      React.createElement('span', { style:{ fontSize:9, color:DS.text3, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' } }, d.l),
    )),
  );
}

function DonutChart({ pct, color=DS.gold, size=80, label }) {
  const r=30, c=2*Math.PI*r, off=c*(1-pct/100);
  return React.createElement('svg', { width:size, height:size, viewBox:'0 0 80 80' },
    React.createElement('circle', { cx:40,cy:40,r,fill:'none',stroke:DS.borderLt,strokeWidth:8 }),
    React.createElement('circle', { cx:40,cy:40,r,fill:'none',stroke:color,strokeWidth:8,strokeDasharray:c,strokeDashoffset:off,strokeLinecap:'round',transform:'rotate(-90 40 40)' }),
    React.createElement('text', { x:40,y:38,textAnchor:'middle',fontSize:14,fontWeight:700,fill:DS.text,fontFamily:'DM Sans,sans-serif' }, `${pct}%`),
    label && React.createElement('text', { x:40,y:52,textAnchor:'middle',fontSize:8,fill:DS.text3,fontFamily:'DM Sans,sans-serif' }, label),
  );
}

// ─── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({ setScreen }) {
  const { kpis } = market;
  const untouched = leads.filter(l=>l.lastTouch===null||parseInt(l.lastTouch)>7).length;
  const hot = leads.filter(l=>l.temp==='hot').length;
  const barData = [
    {l:'Nov',v:7.2},{l:'Dec',v:9.1},{l:'Jan',v:8.4},{l:'Feb',v:11.3},{l:'Mar',v:10.8},{l:'Apr',v:12.3}
  ];

  return React.createElement('div', null,
    // Alert banner
    untouched > 0 && React.createElement('div', {
      style:{ background:'#FDF0DC', border:`1px solid #E4B866`, borderRadius:8, padding:'12px 20px',
        display:'flex', alignItems:'center', gap:12, marginBottom:20, cursor:'pointer' },
      onClick:()=>setScreen('omnichannel')
    },
      React.createElement('span', { style:{ fontSize:16 } }, '⚠️'),
      React.createElement('span', { style:{ fontSize:13, fontWeight:600, color:'#7A4F0A', fontFamily:'DM Sans,sans-serif' } },
        `${untouched} leads without contact in 7+ days — risk of loss. View now →`),
    ),

    // KPI row
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 } },
      React.createElement(Kpi, { label:'Active Leads', value:kpis.activeLeads, sub:`${hot} hot right now`, icon:'⬡', color:DS.navyMid, onClick:()=>setScreen('omnichannel') }),
      React.createElement(Kpi, { label:'Pipeline Value', value:`$${(kpis.pipelineValue/1e6).toFixed(1)}M`, sub:'Across 8 active deals', icon:'◈', color:DS.gold }),
      React.createElement(Kpi, { label:'Monthly Volume', value:`$${(kpis.monthlyVolume/1e6).toFixed(1)}M`, sub:'+18% vs last month', icon:'↑', color:DS.success }),
      React.createElement(Kpi, { label:'Inventory Active', value:kpis.totalInventory, sub:`${kpis.avgDaysOnMarket}d avg on market`, icon:'⊟', onClick:()=>setScreen('inventory') }),
    ),

    // Main grid
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 340px', gap:20 } },

      // Left: volume chart + pipeline
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
        // Volume chart
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Monthly Closed Volume'),
              React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'USD · Last 6 months'),
            ),
            React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:DS.gold, fontFamily:'DM Sans,sans-serif' } }, '$94.8M'),
          ),
          React.createElement(MiniBar, { data:barData, height:80 }),
        ),

        // Pipeline health
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 } },
            React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Pipeline — Active Deals'),
            React.createElement('span', { onClick:()=>setScreen('omnichannel'), style:{ fontSize:11, color:DS.gold, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, 'Full Board →'),
          ),
          pipeline.deals.slice(0,5).map(d =>
            React.createElement('div', { key:d.id, style:{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`1px solid ${DS.borderLt}` } },
              React.createElement(TempDot, { temp:d.temp }),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, d.lead),
                React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, d.prop),
              ),
              React.createElement(Badge, { type: d.stage==='Negotiation'?'hot': d.stage==='Offer Sent'?'warm':'neutral' }, d.stage),
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', minWidth:70, textAlign:'right' } },
                `$${(d.value/1e6).toFixed(1)}M`),
            )
          ),
        ),
      ),

      // Middle: hot listings
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 } },
            React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Featured Inventory'),
            React.createElement('span', { onClick:()=>setScreen('inventory'), style:{ fontSize:11, color:DS.gold, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, 'All Properties →'),
          ),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:12 } },
            listings.slice(1,5).map(l =>
              React.createElement('div', { key:l.id, style:{ display:'flex', gap:10, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${DS.borderLt}`, cursor:'pointer' },
                onClick:()=>setScreen('inventory') },
                React.createElement('img', { src:l.photo1, style:{ width:52, height:40, objectFit:'cover', borderRadius:4, flexShrink:0 },
                  onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ flex:1, minWidth:0 } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, l.title),
                  React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${l.neighborhood} · ${l.matchedLeads} leads`),
                ),
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, l.price),
              )
            ),
          ),
        ),

        // Agents
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px 24px' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Agent Performance'),
          agents.map(a =>
            React.createElement('div', { key:a.name, style:{ display:'flex', alignItems:'center', gap:10, marginBottom:10 } },
              React.createElement(Avatar, { initials:a.avatar, color:a.color, size:30 }),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, a.name),
                React.createElement('div', { style:{ display:'flex', gap:4, marginTop:3 } },
                  React.createElement('div', { style:{ flex:1, height:4, borderRadius:2, background:DS.borderLt, overflow:'hidden' } },
                    React.createElement('div', { style:{ width:`${(a.volume/14200000)*100}%`, height:'100%', background:a.color, borderRadius:2 } }),
                  ),
                ),
              ),
              React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, `$${(a.volume/1e6).toFixed(1)}M`),
            )
          ),
        ),
      ),

      // Right: leads + alerts
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
        // Leads requiring action
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, overflow:'hidden' } },
          React.createElement('div', { style:{ padding:'16px 20px', borderBottom:`1px solid ${DS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' } },
            React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Lead Inventory'),
            React.createElement('span', { onClick:()=>setScreen('omnichannel'), style:{ fontSize:11, color:DS.gold, cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, 'All →'),
          ),
          leads.slice(0,6).map(l =>
            React.createElement(LeadRow, { key:l.id, lead:l, onClick:()=>setScreen('omnichannel') }),
          ),
        ),

      ),
    ),

    // ── ADS INTELLIGENCE — Full-width prominent block ─────────────────────
    React.createElement('div', { style:{ marginTop:20, background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:10, overflow:'hidden' } },

      // Navy header with KPIs
      React.createElement('div', { style:{ background:DS.navy, padding:'16px 24px', display:'flex', alignItems:'center', gap:0 } },
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, 'Paid Media · Meta + Google Ads · Mar 22 – Apr 20'),
          React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Ads Intelligence — Mock 30-day window'),
        ),
        [
          { label:'Spend 30d', value:'$22.8K' , color:'rgba(255,255,255,0.9)' },
          { label:'Leads',     value:'187',      color:'#7EC8E3' },
          { label:'Opps',      value:'31',       color:DS.gold },
          { label:'Pipeline',  value:'$18.7M',   color:DS.gold },
          { label:'ROAS',      value:'818x',     color:'#5DBF8A' },
        ].map((k,i) =>
          React.createElement('div', { key:i, style:{ textAlign:'center', padding:'0 18px', borderLeft:'1px solid rgba(255,255,255,0.08)' } },
            React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.3)', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:3 } }, k.label),
            React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, k.value),
          )
        ),
        React.createElement('button', {
          onClick:()=>setScreen('ads'),
          style:{ marginLeft:20, padding:'9px 18px', background:DS.gold, color:DS.navy, border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:800, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', flexShrink:0 }
        }, 'Open Full Module →'),
      ),

      // Alert bar
      React.createElement('div', {
        onClick:()=>setScreen('ads'),
        style:{ background:'#FDE8E8', padding:'9px 24px', display:'flex', gap:10, alignItems:'center', borderBottom:`1px solid rgba(184,41,41,0.15)`, cursor:'pointer' }
      },
        React.createElement('span', null, '⚠️'),
        React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:'#7A1A1A', fontFamily:'DM Sans,sans-serif' } },
          '2 campañas quemando presupuesto — $6.5K/mo en riesgo · C-004 Ocean View Broad y C-008 Buy Property CR. Recomendación: pausar hoy.'),
        React.createElement('span', { style:{ marginLeft:'auto', fontSize:11, color:'#B82929', fontWeight:700, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' } }, 'Ver Recomendaciones →'),
      ),

      // Body: 4 columns
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 220px 240px', gap:0 } },

        // Campaign table
        React.createElement('div', { style:{ gridColumn:'1/3', borderRight:`1px solid ${DS.border}`, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'Campaign Performance'),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 0.6fr 0.6fr 0.6fr 0.6fr 1fr', padding:'5px 0', borderBottom:`1px solid ${DS.border}`, fontSize:9, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
            ['Campaign','Platf','Spend','Leads','CPL','Quality'].map(h => React.createElement('span',{key:h},h)),
          ),
          (() => {
            const ads = window.FBR && window.FBR.ads;
            if (!ads || !ads.campaigns) return null;
            return ads.campaigns.slice(0,6).map(c =>
              React.createElement('div', { key:c.id,
                style:{ display:'grid', gridTemplateColumns:'2fr 0.6fr 0.6fr 0.6fr 0.6fr 1fr', padding:'8px 0', borderBottom:`1px solid ${DS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif', alignItems:'center',
                  background: c.alert&&c.status==='active'?'rgba(184,41,41,0.02)':'transparent',
                  opacity: c.status==='paused'?0.5:1 }
              },
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontWeight:600, color:DS.text, fontSize:11, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:220 } }, c.name),
                  React.createElement('div', { style:{ fontSize:9, color:DS.text3 } }, c.targetCountry),
                ),
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:3 } },
                  React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background: c.platform==='Meta'?'#1877F2':'#EA4335' } }),
                  React.createElement('span', { style:{ fontSize:9, color:DS.text3 } }, c.platform),
                ),
                React.createElement('span', { style:{ fontWeight:700, color:DS.text } }, `$${(c.spend/1000).toFixed(1)}K`),
                React.createElement('span', { style:{ color:DS.navyMid, fontWeight:600 } }, c.leads),
                React.createElement('span', { style:{ fontWeight:700, color: c.cpl>200?'#B82929':c.cpl<120?DS.success:DS.text } }, `$${c.cpl}`),
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:5 } },
                  React.createElement('div', { style:{ flex:1, height:4, background:DS.borderLt, borderRadius:2 } },
                    React.createElement('div', { style:{ width:`${c.qualityScore}%`, height:'100%', background: c.qualityScore>=80?DS.success:c.qualityScore>=50?DS.gold:'#B82929', borderRadius:2 } }),
                  ),
                  React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:DS.text3, minWidth:18 } }, c.qualityScore),
                  c.alert && c.status==='active' && React.createElement('span', null, '⚠'),
                ),
              )
            );
          })(),
        ),

        // Spend chart
        React.createElement('div', { style:{ borderRight:`1px solid ${DS.border}`, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'Spend & Leads · 14d'),
          (() => {
            const ads = window.FBR && window.FBR.ads;
            if (!ads || !ads.daily) return null;
            const last14 = ads.daily.slice(-14);
            const maxS = Math.max(...last14.map(d=>d.spend));
            const maxL = Math.max(...last14.map(d=>d.leads));
            return React.createElement('div', null,
              React.createElement('div', { style:{ display:'flex', alignItems:'flex-end', gap:2, height:80 } },
                last14.map((d,i) =>
                  React.createElement('div', { key:i, style:{ flex:1, display:'flex', gap:1, alignItems:'flex-end', height:'100%' } },
                    React.createElement('div', { style:{ flex:1, background:DS.gold, borderRadius:'2px 2px 0 0', height:`${(d.spend/maxS)*100}%`, minHeight:3, opacity:0.8 } }),
                    React.createElement('div', { style:{ flex:1, background:DS.navyMid, borderRadius:'2px 2px 0 0', height:`${(d.leads/maxL)*100}%`, minHeight:3, opacity:0.7 } }),
                  )
                ),
              ),
              React.createElement('div', { style:{ display:'flex', gap:12, marginTop:8 } },
                [['#C09B57','Spend'],['#163061','Leads']].map(([c,l]) =>
                  React.createElement('div', { key:l, style:{ display:'flex', alignItems:'center', gap:4, fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } },
                    React.createElement('div', { style:{ width:8, height:3, background:c, borderRadius:1 } }), l,
                  )
                ),
              ),
              React.createElement('div', { style:{ marginTop:14 } },
                [{ label:'Meta', pct:62, color:'#1877F2', sub:'$14.2K · 124 leads' },{ label:'Google', pct:38, color:'#EA4335', sub:'$8.6K · 63 leads' }].map(ch =>
                  React.createElement('div', { key:ch.label, style:{ marginBottom:8 } },
                    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:10, fontFamily:'DM Sans,sans-serif', marginBottom:2 } },
                      React.createElement('span', { style:{ color:DS.text, fontWeight:600 } }, ch.label),
                      React.createElement('span', { style:{ color:DS.text3 } }, ch.sub),
                    ),
                    React.createElement('div', { style:{ height:4, background:DS.borderLt, borderRadius:2 } },
                      React.createElement('div', { style:{ width:`${ch.pct}%`, height:'100%', background:ch.color, borderRadius:2 } }),
                    ),
                  )
                ),
              ),
            );
          })(),
        ),

        // Geo + top action
        React.createElement('div', { style:{ padding:'16px 16px' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'Top Markets'),
          [
            { flag:'🇺🇸', country:'USA',     leads:118, cpl:126, pipe:'$13.5M', q:81 },
            { flag:'🇨🇦', country:'Canada',  leads:41,  cpl:120, pipe:'$3.99M', q:79 },
            { flag:'🇩🇪', country:'Germany', leads:4,   cpl:135, pipe:'$7.35M', q:84 },
            { flag:'🇬🇧', country:'UK',      leads:8,   cpl:103, pipe:'$3.82M', q:88 },
          ].map(c =>
            React.createElement('div', { key:c.country, style:{ display:'flex', gap:8, alignItems:'center', padding:'6px 0', borderBottom:`1px solid ${DS.borderLt}` } },
              React.createElement('span', { style:{ fontSize:14 } }, c.flag),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, c.country),
                React.createElement('div', { style:{ fontSize:9, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${c.leads} leads · CPL $${c.cpl}`),
              ),
              React.createElement('div', { style:{ textAlign:'right' } },
                React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif' } }, c.pipe),
                React.createElement('div', { style:{ fontSize:9, fontWeight:600, color: c.q>=80?DS.success:DS.warn, fontFamily:'DM Sans,sans-serif' } }, `Q:${c.q}`),
              ),
            )
          ),
          React.createElement('div', { onClick:()=>setScreen('ads'), style:{ marginTop:12, padding:'8px 10px', background:DS.goldDim, border:`1px solid rgba(192,155,87,0.3)`, borderRadius:6, cursor:'pointer' } },
            React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, '🚀 Top Recommendation'),
            React.createElement('div', { style:{ fontSize:10, color:DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, 'Scale C-006 Luxury Coastal — CTR 6%, CPL $114. Underbudgeted at $120/day.'),
          ),
        ),
      ),
    ),
  );
}

// ─── LEADS INBOX ───────────────────────────────────────────────────────────
function LeadsInbox({ setScreen }) {
  const [sel, setSel] = React.useState(leads[0]);
  const [filter, setFilter] = React.useState('all');
  const filtered = filter==='all' ? leads : leads.filter(l=>l.temp===filter);
  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', background:DS.surface, borderRadius:8, border:`1px solid ${DS.border}`, overflow:'hidden' } },
    // List
    React.createElement('div', { style:{ width:320, borderRight:`1px solid ${DS.border}`, display:'flex', flexDirection:'column' } },
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${DS.border}` } },
        React.createElement('div', { style:{ display:'flex', gap:6, marginBottom:10 } },
          ['all','hot','warm','cold'].map(f =>
            React.createElement('button', { key:f, onClick:()=>setFilter(f), style:{
              padding:'4px 10px', borderRadius:4, border:`1px solid ${filter===f ? DS.gold : DS.border}`,
              background: filter===f ? DS.goldDim : 'transparent', cursor:'pointer',
              fontSize:11, fontWeight:600, color: filter===f ? DS.gold : DS.text2,
              fontFamily:'DM Sans,sans-serif', textTransform:'capitalize'
            } }, f),
          ),
        ),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        filtered.map(l => React.createElement(LeadRow, { key:l.id, lead:l, selected:sel?.id===l.id, onClick:()=>setSel(l) })),
      ),
    ),
    // Detail
    sel && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      // Header
      React.createElement('div', { style:{ padding:'20px 24px', borderBottom:`1px solid ${DS.border}`, display:'flex', gap:16, alignItems:'center' } },
        React.createElement(Avatar, { initials:sel.avatar, color: sel.temp==='hot'?'#B82929':sel.temp==='warm'?'#B87A1A':'#2A5F8F', size:44 }),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, `${sel.flag} ${sel.name}`),
          React.createElement('div', { style:{ fontSize:12, color:DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, `${sel.country} · ${sel.email} · ${sel.phone}`),
          React.createElement('div', { style:{ display:'flex', gap:8, marginTop:8 } },
            React.createElement(Badge, { type:sel.temp }, sel.temp.toUpperCase()),
            React.createElement(Badge, { type:'navy' }, sel.source),
            sel.lastTouch===null && React.createElement(Badge, { type:'danger' }, '⚠ Never Contacted'),
          ),
        ),
        React.createElement('div', { style:{ display:'flex', gap:8 } },
          ['📞 Call','💬 WhatsApp','✉ Email'].map(a =>
            React.createElement('button', { key:a, style:{ padding:'8px 14px', background:DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, a),
          ),
        ),
      ),
      // Body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },
        // Profile
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14, fontFamily:'DM Sans,sans-serif' } }, 'Lead Profile'),
          [
            ['Looking for', sel.looking], ['Budget', sel.budget], ['Zone', sel.zone],
            ['Timeline', sel.timeline], ['Use', sel.use], ['Language', sel.lang],
            ['Agent', sel.agent], ['Source', sel.source],
          ].map(([k,v]) =>
            React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${DS.borderLt}`, fontSize:13, fontFamily:'DM Sans,sans-serif' } },
              React.createElement('span', { style:{ color:DS.text3 } }, k),
              React.createElement('span', { style:{ color:DS.text, fontWeight:600 } }, v),
            )
          ),
          React.createElement('div', { style:{ marginTop:16 } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10, fontFamily:'DM Sans,sans-serif' } }, 'Lead Score'),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12 } },
              React.createElement('div', { style:{ flex:1, height:6, background:DS.borderLt, borderRadius:3 } },
                React.createElement('div', { style:{ width:`${sel.score}%`, height:'100%', background: sel.score>80?DS.success:sel.score>50?DS.warn:DS.danger, borderRadius:3 } }),
              ),
              React.createElement('span', { style:{ fontSize:18, fontWeight:800, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, sel.score),
            ),
          ),
        ),
        // Matched properties
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:14, fontFamily:'DM Sans,sans-serif' } }, 'Matched Properties'),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
            (sel.matched||[]).map(mid => {
              const prop = listings.find(l=>l.id===mid);
              if (!prop) return null;
              return React.createElement('div', { key:mid, style:{ display:'flex', gap:10, background:DS.bg, borderRadius:6, overflow:'hidden', border:`1px solid ${DS.border}` } },
                React.createElement('img', { src:prop.photo1, style:{ width:72, height:56, objectFit:'cover', flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ padding:'8px 10px', flex:1 } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, prop.title),
                  React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, prop.neighborhood),
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif' } }, prop.price),
                ),
              );
            }),
          ),
          // Activity timeline
          React.createElement('div', { style:{ marginTop:20 } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10, fontFamily:'DM Sans,sans-serif' } }, 'Activity'),
            [
              { t:'Lead created via '+sel.source, when:'Entry', icon:'⬡' },
              sel.lastTouch && { t:'Last agent touch: '+sel.agent, when:sel.lastTouch+' ago', icon:'📞' },
              sel.temp==='hot' && { t:'High engagement detected', when:'Auto-scored 88+', icon:'🔥' },
            ].filter(Boolean).map((a,i) =>
              React.createElement('div', { key:i, style:{ display:'flex', gap:10, marginBottom:10, fontSize:12, fontFamily:'DM Sans,sans-serif', color:DS.text2 } },
                React.createElement('span', null, a.icon),
                React.createElement('div', null,
                  React.createElement('div', null, a.t),
                  React.createElement('div', { style:{ fontSize:10, color:DS.text3 } }, a.when),
                ),
              )
            ),
          ),
        ),
      ),
    ),
  );
}

// ─── PIPELINE KANBAN ───────────────────────────────────────────────────────
function Pipeline() {
  const stages = pipeline.stages.slice(0,-1); // exclude Closed Won from board
  const byStage = s => pipeline.deals.filter(d=>d.stage===s);
  const stageTotal = s => byStage(s).reduce((a,d)=>a+d.value,0);
  return React.createElement('div', { style:{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8, height:'calc(100vh-136px)', minHeight:500 } },
    stages.map(stage =>
      React.createElement('div', { key:stage, style:{ minWidth:220, width:220, flexShrink:0, display:'flex', flexDirection:'column', gap:8 } },
        // Column header
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'12px 14px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, stage),
          React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } },
            `${byStage(stage).length} deal${byStage(stage).length!==1?'s':''} · $${(stageTotal(stage)/1e6).toFixed(1)}M`),
        ),
        // Cards
        byStage(stage).map(d =>
          React.createElement('div', { key:d.id, style:{
            background:DS.surface, border:`1px solid ${d.temp==='hot'?'#F87171':d.temp==='warm'?'#FBBF24':DS.border}`,
            borderRadius:8, padding:'14px', cursor:'pointer',
            boxShadow:'0 1px 4px rgba(0,0,0,0.04)',
          } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 } },
              React.createElement(TempDot, { temp:d.temp }),
              React.createElement('span', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, d.days===0?'Today':`${d.days}d`),
            ),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, d.lead),
            React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, d.prop),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(d.value/1e6).toFixed(1)}M`),
              React.createElement(Avatar, { initials:d.agent.split(' ').map(w=>w[0]).join(''), color:DS.navyMid, size:24 }),
            ),
          )
        ),
      )
    ),
  );
}

// ─── INVENTORY LIST ────────────────────────────────────────────────────────
function Inventory({ setScreen, setSelectedProp }) {
  const [view, setView] = React.useState('grid');
  const [typeFilter, setTypeFilter] = React.useState('All');
  const types = ['All','Home','Condo','Land'];
  const filtered = typeFilter==='All' ? listings : listings.filter(l=>l.type.includes(typeFilter));

  return React.createElement('div', null,
    // Toolbar
    React.createElement('div', { style:{ display:'flex', gap:10, marginBottom:20, alignItems:'center' } },
      React.createElement('div', { style:{ display:'flex', gap:6 } },
        types.map(t => React.createElement('button', { key:t, onClick:()=>setTypeFilter(t), style:{
          padding:'6px 14px', borderRadius:6, border:`1px solid ${typeFilter===t?DS.gold:DS.border}`,
          background: typeFilter===t?DS.goldDim:'white', cursor:'pointer',
          fontSize:12, fontWeight:600, color:typeFilter===t?DS.gold:DS.text2, fontFamily:'DM Sans,sans-serif'
        } }, t)),
      ),
      React.createElement('div', { style:{ marginLeft:'auto', display:'flex', gap:6 } },
        ['grid','list'].map(v => React.createElement('button', { key:v, onClick:()=>setView(v), style:{
          padding:'6px 12px', borderRadius:6, border:`1px solid ${view===v?DS.gold:DS.border}`,
          background: view===v?DS.navy:'white', cursor:'pointer',
          fontSize:12, color:view===v?'white':DS.text2, fontFamily:'DM Sans,sans-serif'
        } }, v==='grid'?'⊞ Grid':'☰ List')),

      ),
    ),
    view==='grid'
      ? React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 } },
          filtered.map(l => React.createElement(PropCard, { key:l.id, listing:l, onClick:()=>{ setSelectedProp(l); setScreen('propdetail'); } })),
        )
      : React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, overflow:'hidden' } },
          // Table header
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1fr 0.7fr 0.7fr 1fr 1fr 0.8fr', padding:'10px 16px', background:DS.bg, borderBottom:`1px solid ${DS.border}`, fontSize:10, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
            ['Property','Zone','Beds','Baths','Price','Status','Days'].map(h => React.createElement('span',{key:h},h)),
          ),
          filtered.map(l =>
            React.createElement('div', { key:l.id, onClick:()=>{ setSelectedProp(l); setScreen('propdetail'); },
              style:{ display:'grid', gridTemplateColumns:'2fr 1fr 0.7fr 0.7fr 1fr 1fr 0.8fr', padding:'12px 16px', borderBottom:`1px solid ${DS.borderLt}`, cursor:'pointer', fontSize:13, fontFamily:'DM Sans,sans-serif', alignItems:'center' } },
              React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
                React.createElement('img', { src:l.photo1, style:{ width:48, height:36, objectFit:'cover', borderRadius:4 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontWeight:600, color:DS.text } }, l.title),
                  React.createElement('div', { style:{ fontSize:11, color:DS.text3 } }, l.id),
                ),
              ),
              React.createElement('span', { style:{ color:DS.text2 } }, l.neighborhood),
              React.createElement('span', { style:{ color:DS.text2 } }, l.beds||'—'),
              React.createElement('span', { style:{ color:DS.text2 } }, l.baths||'—'),
              React.createElement('span', { style:{ fontWeight:700, color:DS.gold } }, l.price),
              React.createElement(Badge, { type:'active' }, l.status),
              React.createElement('span', { style:{ color:DS.text2 } }, `${l.daysOnMarket}d`),
            )
          ),
        ),
  );
}

// ─── PROPERTY DETAIL ───────────────────────────────────────────────────────
function PropertyDetail({ prop, setScreen }) {
  const [imgIdx, setImgIdx] = React.useState(0);
  if (!prop) return null;
  const imgs = [prop.photo1, prop.photo2].filter(Boolean);
  return React.createElement('div', null,
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, marginBottom:20 } },
      React.createElement('button', { onClick:()=>setScreen('inventory'), style:{ background:'none', border:'none', cursor:'pointer', color:DS.text3, fontSize:13, fontFamily:'DM Sans,sans-serif' } }, '← Back to Inventory'),
    ),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 360px', gap:24 } },
      // Left
      React.createElement('div', null,
        // Gallery
        React.createElement('div', { style:{ borderRadius:10, overflow:'hidden', marginBottom:16, position:'relative' } },
          React.createElement('img', { src:imgs[imgIdx], style:{ width:'100%', height:380, objectFit:'cover' }, onError:e=>e.target.src=imgs[1-imgIdx] }),
          imgs.length>1 && React.createElement('div', { style:{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6 } },
            imgs.map((_,i) => React.createElement('div', { key:i, onClick:()=>setImgIdx(i), style:{ width:32, height:4, borderRadius:2, background: i===imgIdx?DS.gold:'rgba(255,255,255,0.5)', cursor:'pointer' } })),
          ),
        ),
        imgs.length>1 && React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:20 } },
          imgs.map((img,i) => React.createElement('img', { key:i, src:img, onClick:()=>setImgIdx(i), style:{ width:80, height:60, objectFit:'cover', borderRadius:6, cursor:'pointer', border:`2px solid ${i===imgIdx?DS.gold:'transparent'}` }, onError:e=>e.target.style.display='none' })),
        ),
        // Description
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'24px' } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'About This Property'),
          React.createElement('div', { style:{ fontSize:22, fontWeight:300, color:DS.navyMid, fontFamily:'Cormorant Garamond, Georgia, serif', lineHeight:1.3, marginBottom:12 } }, prop.headline),
          React.createElement('div', { style:{ fontSize:13, color:DS.text2, lineHeight:1.8, fontFamily:'DM Sans,sans-serif' } }, prop.about),
        ),
      ),
      // Right sidebar
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
        // Price & key stats
        React.createElement('div', { style:{ background:DS.navy, borderRadius:8, padding:'24px' } },
          React.createElement('div', { style:{ fontSize:28, fontWeight:800, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, prop.price),
          React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif', marginBottom:20 } }, `${prop.id} · ${prop.neighborhood}`),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 } },
            [
              ['Type', prop.type], ['Status', prop.status],
              ['Beds', prop.beds||'—'], ['Baths', prop.baths||'—'],
              ['Living Area', prop.sqft ? prop.sqft.toLocaleString()+' ft²' : '—'],
              ['Lot', prop.lot||'—'],
              ['On Market', `${prop.daysOnMarket}d`],
              ['$/ft²', prop.pricePerSqft ? '$'+prop.pricePerSqft.toLocaleString() : '—'],
            ].map(([k,v]) =>
              React.createElement('div', { key:k },
                React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.06em' } }, k),
                React.createElement('div', { style:{ fontSize:13, color:'rgba(255,255,255,0.9)', fontWeight:600, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, v),
              )
            ),
          ),
        ),
        // Matched leads
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, `${prop.matchedLeads} Matched Leads`),
          leads.filter(l=>(l.matched||[]).includes(prop.id)).map(l =>
            React.createElement('div', { key:l.id, style:{ display:'flex', gap:8, alignItems:'center', padding:'6px 0', borderBottom:`1px solid ${DS.borderLt}` } },
              React.createElement(TempDot, { temp:l.temp }),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, l.name),
                React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, l.budget),
              ),
              React.createElement(Badge, { type:l.temp, small:true }, l.temp),
            )
          ),
        ),
        // Agent
        React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'20px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Listing Agent'),
          React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
            React.createElement(Avatar, { initials:prop.agent.split(' ').map(w=>w[0]).join(''), color:DS.gold, size:40 }),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, prop.agent),
              React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Acme Realty'),
            ),
          ),
        ),
      ),
    ),
  );
}

// ─── AI ASSISTANT (ChatGPT-style for business/app questions) ──────────────
function AIAssistant() {
  const [msgs, setMsgs] = React.useState([
    { role:'assistant', text:'Hi! I\'m your AI assistant. I can help you with questions about the platform, your data, analytics, or business strategy. What would you like to know?' },
  ]);
  const [input, setInput] = React.useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role:'user', text:input.trim() };
    setMsgs(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      const responses = [
        'Based on your current data, you have 8 active leads with a combined pipeline value of $18.7M. The top 3 leads (score 90+) account for $12.4M of that value.',
        'Your Ads Intelligence shows a 818x ROAS over the last 30 days. Meta campaigns are outperforming Google with a 4.2% CTR vs 2.8%. Consider scaling the "Luxury Coastal" campaign — it has the lowest CPL at $114.',
        'Looking at your inventory, the average days on market is 47 days. Properties in Bay Heights are moving fastest (28 days avg), while Stone Ridge properties are sitting longer (68 days). You might want to review pricing for AR-003 and AR-007.',
        'Your sales pipeline shows 8 active deals across 7 stages. 3 are in negotiation (total value $8.2M). The conversion rate from qualified lead to closed deal is 18.4%, which is solid for luxury real estate.',
        'Content Manager shows Instagram is your best-performing platform with 4.2% engagement rate. Your "Market Insights" campaign has generated 47K reach. Consider publishing more educational content — it\'s driving 2x engagement vs listing posts.',
      ];
      const aiMsg = { role:'assistant', text:responses[Math.floor(Math.random()*responses.length)] };
      setMsgs(prev => [...prev, aiMsg]);
    }, 800);
  };

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'calc(100vh - 120px)', maxWidth:900, margin:'0 auto' } },
    React.createElement('div', { style:{ padding:'20px 24px', background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:'8px 8px 0 0', borderBottom:'none' } },
      React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, '🤖 AI Assistant'),
      React.createElement('div', { style:{ fontSize:13, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Ask me anything about your platform, data, analytics, or business strategy.'),
    ),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'24px', background:'#FAFAF8', border:`1px solid ${DS.border}`, borderTop:'none', borderBottom:'none', display:'flex', flexDirection:'column', gap:16 } },
      msgs.map((m,i) => {
        const isUser = m.role === 'user';
        return React.createElement('div', { key:i, style:{ display:'flex', justifyContent:isUser?'flex-end':'flex-start', gap:12 } },
          !isUser && React.createElement('div', { style:{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, color:'#fff', flexShrink:0 } }, '🤖'),
          React.createElement('div', {
            style:{ maxWidth:'75%', padding:'12px 16px', borderRadius:isUser?'16px 4px 16px 16px':'4px 16px 16px 16px',
              background:isUser?DS.navy:'#fff', border:isUser?'none':`1px solid ${DS.border}`,
              color:isUser?'#fff':DS.text, fontSize:14, fontFamily:'DM Sans,sans-serif', lineHeight:1.6,
              boxShadow:isUser?'none':'0 1px 3px rgba(0,0,0,0.06)' }
          }, m.text),
          isUser && React.createElement('div', { style:{ width:36, height:36, borderRadius:'50%', background:DS.gold, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, color:'#fff', fontWeight:700, flexShrink:0, fontFamily:'DM Sans,sans-serif' } }, 'U'),
        );
      }),
    ),
    React.createElement('div', { style:{ padding:'16px 24px', background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:'0 0 8px 8px', borderTop:'none' } },
      React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'center' } },
        React.createElement('input', {
          value:input, onChange:e=>setInput(e.target.value),
          onKeyDown:e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); handleSend(); }},
          placeholder:'Ask me anything about your data, analytics, or business strategy…',
          style:{ flex:1, padding:'11px 16px', border:`1px solid ${DS.border}`, borderRadius:8, fontSize:14, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#fff' }
        }),
        React.createElement('button', {
          onClick:handleSend, disabled:!input.trim(),
          style:{ padding:'11px 24px', background:input.trim()?DS.navy:DS.bg, color:input.trim()?'#fff':DS.text3, border:'none', borderRadius:8, cursor:input.trim()?'pointer':'not-allowed', fontSize:14, fontWeight:700, fontFamily:'DM Sans,sans-serif', transition:'background 0.15s' }
        }, 'Send'),
      ),
      React.createElement('div', { style:{ fontSize:11, color:DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:10 } },
        'Try: "What\'s my pipeline status?" • "Which campaigns are performing best?" • "Show me inventory insights"',
      ),
    ),
  );
}

// ─── BRANDING SETTINGS ─────────────────────────────────────────────────────
function BrandingSettings() {
  const [primary, setPrimary] = React.useState('#C09B57');
  const [brandName, setBrandName] = React.useState('Acme Realty');
  const [mktName, setMktName] = React.useState('Coastal Region');
  return React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 } },
    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
      React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:20 } }, 'Brand Identity'),
        [
          { label:'Brand Name', val:brandName, set:setBrandName },
          { label:'Primary Market', val:mktName, set:setMktName },
        ].map(f =>
          React.createElement('div', { key:f.label, style:{ marginBottom:16 } },
            React.createElement('label', { style:{ fontSize:11, fontWeight:600, color:DS.text3, fontFamily:'DM Sans,sans-serif', display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em' } }, f.label),
            React.createElement('input', { value:f.val, onChange:e=>f.set(e.target.value), style:{ width:'100%', padding:'9px 12px', border:`1px solid ${DS.border}`, borderRadius:6, fontSize:13, fontFamily:'DM Sans,sans-serif', outline:'none', boxSizing:'border-box' } }),
          )
        ),
        React.createElement('div', { style:{ marginBottom:16 } },
          React.createElement('label', { style:{ fontSize:11, fontWeight:600, color:DS.text3, fontFamily:'DM Sans,sans-serif', display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.08em' } }, 'Accent Color'),
          React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
            ['#C09B57','#163061','#2B6E4A','#8B4B8B','#1A6B8A','#C0392B'].map(c =>
              React.createElement('div', { key:c, onClick:()=>setPrimary(c), style:{
                width:32, height:32, borderRadius:'50%', background:c, cursor:'pointer',
                border:`3px solid ${primary===c ? DS.text : 'transparent'}`, transition:'border 0.2s'
              } })
            ),
          ),
        ),
      ),
      React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Module Names'),
        [['Leads Inbox','Leads Inbox'],['Pipeline','Pipeline'],['Properties','Properties'],['AI Assistant','AI Assistant']].map(([orig,cur]) =>
          React.createElement('div', { key:orig, style:{ marginBottom:10 } },
            React.createElement('label', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif', display:'block', marginBottom:4 } }, orig),
            React.createElement('input', { defaultValue:cur, style:{ width:'100%', padding:'7px 10px', border:`1px solid ${DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', boxSizing:'border-box' } }),
          )
        ),
      ),
    ),
    // Preview
    React.createElement('div', null,
      React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'24px', marginBottom:16 } },
        React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:16, fontFamily:'DM Sans,sans-serif' } }, 'Live Preview'),
        // Mini sidebar preview
        React.createElement('div', { style:{ borderRadius:6, overflow:'hidden', border:`1px solid ${DS.border}`, display:'flex', height:200 } },
          React.createElement('div', { style:{ width:120, background:DS.navy, padding:'12px', display:'flex', flexDirection:'column', gap:8 } },
            React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center', marginBottom:8 } },
              React.createElement('div', { style:{ width:20, height:20, background:primary, borderRadius:3 } }),
              React.createElement('span', { style:{ fontSize:10, color:'#fff', fontFamily:'DM Sans,sans-serif', fontWeight:700, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, brandName.split(' ')[0]),
            ),
            ['Dashboard','Leads','Properties','Intelligence'].map(item =>
              React.createElement('div', { key:item, style:{ fontSize:9, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif', padding:'4px 6px', borderRadius:3 } }, item),
            ),
          ),
          React.createElement('div', { style:{ flex:1, background:DS.bg, padding:'12px', display:'flex', flexDirection:'column', gap:8 } },
            React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, brandName),
            React.createElement('div', { style:{ fontSize:9, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, mktName),
            React.createElement('div', { style:{ display:'flex', gap:6 } },
              React.createElement('div', { style:{ background:primary, borderRadius:3, padding:'4px 8px', fontSize:9, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Primary CTA'),
              React.createElement('div', { style:{ background:DS.navy, borderRadius:3, padding:'4px 8px', fontSize:9, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Secondary'),
            ),
          ),
        ),
      ),
      React.createElement('div', { style:{ background:DS.surface, border:`1px solid ${DS.border}`, borderRadius:8, padding:'24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'System Configuration'),
        [['Currency','USD — US Dollar'],['Language','English / Español'],['Timezone','UTC−06:00 (Mock)'],['Users','15 active'],['AI Tone','Professional & Bilingual'],['Lead SLA','48h first contact']].map(([k,v]) =>
          React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${DS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ color:DS.text3 } }, k),
            React.createElement('span', { style:{ color:DS.text, fontWeight:600 } }, v),
          )
        ),
        React.createElement('button', { style:{ marginTop:16, padding:'10px 20px', background:DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'DM Sans,sans-serif' } }, 'Save Configuration'),
      ),
    ),
  );
}

// ─── MAP VIEW (Leaflet) ────────────────────────────────────────────────────
function MapView({ mode='inventory', setScreen, setSelectedProp }) {
  const mapRef = React.useRef(null);
  const leafletRef = React.useRef(null);
  const [selZone, setSelZone] = React.useState(null);
  const [activeLayer, setActiveLayer] = React.useState('properties');

  React.useEffect(() => {
    if (!window.L) return;
    if (leafletRef.current) { leafletRef.current.remove(); }
    const L = window.L;
    const map = L.map(mapRef.current, { zoomControl:false, attributionControl:true }).setView([10.38, -85.82], 11);
    L.control.zoom({ position:'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:'© OpenStreetMap © CARTO', subdomains:'abcd', maxZoom:19
    }).addTo(map);

    const goldIcon = (label, count) => L.divIcon({
      className:'', iconAnchor:[16,16],
      html:`<div style="background:#C09B57;color:#0F2340;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;font-family:DM Sans,sans-serif;box-shadow:0 2px 12px rgba(192,155,87,0.5);border:2px solid #fff;">${count}</div>`
    });
    const leadIcon = (temp) => {
      const c = temp==='hot'?'#C0392B':temp==='warm'?'#D4881A':'#7A9EC0';
      return L.divIcon({ className:'', iconAnchor:[8,8], html:`<div style="background:${c};width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 6px ${c}80;"></div>` });
    };

    if (mode==='inventory' || mode==='both') {
      listings.forEach(l => {
        const marker = L.marker([l.lat, l.lng], { icon: goldIcon(l.title, 1) }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:DM Sans,sans-serif;min-width:200px;">
            <img src="${l.photo1}" style="width:100%;height:110px;object-fit:cover;border-radius:4px 4px 0 0;" onerror="this.style.display='none'"/>
            <div style="padding:10px;">
              <div style="font-weight:700;font-size:13px;color:#1A1814;margin-bottom:2px;">${l.title}</div>
              <div style="font-size:11px;color:#9C948A;margin-bottom:6px;">${l.neighborhood}</div>
              <div style="font-size:14px;font-weight:800;color:#C09B57;">${l.price}</div>
              ${l.beds ? `<div style="font-size:11px;color:#5C5650;margin-top:4px;">${l.beds}bd · ${l.baths}ba · ${l.sqft?.toLocaleString()||''}ft²</div>` : ''}
            </div>
          </div>
        `, { maxWidth:220 });
      });
    }
    if (mode==='leads' || mode==='both') {
      leads.forEach(l => {
        const zoneCoords = market.zones.find(z=>z.name===l.zone) || market.zones[0];
        const jitter = [(Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02];
        const marker = L.marker([zoneCoords.lat+jitter[0], zoneCoords.lng+jitter[1]], { icon: leadIcon(l.temp) }).addTo(map);
        marker.bindPopup(`
          <div style="font-family:DM Sans,sans-serif;min-width:160px;padding:8px;">
            <div style="font-weight:700;font-size:13px;color:#1A1814;">${l.flag} ${l.name}</div>
            <div style="font-size:11px;color:#9C948A;margin-bottom:6px;">${l.looking}</div>
            <div style="font-size:12px;color:#C09B57;font-weight:600;">${l.budget}</div>
            <div style="font-size:11px;color:#5C5650;margin-top:4px;">${l.temp.toUpperCase()} · ${l.zone}</div>
          </div>
        `, { maxWidth:200 });
      });
    }
    // Zone circles
    market.zones.forEach(z => {
      const r = z.demand * 400;
      L.circle([z.lat, z.lng], { radius:r, color: z.priceChg.startsWith('+')?'#C09B57':'#B82929', fillColor: z.priceChg.startsWith('+')?'#C09B57':'#B82929', fillOpacity:0.06, weight:1, opacity:0.3 }).addTo(map);
    });

    leafletRef.current = map;
    return () => { if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current = null; } };
  }, [mode]);

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', borderRadius:8, overflow:'hidden', border:`1px solid ${DS.border}` } },
    // Sidebar
    React.createElement('div', { style:{ width:280, background:DS.surface, borderRight:`1px solid ${DS.border}`, display:'flex', flexDirection:'column', overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${DS.border}` } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, mode==='leads'?'Leads Map':'Inventory Map'),
        React.createElement('div', { style:{ display:'flex', gap:6, flexWrap:'wrap' } },
          [['properties','Props'],['leads','Leads'],['heatmap','Zones']].map(([k,l]) =>
            React.createElement('button', { key:k, onClick:()=>setActiveLayer(k), style:{
              padding:'4px 10px', borderRadius:4, border:`1px solid ${activeLayer===k?DS.gold:DS.border}`,
              background: activeLayer===k?DS.goldDim:'transparent', cursor:'pointer',
              fontSize:11, fontWeight:600, color:activeLayer===k?DS.gold:DS.text2, fontFamily:'DM Sans,sans-serif'
            } }, l),
          ),
        ),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        (mode==='leads' ? leads : listings).map((item,i) => {
          const isLead = 'temp' in item;
          return React.createElement('div', { key:i, onClick:()=>{ if(!isLead){setSelectedProp(item);setScreen('propdetail');} },
            style:{ display:'flex', gap:10, padding:'10px 14px', borderBottom:`1px solid ${DS.borderLt}`, cursor:'pointer' } },
            isLead
              ? React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', width:'100%' } },
                  React.createElement(TempDot, { temp:item.temp }),
                  React.createElement('div', { style:{ flex:1 } },
                    React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif' } }, `${item.flag} ${item.name}`),
                    React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${item.budget} · ${item.zone}`),
                  ),
                )
              : React.createElement(React.Fragment, null,
                  React.createElement('img', { src:item.photo1, style:{ width:44, height:34, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                  React.createElement('div', { style:{ flex:1, minWidth:0 } },
                    React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, item.title),
                    React.createElement('div', { style:{ fontSize:10, color:DS.text3, fontFamily:'DM Sans,sans-serif' } }, item.neighborhood),
                    React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:DS.gold, fontFamily:'DM Sans,sans-serif' } }, item.price),
                  ),
                ),
          );
        }),
      ),
    ),
    // Map
    React.createElement('div', { ref:mapRef, style:{ flex:1 } }),
  );
}

// ─── PLACEHOLDER for other screens ─────────────────────────────────────────
function PlaceholderScreen({ title }) {
  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:400, color:DS.text3, fontFamily:'DM Sans,sans-serif' } },
    React.createElement('div', { style:{ fontSize:40, marginBottom:16 } }, '◎'),
    React.createElement('div', { style:{ fontSize:16, fontWeight:600 } }, title),
    React.createElement('div', { style:{ fontSize:13, marginTop:8 } }, 'This module is part of the full platform.'),
  );
}

Object.assign(window, { Dashboard, LeadsInbox, Pipeline, Inventory, PropertyDetail, MapView, AIAssistant, BrandingSettings, PlaceholderScreen, MiniBar, DonutChart });
