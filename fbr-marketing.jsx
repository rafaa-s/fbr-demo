// FBR Platform — Marketing Performance: Campaign Command Center · Paid Media · All Listings · Pricing · Demographics · Content · CMS
// Depends on: fbr-data.js, fbr-ui.jsx

// ═══════════════════════════════════════════════════════════════════════════════
// CAMPAIGN COMMAND CENTER
// ═══════════════════════════════════════════════════════════════════════════════

function CampaignCommandCenter({ setScreen }) {
  const _DS  = window.DS;
  const _Kpi = window.Kpi;
  const _Badge = window.Badge;

  const ads     = window.FBR.ads;
  const summary = ads.summary;
  const campaigns = ads.campaigns || [];
  const brokers   = window.FBR.brokerStats;

  const [selectedCampaign, setSelectedCampaign] = React.useState(null);
  const [filterPlatform, setFilterPlatform]       = React.useState('All');
  const [campaignType, setCampaignType] = React.useState('digital'); // 'digital' | 'atl'
  const [showATLForm, setShowATLForm] = React.useState(false);
  const [atlFormData, setAtlFormData] = React.useState({ type:'Billboard', placement:'', zone:'', startDate:'', endDate:'', totalCost:'', estReach:'', notes:'' });

  const ATL_CAMPAIGNS = [
    { id:'ATL-001', type:'Billboard', placement:'Guanacaste Airport — Exit Ramp A', zone:'Santa Cruz / Regional', startDate:'2026-06-01', endDate:'2026-08-31', totalCost:3800, estReach:45000, status:'active', notes:'FBR logo + QR code. Designed for arriving international tourists.' },
    { id:'ATL-002', type:'Billboard', placement:'Route 21 — Tamarindo Junction', zone:'Tamarindo / Flamingo', startDate:'2026-05-01', endDate:'2026-07-31', totalCost:2400, estReach:28000, status:'active', notes:'Two-sided billboard visible from both directions.' },
    { id:'ATL-003', type:'Print / Magazine', placement:'CR Living Magazine — Q2 Full Page', zone:'National / International', startDate:'2026-04-01', endDate:'2026-06-30', totalCost:1200, estReach:12000, status:'completed', notes:'Double-page spread in "Luxury Real Estate" section.' },
    { id:'ATL-004', type:'Print / Magazine', placement:'Tico Times — Luxury RE Supplement', zone:'National', startDate:'2026-07-01', endDate:'2026-07-31', totalCost:800, estReach:8500, status:'planned', notes:'Half-page ad in digital + print edition.' },
    { id:'ATL-005', type:'Event / Sponsorship', placement:'Surf Classic Guanacaste 2026', zone:'Playa Flamingo', startDate:'2026-07-15', endDate:'2026-07-17', totalCost:4500, estReach:5000, status:'planned', notes:'FBR booth, branded merchandise, logo on event signage.' },
    { id:'ATL-006', type:'Radio', placement:'Radio Guanacaste — Morning Drive Spot', zone:'Guanacaste Province', startDate:'2026-06-01', endDate:'2026-06-30', totalCost:650, estReach:22000, status:'active', notes:'30-second spot weekdays 7-9am.' },
    { id:'ATL-007', type:'Out-of-Home', placement:'Flamingo Beach Boardwalk Banners', zone:'Playa Flamingo', startDate:'2026-01-01', endDate:'2026-12-31', totalCost:1600, estReach:35000, status:'active', notes:'6 hanging banners along the main boardwalk.' },
    { id:'ATL-008', type:'TV / OTT', placement:'Canal 7 — Prime Time 30s Spot', zone:'National', startDate:'2026-08-01', endDate:'2026-08-31', totalCost:6200, estReach:180000, status:'planned', notes:'Targeting nationwide luxury lifestyle audience.' },
  ];

  const totalSpend       = campaigns.reduce((a,c)=>a+c.spend,0);
  const totalLeads       = campaigns.reduce((a,c)=>a+c.leads,0);
  const totalOpps        = campaigns.reduce((a,c)=>a+c.opportunities,0);
  const totalPipeline    = campaigns.reduce((a,c)=>a+c.pipelineValue,0);
  const avgCpl           = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;
  const activeCampaigns  = campaigns.filter(c=>c.status==='active').length;
  const totalImpressions = campaigns.reduce((a,c)=>a+c.impressions,0);

  const platforms = ['All', ...Array.from(new Set(campaigns.map(c=>c.platform)))];
  const filtered  = campaigns.filter(c => filterPlatform==='All' || c.platform===filterPlatform);

  const sel = selectedCampaign || filtered[0] || null;

  // ATL helpers
  const atlTotalSpend    = ATL_CAMPAIGNS.reduce((a,c)=>a+c.totalCost,0);
  const atlTotalReach    = ATL_CAMPAIGNS.reduce((a,c)=>a+c.estReach,0);
  const atlActivePlacements = ATL_CAMPAIGNS.filter(c=>c.status==='active').length;
  const atlPlannedSpend  = ATL_CAMPAIGNS.filter(c=>c.status==='planned').reduce((a,c)=>a+c.totalCost,0);

  const atlTypeColor = (type) => {
    if (type==='Billboard')          return { bg:'#0F2340', color:'#fff' };
    if (type==='Print / Magazine')   return { bg:'#B87A1A', color:'#fff' };
    if (type==='Event / Sponsorship')return { bg:'#2B6E4A', color:'#fff' };
    if (type==='Radio')              return { bg:'#8B4B8B', color:'#fff' };
    if (type==='Out-of-Home')        return { bg:'#0D9488', color:'#fff' };
    if (type==='TV / OTT')           return { bg:'#B82929', color:'#fff' };
    return { bg:'#6B7280', color:'#fff' };
  };

  const atlStatusStyle = (s) => {
    if (s==='active')    return { bg:'#D1FAE5', color:'#065F46' };
    if (s==='planned')   return { bg:'#DBEAFE', color:'#1E40AF' };
    if (s==='completed') return { bg:'#F3F4F6', color:'#6B7280' };
    return { bg:'#F3F4F6', color:'#6B7280' };
  };

  const ATL_TYPES = ['Billboard','Print / Magazine','Event / Sponsorship','Radio','Out-of-Home','TV / OTT'];

  function fmtM(n) { return n >= 1e6 ? '$'+(n/1e6).toFixed(1)+'M' : n>=1e3 ? '$'+(n/1e3).toFixed(0)+'K' : '$'+n; }
  function fmtN(n) { return n>=1e6 ? (n/1e6).toFixed(1)+'M' : n>=1e3 ? (n/1e3).toFixed(0)+'K' : String(n); }

  const statusStyle = (s) => {
    if (s==='active')  return { bg:'#D1FAE5', color:'#065F46' };
    if (s==='paused')  return { bg:'#FEF3C7', color:'#92400E' };
    if (s==='draft')   return { bg:'#F3F4F6', color:'#6B7280' };
    return { bg:'#F3F4F6', color:'#6B7280' };
  };

  const platformColor = (p) => ({
    'Meta':'#1877F2', 'Google':'#EA4335', 'YouTube':'#FF0000', 'Instagram':'#E1306C'
  }[p] || '#9C948A');

  // Top campaign by CPL quality
  const topCampaigns = [...campaigns].sort((a,b)=>b.qualityScore-a.qualityScore).slice(0,3);
  const atRiskCampaigns = campaigns.filter(c=>c.fatigue||c.alert);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg } },

    // ── KPI Row ──────────────────────────────────────────────────────────────
    campaignType === 'digital'
      ? React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12, padding:'20px 24px 0' } },
          [
            { label:'Active Campaigns', value:String(activeCampaigns), sub:'of '+campaigns.length+' total' },
            { label:'Total Spend (MTD)', value:fmtM(totalSpend), sub:'all platforms' },
            { label:'Total Leads', value:String(totalLeads), sub:'from paid media' },
            { label:'Qualified Leads', value:String(totalOpps), sub:'pipeline stage' },
            { label:'Cost / Qualified Lead', value:'$'+Math.round(totalSpend/(totalOpps||1)), sub:'blended CPQ' },
            { label:'Pipeline Value', value:fmtM(totalPipeline), sub:'from campaigns' },
            { label:'Impressions', value:fmtN(totalImpressions), sub:'this month' },
          ].map(k =>
            React.createElement('div', { key:k.label, style:{ background:'#fff', borderRadius:8, padding:'14px 16px', border:'1px solid #EAE5DC' } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, k.label),
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, k.value),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', marginTop:4, fontFamily:'DM Sans,sans-serif' } }, k.sub),
            )
          ),
        )
      : React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, padding:'20px 24px 0' } },
          [
            { label:'Total ATL Spend', value:fmtM(atlTotalSpend), sub:'all placements' },
            { label:'Total Est. Reach', value:fmtN(atlTotalReach), sub:'combined audience' },
            { label:'Active Placements', value:String(atlActivePlacements), sub:'currently running' },
            { label:'Planned Spend', value:fmtM(atlPlannedSpend), sub:'upcoming placements' },
          ].map(k =>
            React.createElement('div', { key:k.label, style:{ background:'#fff', borderRadius:8, padding:'14px 16px', border:'1px solid #EAE5DC' } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, k.label),
              React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, k.value),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', marginTop:4, fontFamily:'DM Sans,sans-serif' } }, k.sub),
            )
          ),
        ),

    // ── Main body ─────────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns: campaignType==='atl' && showATLForm ? '1fr 340px' : campaignType==='digital' ? '1fr 340px' : '1fr', gap:0, flex:1, overflow:'hidden', margin:'16px 24px 24px' } },

      // Left: campaign list (Digital) or ATL table
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', display:'flex', flexDirection:'column', overflow:'hidden', marginRight: (campaignType==='digital' || (campaignType==='atl' && showATLForm)) ? 12 : 0 } },
        // header + filters / type toggle
        React.createElement('div', { style:{ padding:'16px 20px', borderBottom:'1px solid #EAE5DC', display:'flex', alignItems:'center', gap:10 } },
          React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', flex:1 } }, campaignType==='digital' ? 'All Campaigns' : 'ATL Placements'),
          // Digital / ATL toggle
          React.createElement('div', { style:{ display:'flex', borderRadius:6, overflow:'hidden', border:'1px solid #E4DDD0', marginRight:8 } },
            ['digital','atl'].map(t =>
              React.createElement('button', { key:t, onClick:()=>{ setCampaignType(t); setShowATLForm(false); }, style:{
                padding:'5px 14px', border:'none', borderRight: t==='digital' ? '1px solid #E4DDD0' : 'none',
                background: campaignType===t ? _DS.navy : 'transparent',
                color: campaignType===t ? '#fff' : _DS.navy,
                fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif',
                textTransform:'uppercase', letterSpacing:'0.06em'
              } }, t==='digital' ? 'Digital' : 'ATL')
            )
          ),
          // Platform filters (digital only)
          campaignType==='digital' && platforms.map(p =>
            React.createElement('button', { key:p, onClick:()=>setFilterPlatform(p), style:{
              padding:'5px 12px', borderRadius:5, border:'1px solid '+(filterPlatform===p?_DS.gold:'#E4DDD0'),
              background:filterPlatform===p?_DS.gold:'transparent', color:filterPlatform===p?'#fff':_DS.navy,
              fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif'
            } }, p)
          ),
          // ATL add button
          campaignType==='atl' && React.createElement('button', { onClick:()=>setShowATLForm(true), style:{
            padding:'5px 14px', borderRadius:5, border:'1px solid '+_DS.gold,
            background:_DS.gold, color:'#fff',
            fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif'
          } }, '+ Add Placement'),
        ),

        // ── Digital campaign view ──
        campaignType==='digital' && React.createElement(React.Fragment, null,
          // column headers
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 80px 70px 60px 70px 70px 70px 80px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
            ['Campaign','Platform','Status','Spend','Leads','CPL','Opps','Score'].map(h =>
              React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
            )
          ),
          // rows
          React.createElement('div', { style:{ overflow:'auto', flex:1 } },
            filtered.map(c =>
              React.createElement('div', { key:c.id, onClick:()=>setSelectedCampaign(c),
                style:{
                  display:'grid', gridTemplateColumns:'2fr 80px 70px 60px 70px 70px 70px 80px',
                  padding:'12px 20px', borderBottom:'1px solid #F0EDE8', cursor:'pointer',
                  background: sel?.id===c.id ? '#F5F2EC' : '#fff',
                  transition:'background 0.15s',
                }
              },
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.name),
                  c.alert && React.createElement('div', { style:{ fontSize:10, color:'#B45309', marginTop:2, fontFamily:'DM Sans,sans-serif' } }, '⚠ '+c.alert.slice(0,55)+'…'),
                ),
                React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
                  React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:platformColor(c.platform), fontFamily:'DM Sans,sans-serif' } }, c.platform)
                ),
                React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
                  React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10, background:statusStyle(c.status).bg, color:statusStyle(c.status).color, fontFamily:'DM Sans,sans-serif' } }, c.status)
                ),
                ...['$'+c.spend.toLocaleString(), String(c.leads), '$'+c.cpl, String(c.opportunities)].map((v,i) =>
                  React.createElement('div', { key:i, style:{ display:'flex', alignItems:'center', fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', fontWeight:500 } }, v)
                ),
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4 } },
                  React.createElement('div', { style:{ flex:1, height:4, borderRadius:2, background:'#EAE5DC' } },
                    React.createElement('div', { style:{ height:'100%', borderRadius:2, width:c.qualityScore+'%', background: c.qualityScore>=80?'#10B981':c.qualityScore>=50?'#F59E0B':'#EF4444' } })
                  ),
                  React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.qualityScore),
                ),
              )
            )
          ),
        ),

        // ── ATL campaign view ──
        campaignType==='atl' && React.createElement(React.Fragment, null,
          // ATL column headers
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'120px 1fr 140px 160px 80px 90px 90px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
            ['Type','Placement','Zone','Dates','Cost','Est. Reach','Status'].map(h =>
              React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
            )
          ),
          // ATL rows
          React.createElement('div', { style:{ overflow:'auto', flex:1 } },
            ATL_CAMPAIGNS.map((c,i) =>
              React.createElement('div', { key:c.id,
                style:{
                  display:'grid', gridTemplateColumns:'120px 1fr 140px 160px 80px 90px 90px',
                  padding:'12px 20px', borderBottom:'1px solid #F0EDE8',
                  background: i%2===0 ? '#fff' : '#FAFAF8',
                }
              },
                // Type badge
                React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
                  React.createElement('span', { style:{
                    fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:5,
                    background: atlTypeColor(c.type).bg, color: atlTypeColor(c.type).color,
                    fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:110
                  } }, c.type)
                ),
                // Placement
                React.createElement('div', { style:{ display:'flex', flexDirection:'column', justifyContent:'center', paddingRight:8 } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.placement),
                  React.createElement('div', { style:{ fontSize:10, color:'#9C948A', marginTop:2, fontFamily:'DM Sans,sans-serif' } }, c.notes.length>60 ? c.notes.slice(0,60)+'…' : c.notes),
                ),
                // Zone
                React.createElement('div', { style:{ display:'flex', alignItems:'center', fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.zone),
                // Dates
                React.createElement('div', { style:{ display:'flex', alignItems:'center', fontSize:11, color:'#6B7280', fontFamily:'DM Sans,sans-serif' } }, c.startDate+' → '+c.endDate),
                // Cost
                React.createElement('div', { style:{ display:'flex', alignItems:'center', fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, '$'+c.totalCost.toLocaleString()),
                // Est Reach
                React.createElement('div', { style:{ display:'flex', alignItems:'center', fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtN(c.estReach)),
                // Status
                React.createElement('div', { style:{ display:'flex', alignItems:'center' } },
                  React.createElement('span', { style:{
                    fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10,
                    background: atlStatusStyle(c.status).bg, color: atlStatusStyle(c.status).color,
                    fontFamily:'DM Sans,sans-serif'
                  } }, c.status)
                ),
              )
            )
          ),
        ),
      ),

      // Right: campaign detail (digital) OR ATL add form
      campaignType==='digital' && (sel ? React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', display:'flex', flexDirection:'column', overflow:'hidden' } },
        // nav header
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.gold, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, sel.platform + ' · ' + sel.objective),
          React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', lineHeight:1.3 } }, sel.name),
          React.createElement('div', { style:{ display:'flex', gap:8, marginTop:8 } },
            React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:statusStyle(sel.status).bg, color:statusStyle(sel.status).color, fontFamily:'DM Sans,sans-serif' } }, sel.status.toUpperCase()),
            sel.fatigue && React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:'#FEF3C7', color:'#92400E', fontFamily:'DM Sans,sans-serif' } }, '⚠ FATIGUED'),
          ),
        ),
        React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1 } },
          // Metrics grid
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 } },
            [
              ['Spend','$'+sel.spend.toLocaleString()],
              ['Daily Budget','$'+sel.budget+'/day'],
              ['Impressions',fmtN(sel.impressions)],
              ['Clicks',fmtN(sel.clicks)],
              ['CTR',sel.ctr+'%'],
              ['CPC','$'+sel.cpc],
              ['CPM','$'+sel.cpm],
              ['Leads',String(sel.leads)],
              ['CPL','$'+sel.cpl],
              ['Opportunities',String(sel.opportunities)],
              ['Pipeline',fmtM(sel.pipelineValue)],
              ['Quality Score',String(sel.qualityScore)+'/100'],
            ].map(([l,v]) =>
              React.createElement('div', { key:l, style:{ background:'#F9F8F5', borderRadius:6, padding:'10px 12px' } },
                React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' } }, l),
                React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginTop:3 } }, v),
              )
            )
          ),
          // Audience
          React.createElement('div', { style:{ background:'#F9F8F5', borderRadius:6, padding:'12px', marginBottom:12 } },
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 } }, 'Audience'),
            React.createElement('div', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, sel.audience),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', marginTop:4, fontFamily:'DM Sans,sans-serif' } }, sel.targetCountry + ' · ' + sel.zone),
          ),
          // Trend
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, padding:'10px 12px', background:'#F9F8F5', borderRadius:6, marginBottom:12 } },
            React.createElement('span', { style:{ fontSize:18 } }, sel.trend?.startsWith('+') ? '↗' : '↘'),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:11, fontWeight:700, color: sel.trend?.startsWith('+') ? '#059669':'#DC2626', fontFamily:'DM Sans,sans-serif' } }, sel.trend + ' vs last period'),
              React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, 'Performance trend'),
            ),
          ),
          // Alert
          sel.alert && React.createElement('div', { style:{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:6, padding:'10px 12px' } },
            React.createElement('div', { style:{ fontSize:11, color:'#92400E', fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, sel.alert),
          ),
        ),
      ) : null),

      // Right: ATL Add Placement form panel
      campaignType==='atl' && showATLForm && React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', display:'flex', flexDirection:'column', overflow:'hidden' } },
        // Form header
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'New ATL Placement'),
          React.createElement('button', { onClick:()=>setShowATLForm(false), style:{ background:'rgba(255,255,255,0.1)', border:'none', color:'#fff', borderRadius:4, width:24, height:24, cursor:'pointer', fontSize:14, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Sans,sans-serif' } }, '×'),
        ),
        React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1, display:'flex', flexDirection:'column', gap:12 } },
          // Type
          React.createElement('div', null,
            React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Type'),
            React.createElement('select', { value:atlFormData.type, onChange:e=>setAtlFormData({...atlFormData, type:e.target.value}), style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', background:'#fff' } },
              ATL_TYPES.map(t => React.createElement('option', { key:t, value:t }, t))
            ),
          ),
          // Placement name
          React.createElement('div', null,
            React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Placement Name'),
            React.createElement('input', { type:'text', value:atlFormData.placement, onChange:e=>setAtlFormData({...atlFormData, placement:e.target.value}), placeholder:'e.g. Airport Exit Ramp Banner', style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
          ),
          // Zone
          React.createElement('div', null,
            React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Zone'),
            React.createElement('input', { type:'text', value:atlFormData.zone, onChange:e=>setAtlFormData({...atlFormData, zone:e.target.value}), placeholder:'e.g. Playa Flamingo', style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
          ),
          // Dates
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 } },
            React.createElement('div', null,
              React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Start Date'),
              React.createElement('input', { type:'date', value:atlFormData.startDate, onChange:e=>setAtlFormData({...atlFormData, startDate:e.target.value}), style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
            ),
            React.createElement('div', null,
              React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'End Date'),
              React.createElement('input', { type:'date', value:atlFormData.endDate, onChange:e=>setAtlFormData({...atlFormData, endDate:e.target.value}), style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
            ),
          ),
          // Cost + Reach
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 } },
            React.createElement('div', null,
              React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Total Cost ($)'),
              React.createElement('input', { type:'number', value:atlFormData.totalCost, onChange:e=>setAtlFormData({...atlFormData, totalCost:e.target.value}), placeholder:'0', style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
            ),
            React.createElement('div', null,
              React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Est. Reach'),
              React.createElement('input', { type:'number', value:atlFormData.estReach, onChange:e=>setAtlFormData({...atlFormData, estReach:e.target.value}), placeholder:'0', style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', boxSizing:'border-box' } }),
            ),
          ),
          // Notes
          React.createElement('div', null,
            React.createElement('label', { style:{ display:'block', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Notes'),
            React.createElement('textarea', { value:atlFormData.notes, onChange:e=>setAtlFormData({...atlFormData, notes:e.target.value}), placeholder:'Details about this placement...', rows:3, style:{ width:'100%', padding:'8px 10px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', resize:'vertical', boxSizing:'border-box' } }),
          ),
          // Buttons
          React.createElement('div', { style:{ display:'flex', gap:8, marginTop:4 } },
            React.createElement('button', { onClick:()=>setShowATLForm(false), style:{ flex:1, padding:'10px', background:'transparent', color:_DS.navy, border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Cancel'),
            React.createElement('button', { onClick:()=>{ setAtlFormData({ type:'Billboard', placement:'', zone:'', startDate:'', endDate:'', totalCost:'', estReach:'', notes:'' }); setShowATLForm(false); }, style:{ flex:1, padding:'10px', background:_DS.gold, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Save Placement'),
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAID MEDIA PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════

function PaidMediaPerformance({ setScreen }) {
  const _DS    = window.DS;
  const _Badge = window.Badge;

  const ads      = window.FBR.ads;
  const campaigns = ads.campaigns || [];
  const brokers   = window.FBR.brokerStats;

  const [groupBy, setGroupBy] = React.useState('platform'); // 'platform' | 'objective' | 'zone'

  function fmtM(n) { return n>=1e6?'$'+(n/1e6).toFixed(1)+'M':n>=1e3?'$'+(n/1e3).toFixed(0)+'K':'$'+n; }
  function fmtN(n) { return n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(0)+'K':String(n); }

  // Group campaigns
  const groups = {};
  campaigns.forEach(c => {
    const key = groupBy==='platform' ? c.platform : groupBy==='objective' ? c.objective : (c.zone||'All');
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });

  const groupStats = Object.entries(groups).map(([key, cs]) => ({
    key,
    count: cs.length,
    spend: cs.reduce((a,c)=>a+c.spend,0),
    impressions: cs.reduce((a,c)=>a+c.impressions,0),
    clicks: cs.reduce((a,c)=>a+c.clicks,0),
    leads: cs.reduce((a,c)=>a+c.leads,0),
    opps: cs.reduce((a,c)=>a+c.opportunities,0),
    pipeline: cs.reduce((a,c)=>a+c.pipelineValue,0),
    avgQs: Math.round(cs.reduce((a,c)=>a+c.qualityScore,0)/cs.length),
    campaigns: cs,
  })).sort((a,b)=>b.spend-a.spend);

  // broker assignments (assign top campaigns to brokers by listing focus)
  const brokerMap = {};
  campaigns.forEach(c => {
    if (!c.listingFocus) return;
    const listing = (window.FBR.listings||[]).find(l=>l.id===c.listingFocus);
    if (!listing) return;
    const b = listing.agent;
    if (!brokerMap[b]) brokerMap[b] = { spend:0, leads:0, pipeline:0, campaigns:0 };
    brokerMap[b].spend    += c.spend;
    brokerMap[b].leads    += c.leads;
    brokerMap[b].pipeline += c.pipelineValue;
    brokerMap[b].campaigns += 1;
  });

  const totalSpend = campaigns.reduce((a,c)=>a+c.spend,0);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, padding:'20px 24px', gap:16, overflow:'auto' } },

    // ── Header ───────────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12 } },
      React.createElement('div', { style:{ flex:1 } },
        React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Paid Media Performance'),
        React.createElement('div', { style:{ fontSize:12, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'MTD spend analysis across Meta, Google, and all active channels'),
      ),
      ['platform','objective','zone'].map(g =>
        React.createElement('button', { key:g, onClick:()=>setGroupBy(g), style:{
          padding:'7px 14px', borderRadius:6, border:'1px solid '+(groupBy===g?_DS.gold:'#E4DDD0'),
          background:groupBy===g?_DS.gold:'transparent', color:groupBy===g?'#fff':_DS.navy,
          fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif', textTransform:'capitalize'
        } }, 'By '+g)
      ),
    ),

    // ── Group Performance Cards ───────────────────────────────────────────────
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16 } },
      groupStats.map(g =>
        React.createElement('div', { key:g.key, style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
          React.createElement('div', { style:{ background:_DS.navy, padding:'14px 16px', display:'flex', alignItems:'center', gap:10 } },
            React.createElement('div', { style:{ flex:1 } },
              React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, g.key),
              React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, g.count+' campaign'+(g.count!==1?'s':'')),
            ),
            React.createElement('div', { style:{ textAlign:'right' } },
              React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_DS.gold, fontFamily:'DM Sans,sans-serif' } }, fmtM(g.spend)),
              React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' } }, Math.round(g.spend/totalSpend*100)+'% of budget'),
            ),
          ),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#EAE5DC' } },
            [
              ['Impressions', fmtN(g.impressions)],
              ['Leads', String(g.leads)],
              ['CPL', '$'+Math.round(g.spend/(g.leads||1))],
              ['Qualified', String(g.opps)],
              ['Pipeline', fmtM(g.pipeline)],
              ['Avg QS', String(g.avgQs)],
            ].map(([l,v]) =>
              React.createElement('div', { key:l, style:{ background:'#fff', padding:'10px 12px' } },
                React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' } }, l),
                React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginTop:3 } }, v),
              )
            )
          ),
          // mini campaign list
          React.createElement('div', { style:{ padding:'0 0 4px' } },
            g.campaigns.map(c =>
              React.createElement('div', { key:c.id, style:{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderTop:'1px solid #F0EDE8' } },
                React.createElement('div', { style:{ flex:1 } },
                  React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.name.length>45?c.name.slice(0,45)+'…':c.name),
                ),
                React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, c.leads+' leads'),
                React.createElement('span', { style:{ fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:8, background:c.status==='active'?'#D1FAE5':'#FEF3C7', color:c.status==='active'?'#065F46':'#92400E', fontFamily:'DM Sans,sans-serif' } }, c.status),
              )
            )
          ),
        )
      )
    ),

    // ── Broker Attribution ────────────────────────────────────────────────────
    Object.keys(brokerMap).length > 0 && React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 20px', borderBottom:'1px solid #EAE5DC' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Campaign → Broker Attribution'),
        React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Campaigns with a specific listing assigned to a broker'),
      ),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'#EAE5DC' } },
        Object.entries(brokerMap).map(([b, s]) =>
          React.createElement('div', { key:b, style:{ background:'#fff', padding:'14px 16px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, b),
            React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:4 } },
              [['Campaigns',String(s.campaigns)],['Ad Spend',fmtM(s.spend)],['Leads',String(s.leads)],['Pipeline',fmtM(s.pipeline)]].map(([l,v])=>
                React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between' } },
                  React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                  React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
                )
              )
            )
          )
        )
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ALL LISTINGS — Market Distribution Intelligence Matrix + Map
// ═══════════════════════════════════════════════════════════════════════════════

