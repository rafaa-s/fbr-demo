// FBR Platform — 4 Core Modules (Production Quality)
// Pipeline · Activities · Offers & Closings · Omnichannel Inbox
// Depends on: fbr-data.js, fbr-ui.jsx

const { listings, leads, market, pipeline, agents } = window.FBR;
// Note: activities, offers, closings, inbox are accessed lazily inside components
// to avoid undefined destructuring at script evaluation time.
const _DS = window.DS;
const _Badge = window.Badge;
const _TempDot = window.TempDot;
const _Avatar = window.Avatar;
const _Kpi = window.Kpi;

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────

function ChannelIcon({ ch, size=16 }) {
  const map = {
    whatsapp: { bg:'#25D366', label:'W', title:'WhatsApp' },
    email:    { bg:'#163061', label:'@', title:'Email' },
    web:      { bg:'#C09B57', label:'⬡', title:'Web Chat' },
    phone:    { bg:'#5C5650', label:'☎', title:'Phone' },
    ai:       { bg:'#8B4B8B', label:'◆', title:'AI' },
    note:     { bg:'#9C948A', label:'✎', title:'Note' },
    sms:      { bg:'#2B6E4A', label:'✉', title:'SMS' },
  };
  const c = map[ch] || map.note;
  return React.createElement('div', {
    title: c.title,
    style:{ width:size, height:size, borderRadius:'50%', background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.5, color:'#fff', fontWeight:700, fontFamily:'DM Sans,sans-serif', flexShrink:0 }
  }, c.label);
}

function ActivityIcon({ type, size=32 }) {
  const map = {
    call:     { bg:'#E3F2EA', color:'#2B6E4A', icon:'☎' },
    whatsapp: { bg:'#E8F8EE', color:'#25D366', icon:'W' },
    email:    { bg:'rgba(22,48,97,0.08)', color:'#163061', icon:'@' },
    visit:    { bg:'rgba(192,155,87,0.12)', color:'#B87A1A', icon:'◎' },
    note:     { bg:'#F0EDE8', color:'#9C948A', icon:'✎' },
  };
  const s = map[type] || map.note;
  return React.createElement('div', {
    style:{ width:size, height:size, borderRadius:8, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:size*0.38, color:s.color, fontWeight:700, flexShrink:0 }
  }, s.icon);
}

