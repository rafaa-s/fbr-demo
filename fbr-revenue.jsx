// FBR Platform — Revenue Engine: Calendar & Tours · Broker Performance
// Depends on: fbr-data.js, fbr-ui.jsx

// ═══════════════════════════════════════════════════════════════════════════════
// CALENDAR & TOURS
// ═══════════════════════════════════════════════════════════════════════════════

function CalendarTours({ setScreen }) {
  const _DS = window.DS;
  const _Badge = window.Badge;
  const _Avatar = window.Avatar;

  const events = window.FBR.calendarEvents;
  const brokerStats = window.FBR.brokerStats;

  const [agentFilter, setAgentFilter] = React.useState('All');
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [selEvent, setSelEvent] = React.useState(events[0]);
  const [view, setView] = React.useState('agenda'); // 'agenda' | 'week'

  const agents = ['All', ...brokerStats.map(b => b.name.split(' ')[0])];
  const types = [
    { id:'all', label:'All Events' },
    { id:'tour', label:'Tours' },
    { id:'followup', label:'Follow-ups' },
    { id:'meeting', label:'Meetings' },
    { id:'closing', label:'Closings' },
    { id:'deadline', label:'Deadlines' },
  ];

  const filtered = events.filter(e => {
    const agentMatch = agentFilter === 'All' || e.agent.includes(agentFilter) || e.agent === 'All';
    const typeMatch = typeFilter === 'all' || e.type === typeFilter;
    return agentMatch && typeMatch;
  }).sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const eventStyle = {
    tour:     { bg:'rgba(192,155,87,0.12)', color:'#B87A1A', border:'rgba(192,155,87,0.3)', icon:'🏠', label:'Property Tour' },
    followup: { bg:'rgba(184,41,41,0.08)', color:'#B82929', border:'rgba(184,41,41,0.2)', icon:'📞', label:'Follow-up' },
    meeting:  { bg:'rgba(22,48,97,0.08)', color:'#163061', border:'rgba(22,48,97,0.15)', icon:'👥', label:'Meeting' },
    closing:  { bg:'rgba(43,110,74,0.10)', color:'#2B6E4A', border:'rgba(43,110,74,0.2)', icon:'✓', label:'Closing' },
    owner:    { bg:'rgba(192,155,87,0.08)', color:'#9C6F2A', border:'rgba(192,155,87,0.2)', icon:'🏡', label:'Owner' },
    deadline: { bg:'rgba(184,41,41,0.12)', color:'#B82929', border:'rgba(184,41,41,0.25)', icon:'⚠', label:'Deadline' },
  };

  const statusStyle = {
    confirmed:  { color:'#2B6E4A', label:'Confirmed' },
    pending:    { color:'#B87A1A', label:'Pending' },
    tentative:  { color:'#163061', label:'Tentative' },
    overdue:    { color:'#B82929', label:'Overdue' },
    scheduled:  { color:'#163061', label:'Scheduled' },
    recurring:  { color:'#9C948A', label:'Recurring' },
    critical:   { color:'#B82929', label:'Critical' },
  };

  // Group by date
  const grouped = filtered.reduce((acc, ev) => {
    const key = ev.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

  const kpis = {
    tours: events.filter(e => e.type === 'tour').length,
    confirmed: events.filter(e => e.status === 'confirmed').length,
    overdue: events.filter(e => e.status === 'overdue').length,
    closings: events.filter(e => e.type === 'closing').length,
    thisWeek: events.filter(e => e.date >= '2026-06-08' && e.date <= '2026-06-14').length,
  };

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
  }

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 148px)', overflow:'hidden' } },

    // ── LEFT: Event list ───────────────────────────────────────────────────────
    React.createElement('div', { style:{ width:380, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },

      // KPIs
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, background:_DS.navy, flexShrink:0 } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:0 } },
          [
            { label:'Tours', value:kpis.tours, color:_DS.gold },
            { label:'This Week', value:kpis.thisWeek, color:'rgba(255,255,255,0.85)' },
            { label:'Overdue', value:kpis.overdue, color:kpis.overdue>0?'#FF8080':'rgba(255,255,255,0.5)' },
          ].map((k, i) =>
            React.createElement('div', { key:i, style:{ textAlign:'center', padding:'4px 0', borderLeft:i>0?'1px solid rgba(255,255,255,0.08)':'' } },
              React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:k.color, fontFamily:'DM Sans,sans-serif' } }, k.value),
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:1 } }, k.label),
            )
          ),
        ),
      ),

      // Filters
      React.createElement('div', { style:{ padding:'10px 12px', borderBottom:`1px solid ${_DS.borderLt}`, flexShrink:0, display:'flex', flexDirection:'column', gap:6 } },
        React.createElement('div', { style:{ display:'flex', gap:4, flexWrap:'wrap' } },
          types.map(t =>
            React.createElement('button', { key:t.id, onClick:()=>setTypeFilter(t.id), style:{
              padding:'3px 10px', borderRadius:4, border:`1px solid ${typeFilter===t.id?_DS.gold:_DS.border}`,
              background: typeFilter===t.id?_DS.goldDim:'transparent', cursor:'pointer',
              fontSize:11, fontWeight:typeFilter===t.id?700:400,
              color: typeFilter===t.id?_DS.gold:_DS.text3, fontFamily:'DM Sans,sans-serif',
            } }, t.label),
          ),
        ),
        React.createElement('div', { style:{ display:'flex', gap:4 } },
          agents.map(a =>
            React.createElement('button', { key:a, onClick:()=>setAgentFilter(a), style:{
              padding:'3px 8px', borderRadius:4, border:`1px solid ${agentFilter===a?_DS.navyMid:_DS.border}`,
              background: agentFilter===a?_DS.navyMid:'transparent', cursor:'pointer',
              fontSize:10, color: agentFilter===a?'#fff':_DS.text3, fontFamily:'DM Sans,sans-serif', fontWeight:agentFilter===a?700:400,
            } }, a),
          ),
        ),
      ),

      // Event list grouped by date
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        Object.entries(grouped).map(([date, evList]) =>
          React.createElement('div', { key:date },
            React.createElement('div', { style:{ padding:'8px 16px', background:_DS.bg, borderBottom:`1px solid ${_DS.borderLt}`, fontSize:11, fontWeight:700, color:_DS.text2, fontFamily:'DM Sans,sans-serif', position:'sticky', top:0, zIndex:1 } },
              formatDate(date)),
            evList.map(ev => {
              const es = eventStyle[ev.type] || eventStyle.meeting;
              const ss = statusStyle[ev.status] || statusStyle.scheduled;
              return React.createElement('div', { key:ev.id, onClick:()=>setSelEvent(ev),
                style:{
                  padding:'12px 16px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
                  background: selEvent?.id===ev.id ? 'rgba(192,155,87,0.06)' : 'transparent',
                  borderLeft:`3px solid ${selEvent?.id===ev.id?_DS.gold: ev.status==='overdue'||ev.status==='critical'?'#B82929':'transparent'}`,
                  transition:'background 0.15s',
                }
              },
                React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'flex-start' } },
                  React.createElement('div', { style:{ width:28, height:28, borderRadius:6, background:es.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 } }, es.icon),
                  React.createElement('div', { style:{ flex:1, minWidth:0 } },
                    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:2 } },
                      React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.3, flex:1 } }, ev.title),
                      React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:ss.color, fontFamily:'DM Sans,sans-serif', marginLeft:6, flexShrink:0, textTransform:'uppercase' } }, ss.label),
                    ),
                    React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
                      React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${ev.time}${ev.duration?' · '+ev.duration+'min':''}`),
                      ev.agent !== 'All' && React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `· ${ev.agent.split(' ')[0]}`),
                      ev.lead && React.createElement('span', { style:{ fontSize:10, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `· ${ev.lead}`),
                    ),
                  ),
                ),
              );
            }),
          )
        ),
        filtered.length === 0 && React.createElement('div', { style:{ padding:'40px 20px', textAlign:'center', fontSize:13, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'No events match the selected filters.'),
      ),
    ),

    // ── RIGHT: Event detail ────────────────────────────────────────────────────
    selEvent ? React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      // Detail header
      React.createElement('div', { style:{ padding:'20px 24px', borderBottom:`1px solid ${_DS.border}`, background:_DS.surface, flexShrink:0 } },
        React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'flex-start' } },
          (() => {
            const es = eventStyle[selEvent.type] || eventStyle.meeting;
            return React.createElement('div', { style:{ width:48, height:48, borderRadius:10, background:es.bg, border:`1px solid ${es.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 } }, es.icon);
          })(),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } },
              (eventStyle[selEvent.type]||eventStyle.meeting).label + ' · ' + formatDate(selEvent.date)),
            React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.2, marginBottom:6 } }, selEvent.title),
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' } },
              React.createElement('span', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `⏰ ${selEvent.time}${selEvent.duration?' · '+selEvent.duration+' min':''}`),
              selEvent.location && React.createElement('span', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `📍 ${selEvent.location}`),
            ),
          ),
          React.createElement('div', { style:{ textAlign:'right' } },
            (() => { const ss = statusStyle[selEvent.status] || statusStyle.scheduled;
              return React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:ss.color, background:`${ss.color}15`, padding:'4px 10px', borderRadius:4, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.04em' } }, ss.label.toUpperCase() );
            })(),
          ),
        ),
      ),

      // Detail body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'24px' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 } },
          // Participants
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px 18px' } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Participants'),
            selEvent.lead && React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:8 } },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:_DS.gold, flexShrink:0 } }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, selEvent.lead),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Lead / Client'),
              ),
            ),
            selEvent.agent && React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:8 } },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:_DS.navyMid, flexShrink:0 } }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, selEvent.agent),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Assigned Broker'),
              ),
            ),
          ),
          // Property link
          (() => {
            if (!selEvent.property) return React.createElement('div', null);
            const prop = window.FBR.listings.find(l => l.id === selEvent.property);
            if (!prop) return React.createElement('div', null);
            return React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
              React.createElement('img', { src:prop.photo1, style:{ width:'100%', height:80, objectFit:'cover' }, onError:e=>e.target.style.display='none' }),
              React.createElement('div', { style:{ padding:'10px 14px' } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, prop.title),
                React.createElement('div', { style:{ display:'flex', justifyContent:'space-between' } },
                  React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, prop.neighborhood),
                  React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, prop.price),
                ),
              ),
            );
          })(),
        ),
        // Notes
        selEvent.notes && React.createElement('div', { style:{ background:_DS.bg, border:`1px solid ${_DS.borderLt}`, borderRadius:8, padding:'14px 16px', marginBottom:16 } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'Notes & Context'),
          React.createElement('div', { style:{ fontSize:13, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 } }, selEvent.notes),
        ),
        // Actions
        React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
          React.createElement('button', { style:{ padding:'9px 18px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✓ Mark Complete'),
          React.createElement('button', { style:{ padding:'9px 18px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '↻ Reschedule'),
          React.createElement('button', { style:{ padding:'9px 18px', background:_DS.goldDim, color:_DS.gold, border:`1px solid rgba(192,155,87,0.3)`, borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'DM Sans,sans-serif' } }, '+ Add Note'),
        ),
      ),
    ) : React.createElement('div', { style:{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:_DS.text3, fontSize:13, fontFamily:'DM Sans,sans-serif' } }, 'Select an event to view details.'),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BROKER PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════

function BrokerPerformance({ setScreen }) {
  const _DS = window.DS;
  const _Badge = window.Badge;
  const _Avatar = window.Avatar;
  const _Kpi = window.Kpi;

  const brokerStats = window.FBR.brokerStats;
  const [selBroker, setSelBroker] = React.useState(brokerStats[0]);
  const [metricView, setMetricView] = React.useState('overview'); // 'overview' | 'pipeline' | 'activity'

  const teamPipeline = brokerStats.reduce((a, b) => a + b.pipelineValue, 0);
  const teamClosings = brokerStats.reduce((a, b) => a + b.closings, 0);
  const teamLeads    = brokerStats.reduce((a, b) => a + b.leadsAssigned, 0);
  const teamUntouched= brokerStats.reduce((a, b) => a + b.leadsUntouched, 0);
  const avgScore     = Math.round(brokerStats.reduce((a, b) => a + b.score, 0) / brokerStats.length);

  const ranked = [...brokerStats].sort((a, b) => b.score - a.score);

  const metrics = [
    { key:'leads', label:'Response', value: b => `${b.responseTimeAvg}h avg`, color: b => b.responseTimeAvg<=1?_DS.success:b.responseTimeAvg<=2?_DS.warn:'#B82929', sub: b => 'Avg response time' },
    { key:'followup', label:'Follow-ups', value: b => `${b.followUpsCompleted}/${b.followUpsCompleted+b.followUpsOverdue}`, color: b => _DS.navyMid, sub: b => `${b.followUpsOverdue} overdue` },
    { key:'tours', label:'Tours', value: b => `${b.toursCompleted}/${b.toursScheduled}`, color: b => _DS.gold, sub: b => 'Completed/Scheduled' },
    { key:'offers', label:'Offers', value: b => b.offersSent, color: b => _DS.navyMid, sub: b => `${b.offersActive} active` },
    { key:'closings', label:'Closings', value: b => b.closings, color: b => _DS.success, sub: b => `$${(b.closingVolume/1e6).toFixed(1)}M volume` },
    { key:'pipeline', label:'Pipeline', value: b => `$${(b.pipelineValue/1e6).toFixed(1)}M`, color: b => _DS.gold, sub: b => `$${(b.estCommission/1000).toFixed(0)}K est. commission` },
  ];

  function ScoreBar({ score, size=80 }) {
    const color = score>=85?_DS.success:score>=75?_DS.warn:'#B82929';
    const r = size/2 - 6;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    return React.createElement('svg', { width:size, height:size, viewBox:`0 0 ${size} ${size}` },
      React.createElement('circle', { cx:size/2, cy:size/2, r, fill:'none', stroke:_DS.borderLt, strokeWidth:6 }),
      React.createElement('circle', { cx:size/2, cy:size/2, r, fill:'none', stroke:color, strokeWidth:6,
        strokeDasharray:`${dash} ${circ}`, strokeLinecap:'round',
        transform:`rotate(-90 ${size/2} ${size/2})` }),
      React.createElement('text', { x:size/2, y:size/2+5, textAnchor:'middle', fontSize:size*0.22, fontWeight:800, fill:color, fontFamily:'DM Sans,sans-serif' }, score),
    );
  }

  return React.createElement('div', { style:{ display:'flex', gap:0, height:'calc(100vh - 104px)', overflow:'hidden' } },

    // ── LEFT: Broker list ──────────────────────────────────────────────────────
    React.createElement('div', { style:{ width:320, borderRight:`1px solid ${_DS.border}`, display:'flex', flexDirection:'column', background:_DS.surface, overflow:'hidden', flexShrink:0 } },

      // Team KPIs
      React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px', flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:10 } }, 'Broker Management'),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 } },
          [
            { label:'Avg Score', value:avgScore, color: avgScore>=85?'#5DBF8A':avgScore>=75?_DS.gold:'#FF8080' },
            { label:'Team Pipeline', value:`$${(teamPipeline/1e6).toFixed(0)}M`, color:_DS.gold },
            { label:'Leads Assigned', value:`${teamLeads} (${teamUntouched} ⚠)`, color:'rgba(255,255,255,0.7)' },
            { label:'YTD Closings', value:teamClosings, color:'rgba(255,255,255,0.7)' },
          ].map((k, i) =>
            React.createElement('div', { key:i },
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.35)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:2 } }, k.label),
              React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:k.color, fontFamily:'DM Sans,sans-serif' } }, k.value),
            )
          ),
        ),
      ),

      // Broker list
      React.createElement('div', { style:{ flex:1, overflowY:'auto' } },
        ranked.map((b, rank) =>
          React.createElement('div', { key:b.id, onClick:()=>setSelBroker(b),
            style:{
              padding:'14px 16px', borderBottom:`1px solid ${_DS.borderLt}`, cursor:'pointer',
              background: selBroker?.id===b.id ? 'rgba(192,155,87,0.06)' : 'transparent',
              borderLeft:`3px solid ${selBroker?.id===b.id?_DS.gold:'transparent'}`,
              transition:'background 0.15s',
            }
          },
            React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center', marginBottom:8 } },
              React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.text3, width:18, flexShrink:0 } }, `#${rank+1}`),
              React.createElement(_Avatar, { initials:b.avatar, color:b.color, size:36 }),
              React.createElement('div', { style:{ flex:1, minWidth:0 } },
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, b.name),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, b.role),
              ),
              React.createElement('div', { style:{ textAlign:'right' } },
                React.createElement('div', { style:{ fontSize:20, fontWeight:800, color: b.score>=85?_DS.success:b.score>=75?_DS.warn:'#B82929', fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, b.score),
                React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'SCORE'),
              ),
            ),
            React.createElement('div', { style:{ display:'flex', gap:16, paddingLeft:28 } },
              [
                { label:'Leads', value:b.leadsAssigned, alert: b.leadsUntouched > 0 ? `${b.leadsUntouched} untouched` : null },
                { label:'Tours', value:`${b.toursCompleted}/${b.toursScheduled}` },
                { label:'Pipeline', value:`$${(b.pipelineValue/1e6).toFixed(1)}M`, highlight:true },
              ].map(m =>
                React.createElement('div', { key:m.label },
                  React.createElement('div', { style:{ fontSize:11, fontWeight:700, color: m.highlight?_DS.gold:_DS.text, fontFamily:'DM Sans,sans-serif' } }, m.value),
                  React.createElement('div', { style:{ fontSize:9, color: m.alert?'#B82929':_DS.text3, fontFamily:'DM Sans,sans-serif' } }, m.alert || m.label),
                )
              ),
              b.overdueTasks > 0 && React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, b.overdueTasks),
                React.createElement('div', { style:{ fontSize:9, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, 'Overdue'),
              ),
            ),
          )
        ),
      ),
    ),

    // ── RIGHT: Broker detail ───────────────────────────────────────────────────
    selBroker && React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Header
      React.createElement('div', { style:{ background:_DS.navy, padding:'20px 24px', flexShrink:0, display:'flex', gap:16, alignItems:'center' } },
        React.createElement(_Avatar, { initials:selBroker.avatar, color:selBroker.color, size:52 }),
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', marginBottom:4, textTransform:'uppercase', letterSpacing:'0.1em' } }, selBroker.role),
          React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, selBroker.name),
          React.createElement('div', { style:{ display:'flex', gap:12, fontSize:11, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', null, selBroker.email),
            React.createElement('span', null, selBroker.phone),
          ),
        ),
        React.createElement('div', { style:{ textAlign:'center' } },
          React.createElement(ScoreBar, { score:selBroker.score, size:90 }),
          React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.3)', fontFamily:'DM Sans,sans-serif', marginTop:4, textTransform:'uppercase', letterSpacing:'0.1em' } }, 'Performance Score'),
        ),
      ),

      // Tab bar
      React.createElement('div', { style:{ display:'flex', borderBottom:`1px solid ${_DS.border}`, background:_DS.surface, flexShrink:0 } },
        [['overview','Overview'],['pipeline','Pipeline'],['activity','Activity'],['listings','Listings']].map(([v,l]) =>
          React.createElement('button', { key:v, onClick:()=>setMetricView(v), style:{
            padding:'12px 18px', background:'transparent', border:'none', cursor:'pointer',
            borderBottom:`2px solid ${metricView===v?_DS.gold:'transparent'}`,
            fontSize:12, fontWeight:metricView===v?700:400, color:metricView===v?_DS.text:_DS.text3,
            fontFamily:'DM Sans,sans-serif',
          } }, l),
        ),
      ),

      // Body
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px 24px' } },

        // ── Overview tab ────────────────────────────────────────────────────────
        metricView === 'overview' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 } },
            metrics.map(m =>
              React.createElement('div', { key:m.key, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
                React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, m.label),
                React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:m.color(selBroker), fontFamily:'DM Sans,sans-serif', lineHeight:1, marginBottom:4 } }, m.value(selBroker)),
                React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, m.sub(selBroker)),
              )
            ),
          ),
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px 20px', marginBottom:20 } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, '6-Month Performance Trend'),
            React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'flex-end', height:50 } },
              selBroker.trend.map((v, i) => {
                const maxV = Math.max(...selBroker.trend);
                const h = (v / maxV) * 50;
                const isLast = i === selBroker.trend.length - 1;
                return React.createElement('div', { key:i, style:{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 } },
                  React.createElement('div', { style:{ fontSize:9, fontWeight: isLast?700:400, color: isLast?_DS.gold:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, v),
                  React.createElement('div', { style:{ width:'100%', height:`${h}px`, borderRadius:'3px 3px 0 0', background: isLast?_DS.gold:_DS.navyMid, opacity: isLast?1:0.6, transition:'all 0.3s' } }),
                );
              }),
            ),
          ),
          selBroker.overdueTasks > 0 && React.createElement('div', { style:{ background:'rgba(184,41,41,0.05)', border:'1px solid rgba(184,41,41,0.15)', borderRadius:8, padding:'14px 16px' } },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
              React.createElement('span', { style:{ fontSize:16 } }, '⚠'),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, `${selBroker.overdueTasks} Overdue Tasks`),
                React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, `${selBroker.leadsUntouched} untouched leads · ${selBroker.followUpsOverdue} follow-ups overdue`),
              ),
            ),
          ),
        ),

        // ── Pipeline tab ────────────────────────────────────────────────────────
        metricView === 'pipeline' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:20 } },
            React.createElement('div', { style:{ background:_DS.navy, borderRadius:8, padding:'16px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 } }, 'Pipeline Value'),
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(selBroker.pipelineValue/1e6).toFixed(1)}M`),
            ),
            React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 } }, 'Est. Commission'),
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.success, fontFamily:'DM Sans,sans-serif' } }, `$${(selBroker.estCommission/1000).toFixed(0)}K`),
            ),
            React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 } }, 'Active Offers'),
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.navyMid, fontFamily:'DM Sans,sans-serif' } }, selBroker.offersActive),
            ),
          ),
        ),

        // ── Activity tab ────────────────────────────────────────────────────────
        metricView === 'activity' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 } },
            [
              { label:'Leads Assigned', value:selBroker.leadsAssigned },
              { label:'Untouched Leads', value:selBroker.leadsUntouched, color:selBroker.leadsUntouched>0?'#B82929':undefined },
              { label:'Follow-ups Done', value:selBroker.followUpsCompleted },
              { label:'Follow-ups Overdue', value:selBroker.followUpsOverdue, color:selBroker.followUpsOverdue>0?'#B82929':undefined },
              { label:'Tours Scheduled', value:selBroker.toursScheduled },
              { label:'Tours Completed', value:selBroker.toursCompleted },
            ].map(m =>
              React.createElement('div', { key:m.label, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px 16px' } },
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 } }, m.label),
                React.createElement('div', { style:{ fontSize:22, fontWeight:800, color: m.color||_DS.text, fontFamily:'DM Sans,sans-serif' } }, m.value),
              )
            ),
          ),
          React.createElement('div', { style:{ display:'flex', gap:8 } },
            React.createElement('button', { style:{ padding:'9px 18px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '📋 View Activities'),
            React.createElement('button', { style:{ padding:'9px 18px', background:_DS.bg, color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, '📨 Send Weekly Report'),
          ),
        ),

        // ── Listings tab ────────────────────────────────────────────────────────
        metricView === 'listings' && React.createElement(BrokerListingsPanel, { broker: selBroker }),
      ),
    ),
  );
}

// ── Broker Listings Assignment Panel ─────────────────────────────────────────
function BrokerListingsPanel({ broker }) {
  const _DS = window.DS;
  const allListings = window.FBR.listings || [];

  // Assigned listings: those where listing.agent matches broker name (or in broker.listings array)
  const assignedIds = new Set(
    (broker.listings || []).concat(
      allListings.filter(l => l.agent === broker.name).map(l => l.id)
    )
  );
  const [assigned, setAssigned] = React.useState(new Set(assignedIds));
  const [zoneFilter, setZoneFilter] = React.useState('All');

  const zones = ['All', ...Array.from(new Set(allListings.map(l => l.zone)))];

  const toggle = (id) => {
    setAssigned(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredListings = zoneFilter === 'All'
    ? allListings
    : allListings.filter(l => l.zone === zoneFilter);

  const availableCount = allListings.length - assigned.size;

  function statusBadge(listing) {
    const status = listing.status || 'Active';
    const styles = {
      'Active':          { color:'#2B6E4A', bg:'#E3F2EA' },
      'Under Contract':  { color:'#B87A1A', bg:'#FDF0DC' },
      'Sold':            { color:'#9C948A', bg:'#F0EDE8' },
      'Off Market':      { color:'#163061', bg:'rgba(22,48,97,0.08)' },
    };
    const s = styles[status] || styles['Active'];
    return React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:s.color, background:s.bg, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', flexShrink:0 } }, status);
  }

  return React.createElement('div', null,
    // Summary bar
    React.createElement('div', { style:{ background:_DS.navy, borderRadius:8, padding:'12px 16px', marginBottom:12, display:'flex', alignItems:'center', gap:16 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em' } }, 'Listings Assigned'),
        React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, assigned.size),
      ),
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em' } }, 'Available'),
        React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif' } }, availableCount),
      ),
      React.createElement('div', { style:{ flex:1 } }),
      React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif' } }, broker.name + ' · ' + broker.role),
    ),

    // Filter by zone
    React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:12 } },
      React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Filter by Zone:'),
      React.createElement('select', {
        value:zoneFilter, onChange:e=>setZoneFilter(e.target.value),
        style:{ padding:'5px 10px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:11, fontFamily:'DM Sans,sans-serif', background:'#fff', color:_DS.text, outline:'none', cursor:'pointer' }
      },
        zones.map(z => React.createElement('option', { key:z, value:z }, z)),
      ),
      React.createElement('span', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginLeft:'auto' } }, `${filteredListings.length} listing${filteredListings.length!==1?'s':''} shown`),
    ),

    // All listings with toggle
    filteredListings.map(l => {
      const isAssigned = assigned.has(l.id);
      const shortTitle = l.title.length > 28 ? l.title.slice(0, 28) + '…' : l.title;
      return React.createElement('div', { key:l.id,
        style:{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:_DS.surface, border:`1px solid ${isAssigned?_DS.gold:_DS.border}`, borderRadius:8, marginBottom:8, transition:'border-color 0.15s' }
      },
        React.createElement('img', { src:l.photo1, style:{ width:40, height:30, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
        React.createElement('div', { style:{ flex:1, minWidth:0 } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, shortTitle),
          React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, l.zone.split('–')[0].trim() + ' · ' + l.type),
        ),
        React.createElement('div', { style:{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 } },
          React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, l.price),
          statusBadge(l),
        ),
        React.createElement('button', { onClick:()=>toggle(l.id), style:{
          padding:'6px 12px', borderRadius:6, border:'none', cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif',
          background: isAssigned ? _DS.gold : _DS.bg,
          color:       isAssigned ? _DS.navy : _DS.text2,
          transition:'all 0.15s', flexShrink:0, marginLeft:4,
        } }, isAssigned ? '✓ Assigned' : '+ Assign'),
      );
    }),
  );
}

Object.assign(window, { CalendarTours, BrokerPerformance, BrokerListingsPanel });