const AGENCIES = [
  { id:'fbr',      name:'Flamingo Beach Realty',  color:'#0F2340', short:'FBR' },
  { id:'christies',name:"CR Christie's Int'l",    color:'#8B0000', short:'CRC' },
  { id:'luxury',   name:'CR Luxury Homes',         color:'#B87A1A', short:'CRL' },
  { id:'remax',    name:'RE/MAX CR',               color:'#D41B3A', short:'RMX' },
  { id:'sothebys', name:"Sotheby's CR",            color:'#1A3A72', short:'SOT' },
  { id:'century21',name:'Century 21 CR',           color:'#A67C00', short:'C21' },
];

const MARKET_LISTINGS = [
  { id:'FBR-JB-04', title:'Villa Joaquín Beachfront', zone:'Playa Flamingo', type:'Villa', price:'$4,950,000', beds:5, baths:5.5,
    agencies: {
      fbr:      { listed:true,  url:'https://flamingobeachrealty.com', listDate:'2026-01-15', daysOnMarket:145, notes:'Exclusive listing. Ocean view, private pool.' },
      christies:{ listed:true,  url:'https://christiesrealestate.com', listDate:'2026-02-01', daysOnMarket:128, notes:"Co-listed. Featured in Christie's luxury portfolio." },
      sothebys: { listed:false }, luxury:{ listed:false }, remax:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'FBR-430', title:'Casa Playa Flamingo', zone:'Playa Flamingo', type:'House', price:'$2,200,000', beds:4, baths:4,
    agencies: {
      fbr:   { listed:true, url:'https://flamingobeachrealty.com', listDate:'2026-03-10', daysOnMarket:90, notes:'3 stories, ocean view. Exclusive FBR.' },
      luxury:{ listed:true, url:'https://crluxury.com',            listDate:'2026-03-15', daysOnMarket:85, notes:'Listed as "Casa Playa Grande Flamingo".' },
      christies:{ listed:false }, remax:{ listed:false }, sothebys:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'FBR-492', title:'Beachfront Penthouse Flamingo', zone:'Playa Flamingo', type:'Penthouse', price:'$1,850,000', beds:3, baths:3,
    agencies: {
      fbr:  { listed:true, url:'https://flamingobeachrealty.com', listDate:'2026-04-01', daysOnMarket:68, notes:'Rooftop terrace, infinity pool access.' },
      remax:{ listed:true, url:'https://remaxcr.com',             listDate:'2026-04-10', daysOnMarket:59, notes:'Listed as luxury condo, 3/3.' },
      christies:{ listed:false }, luxury:{ listed:false }, sothebys:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'MKT-001', title:'Flamingo Condo Tower Unit 8B', zone:'Playa Flamingo', type:'Condo', price:'$780,000', beds:2, baths:2,
    agencies: {
      remax:    { listed:true, url:'https://remaxcr.com', listDate:'2026-02-20', daysOnMarket:109, notes:'2/2 with ocean view.' },
      century21:{ listed:true, url:'https://c21cr.com',   listDate:'2026-03-01', daysOnMarket:99,  notes:'Beach community condo.' },
      fbr:{ listed:false }, christies:{ listed:false }, luxury:{ listed:false }, sothebys:{ listed:false }
    }
  },
  { id:'MKT-002', title:'Las Catalinas Villa Serena', zone:'Las Catalinas', type:'Villa', price:'$3,800,000', beds:4, baths:4.5,
    agencies: {
      christies:{ listed:true, url:'https://christiesrealestate.com', listDate:'2026-01-05', daysOnMarket:155, notes:"Car-free community. Christie's exclusive." },
      luxury:   { listed:true, url:'https://crluxury.com',            listDate:'2026-01-10', daysOnMarket:150, notes:'Marketed as "turnkey luxury".' },
      fbr:{ listed:false }, remax:{ listed:false }, sothebys:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'MKT-003', title:'Las Catalinas Casita 14', zone:'Las Catalinas', type:'Casita', price:'$950,000', beds:2, baths:2,
    agencies: {
      fbr:      { listed:true, url:'https://flamingobeachrealty.com', listDate:'2026-05-01', daysOnMarket:38, notes:'FBR new listing. Boutique community.' },
      century21:{ listed:true, url:'https://c21cr.com',               listDate:'2026-05-05', daysOnMarket:34, notes:'Small luxury casita.' },
      sothebys:{ listed:false }, christies:{ listed:false }, luxury:{ listed:false }, remax:{ listed:false }
    }
  },
  { id:'FBR-631', title:'Peninsula Papagayo Estate', zone:'Peninsula Papagayo', type:'Estate', price:'$8,500,000', beds:6, baths:7,
    agencies: {
      fbr:      { listed:true, url:'https://flamingobeachrealty.com', listDate:'2025-12-01', daysOnMarket:190, notes:'FBR exclusive. Papagayo peninsula.' },
      christies:{ listed:true, url:'https://christiesrealestate.com', listDate:'2025-12-15', daysOnMarket:175, notes:'Premium luxury. Co-listed.' },
      sothebys: { listed:true, url:'https://sothebysrealty.cr',       listDate:'2026-01-01', daysOnMarket:159, notes:"Sotheby's CR luxury listing." },
      luxury:{ listed:false }, remax:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'MKT-004', title:'Papagayo Oceanfront Villa', zone:'Peninsula Papagayo', type:'Villa', price:'$6,200,000', beds:5, baths:6,
    agencies: {
      sothebys: { listed:true, url:'https://sothebysrealty.cr',       listDate:'2026-02-01', daysOnMarket:128, notes:"Sotheby's exclusive. Papagayo Gulf views." },
      christies:{ listed:true, url:'https://christiesrealestate.com', listDate:'2026-02-10', daysOnMarket:118, notes:'5BR estate, boat dock.' },
      fbr:{ listed:false }, luxury:{ listed:false }, remax:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'FBR-610', title:'Hacienda Pinilla Golf Home', zone:'Hacienda Pinilla', type:'House', price:'$1,950,000', beds:4, baths:4,
    agencies: {
      fbr:  { listed:true, url:'https://flamingobeachrealty.com', listDate:'2026-03-20', daysOnMarket:80, notes:'Golf community. FBR exclusive.' },
      remax:{ listed:true, url:'https://remaxcr.com',             listDate:'2026-04-01', daysOnMarket:68, notes:'Golf front home, 4BR.' },
      luxury:{ listed:false }, christies:{ listed:false }, sothebys:{ listed:false }, century21:{ listed:false }
    }
  },
  { id:'MKT-005', title:'Tamarindo Beachfront Condo', zone:'Tamarindo', type:'Condo', price:'$650,000', beds:2, baths:2,
    agencies: {
      remax:    { listed:true, url:'https://remaxcr.com', listDate:'2026-01-15', daysOnMarket:145, notes:'Steps to beach. RE/MAX.' },
      century21:{ listed:true, url:'https://c21cr.com',   listDate:'2026-01-20', daysOnMarket:140, notes:'Beachfront complex unit.' },
      luxury:   { listed:true, url:'https://crluxury.com',listDate:'2026-02-01', daysOnMarket:128, notes:'Tamarindo luxury.' },
      fbr:{ listed:false }, christies:{ listed:false }, sothebys:{ listed:false }
    }
  },
  { id:'MKT-006', title:'Potrero Bay View Home', zone:'Playa Potrero', type:'House', price:'$1,200,000', beds:3, baths:3,
    agencies: {
      fbr:      { listed:true, url:'https://flamingobeachrealty.com', listDate:'2026-04-15', daysOnMarket:54, notes:'Bay views, pool.' },
      century21:{ listed:true, url:'https://c21cr.com',               listDate:'2026-04-20', daysOnMarket:49, notes:'3BR Potrero.' },
      remax:{ listed:false }, christies:{ listed:false }, luxury:{ listed:false }, sothebys:{ listed:false }
    }
  },
];

function ListingsMapTab({ listings, agencies }) {
  const _DS = window.DS;
  const mapDivId = 'all-listings-map';

  React.useEffect(() => {
    var container = document.getElementById(mapDivId);
    if (!container || container._leafletMap) return;
    var map = L.map(container, { center:[10.42,-85.80], zoom:10, zoomControl:true });
    container._leafletMap = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution:'&copy; OpenStreetMap &copy; CARTO', maxZoom:19 }).addTo(map);

    // Agency colors
    var agencyColors = {};
    (agencies || []).forEach(a => { agencyColors[a.id] = a.color; });

    // Plot properties — use the FBR listings which have lat/lng, otherwise approximate from zone
    var zoneCoords = {
      'Playa Flamingo': [10.430,-85.800], 'Las Catalinas': [10.478,-85.867],
      'Peninsula Papagayo': [10.584,-85.688], 'Hacienda Pinilla': [10.261,-85.789],
      'Tamarindo': [10.299,-85.837], 'Playa Potrero': [10.408,-85.801],
    };

    (listings || []).forEach((l, idx) => {
      var coords = zoneCoords[l.zone];
      if (!coords) return;
      var jitter = [(Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02];
      var listedAgencies = Object.entries(l.agencies || {}).filter(([,v])=>v.listed).map(([k])=>k);
      var mainColor = listedAgencies.length > 0 ? (agencyColors[listedAgencies[0]] || '#C09B57') : '#9C948A';
      var marker = L.circleMarker([coords[0]+jitter[0], coords[1]+jitter[1]], {
        radius:9, fillColor:mainColor, color:'#fff', weight:2, opacity:1, fillOpacity:0.85
      }).addTo(map);
      var agencyBadges = listedAgencies.map(id => {
        var ag = (agencies||[]).find(a=>a.id===id);
        return ag ? `<span style="background:${ag.color};color:#fff;font-size:9px;font-weight:700;padding:1px 4px;border-radius:2px;margin-right:2px">${ag.short}</span>` : '';
      }).join('');
      marker.bindPopup(`<div style="font-family:DM Sans,sans-serif;padding:8px;min-width:180px"><b style="color:#0F2340;font-size:12px">${l.title}</b><br/><div style="margin:4px 0;font-size:10px;color:#9C948A">${l.zone} · ${l.type}</div><b style="color:#C09B57;font-size:13px">${l.price}</b><div style="margin-top:6px">${agencyBadges}</div></div>`);
    });
    return () => { map.remove(); container._leafletMap = null; };
  }, [mapDivId]);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%' } },
    React.createElement('div', { id:mapDivId, style:{ flex:1 } }),
    React.createElement('div', { style:{ padding:'8px 20px', background:'#fff', borderTop:'1px solid #EAE5DC', display:'flex', gap:12, alignItems:'center', flexShrink:0, flexWrap:'wrap' } },
      React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', fontWeight:700 } }, 'Agencies:'),
      (agencies||[]).map(a =>
        React.createElement('div', { key:a.id, style:{ display:'flex', alignItems:'center', gap:4 } },
          React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:a.color } }),
          React.createElement('span', { style:{ fontSize:10, color:'#5C5650', fontFamily:'DM Sans,sans-serif' } }, a.short),
        )
      ),
    ),
  );
}

function AllListings({ setSelectedProp }) {
  const _DS = window.DS;
  const [listTab, setListTab] = React.useState('matrix');

  const allZones = ['All', ...Array.from(new Set(MARKET_LISTINGS.map(l=>l.zone)))];

  const [selZone, setSelZone]           = React.useState('All');
  const [detailCell, setDetailCell]     = React.useState(null); // { listing, agencyId }
  const [showOnlyFBR, setShowOnlyFBR]   = React.useState(false);

  const visibleListings = MARKET_LISTINGS.filter(l => {
    if (selZone !== 'All' && l.zone !== selZone) return false;
    if (showOnlyFBR && !l.agencies.fbr?.listed) return false;
    return true;
  });

  const totalProps   = MARKET_LISTINGS.length;
  const totalAgencies = AGENCIES.length;
  const fbrListings  = MARKET_LISTINGS.filter(l=>l.agencies.fbr?.listed).length;
  const coListings   = MARKET_LISTINGS.filter(l=> {
    const listed = AGENCIES.filter(a=>l.agencies[a.id]?.listed);
    return listed.length > 1 && listed.some(a=>a.id==='fbr');
  }).length;

  const detailListing = detailCell ? MARKET_LISTINGS.find(l=>l.id===detailCell.listingId) : null;
  const detailAgency  = detailCell ? AGENCIES.find(a=>a.id===detailCell.agencyId) : null;
  const detailData    = detailListing && detailAgency ? detailListing.agencies[detailAgency.id] : null;

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'calc(100vh - 104px)', overflow:'hidden', background:_DS.bg } },

    // ── Tab bar ───────────────────────────────────────────────────────────────
    React.createElement('div', { style:{ display:'flex', background:'#fff', borderBottom:'1px solid #EAE5DC', flexShrink:0, padding:'0 24px' } },
      [['matrix','Matrix View','◎'],['map','Market Map','🗺']].map(([id,label,icon]) =>
        React.createElement('button', { key:id, onClick:()=>setListTab(id), style:{
          padding:'11px 16px', border:'none', borderBottom: listTab===id?'2px solid #C09B57':'2px solid transparent',
          background:'transparent', cursor:'pointer', fontSize:13, fontWeight:listTab===id?700:400,
          color:listTab===id?'#C09B57':'#9C948A', fontFamily:'DM Sans,sans-serif',
          display:'flex', alignItems:'center', gap:6
        } }, React.createElement('span',null,icon), label)
      )
    ),

    // ── Matrix tab content ────────────────────────────────────────────────────
    listTab === 'matrix' && React.createElement('div', { style:{ flex:1, overflow:'hidden', display:'flex', flexDirection:'column' } },

      // Header bar
      React.createElement('div', { style:{ flexShrink:0, display:'flex', alignItems:'center', gap:14, padding:'16px 24px 12px', borderBottom:'1px solid #EAE5DC', background:'#fff' } },
        React.createElement('div', { style:{ flex:1 } },
          React.createElement('div', { style:{ fontSize:16, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Market Distribution Intelligence'),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, totalProps+' properties tracked across '+totalAgencies+' agencies · '+fbrListings+' FBR listings · '+coListings+' co-listings'),
        ),
        // Stats chips
        React.createElement('div', { style:{ display:'flex', gap:8 } },
          [
            { label:'Properties', value:String(totalProps) },
            { label:'Agencies', value:String(totalAgencies) },
            { label:'FBR Listed', value:String(fbrListings) },
            { label:'Co-listed', value:String(coListings) },
          ].map(s =>
            React.createElement('div', { key:s.label, style:{ background:'#F9F8F5', border:'1px solid #EAE5DC', borderRadius:6, padding:'6px 12px', textAlign:'center' } },
              React.createElement('div', { style:{ fontSize:15, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, s.value),
              React.createElement('div', { style:{ fontSize:9, color:'#9C948A', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.07em', marginTop:2 } }, s.label),
            )
          )
        ),
        // Zone filter
        React.createElement('select', { value:selZone, onChange:e=>setSelZone(e.target.value), style:{ padding:'7px 12px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif', background:'#fff', cursor:'pointer' } },
          allZones.map(z => React.createElement('option', { key:z, value:z }, z))
        ),
        // FBR only toggle
        React.createElement('button', { onClick:()=>setShowOnlyFBR(!showOnlyFBR), style:{
          padding:'7px 14px', borderRadius:6, border:'1px solid '+(showOnlyFBR?_DS.gold:'#E4DDD0'),
          background:showOnlyFBR?_DS.gold:'transparent', color:showOnlyFBR?'#fff':_DS.navy,
          fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif'
        } }, showOnlyFBR ? 'FBR Only' : 'All Market'),
      ),

      // Main area
      React.createElement('div', { style:{ flex:1, display:'flex', overflow:'hidden' } },

        // Left: scrollable matrix table
        React.createElement('div', { style:{ flex:1, overflow:'auto' } },
          React.createElement('table', { style:{ borderCollapse:'collapse', fontFamily:'DM Sans,sans-serif', width:'100%', minWidth: 260 + 80*AGENCIES.length } },
            // Sticky header
            React.createElement('thead', null,
              React.createElement('tr', { style:{ background:'#F9F8F5', position:'sticky', top:0, zIndex:3 } },
                React.createElement('th', { style:{ padding:'10px 16px', textAlign:'left', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', position:'sticky', left:0, background:'#F9F8F5', zIndex:4, width:260, minWidth:260, borderBottom:'2px solid #EAE5DC', borderRight:'1px solid #EAE5DC' } }, 'Property'),
                AGENCIES.map(ag =>
                  React.createElement('th', { key:ag.id, style:{ padding:'10px 8px', textAlign:'center', width:80, borderBottom:'2px solid #EAE5DC', borderRight:'1px solid #F0EDE8' } },
                    React.createElement('span', { style:{ display:'inline-block', padding:'3px 7px', borderRadius:4, background:ag.color, color:'#fff', fontSize:10, fontWeight:800, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.05em' } }, ag.short)
                  )
                ),
              )
            ),
            React.createElement('tbody', null,
              visibleListings.map((listing, rowIdx) => {
                const isFBRRow = listing.agencies.fbr?.listed;
                const rowBg = isFBRRow ? 'rgba(15,35,64,0.03)' : (rowIdx%2===0 ? '#fff' : '#FAFAF9');
                return React.createElement('tr', { key:listing.id, style:{ background:rowBg, borderBottom:'1px solid #F0EDE8' } },
                  // Property cell
                  React.createElement('td', { style:{ padding:'10px 16px', position:'sticky', left:0, background:rowBg, zIndex:1, borderRight:'1px solid #EAE5DC', minWidth:260 } },
                    React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
                      React.createElement('div', { style:{ flex:1, minWidth:0 } },
                        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
                          isFBRRow && React.createElement('span', { style:{ width:6, height:6, borderRadius:'50%', background:_DS.gold, flexShrink:0, display:'inline-block' } }),
                          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, listing.title),
                        ),
                        React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, listing.zone+' · '+listing.type+' · '+listing.price),
                        React.createElement('div', { style:{ fontSize:10, color:'#B0A898', fontFamily:'DM Sans,sans-serif' } }, listing.beds+'bd · '+listing.baths+'ba · ID: '+listing.id),
                      ),
                    )
                  ),
                  // Agency cells
                  AGENCIES.map(ag => {
                    const agData = listing.agencies[ag.id];
                    const isListed = agData?.listed;
                    const isFBRcell = ag.id === 'fbr';
                    return React.createElement('td', { key:ag.id, style:{
                      padding:'8px', textAlign:'center', width:80, borderRight:'1px solid #F0EDE8',
                      background: isListed ? 'rgba(16,185,129,0.07)' : 'transparent'
                    } },
                      isListed
                        ? React.createElement('button', {
                            onClick:()=>setDetailCell({ listingId:listing.id, agencyId:ag.id }),
                            title: ag.name+': '+agData.notes,
                            style:{
                              width:28, height:28, borderRadius:5, border: isFBRcell ? '2px solid '+_DS.gold : '1px solid #10B981',
                              background:'rgba(16,185,129,0.12)', color:'#059669',
                              fontSize:14, fontWeight:800, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center',
                              fontFamily:'DM Sans,sans-serif', lineHeight:1
                            }
                          }, '✓')
                        : React.createElement('span', { style:{ fontSize:16, color:'#D1D5DB', lineHeight:1 } }, '—')
                    );
                  }),
                );
              })
            ),
          ),
        ),

        // Right: detail panel
        detailCell && detailListing && detailAgency && detailData && React.createElement('div', { style:{ width:320, flexShrink:0, background:'#fff', borderLeft:'1px solid #EAE5DC', display:'flex', flexDirection:'column', overflow:'hidden' } },
          // Panel header
          React.createElement('div', { style:{ background:detailAgency.color, padding:'14px 16px', display:'flex', alignItems:'flex-start', justifyContent:'space-between' } },
            React.createElement('div', null,
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:6 } },
                React.createElement('span', { style:{ padding:'3px 9px', borderRadius:4, background:'rgba(255,255,255,0.2)', color:'#fff', fontSize:11, fontWeight:800, fontFamily:'DM Sans,sans-serif' } }, detailAgency.short),
                React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,0.9)', fontFamily:'DM Sans,sans-serif' } }, detailAgency.name),
              ),
              React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:'#fff', fontFamily:'DM Sans,sans-serif', lineHeight:1.3 } }, detailListing.title),
              React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'DM Sans,sans-serif', marginTop:4 } }, detailListing.zone+' · '+detailListing.price),
            ),
            React.createElement('button', { onClick:()=>setDetailCell(null), style:{ background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', borderRadius:4, width:24, height:24, cursor:'pointer', fontSize:16, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontFamily:'DM Sans,sans-serif' } }, '×'),
          ),
          React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1 } },
            // Property info
            React.createElement('div', { style:{ background:'#F9F8F5', borderRadius:6, padding:'12px', marginBottom:12 } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'Property'),
              [
                ['Type', detailListing.type],
                ['Beds / Baths', detailListing.beds+' bd / '+detailListing.baths+' ba'],
                ['Price', detailListing.price],
                ['Zone', detailListing.zone],
              ].map(([l,v]) =>
                React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid #EDE8E0' } },
                  React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                  React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
                )
              ),
            ),
            // Listing details
            React.createElement('div', { style:{ background:'#F9F8F5', borderRadius:6, padding:'12px', marginBottom:12 } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'Listing Details'),
              [
                ['Listed Date', detailData.listDate],
                ['Days on Market', String(detailData.daysOnMarket)+' days'],
              ].map(([l,v]) =>
                React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid #EDE8E0' } },
                  React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                  React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
                )
              ),
              React.createElement('div', { style:{ marginTop:8 } },
                React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, 'Notes'),
                React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, detailData.notes),
              ),
            ),
            // View on website button
            React.createElement('button', { onClick:()=>window.open(detailData.url,'_blank'), style:{ width:'100%', padding:'10px', background:detailAgency.color, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'View on Website →'),
            // FBR Coverage section
            React.createElement('div', { style:{ background:'#F9F8F5', borderRadius:6, padding:'12px' } },
              React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8, fontFamily:'DM Sans,sans-serif' } }, 'Market Coverage'),
              AGENCIES.map(ag => {
                const d = detailListing.agencies[ag.id];
                return React.createElement('div', { key:ag.id, style:{ display:'flex', alignItems:'center', gap:8, padding:'4px 0', borderBottom:'1px solid #EDE8E0' } },
                  React.createElement('span', { style:{ display:'inline-block', padding:'2px 6px', borderRadius:3, background:ag.color, color:'#fff', fontSize:9, fontWeight:800, fontFamily:'DM Sans,sans-serif', minWidth:28, textAlign:'center' } }, ag.short),
                  React.createElement('span', { style:{ flex:1, fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, ag.name),
                  d?.listed
                    ? React.createElement('span', { style:{ fontSize:12, color:'#059669', fontWeight:800 } }, '✓')
                    : React.createElement('span', { style:{ fontSize:12, color:'#D1D5DB' } }, '—'),
                );
              }),
            ),
          ),
        ),
      ),
    ),

    // ── Map tab content ───────────────────────────────────────────────────────
    listTab === 'map' && React.createElement(ListingsMapTab, { listings: MARKET_LISTINGS, agencies: AGENCIES }),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRICING INTELLIGENCE ALL — Market-wide pricing intelligence
