// FBR Platform — Operations: Finance · Electronic Invoicing · Accounting · Payroll · Banking
// Depends on: fbr-data.js, fbr-ui.jsx

// ─── SHARED MOCK DATA ───────────────────────────────────────────────────────

const _OPS_COMMISSIONS = [
  { id:'COM-001', closing:'Casa Todo Bien', agent:'Carlos Rodríguez', amount:88000, status:'paid', date:'2026-05-28', buyer:'James & Laura Whitfield', listingId:'FBR-430' },
  { id:'COM-002', closing:'Villa El Alma', agent:'Carlos Rodríguez', amount:150000, status:'pending', date:'2026-06-15', buyer:'David Chen', listingId:'FBR-631' },
  { id:'COM-003', closing:'Casa Alegria', agent:'María Fernández', amount:79800, status:'paid', date:'2026-05-14', buyer:'The Andersons', listingId:'FBR-409' },
  { id:'COM-004', closing:'Hacienda Pinilla Golf Villa', agent:'Jennifer Walsh', amount:55000, status:'processing', date:'2026-06-20', buyer:'Robert & Susan Park', listingId:'FBR-610' },
  { id:'COM-005', closing:'Casa de Sueños Potrero', agent:'María Fernández', amount:90000, status:'pending', date:'2026-07-01', buyer:'The Martinez Family', listingId:'FBR-496' },
];

const _OPS_EXPENSES = [
  { id:'EXP-001', category:'Paid Media', description:'Meta & Google Ads — May 2026', amount:34280, date:'2026-05-31', status:'approved', vendor:'Meta / Google' },
  { id:'EXP-002', category:'Photography', description:'Professional shoots — 3 listings', amount:4200, date:'2026-05-20', status:'approved', vendor:'Studio Guanacaste' },
  { id:'EXP-003', category:'Office', description:'Flamingo office — June rent', amount:2800, date:'2026-06-01', status:'approved', vendor:'Playa Flamingo Properties' },
  { id:'EXP-004', category:'Legal', description:'Closing documentation — FBR-631', amount:3500, date:'2026-05-28', status:'pending', vendor:'Guanacaste Notaría' },
  { id:'EXP-005', category:'Technology', description:'CRM, tools, hosting — Q2', amount:1860, date:'2026-06-01', status:'approved', vendor:'Various' },
  { id:'EXP-006', category:'Travel', description:'Client tours — Papagayo / Flamingo', amount:980, date:'2026-05-25', status:'approved', vendor:'Reimbursable' },
];

const _OPS_INVOICES = [
  { id:'FBR-INV-2026-005', client:'David Chen', property:'Villa El Alma', type:'Brokerage Commission', amount:150000, iva:19500, total:169500, status:'draft', date:'2026-06-01', dueDate:'2026-06-20', cr:true },
  { id:'FBR-INV-2026-004', client:'James Whitfield', property:'Casa Todo Bien', type:'Brokerage Commission', amount:88000, iva:11440, total:99440, status:'issued', date:'2026-05-28', dueDate:'2026-06-12', cr:true },
  { id:'FBR-INV-2026-003', client:'The Andersons', property:'Casa Alegria', type:'Brokerage Commission', amount:79800, iva:10374, total:90174, status:'paid', date:'2026-05-14', dueDate:'2026-05-28', cr:true },
  { id:'FBR-INV-2026-002', client:'Robert Park', property:'Hacienda Pinilla Golf Villa', type:'Brokerage Commission', amount:55000, iva:7150, total:62150, status:'issued', date:'2026-06-03', dueDate:'2026-06-18', cr:true },
  { id:'FBR-INV-2026-001', client:'Various — Marketing Services', property:'Q2 Retainer', type:'Marketing Services', amount:18000, iva:2340, total:20340, status:'paid', date:'2026-04-01', dueDate:'2026-04-15', cr:false },
];

