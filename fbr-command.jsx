// FBR Platform — Command Center (Owner Intelligence Dashboard)
// Depends on: fbr-data.js, fbr-ui.jsx

function CommandCenter({ setScreen }) {
  const _DS = window.DS;
  const _Badge = window.Badge;
  const _Avatar = window.Avatar;
  const _Kpi = window.Kpi;

  const leads        = window.FBR.leads;
  const pipeline     = window.FBR.pipeline;
  const offers       = window.FBR.offers;
  const closings     = window.FBR.closings;
  const calendar     = window.FBR.calendarEvents;
  const ads          = window.FBR.ads;
  const brokerStats  = window.FBR.brokerStats;
  const owners       = window.FBR.owners;
  const mktKpis      = window.FBR.market.kpis;

  // ── Computed KPIs ──────────────────────────────────────────────────────────
  const activeLeads      = mktKpis.activeLeads;
  const newLeadsWeek     = 8;
  const untouchedLeads   = leads.filter(l => l.lastTouch === null).length;
  const staleLeads       = leads.filter(l => l.lastTouch && parseInt(l.lastTouch) >= 14).length;
  const toursThisWeek    = calendar.filter(e => e.type === 'tour').length;
  const activeOffersCount= offers.filter(o => o.currentAmount).length;
  const pipelineValue    = mktKpis.pipelineValue;
  const expectedClose    = offers.filter(o => o.status === 'negotiation' || o.status === 'countered').length;
  const commissionRisk   = offers.filter(o => o.status === 'stalled').reduce((a, o) => a + o.commission.total, 0);

  // ── Alerts ────────────────────────────────────────────────────────────────
  const alerts = [
    ...leads.filter(l => l.lastTouch === null).map(l => ({
      level:'danger', icon:'🔴', title:`Untouched Lead: ${l.name}`,
      detail:`${l.budget} · ${l.zone} · Assigned: ${l.agent}`, screen:'re-leads',
    })),
    ...leads.filter(l => l.lastTouch && parseInt(l.lastTouch) >= 14).map(l => ({
      level:'warn', icon:'🟡', title:`Stale: ${l.name}`,
      detail:`${l.lastTouch} days no contact · ${l.budget}`, screen:'re-leads',
    })),
    ...owners.filter(o => o.alert === 'expiring-urgent').map(o => ({
      level:'danger', icon:'🔴', title:`Exclusivity Expiring: ${o.name}`,
      detail:`Expires ${o.exclusivityExpires} — renewal urgent`, screen:'mi-owners',
    })),
    ...owners.filter(o => o.alert === 'expiring').map(o => ({
      level:'warn', icon:'🟡', title:`Exclusivity Expiring Soon: ${o.name}`,
      detail:`Expires ${o.exclusivityExpires} — schedule renewal call`, screen:'mi-owners',
    })),
    ...owners.filter(o => o.alert === 'no-contact').map(o => ({
      level:'warn', icon:'🟡', title:`Owner No Contact: ${o.name}`,
      detail:'18+ days without update — send market report', screen:'mi-owners',
    })),
    ...offers.filter(o => o.status === 'stalled').map(o => ({
      level:'danger', icon:'🔴', title:`Stalled Offer: ${o.prop}`,
      detail:`${o.daysInNegotiation}d stalled · Commission at risk: $${(o.commission.total/1000).toFixed(0)}K`, screen:'re-pipeline',
    })),
  ];

  // ── Upcoming events ───────────────────────────────────────────────────────
  const upcoming = [...calendar].sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).slice(0, 8);

  // ── Closing forecast ──────────────────────────────────────────────────────
  const forecastDeals = [
    { lead:'Emma Langford', prop:'Casa Alegria', amount:3820000, eta:'Jun 28', commission:191000, status:'negotiation', confidence:92 },
    { lead:'Klaus Müller', prop:'Villa El Alma', amount:7350000, eta:'Jul est.', commission:367500, status:'countered', confidence:68 },
    { lead:'Andersons Trust', prop:'Casa Todo Bien', amount:4300000, eta:'Q3 est.', commission:215000, status:'stalled', confidence:42 },
    { lead:'Grupo Pacífico', prop:'Punta Sabana', amount:29900000, eta:'Q3 est.', commission:1495000, status:'qualified', confidence:55 },
  ];

  // ── Event type styles ─────────────────────────────────────────────────────
  const eventStyle = {
    tour:     { bg:'rgba(192,155,87,0.12)', color:'#B87A1A', label:'Tour' },
    followup: { bg:'rgba(184,41,41,0.10)', color:'#B82929', label:'Follow-up' },
    meeting:  { bg:'rgba(22,48,97,0.10)', color:'#163061', label:'Meeting' },
    closing:  { bg:'rgba(43,110,74,0.10)', color:'#2B6E4A', label:'Closing' },
    owner:    { bg:'rgba(192,155,87,0.10)', color:'#B87A1A', label:'Owner' },
    deadline: { bg:'rgba(184,41,41,0.15)', color:'#B82929', label:'Deadline' },
  };

  // ── Campaign top 3 ────────────────────────────────────────────────────────
  const topCampaigns = [...ads.campaigns]
    .filter(c => c.status === 'active')
    .sort((a,b) => b.qualityScore - a.qualityScore)
    .slice(0, 3);

  // ── Stagnant listings ─────────────────────────────────────────────────────
  const stagnant = window.FBR.listings.filter(l => l.daysOnMarket >= 60);

  function SectionHeader({ title, actionLabel, actionScreen, icon }) {
    return React.createElement('div', {
      style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }
    },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
        icon && React.createElement('span', { style:{ fontSize:16 } }, icon),
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, title),
      ),
      actionLabel && React.createElement('button', {
        onClick: () => setScreen(actionScreen),
        style:{ fontSize:11, fontWeight:600, color:_DS.gold, background:'transparent', border:'none', cursor:'pointer', fontFamily:'DM Sans,sans-serif', padding:'4px 8px', borderRadius:4 }
      }, `${actionLabel} →`),
    );
  }

  function Card({ children, style: s }) {
    return React.createElement('div', {
      style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:10, padding:'18px 20px', ...s }
    }, children);
  }

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },

    // ── Hero header ──────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } },
          'Good morning, Melanie.'),
        React.createElement('div', { style:{ fontSize:13, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } },
          'Monday, June 8, 2026 · Here is what matters today.'),
      ),
      React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
        commissionRisk > 0 && React.createElement('div', {
          style:{ background:'#FDE8E8', border:'1px solid rgba(184,41,41,0.25)', borderRadius:6, padding:'7px 14px', fontSize:11, fontWeight:700, color:'#B82929', fontFamily:'DM Sans,sans-serif' }
        }, `⚠ $${(commissionRisk/1000).toFixed(0)}K Commission At Risk`),
        React.createElement('div', {
          style:{ background:_DS.goldDim, border:`1px solid ${_DS.gold}`, borderRadius:6, padding:'7px 14px', fontSize:11, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.05em' }
        }, 'OWNER VIEW'),
      ),
    ),

    // ── KPI Row ──────────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12 } },
      React.createElement(_Kpi, { label:'Active Leads', value:activeLeads, sub:'Total in CRM', icon:'👥', color:_DS.navyMid, onClick:()=>setScreen('re-leads') }),
      React.createElement(_Kpi, { label:'New This Week', value:newLeadsWeek, sub:'Last 7 days', icon:'✦', color:_DS.success }),
      React.createElement(_Kpi, { label:'Untouched', value:untouchedLeads + staleLeads, sub:'Need contact now', icon:'⚠', color:'#B82929', alert:true, onClick:()=>setScreen('re-leads') }),
      React.createElement(_Kpi, { label:'Tours This Week', value:toursThisWeek, sub:'Scheduled', icon:'🏠', color:_DS.gold, onClick:()=>setScreen('re-calendar') }),
      React.createElement(_Kpi, { label:'Active Offers', value:activeOffersCount, sub:'In negotiation', icon:'📝', color:_DS.warn, onClick:()=>setScreen('re-pipeline') }),
      React.createElement(_Kpi, { label:'Expected Closings', value:expectedClose, sub:'This quarter', icon:'✓', color:_DS.success, onClick:()=>setScreen('re-pipeline') }),
      React.createElement(_Kpi, { label:'Pipeline Value', value:`$${(pipelineValue/1e6).toFixed(1)}M`, sub:'All active deals', icon:'◈', color:_DS.gold }),
    ),

    // ── Main Grid ────────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 360px', gap:20 } },

      // ── LEFT column ───────────────────────────────────────────────────────
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },

        // Broker Leaderboard
        React.createElement(Card, null,
          React.createElement(SectionHeader, { title:'Broker Leaderboard', actionLabel:'Full Scorecards', actionScreen:'re-brokers', icon:'🏆' }),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr', gap:0 } },
            // Header row
            React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'32px 1fr 60px 70px 80px 90px 80px', gap:8, padding:'0 0 8px', borderBottom:`1px solid ${_DS.borderLt}`, marginBottom:8 } },
              React.createElement('span', null),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, 'Broker'),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', textAlign:'center' } }, 'Score'),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', textAlign:'right' } }, 'Leads'),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', textAlign:'right' } }, 'Tours'),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', textAlign:'right' } }, 'Pipeline'),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', textAlign:'right' } }, 'Closings'),
            ),
            brokerStats.map((b, rank) =>
              React.createElement('div', { key:b.id, style:{ display:'grid', gridTemplateColumns:'32px 1fr 60px 70px 80px 90px 80px', gap:8, padding:'10px 0', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center' } },
                React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textAlign:'center' } }, rank+1),
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
                  React.createElement(_Avatar, { initials:b.avatar, color:b.color, size:28 }),
                  React.createElement('div', null,
                    React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, b.name.split(' ')[0]),
                    b.overdueTasks > 0 && React.createElement('div', { style:{ fontSize:10, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, `${b.overdueTasks} overdue`),
                  ),
                ),
                React.createElement('div', { style:{ textAlign:'center' } },
                  React.createElement('div', { style:{ fontSize:15, fontWeight:800, color: b.score>=85?_DS.success:b.score>=75?_DS.warn:'#B82929', fontFamily:'DM Sans,sans-serif' } }, b.score),
                  React.createElement('div', { style:{ height:3, background:_DS.borderLt, borderRadius:2, marginTop:3 } },
                    React.createElement('div', { style:{ width:`${b.score}%`, height:'100%', background: b.score>=85?_DS.success:b.score>=75?_DS.warn:'#B82929', borderRadius:2 } }),
                  ),
                ),
                React.createElement('div', { style:{ textAlign:'right', fontSize:13, fontFamily:'DM Sans,sans-serif' } },
                  React.createElement('span', { style:{ fontWeight:600, color:_DS.text } }, b.leadsAssigned),
                  b.leadsUntouched > 0 && React.createElement('span', { style:{ fontSize:10, color:'#B82929', marginLeft:4 } }, `(${b.leadsUntouched} ⚠)`),
                ),
                React.createElement('div', { style:{ textAlign:'right', fontSize:13, fontWeight:500, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `${b.toursCompleted}/${b.toursScheduled}`),
                React.createElement('div', { style:{ textAlign:'right', fontSize:13, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(b.pipelineValue/1e6).toFixed(1)}M`),
                React.createElement('div', { style:{ textAlign:'right', fontSize:13, fontWeight:700, color:_DS.success, fontFamily:'DM Sans,sans-serif' } }, b.closings),
              )
            ),
          ),
        ),

        // Stagnant Inventory + Upcoming Tours row
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },

          // Stagnant listings
          React.createElement(Card, null,
            React.createElement(SectionHeader, { title:'Stagnant Inventory', actionLabel:'View All', actionScreen:'mi-inventory', icon:'🏠' }),
            stagnant.map(l =>
              React.createElement('div', { key:l.id, style:{ display:'flex', gap:10, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
                React.createElement('img', { src:l.photo1, style:{ width:44, height:34, objectFit:'cover', borderRadius:4, flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ flex:1, minWidth:0 } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, l.title),
                  React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, l.neighborhood),
                ),
                React.createElement('div', { style:{ textAlign:'right', flexShrink:0 } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, l.price),
                  React.createElement('div', { style:{ fontSize:10, color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, `${l.daysOnMarket}d on market`),
                ),
              )
            ),
            stagnant.length === 0 && React.createElement('div', { style:{ textAlign:'center', padding:'20px', fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'No stagnant listings.'),
          ),

          // Campaign snapshot
          React.createElement(Card, null,
            React.createElement(SectionHeader, { title:'Campaign Performance', actionLabel:'Full Analysis', actionScreen:'mkt-campaigns', icon:'📣' }),
            topCampaigns.map(c =>
              React.createElement('div', { key:c.id, style:{ padding:'8px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
                React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 } },
                  React.createElement('div', { style:{ flex:1, minWidth:0 } },
                    React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, c.name),
                    React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${c.platform} · ${c.leads} leads · $${c.cpl} CPL`),
                  ),
                  React.createElement('div', { style:{ fontSize:13, fontWeight:800, color: c.qualityScore>=80?_DS.success:c.qualityScore>=60?_DS.warn:'#B82929', fontFamily:'DM Sans,sans-serif', marginLeft:8 } }, c.qualityScore),
                ),
                React.createElement('div', { style:{ height:3, background:_DS.borderLt, borderRadius:2 } },
                  React.createElement('div', { style:{ width:`${c.qualityScore}%`, height:'100%', background: c.qualityScore>=80?_DS.success:c.qualityScore>=60?_DS.warn:'#B82929', borderRadius:2 } }),
                ),
              )
            ),
          ),
        ),
      ),

      // ── RIGHT column ──────────────────────────────────────────────────────
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },

        // Alerts panel
        React.createElement(Card, null,
          React.createElement(SectionHeader, { title:'Priority Alerts', icon:'⚡' }),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:6, maxHeight:240, overflowY:'auto' } },
            alerts.length === 0
              ? React.createElement('div', { style:{ textAlign:'center', padding:'20px', fontSize:12, color:_DS.success, fontFamily:'DM Sans,sans-serif' } }, '✓ No critical alerts')
              : alerts.map((a, i) =>
                  React.createElement('div', { key:i, onClick:()=>setScreen(a.screen),
                    style:{ display:'flex', gap:10, padding:'8px 10px', borderRadius:6, cursor:'pointer',
                      background: a.level==='danger'?'rgba(184,41,41,0.05)':'rgba(184,122,26,0.05)',
                      border: `1px solid ${a.level==='danger'?'rgba(184,41,41,0.15)':'rgba(184,122,26,0.15)'}`,
                    }
                  },
                    React.createElement('span', { style:{ fontSize:12, flexShrink:0, lineHeight:1.4 } }, a.icon),
                    React.createElement('div', { style:{ flex:1, minWidth:0 } },
                      React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.3 } }, a.title),
                      React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:1 } }, a.detail),
                    ),
                    React.createElement('span', { style:{ fontSize:10, color:_DS.text3 } }, '→'),
                  )
                ),
          ),
        ),

        // Upcoming agenda
        React.createElement(Card, null,
          React.createElement(SectionHeader, { title:'Upcoming Activity', actionLabel:'Full Calendar', actionScreen:'re-calendar', icon:'📅' }),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:6 } },
            upcoming.slice(0,6).map(ev => {
              const es = eventStyle[ev.type] || eventStyle.meeting;
              return React.createElement('div', { key:ev.id, style:{ display:'flex', gap:10, alignItems:'flex-start', padding:'7px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
                React.createElement('div', { style:{ width:36, flexShrink:0, textAlign:'center' } },
                  React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase' } }, ev.date.slice(5)),
                  React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, ev.time),
                ),
                React.createElement('div', { style:{ flex:1, minWidth:0 } },
                  React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1.3 } }, ev.title),
                  ev.lead && React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, ev.lead),
                ),
                React.createElement('span', { style:{ fontSize:9, fontWeight:700, color:es.color, background:es.bg, padding:'2px 6px', borderRadius:3, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, es.label),
              );
            }),
          ),
        ),

        // Closing forecast
        React.createElement(Card, null,
          React.createElement(SectionHeader, { title:'Closing Forecast', actionLabel:'Pipeline', actionScreen:'re-pipeline', icon:'◈' }),
          React.createElement('div', { style:{ marginBottom:12, padding:'10px 12px', background:_DS.goldDim, borderRadius:6, border:`1px solid rgba(192,155,87,0.2)` } },
            React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', fontWeight:700, letterSpacing:'0.08em', marginBottom:2 } }, 'Q3 Pipeline'),
            React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(pipelineValue/1e6).toFixed(1)}M`),
          ),
          forecastDeals.map((d, i) =>
            React.createElement('div', { key:i, style:{ display:'flex', gap:10, alignItems:'center', padding:'7px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
              React.createElement('div', { style:{ width:10, height:10, borderRadius:'50%', flexShrink:0,
                background: d.confidence>80?_DS.success:d.confidence>55?_DS.warn:'#B82929' } }),
              React.createElement('div', { style:{ flex:1, minWidth:0 } },
                React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, d.lead),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${d.prop} · ${d.eta}`),
              ),
              React.createElement('div', { style:{ textAlign:'right', flexShrink:0 } },
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, `$${(d.amount/1e6).toFixed(2)}M`),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${d.confidence}% conf.`),
              ),
            )
          ),
        ),
      ),
    ),
  );
}

Object.assign(window, { CommandCenter });