// ═══════════════════════════════════════════════════════════════════════════════

function PricingIntelligenceAll({ setScreen }) {
  const _DS = window.DS;
  const [selZone, setSelZone] = React.useState('All');
  const market = window.FBR.market || {};
  const zones = (market.zones || []);

  // Use MARKET_LISTINGS from the module scope (already defined above)
  const allListings = MARKET_LISTINGS;
  const fbrListings = window.FBR.listings || [];

  const filteredZones = selZone === 'All' ? zones : zones.filter(z => z.name.includes(selZone));

  function fmtM(n) { return '$'+(n/1e6).toFixed(2)+'M'; }

  return React.createElement('div', { style:{ overflowY:'auto', height:'calc(100vh - 104px)', padding:'24px', background:_DS.bg } },

    // Header with zone filter
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Market Pricing Intelligence'),
        React.createElement('div', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Full market analysis — all agencies, all listings'),
      ),
      React.createElement('select', { value:selZone, onChange:e=>setSelZone(e.target.value), style:{ padding:'6px 12px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#fff' } },
        ['All',...zones.map(z=>z.name)].map(z => React.createElement('option',{key:z,value:z},z))
      ),
    ),

    // Zone market cards
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 } },
      (selZone==='All'?zones:zones.filter(z=>z.name===selZone)).map(z =>
        React.createElement('div', { key:z.name, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px', cursor:'pointer', transition:'border-color 0.15s' },
          onClick:()=>setSelZone(selZone===z.name?'All':z.name) },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 } },
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, z.name),
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4, background: z.hotScore>=80?'rgba(192,155,87,0.12)':z.hotScore>=60?'rgba(184,122,26,0.12)':'rgba(22,48,97,0.08)', borderRadius:5, padding:'3px 8px' } },
              React.createElement('div', { style:{ width:6, height:6, borderRadius:'50%', background: z.hotScore>=80?_DS.gold:z.hotScore>=60?_DS.warn:_DS.navyMid } }),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, color: z.hotScore>=80?_DS.gold:z.hotScore>=60?_DS.warn:_DS.navyMid, fontFamily:'DM Sans,sans-serif' } }, z.hotScore+'/100'),
            ),
          ),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:8 } },
            [['Avg Price',fmtM(z.avgPrice)],[z.priceChg.startsWith('+')?'▲ Change':'▼ Change',z.priceChg],['Absorption',z.absorption+'%']].map(([l,v]) =>
              React.createElement('div', { key:l },
                React.createElement('div', { style:{ fontSize:9, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, l),
                React.createElement('div', { style:{ fontSize:14, fontWeight:700, color: v.startsWith('+')||v.startsWith('▲')?_DS.success:v.startsWith('-')||v.startsWith('▼')?'#B82929':_DS.text, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, v),
              )
            )
          ),
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', null, `Supply: ${z.supply} · Demand: ${z.demand}`),
            React.createElement('span', null, `${z.listings.length} FBR listings`),
          ),
        )
      )
    ),

    // Full market comparable table
    React.createElement('div', null,
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'All Market Comparables'),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'10px 16px', background:_DS.bg, borderBottom:`1px solid ${_DS.border}`, fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } },
          ['Property','Zone','Type','List Price','Agencies'].map(h=>React.createElement('span',{key:h},h))
        ),
        (selZone==='All' ? allListings : allListings.filter(l=>l.zone===selZone)).map(l => {
          const listedBy = AGENCIES.filter(a => l.agencies[a.id]?.listed);
          return React.createElement('div', { key:l.id, style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', padding:'11px 16px', borderBottom:`1px solid ${_DS.borderLt}`, alignItems:'center', fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontWeight:600, color:_DS.text } }, l.title),
              React.createElement('div', { style:{ fontSize:10, color:_DS.text3, marginTop:1 } }, l.type),
            ),
            React.createElement('span', { style:{ color:_DS.text2 } }, l.zone.split(' ')[0]),
            React.createElement('span', { style:{ color:_DS.text2 } }, l.type),
            React.createElement('span', { style:{ fontWeight:700, color:_DS.gold } }, l.price),
            React.createElement('div', { style:{ display:'flex', gap:3, flexWrap:'wrap' } },
              listedBy.map(a =>
                React.createElement('span', { key:a.id, style:{ fontSize:9, fontWeight:700, padding:'1px 5px', borderRadius:3, color:'#fff', background:a.color, fontFamily:'DM Sans,sans-serif' } }, a.short)
              )
            ),
          );
        })
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEMOGRAPHIC ANALYSIS — Buyer demographics from CRM leads
// ═══════════════════════════════════════════════════════════════════════════════

