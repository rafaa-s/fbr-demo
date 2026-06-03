// Realty Platform — Marketing Module
// Social Live · Insights · Publishing Calendar · Approvals
// Depends on: fbr-data.js, fbr-ui.jsx

const _mDS     = window.DS;
const _mBadge  = window.Badge;
const _mKpi    = window.Kpi;
const _mAvatar = window.Avatar;

// ─── SHARED ───────────────────────────────────────────────────────────────────
const PLATFORM_META = {
  ig: { name:'Instagram', color:'#E1306C', icon:'IG' },
  fb: { name:'Facebook',  color:'#1877F2', icon:'FB' },
  li: { name:'LinkedIn',  color:'#0A66C2', icon:'LI' },
};

function PlatformChip({ id }) {
  const m = PLATFORM_META[id] || { name:id, color:'#9C948A', icon:id };
  return React.createElement('span', {
    style:{ background:m.color, color:'#fff', fontSize:9, fontWeight:700, padding:'2px 8px',
      borderRadius:3, fontFamily:'DM Sans,sans-serif', letterSpacing:'0.06em', flexShrink:0 }
  }, m.name);
}

function StatusBadge({ status }) {
  const map = {
    approved:       { bg:'#E3F2EA', color:'#2B6E4A', label:'Approved' },
    rejected:       { bg:'#FDE8E8', color:'#B82929', label:'Rejected' },
    wip:            { bg:'rgba(22,48,97,0.08)', color:'#163061', label:'WIP' },
    pending:        { bg:'#FDF0DC', color:'#B87A1A', label:'Pending Review' },
    published:      { bg:'#E3F2EA', color:'#2B6E4A', label:'Published' },
    scheduled:      { bg:'rgba(192,155,87,0.15)', color:'#C09B57', label:'Scheduled' },
  };
  const s = map[status] || map.pending;
  return React.createElement('span', {
    style:{ background:s.bg, color:s.color, fontSize:10, fontWeight:700,
      padding:'3px 8px', borderRadius:4, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' }
  }, s.label);
}

// ─── SOCIAL LIVE ─────────────────────────────────────────────────────────────
function SocialLive() {
  const data = window.FBR.marketing;
  if (!data) return null;
  const { channels, socialPosts } = data;

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:24 } },
    // Channel cards
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 } },
      channels.map(ch =>
        React.createElement('div', { key:ch.id, style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:10, overflow:'hidden' } },
          // Colored header
          React.createElement('div', { style:{ background:ch.color, padding:'16px 20px', display:'flex', alignItems:'center', gap:12 } },
            React.createElement('div', { style:{ width:36, height:36, borderRadius:8, background:'rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:900, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, PLATFORM_META[ch.id]?.icon || ch.id.toUpperCase()),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, ch.name),
              React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'DM Sans,sans-serif' } }, ch.handle),
            ),
            React.createElement('div', { style:{ marginLeft:'auto', background:'rgba(255,255,255,0.2)', borderRadius:20, padding:'3px 10px', fontSize:10, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, '● LIVE'),
          ),
          // Stats grid
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 } },
            [
              { label:'Followers',    value:ch.followers.toLocaleString(),      sub:`+${ch.followerGrowth} this month` },
              { label:'Reach',        value:(ch.reach/1000).toFixed(0)+'K',     sub:'last 30 days' },
              { label:'Engagement',   value:ch.engagementRate+'%',              sub:'avg per post' },
              { label:'Posts',        value:ch.posts,                           sub:`last ${ch.lastPost}` },
            ].map((s,i) =>
              React.createElement('div', { key:i, style:{ padding:'14px 16px', borderRight:i%2===0?`1px solid ${_mDS.border}`:'', borderTop:`1px solid ${_mDS.border}` } },
                React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:_mDS.text3, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, s.label),
                React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_mDS.text, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, s.value),
                React.createElement('div', { style:{ fontSize:10, color:_mDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:3 } }, s.sub),
              )
            ),
          ),
        )
      ),
    ),

    // Recent posts
    React.createElement('div', { style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:8, overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 20px', borderBottom:`1px solid ${_mDS.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' } },
        React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif' } }, 'Recent Posts'),
        React.createElement('span', { style:{ fontSize:11, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Last 7 days'),
      ),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2.5fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.8fr 0.8fr', padding:'8px 20px', background:_mDS.bg, fontSize:10, fontWeight:700, color:_mDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
        ['Post','Platform','Date','Reach','Likes','Comments','Engagement','Campaign'].map(h=>React.createElement('span',{key:h},h)),
      ),
      socialPosts.map(p =>
        React.createElement('div', { key:p.id, style:{ display:'grid', gridTemplateColumns:'2.5fr 0.7fr 0.7fr 0.7fr 0.7fr 0.7fr 0.8fr 0.8fr', padding:'12px 20px', borderBottom:`1px solid ${_mDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif', alignItems:'center' } },
          React.createElement('div', null,
            React.createElement('div', { style:{ fontWeight:600, color:_mDS.text, fontSize:12 } }, p.title),
            React.createElement('div', { style:{ fontSize:10, color:_mDS.text3, marginTop:2, maxWidth:280, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, p.previewText),
          ),
          React.createElement(PlatformChip, { id:p.platform }),
          React.createElement('span', { style:{ color:_mDS.text2 } }, p.date),
          React.createElement('span', { style:{ fontWeight:700, color:_mDS.text } }, (p.reach/1000).toFixed(1)+'K'),
          React.createElement('span', { style:{ color:_mDS.text2 } }, p.likes),
          React.createElement('span', { style:{ color:_mDS.text2 } }, p.comments),
          React.createElement('span', { style:{ fontWeight:700, color:_mDS.success } }, p.engagement),
          React.createElement('span', { style:{ color:_mDS.text3, fontSize:11 } }, p.campaign),
        )
      ),
    ),
  );
}

// ─── INSIGHTS ────────────────────────────────────────────────────────────────
function MarketingInsights() {
  const { insights } = window.FBR.marketing;
  if (!insights) return null;
  const { byPlatform, campaignBreakdown } = insights;

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:20 } },
    // Top KPIs
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 } },
      React.createElement(_mKpi, { label:'Total Reach',      value:(insights.totalReach/1000).toFixed(0)+'K', sub:'Across all channels', color:_mDS.navyMid }),
      React.createElement(_mKpi, { label:'Engagement Rate',  value:insights.totalEngagement, sub:'Combined avg', color:_mDS.gold }),
      React.createElement(_mKpi, { label:'Follower Growth',  value:insights.followerGrowth, sub:'All platforms', color:_mDS.success }),
      React.createElement(_mKpi, { label:'Best Platform',    value:insights.bestPlatform, sub:`Best post: ${insights.bestPost.slice(0,22)}…` }),
    ),
    // Approval status row
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 } },
      React.createElement(_mKpi, { label:'Pending Approvals', value:insights.pendingApprovals, sub:'Awaiting review', color:_mDS.warn }),
      React.createElement(_mKpi, { label:'WIP Posts',         value:insights.wipPosts, sub:'In progress' }),
      React.createElement(_mKpi, { label:'Approved',          value:insights.approvedPosts, sub:'Ready to publish', color:_mDS.success }),
      React.createElement(_mKpi, { label:'Rejected',          value:insights.rejectedPosts, sub:'Needs revision', color:_mDS.danger }),
    ),
    // Platform breakdown
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 } },
      React.createElement('div', { style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Platform Performance'),
        byPlatform.map(p =>
          React.createElement('div', { key:p.platform, style:{ display:'flex', gap:12, alignItems:'center', padding:'12px 0', borderBottom:`1px solid ${_mDS.borderLt}` } },
            React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:p.color, flexShrink:0 } }),
            React.createElement('div', { style:{ flex:1 } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, p.platform),
              React.createElement('div', { style:{ height:4, background:_mDS.borderLt, borderRadius:2 } },
                React.createElement('div', { style:{ width:`${p.reach/insights.totalReach*100}%`, height:'100%', background:p.color, borderRadius:2 } }),
              ),
            ),
            React.createElement('div', { style:{ textAlign:'right', flexShrink:0 } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif' } }, (p.reach/1000).toFixed(0)+'K reach'),
              React.createElement('div', { style:{ fontSize:10, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${p.engagement} · +${p.growth} followers`),
            ),
          )
        ),
      ),
      React.createElement('div', { style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:8, padding:'20px 24px' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Campaign Performance'),
        campaignBreakdown.map(c =>
          React.createElement('div', { key:c.campaign, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${_mDS.borderLt}` } },
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_mDS.text, fontFamily:'DM Sans,sans-serif' } }, c.campaign),
              React.createElement('div', { style:{ fontSize:10, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${c.posts} posts · ${(c.reach/1000).toFixed(0)}K reach`),
            ),
            React.createElement('div', { style:{ textAlign:'right' } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_mDS.gold, fontFamily:'DM Sans,sans-serif' } }, c.engagement),
              React.createElement(_mBadge, { type:'active', small:true }, c.status),
            ),
          )
        ),
      ),
    ),
  );
}