const _OPS_PAYROLL = [
  { id:'EMP-001', name:'María Fernández', role:'Senior Broker', type:'commission', base:null, commission:'3% gross', ytdEarnings:168800, ytdCommission:168800, status:'active', payPeriod:'monthly', lastPaid:'2026-05-31', nextPay:'2026-06-30' },
  { id:'EMP-002', name:'Carlos Rodríguez', role:'Senior Broker', type:'commission', base:null, commission:'3% gross', ytdEarnings:238000, ytdCommission:238000, status:'active', payPeriod:'monthly', lastPaid:'2026-05-31', nextPay:'2026-06-30' },
  { id:'EMP-003', name:'Jennifer Walsh', role:'Broker', type:'commission', base:null, commission:'2.5% gross', ytdEarnings:55000, ytdCommission:55000, status:'active', payPeriod:'monthly', lastPaid:'2026-05-31', nextPay:'2026-06-20' },
  { id:'EMP-004', name:'Ana Jiménez', role:'Operations Manager', type:'salary', base:3200, commission:null, ytdEarnings:19200, ytdCommission:0, status:'active', payPeriod:'monthly', lastPaid:'2026-05-31', nextPay:'2026-06-30' },
  { id:'EMP-005', name:'Diego Mora', role:'Marketing Manager', type:'salary', base:2800, commission:null, ytdEarnings:16800, ytdCommission:0, status:'active', payPeriod:'monthly', lastPaid:'2026-05-31', nextPay:'2026-06-30' },
  { id:'EMP-006', name:'Sofia Castro', role:'Admin & Lead Coordinator', type:'salary', base:1800, commission:null, ytdEarnings:10800, ytdCommission:0, status:'active', payPeriod:'bi-monthly', lastPaid:'2026-06-01', nextPay:'2026-06-15' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// FINANCE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

function FinanceManager({ setScreen }) {
  const _DS = window.DS;

  const [activeTab, setActiveTab] = React.useState('commissions'); // commissions | expenses | ar

  const totalCommissions  = _OPS_COMMISSIONS.reduce((a,c)=>a+c.amount,0);
  const paidCommissions   = _OPS_COMMISSIONS.filter(c=>c.status==='paid').reduce((a,c)=>a+c.amount,0);
  const pendingComm       = _OPS_COMMISSIONS.filter(c=>c.status==='pending').reduce((a,c)=>a+c.amount,0);
  const totalExpenses     = _OPS_EXPENSES.reduce((a,e)=>a+e.amount,0);
  const netRevenue        = paidCommissions - totalExpenses;

  function fmtM(n) { return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':n>=1e3?'$'+(n/1e3).toFixed(0)+'K':'$'+n.toLocaleString(); }

  const statusStyle = (s) => ({
    paid:        { bg:'#D1FAE5', color:'#065F46' },
    pending:     { bg:'#FEF3C7', color:'#92400E' },
    processing:  { bg:'#DBEAFE', color:'#1E40AF' },
    approved:    { bg:'#D1FAE5', color:'#065F46' },
    draft:       { bg:'#F3F4F6', color:'#6B7280' },
    issued:      { bg:'#DBEAFE', color:'#1E40AF' },
  })[s] || { bg:'#F3F4F6', color:'#6B7280' };

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // KPI Row
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:20 } },
      [
        { label:'Total Commission YTD', value:fmtM(totalCommissions), sub:'gross brokerage', hi:false },
        { label:'Commission Paid', value:fmtM(paidCommissions), sub:'cleared', hi:true },
        { label:'Pending Commission', value:fmtM(pendingComm), sub:'awaiting closing', hi:false },
        { label:'Total Expenses MTD', value:fmtM(totalExpenses), sub:'all categories', hi:false },
        { label:'Net Operating Revenue', value:fmtM(netRevenue), sub:'paid comm − expenses', hi:true },
      ].map(k =>
        React.createElement('div', { key:k.label, style:{ background:k.hi?_DS.navy:'#fff', borderRadius:8, padding:'14px 16px', border:'1px solid #EAE5DC' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:k.hi?'rgba(255,255,255,0.5)':'#9C948A', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, k.label),
          React.createElement('div', { style:{ fontSize:22, fontWeight:800, color:k.hi?_DS.gold:_DS.navy, fontFamily:'DM Sans,sans-serif', lineHeight:1 } }, k.value),
          React.createElement('div', { style:{ fontSize:11, color:k.hi?'rgba(255,255,255,0.4)':'#9C948A', marginTop:4, fontFamily:'DM Sans,sans-serif' } }, k.sub),
        )
      )
    ),

    // Tabs
    React.createElement('div', { style:{ display:'flex', gap:4, marginBottom:16 } },
      [['commissions','Commissions'], ['expenses','Expenses'], ['ar','Accounts Receivable']].map(([v,l]) =>
        React.createElement('button', { key:v, onClick:()=>setActiveTab(v), style:{
          padding:'8px 18px', borderRadius:6, border:'none', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif',
          background:activeTab===v?_DS.navy:'#fff', color:activeTab===v?'#fff':_DS.navy,
          boxShadow:activeTab===v?'none':'0 1px 3px rgba(0,0,0,0.06)',
        } }, l)
      )
    ),

    // Table
    React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', flex:1 } },
      activeTab === 'commissions' && React.createElement('div', null,
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'110px 2fr 1fr 1fr 100px 100px', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['ID','Property / Buyer','Agent','Amount','Date','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),
        _OPS_COMMISSIONS.map(c =>
          React.createElement('div', { key:c.id, style:{ display:'grid', gridTemplateColumns:'110px 2fr 1fr 1fr 100px 100px', padding:'14px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, c.id),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.closing),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', marginTop:2, fontFamily:'DM Sans,sans-serif' } }, c.buyer),
            ),
            React.createElement('div', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, c.agent.split(' ')[0]),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtM(c.amount)),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, c.date),
            React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, ...statusStyle(c.status), fontFamily:'DM Sans,sans-serif' } }, c.status),
          )
        )
      ),

      activeTab === 'expenses' && React.createElement('div', null,
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'110px 1fr 2fr 120px 100px 100px', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['ID','Category','Description','Vendor','Amount','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),
        _OPS_EXPENSES.map(e =>
          React.createElement('div', { key:e.id, style:{ display:'grid', gridTemplateColumns:'110px 1fr 2fr 120px 100px 100px', padding:'14px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.id),
            React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, e.category),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.description),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.vendor),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtM(e.amount)),
            React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, ...statusStyle(e.status), fontFamily:'DM Sans,sans-serif' } }, e.status),
          )
        )
      ),

      activeTab === 'ar' && React.createElement('div', null,
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 100px 120px 100px 100px', padding:'10px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['Invoice #','Client','Property','Amount','IVA (13%)','Due Date','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),
        _OPS_INVOICES.map(inv =>
          React.createElement('div', { key:inv.id, style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 100px 120px 100px 100px', padding:'14px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
            React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, inv.id),
            React.createElement('div', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, inv.client),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, inv.property),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtM(inv.amount)),
            React.createElement('div', { style:{ fontSize:12, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, fmtM(inv.iva)),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, inv.dueDate),
            React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, ...statusStyle(inv.status), fontFamily:'DM Sans,sans-serif' } }, inv.status),
          )
        )
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ELECTRONIC INVOICING
// ═══════════════════════════════════════════════════════════════════════════════