function DemographicAnalysis({ setScreen }) {
  const _DS = window.DS;
  const leads = window.FBR.leads || [];

  // Derived analytics from lead data
  const byNationality = leads.reduce((acc, l) => {
    acc[l.country] = (acc[l.country] || { country:l.country, flag:l.flag, count:0, budgetSum:0, hot:0 });
    acc[l.country].count++;
    acc[l.country].hot += l.temp === 'hot' ? 1 : 0;
    // Parse budget max
    var bMax = parseInt((l.budget.match(/\$[\d,]+M/g)||[]).pop()?.replace(/[$,M]/g,'')||0) * 1e6;
    acc[l.country].budgetSum += bMax;
    return acc;
  }, {});
  const nationalityData = Object.values(byNationality).sort((a,b)=>b.count-a.count);

  const byUse = leads.reduce((acc,l) => { acc[l.use] = (acc[l.use]||0)+1; return acc; }, {});
  const bySource = leads.reduce((acc,l) => { acc[l.source] = (acc[l.source]||0)+1; return acc; }, {});
  const byTemp = { hot: leads.filter(l=>l.temp==='hot').length, warm: leads.filter(l=>l.temp==='warm').length, cold: leads.filter(l=>l.temp==='cold').length };
  const byZone = leads.reduce((acc,l) => { acc[l.zone] = (acc[l.zone]||0)+1; return acc; }, {});

  const totalLeads = leads.length;

  function pct(n) { return Math.round(n/totalLeads*100); }

  return React.createElement('div', { style:{ overflowY:'auto', height:'calc(100vh - 104px)', padding:'24px', background:_DS.bg } },

    React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, 'Demographic & Buyer Analysis'),
    React.createElement('div', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:24 } }, `Based on ${totalLeads} active leads in the CRM`),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginBottom:24 } },

      // Nationality breakdown
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px', gridColumn:'1 / 2' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, 'Buyer Origin'),
        nationalityData.map(n =>
          React.createElement('div', { key:n.country, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:10 } },
            React.createElement('span', { style:{ fontSize:16 } }, n.flag),
            React.createElement('div', { style:{ flex:1 } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
                React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, n.country),
                React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${n.count} leads (${pct(n.count)}%)`),
              ),
              React.createElement('div', { style:{ height:4, background:_DS.borderLt, borderRadius:2 } },
                React.createElement('div', { style:{ height:'100%', borderRadius:2, background:_DS.gold, width:pct(n.count)+'%' } })
              ),
            ),
          )
        ),
      ),

      // Use case + source breakdown
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
        // Property Use
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Property Use Intent'),
          Object.entries(byUse).sort((a,b)=>b[1]-a[1]).map(([use,cnt]) =>
            React.createElement('div', { key:use, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 } },
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, use),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
                React.createElement('div', { style:{ width:50, height:4, borderRadius:2, background:_DS.borderLt } },
                  React.createElement('div', { style:{ height:'100%', borderRadius:2, background:_DS.navyMid, width:pct(cnt)+'%' } })
                ),
                React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', minWidth:18 } }, cnt),
              ),
            )
          ),
        ),
        // Lead Source
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Lead Source'),
          Object.entries(bySource).sort((a,b)=>b[1]-a[1]).map(([src,cnt]) =>
            React.createElement('div', { key:src, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 } },
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, src),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
                React.createElement('div', { style:{ width:50, height:4, borderRadius:2, background:_DS.borderLt } },
                  React.createElement('div', { style:{ height:'100%', borderRadius:2, background:_DS.success, width:pct(cnt)+'%' } })
                ),
                React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', minWidth:18 } }, cnt),
              ),
            )
          ),
        ),
      ),

      // Zone demand + temperature
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Zone Preference'),
          Object.entries(byZone).sort((a,b)=>b[1]-a[1]).map(([zone,cnt]) =>
            React.createElement('div', { key:zone, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 } },
              React.createElement('span', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, zone),
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:6 } },
                React.createElement('div', { style:{ width:50, height:4, borderRadius:2, background:_DS.borderLt } },
                  React.createElement('div', { style:{ height:'100%', borderRadius:2, background:_DS.warn, width:pct(cnt)+'%' } })
                ),
                React.createElement('span', { style:{ fontSize:10, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', minWidth:18 } }, cnt),
              ),
            )
          ),
        ),
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Lead Temperature'),
          [['Hot',byTemp.hot,'#B82929'],['Warm',byTemp.warm,'#B87A1A'],['Cold',byTemp.cold,'#2A5F8F']].map(([l,v,c]) =>
            React.createElement('div', { key:l, style:{ display:'flex', alignItems:'center', gap:8, marginBottom:10 } },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:c, flexShrink:0 } }),
              React.createElement('div', { style:{ flex:1 } },
                React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
                  React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, l),
                  React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${v} (${pct(v)}%)`),
                ),
                React.createElement('div', { style:{ height:4, background:_DS.borderLt, borderRadius:2 } },
                  React.createElement('div', { style:{ height:'100%', borderRadius:2, background:c, width:pct(v)+'%' } })
                ),
              ),
            )
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT MANAGING — Social media content calendar and management
// ═══════════════════════════════════════════════════════════════════════════════