// ─── PUBLISHING CALENDAR ─────────────────────────────────────────────────────
function PublishingCalendar() {
  const { calendar } = window.FBR.marketing;
  if (!calendar) return null;
  const [filter, setFilter] = React.useState('all');
  const statuses = ['all','scheduled','approved','pending','wip'];
  const filtered = filter === 'all' ? calendar : calendar.filter(p => p.status === filter);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    // Filters
    React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
      statuses.map(s =>
        React.createElement('button', { key:s, onClick:()=>setFilter(s), style:{
          padding:'5px 12px', borderRadius:5, border:`1px solid ${filter===s?_mDS.gold:_mDS.border}`,
          background:filter===s?'rgba(192,155,87,0.1)':'white', cursor:'pointer',
          fontSize:11, fontWeight:600, color:filter===s?_mDS.gold:_mDS.text2,
          fontFamily:'DM Sans,sans-serif', textTransform:'capitalize'
        } }, s)
      ),
      React.createElement('span', { style:{ marginLeft:'auto', fontSize:11, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, `${filtered.length} posts`),
    ),
    // Table
    React.createElement('div', { style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:8, overflow:'hidden' } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'0.7fr 0.5fr 0.6fr 2fr 1.2fr 0.9fr 0.9fr', padding:'10px 20px', background:_mDS.bg, fontSize:10, fontWeight:700, color:_mDS.text3, letterSpacing:'0.08em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif' } },
        ['Date','Time','Platform','Title','Campaign','Owner','Status'].map(h=>React.createElement('span',{key:h},h)),
      ),
      filtered.map(p =>
        React.createElement('div', { key:p.id, style:{ display:'grid', gridTemplateColumns:'0.7fr 0.5fr 0.6fr 2fr 1.2fr 0.9fr 0.9fr', padding:'13px 20px', borderBottom:`1px solid ${_mDS.borderLt}`, fontSize:12, fontFamily:'DM Sans,sans-serif', alignItems:'center' } },
          React.createElement('span', { style:{ fontWeight:600, color:_mDS.text } }, p.date.slice(5)),
          React.createElement('span', { style:{ color:_mDS.text2 } }, p.time),
          React.createElement(PlatformChip, { id:p.platform }),
          React.createElement('span', { style:{ fontWeight:600, color:_mDS.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' } }, p.title),
          React.createElement('span', { style:{ color:_mDS.text3, fontSize:11 } }, p.campaign),
          React.createElement(window.Avatar, { initials:p.owner.split(' ').map(w=>w[0]).join(''), color:_mDS.navyMid, size:24 }),
          React.createElement(StatusBadge, { status:p.status }),
        )
      ),
    ),
  );
}