function ElectronicInvoicing({ setScreen }) {
  const _DS = window.DS;

  const [selectedInv, setSelectedInv] = React.useState(null);

  const statusStyle = (s) => ({
    draft:   { bg:'#F3F4F6', color:'#6B7280', label:'Draft' },
    issued:  { bg:'#DBEAFE', color:'#1E40AF', label:'Issued' },
    paid:    { bg:'#D1FAE5', color:'#065F46', label:'Paid' },
    overdue: { bg:'#FEE2E2', color:'#991B1B', label:'Overdue' },
  })[s] || { bg:'#F3F4F6', color:'#6B7280', label:s };

  function fmtM(n) { return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':'$'+n.toLocaleString(); }

  const sel = selectedInv || _OPS_INVOICES[0];

  return React.createElement('div', { style:{ display:'flex', height:'100%', background:_DS.bg, overflow:'hidden' } },

    // Left: invoice list
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', padding:'20px 0 20px 24px' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', display:'flex', flexDirection:'column' } },

        // CR Disclaimer banner
        React.createElement('div', { style:{ background:'#FEF3C7', borderBottom:'1px solid #FDE68A', padding:'10px 20px', display:'flex', gap:8, alignItems:'flex-start' } },
          React.createElement('span', { style:{ fontSize:16, flexShrink:0 } }, 'ℹ️'),
          React.createElement('div', { style:{ fontSize:11, color:'#92400E', fontFamily:'DM Sans,sans-serif', lineHeight:1.6 } },
            React.createElement('strong', {}, 'Costa Rica Operations: '),
            'Electronic invoicing and banking capabilities are referenced for Costa Rica-based operations. If additional banks, countries, providers, or external APIs are required, scope and pricing may vary based on provider access and technical requirements.'
          ),
        ),

        // Header
        React.createElement('div', { style:{ padding:'16px 20px', borderBottom:'1px solid #EAE5DC', display:'flex', alignItems:'center', gap:8 } },
          React.createElement('div', { style:{ flex:1 } },
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Electronic Invoices'),
            React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Comprobantes electrónicos · CR Hacienda compatible'),
          ),
          React.createElement('button', { style:{ padding:'8px 16px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, '+ New Invoice'),
        ),

        // Column headers
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 100px 110px 100px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['Invoice #','Client','Property','Amount','Due','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),

        React.createElement('div', { style:{ overflow:'auto', flex:1 } },
          _OPS_INVOICES.map(inv =>
            React.createElement('div', { key:inv.id, onClick:()=>setSelectedInv(inv),
              style:{ display:'grid', gridTemplateColumns:'160px 1fr 1fr 100px 110px 100px', padding:'13px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center', cursor:'pointer', background: sel?.id===inv.id?'#F5F2EC':'#fff' }
            },
              React.createElement('div', { style:{ fontSize:11, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, inv.id),
              React.createElement('div', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, inv.client),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, inv.property),
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtM(inv.amount)),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, inv.dueDate),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:statusStyle(inv.status).bg, color:statusStyle(inv.status).color, fontFamily:'DM Sans,sans-serif' } }, statusStyle(inv.status).label),
            )
          )
        ),
      ),
    ),

    // Right: invoice detail
    React.createElement('div', { style:{ width:340, padding:'20px 24px 20px 12px', display:'flex', flexDirection:'column' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', flex:1, display:'flex', flexDirection:'column' } },
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:11, color:_DS.gold, fontFamily:'DM Sans,sans-serif', fontWeight:700, marginBottom:4 } }, 'COMPROBANTE ELECTRÓNICO'),
          React.createElement('div', { style:{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, sel.id),
          React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:4, fontFamily:'DM Sans,sans-serif' } }, 'Flamingo Beach Realty S.A.'),
        ),
        React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1 } },
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 } },
            [
              ['Client', sel.client],
              ['Property', sel.property],
              ['Type', sel.type],
              ['Invoice Date', sel.date],
              ['Due Date', sel.dueDate],
              ['Base Amount', fmtM(sel.amount)],
              ['IVA 13%', fmtM(sel.iva)],
              ['Total (with IVA)', fmtM(sel.total)],
              ['CR-Compliant', sel.cr ? '✓ Yes' : '— N/A'],
            ].map(([l,v]) =>
              React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #F0EDE8' } },
                React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                React.createElement('span', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
              )
            )
          ),
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8, marginTop:20 } },
            React.createElement('button', { style:{ padding:'10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, sel.status==='draft' ? 'Issue Invoice →' : 'Download PDF'),
            React.createElement('button', { style:{ padding:'10px', background:'transparent', color:_DS.navy, border:'1px solid #E4DDD0', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Send to Client'),
          ),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACCOUNTING MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

function AccountingManager({ setScreen }) {
  const _DS = window.DS;

  const totalRevenue  = _OPS_COMMISSIONS.reduce((a,c)=>a+c.amount,0);
  const totalExpenses = _OPS_EXPENSES.reduce((a,e)=>a+e.amount,0);
  const paidRevenue   = _OPS_COMMISSIONS.filter(c=>c.status==='paid').reduce((a,c)=>a+c.amount,0);
  const grossMargin   = Math.round((paidRevenue - totalExpenses) / paidRevenue * 100);

  function fmtM(n) { return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':n>=1e3?'$'+(n/1e3).toFixed(0)+'K':'$'+n.toLocaleString(); }

  // P&L summary mock
  const plRows = [
    { label:'Gross Commission Income', amount:paidRevenue, type:'income' },
    { label:'  Paid Media & Advertising', amount:-34280, type:'expense' },
    { label:'  Photography & Content', amount:-4200, type:'expense' },
    { label:'  Office & Facilities', amount:-2800, type:'expense' },
    { label:'  Legal & Notary', amount:-3500, type:'expense' },
    { label:'  Technology & Tools', amount:-1860, type:'expense' },
    { label:'  Travel & Client Expenses', amount:-980, type:'expense' },
    { label:'Total Operating Expenses', amount:-totalExpenses, type:'subtotal' },
    { label:'Net Operating Income', amount:paidRevenue - totalExpenses, type:'total' },
    { label:'Pending Commission (AR)', amount: _OPS_COMMISSIONS.filter(c=>c.status!=='paid').reduce((a,c)=>a+c.amount,0), type:'note' },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // KPIs
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 } },
      [
        { label:'Total Revenue (YTD)', value:fmtM(paidRevenue), navy:true },
        { label:'Total Expenses (MTD)', value:fmtM(totalExpenses), navy:false },
        { label:'Net Income (Cleared)', value:fmtM(paidRevenue-totalExpenses), navy:true },
        { label:'Gross Margin', value:grossMargin+'%', navy:false },
      ].map(k =>
        React.createElement('div', { key:k.label, style:{ background:k.navy?_DS.navy:'#fff', borderRadius:8, padding:'16px', border:'1px solid #EAE5DC' } },
          React.createElement('div', { style:{ fontSize:10, fontWeight:700, color:k.navy?'rgba(255,255,255,0.5)':'#9C948A', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4, fontFamily:'DM Sans,sans-serif' } }, k.label),
          React.createElement('div', { style:{ fontSize:24, fontWeight:800, color:k.navy?_DS.gold:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, k.value),
        )
      )
    ),

    // P&L
    React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 20px', borderBottom:'1px solid #EAE5DC', background:'#F9F8F5' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Profit & Loss — YTD 2026'),
        React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Simplified statement — Jan–Jun 2026'),
      ),
      plRows.map((r,i) => {
        const isTotal = r.type==='total' || r.type==='subtotal';
        const isNote  = r.type==='note';
        return React.createElement('div', { key:i, style:{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding: isTotal ? '14px 20px' : '10px 20px',
          borderBottom: '1px solid #F0EDE8',
          background: r.type==='total' ? '#F5F2EC' : r.type==='subtotal' ? '#F9F8F5' : '#fff',
          fontWeight: isTotal ? 700 : 400,
        } },
          React.createElement('span', { style:{ fontSize:isTotal?13:12, color:isNote?'#9C948A':_DS.navy, fontFamily:'DM Sans,sans-serif' } }, r.label),
          React.createElement('span', { style:{
            fontSize:isTotal?14:13, fontWeight:isTotal?800:600,
            color: r.amount < 0 ? '#DC2626' : r.type==='total' ? '#059669' : isNote ? '#9C948A' : _DS.navy,
            fontFamily:'DM Sans,sans-serif',
          } }, fmtM(Math.abs(r.amount)) + (r.amount < 0 ? ' (exp.)' : '')),
        );
      })
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAYROLL MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

function PayrollManagement({ setScreen }) {
  const _DS = window.DS;

  const [selectedEmp, setSelectedEmp] = React.useState(null);
  const [filterType, setFilterType]   = React.useState('All');

  const totalPayroll = _OPS_PAYROLL.reduce((a,e)=>a+e.ytdEarnings,0);
  const commBrokers  = _OPS_PAYROLL.filter(e=>e.type==='commission');
  const salaryStaff  = _OPS_PAYROLL.filter(e=>e.type==='salary');

  function fmtM(n) { return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':n>=1e3?'$'+(n/1e3).toFixed(0)+'K':'$'+n.toLocaleString(); }

  const filtered = filterType==='All' ? _OPS_PAYROLL : _OPS_PAYROLL.filter(e=>e.type===filterType);
  const sel = selectedEmp || filtered[0];

  return React.createElement('div', { style:{ display:'flex', height:'100%', background:_DS.bg, overflow:'hidden' } },

    // Left
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', padding:'20px 0 20px 24px' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', display:'flex', flexDirection:'column' } },
        // Header
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px 20px' } },
          React.createElement('div', { style:{ fontSize:11, color:_DS.gold, fontFamily:'DM Sans,sans-serif', fontWeight:700, marginBottom:4, textTransform:'uppercase', letterSpacing:'0.12em' } }, 'Payroll Management'),
          React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginTop:12 } },
            [
              ['Total Payroll YTD', fmtM(totalPayroll)],
              ['Commission Brokers', String(commBrokers.length)+' agents'],
              ['Salaried Staff', String(salaryStaff.length)+' employees'],
            ].map(([l,v]) =>
              React.createElement('div', { key:l },
                React.createElement('div', { style:{ fontSize:10, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' } }, l),
                React.createElement('div', { style:{ fontSize:18, fontWeight:800, color:'#fff', fontFamily:'DM Sans,sans-serif', marginTop:4 } }, v),
              )
            )
          ),
        ),
        // Filters
        React.createElement('div', { style:{ padding:'12px 20px', borderBottom:'1px solid #EAE5DC', display:'flex', gap:8 } },
          ['All','commission','salary'].map(t =>
            React.createElement('button', { key:t, onClick:()=>setFilterType(t), style:{
              padding:'5px 14px', borderRadius:5, border:'1px solid '+(filterType===t?_DS.gold:'#E4DDD0'),
              background:filterType===t?_DS.gold:'transparent', color:filterType===t?'#fff':_DS.navy,
              fontSize:11, fontWeight:600, cursor:'pointer', fontFamily:'DM Sans,sans-serif', textTransform:'capitalize'
            } }, t==='All'?'All':t==='commission'?'Brokers':'Staff')
          )
        ),
        // Column headers
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 120px 110px 100px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
          ['Employee','Role','Type','YTD Earnings','Next Pay','Status'].map(h =>
            React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
          )
        ),
        React.createElement('div', { style:{ overflow:'auto', flex:1 } },
          filtered.map(e =>
            React.createElement('div', { key:e.id, onClick:()=>setSelectedEmp(e),
              style:{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 120px 110px 100px', padding:'13px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center', cursor:'pointer', background:sel?.id===e.id?'#F5F2EC':'#fff' }
            },
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 } },
                React.createElement('div', { style:{ width:32, height:32, borderRadius:'50%', background:_DS.navy, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 } },
                  React.createElement('span', { style:{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, e.name.split(' ').map(n=>n[0]).join('').slice(0,2))
                ),
                React.createElement('div', null,
                  React.createElement('div', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, e.name),
                  React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:1 } }, e.payPeriod+' pay'),
                )
              ),
              React.createElement('div', { style:{ fontSize:11, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, e.role),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:e.type==='commission'?'#DBEAFE':'#F3F4F6', color:e.type==='commission'?'#1E40AF':'#6B7280', fontFamily:'DM Sans,sans-serif' } }, e.type),
              React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, fmtM(e.ytdEarnings)),
              React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, e.nextPay),
              React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:'#D1FAE5', color:'#065F46', fontFamily:'DM Sans,sans-serif' } }, e.status),
            )
          )
        ),
      ),
    ),

    // Right: employee detail
    sel && React.createElement('div', { style:{ width:300, padding:'20px 24px 20px 12px', display:'flex', flexDirection:'column' } },
      React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden', flex:1, display:'flex', flexDirection:'column' } },
        React.createElement('div', { style:{ background:_DS.navy, padding:'16px' } },
          React.createElement('div', { style:{ width:48, height:48, borderRadius:'50%', background:_DS.gold, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 } },
            React.createElement('span', { style:{ fontSize:18, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, sel.name.split(' ').map(n=>n[0]).join('').slice(0,2))
          ),
          React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif' } }, sel.name),
          React.createElement('div', { style:{ fontSize:12, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif', marginTop:4 } }, sel.role),
        ),
        React.createElement('div', { style:{ padding:'16px', overflow:'auto', flex:1 } },
          React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 } },
            [
              ['Employee ID', sel.id],
              ['Type', sel.type==='commission'?'Commission Agent':'Salaried Staff'],
              ['Compensation', sel.type==='commission' ? sel.commission : '$'+sel.base.toLocaleString()+'/mo'],
              ['YTD Earnings', fmtM(sel.ytdEarnings)],
              ['Pay Frequency', sel.payPeriod],
              ['Last Paid', sel.lastPaid],
              ['Next Payment', sel.nextPay],
              ['Status', sel.status],
            ].map(([l,v]) =>
              React.createElement('div', { key:l, style:{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #F0EDE8' } },
                React.createElement('span', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, l),
                React.createElement('span', { style:{ fontSize:12, fontWeight:600, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, v),
              )
            )
          ),
          React.createElement('button', { style:{ width:'100%', marginTop:16, padding:'10px', background:_DS.navy, color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'DM Sans,sans-serif' } }, 'Process Payment'),
        ),
      ),
    ),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BANKING ACCESS
// ═══════════════════════════════════════════════════════════════════════════════

function BankingAccess({ setScreen }) {
  const _DS = window.DS;

  const mockAccounts = [
    { id:'BAC-001', name:'FBR Operating Account', bank:'BAC Credomatic', type:'Checking', balance:284500, currency:'USD', status:'connected', lastSync:'2026-06-08 09:14', iban:'CR21 0152 0200 1026 0305 71' },
    { id:'BAC-002', name:'FBR Commissions Holding', bank:'BAC Credomatic', type:'Savings', balance:462000, currency:'USD', status:'connected', lastSync:'2026-06-08 09:14', iban:'CR21 0152 0200 1026 0305 88' },
    { id:'BAC-003', name:'FBR CRC Operating', bank:'BAC Credomatic', type:'Checking', balance:18400000, currency:'CRC', status:'connected', lastSync:'2026-06-08 09:14', iban:'CR21 0152 0200 1026 0305 99' },
  ];

  const recentTx = [
    { date:'2026-06-08', desc:'Wire — Commission FBR-409 (Casa Alegria)', amount:79800, type:'credit', account:'BAC-001' },
    { date:'2026-06-07', desc:'Google Ads — June campaign spend', amount:-12480, type:'debit', account:'BAC-001' },
    { date:'2026-06-06', desc:'Meta Ads — June campaign spend', amount:-21800, type:'debit', account:'BAC-001' },
    { date:'2026-06-05', desc:'Office rent — Flamingo, June', amount:-2800, type:'debit', account:'BAC-001' },
    { date:'2026-06-03', desc:'Transfer to Commissions Holding', amount:-88000, type:'debit', account:'BAC-001' },
    { date:'2026-06-03', desc:'Transfer from Operating', amount:88000, type:'credit', account:'BAC-002' },
  ];

  return React.createElement('div', { style:{ display:'flex', flexDirection:'column', height:'100%', background:_DS.bg, overflow:'auto', padding:'20px 24px' } },

    // BAC Disclaimer
    React.createElement('div', { style:{ background:'#FEF3C7', border:'1px solid #FDE68A', borderRadius:8, padding:'12px 16px', marginBottom:20, display:'flex', gap:8, alignItems:'flex-start' } },
      React.createElement('span', { style:{ fontSize:18, flexShrink:0 } }, 'ℹ️'),
      React.createElement('div', { style:{ fontSize:12, color:'#92400E', fontFamily:'DM Sans,sans-serif', lineHeight:1.6 } },
        React.createElement('strong', {}, 'BAC Credomatic Integration: '),
        'BAC access may be connected where approved access is available. Banking access costs and implementation requirements depend on provider conditions. Data shown below is for demonstration purposes only.'
      ),
    ),

    // Account cards
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:20 } },
      mockAccounts.map(a =>
        React.createElement('div', { key:a.id, style:{ background:'#fff', borderRadius:10, border:'1px solid #EAE5DC', overflow:'hidden' } },
          React.createElement('div', { style:{ background:_DS.navy, padding:'14px 16px' } },
            React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 } },
              React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:'DM Sans,sans-serif' } }, a.bank),
              React.createElement('span', { style:{ fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:8, background:'#D1FAE5', color:'#065F46', fontFamily:'DM Sans,sans-serif' } }, '● LIVE'),
            ),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:'DM Sans,sans-serif', marginBottom:4 } }, a.name),
            React.createElement('div', { style:{ fontSize:11, color:'rgba(255,255,255,0.4)', fontFamily:'DM Sans,sans-serif' } }, a.type + ' · ' + a.currency),
          ),
          React.createElement('div', { style:{ padding:'14px 16px' } },
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 } }, 'Available Balance'),
            React.createElement('div', { style:{ fontSize:24, fontWeight:800, color:_DS.navy, fontFamily:'DM Sans,sans-serif', marginBottom:8 } },
              a.currency==='USD' ? '$'+a.balance.toLocaleString() : '₡'+a.balance.toLocaleString()
            ),
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, 'IBAN: '+a.iban),
            React.createElement('div', { style:{ fontSize:10, color:'#9C948A', fontFamily:'DM Sans,sans-serif', marginTop:2 } }, 'Synced: '+a.lastSync),
          ),
        )
      )
    ),

    // Recent transactions
    React.createElement('div', { style:{ background:'#fff', borderRadius:8, border:'1px solid #EAE5DC', overflow:'hidden' } },
      React.createElement('div', { style:{ padding:'14px 20px', borderBottom:'1px solid #EAE5DC', background:'#F9F8F5' } },
        React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, 'Recent Transactions'),
      ),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'100px 1fr 120px 80px', padding:'8px 20px', background:'#F9F8F5', borderBottom:'1px solid #EAE5DC' } },
        ['Date','Description','Amount','Type'].map(h =>
          React.createElement('div', { key:h, style:{ fontSize:10, fontWeight:700, color:'#9C948A', textTransform:'uppercase', letterSpacing:'0.09em', fontFamily:'DM Sans,sans-serif' } }, h)
        )
      ),
      recentTx.map((tx,i) =>
        React.createElement('div', { key:i, style:{ display:'grid', gridTemplateColumns:'100px 1fr 120px 80px', padding:'12px 20px', borderBottom:'1px solid #F0EDE8', alignItems:'center' } },
          React.createElement('div', { style:{ fontSize:11, color:'#9C948A', fontFamily:'DM Sans,sans-serif' } }, tx.date),
          React.createElement('div', { style:{ fontSize:12, color:_DS.navy, fontFamily:'DM Sans,sans-serif' } }, tx.desc),
          React.createElement('div', { style:{ fontSize:13, fontWeight:700, color: tx.type==='credit'?'#059669':'#DC2626', fontFamily:'DM Sans,sans-serif' } },
            (tx.type==='credit'?'+':'') + '$' + Math.abs(tx.amount).toLocaleString()
          ),
          React.createElement('span', { style:{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:10, background:tx.type==='credit'?'#D1FAE5':'#FEE2E2', color:tx.type==='credit'?'#065F46':'#991B1B', fontFamily:'DM Sans,sans-serif' } }, tx.type),
        )
      ),
    ),
  );
}

// ── Exports ──────────────────────────────────────────────────────────────────
Object.assign(window, { FinanceManager, ElectronicInvoicing, AccountingManager, PayrollManagement, BankingAccess });