function ContentManaging({ setScreen }) {
  const _DS = window.DS;
  const [selAccount, setSelAccount] = React.useState('all');
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [createData, setCreateData] = React.useState({ caption:'', platforms:[], contentType:'post', scheduledDate:'' });

  const ACCOUNTS = [
    { id:'instagram', label:'Instagram', handle:'@flamingobeachrealty', color:'#E1306C', icon:'📸', followers:'4.2K', posts:142, url:'https://www.instagram.com/flamingobeachrealty/' },
    { id:'facebook', label:'Facebook', handle:'Flamingo Beach Realty', color:'#1877F2', icon:'👍', followers:'8.1K', posts:210, url:'https://www.facebook.com/FlamingoBeachRealty1/' },
    { id:'tiktok', label:'TikTok', handle:'@flamingobeachrealty', color:'#010101', icon:'🎵', followers:'1.8K', posts:38, url:'https://www.tiktok.com/@flamingobeachrealty' },
  ];

  const MOCK_POSTS = [
    { id:'P-001', account:'instagram', type:'post', date:'Jun 9', caption:'EXCLUSIVE LISTING — Pikatas Restaurant and Bar, Playa Tamarindo 🍽️ #CostaRica #TamarindoInvestment', likes:274, comments:18, shares:42, reach:3800, saves:61, thumb:'social-thumbs/post-001.jpg' },
    { id:'P-002', account:'instagram', type:'reel', date:'Jun 8', caption:'Villa El Alma | Peninsula Papagayo ✨ $7,500,000 — 3 bed, 3.5 bath luxury retreat designed to reconnect you with nature. #flamingobeachrealty #peninsulapapagayo', likes:412, comments:34, shares:67, reach:5600, saves:93, thumb:'social-thumbs/post-002.jpg' },
    { id:'P-003', account:'facebook', type:'post', date:'Jun 8', caption:'NEW EXCLUSIVE LISTING! Pikatas Restaurant and Bar, Playa Tamarindo — $650,000. Prime commercial opportunity in downtown Tamarindo.', likes:87, comments:12, shares:23, reach:2100, saves:0, thumb:'social-thumbs/post-003.jpg' },
    { id:'P-004', account:'instagram', type:'post', date:'Jun 7', caption:'SOLD — Casa Cancion Del Mar, Playa Potrero 🎉 Another happy client, another dream home closed.', likes:328, comments:41, shares:29, reach:4100, saves:44, thumb:'social-thumbs/post-004.jpg' },
    { id:'P-005', account:'tiktok', type:'video', date:'Jun 5', caption:'🌴 UNDER $300K IN DOWNTOWN TAMARINDO? Villa Verde #37 — 2 bed/2 bath, walk to the beach 🇨🇷 #costaricarealestate #guanacastecostarica', likes:892, comments:64, shares:128, reach:12400, saves:0, thumb:'social-thumbs/post-005.jpg' },
    { id:'P-006', account:'instagram', type:'post', date:'Jun 2', caption:'SOLD — Casa Ginger, Rio Santos 🏡 From listing to closing, Flamingo Beach Realty delivers results.', likes:196, comments:22, shares:18, reach:2800, saves:37, thumb:'social-thumbs/post-006.jpg' },
  ];

  const filtered = selAccount === 'all' ? MOCK_POSTS : MOCK_POSTS.filter(p => p.account === selAccount);
  const totalReach = MOCK_POSTS.reduce((a,p)=>a+p.reach,0);
  const totalLikes = MOCK_POSTS.reduce((a,p)=>a+p.likes,0);
  const totalComments = MOCK_POSTS.reduce((a,p)=>a+p.comments,0);

  return React.createElement('div', { style:{ display:'flex', height:'calc(100vh - 104px)', overflow:'hidden', background:_DS.bg } },

    // Main content
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Top bar
      React.createElement('div', { style:{ padding:'14px 24px', background:_DS.surface, borderBottom:`1px solid ${_DS.border}`, display:'flex', alignItems:'center', gap:12, flexShrink:0 } },
        // Account filter
        React.createElement('div', { style:{ display:'flex', gap:6 } },
          [['all','All Accounts'], ...ACCOUNTS.map(a=>[a.id,a.label])].map(([id,label]) =>
            React.createElement('button', { key:id, onClick:()=>setSelAccount(id), style:{
              padding:'5px 12px', borderRadius:5, border:`1px solid ${selAccount===id?_DS.gold:_DS.border}`,
              background: selAccount===id?_DS.goldDim:'transparent', cursor:'pointer',
              fontSize:11, fontWeight: selAccount===id?700:400, color: selAccount===id?_DS.gold:_DS.text2,
              fontFamily:'DM Sans,sans-serif'
            } }, label)
          )
        ),
        // KPI pills
        React.createElement('div', { style:{ marginLeft:'auto', display:'flex', gap:12 } },
          [['Total Reach',totalReach.toLocaleString()],['Total Likes',totalLikes],['Total Comments',totalComments]].map(([l,v]) =>
            React.createElement('div', { key:l, style:{ background:_DS.bg, borderRadius:6, padding:'5px 12px', border:`1px solid ${_DS.border}` } },
              React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, l+': '),
              React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, v),
            )
          )
        ),
        React.createElement('button', { onClick:()=>setShowCreateForm(!showCreateForm), style:{ padding:'8px 16px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, '+ New Post'),
      ),

      // Account cards
      React.createElement('div', { style:{ padding:'16px 24px', display:'flex', gap:12, flexShrink:0 } },
        ACCOUNTS.map(acc =>
          React.createElement('div', { key:acc.id, onClick:()=>setSelAccount(selAccount===acc.id?'all':acc.id),
            style:{ flex:1, background:_DS.surface, border:`1px solid ${selAccount===acc.id?acc.color:_DS.border}`, borderRadius:8, padding:'12px 14px', cursor:'pointer', transition:'border-color 0.15s', boxShadow: selAccount===acc.id?`0 0 0 1px ${acc.color}`:'none' }
          },
            React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center', marginBottom:8 } },
              React.createElement('span', { style:{ fontSize:18 } }, acc.icon),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, acc.label),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, acc.handle),
              ),
            ),
            React.createElement('div', { style:{ display:'flex', gap:12 } },
              React.createElement('div', null, React.createElement('div', { style:{ fontSize:16, fontWeight:800, color:acc.color, fontFamily:'DM Sans,sans-serif' } }, acc.followers), React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'FOLLOWERS')),
              React.createElement('div', null, React.createElement('div', { style:{ fontSize:16, fontWeight:800, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, acc.posts), React.createElement('div', { style:{ fontSize:9, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'POSTS')),
            ),
          )
        )
      ),

      // Posts grid
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'0 24px 24px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, alignContent:'start' } },
        filtered.map(post => {
          const acc = ACCOUNTS.find(a=>a.id===post.account);
          return React.createElement('div', { key:post.id, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
            post.thumb
              ? React.createElement('img', { src:post.thumb, style:{ width:'100%', height:140, objectFit:'cover' }, onError:e=>e.target.style.display='none' })
              : React.createElement('div', { style:{ height:140, background:_DS.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 } }, acc?.icon),
            React.createElement('div', { style:{ padding:'12px 14px' } },
              React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6 } },
                React.createElement('div', { style:{ display:'flex', gap:4, alignItems:'center' } },
                  React.createElement('span', { style:{ fontSize:11, fontWeight:700, color:acc?.color||'#000', fontFamily:'DM Sans,sans-serif' } }, acc?.label),
                  React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', background:_DS.bg, borderRadius:3, padding:'1px 5px' } }, post.type),
                ),
                React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, post.date),
              ),
              React.createElement('div', { style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.5, marginBottom:10, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' } }, post.caption),
              React.createElement('div', { style:{ display:'flex', gap:12, fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } },
                React.createElement('span', null, '❤ '+post.likes),
                React.createElement('span', null, '💬 '+post.comments),
                React.createElement('span', null, '↗ '+post.shares),
                React.createElement('span', null, '👁 '+post.reach.toLocaleString()),
              ),
            ),
          );
        })
      ),
    ),

    // Create Post Panel (right side, slides in)
    showCreateForm && React.createElement('div', { style:{ width:360, borderLeft:`1px solid ${_DS.border}`, background:_DS.surface, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 } },
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Create New Post'),
        React.createElement('button', { onClick:()=>setShowCreateForm(false), style:{ background:'none', border:'none', cursor:'pointer', fontSize:18, color:_DS.text3 } }, '×'),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'16px' } },
        // Platform select (multi)
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, 'Publish to'),
          React.createElement('div', { style:{ display:'flex', gap:6 } },
            ACCOUNTS.map(acc =>
              React.createElement('button', { key:acc.id,
                onClick:()=>setCreateData(p=>({ ...p, platforms: p.platforms.includes(acc.id) ? p.platforms.filter(x=>x!==acc.id) : [...p.platforms, acc.id] })),
                style:{ padding:'6px 12px', border:`2px solid ${createData.platforms.includes(acc.id)?acc.color:_DS.border}`, borderRadius:6, cursor:'pointer', background: createData.platforms.includes(acc.id)?acc.color+'1A':'transparent', fontSize:11, fontWeight:700, color: createData.platforms.includes(acc.id)?acc.color:_DS.text2, fontFamily:'DM Sans,sans-serif' }
              }, acc.icon+' '+acc.label)
            )
          ),
        ),
        // Content type
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, 'Content Type'),
          React.createElement('select', { value:createData.contentType, onChange:e=>setCreateData(p=>({...p,contentType:e.target.value})),
            style:{ width:'100%', padding:'8px 10px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#fff', color:_DS.text }
          },
            ['post','reel/video','story','carousel'].map(t=>React.createElement('option',{key:t,value:t},t.charAt(0).toUpperCase()+t.slice(1)))
          ),
        ),
        // Caption
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, 'Caption'),
          React.createElement('textarea', { value:createData.caption, onChange:e=>setCreateData(p=>({...p,caption:e.target.value})),
            placeholder:'Write your caption…', rows:4,
            style:{ width:'100%', padding:'10px 12px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', resize:'none', lineHeight:1.6 }
          }),
        ),
        // Media upload placeholder
        React.createElement('div', { style:{ marginBottom:14, border:`2px dashed ${_DS.border}`, borderRadius:8, padding:'24px', textAlign:'center', cursor:'pointer', background:_DS.bg } },
          React.createElement('div', { style:{ fontSize:24, marginBottom:6 } }, '📷'),
          React.createElement('div', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Click to upload photo or video'),
        ),
        // Schedule date
        React.createElement('div', { style:{ marginBottom:14 } },
          React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, 'Schedule Date (optional)'),
          React.createElement('input', { type:'datetime-local', value:createData.scheduledDate, onChange:e=>setCreateData(p=>({...p,scheduledDate:e.target.value})),
            style:{ width:'100%', padding:'8px 10px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none' }
          }),
        ),
      ),
      React.createElement('div', { style:{ padding:'12px 16px', borderTop:`1px solid ${_DS.border}`, display:'flex', gap:8, flexShrink:0 } },
        React.createElement('button', { onClick:()=>setShowCreateForm(false), style:{ flex:1, padding:'10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:13, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, createData.scheduledDate ? 'Schedule Post' : 'Publish Now'),
        React.createElement('button', { onClick:()=>setShowCreateForm(false), style:{ padding:'10px 14px', background:'transparent', color:_DS.text2, border:`1px solid ${_DS.border}`, borderRadius:6, cursor:'pointer', fontSize:12, fontFamily:'DM Sans,sans-serif' } }, 'Discard'),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WEBSITE CMS — Website content management
// ═══════════════════════════════════════════════════════════════════════════════

function WebsiteCMS({ setScreen }) {
  const _DS = window.DS;
  const [selSection, setSelSection] = React.useState('listings');
  const [editId, setEditId] = React.useState(null);
  const listings = window.FBR.listings || [];
  const brokers = window.FBR.brokerStats || [];

  const CMS_SECTIONS = [
    { id:'listings', label:'Listings', icon:'🏠', desc:'Active listings shown on the website' },
    { id:'team', label:'Team', icon:'👥', desc:'Broker profiles and bios' },
    { id:'about', label:'About', icon:'ℹ', desc:'Company overview and mission' },
    { id:'contact', label:'Contact', icon:'📞', desc:'Contact information and office details' },
  ];

  return React.createElement('div', { style:{ display:'flex', height:'calc(100vh - 104px)', overflow:'hidden', background:_DS.bg } },

    // Left: section picker
    React.createElement('div', { style:{ width:220, borderRight:`1px solid ${_DS.border}`, background:_DS.surface, display:'flex', flexDirection:'column', flexShrink:0 } },
      React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_DS.border}`, flexShrink:0 } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Website CMS'),
        React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'flamingobeachrealty.com'),
      ),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'8px' } },
        CMS_SECTIONS.map(sec =>
          React.createElement('div', { key:sec.id, onClick:()=>{ setSelSection(sec.id); setEditId(null); },
            style:{ padding:'12px 12px', borderRadius:6, cursor:'pointer', marginBottom:2,
              background: selSection===sec.id?_DS.goldDim:'transparent',
              border: `1px solid ${selSection===sec.id?_DS.gold:'transparent'}`,
            }
          },
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
              React.createElement('span', { style:{ fontSize:16 } }, sec.icon),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, sec.label),
                React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, sec.desc),
              ),
            ),
          )
        ),
      ),
      React.createElement('div', { style:{ padding:'12px 16px', borderTop:`1px solid ${_DS.border}`, flexShrink:0 } },
        React.createElement('button', { style:{ width:'100%', padding:'9px', background:_DS.success, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '🚀 Publish Changes'),
      ),
    ),

    // Right: content editor
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },

      // Header
      React.createElement('div', { style:{ padding:'14px 20px', background:_DS.surface, borderBottom:`1px solid ${_DS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 } },
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, CMS_SECTIONS.find(s=>s.id===selSection)?.label),
          React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Website section editor · Changes publish immediately on save'),
        ),
        React.createElement('div', { style:{ display:'flex', gap:6 } },
          React.createElement('button', { style:{ padding:'7px 14px', background:_DS.bg, border:`1px solid ${_DS.border}`, borderRadius:5, cursor:'pointer', fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, '👁 Preview'),
        ),
      ),

      // Content
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'20px' } },

        selSection === 'listings' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 } },
            React.createElement('div', { style:{ fontSize:12, color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, `${listings.length} listings currently shown on website`),
            React.createElement('button', { style:{ padding:'7px 14px', background:_DS.navy, color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '+ Add Listing'),
          ),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 } },
            listings.map(l =>
              React.createElement('div', { key:l.id,
                style:{ background:_DS.surface, border:`1px solid ${editId===l.id?_DS.gold:_DS.border}`, borderRadius:8, overflow:'hidden', display:'flex', alignItems:'stretch' }
              },
                React.createElement('img', { src:l.photo1, style:{ width:80, height:60, objectFit:'cover', flexShrink:0 }, onError:e=>e.target.style.display='none' }),
                React.createElement('div', { style:{ flex:1, padding:'10px 14px' } },
                  React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, l.title),
                  React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, `${l.id} · ${l.price} · ${l.agent}`),
                ),
                React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center', padding:'0 14px', flexShrink:0 } },
                  React.createElement('span', { style:{ background:'#E3F2EA', color:'#2B6E4A', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:4, fontFamily:'DM Sans,sans-serif' } }, 'LIVE'),
                  React.createElement('button', { onClick:()=>setEditId(editId===l.id?null:l.id), style:{ padding:'6px 12px', border:`1px solid ${_DS.border}`, borderRadius:5, cursor:'pointer', fontSize:11, background:'transparent', color:_DS.text2, fontFamily:'DM Sans,sans-serif' } }, '✏ Edit'),
                  React.createElement('button', { style:{ padding:'6px 12px', border:'1px solid #FDE8E8', borderRadius:5, cursor:'pointer', fontSize:11, background:'transparent', color:'#B82929', fontFamily:'DM Sans,sans-serif' } }, 'Hide'),
                ),
              )
            )
          ),
        ),

        selSection === 'team' && React.createElement('div', null,
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 } },
            brokers.map(b =>
              React.createElement('div', { key:b.name, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px', display:'flex', gap:12, alignItems:'flex-start' } },
                React.createElement('div', { style:{ width:48, height:48, borderRadius:'50%', background:b.color||_DS.navyMid, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:16, fontWeight:700, fontFamily:'DM Sans,sans-serif', flexShrink:0 } }, b.avatar),
                React.createElement('div', { style:{ flex:1 } },
                  React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, b.name),
                  React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2, marginBottom:8 } }, 'Senior Broker · Flamingo Beach Realty'),
                  React.createElement('div', { style:{ display:'flex', gap:6 } },
                    React.createElement('button', { style:{ padding:'5px 10px', border:`1px solid ${_DS.border}`, borderRadius:4, cursor:'pointer', fontSize:10, fontFamily:'DM Sans,sans-serif', background:'transparent', color:_DS.text2 } }, '✏ Edit Bio'),
                    React.createElement('button', { style:{ padding:'5px 10px', border:`1px solid ${_DS.border}`, borderRadius:4, cursor:'pointer', fontSize:10, fontFamily:'DM Sans,sans-serif', background:'transparent', color:_DS.text2 } }, '📷 Photo'),
                  ),
                ),
              )
            )
          )
        ),

        (selSection === 'about' || selSection === 'contact') && React.createElement('div', null,
          React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'20px', maxWidth:640 } },
            selSection === 'about' && React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, 'About Section Text'),
              React.createElement('textarea', { defaultValue:'Flamingo Beach Realty is Santa Cruz, Guanacaste\'s premier luxury real estate brokerage. Specializing in high-end beachfront homes, condos, and development land in Costa Rica\'s Gold Coast.', rows:5,
                style:{ width:'100%', padding:'12px', border:`1px solid ${_DS.border}`, borderRadius:6, fontSize:13, fontFamily:'DM Sans,sans-serif', outline:'none', resize:'vertical', lineHeight:1.7 }
              }),
            ),
            selSection === 'contact' && React.createElement('div', null,
              [['Office Address','Playa Flamingo, Santa Cruz, Guanacaste, Costa Rica'],['Phone','+506 2654 4000'],['Email','info@flamingobeachrealty.com'],['Office Hours','Mon-Sat: 8am – 6pm']].map(([k,v]) =>
                React.createElement('div', { key:k, style:{ marginBottom:14 } },
                  React.createElement('label', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, display:'block', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } }, k),
                  React.createElement('input', { defaultValue:v, style:{ width:'100%', padding:'9px 12px', border:`1px solid ${_DS.border}`, borderRadius:5, fontSize:13, fontFamily:'DM Sans,sans-serif', outline:'none' } }),
                )
              ),
            ),
            React.createElement('button', { style:{ marginTop:12, padding:'10px 20px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, 'Save Section'),
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUPPLY VS DEMAND INTELLIGENCE — Illustrative supply/demand operating view
// ═══════════════════════════════════════════════════════════════════════════════

const SUPDEM_SUPPLY_BY_TYPE = [
  { type:'Homes',         supply:34 },
  { type:'Condos',        supply:21 },
  { type:'Land',          supply:9  },
  { type:'Commercial',    supply:5  },
  { type:'Luxury Villas', supply:7  },
];

const SUPDEM_DEMAND_BY_ZONE = [
  { zone:'Flamingo',      demand:38 },
  { zone:'Tamarindo',     demand:44 },
  { zone:'Conchal',       demand:27 },
  { zone:'Las Catalinas', demand:21 },
  { zone:'Potrero',       demand:19 },
  { zone:'Santa Cruz',    demand:12 },
];

const SUPDEM_WAITING_LIST = [
  { segment:'Luxury Beachfront Buyer',       zone:'Flamingo',      type:'Luxury Villa', budget:'$5M – $8M',    urgency:'High',   broker:'Jennifer Walsh',   matching:1, gap:'Demand Gap' },
  { segment:'Conchal Second-Home Buyer',     zone:'Conchal',       type:'Condo',        budget:'$700K – $1.2M',urgency:'Medium', broker:'María Fernández',  matching:0, gap:'Undersupplied' },
  { segment:'Tamarindo Investor',            zone:'Tamarindo',     type:'Condo',        budget:'$500K – $900K',urgency:'High',   broker:'Carlos Rodríguez', matching:2, gap:'Balanced' },
  { segment:'Flamingo Condo Buyer',          zone:'Flamingo',      type:'Condo',        budget:'$700K – $1.5M',urgency:'Medium', broker:'Jennifer Walsh',   matching:1, gap:'Balanced' },
  { segment:'Ocean-View Land Buyer',         zone:'Santa Cruz',    type:'Land',         budget:'$2M – $5M',    urgency:'Low',    broker:'Carlos Rodríguez', matching:3, gap:'Oversupplied' },
  { segment:'Retirement Relocation Buyer',   zone:'Potrero',       type:'Home',         budget:'$1M – $2M',    urgency:'Medium', broker:'Roberto Méndez',   matching:1, gap:'Undersupplied' },
];

// Rows: zones · Columns: property types — illustrative status only
const SUPDEM_MATRIX_TYPES = ['Homes','Condos','Land','Luxury Villas'];
const SUPDEM_MATRIX = [
  { zone:'Flamingo',      cells:['Balanced','Demand Gap','Oversupplied','Demand Gap'] },
  { zone:'Tamarindo',     cells:['Demand Gap','Demand Gap','Stagnant','Undersupplied'] },
  { zone:'Conchal',       cells:['Balanced','Undersupplied','Balanced','Demand Gap'] },
  { zone:'Las Catalinas', cells:['Balanced','Balanced','Oversupplied','Balanced'] },
  { zone:'Potrero',       cells:['Undersupplied','Balanced','Stagnant','Balanced'] },
  { zone:'Santa Cruz',    cells:['Stagnant','Stagnant','Oversupplied','Stagnant'] },
];

const SUPDEM_VELOCITY = {
  fast: ['Beachfront condos — Tamarindo', 'Move-in ready homes — Flamingo', 'Luxury villas — Las Catalinas'],
  slow: ['Raw land parcels — Santa Cruz', 'Commercial units — Potrero'],
  aging: [
    { segment:'Land parcels > 5 acres', avgDays:142 },
    { segment:'Commercial retail units', avgDays:118 },
    { segment:'Condos > $1.5M',          avgDays:96  },
  ],
  pressure: [
    { band:'$500K – $900K Condos', zone:'Tamarindo', level:'High'   },
    { band:'$5M+ Luxury Villas',   zone:'Flamingo',  level:'High'   },
    { band:'$1M – $2M Homes',      zone:'Potrero',   level:'Medium' },
  ],
};

function supdemStatusColor(status) {
  const _DS = window.DS;
  return ({
    'Demand Gap':    _DS.success,
    'Undersupplied': '#4F8F6B',
    'Balanced':      _DS.gold,
    'Oversupplied':  _DS.danger,
    'Stagnant':      _DS.text3,
  })[status] || _DS.text3;
}

function SupplyDemandIntelligence({ setScreen }) {
  const _DS = window.DS;

  const totalSupply = SUPDEM_SUPPLY_BY_TYPE.reduce((a,t)=>a+t.supply,0);
  const totalDemand = SUPDEM_DEMAND_BY_ZONE.reduce((a,z)=>a+z.demand,0);
  const maxSupply = Math.max(...SUPDEM_SUPPLY_BY_TYPE.map(t=>t.supply));
  const maxDemand = Math.max(...SUPDEM_DEMAND_BY_ZONE.map(z=>z.demand));
  const matchedSegments = SUPDEM_WAITING_LIST.filter(w=>w.gap==='Balanced').length;
  const gapZones = SUPDEM_MATRIX.filter(r=>r.cells.includes('Demand Gap')).length;

  const KPIS = [
    { label:'Demand Pressure',      value:'Elevated',                         sub:`${gapZones} of ${SUPDEM_MATRIX.length} zones show a demand gap` },
    { label:'Inventory Supply',     value:String(totalSupply)+' units',       sub:'tracked across 5 categories' },
    { label:'Waiting List Matches', value:`${matchedSegments} of ${SUPDEM_WAITING_LIST.length}`, sub:'buyer segments fully matched' },
    { label:'Velocity Signals',     value:`${SUPDEM_VELOCITY.fast.length} fast · ${SUPDEM_VELOCITY.slow.length} slow`, sub:'moving segments identified' },
  ];

  return React.createElement('div', { style:{ overflowY:'auto', height:'calc(100vh - 104px)', padding:'24px', background:_DS.bg } },

    // Header
    React.createElement('div', { style:{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:4 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, 'Supply vs Demand Intelligence'),
        React.createElement('div', { style:{ fontSize:12, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Illustrative operating view — compares sample inventory supply against demand signals'),
      ),
      React.createElement('div', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif', fontStyle:'italic', whiteSpace:'nowrap', marginLeft:16, marginTop:4 } }, 'Illustrative platform view using demo data.'),
    ),

    // KPI row
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, margin:'20px 0 24px' } },
      KPIS.map(k =>
        React.createElement('div', { key:k.label, style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px 16px' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, k.label),
          React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1.2 } }, k.value),
          React.createElement('div', { style:{ fontSize:11, color:_DS.text3, marginTop:4, fontFamily:'DM Sans,sans-serif' } }, k.sub),
        )
      )
    ),

    // Supply by Type / Demand by Zone
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 } },
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, 'Supply by Property Type'),
        React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, `Sample inventory model — ${totalSupply} units total`),
        SUPDEM_SUPPLY_BY_TYPE.map(t =>
          React.createElement('div', { key:t.type, style:{ marginBottom:10 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
              React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, t.type),
              React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, t.supply+' units'),
            ),
            React.createElement('div', { style:{ height:6, background:_DS.borderLt, borderRadius:3 } },
              React.createElement('div', { style:{ height:'100%', borderRadius:3, background:_DS.navyMid, width:(t.supply/maxSupply*100)+'%' } })
            ),
          )
        ),
      ),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'16px' } },
        React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, 'Demand by Zone'),
        React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:14 } }, `Sample demand signals — ${totalDemand} buyer interests tracked`),
        SUPDEM_DEMAND_BY_ZONE.map(z =>
          React.createElement('div', { key:z.zone, style:{ marginBottom:10 } },
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:3 } },
              React.createElement('span', { style:{ fontSize:11, fontWeight:600, color:_DS.text, fontFamily:'DM Sans,sans-serif' } }, z.zone),
              React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, z.demand+' signals'),
            ),
            React.createElement('div', { style:{ height:6, background:_DS.borderLt, borderRadius:3 } },
              React.createElement('div', { style:{ height:'100%', borderRadius:3, background:_DS.gold, width:(z.demand/maxDemand*100)+'%' } })
            ),
          )
        ),
      ),
    ),

    // Waiting List
    React.createElement('div', { style:{ marginBottom:24 } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, 'Waiting List Intelligence'),
      React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Sample buyer segments designed to track unmet demand against current inventory'),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1.1fr 0.8fr 1.2fr 0.9fr 1fr', padding:'10px 16px', background:_DS.bg, borderBottom:`1px solid ${_DS.border}`, fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } },
          ['Buyer Segment','Desired Zone','Property Type','Budget Range','Urgency','Broker','Matches','Gap Status'].map(h=>React.createElement('span',{key:h},h))
        ),
        SUPDEM_WAITING_LIST.map((w,i) =>
          React.createElement('div', { key:w.segment, style:{ display:'grid', gridTemplateColumns:'1.8fr 1fr 1fr 1.1fr 0.8fr 1.2fr 0.9fr 1fr', padding:'11px 16px', borderBottom: i<SUPDEM_WAITING_LIST.length-1?`1px solid ${_DS.borderLt}`:'none', alignItems:'center', fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ fontWeight:600, color:_DS.text } }, w.segment),
            React.createElement('span', { style:{ color:_DS.text2 } }, w.zone),
            React.createElement('span', { style:{ color:_DS.text2 } }, w.type),
            React.createElement('span', { style:{ color:_DS.text2 } }, w.budget),
            React.createElement('span', { style:{
              fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10, width:'fit-content',
              color: w.urgency==='High'?_DS.danger:w.urgency==='Medium'?_DS.warn:_DS.text3,
              background: w.urgency==='High'?'rgba(184,41,41,0.1)':w.urgency==='Medium'?'rgba(184,122,26,0.1)':_DS.borderLt,
            } }, w.urgency),
            React.createElement('span', { style:{ color:_DS.text2 } }, w.broker),
            React.createElement('span', { style:{ color:_DS.text2 } }, w.matching+' listing'+(w.matching!==1?'s':'')),
            React.createElement('span', { style:{
              fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:10, width:'fit-content', color:'#fff',
              background: supdemStatusColor(w.gap),
            } }, w.gap),
          )
        ),
      ),
    ),

    // Supply / Demand Matrix
    React.createElement('div', { style:{ marginBottom:24 } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, 'Supply vs Demand Matrix'),
      React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Sample supply vs demand model by zone and property type'),
      React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, overflow:'hidden' } },
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:`1.2fr repeat(${SUPDEM_MATRIX_TYPES.length},1fr)`, padding:'10px 16px', background:_DS.bg, borderBottom:`1px solid ${_DS.border}`, fontSize:10, fontWeight:700, color:_DS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif' } },
          React.createElement('span', null, 'Zone'),
          SUPDEM_MATRIX_TYPES.map(t=>React.createElement('span', { key:t, style:{ textAlign:'center' } }, t))
        ),
        SUPDEM_MATRIX.map((row,i) =>
          React.createElement('div', { key:row.zone, style:{ display:'grid', gridTemplateColumns:`1.2fr repeat(${SUPDEM_MATRIX_TYPES.length},1fr)`, padding:'10px 16px', borderBottom: i<SUPDEM_MATRIX.length-1?`1px solid ${_DS.borderLt}`:'none', alignItems:'center', fontSize:12, fontFamily:'DM Sans,sans-serif' } },
            React.createElement('span', { style:{ fontWeight:600, color:_DS.text } }, row.zone),
            row.cells.map((status,ci) =>
              React.createElement('div', { key:ci, style:{ display:'flex', justifyContent:'center' } },
                React.createElement('span', { style:{
                  fontSize:9, fontWeight:700, padding:'4px 8px', borderRadius:5, color:'#fff', textAlign:'center',
                  background: supdemStatusColor(status), letterSpacing:'0.02em',
                } }, status)
              )
            )
          )
        ),
      ),
      React.createElement('div', { style:{ display:'flex', gap:16, flexWrap:'wrap', marginTop:10 } },
        ['Demand Gap','Undersupplied','Balanced','Oversupplied','Stagnant'].map(s =>
          React.createElement('div', { key:s, style:{ display:'flex', alignItems:'center', gap:6 } },
            React.createElement('span', { style:{ width:10, height:10, borderRadius:2, background:supdemStatusColor(s), display:'inline-block' } }),
            React.createElement('span', { style:{ fontSize:10, color:_DS.text3, fontFamily:'DM Sans,sans-serif' } }, s),
          )
        )
      ),
    ),

    // Velocity Panel
    React.createElement('div', null,
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.text, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, 'Inventory Velocity'),
      React.createElement('div', { style:{ fontSize:11, color:_DS.text3, fontFamily:'DM Sans,sans-serif', marginBottom:12 } }, 'Sample velocity signals — illustrative, not measured market data'),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14 } },
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px' } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.success, fontFamily:'DM Sans,sans-serif', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' } }, 'Fast-Moving Segments'),
          SUPDEM_VELOCITY.fast.map(s=>
            React.createElement('div', { key:s, style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', padding:'4px 0', borderBottom:`1px solid ${_DS.borderLt}` } }, s)
          ),
        ),
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px' } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.danger, fontFamily:'DM Sans,sans-serif', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' } }, 'Slow-Moving Segments'),
          SUPDEM_VELOCITY.slow.map(s=>
            React.createElement('div', { key:s, style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', padding:'4px 0', borderBottom:`1px solid ${_DS.borderLt}` } }, s)
          ),
        ),
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px' } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' } }, 'Inventory Aging'),
          SUPDEM_VELOCITY.aging.map(a=>
            React.createElement('div', { key:a.segment, style:{ display:'flex', justifyContent:'space-between', fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', padding:'4px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
              React.createElement('span', null, a.segment),
              React.createElement('span', { style:{ fontWeight:700, color:_DS.text } }, a.avgDays+'d'),
            )
          ),
        ),
        React.createElement('div', { style:{ background:_DS.surface, border:`1px solid ${_DS.border}`, borderRadius:8, padding:'14px' } },
          React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.warn, fontFamily:'DM Sans,sans-serif', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.08em' } }, 'Price Bands — Demand Pressure'),
          SUPDEM_VELOCITY.pressure.map(p=>
            React.createElement('div', { key:p.band, style:{ fontSize:11, color:_DS.text2, fontFamily:'DM Sans,sans-serif', padding:'4px 0', borderBottom:`1px solid ${_DS.borderLt}` } },
              React.createElement('div', { style:{ fontWeight:600, color:_DS.text } }, p.band),
              React.createElement('div', { style:{ fontSize:10, color:_DS.text3, marginTop:1 } }, p.zone+' · '+p.level+' pressure'),
            )
          ),
        ),
      ),
    ),
  );
}

// ── Exports ──────────────────────────────────────────────────────────────────
Object.assign(window, { CampaignCommandCenter, AllListings, PricingIntelligenceAll, DemographicAnalysis, SupplyDemandIntelligence, ContentManaging, WebsiteCMS });