// ─── APPROVALS ───────────────────────────────────────────────────────────────
function MarketingApprovals() {
  const { approvals } = window.FBR.marketing;
  if (!approvals) return null;
  const [filter, setFilter] = React.useState('all');
  const statuses = ['all','pending','wip','approved','rejected'];
  const filtered = filter === 'all' ? approvals : approvals.filter(a => a.status === filter);

  const counts = statuses.slice(1).reduce((acc,s) => { acc[s] = approvals.filter(a=>a.status===s).length; return acc; }, {});

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },
    // Status summary pills
    React.createElement('div', { style:{ display:'flex', gap:10 } },
      [
        { key:'pending',  label:`Pending (${counts.pending})`,  bg:'#FDF0DC', color:'#B87A1A' },
        { key:'wip',      label:`WIP (${counts.wip})`,          bg:'rgba(22,48,97,0.08)', color:'#163061' },
        { key:'approved', label:`Approved (${counts.approved})`,bg:'#E3F2EA', color:'#2B6E4A' },
        { key:'rejected', label:`Rejected (${counts.rejected})`,bg:'#FDE8E8', color:'#B82929' },
      ].map(s =>
        React.createElement('button', { key:s.key, onClick:()=>setFilter(filter===s.key?'all':s.key), style:{
          padding:'6px 14px', borderRadius:6,
          background: filter===s.key ? s.bg : 'white',
          border:`1px solid ${filter===s.key?s.color:_mDS.border}`,
          color:filter===s.key?s.color:_mDS.text2,
          cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'DM Sans,sans-serif'
        } }, s.label)
      ),
    ),
    // Cards grid
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 } },
      filtered.map(a =>
        React.createElement('div', { key:a.id, style:{ background:_mDS.surface, border:`1px solid ${_mDS.border}`, borderRadius:8, overflow:'hidden' } },
          // Card header
          React.createElement('div', { style:{ padding:'14px 16px', borderBottom:`1px solid ${_mDS.border}`, display:'flex', gap:10, alignItems:'flex-start' } },
            React.createElement(PlatformChip, { id:a.platform }),
            React.createElement('div', { style:{ flex:1, minWidth:0 } },
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_mDS.text, fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' } }, a.title),
              React.createElement('div', { style:{ fontSize:11, color:_mDS.text3, fontFamily:'DM Sans,sans-serif', marginTop:2 } }, a.campaign),
            ),
            React.createElement(StatusBadge, { status:a.status }),
          ),
          // Preview text
          React.createElement('div', { style:{ padding:'12px 16px', background:_mDS.bg, fontSize:12, color:_mDS.text2, fontFamily:'DM Sans,sans-serif', lineHeight:1.6, fontStyle:'italic', borderBottom:`1px solid ${_mDS.border}` } },
            '"', a.previewText, '"',
          ),
          // Note + meta
          React.createElement('div', { style:{ padding:'12px 16px' } },
            a.note && React.createElement('div', { style:{ fontSize:11, color:_mDS.text2, fontFamily:'DM Sans,sans-serif', marginBottom:10, lineHeight:1.5 } },
              React.createElement('span', { style:{ fontWeight:700, color:_mDS.text3 } }, 'Note: '), a.note,
            ),
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 } },
              React.createElement('div', { style:{ display:'flex', gap:6, alignItems:'center' } },
                React.createElement(window.Avatar, { initials:a.owner.split(' ').map(w=>w[0]).join(''), color:_mDS.navyMid, size:22 }),
                React.createElement('span', { style:{ fontSize:11, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, a.owner),
              ),
              React.createElement('span', { style:{ fontSize:10, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, a.lastUpdate),
            ),
            // Action buttons
            React.createElement('div', { style:{ display:'flex', gap:8 } },
              React.createElement('button', { style:{ flex:1, padding:'7px', background:_mDS.success, color:'#fff', border:'none', borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✓ Approve'),
              React.createElement('button', { style:{ flex:1, padding:'7px', background:'#FDE8E8', color:'#B82929', border:`1px solid rgba(184,41,41,0.2)`, borderRadius:5, cursor:'pointer', fontSize:11, fontWeight:700, fontFamily:'DM Sans,sans-serif' } }, '✕ Reject'),
              React.createElement('button', { style:{ flex:1, padding:'7px', background:_mDS.bg, color:_mDS.text2, border:`1px solid ${_mDS.border}`, borderRadius:5, cursor:'pointer', fontSize:11, fontFamily:'DM Sans,sans-serif' } }, '↩ Request Changes'),
            ),
          ),
        )
      ),
    ),
  );
}

// ─── MARKETING PARENT ─────────────────────────────────────────────────────────
function Marketing() {
  const [tab, setTab] = React.useState('social');
  const TABS = [
    { id:'social',    label:'Social Live' },
    { id:'insights',  label:'Insights' },
    { id:'calendar',  label:'Publishing Calendar' },
    { id:'approvals', label:'Approvals' },
  ];

  const mData = window.FBR.marketing;
  if (!mData) return React.createElement('div', { style:{ padding:24, color:_mDS.text3, fontFamily:'DM Sans,sans-serif' } }, 'Marketing data not loaded.');

  let content;
  switch(tab) {
    case 'social':    content = React.createElement(SocialLive, {}); break;
    case 'insights':  content = React.createElement(MarketingInsights, {}); break;
    case 'calendar':  content = React.createElement(PublishingCalendar, {}); break;
    case 'approvals': content = React.createElement(MarketingApprovals, {}); break;
    default:          content = React.createElement(SocialLive, {});
  }

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'calc(100vh - 104px)' } },
    React.createElement('div', { style:{ display:'flex', borderBottom:`1px solid ${_mDS.border}`, background:_mDS.surface, flexShrink:0 } },
      TABS.map(t =>
        React.createElement('button', { key:t.id, onClick:()=>setTab(t.id), style:{
          padding:'12px 24px', background:'transparent', border:'none',
          borderBottom:`2px solid ${tab===t.id?_mDS.gold:'transparent'}`,
          cursor:'pointer', fontSize:13, fontWeight:tab===t.id?700:400,
          color:tab===t.id?_mDS.text:_mDS.text3, fontFamily:'DM Sans,sans-serif', transition:'all 0.15s'
        } }, t.label)
      ),
    ),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'24px' } },
      content,
    ),
  );
}

Object.assign(window, { Marketing, SocialLive, MarketingInsights, PublishingCalendar, MarketingApprovals });
