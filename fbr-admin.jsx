// FBR Platform — Admin: Users · Roles · Lead Routing · Workflows · Data · Audit Log · AI Controls
// Depends on: fbr-data.js, fbr-ui.jsx

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN USERS
// ═══════════════════════════════════════════════════════════════════════════════

function AdminUsers({ setScreen }) {
  const _DS   = window.DS;
  const users = window.FBR.adminUsers || [];

  const [search, setSearch]           = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [filterRole, setFilterRole]   = React.useState('All');

  const roles = ['All', ...Array.from(new Set(users.map(u=>u.role)))];
  const filtered = users
    .filter(u => filterRole==='All' || u.role===filterRole)
    .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const statusStyle = (s) => s==='active' ? { bg:'#D1FAE5', color:'#065F46' } : s==='inactive' ? { bg:'#F3F4F6', color:'#6B7280' } : { bg:'#FEF3C7', color:'#92400E' };

  const sel = selectedUser || filtered[0];

  return React.createElement('div', { style:{ display:'flex', height:'100%', background:window.DS.bg, overflow:'hidden' } },

    // Left: user list
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', padding:'20px 0 20px 24px' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', display:'flex', flexDirection:'column' } },

        // Header
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:11, color:_DS.gold, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, 'User Management'),
          React.createElement('div', { style:{ display:'flex', gap:4 } },
            [
              ['Active', users.filter(u=>u.status==='active').length],
              ['Inactive', users.filter(u=>u.status==='inactive').length],
              ['Pending', users.filter(u=>u.status==='pending').length],
            ].map(([l,n]) =>
              React.createElement('div', { key:l, style:{ fontSize:12, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif' } }, n+' '+l+' ')
            )
          ),
        ),

        // Filters
        React.createElement('div', { style:{ padding:'12px 20px', borderBottom:'1px solid #EAE5DC', display:'flex', gap:8, alignItems:'center' } },
          React.createElement('input', { value:search, onChange:e=>setSearch(e.target.value), placeholder:'Search users…',
            style:{ flex:1, padding:'7px 12px', border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#F9F8F5' } }),
          roles.map(r =>
            React.createElement('button', { key:r, onClick:()=>setFilterRole(r), style:{
              padding:'5px 12px', borderRadius:5, border:'1px solid '+(filterRole===r?_DS.gold:'#E4DDD0'),
              background:filterRole===r?_DS.gold:'transparent', color:filterRole===r?'#fff':_DS.navy,
              fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif'
            } }, r)
          ),
          React.createElement('button', { style:{ padding:'7px 14px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif', whiteSpace:'nowrap' } }, '+ Invite User'),
        ),

        // Column headers
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 140px 120px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['User','Role','Team','Last Login','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),
        React.createElement('div', { style:{ overflow:'auto', flex:1 } },
          filtered.map(u =>
            React.createElement('div', { key:u.id, onClick:()=>setSelectedUser(u),
              style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 140px 120px', padding:'12px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center', cursor:'pointer', background:sel?.id===u.id?'#F5F2EC':'#fff' }
            },
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
                React.createElement('div', { style:{ width:32, height:32, borderRadius:'50%', background:u.color||_DS.navy, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
                  React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, u.avatar||u.name.split(' ').map(n=>n[0]).join('').slice(0,2))
                ),
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, u.name),
                  React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:1 } }, u.email),
                ),
              ),
              React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif', fontWeight:500 } }, u.role),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, u.team),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, u.lastLogin),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, ...statusStyle(u.status), fontFamily:'DM Sans,sans-serif' } }, u.status),
            )
          )
        ),
      ),
    ),

    // Right: user detail
    sel && React.createElement('div', { style:{ width:300, padding:'20px 24px 20px 12px', display:'flex', flexDirection:'column' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', flex:1, display:'flex', flexDirection:'column' } },
        React.createElement('div', { style:{ background:_DS.navy, padding:'20px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' } },
          React.createElement('div', { style:{ width:56, height:56, borderRadius:'50%', background:sel.color||_DS.gold, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 } },
            React.createElement('span', { style:{ fontSize:22, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, sel.avatar||sel.name.split(' ').map(n=>n[0]).join('').slice(0,2))
          ),
          React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, sel.name),
          React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.5)', fontFamily:'DM Sans,sans-serif', marginTop:4 } }, sel.email),
          React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 12px', borderRadius:10, background:'rgba(192,155,87,0.2)', color:_DS.gold, fontFamily:'DM Sans,sans-serif', marginTop:8 } }, sel.role),
        ),
        React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1 } },
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 } },
            [['Team', sel.team],['Last Login', sel.lastLogin],['Status', sel.status],['User ID', sel.id]].map(([l,v]) =>
              React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #F0EDE8' } },
                React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                React.createElement('span', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
              )
            )
          ),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 } },
            React.createElement('button', { style:{ padding:'9px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Edit Permissions'),
            React.createElement('button', { style:{ padding:'9px', background:'transparent', color:_DS.navy, border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Reset Password'),
            sel.status==='active'
              ? React.createElement('button', { style:{ padding:'9px', background:'transparent', color:'#DC2626', border:'1px solid #FECACA', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Deactivate User')
              : React.createElement('button', { style:{ padding:'9px', background:'transparent', color:'#059669', border:'1px solid #A7F3D0', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Activate User'),
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROLES & PERMISSIONS
// ═══════════════════════════════════════════════════════════════════════════════

function AdminRoles({ setScreen }) {
  const _DS = window.DS;

  const roles = [
    { id:'CEO', label:'CEO / Owner', color:'#C09B57', users:1, description:'Full platform access — all sections, admin, finance, AI controls' },
    { id:'BrokerSr', label:'Senior Broker', color:'#0F2340', users:2, description:'Revenue, Market Intel, Marketing — own leads and pipeline only' },
    { id:'Broker', label:'Broker', color:'#1E40AF', users:1, description:'Revenue — own leads, pipeline, calendar. Read-only market intel' },
    { id:'Ops', label:'Operations Manager', color:'#059669', users:1, description:'Operations section full access. Finance view, payroll approval' },
    { id:'Marketing', label:'Marketing Manager', color:'#7C3AED', users:1, description:'Marketing Performance full access. Campaign management' },
    { id:'Admin', label:'Admin Coordinator', color:'#9C948A', users:1, description:'Lead routing, inbox, coordination. No financial access' },
    { id:'ReadOnly', label:'Read Only / Viewer', color:'#6B7280', users:1, description:'Dashboard and market intel only. No edit access' },
  ];

  const modules = ['Command Center','Revenue Engine','Market Intelligence','Marketing Perf.','Operations','Admin'];

  const permissions = {
    CEO:       ['full','full','full','full','full','full'],
    BrokerSr:  ['view','full','view','view','none','none'],
    Broker:    ['none','own','view','none','none','none'],
    Ops:       ['view','view','view','none','full','none'],
    Marketing: ['view','view','view','full','none','none'],
    Admin:     ['none','leads','none','none','none','partial'],
    ReadOnly:  ['view','none','view','none','none','none'],
  };

  const permStyle = (p) => ({
    full:    { bg:'#D1FAE5', color:'#065F46', label:'Full' },
    view:    { bg:'#DBEAFE', color:'#1E40AF', label:'View' },
    own:     { bg:'#EDE9FE', color:'#5B21B6', label:'Own' },
    leads:   { bg:'#FEF3C7', color:'#92400E', label:'Leads' },
    partial: { bg:'#F3F4F6', color:'#374151', label:'Partial' },
    none:    { bg:'#F3F4F6', color:'#D1D5DB', label:'—' },
  })[p] || { bg:'#F3F4F6', color:'#9C948A', label:p };

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // Header
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Roles & Permissions'),
        React.createElement('div', { style:{ fontSize:12, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, roles.length+' roles defined · '+roles.reduce((a,r)=>a+r.users,0)+' users assigned'),
      ),
      React.createElement('button', { style:{ padding:'9px 18px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, '+ Create Role'),
    ),

    // Permissions matrix
    React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'auto' } },
      React.createElement('table', { style:{ width:'100%', borderCollapse:'collapse', fontFamily:'DM Sans,sans-serif' } },
        React.createElement('thead', null,
          React.createElement('tr', { style:{ background:'#F9F8F5' } },
            React.createElement('th', { style:{ padding:'12px 20px', textAlign:'left', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', minWidth:220, borderBottom:'1px solid #EAE5DC', position:'sticky', left:0, background:'#F9F8F5', zIndex:2 } }, 'Role'),
            React.createElement('th', { style:{ padding:'12px 12px', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', borderBottom:'1px solid #EAE5DC', whiteSpace:'nowrap' } }, 'Users'),
            modules.map(m =>
              React.createElement('th', { key:m, style:{ padding:'12px 12px', fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', borderBottom:'1px solid #EAE5DC', whiteSpace:'nowrap', textAlign:'center' } }, m)
            ),
          )
        ),
        React.createElement('tbody', null,
          roles.map(r =>
            React.createElement('tr', { key:r.id, style:{ borderTop:'1px solid #F0EDE8' } },
              React.createElement('td', { style:{ padding:'14px 20px', position:'sticky', left:0, background:'#fff', zIndex:1 } },
                React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
                  React.createElement('div', { style:{ width:10, height:10, borderRadius:'50%', background:r.color, flexShrink:0 } }),
                  React.createElement('div', null,
                    React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy } }, r.label),
                    React.createElement('div', { style:{ fontSize:10, color:'#9C948A', marginTop:2, maxWidth:180 } }, r.description),
                  ),
                ),
              ),
              React.createElement('td', { style:{ padding:'14px 12px', textAlign:'center', fontSize:12, fontWeight:700, color:_DS.navy } }, r.users),
              (permissions[r.id]||[]).map((p, i) => {
                const ps = permStyle(p);
                return React.createElement('td', { key:i, style:{ padding:'14px 12px', textAlign:'center' } },
                  React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:8, background:ps.bg, color:ps.color } }, ps.label)
                );
              }),
            )
          )
        ),
      ),
    ),

    // Legend
    React.createElement('div', { style:{ display:'flex', gap:12, marginTop:14, flexWrap:'wrap' } },
      [['full','Full'],['view','View Only'],['own','Own Records'],['leads','Leads Only'],['partial','Partial'],['none','No Access']].map(([p,l]) => {
        const ps = permStyle(p);
        return React.createElement('div', { key:p, style:{ display:'flex', alignItems:'center', gap:6 } },
          React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:8, background:ps.bg, color:ps.color, fontFamily:'DM Sans,sans-serif' } }, l),
        );
      })
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEAD ROUTING
// ═══════════════════════════════════════════════════════════════════════════════

function AdminLeadRouting({ setScreen }) {
  const _DS = window.DS;

  const routingRules = [
    { id:'RR-001', name:'Papagayo High-Budget', priority:1, source:'Website', condition:'Zone = Papagayo AND Budget ≥ $2M', assignTo:'Carlos Rodríguez', fallback:'María Fernández', active:true, leads:12 },
    { id:'RR-002', name:'Flamingo Beachfront', priority:2, source:'Website / Meta', condition:'Zone = Flamingo AND Type = Home', assignTo:'Jennifer Walsh', fallback:'Carlos Rodríguez', active:true, leads:8 },
    { id:'RR-003', name:'Las Catalinas Specialist', priority:3, source:'Any', condition:'Zone = Las Catalinas', assignTo:'María Fernández', fallback:'Round Robin', active:true, leads:6 },
    { id:'RR-004', name:'Land & Development Leads', priority:4, source:'Any', condition:'Type = Land AND Budget ≥ $5M', assignTo:'Carlos Rodríguez', fallback:'Round Robin', active:true, leads:4 },
    { id:'RR-005', name:'Canada / French Market', priority:5, source:'Google Ads', condition:'Country = Canada OR Language = French', assignTo:'Jennifer Walsh', fallback:'Round Robin', active:false, leads:3 },
    { id:'RR-006', name:'Round Robin — General', priority:99, source:'All Sources', condition:'All other leads', assignTo:'Round Robin (All Brokers)', fallback:'CEO Notification', active:true, leads:28 },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Lead Routing Rules'),
        React.createElement('div', { style:{ fontSize:12, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Automatic assignment logic — evaluated in priority order'),
      ),
      React.createElement('button', { style:{ padding:'9px 18px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, '+ Add Rule'),
    ),

    React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'60px 2fr 1fr 2fr 1fr 1fr 70px 80px', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
        ['Priority','Rule Name','Source','Condition','Assign To','Fallback','Leads','Active'].map(h =>
          React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
        )
      ),
      routingRules.map(r =>
        React.createElement('div', { key:r.id, style:{ display:'grid', gridTemplateColumns:'60px 2fr 1fr 2fr 1fr 1fr 70px 80px', padding:'14px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
          React.createElement('div', { style:{ width:28, height:28, borderRadius:'50%', background:r.active?_DS.navy:'#EAE5DC', display:'flex', alignItems:'center', justifyContent:'center' } },
            React.createElement('span', { style:{ fontSize:11, fontWeight:800, color:r.active?'#fff':'#9C948A', fontFamily:'DM Sans,sans-serif' } }, r.priority===99?'∞':String(r.priority))
          ),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, r.name),
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', marginTop:2, fontFamily:'DM Sans,sans-serif' } }, r.id),
          ),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, r.source),
          React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif', fontStyle:'italic' } }, r.condition),
          React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, r.assignTo.split(' ')[0]),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, r.fallback.split(' ')[0]),
          React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, r.leads),
          React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' } },
            React.createElement('div', { style:{
              width:36, height:20, borderRadius:10, background:r.active?'#10B981':'#D1D5DB', position:'relative', cursor:'pointer', transition:'background 0.2s',
            } },
              React.createElement('div', { style:{ position:'absolute', top:2, left:r.active?18:2, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' } })
            ),
          ),
        )
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WORKFLOWS
// ═══════════════════════════════════════════════════════════════════════════════

function AdminWorkflows({ setScreen }) {
  const _DS = window.DS;

  const [activeSection, setActiveSection] = React.useState('pipeline');

  const pipelineStages = [
    { id:'new', label:'New Lead', sla:'24h', autoAction:'Send welcome email, assign broker', leads:18, color:'#6B7280' },
    { id:'contacted', label:'Contacted', sla:'48h', autoAction:'Log call, set follow-up reminder', leads:14, color:'#1E40AF' },
    { id:'qualified', label:'Qualified', sla:'72h', autoAction:'Schedule tour, send property matches', leads:11, color:'#7C3AED' },
    { id:'tour', label:'Tour Scheduled', sla:'—', autoAction:'Send tour confirmation, broker prep sheet', leads:6, color:'#0891B2' },
    { id:'offer', label:'Offer Stage', sla:'—', autoAction:'Notify CEO, generate offer summary', leads:4, color:'#D97706' },
    { id:'negotiation', label:'Negotiation', sla:'—', autoAction:'Daily check-in reminder, legal contact alert', leads:3, color:'#EA580C' },
    { id:'closing', label:'Closing', sla:'—', autoAction:'Generate invoice, commission record, send congratulations', leads:2, color:'#059669' },
    { id:'lost', label:'Lost', sla:'—', autoAction:'Log reason, add to re-engagement drip', leads:5, color:'#DC2626' },
  ];

  const followUpRules = [
    { trigger:'New lead — no contact', action:'Push notification to broker + SMS alert', timing:'Immediate', escalate:'CEO if 4h no response' },
    { trigger:'Lead contacted — no qualification', action:'Reminder to broker — qualify or move to nurture', timing:'48h', escalate:'Team lead at 72h' },
    { trigger:'Tour completed — no offer', action:'Follow-up email template + call reminder', timing:'24h after tour', escalate:'None' },
    { trigger:'Offer sent — no response', action:'Broker call + WhatsApp nudge', timing:'48h', escalate:'CEO alert at 5 days' },
    { trigger:'Lead stale (14+ days)', action:'Re-engagement email + broker notification', timing:'14 days no activity', escalate:'Flagged in Command Center' },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    React.createElement('div', { style:{ display:'flex', gap:4, marginBottom:20 } },
      [['pipeline','Pipeline Stages'],['followup','Follow-Up Rules'],['commission','Commission Rules']].map(([v,l]) =>
        React.createElement('button', { key:v, onClick:()=>setActiveSection(v), style:{
          padding:'8px 18px', borderRadius:6, border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif',
          background:activeSection===v?_DS.navy:'#fff', color:activeSection===v?'#fff':_DS.navy,
        } }, l)
      )
    ),

    activeSection === 'pipeline' && React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
      pipelineStages.map((s,i) =>
        React.createElement('div', { key:s.id, style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', padding:'16px 20px', display:'flex', alignItems:'center', gap:16 } },
          React.createElement('div', { style:{ width:32, height:32, borderRadius:'50%', background:s.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
            React.createElement('span', { style:{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, i+1)
          ),
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, s.label),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, s.autoAction),
          ),
          s.sla !== '—' && React.createElement('div', { style:{ textAlign:'center', minWidth:60 } },
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em' } }, 'SLA'),
            React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, s.sla),
          ),
          React.createElement('div', { style:{ textAlign:'center', minWidth:60 } },
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em' } }, 'Active'),
            React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, s.leads),
          ),
        )
      )
    ),

    activeSection === 'followup' && React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 2fr 1fr 1fr', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
        ['Trigger','Automated Action','Timing','Escalation'].map(h =>
          React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
        )
      ),
      followUpRules.map((r,i) =>
        React.createElement('div', { key:i, style:{ display:'grid', gridTemplateColumns:'2fr 2fr 1fr 1fr', padding:'14px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'start' } },
          React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, r.trigger),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, r.action),
          React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif', fontWeight:500 } }, r.timing),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, r.escalate),
        )
      ),
    ),

    activeSection === 'commission' && React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', padding:'24px' } },
      React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:16 } }, 'Commission Structure & Assumptions'),
      [
        ['Brokerage Side (Seller)', '3% of gross sale price'],
        ['Brokerage Side (Buyer)', '3% of gross sale price'],
        ['Co-Brokerage Split', '50/50 unless negotiated separately'],
        ['Senior Broker Commission', '3% of brokerage gross commission'],
        ['Broker Commission', '2.5% of brokerage gross commission'],
        ['IVA on Services (CR)', '13% applied to all invoiced amounts'],
        ['Commission Release', 'Upon close of escrow / final signature'],
        ['Referral Fee', '10% of broker share, logged separately'],
      ].map(([l,v]) =>
        React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #F0EDE8' } },
          React.createElement('span', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, l),
          React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
        )
      )
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

function AdminData({ setScreen }) {
  const _DS = window.DS;

  const leads    = window.FBR.leads || [];
  const listings = window.FBR.listings || [];
  const pipeline = window.FBR.pipeline || [];

  // Mock duplicates
  const dupLeads = [
    { name:'Robert Anderson', email:'randerson@gmail.com', phone:'+1 619 555 0192', count:2, lastSeen:'2026-06-01' },
    { name:'Michael Torres', email:'mtorres@yahoo.com', phone:'+1 415 555 0288', count:2, lastSeen:'2026-05-28' },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // Summary
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 } },
      [
        { label:'Total Leads', value:String(leads.length), icon:'👤' },
        { label:'Total Listings', value:String(listings.length), icon:'🏠' },
        { label:'Pipeline Records', value:String(pipeline.length), icon:'📊' },
        { label:'Potential Duplicates', value:String(dupLeads.length), icon:'⚠️', warn:true },
      ].map(k =>
        React.createElement('div', { key:k.label, style:{ background:'#fff', borderRadius:8, padding:'14px 16px', border:'1px solid '+(k.warn?'#FDE68A':'#EAE5DC') } },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, marginBottom:4 } },
            React.createElement('span', { style:{ fontSize:18 } }, k.icon),
            React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.1em', fontFamily:'DM Sans,sans-serif' } }, k.label),
          ),
          React.createElement('div', { style:{ fontSize:26, fontWeight:800, color:k.warn?'#D97706':_DS.navy, fontFamily:'DM Sans,sans-serif' } }, k.value),
        )
      )
    ),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 } },

      // Import / Export
      React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
        React.createElement('div', { style:{ background:_DS.navy, padding:'14px 20px' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Import & Export'),
        ),
        React.createElement('div', { style:{ padding:'16px' } },
          ['Leads CSV', 'Listings CSV', 'Pipeline Export', 'Full Backup'].map(item =>
            React.createElement('div', { key:item, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #F0EDE8' } },
              React.createElement('span', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, item),
              React.createElement('div', { style:{ display:'flex', gap:8 } },
                React.createElement('button', { style:{ padding:'5px 10px', background:'#F9F8F5', color:_DS.navy, border:'1px solid #E4DDD0', borderRadius:5, fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Import'),
                React.createElement('button', { style:{ padding:'5px 10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:5, fontSize:10, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Export'),
              ),
            )
          )
        ),
      ),

      // Duplicate detection
      React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
        React.createElement('div', { style:{ background:'#D97706', padding:'14px 20px', display:'flex', alignItems:'center', gap:8 } },
          React.createElement('span', { style:{ fontSize:16 } }, '⚠'),
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Potential Duplicates Detected'),
        ),
        React.createElement('div', { style:{ padding:'0' } },
          dupLeads.map(d =>
            React.createElement('div', { key:d.name, style:{ padding:'14px 16px', borderBottom:'1px solid #F0EDE8' } },
              React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, d.name),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginBottom:8 } }, d.email+' · '+d.phone),
              React.createElement('div', { style:{ display:'flex', gap:8 } },
                React.createElement('button', { style:{ flex:1, padding:'6px', background:_DS.navy, color:'#fff', border:'none', borderRadius:5, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Merge'),
                React.createElement('button', { style:{ flex:1, padding:'6px', background:'transparent', color:_DS.navy, border:'1px solid #E4DDD0', borderRadius:5, fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Keep Both'),
              ),
            )
          )
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUDIT LOG
// ═══════════════════════════════════════════════════════════════════════════════

function AdminAuditLog({ setScreen }) {
  const _DS    = window.DS;
  const auditLog = window.FBR.auditLog || [];

  const [filterModule, setFilterModule] = React.useState('All');
  const [filterUser, setFilterUser]     = React.useState('All');

  const modules = ['All', ...Array.from(new Set(auditLog.map(e=>e.module)))];
  const users   = ['All', ...Array.from(new Set(auditLog.map(e=>e.user)))];

  const filtered = auditLog
    .filter(e => filterModule==='All' || e.module===filterModule)
    .filter(e => filterUser==='All' || e.user===filterUser);

  const actionStyle = (a) => {
    if (/delete|remove/i.test(a)) return { color:'#DC2626', bg:'#FEE2E2' };
    if (/creat|add|new/i.test(a)) return { color:'#059669', bg:'#D1FAE5' };
    if (/update|edit|change/i.test(a)) return { color:'#1E40AF', bg:'#DBEAFE' };
    if (/login|access/i.test(a)) return { color:'#6B7280', bg:'#F3F4F6' };
    return { color:'#6B7280', bg:'#F3F4F6' };
  };

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, padding:'20px 24px', overflow:'auto' } },

    // Filters
    React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:16, alignItems:'center', flexWrap:'wrap' } },
      React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', flex:'0 0 auto' } }, 'Module:'),
      modules.slice(0,6).map(m =>
        React.createElement('button', { key:m, onClick:()=>setFilterModule(m), style:{
          padding:'5px 12px', borderRadius:5, border:'1px solid '+(filterModule===m?_DS.gold:'#E4DDD0'),
          background:filterModule===m?_DS.gold:'transparent', color:filterModule===m?'#fff':_DS.navy,
          fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif'
        } }, m)
      ),
      React.createElement('span', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginLeft:8, flex:'0 0 auto' } }, 'User:'),
      React.createElement('select', { value:filterUser, onChange:e=>setFilterUser(e.target.value), style:{ padding:'6px 10px', border:'1px solid #E4DDD0', borderRadius:5, fontSize:12, fontFamily:'DM Sans,sans-serif', outline:'none', background:'#fff' } },
        users.map(u => React.createElement('option', { key:u, value:u }, u))
      ),
    ),

    React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', flex:1 } },
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'160px 120px 100px 100px 1fr 200px', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
        ['Timestamp','User','Module','Action','Record','Summary'].map(h =>
          React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
        )
      ),
      filtered.map((e,i) => {
        const as = actionStyle(e.action);
        return React.createElement('div', { key:i, style:{ display:'grid', gridTemplateColumns:'160px 120px 100px 100px 1fr 200px', padding:'12px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.date),
          React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, e.user),
          React.createElement('span', { style:{ fontSize:10, padding:'2px 8px', borderRadius:8, background:'#F3F4F6', color:'#374151', fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, e.module),
          React.createElement('span', { style:{ fontSize:10, padding:'2px 8px', borderRadius:8, background:as.bg, color:as.color, fontFamily:'DM Sans,sans-serif', fontWeight:600 } }, e.action),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.record),
          React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, e.summary),
        );
      })
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AI CONTROLS
// ═══════════════════════════════════════════════════════════════════════════════

function AdminAIControls({ setScreen }) {
  const _DS     = window.DS;
  const aiConfig = window.FBR.aiConfig || {};

  const [enabled, setEnabled]               = React.useState(aiConfig.enabled !== false);
  const [suggestedReplies, setSuggestedReplies] = React.useState(aiConfig.suggestedRepliesEnabled !== false);
  const [autoReplies, setAutoReplies]       = React.useState(aiConfig.autoRepliesEnabled === true);
  const [humanApproval, setHumanApproval]   = React.useState(aiConfig.humanApprovalRequired !== false);

  function Toggle({ value, onChange, id }) {
    return React.createElement('div', { onClick:()=>onChange(!value), style:{
      width:44, height:24, borderRadius:12, background:value?'#10B981':'#D1D5DB', position:'relative', cursor:'pointer', transition:'background 0.2s', flexShrink:0,
    } },
      React.createElement('div', { style:{ position:'absolute', top:3, left:value?23:3, width:18, height:18, borderRadius:'50%', background:'#fff', transition:'left 0.2s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' } })
    );
  }

  const govRules = [
    { icon:'⛔', rule:'AI cannot negotiate final price', detail:'All price discussions must be handled by a licensed broker' },
    { icon:'⛔', rule:'AI cannot send offers', detail:'Offers require explicit broker + CEO approval before transmission' },
    { icon:'⛔', rule:'AI cannot confirm legal terms', detail:'Legal statements, timelines, and contract terms require human review' },
    { icon:'⛔', rule:'AI cannot promise availability', detail:'Inventory status must be verified against live data before any commitment' },
    { icon:'⛔', rule:'AI cannot send messages without approval', detail:'Unless auto-response rules are explicitly enabled and scoped to approved types' },
  ];

  const allowedTypes = (aiConfig.allowedMessageTypes || ['initial_greeting','property_match','tour_confirmation','general_info']);
  const forbiddenTopics = (aiConfig.forbiddenTopics || ['price_negotiation','legal_terms','offer_submission','availability_guarantee','financial_advice']);
  const channels = (aiConfig.allowedChannels || ['whatsapp','email','platform_inbox']);

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // Master controls
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 } },
      [
        { label:'AI Assistance Enabled', value:enabled, set:setEnabled, desc:'AI-powered suggestions and automation globally' },
        { label:'Suggested Replies', value:suggestedReplies, set:setSuggestedReplies, desc:'Show AI-drafted replies in inbox for broker approval' },
        { label:'Auto-Replies (Scoped)', value:autoReplies, set:setAutoReplies, desc:'Auto-send only pre-approved response types' },
        { label:'Human Approval Required', value:humanApproval, set:setHumanApproval, desc:'All AI-generated messages require human sign-off' },
      ].map(k =>
        React.createElement('div', { key:k.label, style:{ background:'#fff', borderRadius:8, padding:'14px 16px', border:'1px solid '+(k.value?'#A7F3D0':'#EAE5DC') } },
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1.3, paddingRight:8 } }, k.label),
            React.createElement(Toggle, { value:k.value, onChange:k.set }),
          ),
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, k.desc),
        )
      )
    ),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 } },

      // Governance Rules
      React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
        React.createElement('div', { style:{ background:'#DC2626', padding:'14px 20px' } },
          React.createElement('div', { style:{ fontSize:13, fontWeight:800, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'AI Governance Rules'),
          React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'These rules are enforced at system level and cannot be overridden'),
        ),
        React.createElement('div', { style:{ padding:'0' } },
          govRules.map((r,i) =>
            React.createElement('div', { key:i, style:{ padding:'14px 20px', borderBottom:'1px solid #F0EDE8', display:'flex', gap:12, alignItems:'flex-start' } },
              React.createElement('span', { style:{ fontSize:18, flexShrink:0 } }, r.icon),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'#1F2937', fontFamily:'DM Sans,sans-serif', marginBottom:2 } }, r.rule),
                React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', lineHeight:1.5 } }, r.detail),
              ),
            )
          )
        ),
      ),

      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:16 } },

        // Allowed message types
        React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
          React.createElement('div', { style:{ background:_DS.navy, padding:'12px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Allowed Auto-Response Types'),
          ),
          React.createElement('div', { style:{ padding:'12px 20px' } },
            allowedTypes.map(t =>
              React.createElement('div', { key:t, style:{ display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid #F0EDE8' } },
                React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#10B981' } }),
                React.createElement('span', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, t.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())),
              )
            )
          ),
        ),

        // Forbidden topics
        React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
          React.createElement('div', { style:{ background:'#B45309', padding:'12px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'Forbidden Topics / Escalate to Human'),
          ),
          React.createElement('div', { style:{ padding:'12px 20px' } },
            forbiddenTopics.map(t =>
              React.createElement('div', { key:t, style:{ display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid #F0EDE8' } },
                React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#DC2626' } }),
                React.createElement('span', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, t.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase())),
              )
            )
          ),
        ),

        // Active channels
        React.createElement('div', { style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
          React.createElement('div', { style:{ background:'#0891B2', padding:'12px 20px' } },
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, 'AI-Enabled Channels'),
          ),
          React.createElement('div', { style:{ padding:'12px 20px', display:'flex', gap:8, flexWrap:'wrap' } },
            channels.map(ch =>
              React.createElement('span', { key:ch, style:{ fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:8, background:'#DBEAFE', color:'#1E40AF', fontFamily:'DM Sans,sans-serif' } }, ch.replace(/_/g,' ').toUpperCase())
            )
          ),
        ),
      ),
    ),
  );
}

// ── Exports ──────────────────────────────────────────────────────────────────
Object.assign(window, { AdminUsers, AdminRoles, AdminLeadRouting, AdminWorkflows, AdminData, AdminAuditLog, AdminAIControls });