function StatusPill({ status }) {
  const map = {
    done:      { bg:'#E3F2EA', color:'#2B6E4A', label:'Done' },
    pending:   { bg:'rgba(192,155,87,0.12)', color:'#B87A1A', label:'Pending' },
    scheduled: { bg:'rgba(22,48,97,0.08)', color:'#163061', label:'Scheduled' },
    overdue:   { bg:'#FDE8E8', color:'#B82929', label:'⚠ Overdue' },
  };
  const s = map[status] || map.pending;
  return React.createElement('span', {
    style:{ background:s.bg, color:s.color, fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:4, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.05em', textTransform:'uppercase', whiteSpace:'nowrap' }
  }, s.label);
}

function OfferStatusBadge({ status }) {
  const map = {
    negotiation: { bg:'rgba(192,155,87,0.12)', color:'#B87A1A', label:'In Negotiation' },
    countered:   { bg:'rgba(22,48,97,0.08)', color:'#163061', label:'Counter Sent' },
    stalled:     { bg:'#FDE8E8', color:'#B82929', label:'⚠ Stalled' },
    'pre-offer': { bg:'#F0EDE8', color:'#9C948A', label:'Pre-Offer' },
    accepted:    { bg:'#E3F2EA', color:'#2B6E4A', label:'✓ Accepted' },
    rejected:    { bg:'#FDE8E8', color:'#B82929', label:'✗ Rejected' },
  };
  const s = map[status] || map['pre-offer'];
  return React.createElement('span', {
    style:{ background:s.bg, color:s.color, fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:5, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.04em', whiteSpace:'nowrap' }
  }, s.label);
}

function ClosingStep({ label, done, active }) {
  return React.createElement('div', {
    style:{ display:'flex', alignItems:'center', gap:8, padding:'6px 0' }
  },
    React.createElement('div', {
      style:{ width:20, height:20, borderRadius:'50%', flexShrink:0,
        background: done ? _DS.success : active ? _DS.gold : _DS.borderLt,
        display:'flex', alignItems:'center', justifyContent:'center',
        border: active ? `2px solid ${_DS.gold}` : 'none',
      }
    },
      done ? React.createElement('span', { style:{ color:'#fff', fontSize:11, fontWeight:700 } }, '✓') : null,
    ),
    React.createElement('span', { style:{ fontSize:12, fontFamily:'DM Sans,sans-serif', color: done ? _DS.text : active ? _DS.text : _DS.text3, fontWeight: active||done ? 600 : 400 } }, label),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE 1 — PIPELINE (Centro de Oportunidades)
// ═══════════════════════════════════════════════════════════════════════════════

function Pipeline() {
  const [selDeal, setSelDeal] = React.useState(pipeline.deals[0]);
  const stages = pipeline.stages.slice(0, -1);

  const totalPipeline = pipeline.deals.reduce((a, d) => a + d.value, 0);
  const hotDeals = pipeline.deals.filter(d => d.temp === 'hot').length;
  const avgDays = Math.round(pipeline.deals.reduce((a, d) => a + d.days, 0) / pipeline.deals.length);

  const stageDeals = s => pipeline.deals.filter(d => d.stage === s);
  const stageVal = s => stageDeals(s).reduce((a, d) => a + d.value, 0);

  // Funnel widths
  const maxStageVal = Math.max(...stages.map(s => stageVal(s) || 1));

  const dealLead = d => leads.find(l => l.name.includes(d.lead.split(' ')[0]));
  const dealProp = d => listings.find(l => l.title.includes(d.prop.split(' ')[0]) || l.id === d.propId);

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },

    // ── LEFT: Funnel + Kanban ────────────────────────────────────────────────
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', borderRight:`1px solid ${_DS.border}` } },

      // Header KPIs
      React.createElement('div', {
        style:{ padding:'16px 20px', background:_DS.surface, borderBottom:`1px solid ${_DS.border}`,
          display:'flex', gap:0, flexShrink:0 }
      },
        [
          { label:'Pipeline Total', value:`$${(totalPipeline/1e6).toFixed(1)}M`, color:_DS.gold },
          { label:'Active Deals', value:pipeline.deals.length, color:_DS.text },
          { label:'Hot Deals', value:hotDeals, color:'#B82929' },
          { label:'Avg Days in Stage', value:`${avgDays}d`, color:_DS.text2 },
        ].map((k, i) =>
          React.createElement('div', { key:i, style:{ flex:1, padding:'0 20px', borderLeft: i>0?`1px solid ${_DS.borderLt}`:'none' } },
            React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, k.label),
            React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif' } }, k.value),
          )
        ),
      ),

      // Stage funnel bar
      React.createElement('div', {
        style:{ padding:'10px 20px', background:_DS.bg, borderBottom:`1px solid ${_DS.borderLt}`,
          display:'flex', gap:2, alignItems:'flex-end', flexShrink:0, overflowX:'auto' }
      },
        stages.map(s => {
          const cnt = stageDeals(s).length;
          const val = stageVal(s);
          const w = Math.max(8, (val / maxStageVal) * 100);
          const isActive = selDeal && selDeal.stage === s;
          return React.createElement('div', { key:s, style:{ flex:1, minWidth:60 } },
            React.createElement('div', { style:{ height:28, background: isActive ? _DS.gold : _DS.navyMid, borderRadius:'3px 3px 0 0', opacity: cnt===0?0.2:1, transition:'background 0.2s', position:'relative', overflow:'hidden' } },
              React.createElement('div', { style:{ position:'absolute', inset:0, background:'rgba(255,255,255,0.08)' } }),
            ),
            React.createElement('div', { style:{ marginTop:3, textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color: isActive?_DS.gold:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, s),
              React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, cnt ? `${cnt} · $${(val/1e6).toFixed(1)}M` : '—'),
            ),
          );
        }),
      ),

      // Kanban board
      React.createElement('div', { style:{ flex:1, overflowX:'auto', overflowY:'hidden', display:'flex', gap:0, padding:'0' } },
        stages.map((stage, si) =>
          React.createElement('div', { key:stage, style:{ minWidth:200, width:200, flexShrink:0, borderRight:`1px solid ${_DS.borderLt}`, display:'flex', flexDirection:'column', overflow:'hidden' } },
            React.createElement('div', { style:{ padding:'10px 12px', borderBottom:`1px solid ${_DS.borderLt}`, background:_DS.bg, flexShrink:0 } },
              React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, stage),
            ),
            React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'8px', display:'flex', flexDirection:'column', gap:6 } },
              stageDeals(stage).map(d =>
                React.createElement('div', { key:d.id, onClick:()=>setSelDeal(d),
                  style:{
                    background:_DS.surface, borderRadius:6, padding:'10px 12px', cursor:'pointer',
                    border:`1px solid ${selDeal?.id===d.id ? _DS.gold : d.temp==='hot'?'rgba(184,41,41,0.3)':d.temp==='warm'?'rgba(212,136,26,0.25)':_DS.borderLt}`,
                    boxShadow: selDeal?.id===d.id ? `0 0 0 2px ${_DS.goldDim}` : '0 1px 3px rgba(0,0,0,0.04)',
                    transition:'all 0.15s',
                  }
                },
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 } },
                    React.createElement(_TempDot, { temp:d.temp }),
                    React.createElement('span', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, d.days===0?'Today':`${d.days}d`),
                  ),
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2, lineHeight:1.3 } }, d.lead),
                  React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:8, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, d.prop),
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
                    React.createElement('span', { style:{ fontSize:13, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(d.value/1e6).toFixed(1)}M`),
                    React.createElement(_Avatar, { initials:d.agent.split(' ').map(w=>w[0]).join(''), size:20, color:_DS.navyMid }),
                  ),
                )
              ),
              stageDeals(stage).length === 0 && React.createElement('div', { style:{ textAlign:'center', padding:'24px 0', fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, '—'),
            ),
          )
        ),
      ),
    ),

    // ── RIGHT: Deal Detail Panel ─────────────────────────────────────────────
    selDeal && React.createElement('div', {
      style:{ width:360, background:_DS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 }
    },
      // Deal header
      React.createElement('div', { style:{ background:_DS.navy, padding:'20px 20px 16px', flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:6 } }, 'Deal Center'),
        React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, selDeal.lead),
        React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, selDeal.prop),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
          React.createElement('div', { style:{ fontSize:26, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(selDeal.value/1e6).toFixed(2)}M`),
          React.createElement('div', { style:{ display:'flex', gap:6 } },
            React.createElement(_Badge, { type:selDeal.temp }, selDeal.temp.toUpperCase()),
            selDeal.days > 0 && React.createElement('span', { style:{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', alignSelf:'center' } }, `${selDeal.days}d`),
          ),
        ),
      ),
      // Stage progress
      React.createElement('div', { style:{ padding:'12px 16px', borderBottom:`1px solid ${_DS.borderLt}`, background:_DS.bg, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:0, position:'relative' } },
          stages.map((s, i) => {
            const idx = stages.indexOf(selDeal.stage);
            const isPast = i < idx, isCurrent = i === idx;
            return React.createElement('div', { key:s, style:{ flex:1, textAlign:'center' } },
              React.createElement('div', { style:{ height:3, background: isPast||isCurrent ? _DS.gold : _DS.borderLt, margin:'0 1px' } }),
              React.createElement('div', { style:{ fontSize:8, color: isCurrent?_DS.gold:isPast?_DS.text3:'#CCC', marginTop:4, fontFamily:'DM Sans,sans-serif', fontWeight: isCurrent?700:400 } }, s.split(' ')[0]),
            );
          }),
        ),
      ),
      // Scrollable body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
        // Property snapshot
        (() => {
          const prop = listings.find(l => selDeal.prop.includes(l.title.split(' ')[0]) || selDeal.prop.includes(l.title.split(',')[0]));
          return prop ? React.createElement('div', { style:{ background:_DS.bg, borderRadius:8, overflow:'hidden', marginBottom:14, border:`1px solid ${_DS.border}` } },
            React.createElement('img', { src:prop.photo1, style:{ width:'100%', height:100, objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
            React.createElement('div', { style:{ padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' } },
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, prop.title),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, prop.neighborhood),
              ),
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, prop.price),
            ),
          ) : null;
        })(),

        // Lead context
        (() => {
          const lead = leads.find(l => l.name.includes(selDeal.lead.split(' ')[0]) || selDeal.lead.includes(l.avatar));
          return lead ? React.createElement('div', { style:{ marginBottom:14, padding:'12px', background:_DS.bg, borderRadius:8, border:`1px solid ${_DS.border}` } },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center', marginBottom:8 } },
              React.createElement(_Avatar, { initials:lead.avatar, color: lead.temp==='hot'?'#B82929':lead.temp==='warm'?'#B87A1A':'#2A5F8F', size:36 }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${lead.flag} ${lead.name}`),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${lead.country} · ${lead.budget}`),
              ),
            ),
            React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } },
              `Timeline: ${lead.timeline} · Use: ${lead.use}`)
          ) : null;
        })(),

        // Stage history / timeline
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'Stage History'),
          stages.slice(0, stages.indexOf(selDeal.stage)+1).map((s, i) =>
            React.createElement('div', { key:s, style:{ display:'flex', gap:8, marginBottom:6 } },
              React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'center' } },
                React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background: i===stages.indexOf(selDeal.stage)?_DS.gold:_DS.success, marginTop:3 } }),
                i < stages.indexOf(selDeal.stage) && React.createElement('div', { style:{ width:1, flex:1, background:_DS.borderLt, margin:'3px 0' } }),
              ),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color: i===stages.indexOf(selDeal.stage)?_DS.text:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, s),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, i===stages.indexOf(selDeal.stage)?`${selDeal.days} days ago`:'—'),
              ),
            )
          ),
        ),

        // Next actions
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'Next Actions'),
          React.createElement('div', { style:{ background: selDeal.temp==='hot'?'#FDE8E8': selDeal.temp==='warm'?'#FDF0DC':_DS.bg, borderRadius:6, padding:'10px 12px', fontSize:12, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.6, border:`1px solid ${_DS.borderLt}` } },
            selDeal.stage === 'New Lead' ? 'Assign agent and make first contact within 24h.' :
            selDeal.stage === 'Contacted' ? 'Qualify budget, timeline and use case. Schedule property visit.' :
            selDeal.stage === 'Qualified' ? 'Match to top 3 properties and send curated proposal PDF.' :
            selDeal.stage === 'Visit Scheduled' ? 'Prepare property brief, confirm logistics, arrange transportation.' :
            selDeal.stage === 'Offer Sent' ? 'Follow up within 48h. Address objections. Prepare counter-offer.' :
            'Finalize terms, coordinate legal review, prepare closing documents.',
          ),
        ),

        // Move stage buttons
        React.createElement('div', { style:{ display:'flex', gap:6, flexWrap:'wrap' } },
          React.createElement('button', { style:{ flex:1, padding:'9px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '→ Advance Stage'),
          React.createElement('button', { style:{ flex:1, padding:'9px', background:'#E3F2EA', color:_DS.success, border:'none', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✓ Mark Closed'),
          React.createElement('button', { style:{ width:'100%', padding:'9px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:11, fontFamily:'DM Sans,sans-serif', marginTop:4 } }, '+ Add Note or Activity'),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE 2 — ACTIVITIES (Centro de Disciplina Comercial)
// ═══════════════════════════════════════════════════════════════════════════════

function Activities() {
  const activities = window.FBR.activities;
  const [selAct, setSelAct] = React.useState(activities[0]);
  const [agentFilter, setAgentFilter] = React.useState('All');
  const [dayFilter, setDayFilter] = React.useState('today');

  const overdueCount = activities.filter(a => a.status === 'overdue').length;
  const doneToday = activities.filter(a => a.date === 'today' && a.status === 'done').length;
  const scheduledCount = activities.filter(a => a.status === 'scheduled').length;
  const visitCount = activities.filter(a => a.type === 'visit').length;

  const agentNames = ['All', ...Array.from(new Set(activities.map(a => a.agent.split(' ')[0])))];
  const filtered = activities.filter(a => {
    const dayMatch = dayFilter === 'all' || a.date === dayFilter;
    const agentMatch = agentFilter === 'All' || a.agent.includes(agentFilter);
    return dayMatch && agentMatch;
  });

  // Agent cadence leaderboard
  const agentStats = agents.map(ag => {
    const agActs = activities.filter(a => a.agent === ag.name);
    const done = agActs.filter(a => a.status === 'done').length;
    const overdue = agActs.filter(a => a.status === 'overdue').length;
    const total = agActs.length;
    return { ...ag, done, overdue, total, rate: total ? Math.round((done/total)*100) : 0 };
  }).sort((a,b) => b.rate - a.rate);

  const typeColors = { call:'#2B6E4A', whatsapp:'#25D366', email:'#163061', visit:'#B87A1A', note:'#9C948A' };

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },

    // ── LEFT: Today's Agenda ─────────────────────────────────────────────────
    React.createElement('div', { style:{ width:260, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}` } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Today\'s Agenda'),
        React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Sunday, April 20'),
      ),
      // Time slots
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map(slot => {
          const slotActs = activities.filter(a => a.date === 'today' && a.time && a.time.startsWith(slot.split(':')[0].padStart(2,'0')));
          return React.createElement('div', { key:slot, style:{ display:'flex', gap:0, minHeight:52, borderBottom:`1px solid ${_DS.borderLt}` } },
            React.createElement('div', { style:{ width:44, flexShrink:0, padding:'8px 8px 0', fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, slot),
            React.createElement('div', { style:{ flex:1, padding:'4px 6px', display:'flex', flexDirection:'column', gap:2 } },
              slotActs.map(act =>
                React.createElement('div', { key:act.id, onClick:()=>setSelAct(act),
                  style:{
                    background: act.status==='overdue'?'#FDE8E8': act.status==='done'?'#E3F2EA': 'rgba(192,155,87,0.10)',
                    border: `1px solid ${act.status==='overdue'?'rgba(184,41,41,0.25)': act.status==='done'?'rgba(43,110,74,0.25)':'rgba(192,155,87,0.25)'}`,
                    borderLeft: `3px solid ${typeColors[act.type]||'#ccc'}`,
                    borderRadius:4, padding:'4px 6px', cursor:'pointer',
                    opacity: act.status==='done' ? 0.7 : 1,
                  }
                },
                  React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, act.lead),
                  React.createElement('div', { style:{ fontSize:9, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `${act.type} · ${act.agent.split(' ')[0]}`),
                )
              ),
            ),
          );
        }),
      ),
    ),

    // ── CENTER: Activity Feed ────────────────────────────────────────────────
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Stats bar
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, borderBottom:`1px solid ${_DS.border}`, flexShrink:0, background:_DS.surface } },
        [
          { label:'Done Today', value:doneToday, color:_DS.success, bg:'#E3F2EA' },
          { label:'Scheduled', value:scheduledCount, color:_DS.navyMid, bg:_DS.bg },
          { label:'Overdue', value:overdueCount, color:'#B82929', bg:'#FDE8E8' },
          { label:'Visits', value:visitCount, color:_DS.gold, bg:_DS.goldDim },
        ].map((s,i) =>
          React.createElement('div', { key:i, style:{ padding:'14px 20px', background:s.bg, borderLeft: i>0?`1px solid ${_DS.borderLt}`:'none', textAlign:'center' } },
            React.createElement('div', { style:{ fontSize:24, fontWeight:800, color:s.color, fontFamily:'DM Sans,sans-serif' } }, s.value),
            React.createElement('div', { style:{ fontSize:10, fontWeight:600, color:s.color, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2, opacity:0.8 } }, s.label),
          )
        ),
      ),

      // Filters
      React.createElement('div', { style:{ padding:'10px 16px', borderBottom:`1px solid ${_DS.borderLt}`, display:'flex', gap:8, alignItems:'center', flexShrink:0, background:_DS.bg } },
        ['today','yesterday','tomorrow','all'].map(d =>
          React.createElement('button', { key:d, onClick:()=>setDayFilter(d), style:{
            padding:'4px 12px', borderRadius:4, border:`1px solid ${dayFilter===d?_DS.gold:_DS.border}`,
            background: dayFilter===d?_DS.goldDim:'white', cursor:'pointer', fontSize:11, fontWeight:600,
            color: dayFilter===d?_DS.gold:_DS.text2, fontFamily:'DM Sans,sans-serif', textTransform:'capitalize'
          } }, d),
        ),
        React.createElement('div', { style:{ marginLeft:'auto', display:'flex', gap:4 } },
          agentNames.map(n =>
            React.createElement('button', { key:n, onClick:()=>setAgentFilter(n), style:{
              padding:'4px 10px', borderRadius:4, border:`1px solid ${agentFilter===n?_DS.navyMid:_DS.border}`,
              background: agentFilter===n?_DS.navyMid:'white', cursor:'pointer', fontSize:11,
              color: agentFilter===n?'#fff':_DS.text2, fontFamily:'DM Sans,sans-serif', fontWeight: agentFilter===n?700:400
            } }, n),
          ),
        ),
        React.createElement('button', { style:{ padding:'6px 14px', background:_DS.gold, color:_DS.navy, border:'none', borderRadius:6, cursor:'pointer', fontSize:11, fontWeight:800, fontFamily:'DM Sans,sans-serif', marginLeft:8 } }, '+ Activity'),
      ),

      // Feed
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        filtered.map(act =>
          React.createElement('div', { key:act.id, onClick:()=>setSelAct(act),
            style:{
              display:'flex', gap:12, padding:'14px 16px', cursor:'pointer',
              borderBottom:`1px solid ${_DS.borderLt}`,
              background: selAct?.id===act.id ? 'rgba(192,155,87,0.04)' : act.status==='overdue'?'rgba(184,41,41,0.03)':'transparent',
              borderLeft: `3px solid ${selAct?.id===act.id?_DS.gold: act.status==='overdue'?'#B82929': act.status==='done'?_DS.success:'transparent'}`,
              transition:'background 0.15s',
            }
          },
            React.createElement(ActivityIcon, { type:act.type, size:34 }),
            React.createElement('div', { style:{ flex:1, minWidth:0 } },
              React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:3 } },
                React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, act.lead),
                React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `· ${act.prop}`),
                React.createElement('span', { style:{ marginLeft:'auto', fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, `${act.time} · ${act.date}`),
              ),
              React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', marginBottom:6, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, act.notes),
              React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
                React.createElement(StatusPill, { status:act.status }),
                React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, act.agent),
                act.duration && React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `· ${act.duration}`),
                act.outcome && React.createElement('span', { style:{ fontSize:11, color: act.outcome==='positive'?_DS.success: act.outcome==='negative'?'#B82929':_DS.text3, fontFamily:'DM Sans,sans-serif', fontWeight:600 } },
                  act.outcome==='positive'?'↑ Positive': act.outcome==='negative'?'↓ Negative':'~ Neutral'),
              ),
            ),
          )
        ),
      ),
    ),

    // ── RIGHT: Detail + Leaderboard ──────────────────────────────────────────
    React.createElement('div', { style:{ width:280, borderLeft:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', overflow:'hidden', background:_DS.surface, flexShrink:0 } },

      // Selected activity detail
      selAct && React.createElement('div', { style:{ padding:'16px', borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center', marginBottom:12 } },
          React.createElement(ActivityIcon, { type:selAct.type, size:36 }),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, selAct.lead),
            React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, selAct.type.charAt(0).toUpperCase()+selAct.type.slice(1)+' · '+selAct.agent.split(' ')[0]),
          ),
        ),
        React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.7, marginBottom:12, background:_DS.bg, borderRadius:6, padding:'10px 12px' } }, selAct.notes),
        React.createElement('div', { style:{ display:'flex', gap:6 } },
          React.createElement(StatusPill, { status:selAct.status }),
          selAct.duration && React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', alignSelf:'center' } }, selAct.duration),
        ),
        selAct.status !== 'done' && React.createElement('div', { style:{ display:'flex', gap:6, marginTop:10 } },
          React.createElement('button', { style:{ flex:1, padding:'8px', background:_DS.success, color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✓ Mark Done'),
          React.createElement('button', { style:{ flex:1, padding:'8px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:5, cursor:'pointer', fontSize:11, fontFamily:'DM Sans,sans-serif' } }, '↻ Reschedule'),
        ),
      ),

      // Agent leaderboard
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'14px 16px' } },
        React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Activity Cadence'),
        agentStats.map((ag, rank) =>
          React.createElement('div', { key:ag.name, style:{ marginBottom:14 } },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:4 } },
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text3, fontFamily:'DM Sans,sans-serif', width:14 } }, rank+1),
              React.createElement(_Avatar, { initials:ag.avatar, color:ag.color, size:28 }),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, ag.name.split(' ')[0]),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${ag.done}/${ag.total} · ${ag.overdue} overdue`),
              ),
              React.createElement('span', { style:{ fontSize:13, fontWeight:800, color: ag.rate>70?_DS.success:ag.rate>40?_DS.warn:_DS.danger, fontFamily:'DM Sans,sans-serif' } }, `${ag.rate}%`),
            ),
            React.createElement('div', { style:{ height:4, background:_DS.borderLt, borderRadius:2, marginLeft:50 } },
              React.createElement('div', { style:{ width:`${ag.rate}%`, height:'100%', background: ag.rate>70?_DS.success:ag.rate>40?_DS.warn:_DS.danger, borderRadius:2, transition:'width 0.8s' } }),
            ),
          )
        ),
        // Type breakdown
        React.createElement('div', { style:{ marginTop:20 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'By Type'),
          ['call','whatsapp','email','visit','note'].map(type => {
            const cnt = activities.filter(a=>a.type===type).length;
            return React.createElement('div', { key:type, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:6 } },
              React.createElement(ActivityIcon, { type, size:20 }),
              React.createElement('span', { style:{ flex:1, fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', textTransform:'capitalize' } }, type),
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, cnt),
            );
          }),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE 3 — OFFERS & CLOSINGS (Centro Transaccional)
// ═══════════════════════════════════════════════════════════════════════════════

function OffersClosings() {
  const offers = window.FBR.offers;
  const closings = window.FBR.closings;
  const [selOffer, setSelOffer] = React.useState(offers[0]);
  const [tab, setTab] = React.useState('offers'); // 'offers' | 'closings'

  const totalActiveValue = offers.filter(o=>o.currentAmount).reduce((a,o)=>a+o.currentAmount, 0);
  const totalCommission = offers.filter(o=>o.currentAmount).reduce((a,o)=>a+o.commission.total, 0);
  const closedVolume = closings.reduce((a,c)=>a+c.salePrice, 0);
  const closedCommission = closings.reduce((a,c)=>a+c.commission, 0);

  const stepsDone = (o) => {
    let done = 0;
    if (o.closing.depositPaid) done++;
    if (o.closing.inspection && o.closing.inspection !== 'Not started') done++;
    if (o.closing.legal && o.closing.legal !== 'Pending') done++;
    if (o.closing.dueDiligence && parseInt(o.closing.dueDiligence) > 50) done++;
    if (o.closing.signingDate) done++;
    return done;
  };

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },

    // ── LEFT PANEL: Offer list ────────────────────────────────────────────────
    React.createElement('div', { style:{ width:340, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },

      // KPIs
      React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px', flexShrink:0 } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 } },
          [
            { label:'Active Offer Value', value:`$${(totalActiveValue/1e6).toFixed(1)}M`, color:_DS.gold },
            { label:'Commission Pipeline', value:`$${(totalCommission/1000).toFixed(0)}K`, color:'#5DBF8A' },
            { label:'Closed This Year', value:`$${(closedVolume/1e6).toFixed(1)}M`, color:'rgba(255,255,255,0.8)' },
            { label:'Commissions Earned', value:`$${(closedCommission/1000).toFixed(0)}K`, color:'rgba(255,255,255,0.6)' },
          ].map((k,i) =>
            React.createElement('div', { key:i },
              React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, k.label),
              React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif' } }, k.value),
            )
          ),
        ),
      ),

      // Tabs
      React.createElement('div', { style:{ display:'flex', borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
        [['offers',`Active Offers (${offers.length})`],['closings',`Closed (${closings.length})`]].map(([v,l]) =>
          React.createElement('button', { key:v, onClick:()=>{ setTab(v); if(v==='offers')setSelOffer(offers[0]); }, style:{
            flex:1, padding:'11px', background:'transparent', border:'none',
            borderBottom:`2px solid ${tab===v?_DS.gold:'transparent'}`,
            cursor:'pointer', fontSize:12, fontWeight: tab===v?700:400,
            color: tab===v?_DS.text:_DS.text3, fontFamily:'DM Sans,sans-serif', transition:'all 0.15s'
          } }, l),
        ),
      ),

      // List
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        tab === 'offers'
          ? offers.map(o =>
              React.createElement('div', { key:o.id, onClick:()=>setSelOffer(o),
                style:{
                  padding:'14px 16px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
                  background: selOffer?.id===o.id ? 'rgba(192,155,87,0.05)' : 'transparent',
                  borderLeft: `3px solid ${selOffer?.id===o.id?_DS.gold: o.status==='stalled'?'#B82929': o.status==='negotiation'?_DS.gold:'transparent'}`,
                  transition:'background 0.15s',
                }
              },
                React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'flex-start' } },
                  React.createElement('img', { src:o.photo, style:{ width:52, height:40, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                  React.createElement('div', { style:{ flex:1, minWidth:0 } },
                    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:2 } },
                      React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${o.flag} ${o.lead}`),
                      React.createElement(OfferStatusBadge, { status:o.status }),
                    ),
                    React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:4, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, o.prop),
                    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center' } },
                      React.createElement('span', { style:{ fontSize:14, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, o.currentAmount ? `$${(o.currentAmount/1e6).toFixed(2)}M` : 'Pre-offer'),
                      React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, o.daysInNegotiation > 0 ? `${o.daysInNegotiation}d` : 'New'),
                    ),
                  ),
                ),
                // Progress bar
                o.currentAmount && React.createElement('div', { style:{ marginTop:8, display:'flex', alignItems:'center', gap:6 } },
                  React.createElement('div', { style:{ flex:1, height:3, background:_DS.borderLt, borderRadius:2 } },
                    React.createElement('div', { style:{ width:`${(stepsDone(o)/5)*100}%`, height:'100%', background: stepsDone(o)>=4?_DS.success:_DS.gold, borderRadius:2 } }),
                  ),
                  React.createElement('span', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${stepsDone(o)}/5 steps`),
                ),
              )
            )
          : closings.map(c =>
              React.createElement('div', { key:c.id, style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.borderLt}`, display:'flex', gap:10 } },
                React.createElement('img', { src:c.photo, style:{ width:48, height:38, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ flex:1, minWidth:0 } },
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:2 } },
                    React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${c.flag} ${c.lead}`),
                    React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, c.closedDate),
                  ),
                  React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:3 } }, c.prop),
                  React.createElement('div', { style:{ display:'flex', justifyContent:'space-between' } },
                    React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `$${(c.salePrice/1e6).toFixed(2)}M`),
                    React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:_DS.success, fontFamily:'DM Sans,sans-serif' } }, `+$${(c.commission/1000).toFixed(0)}K`),
                  ),
                ),
              )
            ),
      ),
    ),

    // ── RIGHT: Offer Detail ──────────────────────────────────────────────────
    tab === 'offers' && selOffer && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Header
      React.createElement('div', { style:{ padding:'20px 24px', borderBottom:`1px solid ${_DS.border}`, background:_DS.surface, display:'flex', gap:16, alignItems:'center', flexShrink:0 } },
        React.createElement('img', { src:selOffer.photo, style:{ width:80, height:60, objectFit:'cover', borderRadius:6 }, onError:e=>e.target.style.display='none' }),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, selOffer.neighborhood),
          React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, selOffer.prop),
          React.createElement('div', { style:{ display:'flex', gap:8 } },
            React.createElement(OfferStatusBadge, { status:selOffer.status }),
            React.createElement('span', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif', alignSelf:'center' } }, `${selOffer.daysInNegotiation}d in negotiation · Agent: ${selOffer.agent}`),
          ),
        ),
        React.createElement('div', { style:{ textAlign:'right' } },
          React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'List Price'),
          React.createElement('div', { style:{ fontSize:14, color:_DS.text2, fontFamily:'DM Sans,sans-serif', textDecoration:'line-through' } }, `$${(selOffer.listPrice/1e6).toFixed(2)}M`),
          React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:4 } }, 'Current Offer'),
          React.createElement('div', { style:{ fontSize:24, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, selOffer.currentAmount ? `$${(selOffer.currentAmount/1e6).toFixed(2)}M` : '—'),
          selOffer.currentAmount && React.createElement('div', { style:{ fontSize:11, color: selOffer.currentAmount < selOffer.listPrice ? _DS.danger : _DS.success, fontFamily:'DM Sans,sans-serif', fontWeight:600 } },
            `${((selOffer.currentAmount-selOffer.listPrice)/selOffer.listPrice*100).toFixed(1)}% vs list`),
        ),
      ),

      // Scrollable body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },

        // Negotiation timeline
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Offer History'),
          selOffer.offerHistory.length === 0
            ? React.createElement('div', { style:{ background:_DS.bg, borderRadius:8, padding:'20px', textAlign:'center', fontSize:13, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'No offers submitted yet. Prepare initial offer template.')
            : React.createElement('div', { style:{ position:'relative' } },
                React.createElement('div', { style:{ position:'absolute', left:14, top:0, bottom:0, width:1, background:_DS.borderLt } }),
                selOffer.offerHistory.map((h, i) =>
                  React.createElement('div', { key:i, style:{ display:'flex', gap:12, marginBottom:16, position:'relative' } },
                    React.createElement('div', { style:{ width:28, height:28, borderRadius:'50%', flexShrink:0, zIndex:1,
                      background: h.party==='buyer'?_DS.navyMid:_DS.gold,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', fontWeight:700 } },
                      h.party==='buyer'?'B':'S'),
                    React.createElement('div', { style:{ flex:1, background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'10px 14px',
                      boxShadow: i===selOffer.offerHistory.length-1?`0 0 0 2px ${_DS.goldDim}`:'none' } },
                      React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:4 } },
                        React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:_DS.text3, textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } }, h.party === 'buyer' ? '🏢 Buyer' : '🏡 Seller'),
                        React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, h.date),
                      ),
                      React.createElement('div', { style:{ fontSize:20, fontWeight:800, color: h.party==='buyer'?_DS.navyMid:_DS.gold, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, `$${(h.amount/1e6).toFixed(3)}M`),
                      React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, h.note),
                    ),
                  )
                ),
              ),

          // Next action
          React.createElement('div', { style:{ background: selOffer.urgency==='hot'?'#FDE8E8': selOffer.urgency==='warm'?'#FDF0DC':_DS.bg, border:`1px solid ${selOffer.urgency==='hot'?'rgba(184,41,41,0.2)': selOffer.urgency==='warm'?'rgba(184,122,26,0.2)':_DS.borderLt}`, borderRadius:8, padding:'12px 14px', marginTop:16 } },
            React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, '⚡ Next Action'),
            React.createElement('div', { style:{ fontSize:13, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.6 } }, selOffer.nextAction),
          ),

          // Action buttons
          React.createElement('div', { style:{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' } },
            React.createElement('button', { style:{ padding:'9px 16px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '+ Submit Counter'),
            React.createElement('button', { style:{ padding:'9px 16px', background:'#E3F2EA', color:_DS.success, border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✓ Accept Offer'),
            React.createElement('button', { style:{ padding:'9px 16px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '✉ Send to Client'),
          ),
        ),

        // Right: closing checklist + commission
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },

          // Closing checklist
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Closing Checklist'),
            [
              { label:'Deposit Received', done:selOffer.closing.depositPaid, val: selOffer.closing.depositPaid?`$${(selOffer.closing.deposit/1000).toFixed(0)}K paid`:'Pending' },
              { label:`Inspection: ${selOffer.closing.inspection}`, done: selOffer.closing.inspection!=='Not started' },
              { label:`Legal Review: ${selOffer.closing.legal}`, done: selOffer.closing.legal!=='Pending' },
              { label:`Due Diligence: ${selOffer.closing.dueDiligence}`, done: parseInt(selOffer.closing.dueDiligence||0)>=100 },
              { label:`Signing: ${selOffer.closing.signingDate||'TBD'}`, done: !!selOffer.closing.signingDate, active: !!selOffer.closing.signingDate },
              { label:`Transfer: ${selOffer.closing.transferDate||'TBD'}`, done: false },
            ].map((step, i) =>
              React.createElement(ClosingStep, { key:i, label:step.label, done:step.done, active:step.active })
            ),
          ),

          // Commission breakdown
          React.createElement('div', { style:{ background:_DS.navy, borderRadius:8, padding:'16px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.8)', fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Commission Structure'),
            [
              { label:'Rate', value:`${selOffer.commission.rate}%` },
              { label:'Est. Total Commission', value:`$${(selOffer.commission.total/1000).toFixed(0)}K`, highlight:true },
              { label:'Agent Split', value:`$${(selOffer.commission.agentSplit/1000).toFixed(0)}K` },
              { label:'Brokerage', value:`$${(selOffer.commission.brokerage/1000).toFixed(0)}K` },
            ].map(({ label, value, highlight }) =>
              React.createElement('div', { key:label, style:{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.07)' } },
                React.createElement('span', { style:{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif' } }, label),
                React.createElement('span', { style:{ fontSize: highlight?16:13, fontWeight: highlight?800:600, color: highlight?_DS.gold:'rgba(255,255,255,0.85)', fontFamily:'DM Sans,sans-serif' } }, value),
              )
            ),
          ),

          // Lead context
          React.createElement('div', { style:{ background:_DS.bg, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px 16px' } },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
              React.createElement('div', { style:{ width:36, height:36, borderRadius:'50%', background:_DS.gold, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } },
                selOffer.lead.split(' ').map(w=>w[0]).slice(0,2).join(''),
              ),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${selOffer.flag} ${selOffer.lead}`),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `Agent: ${selOffer.agent}`),
              ),
            ),
          ),
        ),
      ),
    ),

    // Closings detail view (when tab = closings)
    tab === 'closings' && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', padding:'24px' } },
      // YTD stats
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 } },
        React.createElement(_Kpi, { label:'Closed Volume YTD', value:`$${(closedVolume/1e6).toFixed(1)}M`, color:_DS.gold }),
        React.createElement(_Kpi, { label:'Total Commissions', value:`$${(closedCommission/1000).toFixed(0)}K`, color:_DS.success }),
        React.createElement(_Kpi, { label:'Deals Closed', value:closings.length, color:_DS.navyMid }),
        React.createElement(_Kpi, { label:'Avg Days to Close', value:`${Math.round(closings.reduce((a,c)=>a+c.daysToClose,0)/closings.length)}d`, color:_DS.text }),
      ),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1.2fr 1fr 1fr 0.8fr 0.8fr', padding:'10px 20px', background:_DS.bg, fontSize:10, fontWeight:700, color:_DS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', borderBottom:`1px solid ${_DS.border}` } },
          ['Property','Buyer','Agent','Sale Price','Commission','Days'].map(h=>React.createElement('span',{key:h},h)),
        ),
        closings.map(c =>
          React.createElement('div', { key:c.id, style:{ display:'grid', gridTemplateColumns:'2fr 1.2fr 1fr 1fr 0.8fr 0.8fr', padding:'14px 20px', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center', fontSize:13, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' } },
              React.createElement('img', { src:c.photo, style:{ width:44, height:34, objectFit:'cover', borderRadius:4 }, onError:e=>e.target.style.display='none' }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontWeight:600, color:_DS.text } }, c.prop),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3 } }, c.neighborhood),
              ),
            ),
            React.createElement('span', { style:{ color:_DS.text2 } }, `${c.flag} ${c.lead}`),
            React.createElement('span', { style:{ color:_DS.text2, fontSize:11 } }, c.agent.split(' ')[0]),
            React.createElement('span', { style:{ fontWeight:700, color:_DS.text } }, `$${(c.salePrice/1e6).toFixed(2)}M`),
            React.createElement('span', { style:{ fontWeight:700, color:_DS.success } }, `$${(c.commission/1000).toFixed(0)}K`),
            React.createElement('span', { style:{ color:_DS.text2 } }, `${c.daysToClose}d`),
          )
        ),
        // Totals row
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1.2fr 1fr 1fr 0.8fr 0.8fr', padding:'12px 20px', background:_DS.bg, borderTop:`2px solid ${_DS.border}`, fontSize:13, fontFamily:'DM Sans,sans-serif', fontWeight:700, color:_DS.text } },
          React.createElement('span', null, `Total (${closings.length} closings)`),
          React.createElement('span', null, ''),
          React.createElement('span', null, ''),
          React.createElement('span', { style:{ color:_DS.gold } }, `$${(closedVolume/1e6).toFixed(2)}M`),
          React.createElement('span', { style:{ color:_DS.success } }, `$${(closedCommission/1000).toFixed(0)}K`),
          React.createElement('span', { style:{ color:_DS.text3 } }, `${Math.round(closings.reduce((a,c)=>a+c.daysToClose,0)/closings.length)}d avg`),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE 4 — OMNICHANNEL INBOX (Centro Conversacional)
// ═══════════════════════════════════════════════════════════════════════════════

function OmnichannelInbox() {
  const inbox = window.FBR.inbox;
  const [selConv, setSelConv] = React.useState(inbox[0]);
  const [draftText, setDraftText] = React.useState('');
  const [aiMode, setAiMode] = React.useState(false);
  const [chanFilter, setChanFilter] = React.useState('all');
  const msgEndRef = React.useRef(null);

  React.useEffect(() => {
    if (selConv) setDraftText(selConv.aiDraft || '');
    setAiMode(false);
  }, [selConv]);

  const totalUnread = inbox.reduce((a,c)=>a+c.unread,0);
  const filtered = chanFilter === 'all' ? inbox : inbox.filter(c=>c.channel===chanFilter);

  const chanMeta = {
    whatsapp: { label:'WhatsApp', color:'#25D366', icon:'W' },
    email:    { label:'Email',    color:'#163061', icon:'@' },
    web:      { label:'Web Chat', color:'#C09B57', icon:'⬡' },
    phone:    { label:'Phone',    color:'#5C5650', icon:'☎' },
    sms:      { label:'SMS',      color:'#2B6E4A', icon:'✉' },
  };

  const msgBubble = (m, i) => {
    const isLead = m.from === 'lead';
    const isAI = m.from === 'ai';
    const isSystem = m.from === 'system' || m.from === 'note';
    if (isSystem) return React.createElement('div', { key:i, style:{ textAlign:'center', margin:'8px 0' } },
      React.createElement('span', { style:{ background:_DS.bg, border:`1px solid ${_DS.border}`, borderRadius:20, padding:'4px 14px', fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', display:'inline-flex', alignItems:'center', gap:6 } },
        React.createElement(ChannelIcon, { ch:m.channel, size:12 }),
        m.text,
        React.createElement('span', { style:{ color:_DS.text3, fontSize:10 } }, ` · ${m.time}`),
      ),
    );
    return React.createElement('div', { key:i, style:{ display:'flex', justifyContent: isLead?'flex-end': isAI?'flex-start':'flex-start', marginBottom:10, gap:8, alignItems:'flex-end' } },
      !isLead && React.createElement('div', { style:{ flexShrink:0 } },
        isAI
          ? React.createElement('div', { style:{ width:28, height:28, borderRadius:'50%', background:'#8B4B8B', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'#fff', fontWeight:700 } }, '◆')
          : React.createElement(_Avatar, { initials:selConv.agent.split(' ').map(w=>w[0]).join(''), color:_DS.navyMid, size:28 }),
      ),
      React.createElement('div', {
        style:{
          maxWidth:'68%', padding:'10px 14px', borderRadius: isLead?'12px 4px 12px 12px':'4px 12px 12px 12px',
          fontSize:13, fontFamily:'DM Sans,sans-serif', lineHeight:1.6,
          background: isLead ? (selConv.channel==='whatsapp'?'#DCF8C6':_DS.gold) : isAI?'rgba(139,75,139,0.08)':_DS.bg,
          border: isAI?`1px solid rgba(139,75,139,0.2)`: isLead?'none':`1px solid ${_DS.borderLt}`,
          color: isLead&&selConv.channel!=='whatsapp' ? '#fff' : _DS.text,
        }
      },
        React.createElement('div', null, m.text),
        React.createElement('div', { style:{ fontSize:10, color: isLead&&selConv.channel!=='whatsapp'?'rgba(255,255,255,0.6)':_DS.text3, marginTop:4, textAlign:'right' } },
          React.createElement('span', null, m.time),
          isAI && React.createElement('span', { style:{ marginLeft:6, color:'#8B4B8B', fontWeight:600 } }, '◆ AI'),
        ),
      ),
    );
  };

  const matchedProp = selConv ? listings.find(l=>l.id===selConv.matched) : null;
  const matchedLead = selConv ? leads.find(l=>l.name.includes(selConv.lead.split(' ')[0]) || selConv.lead.includes(l.name.split(' ')[0])) : null;

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },

    // ── COLUMN 1: Conversation List ──────────────────────────────────────────
    React.createElement('div', { style:{ width:300, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },

      // Header
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'All Conversations'),
          totalUnread > 0 && React.createElement('span', { style:{ background:'#B82929', color:'#fff', fontSize:11, fontWeight:700, borderRadius:10, padding:'2px 7px', fontFamily:'DM Sans,sans-serif' } }, totalUnread),
        ),
        // Channel filters
        React.createElement('div', { style:{ display:'flex', gap:4, flexWrap:'wrap' } },
          [['all','All'],['whatsapp','W'],['email','@'],['web','⬡'],['phone','☎']].map(([k,l]) =>
            React.createElement('button', { key:k, onClick:()=>setChanFilter(k), style:{
              padding:'3px 8px', borderRadius:4, border:`1px solid ${chanFilter===k?_DS.gold:_DS.border}`,
              background: chanFilter===k?_DS.goldDim:'transparent', cursor:'pointer', fontSize:11,
              fontWeight: chanFilter===k?700:400, color: chanFilter===k?_DS.gold:_DS.text3, fontFamily:'DM Sans,sans-serif'
            } }, l),
          ),
        ),
      ),

      // Conversation list
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        filtered.map(conv =>
          React.createElement('div', { key:conv.id, onClick:()=>setSelConv(conv),
            style:{
              padding:'12px 14px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
              background: selConv?.id===conv.id ? 'rgba(192,155,87,0.06)' : conv.status==='new'?'rgba(192,155,87,0.03)':'transparent',
              borderLeft:`3px solid ${selConv?.id===conv.id?_DS.gold: conv.unread>0?_DS.gold:'transparent'}`,
              transition:'background 0.15s',
            }
          },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'flex-start' } },
              // Avatar + channel badge
              React.createElement('div', { style:{ position:'relative', flexShrink:0 } },
                React.createElement(_Avatar, { initials:conv.lead.split(' ').map(w=>w[0]).slice(0,2).join(''), color: conv.temp==='hot'?'#B82929':conv.temp==='warm'?'#B87A1A':'#2A5F8F', size:38 }),
                React.createElement('div', { style:{ position:'absolute', bottom:-2, right:-2 } },
                  React.createElement(ChannelIcon, { ch:conv.channel, size:14 }),
                ),
              ),
              React.createElement('div', { style:{ flex:1, minWidth:0 } },
                React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:2 } },
                  React.createElement('span', { style:{ fontSize:13, fontWeight: conv.unread>0?700:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${conv.flag} ${conv.lead}`),
                  React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, conv.lastTime),
                ),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom:4 } }, conv.lastMsg),
                React.createElement('div', { style:{ display:'flex', gap:4, alignItems:'center' } },
                  React.createElement(_TempDot, { temp:conv.temp }),
                  React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, conv.agent.split(' ')[0]),
                  conv.unread > 0 && React.createElement('span', { style:{ marginLeft:'auto', background:'#B82929', color:'#fff', fontSize:10, fontWeight:700, borderRadius:8, padding:'1px 6px', fontFamily:'DM Sans,sans-serif' } }, conv.unread),
                  conv.status === 'stale' && React.createElement('span', { style:{ marginLeft:'auto', background:'#FDE8E8', color:'#B82929', fontSize:9, fontWeight:700, borderRadius:4, padding:'2px 5px', fontFamily:'DM Sans,sans-serif' } }, '⚠ STALE'),
                  conv.status === 'new' && React.createElement('span', { style:{ marginLeft:'auto', background:'#E3F2EA', color:_DS.success, fontSize:9, fontWeight:700, borderRadius:4, padding:'2px 5px', fontFamily:'DM Sans,sans-serif' } }, 'NEW'),
                ),
              ),
            ),
          )
        ),
      ),
    ),

    // ── COLUMN 2: Chat View ──────────────────────────────────────────────────
    selConv && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:'#FAFAF8' } },

      // Chat header
      React.createElement('div', { style:{ padding:'12px 20px', background:_DS.surface, borderBottom:`1px solid ${_DS.border}`, display:'flex', gap:12, alignItems:'center', flexShrink:0 } },
        React.createElement('div', { style:{ position:'relative' } },
          React.createElement(_Avatar, { initials:selConv.lead.split(' ').map(w=>w[0]).slice(0,2).join(''), color:selConv.temp==='hot'?'#B82929':selConv.temp==='warm'?'#B87A1A':'#2A5F8F', size:40 }),
          React.createElement('div', { style:{ position:'absolute', bottom:0, right:-2 } },
            React.createElement(ChannelIcon, { ch:selConv.channel, size:16 }),
          ),
        ),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, `${selConv.flag} ${selConv.lead}`),
          React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `via ${chanMeta[selConv.channel]?.label||selConv.channel} · Agent: ${selConv.agent}`),
        ),
        React.createElement('div', { style:{ display:'flex', gap:6 } },
          React.createElement(_TempDot, { temp:selConv.temp }),
          React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginRight:4 } }, selConv.temp),
          selConv.status === 'stale' && React.createElement('span', { style:{ background:'#FDE8E8', color:'#B82929', fontSize:10, fontWeight:700, borderRadius:4, padding:'3px 8px', fontFamily:'DM Sans,sans-serif' } }, '⚠ STALE — ACTION NEEDED'),
          selConv.status === 'new' && React.createElement('span', { style:{ background:'#E3F2EA', color:_DS.success, fontSize:10, fontWeight:700, borderRadius:4, padding:'3px 8px', fontFamily:'DM Sans,sans-serif' } }, '● NEW LEAD'),
        ),
      ),

      // Messages
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 20px 12px' } },
        selConv.messages.map((m,i) => msgBubble(m,i)),
        React.createElement('div', { ref:msgEndRef }),
      ),

      // AI suggestion banner
      selConv.aiSuggestion && !aiMode && React.createElement('div', {
        style:{ margin:'0 20px 10px', background:'rgba(139,75,139,0.07)', border:`1px solid rgba(139,75,139,0.2)`, borderRadius:8, padding:'10px 14px', display:'flex', gap:10, alignItems:'flex-start', flexShrink:0 }
      },
        React.createElement('span', { style:{ fontSize:16, flexShrink:0 } }, '◆'),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:'#8B4B8B', fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, 'AI Recommendation'),
          React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.6 } }, selConv.aiSuggestion),
        ),
        selConv.aiDraft && React.createElement('button', { onClick:()=>{ setAiMode(true); setDraftText(selConv.aiDraft); }, style:{ padding:'5px 12px', background:'#8B4B8B', color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, 'Use Draft'),
      ),

      // Compose area
      React.createElement('div', { style:{ padding:'12px 20px', background:_DS.surface, borderTop:`1px solid ${_DS.border}`, flexShrink:0 } },
        aiMode && React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#8B4B8B', fontFamily:'DM Sans,sans-serif', marginBottom:4, display:'flex', alignItems:'center', gap:4 } },
          React.createElement('span', null, '◆ AI Draft — Review and edit before sending'),
          React.createElement('span', { onClick:()=>setAiMode(false), style:{ marginLeft:'auto', cursor:'pointer', color:_DS.text3, fontSize:12 } }, '✕'),
        ),
        React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'flex-end' } },
          React.createElement('textarea', {
            value:draftText, onChange:e=>setDraftText(e.target.value),
            placeholder:'Type a message…',
            rows:aiMode ? 3 : 2,
            style:{ flex:1, border:`1px solid ${aiMode?'rgba(139,75,139,0.35)':_DS.border}`, borderRadius:8, padding:'10px 12px', fontSize:13, fontFamily:'DM Sans,sans-serif', outline:'none', resize:'none', background: aiMode?'rgba(139,75,139,0.04)':'#fff', lineHeight:1.6 }
          }),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:4 } },
            React.createElement('button', { style:{ padding:'10px 18px', background:chanMeta[selConv.channel]?.color||_DS.navy, color:'#fff', border:'none', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, 'Send'),
            React.createElement('button', { onClick:()=>setAiMode(!aiMode), style:{ padding:'6px', background: aiMode?'rgba(139,75,139,0.12)':'transparent', border:`1px solid rgba(139,75,139,0.25)`, borderRadius:6, cursor:'pointer', fontSize:12, color:'#8B4B8B', fontFamily:'DM Sans,sans-serif' } }, '◆ AI'),
          ),
        ),
        // Quick actions
        React.createElement('div', { style:{ display:'flex', gap:6, marginTop:8 } },
          ['📅 Schedule Visit','📄 Send Proposal','💰 Create Offer','📎 Attach Brochure'].map(a =>
            React.createElement('button', { key:a, style:{ padding:'4px 10px', background:_DS.bg, border:`1px solid ${_DS.border}`, borderRadius:4, cursor:'pointer', fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, a)
          ),
        ),
      ),
    ),

    // ── COLUMN 3: Lead Context ───────────────────────────────────────────────
    selConv && React.createElement('div', { style:{ width:272, borderLeft:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', overflow:'hidden', background:_DS.surface, flexShrink:0 } },

      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },

        // Lead profile
        matchedLead && React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:10 } }, 'Lead Profile'),
          React.createElement('div', { style:{ background:_DS.bg, borderRadius:8, padding:'12px', border:`1px solid ${_DS.border}` } },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:10 } },
              React.createElement(_Avatar, { initials:matchedLead.avatar, color:matchedLead.temp==='hot'?'#B82929':matchedLead.temp==='warm'?'#B87A1A':'#2A5F8F', size:38 }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, matchedLead.name),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, matchedLead.country),
              ),
            ),
            [['Budget',matchedLead.budget],['Looking for',matchedLead.looking],['Timeline',matchedLead.timeline],['Use',matchedLead.use],['Source',matchedLead.source]].map(([k,v]) =>
              React.createElement('div', { key:k, style:{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:`1px solid ${_DS.borderLt}`, fontSize:11, fontFamily:'DM Sans,sans-serif' } },
                React.createElement('span', { style:{ color:_DS.text3 } }, k),
                React.createElement('span', { style:{ color:_DS.text, fontWeight:600 } }, v),
              )
            ),
            // Lead score
            React.createElement('div', { style:{ marginTop:10 } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:11, fontFamily:'DM Sans,sans-serif', marginBottom:4 } },
                React.createElement('span', { style:{ color:_DS.text3 } }, 'Lead Score'),
                React.createElement('span', { style:{ fontWeight:800, color: matchedLead.score>80?_DS.success:matchedLead.score>50?_DS.warn:_DS.danger } }, matchedLead.score),
              ),
              React.createElement('div', { style:{ height:4, background:_DS.borderLt, borderRadius:2 } },
                React.createElement('div', { style:{ width:`${matchedLead.score}%`, height:'100%', background: matchedLead.score>80?_DS.success:matchedLead.score>50?_DS.warn:_DS.danger, borderRadius:2 } }),
              ),
            ),
          ),
        ),

        // Matched property
        matchedProp && React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'AI Match'),
          React.createElement('div', { style:{ background:_DS.bg, borderRadius:8, overflow:'hidden', border:`1px solid ${_DS.border}` } },
            React.createElement('img', { src:matchedProp.photo1, style:{ width:'100%', height:100, objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
            React.createElement('div', { style:{ padding:'10px 12px' } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, matchedProp.title),
              React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, matchedProp.neighborhood),
              React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, matchedProp.price),
              matchedProp.beds && React.createElement('div', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, `${matchedProp.beds}bd · ${matchedProp.baths}ba · ${matchedProp.sqft?.toLocaleString()}ft²`),
            ),
          ),
        ),

        // Quick actions
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Quick Actions'),
          ['📅 Schedule Property Visit','📄 Send Property Proposal','💰 Create Offer','📋 Qualify Lead','👤 Assign Agent'].map((a,i) =>
            React.createElement('button', { key:i, style:{ width:'100%', padding:'9px 12px', marginBottom:6, background: i===0?_DS.navy:_DS.bg, color: i===0?'#fff':_DS.text, border:`1px solid ${i===0?_DS.navy:_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif', fontWeight: i===0?700:400, textAlign:'left', transition:'background 0.15s' } }, a),
          ),
        ),
      ),
    ),
  );
}

// Export to window
Object.assign(window, { Pipeline, Activities, OffersClosings, OmnichannelInbox });
