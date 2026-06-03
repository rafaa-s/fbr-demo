// CRM Vertical Profiles — Phase 1: Shell Switcher
// Compact per-vertical overrides only. All mock data stays in fbr-data.js.

window.VERTICAL_PROFILES = {
  realEstate: {
    clientName: 'Acme Realty',
    initials: 'AR',
    vertical: 'Real Estate',
    searchPlaceholder: 'Search properties, leads…',
    operationsLabel: 'Properties',
    leadsLabel: 'Leads',
    accountsLabel: 'Accounts',
    pipelineLabel: 'Pipeline',
    
    // Catalog configuration
    catalog: {
      label: 'Properties',
      filters: ['All', 'Home', 'Condo', 'Land', 'Commercial'],
      cardType: 'property',
      specialViews: [
        { id: 'developments', label: 'Developments' },
        { id: 'offers', label: 'Active Offers' },
        { id: 'closings', label: 'Closings' }
      ]
    },
    
    // Customers configuration
    customers: {
      label: 'Buyers',
      segments: ['All', 'Hot Leads', 'Active Buyers', 'Past Clients']
    },
    aiAssistant: {
      title: 'Real Estate Assistant',
      subtitle: 'Acme Realty',
      openingMessage: 'Hi! I\'m your real estate assistant. I can help with property matching, lead insights, visit coordination, and pipeline analysis. What would you like to know?',
      inputPlaceholder: 'Ask about leads, properties, visits, or deals…',
      suggestedPrompts: [
        { label: 'Hot Buyers Ready?', prompt: 'What leads are ready for a property visit?', type: 'lead' },
        { label: 'Underperforming Listings?', prompt: 'Which properties need more ad support?', type: 'listing' },
        { label: 'Lead Intent?', prompt: 'Summarize buyer intent for Lead 001.', type: 'analysis' },
        { label: 'Today\'s Follow Up?', prompt: 'Which leads should we contact today?', type: 'action' },
        { label: 'Weak Listings?', prompt: 'Which listings are underperforming?', type: 'listing' },
      ],
      insightCards: [
        { title: 'Hot Buyers', value: '12', description: 'Leads ready for showings', priority: 'high' },
        { title: 'Visit Opportunities', value: '8', description: 'Scheduled this week', priority: 'high' },
        { title: 'Listings Needing Promo', value: '5', description: 'Low engagement in 7 days', priority: 'medium' },
        { title: 'Follow-up Risk', value: '3', description: 'No contact in 10+ days', priority: 'high' },
      ],
      exampleQuestions: [
        'What\'s my pipeline status?',
        'Which properties have the most matched leads?',
        'Show me my best performing agents.',
        'How are my listings performing this month?',
      ],
      mockResponses: [
        {
          question: 'What leads are ready for a property visit?',
          answer: 'You have 12 hot leads ready for showings. Top matches: Sarah Mitchell (Oceanview Penthouse, $3.2M budget) and James Park (Beachfront Villa, $2.8M). Both have 90+ match scores and zero recent contact.'
        },
        {
          question: 'Which listings are underperforming?',
          answer: 'AR-007 (Stone Ridge Estate) has been on market 68 days vs. 47-day average. AR-003 (Bay Heights Villa) needs CTR improvement—only 4 showings in 30 days. Recommend price adjustment or campaign boost for both.'
        },
      ],
    },
  },
  clinics: {
    clientName: 'Vita Clinic',
    initials: 'VC',
    vertical: 'Clinics',
    searchPlaceholder: 'Search patients, appointments…',
    operationsLabel: 'Appointments',
    leadsLabel: 'Patient Leads',
    accountsLabel: 'Patients',
    pipelineLabel: 'Appointment Pipeline',
    
    // Catalog configuration
    catalog: {
      label: 'Services',
      filters: ['All', 'Surgery', 'Consultation', 'Treatment', 'Diagnostics'],
      cardType: 'ops',
      specialViews: [
        { id: 'doctors', label: 'Doctor Directory' },
        { id: 'appointments', label: 'Appointments' },
        { id: 'specialties', label: 'Specialties' }
      ]
    },
    
    // Customers configuration
    customers: {
      label: 'Patients',
      segments: ['All', 'Active Patients', 'New Leads', 'Follow-up Required']
    },
    aiAssistant: {
      title: 'Clinic Assistant',
      subtitle: 'Vita Clinic',
      openingMessage: 'Hi! I\'m your clinic assistant. I can help with patient leads, appointments, doctor schedules, and treatment follow-ups. What would you like to know?',
      inputPlaceholder: 'Ask about patients, appointments, or treatments…',
      suggestedPrompts: [
        { label: 'No-Show Risk?', prompt: 'Which patients are at risk of no show?', type: 'risk' },
        { label: 'Fill Slots?', prompt: 'What appointment slots should we fill first?', type: 'opportunity' },
        { label: 'Today\'s Inquiries?', prompt: 'Summarize today\'s treatment inquiries.', type: 'analysis' },
        { label: 'Patient Follow-up?', prompt: 'Which patient leads need urgent follow up?', type: 'action' },
        { label: 'Revenue Leaders?', prompt: 'Which treatments are generating the most revenue?', type: 'analysis' },
      ],
      insightCards: [
        { title: 'No-Show Risk', value: '7', description: 'Patients 48h before appointment', priority: 'high' },
        { title: 'Open Slots', value: '14', description: 'Available this week', priority: 'high' },
        { title: 'High Intent Patients', value: '9', description: 'Confirmed treatments', priority: 'medium' },
        { title: 'Treatment Follow-up', value: '4', description: 'Post-op check-ins due', priority: 'medium' },
      ],
      exampleQuestions: [
        'Which doctors are fully booked?',
        'What\'s our appointment fill rate this week?',
        'Show me high-value treatment trends.',
        'Which specialists need more schedule availability?',
      ],
      mockResponses: [
        {
          question: 'Which patients are at risk of no show?',
          answer: 'You have 7 patients at moderate no-show risk. Sarah Mitchell (Knee Replacement, tomorrow 10:30 AM) hasn\'t confirmed. Recommend SMS reminder. Tom Brennan (Spine Eval, Friday) is 5 days out—ideal window for confirmation call.'
        },
        {
          question: 'What appointment slots should we fill first?',
          answer: 'Dr. Roberts has 3 open slots this week (highest revenue potential). Dr. Chen\'s afternoon slots (2 open) are easier to fill. Recommend prioritizing Dr. Roberts for high-value procedures like joint replacements.'
        },
      ],
    },
  },
  restaurants: {
    clientName: 'Mesa Group',
    initials: 'MG',
    vertical: 'Restaurants',
    searchPlaceholder: 'Search guests, reservations…',
    operationsLabel: 'Reservations',
    leadsLabel: 'Guest Inquiries',
    accountsLabel: 'Guests',
    pipelineLabel: 'Booking Pipeline',
    
    // Catalog configuration
    catalog: {
      label: 'Menus & Events',
      filters: ['All', 'Breakfast', 'Lunch', 'Dinner', 'Events', 'Private Dining'],
      cardType: 'ops',
      specialViews: [
        { id: 'reservations', label: 'Table Reservations' },
        { id: 'menus', label: 'Menu Management' },
        { id: 'events', label: 'Private Events' }
      ]
    },
    
    // Customers configuration
    customers: {
      label: 'Guests',
      segments: ['All', 'Regulars', 'VIP', 'Event Clients']
    },
    leadsLabel: 'Guest Leads',
    accountsLabel: 'Guests',
    pipelineLabel: 'Reservation Pipeline',
    aiAssistant: {
      title: 'Restaurant Assistant',
      subtitle: 'Mesa Group',
      openingMessage: 'Hi! I\'m your restaurant assistant. I can help with reservations, guest profiles, table management, and event bookings. What would you like to know?',
      inputPlaceholder: 'Ask about reservations, guests, or events…',
      suggestedPrompts: [
        { label: 'Confirm Reservations?', prompt: 'Which reservations need confirmation?', type: 'action' },
        { label: 'VIP Guests?', prompt: 'Which guests look like VIPs?', type: 'analysis' },
        { label: 'Fill Slow Shifts?', prompt: 'What campaign can fill slow shifts?', type: 'opportunity' },
        { label: 'Event Follow-up?', prompt: 'Which private event leads need follow up?', type: 'action' },
        { label: 'Tonight\'s Tables?', prompt: 'Which tables should we prioritize tonight?', type: 'action' },
      ],
      insightCards: [
        { title: 'Unconfirmed Reservations', value: '8', description: 'Same day and next day', priority: 'high' },
        { title: 'VIP Guests', value: '5', description: 'Large party leaders', priority: 'high' },
        { title: 'Slow Shift Opportunity', value: '3', description: 'Lunch slots available', priority: 'medium' },
        { title: 'Event Booking Risk', value: '2', description: 'No confirmation in 3+ days', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our occupancy for tonight?',
        'Show me guest patterns by day of week.',
        'Which events are driving the most revenue?',
        'How many walk-ins did we have last week?',
      ],
      mockResponses: [
        {
          question: 'Which reservations need confirmation?',
          answer: 'You have 8 unconfirmed reservations today & tomorrow. Chen Wedding (40 guests, Saturday 7 PM, $2,400) is highest priority—no confirmation in 6 hours. Johnson Party (6 guests, Saturday 8 PM) confirmed today. Recommend immediate SMS/call for Chen party.'
        },
        {
          question: 'What campaign can fill slow shifts?',
          answer: 'Lunch slots are 40% full on weekdays. Recommend: happy hour promotion (4–6 PM), lunch business meetings package, and weekend brunch campaign. Tuesday–Thursday lunch has lowest occupancy (32%). Target corporate groups with minimum party size discounts.'
        },
      ],
    },
  },
  tourism: {
    clientName: 'Pacific Escapes',
    initials: 'PE',
    vertical: 'Tourism',
    searchPlaceholder: 'Search guests, bookings…',
    operationsLabel: 'Bookings',
    leadsLabel: 'Travel Leads',
    accountsLabel: 'Guests',
    pipelineLabel: 'Booking Pipeline',
    aiAssistant: {
      title: 'Travel Assistant',
      subtitle: 'Pacific Escapes',
      openingMessage: 'Hi! I\'m your travel assistant. I can help with bookings, deposits, availability, guest journeys, and upsell opportunities. What would you like to know?',
      inputPlaceholder: 'Ask about bookings, guests, or experiences…',
      suggestedPrompts: [
        { label: 'Deposit Follow-up?', prompt: 'Which bookings need deposit follow up?', type: 'action' },
        { label: 'Upsell Ideas?', prompt: 'Suggest upsells for confirmed guests.', type: 'opportunity' },
        { label: 'Hot Leads?', prompt: 'Summarize high probability travel leads.', type: 'analysis' },
        { label: 'Availability?', prompt: 'Which experiences have available capacity?', type: 'opportunity' },
        { label: 'Guest Reminders?', prompt: 'Which guests should receive itinerary reminders?', type: 'action' },
      ],
      insightCards: [
        { title: 'Deposit Pending', value: '6', description: 'Confirmed bookings awaiting payment', priority: 'high' },
        { title: 'Upsell Opportunities', value: '9', description: 'Add-ons for booked guests', priority: 'high' },
        { title: 'High Intent Travelers', value: '11', description: 'Close to booking threshold', priority: 'medium' },
        { title: 'Low Season Availability', value: '4', description: 'Experiences with open capacity', priority: 'medium' },
      ],
      exampleQuestions: [
        'Which experiences are fully booked?',
        'Show me seasonal booking trends.',
        'What\'s our average booking value this month?',
        'Which packages have the highest guest satisfaction?',
      ],
      mockResponses: [
        {
          question: 'Which bookings need deposit follow up?',
          answer: 'You have 6 confirmed bookings awaiting deposits. Lee Group 8 (Private Island Charter, $14,800, departure Jun 12) is most urgent—deposit due in 3 days. Taylor Honeymoon ($5,600) and Garcia Family ($4,100) are also pending. Send automated reminders with 24h payment window.'
        },
        {
          question: 'Suggest upsells for confirmed guests.',
          answer: 'Williams Family (Costa Rica 7-Night, $8,400) is great for spa package ($800) and private chef upgrade ($1,200). Lee Group (charter) should be offered water sports package ($2,000/person = $14K upside). Taylor Honeymoon perfect for romantic extras. Estimated total upsell revenue: $8,500 across 6 bookings.'
        },
      ],
    },
  },
  retail: {
    clientName: 'Nova Retail',
    initials: 'NR',
    vertical: 'Retail',
    searchPlaceholder: 'Search customers, orders…',
    operationsLabel: 'Orders',
    leadsLabel: 'Customer Leads',
    accountsLabel: 'Customers',
    pipelineLabel: 'Purchase Pipeline',
    aiAssistant: {
      title: 'Retail Assistant',
      subtitle: 'Nova Retail',
      openingMessage: 'Hi! I\'m your retail assistant. I can help with customer insights, cart recovery, product performance, and repeat purchase strategies. What would you like to know?',
      inputPlaceholder: 'Ask about customers, products, or sales…',
      suggestedPrompts: [
        { label: 'Churn Risk?', prompt: 'Which customers are likely to churn?', type: 'risk' },
        { label: 'Repeat Drivers?', prompt: 'What products are driving repeat purchases?', type: 'analysis' },
        { label: 'Cart Recovery?', prompt: 'Draft abandoned cart recovery message.', type: 'action' },
        { label: 'Underperformers?', prompt: 'Which product cohorts are underperforming?', type: 'analysis' },
        { label: 'Bundle Offers?', prompt: 'Which customers should receive a bundle offer?', type: 'opportunity' },
      ],
      insightCards: [
        { title: 'Cart Recovery', value: '12', description: 'Abandoned carts over $200', priority: 'high' },
        { title: 'Churn Risk', value: '8', description: '30+ days inactive', priority: 'high' },
        { title: 'Repeat Purchase', value: '24', description: 'Ready for cross-sell', priority: 'medium' },
        { title: 'Product Opportunity', value: '5', description: 'Slow-moving SKUs', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our customer retention rate?',
        'Which product categories drive the most revenue?',
        'Show me top customer segments by lifetime value.',
        'What\'s our average order value trend?',
      ],
      mockResponses: [
        {
          question: 'Which customers are likely to churn?',
          answer: 'You have 8 high-churn-risk customers with 30+ days inactive. Lily Chen (Home Decor Set, $220 cart, 7 days abandoned) is critical—score 34. Emma Davis (Skincare, score 89) is re-engagement opportunity. Recommend: Lily gets 40% off incentive; Emma targets new product launch email.'
        },
        {
          question: 'Draft abandoned cart recovery message.',
          answer: 'Subject: "Your Skincare Favorites Still Here" / Body: "Hi Emma, we saved your Skincare Bundle ($284). Limited time: use CARTBACK15 for 15% off. Ships free over $100. Complete your order → [link]." / Timing: Send in 6 hours (highest open rate window).'
        },
      ],
    },
  },
  b2b: {
    clientName: 'Atlas Advisory',
    initials: 'AA',
    vertical: 'B2B Services',
    searchPlaceholder: 'Search accounts, proposals…',
    operationsLabel: 'Proposals',
    leadsLabel: 'Business Leads',
    accountsLabel: 'Accounts',
    pipelineLabel: 'Deal Pipeline',
    aiAssistant: {
      title: 'B2B Assistant',
      subtitle: 'Atlas Advisory',
      openingMessage: 'Hi! I\'m your B2B assistant. I can help with account intelligence, proposal management, deal risk analysis, and capacity planning. What would you like to know?',
      inputPlaceholder: 'Ask about deals, accounts, or proposals…',
      suggestedPrompts: [
        { label: 'Deal Risk?', prompt: 'Which deals are at risk?', type: 'risk' },
        { label: 'Account Intent?', prompt: 'Summarize account intent.', type: 'analysis' },
        { label: 'Discovery Questions?', prompt: 'Prepare discovery questions for this lead.', type: 'action' },
        { label: 'Proposal Follow-up?', prompt: 'Which proposals need follow up?', type: 'action' },
        { label: 'ICP Match?', prompt: 'Which accounts fit our ideal customer profile?', type: 'analysis' },
      ],
      insightCards: [
        { title: 'Deal Risk', value: '3', description: '10+ days silent', priority: 'high' },
        { title: 'Proposal Follow-up', value: '5', description: '7+ days sent', priority: 'high' },
        { title: 'High Fit Accounts', value: '7', description: 'Enterprise match potential', priority: 'medium' },
        { title: 'Capacity Pressure', value: '2', description: 'Resource constraints', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our win rate by consultant?',
        'Show me account health trends.',
        'Which markets are we strongest in?',
        'What\'s our average sales cycle length?',
      ],
      mockResponses: [
        {
          question: 'Which deals are at risk?',
          answer: 'You have 3 at-risk deals: Stellar Ventures ($180K, 11 days silent—score 38), NovaBanc ($280K, scoping delayed), TechCorp ($840K, negotiations stalled 5 days). Immediate action: Stellar Ventures needs recovery call; TechCorp needs stakeholder check-in; NovaBanc needs scope clarification.'
        },
        {
          question: 'Which accounts fit our ideal customer profile?',
          answer: 'High ICP fit: TechCorp Inc. (digital transformation, 500+ employees, $840K fit), Apex Holdings (M&A-heavy, $1.2M upside), Meridian Group (market expansion, $320K). These 3 have 94, 90, 76 match scores respectively. Recommend allocating senior consultants to these accounts.'
        },
      ],
    },
  },
  logistics: {
    clientName: 'FreightCore',
    initials: 'FC',
    vertical: 'Logistics',
    searchPlaceholder: 'Search RFQs, shipments…',
    operationsLabel: 'Shipments',
    leadsLabel: 'RFQs',
    accountsLabel: 'Accounts',
    pipelineLabel: 'Quote Pipeline',
    aiAssistant: {
      title: 'Logistics Assistant',
      subtitle: 'FreightCore',
      openingMessage: 'Hi! I\'m your logistics assistant. I can help with RFQ analysis, rate validation, shipment tracking, and lane optimization. What would you like to know?',
      inputPlaceholder: 'Ask about RFQs, shipments, or lanes…',
      suggestedPrompts: [
        { label: 'Parse RFQ?', prompt: 'Parse this RFQ.', type: 'action' },
        { label: 'Margin Risk?', prompt: 'Which lanes have margin risk?', type: 'risk' },
        { label: 'Shipment Issues?', prompt: 'Summarize shipment issues by account.', type: 'analysis' },
        { label: 'Priority Quotes?', prompt: 'Which quotes should we prioritize?', type: 'action' },
        { label: 'Rate Validation?', prompt: 'Which RFQs need rate validation?', type: 'action' },
      ],
      insightCards: [
        { title: 'Urgent RFQs', value: '12', description: 'Quote due within 24h', priority: 'high' },
        { title: 'Margin Risk', value: '4', description: 'Lane rate volatility', priority: 'high' },
        { title: 'Lane Opportunity', value: '6', description: 'New lane volume potential', priority: 'medium' },
        { title: 'Shipment Issue', value: '3', description: 'Delivery delays flagged', priority: 'medium' },
      ],
      exampleQuestions: [
        'Which lanes are most profitable?',
        'Show me RFQ-to-quote conversion rate.',
        'What are our capacity constraints?',
        'Which carriers give us the best margins?',
      ],
      mockResponses: [
        {
          question: 'Which lanes have margin risk?',
          answer: 'You have 4 lanes with margin compression: USA–Mexico (rate down 8% YoY), EU–USA air (fuel surcharge volatility), APAC–USA LCL (container rate spike 12%), USA–Canada TL (seasonal demand drop). Recommend: Mexico lane needs volume rebate renegotiation; air should hedge fuel; APAC LCL needs contract renewal.'
        },
        {
          question: 'Which quotes should we prioritize?',
          answer: 'Top priority: Pacific Imports ($210K APAC–USA, high volume potential), TradeBridge ($72K MX–USA, deadline TODAY), GlobalTrade ($84K awarded status). These 3 represent $366K in confirmed/near-confirmed revenue. Deprioritize EuroFreight ($48K) until they confirm scope.'
        },
      ],
    },
  },
  wellness: {
    clientName: 'Studio Forma',
    initials: 'SF',
    vertical: 'Wellness',
    searchPlaceholder: 'Search members, classes…',
    operationsLabel: 'Classes',
    leadsLabel: 'Member Leads',
    accountsLabel: 'Members',
    pipelineLabel: 'Trial Pipeline',
    aiAssistant: {
      title: 'Wellness Assistant',
      subtitle: 'Studio Forma',
      openingMessage: 'Hi! I\'m your wellness assistant. I can help with member retention, trial conversions, class scheduling, and attendance optimization. What would you like to know?',
      inputPlaceholder: 'Ask about members, classes, or trials…',
      suggestedPrompts: [
        { label: 'Trial Follow-up?', prompt: 'Which trial leads need follow up?', type: 'action' },
        { label: 'Cancellation Risk?', prompt: 'Which members are at cancellation risk?', type: 'risk' },
        { label: 'Class Ad Support?', prompt: 'What classes need ad support?', type: 'opportunity' },
        { label: 'Promotion Ideas?', prompt: 'Which classes should we promote this week?', type: 'opportunity' },
        { label: 'Convert Trials?', prompt: 'Which trial users are most likely to convert?', type: 'analysis' },
      ],
      insightCards: [
        { title: 'Trial Follow-up', value: '8', description: '3+ days without contact', priority: 'high' },
        { title: 'Cancellation Risk', value: '6', description: 'Low attendance trend', priority: 'high' },
        { title: 'Class Fill Gaps', value: '4', description: 'Low occupancy this week', priority: 'medium' },
        { title: 'Membership Opportunity', value: '12', description: 'Trial-to-paid conversion ready', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our member retention rate?',
        'Which instructors have the highest class ratings?',
        'Show me class popularity trends.',
        'What\'s our trial-to-member conversion rate?',
      ],
      mockResponses: [
        {
          question: 'Which trial leads need follow up?',
          answer: 'You have 8 trials needing follow-up. Rachel Kim (Annual Membership, offer pending, 5 days) is highest priority—score 90. Jake Torres (6-Month, attended 2 days ago) is strong converter. Priya Nair (Annual + PT, trial scheduled Friday) has high upside ($1,200). Recommend: call Rachel today; send PT package details to Priya; book Jake\'s membership close call.'
        },
        {
          question: 'Which classes should we promote this week?',
          answer: 'Pilates Foundations (9 AM, 12/16 capacity, 75% full) and Boxing Basics (7 PM, 8/14, 57% full) need promotion—highest ROI. Power Yoga (18/20) is nearly full; HIIT (20/20) is sold out. Recommend: email Power Yoga waitlist about other times; push social ads for Pilates/Boxing at 6 AM and 5 PM respectively.'
        },
      ],
    },
  },
  education: {
    clientName: 'BrightPath Academy',
    initials: 'BA',
    vertical: 'Education',
    searchPlaceholder: 'Search applicants, programs…',
    operationsLabel: 'Applications',
    leadsLabel: 'Applicant Leads',
    accountsLabel: 'Students',
    pipelineLabel: 'Admissions Pipeline',
    aiAssistant: {
      title: 'Admissions Assistant',
      subtitle: 'BrightPath Academy',
      openingMessage: 'Hi! I\'m your admissions assistant. I can help with application tracking, parent engagement, program capacity, and enrollment forecasting. What would you like to know?',
      inputPlaceholder: 'Ask about applicants, programs, or enrollment…',
      suggestedPrompts: [
        { label: 'Missing Documents?', prompt: 'Which applications are missing documents?', type: 'risk' },
        { label: 'Enrollment Forecast?', prompt: 'Forecast enrollment probability.', type: 'analysis' },
        { label: 'Parent Follow-up?', prompt: 'Draft parent follow up message.', type: 'action' },
        { label: 'Program Capacity?', prompt: 'Which programs have open capacity?', type: 'opportunity' },
        { label: 'Contact Today?', prompt: 'Which applicants should admissions contact today?', type: 'action' },
      ],
      insightCards: [
        { title: 'Missing Documents', value: '9', description: 'Complete by deadline', priority: 'high' },
        { title: 'Enrollment Probability', value: '34', description: 'Applicants in ready zone', priority: 'high' },
        { title: 'Open House Follow-up', value: '12', description: 'Post-visit engagement', priority: 'medium' },
        { title: 'Program Capacity', value: '5', description: 'Remaining spots', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our yield rate by program?',
        'Show me applicant sources by program.',
        'Which programs are oversubscribed?',
        'What\'s our average parent response time?',
      ],
      mockResponses: [
        {
          question: 'Which applications are missing documents?',
          answer: 'You have 9 incomplete applications. Critical: Carlos Reyes (Data Science Bootcamp, transcript + essay due 2 days) and Aisha Patel (UX Design, TOEFL scores pending). Both are strong fits. Recommend: send SMS reminder to both today; extend document deadline 3 days for international applicants.'
        },
        {
          question: 'Draft parent follow up message.',
          answer: 'Subject: "Maya—Your MBA Admission & Next Steps" / Body: "Congratulations! We\'re excited to welcome you to BrightPath MBA 2026. Please confirm enrollment by [DATE] to secure your seat. Questions? Call [ADVISOR]. Schedule deposit payment here → [LINK]." / Also include: program schedule, scholarship details, next cohort info.'
        },
      ],
    },
  },
  professional: {
    clientName: 'Lexa Partners',
    initials: 'LP',
    vertical: 'Professional Services',
    searchPlaceholder: 'Search clients, matters…',
    operationsLabel: 'Matters',
    leadsLabel: 'Client Intakes',
    accountsLabel: 'Clients',
    pipelineLabel: 'Matter Pipeline',
    aiAssistant: {
      title: 'Legal Assistant',
      subtitle: 'Lexa Partners',
      openingMessage: 'Hi! I\'m your legal assistant. I can help with intake management, conflict checks, matter fit analysis, and engagement tracking. What would you like to know?',
      inputPlaceholder: 'Ask about clients, matters, or intakes…',
      suggestedPrompts: [
        { label: 'Conflict Check?', prompt: 'Which intakes need conflict check?', type: 'risk' },
        { label: 'Matter Fit?', prompt: 'Summarize matter fit.', type: 'analysis' },
        { label: 'Document Checklist?', prompt: 'Generate document checklist.', type: 'action' },
        { label: 'Consultation Follow-up?', prompt: 'Which consultations need follow up?', type: 'action' },
        { label: 'Close Likelihood?', prompt: 'Which matters are most likely to sign?', type: 'analysis' },
      ],
      insightCards: [
        { title: 'Conflict Check Needed', value: '4', description: 'Same-day processing required', priority: 'high' },
        { title: 'Document Request', value: '6', description: 'Client documentation pending', priority: 'high' },
        { title: 'High Fit Matter', value: '8', description: 'Specialist-ready cases', priority: 'medium' },
        { title: 'Proposal Follow-up', value: '3', description: '5+ days since sent', priority: 'medium' },
      ],
      exampleQuestions: [
        'What\'s our average engagement value by practice area?',
        'Show me matter completion time trends.',
        'Which practice areas have the highest win rate?',
        'What\'s our client retention rate year-over-year?',
      ],
      mockResponses: [
        {
          question: 'Which intakes need conflict check?',
          answer: 'You have 4 pending conflict checks. New Inquiry 12 (Employment Dispute, $28K) is URGENT—intake completed 1h ago. Okafor & Sons (Commercial RE, $96K) check is in progress. Harmon Family (Estate Planning, $42K) has been pending 3 days—approve or flag today. Recommend: expedite all 4 through database by noon.'
        },
        {
          question: 'Generate document checklist.',
          answer: 'For M&A Matter (Greenfield Corp): [✓] Articles of Incorporation [✓] Cap Table [✓] Major Contracts [✓] Financial Statements [✓] IP Assignments. Missing: Board Resolutions (due tomorrow), Regulatory Approvals (due in 3 days). Send template to client with 48h deadline notice.'
        },
      ],
    },
  },
};

// Active profile — starts as Real Estate
window.ACTIVE_VP = window.VERTICAL_PROFILES.realEstate;

// Function to switch verticals and merge config
window.setActiveVertical = function(key) {
  const profile = window.VERTICAL_PROFILES[key];
  if (!profile) return;
  
  // Merge in sales config
  const salesConfig = window.VERTICAL_SALES_CONFIG?.[key];
  if (salesConfig) {
    profile.sales = salesConfig;
  }
  
  // Merge in catalog config
  const catalogConfig = window.VERTICAL_CATALOG_CONFIG?.[key];
  if (catalogConfig) {
    profile.catalog = catalogConfig;
  }
  
  window.ACTIVE_VP = profile;
  console.log('Switched to vertical:', key, window.ACTIVE_VP);
};

// Ordered list for the switcher dropdown
window.VP_LIST = [
  { key: 'realEstate',  label: 'Acme Realty',        sub: 'Real Estate' },
  { key: 'clinics',     label: 'Vita Clinic',         sub: 'Clinics' },
  { key: 'restaurants', label: 'Mesa Group',          sub: 'Restaurants' },
  { key: 'tourism',     label: 'Pacific Escapes',     sub: 'Tourism' },
  { key: 'retail',      label: 'Nova Retail',         sub: 'Retail' },
  { key: 'b2b',         label: 'Atlas Advisory',      sub: 'B2B Services' },
  { key: 'logistics',   label: 'FreightCore',         sub: 'Logistics' },
  { key: 'wellness',    label: 'Studio Forma',        sub: 'Wellness' },
  { key: 'education',   label: 'BrightPath Academy',  sub: 'Education' },
  { key: 'professional',label: 'Lexa Partners',       sub: 'Professional Services' },
];

// ─── DASHBOARD DATA (compact per-vertical overrides) ─────────────────────────
// Real Estate (Acme Realty) uses window.FBR data directly — no patch needed.

Object.assign(window.VERTICAL_PROFILES.clinics, { dashboard: {
  alertText: '5 patient leads without contact in 7+ days — no-show risk. Follow up now →',
  metrics: [
    { label:'Patient Leads',     value:'91',    sub:'14 high urgency',        icon:'⬡', screen:'omnichannel', color:null },
    { label:'Appointment Value', value:'$182K', sub:'Booked this month',      icon:'◈', color:'#C09B57' },
    { label:'Monthly Appts',     value:'148',   sub:'+22% vs last month',     icon:'↑', color:'#2B6E4A' },
    { label:'Active Doctors',    value:'12',    sub:'3 fully booked',         icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Appointment Revenue', chartTotal:'$182K',
  chartData:[{l:'Nov',v:28},{l:'Dec',v:34},{l:'Jan',v:31},{l:'Feb',v:39},{l:'Mar',v:42},{l:'Apr',v:47}],
  pipelinePreviewTitle:'Appointment Pipeline',
  pipelineDeals:[
    { id:'T1', lead:'Sarah Mitchell',  prop:'Knee Replacement',   stage:'Scheduled',  valueLabel:'$8,500',  temp:'hot' },
    { id:'T2', lead:'Mia Rodriguez',   prop:'Hip Replacement',    stage:'Triage',      valueLabel:'$24,000', temp:'hot' },
    { id:'T3', lead:'James Park',      prop:'Cardiac Screening',  stage:'Attended',    valueLabel:'$2,200',  temp:'warm' },
    { id:'T4', lead:'Tom Brennan',     prop:'Spine Evaluation',   stage:'Contacted',   valueLabel:'$3,800',  temp:'warm' },
    { id:'T5', lead:'New Inquiry 6',   prop:'Cosmetic Consult',   stage:'New Inquiry', valueLabel:'$12,000', temp:'hot' },
  ],
  featuredTitle:'Upcoming Appointments',
  featuredItems:[
    { id:'A1', title:'Knee Replacement — Sarah M.',  sub:'Dr. Roberts · Today 10:30 AM', value:'$8,500',  tag:'Urgent' },
    { id:'A2', title:'Cardiac Screening — James P.', sub:'Dr. Vega · Today 11:15 AM',    value:'$2,200',  tag:'Today' },
    { id:'A3', title:'Hip Replacement — Mia R.',     sub:'Dr. Roberts · Tomorrow 09:00', value:'$24,000', tag:'Pre-Op' },
    { id:'A4', title:'Spine Eval — Tom B.',          sub:'Dr. Chen · Tomorrow 14:00',    value:'$3,800',  tag:'Eval' },
  ],
  performanceTitle:'Doctor Performance',
  performers:[
    { name:'Dr. Roberts', avatar:'DR', color:'#C09B57', volumeLabel:'$182K', pct:100 },
    { name:'Dr. Vega',    avatar:'DV', color:'#163061', volumeLabel:'$124K', pct:68 },
    { name:'Dr. Chen',    avatar:'DC', color:'#2B6E4A', volumeLabel:'$98K',  pct:54 },
  ],
  leadPreviewTitle:'Patient Leads',
  leadPreviewItems:[
    { id:'P1', name:'Sarah Mitchell',  avatar:'SM', flag:'🇺🇸', looking:'Knee Replacement',  budget:'$8K–12K',  temp:'hot',  score:92, lastTouch:null,   status:'New — 2h ago' },
    { id:'P2', name:'James Park',      avatar:'JP', flag:'🇰🇷', looking:'Cardiac Screening', budget:'$2K–4K',   temp:'hot',  score:85, lastTouch:'Yesterday', status:'Contacted 1d' },
    { id:'P3', name:'Mia Rodriguez',   avatar:'MR', flag:'🇲🇽', looking:'Hip Replacement',   budget:'$20K–30K', temp:'warm', score:78, lastTouch:'3 days', status:'Pre-op consult' },
    { id:'P4', name:'Tom Brennan',     avatar:'TB', flag:'🇨🇦', looking:'Spine Evaluation',  budget:'$3K–6K',   temp:'warm', score:71, lastTouch:'Today',  status:'Eval scheduled' },
    { id:'P5', name:'Ana Flores',      avatar:'AF', flag:'🇪🇸', looking:'General Check-up',  budget:'$1K–3K',   temp:'cold', score:38, lastTouch:'12 days',status:'No contact 12d ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants, { dashboard: {
  alertText: '8 reservation requests unconfirmed today — risk of no-show. Review now →',
  metrics: [
    { label:'Guest Leads',       value:'124',   sub:'18 hot tonight',         icon:'⬡', screen:'omnichannel', color:null },
    { label:'Reservation Value', value:'$38K',  sub:'Booked this week',       icon:'◈', color:'#C09B57' },
    { label:'Monthly Covers',    value:'2,840', sub:'+14% vs last month',     icon:'↑', color:'#2B6E4A' },
    { label:'Active Tables',     value:'48',    sub:'12 fully booked tonight', icon:'⊟', screen:'inventory', color:null },
  ],
  chartLabel:'Monthly Cover Revenue', chartTotal:'$312K',
  chartData:[{l:'Nov',v:44},{l:'Dec',v:58},{l:'Jan',v:39},{l:'Feb',v:52},{l:'Mar',v:61},{l:'Apr',v:68}],
  pipelinePreviewTitle:'Reservation Pipeline',
  pipelineDeals:[
    { id:'R1', lead:'Johnson Party',    prop:'Table 12 — Sat 8 PM',      stage:'Confirmed',  valueLabel:'$480',  temp:'hot' },
    { id:'R2', lead:'Chen Wedding',     prop:'Private Room — Sat 7 PM',  stage:'Requested',  valueLabel:'$2,400',temp:'hot' },
    { id:'R3', lead:'Martinez Group',   prop:'Terrace — Fri 9 PM',       stage:'Confirmed',  valueLabel:'$720',  temp:'warm' },
    { id:'R4', lead:'Smith Anniversary',prop:'Table 5 — Sat 7:30 PM',   stage:'Inquiry',    valueLabel:'$360',  temp:'warm' },
    { id:'R5', lead:'Davis Corp Event', prop:'Full Buyout — Sun 12 PM',  stage:'Negotiation',valueLabel:'$8,200',temp:'hot' },
  ],
  featuredTitle:'Featured Reservations',
  featuredItems:[
    { id:'F1', title:'Chen Wedding — Private Room',    sub:'Saturday 7 PM · 40 guests', value:'$2,400', tag:'VIP' },
    { id:'F2', title:'Davis Corp — Full Buyout',       sub:'Sunday 12 PM · 80 guests',  value:'$8,200', tag:'Event' },
    { id:'F3', title:'Johnson Party — Terrace',        sub:'Saturday 8 PM · 6 guests',  value:'$480',   tag:'Tonight' },
    { id:'F4', title:'Martinez Group — Patio',         sub:'Friday 9 PM · 12 guests',   value:'$720',   tag:'Fri' },
  ],
  performanceTitle:'Shift Performance',
  performers:[
    { name:'Head Chef Marco',  avatar:'MC', color:'#C09B57', volumeLabel:'$312K', pct:100 },
    { name:'Manager Sofia',    avatar:'MS', color:'#163061', volumeLabel:'$218K', pct:70 },
    { name:'Server Team A',    avatar:'ST', color:'#2B6E4A', volumeLabel:'$164K', pct:53 },
  ],
  leadPreviewTitle:'Guest Profiles',
  leadPreviewItems:[
    { id:'G1', name:'Chen Wedding Party',    avatar:'CW', flag:'🇺🇸', looking:'Private Room · Sat 7 PM',  budget:'$2,400',  temp:'hot',  score:94, lastTouch:null,   status:'New — 1h ago' },
    { id:'G2', name:'Davis Corp Event',      avatar:'DC', flag:'🇺🇸', looking:'Full Buyout · Sun',         budget:'$8,200',  temp:'hot',  score:88, lastTouch:'Today',status:'In negotiation' },
    { id:'G3', name:'Johnson Party 6',       avatar:'JP', flag:'🇺🇸', looking:'Terrace · Sat 8 PM',        budget:'$480',    temp:'warm', score:72, lastTouch:'Today',status:'Confirmed' },
    { id:'G4', name:'Martinez Group 12',     avatar:'MG', flag:'🇲🇽', looking:'Patio · Fri 9 PM',          budget:'$720',    temp:'warm', score:68, lastTouch:'2 days',status:'Pending confirm' },
    { id:'G5', name:'Smith Anniversary',     avatar:'SA', flag:'🇨🇦', looking:'Table 5 · Sat 7:30 PM',     budget:'$360',    temp:'cold', score:41, lastTouch:'5 days',status:'No response ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.tourism, { dashboard: {
  alertText: '6 bookings awaiting deposit confirmation — revenue at risk. Review now →',
  metrics: [
    { label:'Travel Leads',       value:'78',    sub:'11 ready to book',       icon:'⬡', screen:'omnichannel', color:null },
    { label:'Booking Value',      value:'$218K', sub:'Pipeline this month',    icon:'◈', color:'#C09B57' },
    { label:'Monthly Revenue',    value:'$94K',  sub:'+31% vs last month',     icon:'↑', color:'#2B6E4A' },
    { label:'Experiences Live',   value:'24',    sub:'6 fully booked',         icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Booking Revenue', chartTotal:'$94K',
  chartData:[{l:'Nov',v:38},{l:'Dec',v:52},{l:'Jan',v:44},{l:'Feb',v:61},{l:'Mar',v:78},{l:'Apr',v:94}],
  pipelinePreviewTitle:'Booking Pipeline',
  pipelineDeals:[
    { id:'B1', lead:'Williams Family',  prop:'Costa Rica 7-Night Package',  stage:'Confirmed',     valueLabel:'$8,400',  temp:'hot' },
    { id:'B2', lead:'Anderson Couple',  prop:'Eco-Lodge Surf Retreat',      stage:'Quote Sent',    valueLabel:'$3,200',  temp:'hot' },
    { id:'B3', lead:'Lee Group 8',      prop:'Private Island Charter',      stage:'Deposit Pending',valueLabel:'$14,800', temp:'hot' },
    { id:'B4', lead:'Taylor Honeymoon', prop:'Luxury Jungle Villa',         stage:'Availability',  valueLabel:'$5,600',  temp:'warm' },
    { id:'B5', lead:'Garcia Family 5',  prop:'Adventure Package 5D',        stage:'Inquiry',       valueLabel:'$4,100',  temp:'warm' },
  ],
  featuredTitle:'Featured Bookings',
  featuredItems:[
    { id:'E1', title:'Private Island Charter — Lee Group', sub:'Jun 12–15 · 8 guests',    value:'$14,800', tag:'Deposit Due' },
    { id:'E2', title:'Costa Rica 7-Night — Williams',      sub:'Jul 4–11 · 4 guests',     value:'$8,400',  tag:'Confirmed' },
    { id:'E3', title:'Luxury Jungle Villa — Taylor',       sub:'Jun 22–26 · 2 guests',    value:'$5,600',  tag:'High Value' },
    { id:'E4', title:'Eco-Lodge Surf Retreat — Anderson',  sub:'Jul 18–22 · 2 guests',    value:'$3,200',  tag:'Quote' },
  ],
  performanceTitle:'Channel Performance',
  performers:[
    { name:'Booking.com',    avatar:'BK', color:'#003580', volumeLabel:'$48K', pct:100 },
    { name:'Direct / Web',   avatar:'DW', color:'#C09B57', volumeLabel:'$32K', pct:67 },
    { name:'Travel Agents',  avatar:'TA', color:'#2B6E4A', volumeLabel:'$14K', pct:29 },
  ],
  leadPreviewTitle:'Guest CRM',
  leadPreviewItems:[
    { id:'T1', name:'Lee Group 8',       avatar:'LG', flag:'🇺🇸', looking:'Private Island Charter',    budget:'$14,800', temp:'hot',  score:91, lastTouch:null,    status:'Deposit pending' },
    { id:'T2', name:'Williams Family',   avatar:'WF', flag:'🇨🇦', looking:'Costa Rica 7-Night',         budget:'$8,400',  temp:'hot',  score:88, lastTouch:'Today', status:'Confirmed' },
    { id:'T3', name:'Taylor Honeymoon',  avatar:'TH', flag:'🇬🇧', looking:'Luxury Jungle Villa',        budget:'$5,600',  temp:'warm', score:74, lastTouch:'2 days',status:'Availability check' },
    { id:'T4', name:'Anderson Couple',   avatar:'AC', flag:'🇺🇸', looking:'Eco-Lodge Surf Retreat',     budget:'$3,200',  temp:'warm', score:68, lastTouch:'Today', status:'Quote sent' },
    { id:'T5', name:'Garcia Family 5',   avatar:'GF', flag:'🇲🇽', looking:'Adventure Package 5D',       budget:'$4,100',  temp:'cold', score:42, lastTouch:'9 days',status:'No response ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.retail, { dashboard: {
  alertText: '12 abandoned carts over $200 in the last 48h — recovery opportunity →',
  metrics: [
    { label:'Customer Leads',  value:'342',    sub:'48 cart intent today',    icon:'⬡', screen:'omnichannel', color:null },
    { label:'Sales Value',     value:'$84K',   sub:'This month',              icon:'◈', color:'#C09B57' },
    { label:'Monthly Revenue', value:'$84K',   sub:'+19% vs last month',      icon:'↑', color:'#2B6E4A' },
    { label:'Active Products', value:'1,240',  sub:'28 low stock alerts',     icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Sales Revenue', chartTotal:'$84K',
  chartData:[{l:'Nov',v:48},{l:'Dec',v:72},{l:'Jan',v:54},{l:'Feb',v:62},{l:'Mar',v:70},{l:'Apr',v:84}],
  pipelinePreviewTitle:'Purchase Pipeline',
  pipelineDeals:[
    { id:'O1', lead:'Emma Davis',      prop:'Skincare Bundle × 3',       stage:'Cart Intent',      valueLabel:'$284',   temp:'hot' },
    { id:'O2', lead:'James Cho',       prop:'Premium Sneakers × 2',      stage:'First Purchase',   valueLabel:'$320',   temp:'hot' },
    { id:'O3', lead:'Sara Lopez',      prop:'Summer Collection × 5',     stage:'Repeat Purchase',  valueLabel:'$610',   temp:'warm' },
    { id:'O4', lead:'Mark Turner',     prop:'Tech Accessories Bundle',   stage:'Interested',       valueLabel:'$148',   temp:'warm' },
    { id:'O5', lead:'Lily Chen',       prop:'Home Decor Set',            stage:'At Risk',          valueLabel:'$220',   temp:'cold' },
  ],
  featuredTitle:'Featured Products',
  featuredItems:[
    { id:'P1', title:'Skincare Bundle — Best Seller',    sub:'Cart: 48 · Views: 2,100',   value:'$94.99', tag:'Hot' },
    { id:'P2', title:'Premium Sneakers — New Arrival',   sub:'Cart: 32 · Views: 1,840',   value:'$159.99',tag:'New' },
    { id:'P3', title:'Summer Collection Pack',           sub:'Cart: 28 · Views: 940',     value:'$122.00',tag:'Sale' },
    { id:'P4', title:'Tech Accessories Bundle',          sub:'Cart: 21 · Views: 680',     value:'$74.99', tag:'Bundle' },
  ],
  performanceTitle:'Product Performance',
  performers:[
    { name:'Skincare',   avatar:'SK', color:'#C09B57', volumeLabel:'$28K', pct:100 },
    { name:'Footwear',   avatar:'FW', color:'#163061', volumeLabel:'$22K', pct:79 },
    { name:'Apparel',    avatar:'AP', color:'#2B6E4A', volumeLabel:'$18K', pct:64 },
  ],
  leadPreviewTitle:'Customer 360',
  leadPreviewItems:[
    { id:'C1', name:'Emma Davis',    avatar:'ED', flag:'🇺🇸', looking:'Skincare Bundle × 3',   budget:'$284',  temp:'hot',  score:89, lastTouch:null,    status:'Cart — 2h ago' },
    { id:'C2', name:'James Cho',     avatar:'JC', flag:'🇺🇸', looking:'Premium Sneakers × 2',  budget:'$320',  temp:'hot',  score:84, lastTouch:'Today', status:'First purchase' },
    { id:'C3', name:'Sara Lopez',    avatar:'SL', flag:'🇲🇽', looking:'Summer Collection',     budget:'$610',  temp:'warm', score:76, lastTouch:'2 days',status:'Repeat buyer' },
    { id:'C4', name:'Mark Turner',   avatar:'MT', flag:'🇨🇦', looking:'Tech Accessories',      budget:'$148',  temp:'warm', score:61, lastTouch:'3 days',status:'Browsing' },
    { id:'C5', name:'Lily Chen',     avatar:'LC', flag:'🇺🇸', looking:'Home Decor Set',        budget:'$220',  temp:'cold', score:34, lastTouch:'7 days',status:'At risk ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.b2b, { dashboard: {
  alertText: '3 enterprise deals have gone silent for 10+ days — at-risk pipeline. Review →',
  metrics: [
    { label:'Business Leads',  value:'62',     sub:'9 enterprise-qualified',  icon:'⬡', screen:'omnichannel', color:null },
    { label:'Pipeline Value',  value:'$4.2M',  sub:'Across 14 active deals',  icon:'◈', color:'#C09B57' },
    { label:'Monthly Revenue', value:'$680K',  sub:'+24% vs last month',      icon:'↑', color:'#2B6E4A' },
    { label:'Active Proposals',value:'14',     sub:'3 in final negotiation',  icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Consulting Revenue', chartTotal:'$680K',
  chartData:[{l:'Nov',v:320},{l:'Dec',v:440},{l:'Jan',v:380},{l:'Feb',v:520},{l:'Mar',v:610},{l:'Apr',v:680}],
  pipelinePreviewTitle:'Deal Pipeline',
  pipelineDeals:[
    { id:'D1', lead:'TechCorp Inc.',    prop:'Digital Transformation',    stage:'Negotiation',  valueLabel:'$840K', temp:'hot' },
    { id:'D2', lead:'Meridian Group',   prop:'Market Entry Strategy',     stage:'Proposal',     valueLabel:'$320K', temp:'hot' },
    { id:'D3', lead:'Apex Holdings',    prop:'M&A Advisory',              stage:'Discovery',    valueLabel:'$1.2M', temp:'warm' },
    { id:'D4', lead:'NovaBanc',         prop:'Regulatory Compliance Audit',stage:'Qualified',   valueLabel:'$280K', temp:'warm' },
    { id:'D5', lead:'Stellar Ventures', prop:'Growth Strategy',           stage:'New Lead',     valueLabel:'$180K', temp:'hot' },
  ],
  featuredTitle:'Featured Proposals',
  featuredItems:[
    { id:'P1', title:'TechCorp — Digital Transformation',  sub:'Negotiation · 3 stakeholders', value:'$840K', tag:'Hot' },
    { id:'P2', title:'Apex Holdings — M&A Advisory',       sub:'Discovery · 2 meetings set',   value:'$1.2M', tag:'High Value' },
    { id:'P3', title:'Meridian — Market Entry',            sub:'Proposal sent · Awaiting sign',value:'$320K', tag:'Proposal' },
    { id:'P4', title:'NovaBanc — Compliance Audit',        sub:'Qualified · Scoping this week', value:'$280K', tag:'Scoping' },
  ],
  performanceTitle:'Consultant Performance',
  performers:[
    { name:'Alexandra Rios', avatar:'AR', color:'#C09B57', volumeLabel:'$2.1M', pct:100 },
    { name:'David Park',     avatar:'DP', color:'#163061', volumeLabel:'$1.4M', pct:67 },
    { name:'Ingrid Müller',  avatar:'IM', color:'#2B6E4A', volumeLabel:'$0.7M', pct:33 },
  ],
  leadPreviewTitle:'Accounts',
  leadPreviewItems:[
    { id:'B1', name:'TechCorp Inc.',    avatar:'TC', flag:'🇺🇸', looking:'Digital Transformation',    budget:'$840K', temp:'hot',  score:94, lastTouch:null,    status:'Negotiation' },
    { id:'B2', name:'Apex Holdings',    avatar:'AH', flag:'🇬🇧', looking:'M&A Advisory',              budget:'$1.2M', temp:'hot',  score:90, lastTouch:'Today', status:'Discovery' },
    { id:'B3', name:'Meridian Group',   avatar:'MG', flag:'🇨🇦', looking:'Market Entry Strategy',     budget:'$320K', temp:'warm', score:76, lastTouch:'2 days',status:'Proposal sent' },
    { id:'B4', name:'NovaBanc',         avatar:'NB', flag:'🇺🇸', looking:'Compliance Audit',          budget:'$280K', temp:'warm', score:70, lastTouch:'3 days',status:'Scoping' },
    { id:'B5', name:'Stellar Ventures', avatar:'SV', flag:'🇺🇸', looking:'Growth Strategy',           budget:'$180K', temp:'cold', score:38, lastTouch:'11 days',status:'Silent ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.logistics, { dashboard: {
  alertText: '4 RFQs approaching deadline without quotes — revenue at risk. Act now →',
  metrics: [
    { label:'Active RFQs',    value:'38',     sub:'12 quote deadline today', icon:'⬡', screen:'omnichannel', color:null },
    { label:'Quote Value',    value:'$2.8M',  sub:'Open pipeline',           icon:'◈', color:'#C09B57' },
    { label:'Monthly Shipments',value:'284',  sub:'+17% vs last month',      icon:'↑', color:'#2B6E4A' },
    { label:'Active Lanes',   value:'62',     sub:'8 new lanes this month',  icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Shipment Revenue', chartTotal:'$1.4M',
  chartData:[{l:'Nov',v:820},{l:'Dec',v:940},{l:'Jan',v:880},{l:'Feb',v:1100},{l:'Mar',v:1280},{l:'Apr',v:1400}],
  pipelinePreviewTitle:'Quote Pipeline',
  pipelineDeals:[
    { id:'Q1', lead:'GlobalTrade Co.',  prop:'USA–Mexico FCL × 40',      stage:'Awarded',       valueLabel:'$84K',  temp:'hot' },
    { id:'Q2', lead:'Pacific Imports',  prop:'APAC–USA LCL × 120',       stage:'Negotiation',   valueLabel:'$210K', temp:'hot' },
    { id:'Q3', lead:'EuroFreight AG',   prop:'EU–USA Air Freight',        stage:'Quote Sent',    valueLabel:'$48K',  temp:'warm' },
    { id:'Q4', lead:'AmeriCargo LLC',   prop:'USA–Canada TL × 30',        stage:'Pricing',       valueLabel:'$36K',  temp:'warm' },
    { id:'Q5', lead:'TradeBridge Inc.', prop:'MX–USA Cross-Border × 60', stage:'RFQ Received',  valueLabel:'$72K',  temp:'hot' },
  ],
  featuredTitle:'Featured Shipments',
  featuredItems:[
    { id:'S1', title:'Pacific Imports — APAC–USA LCL',   sub:'120 containers · Departs Jun 8',  value:'$210K', tag:'Negotiation' },
    { id:'S2', title:'GlobalTrade — USA–Mexico FCL',     sub:'40 containers · Awarded',         value:'$84K',  tag:'Awarded' },
    { id:'S3', title:'TradeBridge — MX–USA Border',      sub:'60 loads · RFQ deadline today',   value:'$72K',  tag:'Urgent' },
    { id:'S4', title:'EuroFreight — EU–USA Air',         sub:'Quote sent · Awaiting sign-off',  value:'$48K',  tag:'Quote' },
  ],
  performanceTitle:'Lane Performance',
  performers:[
    { name:'USA–Mexico',   avatar:'UM', color:'#C09B57', volumeLabel:'$620K', pct:100 },
    { name:'APAC–USA',     avatar:'AU', color:'#163061', volumeLabel:'$480K', pct:77 },
    { name:'EU–USA',       avatar:'EU', color:'#2B6E4A', volumeLabel:'$300K', pct:48 },
  ],
  leadPreviewTitle:'RFQs',
  leadPreviewItems:[
    { id:'L1', name:'Pacific Imports',   avatar:'PI', flag:'🇯🇵', looking:'APAC–USA LCL × 120',      budget:'$210K', temp:'hot',  score:92, lastTouch:null,    status:'Negotiation' },
    { id:'L2', name:'GlobalTrade Co.',   avatar:'GT', flag:'🇺🇸', looking:'USA–Mexico FCL × 40',      budget:'$84K',  temp:'hot',  score:88, lastTouch:'Today', status:'Awarded' },
    { id:'L3', name:'TradeBridge Inc.',  avatar:'TB', flag:'🇲🇽', looking:'MX–USA Cross-Border × 60', budget:'$72K',  temp:'hot',  score:81, lastTouch:'Today', status:'RFQ deadline today' },
    { id:'L4', name:'AmeriCargo LLC',    avatar:'AC', flag:'🇺🇸', looking:'USA–Canada TL × 30',       budget:'$36K',  temp:'warm', score:64, lastTouch:'2 days',status:'Pricing requested' },
    { id:'L5', name:'EuroFreight AG',    avatar:'EF', flag:'🇩🇪', looking:'EU–USA Air Freight',       budget:'$48K',  temp:'warm', score:58, lastTouch:'4 days',status:'Quote sent' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.wellness, { dashboard: {
  alertText: '7 trial leads haven\'t been followed up in 5+ days — cancellation risk →',
  metrics: [
    { label:'Member Leads',      value:'84',    sub:'18 trial active',         icon:'⬡', screen:'omnichannel', color:null },
    { label:'Membership Value',  value:'$28K',  sub:'New MRR this month',      icon:'◈', color:'#C09B57' },
    { label:'Monthly Revenue',   value:'$64K',  sub:'+16% vs last month',      icon:'↑', color:'#2B6E4A' },
    { label:'Active Classes',    value:'32',    sub:'8 classes full today',    icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Membership Revenue', chartTotal:'$64K',
  chartData:[{l:'Nov',v:38},{l:'Dec',v:42},{l:'Jan',v:48},{l:'Feb',v:54},{l:'Mar',v:58},{l:'Apr',v:64}],
  pipelinePreviewTitle:'Trial Pipeline',
  pipelineDeals:[
    { id:'M1', lead:'Rachel Kim',    prop:'Annual Membership',     stage:'Offer Sent',       valueLabel:'$840',  temp:'hot' },
    { id:'M2', lead:'Jake Torres',   prop:'6-Month Membership',    stage:'Trial Attended',   valueLabel:'$480',  temp:'hot' },
    { id:'M3', lead:'Priya Nair',    prop:'Annual + PT Package',   stage:'Trial Scheduled',  valueLabel:'$1,200',temp:'warm' },
    { id:'M4', lead:'Leo Santos',    prop:'Monthly Flex',          stage:'New Lead',         valueLabel:'$98',   temp:'warm' },
    { id:'M5', lead:'Anna Weber',    prop:'6-Month Membership',    stage:'At Risk',          valueLabel:'$480',  temp:'cold' },
  ],
  featuredTitle:'Featured Classes',
  featuredItems:[
    { id:'CL1', title:'Power Yoga — 7 AM',         sub:'Instructor: Maya · 18/20 spots',  value:'18 enrolled', tag:'Nearly Full' },
    { id:'CL2', title:'HIIT Circuit — 6 PM',        sub:'Instructor: Carlos · 20/20',      value:'Full',        tag:'Full' },
    { id:'CL3', title:'Pilates Foundations — 9 AM', sub:'Instructor: Leila · 12/16 spots', value:'12 enrolled', tag:'Open' },
    { id:'CL4', title:'Boxing Basics — 7 PM',       sub:'Instructor: Rafa · 8/14 spots',   value:'8 enrolled',  tag:'Open' },
  ],
  performanceTitle:'Instructor Performance',
  performers:[
    { name:'Maya (Yoga)',    avatar:'MY', color:'#C09B57', volumeLabel:'$24K', pct:100 },
    { name:'Carlos (HIIT)', avatar:'CA', color:'#163061', volumeLabel:'$20K', pct:83 },
    { name:'Leila (Pilates)',avatar:'LE', color:'#2B6E4A', volumeLabel:'$14K', pct:58 },
  ],
  leadPreviewTitle:'Member Leads',
  leadPreviewItems:[
    { id:'W1', name:'Rachel Kim',   avatar:'RK', flag:'🇺🇸', looking:'Annual Membership',    budget:'$840',  temp:'hot',  score:90, lastTouch:null,    status:'Offer pending' },
    { id:'W2', name:'Jake Torres',  avatar:'JT', flag:'🇺🇸', looking:'6-Month Membership',   budget:'$480',  temp:'hot',  score:84, lastTouch:'Today', status:'Trial attended' },
    { id:'W3', name:'Priya Nair',   avatar:'PN', flag:'🇮🇳', looking:'Annual + PT Package',  budget:'$1,200',temp:'warm', score:74, lastTouch:'2 days',status:'Trial scheduled' },
    { id:'W4', name:'Leo Santos',   avatar:'LS', flag:'🇧🇷', looking:'Monthly Flex',         budget:'$98',   temp:'warm', score:60, lastTouch:'3 days',status:'New inquiry' },
    { id:'W5', name:'Anna Weber',   avatar:'AW', flag:'🇩🇪', looking:'6-Month Membership',   budget:'$480',  temp:'cold', score:31, lastTouch:'8 days', status:'At risk ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.education, { dashboard: {
  alertText: '9 applications missing required documents — enrollment at risk →',
  metrics: [
    { label:'Student Inquiries', value:'218',   sub:'34 application started', icon:'⬡', screen:'omnichannel', color:null },
    { label:'Enrollment Value',  value:'$1.8M', sub:'Projected this cohort',  icon:'◈', color:'#C09B57' },
    { label:'Monthly Tuition',   value:'$420K', sub:'+28% vs last year',      icon:'↑', color:'#2B6E4A' },
    { label:'Active Programs',   value:'18',    sub:'3 enrollment closing',   icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Tuition Revenue', chartTotal:'$420K',
  chartData:[{l:'Nov',v:180},{l:'Dec',v:210},{l:'Jan',v:240},{l:'Feb',v:300},{l:'Mar',v:370},{l:'Apr',v:420}],
  pipelinePreviewTitle:'Admissions Pipeline',
  pipelineDeals:[
    { id:'E1', lead:'Maya Johnson',    prop:'MBA Program 2026',        stage:'Admitted',          valueLabel:'$48K', temp:'hot' },
    { id:'E2', lead:'Carlos Reyes',    prop:'Data Science Bootcamp',   stage:'Application Started',valueLabel:'$12K', temp:'hot' },
    { id:'E3', lead:'Aisha Patel',     prop:'UX Design Certificate',   stage:'Visit',             valueLabel:'$8K',  temp:'warm' },
    { id:'E4', lead:'Tom Williams',    prop:'Executive Leadership',    stage:'Contacted',          valueLabel:'$24K', temp:'warm' },
    { id:'E5', lead:'Sofia Nguyen',    prop:'Full-Stack Engineering',  stage:'Inquiry',            valueLabel:'$14K', temp:'hot' },
  ],
  featuredTitle:'Featured Programs',
  featuredItems:[
    { id:'P1', title:'MBA Program 2026',         sub:'14 enrolled · 6 spots left · Starts Sep',  value:'$48K/yr', tag:'Closing Soon' },
    { id:'P2', title:'Data Science Bootcamp',    sub:'22 enrolled · 8 spots left · Starts Jul',  value:'$12K',    tag:'Popular' },
    { id:'P3', title:'Executive Leadership',     sub:'8 enrolled · 4 spots left · Starts Oct',   value:'$24K/yr', tag:'Open' },
    { id:'P4', title:'UX Design Certificate',    sub:'18 enrolled · 2 spots left · Starts Jun',  value:'$8K',     tag:'Almost Full' },
  ],
  performanceTitle:'Program Performance',
  performers:[
    { name:'MBA Program',     avatar:'MB', color:'#C09B57', volumeLabel:'$672K', pct:100 },
    { name:'Data Science',    avatar:'DS', color:'#163061', volumeLabel:'$264K', pct:39 },
    { name:'Exec Leadership', avatar:'EL', color:'#2B6E4A', volumeLabel:'$192K', pct:29 },
  ],
  leadPreviewTitle:'Applicant Leads',
  leadPreviewItems:[
    { id:'A1', name:'Maya Johnson',   avatar:'MJ', flag:'🇺🇸', looking:'MBA Program 2026',         budget:'$48K',  temp:'hot',  score:94, lastTouch:null,    status:'Admitted — pending confirm' },
    { id:'A2', name:'Sofia Nguyen',   avatar:'SN', flag:'🇻🇳', looking:'Full-Stack Engineering',   budget:'$14K',  temp:'hot',  score:88, lastTouch:'Today', status:'Application started' },
    { id:'A3', name:'Carlos Reyes',   avatar:'CR', flag:'🇲🇽', looking:'Data Science Bootcamp',    budget:'$12K',  temp:'warm', score:76, lastTouch:'2 days',status:'Docs missing' },
    { id:'A4', name:'Tom Williams',   avatar:'TW', flag:'🇬🇧', looking:'Executive Leadership',     budget:'$24K',  temp:'warm', score:70, lastTouch:'4 days',status:'Contacted' },
    { id:'A5', name:'Aisha Patel',    avatar:'AP', flag:'🇮🇳', looking:'UX Design Certificate',    budget:'$8K',   temp:'cold', score:41, lastTouch:'10 days',status:'No response ⚠️' },
  ],
}});

Object.assign(window.VERTICAL_PROFILES.professional, { dashboard: {
  alertText: '4 new client intakes require conflict check today — do not delay →',
  metrics: [
    { label:'Client Intakes',  value:'44',    sub:'8 awaiting conflict check', icon:'⬡', screen:'omnichannel', color:null },
    { label:'Matter Value',    value:'$3.1M', sub:'Active matter pipeline',    icon:'◈', color:'#C09B57' },
    { label:'Monthly Revenue', value:'$580K', sub:'+21% vs last month',        icon:'↑', color:'#2B6E4A' },
    { label:'Active Matters',  value:'31',    sub:'6 in final phase',          icon:'⊟', screen:'inventory',   color:null },
  ],
  chartLabel:'Monthly Billable Revenue', chartTotal:'$580K',
  chartData:[{l:'Nov',v:280},{l:'Dec',v:340},{l:'Jan',v:310},{l:'Feb',v:420},{l:'Mar',v:510},{l:'Apr',v:580}],
  pipelinePreviewTitle:'Matter Pipeline',
  pipelineDeals:[
    { id:'M1', lead:'Greenfield Corp.',  prop:'M&A Acquisition — Due Diligence', stage:'Signed',       valueLabel:'$480K', temp:'hot' },
    { id:'M2', lead:'Harmon Family',     prop:'Estate Planning & Trust',          stage:'Proposal',     valueLabel:'$42K',  temp:'hot' },
    { id:'M3', lead:'Nexus Tech',        prop:'IP Portfolio Defense',             stage:'Consultation', valueLabel:'$180K', temp:'warm' },
    { id:'M4', lead:'Okafor & Sons',     prop:'Commercial Real Estate',           stage:'Conflict Check',valueLabel:'$96K', temp:'warm' },
    { id:'M5', lead:'New Inquiry 12',    prop:'Employment Dispute',               stage:'Intake',       valueLabel:'$28K',  temp:'hot' },
  ],
  featuredTitle:'Featured Matters',
  featuredItems:[
    { id:'MT1', title:'Greenfield Corp — M&A Due Diligence', sub:'Partner: Alexandra R. · Active', value:'$480K', tag:'Active' },
    { id:'MT2', title:'Nexus Tech — IP Portfolio Defense',   sub:'Partner: David P. · Discovery',  value:'$180K', tag:'Discovery' },
    { id:'MT3', title:'Okafor & Sons — Commercial RE',       sub:'Conflict check pending today',   value:'$96K',  tag:'Urgent' },
    { id:'MT4', title:'Harmon Family — Estate Planning',     sub:'Partner: Ingrid M. · Proposal',  value:'$42K',  tag:'Proposal' },
  ],
  performanceTitle:'Partner Performance',
  performers:[
    { name:'Alexandra Rios', avatar:'AR', color:'#C09B57', volumeLabel:'$2.1M', pct:100 },
    { name:'David Park',     avatar:'DP', color:'#163061', volumeLabel:'$1.4M', pct:67 },
    { name:'Ingrid Müller',  avatar:'IM', color:'#2B6E4A', volumeLabel:'$0.6M', pct:29 },
  ],
  leadPreviewTitle:'Client Intake',
  leadPreviewItems:[
    { id:'CL1', name:'Greenfield Corp.',  avatar:'GC', flag:'🇺🇸', looking:'M&A Due Diligence',      budget:'$480K', temp:'hot',  score:96, lastTouch:'Today', status:'Signed' },
    { id:'CL2', name:'New Inquiry 12',    avatar:'NI', flag:'🇺🇸', looking:'Employment Dispute',      budget:'$28K',  temp:'hot',  score:88, lastTouch:null,    status:'New intake — 1h ago' },
    { id:'CL3', name:'Nexus Tech',        avatar:'NT', flag:'🇺🇸', looking:'IP Portfolio Defense',    budget:'$180K', temp:'warm', score:78, lastTouch:'2 days',status:'Consultation' },
    { id:'CL4', name:'Okafor & Sons',     avatar:'OS', flag:'🇳🇬', looking:'Commercial Real Estate',  budget:'$96K',  temp:'warm', score:72, lastTouch:'Today', status:'Conflict check pending' },
    { id:'CL5', name:'Harmon Family',     avatar:'HF', flag:'🇨🇦', looking:'Estate Planning & Trust', budget:'$42K',  temp:'cold', score:44, lastTouch:'6 days',status:'Proposal — no response ⚠️' },
  ],
}});

// ─── OMNICHANNEL DATA ─────────────────────────────────────────────────────────

Object.assign(window.VERTICAL_PROFILES.clinics, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Patient Leads'],['pipeline','Appointment Pipeline']],
  inbox:[
    { id:'VC-1', channel:'whatsapp', lead:'Sarah Mitchell', flag:'🇺🇸', agent:'Dr. Roberts', unread:2, lastMsg:'Mock — When is Dr. Roberts free this week?', lastTime:'20m ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, I need a knee surgery consultation.', time:'09:10', channel:'whatsapp' },
        { from:'ai',    text:'Mock — Welcome! Dr. Roberts specialises in knee replacement. What date works best?', time:'09:11', channel:'ai' },
        { from:'lead',  text:'Mock — When is Dr. Roberts free this week?', time:'09:31', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — patient ready to schedule. Confirm insurance and book slot today.',
      aiDraft:'Mock — Dr. Roberts has Thursday 10:30 AM and Friday 2 PM. Which works for you?',
      profileData:{ score:92, fields:[{key:'Treatment Interest',val:'Knee Replacement'},{key:'Urgency',val:'High — 4 weeks'},{key:'Preferred Doctor',val:'Dr. Roberts'},{key:'Preferred Date',val:'This week'},{key:'Source',val:'Google Ad'}] } },
    { id:'VC-2', channel:'email', lead:'Mia Rodriguez', flag:'🇲🇽', agent:'Dr. Roberts', unread:1, lastMsg:'Mock — ¿Cuánto cuesta la cirugía de cadera?', lastTime:'Yesterday', temp:'warm', status:'active',
      messages:[
        { from:'agent', text:'Mock — Estimada Mia, adjunto información sobre el procedimiento de cadera.', time:'Apr 19 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — ¿Cuánto cuesta la cirugía de cadera?', time:'Apr 19 · 15:20', channel:'email' },
      ],
      aiSuggestion:'Mock — patient asking about cost. Send detailed quote with insurance options.',
      aiDraft:'Mock — El costo estimado es $24,000. Trabajamos con los principales seguros. ¿Quiere que agendemos una consulta gratuita?',
      profileData:{ score:78, fields:[{key:'Treatment Interest',val:'Hip Replacement'},{key:'Urgency',val:'Medium — 6 weeks'},{key:'Preferred Doctor',val:'Dr. Roberts'},{key:'Preferred Date',val:'End of May'},{key:'Source',val:'Instagram'}] } },
    { id:'VC-3', channel:'web', lead:'New Patient Inquiry', flag:'🇺🇸', agent:'Dr. Vega', unread:3, lastMsg:'Mock — Do you offer cosmetic procedures?', lastTime:'1h ago', temp:'hot', status:'new',
      messages:[
        { from:'lead', text:'Mock — Hello, I am interested in cosmetic surgery options.', time:'10:00', channel:'web' },
        { from:'ai',   text:'Mock — Welcome! We offer rhinoplasty, liposuction, and facelift procedures. What are you considering?', time:'10:01', channel:'ai' },
        { from:'lead', text:'Mock — Do you offer cosmetic procedures for face and body?', time:'10:22', channel:'web' },
      ],
      aiSuggestion:'Mock — high-value cosmetic inquiry ($12K+). Assign to Dr. Roberts and schedule consultation within 24h.',
      aiDraft:'Mock — Dr. Roberts is available for a complimentary consultation this week. Would Thursday at 2 PM work?',
      profileData:{ score:88, fields:[{key:'Treatment Interest',val:'Cosmetic Surgery'},{key:'Urgency',val:'Low — flexible'},{key:'Preferred Doctor',val:'Not specified'},{key:'Preferred Date',val:'This week'},{key:'Source',val:'Web Chat'}] } },
  ],
  recommendedMatch:{ title:'Suggested Appointments', items:[
    { title:'Dr. Roberts — Thu 10:30 AM', sub:'Orthopedic Consult · 60 min', value:'$8,500' },
    { title:'Dr. Roberts — Fri 2:00 PM',  sub:'Orthopedic Consult · 60 min', value:'$8,500' },
    { title:'Dr. Chen — Mon 9:00 AM',     sub:'Neurology Eval · 45 min',     value:'$3,800' },
  ]},
  quickActions:['📅 Suggest Appointment Slot','✅ Send Confirmation','⚠️ Mark No-Show Risk','📋 Qualify Patient','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Guest Profiles'],['pipeline','Reservation Pipeline']],
  inbox:[
    { id:'MG-1', channel:'whatsapp', lead:'Chen Wedding Party', flag:'🇺🇸', agent:'Manager Sofia', unread:2, lastMsg:'Mock — Can we add 4 more guests?', lastTime:'30m ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, we need the private room for 40 guests Saturday 7 PM.', time:'09:15', channel:'whatsapp' },
        { from:'agent', text:'Mock — The private room is available. Shall I confirm for Saturday at 7 PM?', time:'09:20', channel:'whatsapp' },
        { from:'lead',  text:'Mock — Can we add 4 more guests? Total would be 44.', time:'09:45', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — guest expanding headcount. Confirm room capacity and update quote for 44 guests.',
      aiDraft:'Mock — The private room fits up to 50 guests. I will update the reservation to 44. Shall I send the updated menu proposal?',
      profileData:{ score:94, fields:[{key:'Party Size',val:'44 guests'},{key:'Date',val:'Saturday 7 PM'},{key:'Occasion',val:'Wedding Reception'},{key:'Menu Preference',val:'Set menu requested'},{key:'Source',val:'WhatsApp direct'}] } },
    { id:'MG-2', channel:'email', lead:'Davis Corp Event', flag:'🇺🇸', agent:'Manager Sofia', unread:1, lastMsg:'Mock — What is the minimum spend for a full buyout?', lastTime:'2h ago', temp:'hot', status:'active',
      messages:[
        { from:'lead',  text:'Mock — We are interested in a full restaurant buyout for a Sunday corporate event.', time:'08:30', channel:'email' },
        { from:'agent', text:'Mock — A full buyout on Sunday seats 80 guests. Our minimum spend is $8,000.', time:'09:00', channel:'email' },
        { from:'lead',  text:'Mock — What is the minimum spend for a full buyout?', time:'10:15', channel:'email' },
      ],
      aiSuggestion:'Mock — corporate buyout $8K+ potential. Send proposal with event packages and AV options.',
      aiDraft:'Mock — Full buyout minimum is $8,000 for Sunday. This includes exclusive use, dedicated service staff, and custom menu. Shall I send the full event proposal?',
      profileData:{ score:88, fields:[{key:'Party Size',val:'~80 guests'},{key:'Date',val:'Sunday 12 PM'},{key:'Occasion',val:'Corporate Event'},{key:'Budget',val:'$8,200+'},{key:'Source',val:'Email inquiry'}] } },
    { id:'MG-3', channel:'phone', lead:'Smith Anniversary', flag:'🇨🇦', agent:'Manager Sofia', unread:0, lastMsg:'Mock — Call note: changing from 7 PM to 7:30 PM', lastTime:'Yesterday', temp:'warm', status:'active',
      messages:[
        { from:'system', text:'Mock — Incoming call · 4 min 12 sec', time:'Yesterday · 14:22', channel:'phone' },
        { from:'note',   text:'Mock — Guest requested time change from 7:00 PM to 7:30 PM. Table 5 confirmed. Occasion: 10th anniversary. Champagne service requested.', time:'Yesterday · 14:27', channel:'note' },
      ],
      aiSuggestion:'Mock — anniversary dinner. Suggest champagne and dessert upgrade upsell.',
      aiDraft:null,
      profileData:{ score:68, fields:[{key:'Party Size',val:'2 guests'},{key:'Date',val:'Saturday 7:30 PM'},{key:'Occasion',val:'10th Anniversary'},{key:'Request',val:'Champagne service'},{key:'Source',val:'Phone'}] } },
  ],
  recommendedMatch:{ title:'Suggested Tables & Packages', items:[
    { title:'Private Room — Sat 7 PM', sub:'Capacity: 50 · Chef\'s menu available', value:'$2,400 min' },
    { title:'Full Buyout — Sun 12 PM', sub:'Capacity: 80 · AV + dedicated staff', value:'$8,000 min' },
    { title:'Table 5 — Patio · Sat',   sub:'2 guests · Anniversary setup',         value:'$360 est.' },
  ]},
  quickActions:['✅ Confirm Reservation','🪑 Suggest Table','📋 Send Menu','🥂 Upsell Package','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.tourism, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Guest CRM'],['pipeline','Booking Pipeline']],
  inbox:[
    { id:'PE-1', channel:'whatsapp', lead:'Lee Group', flag:'🇺🇸', agent:'Travel Advisor Ana', unread:3, lastMsg:'Mock — We need the deposit instructions.', lastTime:'45m ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, we confirmed the private island charter for Jun 12–15.', time:'09:00', channel:'whatsapp' },
        { from:'agent', text:'Mock — Wonderful! I am preparing your booking confirmation and deposit request.', time:'09:10', channel:'whatsapp' },
        { from:'lead',  text:'Mock — We need the deposit instructions.', time:'09:48', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — guest ready to pay deposit. Send wire instructions and confirmation document immediately.',
      aiDraft:'Mock — Deposit of $4,440 (30%) due by May 20. I will send wire instructions and your official booking confirmation now.',
      profileData:{ score:94, fields:[{key:'Travel Dates',val:'Jun 12–15'},{key:'Guests',val:'8 adults'},{key:'Budget',val:'$14,800'},{key:'Experience Type',val:'Private Island Charter'},{key:'Language',val:'English'}] } },
    { id:'PE-2', channel:'email', lead:'Taylor Honeymoon', flag:'🇬🇧', agent:'Travel Advisor Ana', unread:1, lastMsg:'Mock — Is the jungle villa available June 22?', lastTime:'3h ago', temp:'warm', status:'active',
      messages:[
        { from:'lead',  text:'Mock — We are looking for a luxury villa for our honeymoon in late June.', time:'Apr 20 · 09:00', channel:'email' },
        { from:'agent', text:'Mock — Congratulations! Our Jungle Villa sleeps 2 with private pool. Available Jun 22–26.', time:'Apr 20 · 10:30', channel:'email' },
        { from:'lead',  text:'Mock — Is the jungle villa available June 22?', time:'Apr 20 · 14:00', channel:'email' },
      ],
      aiSuggestion:'Mock — honeymoon booking. Suggest romantic add-ons: sunset dinner, couple spa, champagne arrival.',
      aiDraft:'Mock — The Jungle Villa is available Jun 22–26 at $5,600. I can add a sunset dinner and couple spa package for $380. Shall I include these?',
      profileData:{ score:74, fields:[{key:'Travel Dates',val:'Jun 22–26'},{key:'Guests',val:'2 adults'},{key:'Budget',val:'$5,600'},{key:'Experience Type',val:'Luxury Honeymoon Villa'},{key:'Language',val:'English'}] } },
    { id:'PE-3', channel:'web', lead:'Garcia Family', flag:'🇲🇽', agent:'Travel Advisor Ana', unread:0, lastMsg:'Mock — ¿Qué incluye el paquete de aventura?', lastTime:'9 days ago', temp:'cold', status:'stale',
      messages:[
        { from:'lead', text:'Mock — Hola, queremos un paquete de aventura para 5 personas.', time:'May 7 · 11:00', channel:'web' },
        { from:'ai',   text:'Mock — ¡Bienvenidos! Tenemos un Adventure Pack 5D para 5 personas desde $4,100.', time:'May 7 · 11:01', channel:'ai' },
        { from:'lead', text:'Mock — ¿Qué incluye el paquete de aventura?', time:'May 7 · 11:15', channel:'web' },
      ],
      aiSuggestion:'Mock — 9 days without follow-up. Send re-engagement with detailed itinerary and limited availability notice.',
      aiDraft:'Mock — Hola, queríamos compartirte el itinerario completo del Adventure Pack 5D. ¡Solo quedan 2 cupos para junio! ¿Te interesa reservar?',
      profileData:{ score:42, fields:[{key:'Travel Dates',val:'June (flexible)'},{key:'Guests',val:'5 family'},{key:'Budget',val:'$4,100'},{key:'Experience Type',val:'Adventure Package 5D'},{key:'Language',val:'Spanish'}] } },
  ],
  recommendedMatch:{ title:'Suggested Packages', items:[
    { title:'Private Island Charter — Jun 12', sub:'8 guests · 3 nights all-inclusive',  value:'$14,800' },
    { title:'Jungle Villa Honeymoon — Jun 22', sub:'2 guests · Private pool + spa add-on',value:'$5,980' },
    { title:'Adventure Pack 5D — June',         sub:'5 guests · Rafting, zip-line, surf',  value:'$4,100' },
  ]},
  quickActions:['📄 Send Quote','💳 Request Deposit','🎁 Suggest Upsell','📅 Confirm Dates','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.retail, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Customer 360'],['pipeline','Purchase Pipeline']],
  inbox:[
    { id:'NR-1', channel:'whatsapp', lead:'Emma Davis', flag:'🇺🇸', agent:'Support Agent', unread:2, lastMsg:'Mock — Is the skincare bundle still on sale?', lastTime:'1h ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, I had 3 items in my cart and the session expired.', time:'10:00', channel:'whatsapp' },
        { from:'ai',    text:'Mock — Hi Emma! I can see your cart: Skincare Bundle × 3. Want me to restore it?', time:'10:01', channel:'ai' },
        { from:'lead',  text:'Mock — Is the skincare bundle still on sale?', time:'10:22', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — abandoned cart recovery. Bundle still available. Offer 10% discount to close.',
      aiDraft:'Mock — Great news! Your cart is saved. The Skincare Bundle is still on sale until midnight. Use code SAVE10 for an extra 10% off.',
      profileData:{ score:89, fields:[{key:'Segment',val:'Repeat Buyer'},{key:'Cart Value',val:'$284'},{key:'Product Interest',val:'Skincare Bundle × 3'},{key:'Last Purchase',val:'Feb 2026'},{key:'Source',val:'WhatsApp'}] } },
    { id:'NR-2', channel:'email', lead:'James Cho', flag:'🇺🇸', agent:'Support Agent', unread:1, lastMsg:'Mock — When will my order arrive?', lastTime:'2h ago', temp:'warm', status:'active',
      messages:[
        { from:'lead',  text:'Mock — I ordered Premium Sneakers on Monday. Has it shipped?', time:'Apr 20 · 11:00', channel:'email' },
        { from:'agent', text:'Mock — Your order shipped Tuesday. Estimated delivery: Thursday May 22.', time:'Apr 20 · 11:30', channel:'email' },
        { from:'lead',  text:'Mock — When will my order arrive?', time:'Apr 20 · 14:00', channel:'email' },
      ],
      aiSuggestion:'Mock — order tracking question. Share tracking link and suggest matching accessories upsell.',
      aiDraft:'Mock — Your Premium Sneakers arrive Thursday May 22. Tracking: [link]. Based on your purchase, you might love our matching accessories — 15% off with code MATCH15.',
      profileData:{ score:76, fields:[{key:'Segment',val:'New Buyer'},{key:'Cart Value',val:'$320'},{key:'Product Interest',val:'Premium Sneakers × 2'},{key:'Last Purchase',val:'First order'},{key:'Source',val:'Google Ad'}] } },
    { id:'NR-3', channel:'web', lead:'Lily Chen', flag:'🇺🇸', agent:'Support Agent', unread:0, lastMsg:'Mock — Are there size 8 Home Decor Sets available?', lastTime:'7 days ago', temp:'cold', status:'stale',
      messages:[
        { from:'lead', text:'Mock — Hi, I am looking at the Home Decor Set. Is it still available?', time:'May 9 · 15:00', channel:'web' },
        { from:'ai',   text:'Mock — Hi! The Home Decor Set is available in 3 colour options. Which interests you?', time:'May 9 · 15:01', channel:'ai' },
        { from:'lead', text:'Mock — Are there size 8 Home Decor Sets available?', time:'May 9 · 15:18', channel:'web' },
      ],
      aiSuggestion:'Mock — 7 days no follow-up. Customer at churn risk. Send personalised reactivation offer.',
      aiDraft:'Mock — Hi Lily! We noticed you were looking at our Home Decor Set. It is still available and we have a special 15% off offer for you this week.',
      profileData:{ score:34, fields:[{key:'Segment',val:'At Risk'},{key:'Cart Value',val:'$220'},{key:'Product Interest',val:'Home Decor Set'},{key:'Last Purchase',val:'Oct 2025'},{key:'Source',val:'Web Chat'}] } },
  ],
  recommendedMatch:{ title:'Suggested Products', items:[
    { title:'Skincare Bundle — Best Seller', sub:'Cart recovery · 10% discount available', value:'$94.99' },
    { title:'Matching Accessories Pack',     sub:'Cross-sell for sneaker purchase',       value:'$48.00' },
    { title:'Home Decor Set — Ivory',        sub:'Re-engagement offer · 15% off',         value:'$186.99' },
  ]},
  quickActions:['🛍️ Send Product Link','🛒 Send Cart Recovery','🏷️ Apply Discount','📦 Check Order Status','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.b2b, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Accounts'],['pipeline','Deal Pipeline']],
  inbox:[
    { id:'AA-1', channel:'email', lead:'TechCorp Inc.', flag:'🇺🇸', agent:'Alexandra Rios', unread:2, lastMsg:'Mock — Can you share the revised proposal by Friday?', lastTime:'1h ago', temp:'hot', status:'active',
      messages:[
        { from:'lead',  text:'Mock — We reviewed your digital transformation proposal. Strong alignment on Phase 1.', time:'Apr 20 · 09:00', channel:'email' },
        { from:'agent', text:'Mock — Excellent! I can incorporate your Phase 1 feedback and update pricing by Thursday.', time:'Apr 20 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — Can you share the revised proposal by Friday?', time:'Apr 20 · 14:30', channel:'email' },
      ],
      aiSuggestion:'Mock — deal progressing. Confirm revised proposal timeline and schedule sign-off meeting for next week.',
      aiDraft:'Mock — I will have the revised proposal to you by Friday 5 PM. I would also like to schedule a 30-minute sign-off call next Tuesday — would that work for your team?',
      profileData:{ score:94, fields:[{key:'Company',val:'TechCorp Inc.'},{key:'Need',val:'Digital Transformation'},{key:'Deal Size',val:'$840K'},{key:'Decision Maker',val:'CTO + CFO'},{key:'Timeline',val:'Q3 2026'}] } },
    { id:'AA-2', channel:'whatsapp', lead:'Stellar Ventures', flag:'🇺🇸', agent:'David Park', unread:1, lastMsg:'Mock — What industries do you specialise in?', lastTime:'Yesterday', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, we are a Series B startup looking for a growth strategy partner.', time:'Apr 19 · 16:00', channel:'whatsapp' },
        { from:'agent', text:'Mock — Great to connect! We have worked with 30+ tech startups from Series A to IPO.', time:'Apr 19 · 16:30', channel:'whatsapp' },
        { from:'lead',  text:'Mock — What industries do you specialise in?', time:'Apr 19 · 17:00', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — new high-value lead. Schedule discovery call today. Send relevant case studies.',
      aiDraft:'Mock — We specialise in tech, SaaS, and fintech growth strategy. I am sharing 2 case studies relevant to your stage. Can we schedule a discovery call this week?',
      profileData:{ score:88, fields:[{key:'Company',val:'Stellar Ventures'},{key:'Need',val:'Growth Strategy'},{key:'Deal Size',val:'$180K'},{key:'Decision Maker',val:'CEO'},{key:'Timeline',val:'Immediate'}] } },
    { id:'AA-3', channel:'email', lead:'NovaBanc', flag:'🇺🇸', agent:'Ingrid Müller', unread:0, lastMsg:'Mock — We need the compliance scope finalised this week.', lastTime:'3 days ago', temp:'warm', status:'active',
      messages:[
        { from:'agent', text:'Mock — Attached is the preliminary scope for the regulatory compliance audit.', time:'Apr 17 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — We need the compliance scope finalised this week.', time:'Apr 17 · 15:00', channel:'email' },
      ],
      aiSuggestion:'Mock — client wants scope this week. Prioritise finalising NovaBanc audit scope document.',
      aiDraft:'Mock — I will have the finalised compliance audit scope to you by Wednesday. Happy to schedule a review call Thursday to walk through it.',
      profileData:{ score:70, fields:[{key:'Company',val:'NovaBanc'},{key:'Need',val:'Regulatory Compliance Audit'},{key:'Deal Size',val:'$280K'},{key:'Decision Maker',val:'CCO'},{key:'Timeline',val:'End of May'}] } },
  ],
  recommendedMatch:{ title:'Suggested Next Steps', items:[
    { title:'Revised Proposal — TechCorp',   sub:'Phase 1 scope · Due Friday',         value:'$840K' },
    { title:'Discovery Call — Stellar',      sub:'Growth strategy · 30 min this week', value:'$180K est.' },
    { title:'Compliance Scope — NovaBanc',   sub:'Audit document · Due Wednesday',     value:'$280K' },
  ]},
  quickActions:['📅 Schedule Discovery','📄 Draft Proposal','👤 Assign Consultant','📊 Share Case Study','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.logistics, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','RFQs'],['pipeline','Quote Pipeline']],
  inbox:[
    { id:'FC-1', channel:'email', lead:'Pacific Imports', flag:'🇯🇵', agent:'Sales Rep Kevin', unread:2, lastMsg:'Mock — We need the rate confirmed by Monday.', lastTime:'2h ago', temp:'hot', status:'active',
      messages:[
        { from:'lead',  text:'Mock — Please quote APAC–USA LCL for 120 containers departing June 8.', time:'Apr 20 · 08:00', channel:'email' },
        { from:'agent', text:'Mock — Quote prepared: $1,750/container all-in. Total $210,000. Valid 5 days.', time:'Apr 20 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — We need the rate confirmed by Monday.', time:'Apr 20 · 14:30', channel:'email' },
      ],
      aiSuggestion:'Mock — client ready to award. Confirm rate validity and push for PO by Monday.',
      aiDraft:'Mock — Our rate of $1,750/container is valid until Monday 5 PM. To secure the June 8 departure, we will need the PO by Monday morning. Shall I send the booking form?',
      profileData:{ score:92, fields:[{key:'Lane',val:'APAC–USA LCL'},{key:'Volume',val:'120 containers'},{key:'Deadline',val:'Jun 8 departure'},{key:'Cargo Type',val:'General cargo'},{key:'Margin Risk',val:'Low'}] } },
    { id:'FC-2', channel:'whatsapp', lead:'TradeBridge Inc.', flag:'🇲🇽', agent:'Sales Rep Kevin', unread:3, lastMsg:'Mock — ¿Cuál es la tarifa para MX–USA este mes?', lastTime:'3h ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Buenos días, necesitamos cotización para 60 cargas MX–USA.', time:'09:00', channel:'whatsapp' },
        { from:'ai',    text:'Mock — Recibido. Para 60 cargas MX–USA TL, el tiempo de tránsito es 3–5 días. Generando cotización.', time:'09:01', channel:'ai' },
        { from:'lead',  text:'Mock — ¿Cuál es la tarifa para MX–USA este mes?', time:'09:20', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — parse this RFQ and prepare quote. Deadline today — prioritise.',
      aiDraft:'Mock — La tarifa para 60 cargas MX–USA TL este mes es $1,200/carga (all-in). Total: $72,000. ¿Confirmo?',
      profileData:{ score:81, fields:[{key:'Lane',val:'MX–USA Cross-Border TL'},{key:'Volume',val:'60 loads/month'},{key:'Deadline',val:'Today'},{key:'Cargo Type',val:'Consumer goods'},{key:'Margin Risk',val:'Medium'}] } },
    { id:'FC-3', channel:'email', lead:'EuroFreight AG', flag:'🇩🇪', agent:'Sales Rep Kevin', unread:0, lastMsg:'Mock — Waiting for your sign-off on the air freight quote.', lastTime:'4 days ago', temp:'warm', status:'active',
      messages:[
        { from:'agent', text:'Mock — Attached is the EU–USA air freight quote for your evaluation.', time:'Apr 16 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — Waiting for your sign-off on the air freight quote.', time:'Apr 16 · 16:00', channel:'email' },
      ],
      aiSuggestion:'Mock — 4 days since quote sent. Follow up to check status and confirm decision timeline.',
      aiDraft:'Mock — Following up on our EU–USA air freight quote ($48K). Is there any feedback or additional information needed to move forward?',
      profileData:{ score:58, fields:[{key:'Lane',val:'EU–USA Air Freight'},{key:'Volume',val:'8 pallets/month'},{key:'Deadline',val:'Flexible'},{key:'Cargo Type',val:'High-value electronics'},{key:'Margin Risk',val:'Low'}] } },
  ],
  recommendedMatch:{ title:'Suggested Rates', items:[
    { title:'APAC–USA LCL — $1,750/cntr', sub:'120 containers · Jun 8 departure', value:'$210K total' },
    { title:'MX–USA TL — $1,200/load',    sub:'60 loads/month · Cross-border',    value:'$72K/month' },
    { title:'EU–USA Air — $6,000/pallet', sub:'8 pallets · Transit 3 days',       value:'$48K total' },
  ]},
  quickActions:['📋 Parse RFQ','📄 Prepare Quote','📊 Check Rate Sheet','🚢 Track Shipment','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.wellness, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Member Leads'],['pipeline','Trial Pipeline']],
  inbox:[
    { id:'SF-1', channel:'whatsapp', lead:'Rachel Kim', flag:'🇺🇸', agent:'Coach Maya', unread:2, lastMsg:'Mock — When is the next Pilates trial class?', lastTime:'40m ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi! I saw your ad and want to try a Pilates class.', time:'09:30', channel:'whatsapp' },
        { from:'ai',    text:'Mock — Welcome! We have Pilates Foundations Tuesday and Thursday 9 AM. Shall I book you in?', time:'09:31', channel:'ai' },
        { from:'lead',  text:'Mock — When is the next Pilates trial class?', time:'09:48', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — trial-ready lead. Book Thursday 9 AM Pilates and send welcome package.',
      aiDraft:'Mock — The next Pilates trial is Thursday 9 AM with Instructor Leila. Only 2 spots left! Shall I reserve yours?',
      profileData:{ score:90, fields:[{key:'Goal',val:'Flexibility & core strength'},{key:'Preferred Class',val:'Pilates'},{key:'Schedule',val:'Mornings, weekdays'},{key:'Membership Status',val:'Prospect'},{key:'Attendance Pattern',val:'New'}] } },
    { id:'SF-2', channel:'email', lead:'Anna Weber', flag:'🇩🇪', agent:'Coach Carlos', unread:0, lastMsg:'Mock — I have been thinking of cancelling my membership.', lastTime:'8 days ago', temp:'cold', status:'stale',
      messages:[
        { from:'lead',  text:'Mock — Hi, I have been thinking of cancelling my membership.', time:'May 8 · 16:00', channel:'email' },
        { from:'agent', text:'Mock — Hi Anna, we would love to keep you! Can we schedule a quick call to understand your situation?', time:'May 8 · 17:00', channel:'email' },
      ],
      aiSuggestion:'Mock — cancellation risk. 8 days no response. Send personalised retention offer immediately.',
      aiDraft:'Mock — Hi Anna, we value your membership! As a gesture, we would like to offer you 2 free PT sessions and a schedule change. Can we chat this week?',
      profileData:{ score:31, fields:[{key:'Goal',val:'Weight management'},{key:'Preferred Class',val:'HIIT'},{key:'Schedule',val:'Evenings'},{key:'Membership Status',val:'At Risk — 6-month'},{key:'Attendance Pattern',val:'Declined last 6 weeks'}] } },
    { id:'SF-3', channel:'web', lead:'Priya Nair', flag:'🇮🇳', agent:'Coach Maya', unread:1, lastMsg:'Mock — I want to book a trial AND personal training.', lastTime:'2h ago', temp:'warm', status:'new',
      messages:[
        { from:'lead', text:'Mock — Hello, I am interested in yoga and maybe personal training as well.', time:'11:00', channel:'web' },
        { from:'ai',   text:'Mock — Hi! We have Power Yoga at 7 AM and a PT intro session with Coach Maya. Both available this week.', time:'11:01', channel:'ai' },
        { from:'lead', text:'Mock — I want to book a trial AND personal training.', time:'11:18', channel:'web' },
      ],
      aiSuggestion:'Mock — high-value prospect. Wants yoga trial + PT. Package them together for Annual + PT membership upsell.',
      aiDraft:'Mock — Great! I can book you for Power Yoga Thursday 7 AM and a PT intro session with Coach Maya on Friday at 10 AM. Together they qualify for our Annual + PT package at $1,200.',
      profileData:{ score:74, fields:[{key:'Goal',val:'Fitness & flexibility'},{key:'Preferred Class',val:'Yoga + PT'},{key:'Schedule',val:'Flexible'},{key:'Membership Status',val:'Prospect'},{key:'Attendance Pattern',val:'New'}] } },
  ],
  recommendedMatch:{ title:'Suggested Classes & Plans', items:[
    { title:'Pilates Foundations — Thu 9 AM', sub:'Instructor Leila · 2 spots left',         value:'Trial free' },
    { title:'Power Yoga — Tue/Thu 7 AM',      sub:'Instructor Maya · Nearly full',            value:'Trial free' },
    { title:'Annual + PT Package',            sub:'Unlimited classes + 8 PT sessions/month', value:'$1,200/yr' },
  ]},
  quickActions:['📅 Book Trial Class','📋 Send Schedule','💳 Suggest Membership','⚠️ Mark Cancellation Risk','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.education, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Applicant Leads'],['pipeline','Admissions Pipeline']],
  inbox:[
    { id:'BA-1', channel:'email', lead:'Maya Johnson', flag:'🇺🇸', agent:'Admissions Advisor Sara', unread:2, lastMsg:'Mock — Can I start the MBA in September?', lastTime:'1h ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — I was admitted to the MBA program. What are the next steps?', time:'Apr 20 · 09:00', channel:'email' },
        { from:'agent', text:'Mock — Congratulations! Please submit your enrollment deposit of $2,000 by May 30 to secure your place.', time:'Apr 20 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — Can I start the MBA in September?', time:'Apr 20 · 14:00', channel:'email' },
      ],
      aiSuggestion:'Mock — admitted student needs enrolment confirmation. Send deposit instructions and September orientation details.',
      aiDraft:'Mock — Yes! The MBA cohort starts September 8. Your enrollment deposit of $2,000 is due May 30. I am attaching the full onboarding guide.',
      profileData:{ score:94, fields:[{key:'Program Interest',val:'MBA 2026'},{key:'Grade',val:'B.Sc. Business · 3.8 GPA'},{key:'Documents',val:'Complete ✓'},{key:'Parent Contact',val:'N/A — adult student'},{key:'Enrollment Timeline',val:'September 2026'}] } },
    { id:'BA-2', channel:'whatsapp', lead:'Carlos Reyes', flag:'🇲🇽', agent:'Admissions Advisor Sara', unread:3, lastMsg:'Mock — Which documents are still missing?', lastTime:'2h ago', temp:'hot', status:'active',
      messages:[
        { from:'lead',  text:'Mock — Hola, ya envié mi solicitud al bootcamp de Data Science.', time:'09:00', channel:'whatsapp' },
        { from:'agent', text:'Mock — Hola Carlos! Recibimos tu solicitud. Nos faltan tus transcripciones y carta de motivación.', time:'09:15', channel:'whatsapp' },
        { from:'lead',  text:'Mock — Which documents are still missing?', time:'09:40', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — missing documents blocking admission. Send document checklist and deadline.',
      aiDraft:'Mock — We still need: (1) Official transcripts, (2) Motivation letter. Deadline: May 25. Documents portal: [link]. Need help with any of these?',
      profileData:{ score:76, fields:[{key:'Program Interest',val:'Data Science Bootcamp'},{key:'Grade',val:'B.Sc. Computer Science'},{key:'Documents',val:'Transcripts + letter missing'},{key:'Parent Contact',val:'N/A'},{key:'Enrollment Timeline',val:'July 2026'}] } },
    { id:'BA-3', channel:'email', lead:'Tom Williams — Parent', flag:'🇬🇧', agent:'Admissions Advisor Sara', unread:0, lastMsg:'Mock — My son is interested in the executive programme.', lastTime:'4 days ago', temp:'warm', status:'active',
      messages:[
        { from:'lead',  text:'Mock — Hello, my son is interested in the Executive Leadership programme.', time:'Apr 16 · 10:00', channel:'email' },
        { from:'agent', text:'Mock — Thank you for reaching out! The Executive Leadership programme starts October. I am attaching the brochure.', time:'Apr 16 · 11:00', channel:'email' },
      ],
      aiSuggestion:'Mock — parent inquiry 4 days old. Follow up with campus visit invitation and scholarship options.',
      aiDraft:'Mock — I wanted to follow up and invite your son to our Open Day on May 24. It is a great way to meet faculty and see the campus. Shall I reserve two spots for you both?',
      profileData:{ score:70, fields:[{key:'Program Interest',val:'Executive Leadership'},{key:'Grade',val:'M.Sc. Engineering (pending)'},{key:'Documents',val:'Not started'},{key:'Parent Contact',val:'Tom Williams Sr.'},{key:'Enrollment Timeline',val:'October 2026'}] } },
  ],
  recommendedMatch:{ title:'Suggested Programs', items:[
    { title:'MBA Program 2026 — Sep intake',     sub:'14 enrolled · 6 spots left',     value:'$48K/yr' },
    { title:'Data Science Bootcamp — Jul intake', sub:'22 enrolled · 8 spots left',     value:'$12K' },
    { title:'Executive Leadership — Oct intake',  sub:'8 enrolled · 4 spots left',      value:'$24K/yr' },
  ]},
  quickActions:['📋 Send Application Link','📄 Request Documents','🏫 Schedule Campus Visit','🎓 Share Program Guide','→ Move to Pipeline'],
}});

Object.assign(window.VERTICAL_PROFILES.professional, { omnichannel: {
  tabs:[['inbox','Inbox'],['leads','Client Intake'],['pipeline','Matter Pipeline']],
  inbox:[
    { id:'LP-1', channel:'email', lead:'Greenfield Corp.', flag:'🇺🇸', agent:'Alexandra Rios', unread:1, lastMsg:'Mock — Can we have the final due diligence report by May 28?', lastTime:'3h ago', temp:'hot', status:'active',
      messages:[
        { from:'lead',  text:'Mock — The board has approved the M&A acquisition. We need due diligence completed by month end.', time:'Apr 20 · 09:00', channel:'email' },
        { from:'agent', text:'Mock — Understood. We are on track. The due diligence team is reviewing the target\'s financials and IP assets this week.', time:'Apr 20 · 10:30', channel:'email' },
        { from:'lead',  text:'Mock — Can we have the final due diligence report by May 28?', time:'Apr 20 · 14:00', channel:'email' },
      ],
      aiSuggestion:'Mock — board approved. Confirm May 28 delivery and allocate additional resource to IP review.',
      aiDraft:'Mock — We confirm the final due diligence report will be delivered by May 28. We are assigning a dedicated IP specialist this week to meet that timeline.',
      profileData:{ score:96, fields:[{key:'Practice Area',val:'M&A / Corporate'},{key:'Matter Type',val:'Acquisition Due Diligence'},{key:'Urgency',val:'High — board approved'},{key:'Documents',val:'Target financials received'},{key:'Conflict Risk',val:'Cleared ✓'}] } },
    { id:'LP-2', channel:'whatsapp', lead:'New Client Inquiry', flag:'🇺🇸', agent:'David Park', unread:3, lastMsg:'Mock — I need an employment lawyer urgently.', lastTime:'1h ago', temp:'hot', status:'new',
      messages:[
        { from:'lead',  text:'Mock — Hi, I received a wrongful termination letter this morning.', time:'10:00', channel:'whatsapp' },
        { from:'ai',    text:'Mock — I am sorry to hear that. Our employment law team can help. Do you have the termination letter with you?', time:'10:01', channel:'ai' },
        { from:'lead',  text:'Mock — I need an employment lawyer urgently.', time:'10:15', channel:'whatsapp' },
      ],
      aiSuggestion:'Mock — urgent employment matter. Start intake immediately and run conflict check before assigning partner.',
      aiDraft:'Mock — We can help. Please send the termination letter and any related documents. I will start your intake now and a partner will contact you within 2 hours.',
      profileData:{ score:88, fields:[{key:'Practice Area',val:'Employment Law'},{key:'Matter Type',val:'Wrongful Termination'},{key:'Urgency',val:'Urgent'},{key:'Documents',val:'Termination letter — pending'},{key:'Conflict Risk',val:'Check required'}] } },
    { id:'LP-3', channel:'email', lead:'Harmon Family', flag:'🇨🇦', agent:'Ingrid Müller', unread:0, lastMsg:'Mock — We are still reviewing the estate planning proposal.', lastTime:'6 days ago', temp:'cold', status:'stale',
      messages:[
        { from:'agent', text:'Mock — Attached is the comprehensive estate planning proposal for the Harmon family trust.', time:'May 10 · 10:00', channel:'email' },
        { from:'lead',  text:'Mock — We are still reviewing the estate planning proposal.', time:'May 10 · 16:00', channel:'email' },
      ],
      aiSuggestion:'Mock — 6 days of silence. Follow up and offer a call to walk through the proposal.',
      aiDraft:'Mock — I wanted to check in on the estate planning proposal. Would a 30-minute call this week be helpful to walk through it together?',
      profileData:{ score:44, fields:[{key:'Practice Area',val:'Estate & Trust'},{key:'Matter Type',val:'Estate Planning'},{key:'Urgency',val:'Low — flexible'},{key:'Documents',val:'Proposal sent'},{key:'Conflict Risk',val:'Cleared ✓'}] } },
  ],
  recommendedMatch:{ title:'Suggested Next Steps', items:[
    { title:'Due Diligence Report — May 28',  sub:'Greenfield Corp · IP review in progress', value:'$480K' },
    { title:'Employment Intake — Urgent',      sub:'New inquiry · Conflict check required',  value:'$28K est.' },
    { title:'Estate Planning Call — This week',sub:'Harmon Family · Proposal follow-up',     value:'$42K' },
  ]},
  quickActions:['📋 Start Intake','⚖️ Run Conflict Check','📄 Request Documents','📅 Schedule Consultation','→ Move to Pipeline'],
}});

// ─── LEAD INVENTORY DATA ──────────────────────────────────────────────────────
// Helper: compact record builder
function _rec(id,name,av,fl,tp,sc,looking,budget,status,src,lt,fields,matches){
  return{id,name,avatar:av,flag:fl,temp:tp,score:sc,looking,budget,status,source:src,lastTouch:lt,lang:'',zone:'',timeline:'',use:'',country:fl,email:'',phone:'',agent:'',matched:[],fields,matches};
}

Object.assign(window.VERTICAL_PROFILES.clinics,{leadInventory:{
  title:'Patient Leads', scoreLabel:'Booking Score', matchedTitle:'Suggested Slots',
  primaryAction:'📅 Suggest Appointment Slot',
  secondaryActions:['✅ Send Confirmation','→ Move to Appointment Pipeline'],
  records:[
    _rec('P1','Sarah Mitchell','SM','🇺🇸','hot',92,'Knee Replacement','$8K–12K','New — 2h ago','Google Ad',null,
      [{key:'Treatment Interest',val:'Knee Replacement'},{key:'Urgency',val:'High — 4 weeks'},{key:'Preferred Doctor',val:'Dr. Roberts'},{key:'Preferred Date',val:'This week'},{key:'Insurance',val:'Blue Cross'},{key:'Source',val:'Google Ad'}],
      [{title:'Dr. Roberts — Thu 10:30 AM',sub:'Orthopedic Consult · 60 min',value:'$8,500'},{title:'Dr. Roberts — Fri 2:00 PM',sub:'Orthopedic Consult · 60 min',value:'$8,500'},{title:'Treatment: Knee Replace.',sub:'Ortho Dept · Surgery track',value:'$24,000'}]),
    _rec('P2','James Park','JP','🇰🇷','hot',85,'Cardiac Screening','$2K–4K','Contacted 1d','Referral','Yesterday',
      [{key:'Treatment Interest',val:'Cardiac Screening'},{key:'Urgency',val:'Medium — 2 weeks'},{key:'Preferred Doctor',val:'Dr. Vega'},{key:'Preferred Date',val:'Next week'},{key:'Insurance',val:'Aetna'},{key:'Source',val:'Referral'}],
      [{title:'Dr. Vega — Mon 11:15 AM',sub:'Cardiology · 45 min',value:'$2,200'},{title:'Dr. Vega — Wed 9:00 AM',sub:'Cardiology · 45 min',value:'$2,200'}]),
    _rec('P3','Mia Rodriguez','MR','🇲🇽','warm',78,'Hip Replacement','$20K–30K','Pre-op consult','Instagram','3 days',
      [{key:'Treatment Interest',val:'Hip Replacement'},{key:'Urgency',val:'Medium — 6 weeks'},{key:'Preferred Doctor',val:'Dr. Roberts'},{key:'Preferred Date',val:'End of May'},{key:'Insurance',val:'Self-pay'},{key:'Source',val:'Instagram'}],
      [{title:'Dr. Roberts — May 28',sub:'Hip Pre-op Consult · 90 min',value:'$24,000'},{title:'Treatment: Hip Replacement',sub:'Surgical track · Full package',value:'$32,000'}]),
    _rec('P4','Tom Brennan','TB','🇨🇦','warm',71,'Spine Evaluation','$3K–6K','Eval scheduled','Web','Today',
      [{key:'Treatment Interest',val:'Spine Evaluation'},{key:'Urgency',val:'Medium — 1 month'},{key:'Preferred Doctor',val:'Dr. Chen'},{key:'Preferred Date',val:'Tomorrow'},{key:'Insurance',val:'Sun Life'},{key:'Source',val:'Web'}],
      [{title:'Dr. Chen — Tomorrow 14:00',sub:'Neurology Eval · 45 min',value:'$3,800'},{title:'MRI Referral Package',sub:'Imaging + consult',value:'$1,200'}]),
    _rec('P5','Ana Flores','AF','🇪🇸','cold',38,'General Check-up','$1K–3K','No contact 12d ⚠️','WhatsApp','12 days',
      [{key:'Treatment Interest',val:'General Check-up'},{key:'Urgency',val:'Low — flexible'},{key:'Preferred Doctor',val:'Dr. Vega'},{key:'Preferred Date',val:'Any'},{key:'Insurance',val:'None'},{key:'Source',val:'WhatsApp'}],
      [{title:'Dr. Vega — Any slot this week',sub:'General Medicine · 30 min',value:'$950'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants,{leadInventory:{
  title:'Guest Profiles', scoreLabel:'Reservation Score', matchedTitle:'Suggested Tables',
  primaryAction:'✅ Confirm Reservation',
  secondaryActions:['🪑 Suggest Table','→ Move to Reservation Pipeline'],
  records:[
    _rec('G1','Chen Wedding Party','CW','🇺🇸','hot',94,'Private Room · 44 guests','$2,400','New — 1h ago','WhatsApp',null,
      [{key:'Party Size',val:'44 guests'},{key:'Date & Time',val:'Saturday 7 PM'},{key:'Occasion',val:'Wedding Reception'},{key:'Menu',val:'Set menu requested'},{key:'Seating',val:'Round tables'},{key:'Source',val:'WhatsApp'}],
      [{title:'Private Room A — Sat 7 PM',sub:'Capacity: 50 · Chef\'s menu',value:'$2,400 min'},{title:'Private Room B — Sat 7 PM',sub:'Capacity: 40 · Garden view',value:'$2,000 min'}]),
    _rec('G2','Davis Corp Event','DC','🇺🇸','hot',88,'Full Buyout · 80 guests','$8,200','In negotiation','Email','Today',
      [{key:'Party Size',val:'~80 guests'},{key:'Date & Time',val:'Sunday 12 PM'},{key:'Occasion',val:'Corporate Event'},{key:'Budget',val:'$8,200+'},{key:'Seating',val:'Theatre + cocktail'},{key:'Source',val:'Email'}],
      [{title:'Full Buyout — Sun 12 PM',sub:'Capacity 80 · AV + staff',value:'$8,000 min'},{title:'Event Package Gold',sub:'Full service + catering',value:'$9,500'},{title:'Private Terrace — Sun',sub:'Al fresco option · 60 guests',value:'$5,000 min'}]),
    _rec('G3','Johnson Party 6','JP','🇺🇸','warm',72,'Dinner · 6 guests','$480','Confirmed','Phone','Today',
      [{key:'Party Size',val:'6 guests'},{key:'Date & Time',val:'Saturday 8 PM'},{key:'Occasion',val:'Birthday dinner'},{key:'Seating',val:'Window table preferred'},{key:'Menu',val:'À la carte'},{key:'Source',val:'Phone'}],
      [{title:'Table 12 — Sat 8 PM',sub:'Window · 6 seats · Available',value:'$480 est.'},{title:'Table 8 — Sat 8 PM',sub:'Patio · 6 seats · Available',value:'$480 est.'}]),
    _rec('G4','Martinez Group 12','MG','🇲🇽','warm',68,'Patio · 12 guests','$720','Pending confirm','Instagram','2 days',
      [{key:'Party Size',val:'12 guests'},{key:'Date & Time',val:'Friday 9 PM'},{key:'Occasion',val:'Team celebration'},{key:'Seating',val:'Long table outdoors'},{key:'Menu',val:'Sharing plates'},{key:'Source',val:'Instagram'}],
      [{title:'Patio Long Table — Fri 9 PM',sub:'12 seats · Outdoor',value:'$720 est.'},{title:'Semi-private Terrace — Fri',sub:'16 seats · Covered patio',value:'$850 est.'}]),
    _rec('G5','Smith Anniversary','SA','🇨🇦','cold',41,'Table 5 · 2 guests','$360','No response ⚠️','Online','5 days',
      [{key:'Party Size',val:'2 guests'},{key:'Date & Time',val:'Saturday 7:30 PM'},{key:'Occasion',val:'10th Anniversary'},{key:'Request',val:'Champagne service'},{key:'Seating',val:'Table 5 — corner'},{key:'Source',val:'Online booking'}],
      [{title:'Table 5 — Sat 7:30 PM',sub:'Corner · 2 seats · Available',value:'$360 est.'},{title:'Champagne Add-on',sub:'Bottle service + dessert',value:'$120'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.tourism,{leadInventory:{
  title:'Guest CRM', scoreLabel:'Booking Score', matchedTitle:'Suggested Packages',
  primaryAction:'📄 Send Quote',
  secondaryActions:['💳 Request Deposit','→ Move to Booking Pipeline'],
  records:[
    _rec('T1','Lee Group','LG','🇺🇸','hot',94,'Private Island Charter','$14,800','Deposit pending','Direct',null,
      [{key:'Travel Dates',val:'Jun 12–15'},{key:'Guests',val:'8 adults'},{key:'Budget',val:'$14,800'},{key:'Experience',val:'Private Island Charter'},{key:'Language',val:'English'},{key:'Source',val:'Direct referral'}],
      [{title:'Private Island — Jun 12',sub:'3 nights · 8 guests all-incl.',value:'$14,800'},{title:'Yacht Add-on',sub:'Full day charter · included',value:'$1,200 upgrade'},{title:'Chef\'s Dinner Night',sub:'Beachside · included',value:'Complimentary'}]),
    _rec('T2','Williams Family','WF','🇨🇦','hot',88,'Costa Rica 7-Night','$8,400','Confirmed','Booking.com','Today',
      [{key:'Travel Dates',val:'Jul 4–11'},{key:'Guests',val:'4 (2 adults, 2 children)'},{key:'Budget',val:'$8,400'},{key:'Experience',val:'Family Beach Package'},{key:'Language',val:'English'},{key:'Source',val:'Booking.com'}],
      [{title:'Beach Villa — Jul 4–11',sub:'4 guests · Pool + beach access',value:'$8,400'},{title:'Family Adventure Add-on',sub:'Zip-line + canopy tour',value:'$480'},{title:'Airport Transfer',sub:'Round trip · 4 pax',value:'$180'}]),
    _rec('T3','Taylor Honeymoon','TH','🇬🇧','warm',74,'Luxury Jungle Villa','$5,600','Availability check','Email','2 days',
      [{key:'Travel Dates',val:'Jun 22–26'},{key:'Guests',val:'2 adults'},{key:'Budget',val:'$5,600'},{key:'Experience',val:'Luxury Honeymoon Villa'},{key:'Language',val:'English'},{key:'Source',val:'Email inquiry'}],
      [{title:'Jungle Villa — Jun 22–26',sub:'Private pool + outdoor bath',value:'$5,600'},{title:'Romantic Package Add-on',sub:'Sunset dinner + spa',value:'$380'},{title:'Couples Massage',sub:'In-villa · 90 min',value:'$240'}]),
    _rec('T4','Anderson Couple','AC','🇺🇸','warm',68,'Eco-Lodge Surf Retreat','$3,200','Quote sent','Travel Agent','Today',
      [{key:'Travel Dates',val:'Jul 18–22'},{key:'Guests',val:'2 adults'},{key:'Budget',val:'$3,200'},{key:'Experience',val:'Surf & Eco-Lodge'},{key:'Language',val:'English'},{key:'Source',val:'Travel agent'}],
      [{title:'Eco-Lodge — Jul 18–22',sub:'Surf lessons + hammock villa',value:'$3,200'},{title:'Surf Lesson Package',sub:'Daily morning · 5 days',value:'$320'}]),
    _rec('T5','Garcia Family','GF','🇲🇽','cold',42,'Adventure Pack 5D','$4,100','No response ⚠️','Web','9 days',
      [{key:'Travel Dates',val:'June (flexible)'},{key:'Guests',val:'5 family'},{key:'Budget',val:'$4,100'},{key:'Experience',val:'Adventure 5D'},{key:'Language',val:'Spanish'},{key:'Source',val:'Web chat'}],
      [{title:'Adventure Pack 5D',sub:'Rafting, zip-line, surf · 5 guests',value:'$4,100'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.retail,{leadInventory:{
  title:'Customer 360', scoreLabel:'Purchase Score', matchedTitle:'Suggested Products',
  primaryAction:'🛍️ Send Product Link',
  secondaryActions:['🛒 Send Cart Recovery','→ Move to Purchase Pipeline'],
  records:[
    _rec('C1','Emma Davis','ED','🇺🇸','hot',89,'Skincare Bundle × 3','$284','Cart — 2h ago','Instagram',null,
      [{key:'Segment',val:'Repeat Buyer'},{key:'Cart Value',val:'$284'},{key:'Product Interest',val:'Skincare Bundle × 3'},{key:'Last Purchase',val:'Feb 2026 · $148'},{key:'Channel',val:'Mobile'},{key:'Source',val:'Instagram Ad'}],
      [{title:'Skincare Bundle — 3 pack',sub:'Best seller · In stock',value:'$94.99 ea'},{title:'Vitamin C Serum Add-on',sub:'Frequently bought together',value:'$34.99'},{title:'10% Discount Code',sub:'Cart recovery offer · SAVE10',value:'-$28.40'}]),
    _rec('C2','James Cho','JC','🇺🇸','hot',84,'Premium Sneakers × 2','$320','First purchase','Google Ad','Today',
      [{key:'Segment',val:'New Buyer'},{key:'Cart Value',val:'$320'},{key:'Product Interest',val:'Premium Sneakers × 2'},{key:'Last Purchase',val:'First order'},{key:'Channel',val:'Desktop'},{key:'Source',val:'Google Ad'}],
      [{title:'Premium Sneakers — Size 10',sub:'In stock · Ships same day',value:'$159.99 ea'},{title:'Matching Accessories',sub:'Cross-sell · 15% off',value:'$48.00'},{title:'Sneaker Care Kit',sub:'Frequently bought together',value:'$24.99'}]),
    _rec('C3','Sara Lopez','SL','🇲🇽','warm',76,'Summer Collection','$610','Repeat buyer','Email','2 days',
      [{key:'Segment',val:'VIP Repeat'},{key:'Cart Value',val:'$610'},{key:'Product Interest',val:'Summer Collection × 5'},{key:'Last Purchase',val:'Apr 2026 · $340'},{key:'Channel',val:'Mobile'},{key:'Source',val:'Email newsletter'}],
      [{title:'Summer Collection Pack',sub:'5 items · New arrival',value:'$122.00'},{title:'VIP Early Access',sub:'Next drop — exclusive offer',value:'$200+ unlocks'},{title:'Loyalty Points',sub:'612 pts — redeem $61 off',value:'-$61.00'}]),
    _rec('C4','Mark Turner','MT','🇨🇦','warm',61,'Tech Accessories','$148','Browsing','Direct','3 days',
      [{key:'Segment',val:'Occasional Buyer'},{key:'Cart Value',val:'$148'},{key:'Product Interest',val:'Tech Accessories Bundle'},{key:'Last Purchase',val:'Nov 2025 · $76'},{key:'Channel',val:'Desktop'},{key:'Source',val:'Direct traffic'}],
      [{title:'Tech Bundle — 4 items',sub:'USB hub, cable, stand, pad',value:'$74.99'},{title:'Bundle Discount',sub:'Save 15% on 4+ accessories',value:'-$22.50'}]),
    _rec('C5','Lily Chen','LC','🇺🇸','cold',34,'Home Decor Set','$220','At risk ⚠️','Web','7 days',
      [{key:'Segment',val:'At Risk'},{key:'Cart Value',val:'$220'},{key:'Product Interest',val:'Home Decor Set'},{key:'Last Purchase',val:'Oct 2025 · $186'},{key:'Channel',val:'Mobile'},{key:'Source',val:'Web chat'}],
      [{title:'Home Decor Set — Ivory',sub:'Re-engagement · 15% off',value:'$186.99'},{title:'Win-back Offer',sub:'15% off + free shipping',value:'WINBACK15'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.b2b,{leadInventory:{
  title:'Accounts', scoreLabel:'Account Fit Score', matchedTitle:'Suggested Proposals',
  primaryAction:'📅 Schedule Discovery',
  secondaryActions:['📄 Draft Proposal','→ Move to Deal Pipeline'],
  records:[
    _rec('B1','TechCorp Inc.','TC','🇺🇸','hot',94,'Digital Transformation','$840K','Negotiation','Referral','Today',
      [{key:'Company',val:'TechCorp Inc. — SaaS'},{key:'Need',val:'Digital Transformation'},{key:'Deal Size',val:'$840K'},{key:'Decision Maker',val:'CTO + CFO'},{key:'Timeline',val:'Q3 2026'},{key:'Source',val:'Referral'}],
      [{title:'Phase 1 Proposal — Revised',sub:'Digital transformation · Due Fri',value:'$840K'},{title:'Executive Workshop',sub:'Stakeholder alignment · 2 days',value:'$48K included'},{title:'Change Mgmt Add-on',sub:'Optional · Phase 2 scope',value:'$120K'}]),
    _rec('B2','Apex Holdings','AH','🇬🇧','hot',90,'M&A Advisory','$1.2M','Discovery','Direct',null,
      [{key:'Company',val:'Apex Holdings — Private Equity'},{key:'Need',val:'M&A Due Diligence'},{key:'Deal Size',val:'$1.2M'},{key:'Decision Maker',val:'Managing Partner'},{key:'Timeline',val:'Q2 2026'},{key:'Source',val:'Direct outreach'}],
      [{title:'M&A Advisory Proposal',sub:'Due diligence + integration',value:'$1.2M'},{title:'DD Fast Track',sub:'60-day compressed timeline',value:'$1.4M variant'},{title:'Integration Planning',sub:'Post-merger · Optional add-on',value:'$280K'}]),
    _rec('B3','Meridian Group','MG','🇨🇦','warm',76,'Market Entry Strategy','$320K','Proposal sent','Conference','2 days',
      [{key:'Company',val:'Meridian Group — Consulting'},{key:'Need',val:'Market Entry Strategy'},{key:'Deal Size',val:'$320K'},{key:'Decision Maker',val:'CEO'},{key:'Timeline',val:'Q3 2026'},{key:'Source',val:'Industry conference'}],
      [{title:'Market Entry Proposal',sub:'LATAM expansion strategy',value:'$320K'},{title:'Competitive Analysis Add-on',sub:'Optional research module',value:'$48K'}]),
    _rec('B4','NovaBanc','NB','🇺🇸','warm',70,'Compliance Audit','$280K','Scoping','Inbound','3 days',
      [{key:'Company',val:'NovaBanc — Financial Services'},{key:'Need',val:'Regulatory Compliance Audit'},{key:'Deal Size',val:'$280K'},{key:'Decision Maker',val:'CCO'},{key:'Timeline',val:'End of May'},{key:'Source',val:'Inbound web'}],
      [{title:'Compliance Audit Scope',sub:'Full regulatory review · Due Wed',value:'$280K'},{title:'Remediation Planning',sub:'Post-audit optional add-on',value:'$96K'}]),
    _rec('B5','Stellar Ventures','SV','🇺🇸','cold',38,'Growth Strategy','$180K','Silent ⚠️','WhatsApp','11 days',
      [{key:'Company',val:'Stellar Ventures — Series B'},{key:'Need',val:'Growth Strategy'},{key:'Deal Size',val:'$180K'},{key:'Decision Maker',val:'CEO'},{key:'Timeline',val:'Immediate'},{key:'Source',val:'WhatsApp inbound'}],
      [{title:'Growth Strategy Proposal',sub:'Series B acceleration track',value:'$180K'},{title:'2 Relevant Case Studies',sub:'SaaS growth · B2B fintech',value:'Send now'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.logistics,{leadInventory:{
  title:'RFQs', scoreLabel:'Quote Priority Score', matchedTitle:'Suggested Rates',
  primaryAction:'📋 Parse RFQ',
  secondaryActions:['📄 Prepare Quote','→ Move to Quote Pipeline'],
  records:[
    _rec('Q1','Pacific Imports','PI','🇯🇵','hot',92,'APAC–USA LCL × 120 containers','$210K','Negotiation','Email',null,
      [{key:'Lane',val:'APAC–USA LCL'},{key:'Volume',val:'120 containers'},{key:'Deadline',val:'Jun 8 departure'},{key:'Cargo Type',val:'General cargo'},{key:'Margin Risk',val:'Low'},{key:'Source',val:'Email RFQ'}],
      [{title:'LCL Rate — $1,750/cntr',sub:'APAC–USA · All-in · Valid 5d',value:'$210,000 total'},{title:'FCL Option',sub:'Better rate at 40+ cntr',value:'$1,620/cntr'},{title:'Priority Loading',sub:'Jun 8 guaranteed departure',value:'+$80/cntr'}]),
    _rec('Q2','TradeBridge Inc.','TB','🇲🇽','hot',81,'MX–USA TL × 60 loads','$72K','RFQ deadline today','WhatsApp',null,
      [{key:'Lane',val:'MX–USA Cross-Border TL'},{key:'Volume',val:'60 loads/month'},{key:'Deadline',val:'Today — urgent'},{key:'Cargo Type',val:'Consumer goods'},{key:'Margin Risk',val:'Medium'},{key:'Source',val:'WhatsApp RFQ'}],
      [{title:'TL Rate — $1,200/load',sub:'MX–USA · 3–5 day transit',value:'$72,000/month'},{title:'Dedicated Lane Contract',sub:'12-month · Rate lock guarantee',value:'$1,150/load'},{title:'Spot Rate — This Week',sub:'Available capacity · Jun loads',value:'$1,180/load'}]),
    _rec('Q3','GlobalTrade Co.','GT','🇺🇸','hot',88,'USA–Mexico FCL × 40','$84K','Awarded','Direct','Today',
      [{key:'Lane',val:'USA–Mexico FCL'},{key:'Volume',val:'40 containers'},{key:'Deadline',val:'Awarded — booking'},{key:'Cargo Type',val:'Manufacturing parts'},{key:'Margin Risk',val:'Low'},{key:'Source',val:'Direct account'}],
      [{title:'FCL Rate — Confirmed',sub:'USA–MX · 40 containers booked',value:'$84,000'},{title:'Return Load Option',sub:'MX–USA back-haul discount',value:'-8% on return'}]),
    _rec('Q4','AmeriCargo LLC','AC','🇺🇸','warm',64,'USA–Canada TL × 30','$36K','Pricing requested','Inbound','2 days',
      [{key:'Lane',val:'USA–Canada TL'},{key:'Volume',val:'30 loads/month'},{key:'Deadline',val:'Quote by Fri'},{key:'Cargo Type',val:'Retail goods'},{key:'Margin Risk',val:'Medium'},{key:'Source',val:'Inbound inquiry'}],
      [{title:'TL Rate — $1,200/load',sub:'USA–CA · 2–3 day transit',value:'$36,000/month'},{title:'LTL Option',sub:'If volume drops below 30',value:'$850/load'}]),
    _rec('Q5','EuroFreight AG','EF','🇩🇪','warm',58,'EU–USA Air Freight','$48K','Quote sent','Email','4 days',
      [{key:'Lane',val:'EU–USA Air Freight'},{key:'Volume',val:'8 pallets/month'},{key:'Deadline',val:'Quote under review'},{key:'Cargo Type',val:'High-value electronics'},{key:'Margin Risk',val:'Low'},{key:'Source',val:'Email RFQ'}],
      [{title:'Air Rate — $6,000/pallet',sub:'EU–USA · 3-day transit · Secure',value:'$48,000/month'},{title:'Ocean + Air Hybrid',sub:'Lower cost for non-urgent',value:'$3,200/pallet'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.wellness,{leadInventory:{
  title:'Member Leads', scoreLabel:'Membership Score', matchedTitle:'Suggested Classes',
  primaryAction:'📅 Book Trial Class',
  secondaryActions:['📋 Send Schedule','→ Move to Trial Pipeline'],
  records:[
    _rec('M1','Rachel Kim','RK','🇺🇸','hot',90,'Annual Membership','$840','Offer pending','Instagram',null,
      [{key:'Goal',val:'Flexibility & core strength'},{key:'Preferred Class',val:'Pilates'},{key:'Schedule',val:'Mornings, weekdays'},{key:'Membership Status',val:'Trial completed'},{key:'Attendance',val:'Attended 3/3 trials'},{key:'Source',val:'Instagram Ad'}],
      [{title:'Annual Membership',sub:'Unlimited classes · Best value',value:'$840/yr'},{title:'Pilates Foundations',sub:'Mon/Wed/Fri 9 AM · Leila',value:'3 spots left'},{title:'Annual + PT Bundle',sub:'8 PT sessions included',value:'$1,200/yr'}]),
    _rec('M2','Jake Torres','JT','🇺🇸','hot',84,'6-Month Membership','$480','Trial attended','Google Ad','Today',
      [{key:'Goal',val:'Build muscle, lose weight'},{key:'Preferred Class',val:'HIIT Circuit'},{key:'Schedule',val:'Evenings, Mon–Thu'},{key:'Membership Status',val:'Trial attended x1'},{key:'Attendance',val:'1 trial — positive'},{key:'Source',val:'Google Ad'}],
      [{title:'6-Month Membership',sub:'Unlimited classes',value:'$480'},{title:'HIIT Circuit — 6 PM',sub:'Carlos · 20/20 — waitlist',value:'Join waitlist'},{title:'Annual Upgrade',sub:'Save $120 vs monthly',value:'$840/yr'}]),
    _rec('M3','Priya Nair','PN','🇮🇳','warm',74,'Annual + PT Package','$1,200','Trial scheduled','Web','2 days',
      [{key:'Goal',val:'Fitness & flexibility'},{key:'Preferred Class',val:'Yoga + Personal Training'},{key:'Schedule',val:'Flexible'},{key:'Membership Status',val:'Prospect'},{key:'Attendance',val:'Trial booked — Thu'},{key:'Source',val:'Web chat'}],
      [{title:'Annual + PT Package',sub:'Unlimited + 8 PT/month',value:'$1,200/yr'},{title:'Power Yoga — Thu 7 AM',sub:'Maya · 18/20 spots',value:'Trial'},{title:'PT Intro — Fri 10 AM',sub:'Coach Maya · 60 min',value:'Free with package'}]),
    _rec('M4','Leo Santos','LS','🇧🇷','warm',60,'Monthly Flex','$98','New inquiry','Referral','3 days',
      [{key:'Goal',val:'General fitness'},{key:'Preferred Class',val:'Any'},{key:'Schedule',val:'Flexible — evenings'},{key:'Membership Status',val:'Prospect'},{key:'Attendance',val:'Not booked yet'},{key:'Source',val:'Member referral'}],
      [{title:'Monthly Flex',sub:'10 classes/month',value:'$98/mo'},{title:'Intro Class Trial',sub:'Any class this week · Free',value:'Free'},{title:'6-Month Membership',sub:'Best value vs monthly',value:'$480'}]),
    _rec('M5','Anna Weber','AW','🇩🇪','cold',31,'6-Month Membership','$480','At risk ⚠️','Email','8 days',
      [{key:'Goal',val:'Weight management'},{key:'Preferred Class',val:'HIIT'},{key:'Schedule',val:'Evenings'},{key:'Membership Status',val:'Active — at risk'},{key:'Attendance',val:'Declined 6 weeks'},{key:'Source',val:'Email nurture'}],
      [{title:'Retention Offer — 2 Free PT',sub:'Win-back · 2 PT sessions free',value:'$0'},{title:'HIIT Circuit — 6 PM',sub:'Return to regular class',value:'Included'},{title:'Schedule Change',sub:'Try Pilates — 9 AM slot open',value:'Included'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.education,{leadInventory:{
  title:'Applicant Leads', scoreLabel:'Enrollment Score', matchedTitle:'Suggested Programs',
  primaryAction:'📋 Send Application Link',
  secondaryActions:['📄 Request Documents','→ Move to Admissions Pipeline'],
  records:[
    _rec('A1','Maya Johnson','MJ','🇺🇸','hot',94,'MBA Program 2026','$48K/yr','Admitted — pending confirm','Direct',null,
      [{key:'Program Interest',val:'MBA 2026 — Full-time'},{key:'Grade',val:'B.Sc. Business · 3.8 GPA'},{key:'Documents',val:'Complete ✓'},{key:'Parent Contact',val:'N/A — adult student'},{key:'Enrollment Timeline',val:'Sep 2026'},{key:'Source',val:'Direct application'}],
      [{title:'MBA Program 2026 — Sep',sub:'14 enrolled · 6 spots left',value:'$48K/yr'},{title:'Enrollment Deposit',sub:'$2,000 due May 30',value:'Required'},{title:'Scholarship Options',sub:'Merit-based · Up to 30%',value:'Apply now'}]),
    _rec('A2','Sofia Nguyen','SN','🇻🇳','hot',88,'Full-Stack Engineering','$14K','Application started','Social','Today',
      [{key:'Program Interest',val:'Full-Stack Engineering'},{key:'Grade',val:'B.Sc. Computer Science'},{key:'Documents',val:'App in progress'},{key:'Parent Contact',val:'N/A'},{key:'Enrollment Timeline',val:'Jul 2026'},{key:'Source',val:'Social media'}],
      [{title:'Full-Stack Engineering — Jul',sub:'18 enrolled · 6 spots left',value:'$14K'},{title:'Scholarship Assessment',sub:'Need-based · 20% avg award',value:'Apply'},{title:'Part-time Option',sub:'Same curriculum · 18 months',value:'$14K'}]),
    _rec('A3','Carlos Reyes','CR','🇲🇽','warm',76,'Data Science Bootcamp','$12K','Docs missing','WhatsApp','2 days',
      [{key:'Program Interest',val:'Data Science Bootcamp'},{key:'Grade',val:'B.Sc. CS — in progress'},{key:'Documents',val:'Transcripts + letter missing'},{key:'Parent Contact',val:'N/A'},{key:'Enrollment Timeline',val:'Jul 2026'},{key:'Source',val:'WhatsApp inquiry'}],
      [{title:'Data Science Bootcamp — Jul',sub:'22 enrolled · 8 spots left',value:'$12K'},{title:'Document Checklist',sub:'2 items outstanding · Due May 25',value:'Send now'},{title:'English Bootcamp Add-on',sub:'Optional technical writing',value:'$800'}]),
    _rec('A4','Tom Williams — Parent','TW','🇬🇧','warm',70,'Executive Leadership','$24K/yr','Contacted','Email','4 days',
      [{key:'Program Interest',val:'Executive Leadership — Oct'},{key:'Grade',val:'M.Sc. Engineering (son)'},{key:'Documents',val:'Not started'},{key:'Parent Contact',val:'Tom Williams Sr.'},{key:'Enrollment Timeline',val:'Oct 2026'},{key:'Source',val:'Email inquiry'}],
      [{title:'Executive Leadership — Oct',sub:'8 enrolled · 4 spots left',value:'$24K/yr'},{title:'Open Day Invitation',sub:'May 24 · Campus tour + faculty',value:'Free'},{title:'Part-time Executive Track',sub:'Weekends only option',value:'$24K/yr'}]),
    _rec('A5','Aisha Patel','AP','🇮🇳','cold',41,'UX Design Certificate','$8K','No response ⚠️','Google Ad','10 days',
      [{key:'Program Interest',val:'UX Design Certificate'},{key:'Grade',val:'B.A. Arts'},{key:'Documents',val:'Not submitted'},{key:'Parent Contact',val:'N/A'},{key:'Enrollment Timeline',val:'Jun 2026'},{key:'Source',val:'Google Ad'}],
      [{title:'UX Design Certificate — Jun',sub:'18 enrolled · 2 spots left',value:'$8K'},{title:'Re-engagement Email',sub:'Send now — closes May 28',value:'Urgent'}]),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.professional,{leadInventory:{
  title:'Client Intake', scoreLabel:'Matter Fit Score', matchedTitle:'Suggested Next Steps',
  primaryAction:'📋 Start Intake',
  secondaryActions:['⚖️ Run Conflict Check','→ Move to Matter Pipeline'],
  records:[
    _rec('I1','Greenfield Corp.','GC','🇺🇸','hot',96,'M&A Due Diligence','$480K','Signed','Referral','Today',
      [{key:'Practice Area',val:'M&A / Corporate'},{key:'Matter Type',val:'Acquisition Due Diligence'},{key:'Urgency',val:'High — board approved'},{key:'Documents',val:'Target financials received'},{key:'Conflict Risk',val:'Cleared ✓'},{key:'Source',val:'Partner referral'}],
      [{title:'Due Diligence Report',sub:'Due May 28 · IP review in progress',value:'$480K'},{title:'Integration Planning',sub:'Post-acquisition · Phase 2',value:'$120K add-on'},{title:'Regulatory Filing Support',sub:'Optional · SEC / EU reqs',value:'$80K add-on'}]),
    _rec('I2','New Employment Inquiry','NI','🇺🇸','hot',88,'Wrongful Termination','$28K est.','New — 1h ago','WhatsApp',null,
      [{key:'Practice Area',val:'Employment Law'},{key:'Matter Type',val:'Wrongful Termination'},{key:'Urgency',val:'Urgent — letter received today'},{key:'Documents',val:'Termination letter — pending'},{key:'Conflict Risk',val:'Check required'},{key:'Source',val:'WhatsApp inbound'}],
      [{title:'Start Employment Intake',sub:'Conflict check first · Same day',value:'$28K est.'},{title:'Document Checklist',sub:'Termination letter, contract, comms',value:'Request now'},{title:'Partner: David Park',sub:'Employment specialist · Available',value:'Assign'}]),
    _rec('I3','Nexus Tech','NT','🇺🇸','warm',78,'IP Portfolio Defense','$180K','Consultation','Direct','2 days',
      [{key:'Practice Area',val:'Intellectual Property'},{key:'Matter Type',val:'IP Portfolio Defense'},{key:'Urgency',val:'Medium — litigation threat'},{key:'Documents',val:'Patent portfolio received'},{key:'Conflict Risk',val:'Cleared ✓'},{key:'Source',val:'Direct inquiry'}],
      [{title:'IP Defense Strategy',sub:'Portfolio audit + litigation plan',value:'$180K'},{title:'Cease & Desist Letter',sub:'Immediate action · Phase 1',value:'$12K included'},{title:'Patent Valuation Report',sub:'Optional add-on',value:'$28K'}]),
    _rec('I4','Okafor & Sons','OS','🇳🇬','warm',72,'Commercial Real Estate','$96K','Conflict check pending','Inbound','Today',
      [{key:'Practice Area',val:'Commercial Real Estate'},{key:'Matter Type',val:'Lease Negotiation'},{key:'Urgency',val:'Medium — lease expires Jul'},{key:'Documents',val:'Draft lease received'},{key:'Conflict Risk',val:'Check pending'},{key:'Source',val:'Inbound web'}],
      [{title:'Run Conflict Check',sub:'Required before engagement',value:'Today'},{title:'Lease Review',sub:'Commercial lease · 3 properties',value:'$96K'},{title:'Partner: Alexandra Rios',sub:'RE specialist · Available',value:'Assign'}]),
    _rec('I5','Harmon Family','HF','🇨🇦','cold',44,'Estate Planning & Trust','$42K','No response ⚠️','Referral','6 days',
      [{key:'Practice Area',val:'Estate & Trust'},{key:'Matter Type',val:'Estate Planning'},{key:'Urgency',val:'Low — flexible'},{key:'Documents',val:'Proposal sent — no response'},{key:'Conflict Risk',val:'Cleared ✓'},{key:'Source',val:'Client referral'}],
      [{title:'Follow-up Call',sub:'Walk through proposal together',value:'30 min'},{title:'Estate Planning Package',sub:'Trust + will + healthcare directive',value:'$42K'},{title:'Simplified Option',sub:'Will only · If budget concern',value:'$8K'}]),
  ],
}});

// ─── PIPELINE DATA ────────────────────────────────────────────────────────────
// Helper: compact deal builder
function _deal(id,lead,prop,stage,value,valueLabel,temp,days,agent,meta,nextAction){
  return{id,lead,prop,stage,value,valueLabel,temp,days,agent,meta,nextAction};
}

Object.assign(window.VERTICAL_PROFILES.clinics,{pipeline:{
  title:'Appointment Pipeline',
  stages:['New Inquiry','Contacted','Triage','Scheduled','Attended','Treatment Plan'],
  deals:[
    _deal('VC-D1','Sarah Mitchell','Knee Replacement','Triage',8500,'$8,500','hot',2,'Dr. Roberts','Urgency: High · Insurance: Blue Cross','Confirm insurance coverage and book appointment slot this week.'),
    _deal('VC-D2','New Inquiry 6','Cosmetic Surgery','New Inquiry',12000,'$12,000','hot',0,'Dr. Roberts','Source: Web chat · Interest: Rhinoplasty','Assign to Dr. Roberts and schedule consultation within 24h.'),
    _deal('VC-D3','James Park','Cardiac Screening','Attended',2200,'$2,200','warm',1,'Dr. Vega','Results: Pending · Follow-up: Friday','Send results and schedule cardiology follow-up appointment.'),
    _deal('VC-D4','Mia Rodriguez','Hip Replacement','Scheduled',24000,'$24,000','hot',5,'Dr. Roberts','Pre-op: May 28 · Insurance: Self-pay','Confirm pre-op checklist and coordinate with OR scheduling.'),
    _deal('VC-D5','Tom Brennan','Spine Evaluation','Contacted',3800,'$3,800','warm',3,'Dr. Chen','Referral: Physiotherapist · Eval: Tomorrow','Send appointment confirmation and pre-eval questionnaire.'),
    _deal('VC-D6','Ana Flores','General Check-up','New Inquiry',950,'$950','cold',12,'Dr. Vega','Last contact: 12 days ago · Risk: No-show','Re-engage immediately. Send availability for this week.'),
    _deal('VC-D7','Marcus Lee','Ortho Consultation','Treatment Plan',18000,'$18,000','warm',8,'Dr. Roberts','Post-eval · Treatment plan approved','Send formal treatment plan and payment options.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants,{pipeline:{
  title:'Reservation Pipeline',
  stages:['Inquiry','Reservation Requested','Confirmed','Visited','Feedback','Repeat'],
  deals:[
    _deal('MG-D1','Chen Wedding Party','Private Room Sat 7 PM','Reservation Requested',2400,'$2,400','hot',0,'Manager Sofia','44 guests · Set menu · Champagne service','Confirm room capacity for 44 and send updated quote.'),
    _deal('MG-D2','Davis Corp Event','Full Buyout Sun 12 PM','Inquiry',8200,'$8,200','hot',1,'Manager Sofia','~80 guests · AV required · Budget: $8K+','Send full event proposal with AV packages today.'),
    _deal('MG-D3','Johnson Party 6','Table 12 Sat 8 PM','Confirmed',480,'$480','warm',0,'Manager Sofia','6 guests · Birthday · Window table','Send confirmation and assign window table 12.'),
    _deal('MG-D4','Martinez Group 12','Patio Long Table Fri','Reservation Requested',720,'$720','warm',2,'Manager Sofia','12 guests · Sharing plates · Outdoor','Follow up on confirmation — 2 days pending.'),
    _deal('MG-D5','Smith Anniversary','Table 5 Sat 7:30 PM','Confirmation',360,'$360','cold',5,'Manager Sofia','2 guests · 10th anniversary · Champagne','No response in 5 days. Re-engage with availability.'),
    _deal('MG-D6','Lopez Family 8','Terrace Sun Brunch','Visited',640,'$640','warm',3,'Manager Sofia','8 guests · First visit · High tip','Send post-visit thank you and loyalty offer.'),
    _deal('MG-D7','Park Reservation','Regular Friday Table','Repeat',280,'$280','warm',7,'Manager Sofia','4 guests · Regular weekly guest','Confirm regular Friday 8 PM booking for next week.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.tourism,{pipeline:{
  title:'Booking Pipeline',
  stages:['Inquiry','Availability Checked','Quote Sent','Booking Pending','Confirmed','Operated'],
  deals:[
    _deal('PE-D1','Lee Group','Private Island Charter Jun 12','Booking Pending',14800,'$14,800','hot',0,'Ana','8 guests · 3 nights · Deposit due','Send deposit instructions ($4,440) and booking confirmation now.'),
    _deal('PE-D2','Williams Family','Costa Rica 7-Night Jul 4','Confirmed',8400,'$8,400','hot',0,'Ana','4 guests · Beach villa · Confirmed','Send pre-arrival itinerary and packing guide.'),
    _deal('PE-D3','Taylor Honeymoon','Jungle Villa Jun 22','Quote Sent',5600,'$5,600','warm',2,'Ana','2 guests · Private pool · Awaiting reply','Follow up on quote. Suggest romantic add-ons.'),
    _deal('PE-D4','Anderson Couple','Eco-Lodge Surf Jul 18','Availability Checked',3200,'$3,200','warm',1,'Ana','2 guests · Surf lessons included','Send finalised quote with surf package.'),
    _deal('PE-D5','Garcia Family','Adventure Pack 5D Jun','Inquiry',4100,'$4,100','cold',9,'Ana','5 guests · Spanish · No response 9d','Re-engage with detailed itinerary and limited availability.'),
    _deal('PE-D6','Hoffman Couple','Eco-Lodge Aug 10','Confirmed',2800,'$2,800','warm',5,'Ana','2 guests · Couples retreat · Aug','Send welcome guide and pre-trip checklist.'),
    _deal('PE-D7','Chen Family','Family Beach Jul 20','Operated',6200,'$6,200','warm',12,'Ana','5 guests · Completed · Review pending','Request post-trip review and upsell return visit.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.retail,{pipeline:{
  title:'Purchase Pipeline',
  stages:['New Contact','Interested','Cart Intent','First Purchase','Repeat Purchase','At Risk'],
  deals:[
    _deal('NR-D1','Emma Davis','Skincare Bundle × 3','Cart Intent',284,'$284','hot',0,'Agent','Cart abandoned · 2h ago · Offer: SAVE10','Send cart recovery with 10% discount code immediately.'),
    _deal('NR-D2','James Cho','Premium Sneakers × 2','First Purchase',320,'$320','hot',0,'Agent','Order placed Monday · Tracking sent','Suggest matching accessories — 15% off cross-sell.'),
    _deal('NR-D3','Sara Lopez','Summer Collection × 5','Repeat Purchase',610,'$610','warm',2,'Agent','3rd purchase · VIP segment · Loyalty pts','Send VIP early access to next collection drop.'),
    _deal('NR-D4','Mark Turner','Tech Accessories Bundle','Interested',148,'$148','warm',3,'Agent','Browsing 3 days · Desktop · No add-to-cart','Send personalised bundle recommendation with discount.'),
    _deal('NR-D5','Lily Chen','Home Decor Set','At Risk',220,'$220','cold',7,'Agent','Last purchase: Oct 2025 · 7 days no action','Send win-back offer: 15% off + free shipping.'),
    _deal('NR-D6','Nina Park','Wellness Kit × 2','Cart Intent',180,'$180','warm',1,'Agent','Cart saved · Mobile · High engagement','Send cart reminder with limited stock alert.'),
    _deal('NR-D7','Leo Santos','Sports Bundle','New Contact',95,'$95','cold',4,'Agent','First visit · Blog referral · No purchase','Send welcome discount code for first purchase.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.b2b,{pipeline:{
  title:'Deal Pipeline',
  stages:['New Lead','Qualified','Discovery','Proposal','Negotiation','Contract'],
  deals:[
    _deal('AA-D1','TechCorp Inc.','Digital Transformation','Negotiation',840000,'$840K','hot',12,'Alexandra','CTO + CFO engaged · Revised proposal due Fri','Send revised proposal by Friday and schedule sign-off call.'),
    _deal('AA-D2','Apex Holdings','M&A Advisory','Discovery',1200000,'$1.2M','hot',4,'Alexandra','Managing Partner · 2 discovery calls done','Prepare preliminary scope and present week 2.'),
    _deal('AA-D3','Stellar Ventures','Growth Strategy','Qualified',180000,'$180K','hot',0,'David','Series B CEO · Inbound today','Schedule discovery call this week and send case studies.'),
    _deal('AA-D4','Meridian Group','Market Entry Strategy','Proposal',320000,'$320K','warm',3,'David','LATAM focus · Proposal sent · Awaiting sign','Follow up on proposal. Offer review call.'),
    _deal('AA-D5','NovaBanc','Compliance Audit','Discovery',280000,'$280K','warm',5,'Ingrid','CCO engaged · Scope due Wednesday','Finalise compliance audit scope by Wednesday.'),
    _deal('AA-D6','Orion Media','Content Strategy','New Lead',120000,'$120K','warm',1,'David','CMO inbound · Marketing focus','Qualify needs and assign consultant.'),
    _deal('AA-D7','Vertex Pharma','Regulatory Advisory','Contract',480000,'$480K','warm',14,'Alexandra','Contract under legal review · Close this month','Coordinate legal review and confirm signature timeline.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.logistics,{pipeline:{
  title:'Quote Pipeline',
  stages:['RFQ Received','Qualified','Pricing Requested','Quote Sent','Negotiation','Awarded'],
  deals:[
    _deal('FC-D1','Pacific Imports','APAC–USA LCL × 120 cntr','Negotiation',210000,'$210K','hot',0,'Kevin','$1,750/cntr quoted · Client wants rate confirmed Mon','Confirm rate validity. Push for PO by Monday.'),
    _deal('FC-D2','TradeBridge Inc.','MX–USA TL × 60 loads','RFQ Received',72000,'$72K','hot',0,'Kevin','WhatsApp RFQ today · Deadline: today','Parse RFQ and prepare MX–USA TL quote today.'),
    _deal('FC-D3','GlobalTrade Co.','USA–Mexico FCL × 40','Awarded',84000,'$84K','hot',0,'Kevin','PO received · Booking confirmed','Confirm booking and send transport instructions.'),
    _deal('FC-D4','AmeriCargo LLC','USA–Canada TL × 30','Pricing Requested',36000,'$36K','warm',2,'Kevin','Quote by Friday · $1,200/load estimate','Prepare USA–Canada TL quote and send by Friday.'),
    _deal('FC-D5','EuroFreight AG','EU–USA Air Freight × 8 plts','Quote Sent',48000,'$48K','warm',4,'Kevin','$6,000/pallet quoted · Under review','Follow up on air freight quote. Check decision timeline.'),
    _deal('FC-D6','SunBridge Corp','USA–EU Ocean FCL','Qualified',62000,'$62K','warm',3,'Kevin','New lane · 20 containers/month','Request cargo specs and prepare ocean FCL quote.'),
    _deal('FC-D7','AsiaTrade Ltd.','APAC–CA LCL × 60','Pricing Requested',95000,'$95K','warm',1,'Kevin','Rate request received · Deadline: Fri','Check APAC–Canada LCL capacity and price.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.wellness,{pipeline:{
  title:'Trial Pipeline',
  stages:['New Lead','Trial Scheduled','Trial Attended','Offer Sent','Active Member','At Risk'],
  deals:[
    _deal('SF-D1','Rachel Kim','Annual Membership','Offer Sent',840,'$840','hot',0,'Maya','3 trials completed · Offer sent today','Follow up on annual membership offer. Close this week.'),
    _deal('SF-D2','Jake Torres','6-Month Membership','Trial Attended',480,'$480','hot',0,'Carlos','Attended HIIT trial · Positive feedback','Send 6-month membership offer with class schedule.'),
    _deal('SF-D3','Priya Nair','Annual + PT Package','Trial Scheduled',1200,'$1,200','warm',2,'Maya','Yoga + PT trial booked Thu','Prepare Annual + PT package offer for post-trial.'),
    _deal('SF-D4','Leo Santos','Monthly Flex','New Lead',98,'$98/mo','warm',3,'Carlos','Referral · Evenings preferred · No trial yet','Book intro trial class for this week.'),
    _deal('SF-D5','Anna Weber','6-Month Membership','At Risk',480,'$480','cold',8,'Carlos','No attendance 6 weeks · Cancellation risk','Send retention offer: 2 free PT sessions. Call today.'),
    _deal('SF-D6','Mia Chen','Annual Membership','Active Member',840,'$840','warm',30,'Maya','Active · 18 classes this month · Renewing in 2 months','Proactive renewal outreach — lock in early.'),
    _deal('SF-D7','Tom Reeves','Pilates Package','Trial Scheduled',360,'$360','warm',1,'Leila','Trial booked Wed 9 AM · Pilates Foundations','Send welcome message and class preparation tips.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.education,{pipeline:{
  title:'Admissions Pipeline',
  stages:['Inquiry','Contacted','Visit','Application Started','Admitted','Enrolled'],
  deals:[
    _deal('BA-D1','Maya Johnson','MBA Program 2026','Admitted',48000,'$48K/yr','hot',0,'Sara','Admitted · Deposit $2K due May 30','Send enrollment deposit instructions and Sep orientation guide.'),
    _deal('BA-D2','Sofia Nguyen','Full-Stack Engineering','Application Started',14000,'$14K','hot',0,'Sara','App in progress · Deadline: Jun 1','Follow up on application completion and missing items.'),
    _deal('BA-D3','Carlos Reyes','Data Science Bootcamp','Application Started',12000,'$12K','warm',2,'Sara','2 docs missing: transcripts + letter','Send document checklist and deadline reminder.'),
    _deal('BA-D4','Tom Williams — Parent','Executive Leadership','Contacted',24000,'$24K/yr','warm',4,'Sara','Parent inquiry · Son interested · No visit yet','Invite to Open Day May 24 — campus tour.'),
    _deal('BA-D5','Aisha Patel','UX Design Certificate','Inquiry',8000,'$8K','cold',10,'Sara','No response 10 days · 2 spots left · Closes May 28','Send urgent re-engagement. Highlight scarcity.'),
    _deal('BA-D6','James Park — Parent','MBA Program 2026','Visit',48000,'$48K/yr','warm',3,'Sara','Campus visit scheduled Friday · Strong interest','Prepare faculty introduction and scholarship overview.'),
    _deal('BA-D7','Emma Torres','Digital Marketing','Enrolled',9000,'$9K','warm',14,'Sara','Enrolled Jul cohort · Onboarding pending','Send pre-course materials and platform access.'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.professional,{pipeline:{
  title:'Matter Pipeline',
  stages:['New Inquiry','Intake','Conflict Check','Consultation','Proposal','Signed'],
  deals:[
    _deal('LP-D1','Greenfield Corp.','M&A Due Diligence','Signed',480000,'$480K','hot',0,'Alexandra','Active · DD report due May 28 · IP review this week','Allocate IP specialist and confirm May 28 delivery.'),
    _deal('LP-D2','New Employment Inquiry','Wrongful Termination','New Inquiry',28000,'$28K','hot',0,'David','Urgent · Letter received today · Intake needed','Start intake immediately. Run conflict check today.'),
    _deal('LP-D3','Nexus Tech','IP Portfolio Defense','Consultation',180000,'$180K','warm',2,'David','Conflict cleared · Consult scheduled Wed','Prepare IP defense strategy outline for Wednesday.'),
    _deal('LP-D4','Okafor & Sons','Lease Negotiation','Conflict Check',96000,'$96K','warm',0,'Alexandra','Conflict check pending today · Lease expires Jul','Run conflict check today. Assign RE partner.'),
    _deal('LP-D5','Harmon Family','Estate Planning','Proposal',42000,'$42K','cold',6,'Ingrid','Proposal sent 6 days · No response','Follow up. Offer 30-min call to review proposal.'),
    _deal('LP-D6','Rivera LLC','Commercial Contract','Intake',34000,'$34K','warm',1,'Alexandra','New matter · Referral · Contract dispute','Complete intake form and assign commercial partner.'),
    _deal('LP-D7','Chen & Partners','Employment Advisory','Signed',68000,'$68K','warm',20,'David','Signed · Ongoing advisory retainer','Send monthly advisory summary for April.'),
  ],
}});

// ─── OPERATIONS DATA ─────────────────────────────────────────────────────────
// Helper: compact ops card builder
function _op(id,title,subtitle,status,statusType,value,meta,type,tags,hue){
  return{id,title,subtitle,status,statusType,value,meta,type,tags,hue};
}

Object.assign(window.VERTICAL_PROFILES.clinics,{operations:{
  title:'Appointments & Treatments',
  subtitle:'Patient appointments, doctors, and treatment plans',
  primaryLabel:'Appointments',
  filters:['All','Appointments','Treatments','Doctors','Urgent'],
  cards:[
    _op('VC-OP1','Knee Replacement Consult','Dr. Roberts · Orthopedic Dept','Confirmed','active','$8,500','Today · 10:30 AM · 60 min','Appointments',['Orthopedic','Today'],208),
    _op('VC-OP2','Hip Replacement — Pre-op','Dr. Roberts · Orthopedic Dept','Scheduled','gold','$24,000','May 28 · 09:00 AM · 90 min','Appointments',['Surgical','Upcoming'],195),
    _op('VC-OP3','Cardiac Screening','Dr. Vega · Cardiology Dept','Completed','neutral','$2,200','Today · 11:15 AM · 45 min','Appointments',['Cardiology','Completed'],220),
    _op('VC-OP4','Cosmetic Surgery Consult','Dr. Roberts · Cosmetic Dept','New Inquiry','warm','$12,000+','Pending confirmation','Appointments',['Cosmetic','New Inquiry'],185),
    _op('VC-OP5','Knee Replacement Surgery','Orthopedic · Surgical Suite A','Treatment Active','active','$32,000','Booked May 28 · 4h est.','Treatments',['Surgical','High Value'],210),
    _op('VC-OP6','Rhinoplasty Package','Dr. Roberts · Cosmetic','Available','navy','$14,500','Next slot: Jun 3','Treatments',['Cosmetic','Available'],190),
    _op('VC-OP7','Dr. Elena Roberts','Orthopedic Specialist · 12 yrs','Available','active','8 slots/week','Mon–Fri · 09:00–17:00','Doctors',['Top Rated','Orthopedic'],200),
    _op('VC-OP8','Spine Evaluation','Dr. Chen · Neurology Dept','Urgent','hot','$3,800','Risk: No-show · 5d no contact','Urgent',['At Risk','Neurology'],175),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants,{operations:{
  title:'Reservations and Tables',
  subtitle:'Guest reservations, table assignments, and events',
  primaryLabel:'Reservations',
  filters:['All','Reservations','Tables','Events','Tonight'],
  cards:[
    _op('MG-OP1','Chen Wedding — Private Room','44 guests · Saturday 7 PM','Requested','warm','$2,400','Set menu · Champagne service','Events',['VIP Event','Sat 7 PM'],18),
    _op('MG-OP2','Davis Corp — Full Buyout','~80 guests · Sunday 12 PM','Inquiry','gold','$8,200','AV required · Corporate event','Events',['Buyout','High Value'],28),
    _op('MG-OP3','Johnson Party — Table 12','6 guests · Saturday 8 PM','Confirmed','active','$480','Birthday · Window seat','Reservations',['Tonight','Confirmed'],15),
    _op('MG-OP4','Martinez Group — Patio','12 guests · Friday 9 PM','Pending Confirm','warm','$720','Sharing plates · Outdoor','Reservations',['Outdoor','Pending'],22),
    _op('MG-OP5','Smith Anniversary — Table 5','2 guests · Saturday 7:30 PM','No Response','hot','$360','10th anniversary · Champagne','Reservations',['At Risk','Tonight'],35),
    _op('MG-OP6','Table 5 — Corner Booth','2–4 seats · Premium spot','Available','active','$280–$480/cover','Sat & Sun peak hours','Tables',['Corner','Available'],10),
    _op('MG-OP7','Private Room A','Up to 50 guests · Full AV','Available','active','$2,000 min','Weekends · Chef\'s menu','Tables',['Private','Available'],20),
    _op('MG-OP8','Terrace — Outdoor Patio','24 seats · Garden view','Partially Booked','navy','$180–$320/cover','Fri–Sun evenings','Tables',['Outdoor','Terrace'],30),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.tourism,{operations:{
  title:'Bookings and Experiences',
  subtitle:'Room availability, bookings, and experiences',
  primaryLabel:'Bookings',
  filters:['All','Bookings','Experiences','Available','Deposit Due'],
  cards:[
    _op('PE-OP1','Private Island Charter','3 nights · 8 guests all-inclusive','Deposit Due','hot','$14,800','Jun 12–15 · Deposit: $4,440 due','Bookings',['High Value','Deposit Due'],185),
    _op('PE-OP2','Costa Rica 7-Night Villa','4 guests · Beach + pool','Confirmed','active','$8,400','Jul 4–11 · Williams Family','Bookings',['Confirmed','Family'],175),
    _op('PE-OP3','Jungle Villa Honeymoon','2 guests · Private pool + spa','Quote Sent','warm','$5,600','Jun 22–26 · Taylor couple','Bookings',['Honeymoon','Quote'],168),
    _op('PE-OP4','Eco-Lodge Surf Retreat','2 guests · Surf + lodge','Available','gold','$3,200','Jul 18–22 · 2 spots left','Bookings',['Surf','Available'],192),
    _op('PE-OP5','Sunset Catamaran Tour','Up to 12 guests · 4 hours','Available','active','$1,200','Daily departures · Flexible','Experiences',['Popular','Available'],195),
    _op('PE-OP6','Rainforest Canopy Tour','Up to 8 guests · Half day','Available','active','$480','Mon/Wed/Fri · 7:00 AM','Experiences',['Adventure','Available'],155),
    _op('PE-OP7','Private Chef Dinner','2–10 guests · Beach setting','Bookable','navy','$320/person','By reservation · 24h notice','Experiences',['Luxury','Exclusive'],180),
    _op('PE-OP8','Adventure Pack 5D','Up to 10 guests · Multi-activity','Low Availability','warm','$820/person','Jun–Aug · Only 3 slots left','Experiences',['Adventure','Limited'],165),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.retail,{operations:{
  title:'Orders and Products',
  subtitle:'Active orders, product catalog, and customer cohorts',
  primaryLabel:'Orders',
  filters:['All','Orders','Products','Cohorts','Low Stock'],
  cards:[
    _op('NR-OP1','Skincare Bundle — Abandoned Cart','Emma Davis · Cart: $284 · 2h ago','Cart Recovery','hot','$284','Mobile · Instagram source','Orders',['Abandoned Cart','Urgent'],300),
    _op('NR-OP2','Premium Sneakers Order #4821','James Cho · Shipped Monday','Shipped','active','$320','Est. delivery: Thursday','Orders',['Shipped','Tracking'],290),
    _op('NR-OP3','Summer Collection × 5','Sara Lopez · VIP repeat buyer','Processing','navy','$610','3rd purchase this quarter','Orders',['VIP','Repeat'],310),
    _op('NR-OP4','Skincare Bundle — 3 Pack','Best seller · 48 active carts','In Stock','active','$94.99 ea','SKU: SK-BUNDLE-3 · 240 units','Products',['Best Seller','High Demand'],285),
    _op('NR-OP5','Premium Sneakers — Size 10','New arrival · High demand','Low Stock','hot','$159.99','Only 8 units left','Products',['Low Stock','New'],295),
    _op('NR-OP6','Home Decor Set — Ivory','3 colorways · Slow mover','Restock Needed','warm','$186.99','28 units · Reorder threshold: 25','Products',['Low Stock','Reorder'],275),
    _op('NR-OP7','VIP Repeat Buyers Cohort','Customers with 3+ purchases','Active','active','Avg $440 LTV','48 members · High retention','Cohorts',['VIP','High LTV'],305),
    _op('NR-OP8','At-Risk Churners Cohort','No purchase in 60+ days','Needs Action','warm','Avg $186 LTV','32 customers · Win-back offer','Cohorts',['At Risk','Churn'],280),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.b2b,{operations:{
  title:'Proposals and Capacity',
  subtitle:'Active proposals, contracts, and consultant capacity',
  primaryLabel:'Proposals',
  filters:['All','Proposals','Contracts','Capacity','Urgent'],
  cards:[
    _op('AA-OP1','Digital Transformation — TechCorp','Phase 1 revised proposal · Due Fri','In Negotiation','hot','$840K','CTO + CFO · Sign-off call next week','Proposals',['Hot Deal','Deadline Fri'],228),
    _op('AA-OP2','M&A Advisory — Apex Holdings','Preliminary scope in progress','Discovery','warm','$1.2M','Managing Partner · 2 calls done','Proposals',['High Value','Discovery'],235),
    _op('AA-OP3','Market Entry — Meridian Group','LATAM strategy · Proposal sent','Awaiting Signature','gold','$320K','CEO engaged · Follow-up needed','Proposals',['Proposal Sent','Pending'],222),
    _op('AA-OP4','Compliance Audit — NovaBanc','Regulatory scope · Due Wednesday','Scoping','warm','$280K','CCO · Scope finalisation week','Proposals',['Compliance','Deadline'],240),
    _op('AA-OP5','M&A Advisory Retainer','Greenfield Corp · Ongoing active','Active Contract','active','$480K/yr','Renewal: Dec 2026','Contracts',['Active','Retainer'],230),
    _op('AA-OP6','Growth Strategy Retainer','Vertex Pharma · Monthly advisory','Active Contract','active','$68K/mo','Signed · Since Jan 2026','Contracts',['Active','Retainer'],220),
    _op('AA-OP7','Alexandra Rios — Senior Partner','M&A, Corporate Strategy · 15 yrs','Available Q3','active','4 slots available','Available from Jul for new engagements','Capacity',['Senior','Available'],245),
    _op('AA-OP8','David Park — Strategy Lead','Growth, SaaS, Fintech · 10 yrs','At Capacity','warm','1 slot open Oct','Full through Sep · 1 slot Oct','Capacity',['Strategy','Limited'],225),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.logistics,{operations:{
  title:'RFQs and Shipments',
  subtitle:'Active RFQs, rate sheets, and shipment tracking',
  primaryLabel:'RFQs',
  filters:['All','RFQs','Rates','Shipments','Urgent'],
  cards:[
    _op('FC-OP1','APAC–USA LCL × 120 containers','Pacific Imports · Jun 8 departure','Negotiation','hot','$210K','$1,750/cntr · Rate valid until Mon','RFQs',['Urgent','Negotiation'],205),
    _op('FC-OP2','MX–USA TL × 60 loads','TradeBridge Inc. · Today deadline','Received Today','hot','$72K','$1,200/load · Cross-border TL','RFQs',['Deadline Today','Urgent'],198),
    _op('FC-OP3','USA–Canada TL × 30 loads','AmeriCargo LLC · Quote by Fri','Pricing Requested','warm','$36K','$1,200/load · 2–3 day transit','RFQs',['Pending','Deadline Fri'],210),
    _op('FC-OP4','APAC–USA LCL Rate Sheet','Pacific lane · Q2 2026 rates','Current','active','$1,650–1,850/cntr','Valid Apr–Jun 2026 · All-in','Rates',['Current','APAC'],200),
    _op('FC-OP5','MX–USA TL Rate Sheet','Cross-border · Spot + contract','Current','active','$1,100–1,300/load','Spot + 12-mo contract options','Rates',['Current','Cross-Border'],195),
    _op('FC-OP6','EU–USA Air Freight Rate','EuroFreight AG · High-value cargo','Current','navy','$5,800–6,200/plt','3-day transit · Secure handling','Rates',['Air','Current'],215),
    _op('FC-OP7','Shipment SHP-4821 — APAC/USA','GlobalTrade Co. · 40 containers','In Transit','active','$84K','Departed May 12 · ETA Jun 2','Shipments',['In Transit','On Time'],202),
    _op('FC-OP8','Shipment SHP-4819 — MX/USA','TradeBridge Inc. · 45 loads','Delivered','neutral','$54K','Delivered May 15 · POD received','Shipments',['Delivered','Closed'],208),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.wellness,{operations:{
  title:'Classes and Members',
  subtitle:'Class schedule, active members, and attendance tracking',
  primaryLabel:'Classes',
  filters:['All','Classes','Members','Attendance','At Risk'],
  cards:[
    _op('SF-OP1','Power Yoga — 7 AM','Instructor: Maya · Mon/Wed/Fri','Nearly Full','hot','18/20 spots','High demand · 2 spots left','Classes',['Yoga','Popular'],128),
    _op('SF-OP2','HIIT Circuit — 6 PM','Instructor: Carlos · Mon–Thu','Full','active','20/20 spots','Waitlist: 4 people','Classes',['HIIT','Full'],140),
    _op('SF-OP3','Pilates Foundations — 9 AM','Instructor: Leila · Tue/Thu','Open','active','12/16 spots','Trial available · 4 spots open','Classes',['Pilates','Open'],115),
    _op('SF-OP4','Boxing Basics — 7 PM','Instructor: Rafa · Mon/Wed','Open','navy','8/14 spots','New class · Growing fast','Classes',['Boxing','New'],130),
    _op('SF-OP5','Rachel Kim — Annual Member','Power Yoga · 3 trials done','Offer Sent','gold','$840/yr','Trial completed · Offer pending','Members',['Hot Lead','Offer Sent'],120),
    _op('SF-OP6','Jake Torres — Trial Attended','HIIT Circuit · 1 trial done','Follow-up','warm','$480 · 6-month','Attended Mon · Send offer today','Members',['Trial','Follow-up'],135),
    _op('SF-OP7','Anna Weber — At Risk','HIIT · No attendance 6 weeks','Cancellation Risk','hot','$480 · active','Retention offer: 2 free PT','At Risk',['Churn Risk','Urgent'],125),
    _op('SF-OP8','Pilates Thu 9 AM — Attendance','12 attended · 4 absent','Low Attendance','warm','75% fill rate','2 no-shows · Follow-up needed','Attendance',['Low Fill','Action'],118),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.education,{operations:{
  title:'Applications and Programs',
  subtitle:'Student applications, program capacity, and enrollment',
  primaryLabel:'Applications',
  filters:['All','Applications','Programs','Enrollment','Missing Docs'],
  cards:[
    _op('BA-OP1','Maya Johnson — MBA 2026','Admitted · Deposit due May 30','Admitted','active','$48K/yr','Deposit: $2,000 by May 30 · Sep start','Applications',['Admitted','Action Required'],215),
    _op('BA-OP2','Carlos Reyes — Data Science','App in progress · 2 docs missing','Missing Docs','hot','$12K','Transcripts + letter · Due May 25','Applications',['Missing Docs','Urgent'],205),
    _op('BA-OP3','Sofia Nguyen — Full-Stack','Application started · Near complete','In Progress','warm','$14K','90% complete · Deadline Jun 1','Applications',['In Progress','On Track'],220),
    _op('BA-OP4','Aisha Patel — UX Design','No response 10 days · 2 spots left','At Risk','hot','$8K','Closes May 28 · Last 2 spots','Applications',['At Risk','Urgent'],210),
    _op('BA-OP5','MBA Program 2026 — Sep','Full-time · 2-year · Sep intake','Almost Full','gold','$48K/yr','14 enrolled · 6 spots left · Deadline May 30','Programs',['Popular','Closing'],218),
    _op('BA-OP6','Data Science Bootcamp — Jul','Intensive · 6-month · Jul intake','Open','active','$12K','22 enrolled · 8 spots left','Programs',['Open','Bootcamp'],208),
    _op('BA-OP7','UX Design Certificate — Jun','Part-time · 4-month · Jun intake','Almost Full','warm','$8K','18 enrolled · Only 2 spots','Programs',['Almost Full','Jun'],212),
    _op('BA-OP8','Sep MBA Cohort — Enrollment','20 enrolled · 6 confirmed deposits','On Track','active','$960K projected','Target: 20 · Current: 14','Enrollment',['On Track','Sep'],216),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.professional,{operations:{
  title:'Matters and Documents',
  subtitle:'Active matters, client intake, and document management',
  primaryLabel:'Matters',
  filters:['All','Matters','Intake','Documents','Urgent'],
  cards:[
    _op('LP-OP1','M&A Due Diligence — Greenfield','Active matter · DD report May 28','Active','active','$480K','IP review this week · On track','Matters',['Active','High Value'],238),
    _op('LP-OP2','IP Portfolio Defense — Nexus','Consult scheduled Wed · Partner: David','In Progress','warm','$180K','Litigation risk · Consult prep','Matters',['IP','Consultation'],232),
    _op('LP-OP3','Lease Negotiation — Okafor','Conflict check pending today','Conflict Check','hot','$96K','3 properties · Lease expires Jul','Matters',['Urgent','Conflict Check'],245),
    _op('LP-OP4','Employment Dispute — New Inquiry','Wrongful termination · Urgent intake','New Intake','hot','$28K est.','Received today · Assign partner','Intake',['Urgent','New Today'],235),
    _op('LP-OP5','Estate Planning — Harmon','Proposal sent 6 days · No response','Stalled','warm','$42K','Follow-up call needed this week','Intake',['Stalled','Follow-up'],228),
    _op('LP-OP6','Rivera LLC — Commercial Contract','Intake complete · Conflict cleared','Ready for Consult','gold','$34K','Assign commercial partner','Intake',['Ready','Commercial'],240),
    _op('LP-OP7','Due Diligence Docs — Greenfield','Target financials + IP assets','Under Review','navy','48 documents','IP review: 60% complete','Documents',['Under Review','Critical'],242),
    _op('LP-OP8','Document Request — Okafor','Draft lease + related comms','Pending Receipt','warm','3 documents','Requested May 14 · Not received','Documents',['Pending','Urgent'],230),
  ],
}});

// ─── ADS INTELLIGENCE DATA ────────────────────────────────────────────────────
// Shared 14-day pattern helper (deterministic)
function _d14(s,l){return[1,1.1,0.9,1.2,1.05,1.3,1.1,0.95,0.88,1.15,1.25,1.18,1.1,0.85].map((v,i)=>({d:`D${i+1}`,spend:Math.round(s*v),leads:Math.round(l*v)}));}
// Compact campaign builder
function _ac(id,name,plat,spend,leads,cpl,ctr,pipeVal,qs,status,alert,country){return{id,name,platform:plat,spend,leads,cpl,ctr,cpc:+(spend/leads/ctr*0.01).toFixed(2),pipelineValue:pipeVal,qualityScore:qs,status,alert,targetCountry:country,audience:'Mock audience segment',opportunities:Math.round(leads*0.31),closings:Math.round(leads*0.12)};}
// Compact recommendation builder
function _ar(p,type,icon,title,impact,detail,action){return{priority:p,type,icon,title,impact,detail,action,campaign:null};}

Object.assign(window.VERTICAL_PROFILES.clinics,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'2 campaigns driving high no-show rate — $3.2K at risk. Retarget confirmed patients instead →',
  metrics:[
    {label:'Total Spend',    value:'$14.2K',  sub:'30 days',            color:'text'},
    {label:'Patient Leads',  value:'312',     sub:'$46 avg CPL',        color:'navyMid'},
    {label:'Appointments',   value:'148',     sub:'47% booking rate',   color:'gold'},
    {label:'Attended',       value:'124',     sub:'84% show rate',      color:'gold'},
    {label:'Revenue',        value:'$182K',   sub:'Attributed',         color:'success'},
    {label:'Avg CTR',        value:'2.8%',    sub:'All campaigns',      color:'text'},
    {label:'Cost/Appt',      value:'$96',     sub:'All platforms',      color:'text'},
    {label:'No-Show Risk',   value:'24',      sub:'Flagged leads',      color:'danger'},
  ],
  daily14:_d14(473,10),
  channelSplit:[
    {label:'Meta Ads',   color:'#1877F2', spend:8800, leads:198, resultLabel:'leads', pct:62},
    {label:'Google Ads', color:'#EA4335', spend:5400, leads:114, resultLabel:'leads', pct:38},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:68},{flag:'🇲🇽',label:'Mexico',pct:20},{flag:'🌎',label:'Other',pct:12}],
  summary:{totalSpend:14200,totalLeads:312,avgCPL:46,metaSpend:8800,googleSpend:5400,metaLeads:198,googleLeads:114,totalOpportunities:148,pipelineAttributed:182000,roas:12.8,avgCTR:2.8,avgCPC:1.4,closingsAttributed:89,period:'Mock — last 30 days'},
  campaigns:[
    _ac('VC-A1','Knee Treatment Consultation','Meta',3600,78,46,2.0,38000,88,'active',false,'USA'),
    _ac('VC-A2','Cardiac Screening — Retargeting','Meta',2700,62,44,3.0,44000,91,'active',false,'USA/CA'),
    _ac('VC-A3','Orthopedic Surgery — Search','Google',2160,48,45,6.0,52000,86,'active',false,'USA'),
    _ac('VC-A4','General Health — Broad','Meta',3240,24,135,1.4,8000,32,'active',true,'USA'),
    _ac('VC-A5','Cosmetic Surgery — Search','Google',1440,28,51,6.0,24000,82,'active',false,'USA'),
  ],
  recommendations:[
    _ar(1,'scale','🚀','Scale Orthopedic Surgery Search campaign','+24 appts/mo','Quality score 86, CPL $45. Currently underbudgeted at $120/day. Increase to $180/day.','Increase Budget'),
    _ar(2,'urgent','⛔','Pause General Health Broad — high no-show risk','Save $3,240/mo','CPL $135 vs $46 portfolio avg, quality score 32. Broad audience attracting low-intent leads.','Pause Campaign'),
    _ar(3,'opportunity','🎯','Retarget patients who requested pricing but did not book','+18 bookings/mo','Create a 30-day retargeting audience from pricing page visitors. Expected CPL $52.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.restaurants,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'Weekend campaign overspending on low-conversion time slots — $1.8K at risk →',
  metrics:[
    {label:'Total Spend',  value:'$8.4K',   sub:'30 days',            color:'text'},
    {label:'Reservations', value:'284',     sub:'$30 avg CPR',        color:'navyMid'},
    {label:'Covers',       value:'1,240',   sub:'4.4 avg party size', color:'gold'},
    {label:'Events',       value:'12',      sub:'Private bookings',   color:'gold'},
    {label:'Avg Ticket',   value:'$68',     sub:'Per cover',          color:'success'},
    {label:'Revenue',      value:'$84K',    sub:'Attributed',         color:'success'},
    {label:'Avg CTR',      value:'3.1%',    sub:'All campaigns',      color:'text'},
    {label:'Cost/Rsvn',    value:'$30',     sub:'All platforms',      color:'text'},
  ],
  daily14:_d14(280,9),
  channelSplit:[
    {label:'Meta Ads',    color:'#1877F2', spend:5600, leads:192, resultLabel:'reservations', pct:67},
    {label:'Google Ads',  color:'#EA4335', spend:2800, leads:92,  resultLabel:'reservations', pct:33},
  ],
  regionSplit:[{flag:'🏙️',label:'Local (10km)',pct:78},{flag:'🌎',label:'Tourists',pct:14},{flag:'🇺🇸',label:'US Visitors',pct:8}],
  summary:{totalSpend:8400,totalLeads:284,avgCPL:30,metaSpend:5600,googleSpend:2800,metaLeads:192,googleLeads:92,totalOpportunities:12,pipelineAttributed:84000,roas:10.0,avgCTR:3.1,avgCPC:0.8,closingsAttributed:284,period:'Mock — last 30 days'},
  campaigns:[
    _ac('MG-A1','Weekend Dinner Reservations','Meta',2800,124,23,3.5,42000,86,'active',false,'Local'),
    _ac('MG-A2','Private Event Bookings','Meta',1800,38,47,2.1,28000,82,'active',false,'Local/Tourist'),
    _ac('MG-A3','Lunch Special Campaign','Google',1400,62,23,4.2,14000,78,'active',false,'Local'),
    _ac('MG-A4','Terrace Table Retargeting','Meta',1400,36,39,2.8,12000,74,'active',false,'Local'),
    _ac('MG-A5','Weekend Late Night Broad','Meta',1000,24,42,1.6,4000,38,'active',true,'Local'),
  ],
  recommendations:[
    _ar(1,'scale','🚀','Scale Private Event campaign — highest ticket value','+8 events/mo','CPR $47, quality 82. Private events avg $2,400 ticket. Increase to $90/day on weekdays.','Increase Budget'),
    _ar(2,'urgent','⛔','Pause Weekend Late Night Broad — low conversion','Save $1,000/mo','Quality score 38. Late-night broad audience not converting. Narrow to local intent audience.','Pause Campaign'),
    _ar(3,'opportunity','🎯','Retarget menu views with reservation CTA','+24 reservations/mo','Create audience from menu page visitors (last 14 days). Expected CPR $22.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.tourism,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'Low season campaign spending with no deposits — $2.1K at risk. Shift to confirmed-date retargeting →',
  metrics:[
    {label:'Total Spend',    value:'$12.8K',  sub:'30 days',            color:'text'},
    {label:'Travel Leads',   value:'78',      sub:'$164 avg CPL',       color:'navyMid'},
    {label:'Bookings',       value:'32',      sub:'41% conv rate',      color:'gold'},
    {label:'Deposits',       value:'18',      sub:'$4,440 avg deposit', color:'gold'},
    {label:'Booking Value',  value:'$218K',   sub:'Attributed',         color:'success'},
    {label:'Upsells',        value:'14',      sub:'Confirmed bookings', color:'success'},
    {label:'Occupancy Lift', value:'+12%',    sub:'vs. organic',        color:'text'},
    {label:'ROAS',           value:'17.0x',   sub:'Value / Spend',      color:'text'},
  ],
  daily14:_d14(427,3),
  channelSplit:[
    {label:'Meta Ads',    color:'#1877F2', spend:7600, leads:48, resultLabel:'leads', pct:59},
    {label:'Google Ads',  color:'#EA4335', spend:5200, leads:30, resultLabel:'leads', pct:41},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:54},{flag:'🇨🇦',label:'Canada',pct:22},{flag:'🇬🇧',label:'UK/EU',pct:24}],
  summary:{totalSpend:12800,totalLeads:78,avgCPL:164,metaSpend:7600,googleSpend:5200,metaLeads:48,googleLeads:30,totalOpportunities:32,pipelineAttributed:218000,roas:17.0,avgCTR:2.1,avgCPC:3.8,closingsAttributed:18,period:'Mock — last 30 days'},
  campaigns:[
    _ac('PE-A1','Ocean View Room Campaign','Meta',3200,28,114,2.4,84000,88,'active',false,'USA/CA'),
    _ac('PE-A2','Sunset Catamaran Ads','Meta',2400,18,133,2.0,36000,82,'active',false,'USA/EU'),
    _ac('PE-A3','Rainforest Tour Campaign','Google',2800,20,140,5.2,48000,80,'active',false,'USA'),
    _ac('PE-A4','Low Season Booking Push','Meta',2100,8,263,1.3,12000,38,'active',true,'USA/CA'),
    _ac('PE-A5','Deposit Retargeting','Google',2300,4,575,4.8,38000,76,'active',false,'USA/EU'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause Low Season Broad — no deposits generated','Save $2,100/mo','CPL $263, quality score 38. Zero deposits in 30 days. Reallocate to Deposit Retargeting campaign.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Deposit Retargeting — highest conversion value','+6 deposits/mo','4 deposits at avg $4,440 each. Increase Deposit Retargeting to $120/day.','Increase Budget'),
    _ar(3,'opportunity','🎯','Retarget availability requests with time-limited offer','+8 bookings/mo','Guests who checked availability but did not book. 7-day urgency window. Expected CPL $140.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.retail,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'3 cart recovery campaigns underperforming — $2.4K at risk. Tighten audience to 24h abandoners →',
  metrics:[
    {label:'Total Spend',      value:'$11.2K',  sub:'30 days',            color:'text'},
    {label:'Orders',           value:'342',     sub:'$33 avg CAC',        color:'navyMid'},
    {label:'Cart Recovery',    value:'48',      sub:'14% cart recovery',  color:'gold'},
    {label:'Revenue',          value:'$84K',    sub:'Attributed',         color:'success'},
    {label:'AOV',              value:'$246',    sub:'Avg order value',    color:'gold'},
    {label:'Repeat Purchases', value:'94',      sub:'27% repeat rate',    color:'success'},
    {label:'ROAS',             value:'7.5x',    sub:'Revenue / Spend',    color:'text'},
    {label:'Avg CTR',          value:'2.4%',    sub:'All campaigns',      color:'text'},
  ],
  daily14:_d14(373,11),
  channelSplit:[
    {label:'Meta Ads',    color:'#1877F2', spend:6800, leads:208, resultLabel:'orders', pct:61},
    {label:'Google Ads',  color:'#EA4335', spend:4400, leads:134, resultLabel:'orders', pct:39},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:72},{flag:'🇨🇦',label:'Canada',pct:16},{flag:'🌎',label:'Other',pct:12}],
  summary:{totalSpend:11200,totalLeads:342,avgCPL:33,metaSpend:6800,googleSpend:4400,metaLeads:208,googleLeads:134,totalOpportunities:94,pipelineAttributed:84000,roas:7.5,avgCTR:2.4,avgCPC:1.2,closingsAttributed:342,period:'Mock — last 30 days'},
  campaigns:[
    _ac('NR-A1','Best Seller Campaign','Meta',3200,128,25,3.2,32000,88,'active',false,'USA/CA'),
    _ac('NR-A2','Cart Recovery Ads — 24h','Meta',2400,48,50,2.8,12000,82,'active',false,'USA'),
    _ac('NR-A3','VIP Customer Retargeting','Meta',1800,76,24,3.6,24000,86,'active',false,'USA'),
    _ac('NR-A4','New Collection Launch','Google',2400,62,39,4.2,14000,78,'active',false,'USA'),
    _ac('NR-A5','Broad Shopping — Low Margin','Google',1400,28,50,1.8,2000,34,'active',true,'USA'),
  ],
  recommendations:[
    _ar(1,'scale','🚀','Scale VIP Retargeting — highest repeat purchase rate','+38 repeat orders/mo','CAC $24, repeat rate 34%. Increase to $100/day and expand lookalike audience.','Increase Budget'),
    _ar(2,'urgent','⛔','Pause Broad Shopping — low-margin products','Save $1,400/mo','Quality score 34. Driving low-margin orders below AOV. Narrow to high-margin SKUs only.','Pause Campaign'),
    _ar(3,'opportunity','🎯','Retarget 24h cart abandoners with urgency offer','+22 recoveries/mo','Create dedicated audience for carts abandoned in last 24h. Add limited-time 10% code.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.b2b,{adsIntelligence:{
  period:'Paid Media · LinkedIn + Google · Last 30 days',
  alertText:'2 awareness campaigns generating MQLs with 0% SQL conversion — $3.6K at risk →',
  metrics:[
    {label:'Total Spend', value:'$18.4K',  sub:'30 days',            color:'text'},
    {label:'MQLs',        value:'62',      sub:'$297 avg CPMQL',     color:'navyMid'},
    {label:'SQLs',        value:'28',      sub:'45% MQL→SQL rate',   color:'gold'},
    {label:'Proposals',   value:'14',      sub:'50% SQL→Prop rate',  color:'gold'},
    {label:'Pipeline',    value:'$4.2M',   sub:'Attributed',         color:'success'},
    {label:'ACV',         value:'$300K',   sub:'Avg contract value', color:'success'},
    {label:'CAC',         value:'$657',    sub:'Per SQL',            color:'text'},
    {label:'Avg CTR',     value:'0.9%',    sub:'LinkedIn/Google',    color:'text'},
  ],
  daily14:_d14(613,2),
  channelSplit:[
    {label:'LinkedIn Ads', color:'#0A66C2', spend:12400, leads:38, resultLabel:'MQLs', pct:67},
    {label:'Google Ads',   color:'#EA4335', spend:6000,  leads:24, resultLabel:'MQLs', pct:33},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:68},{flag:'🇬🇧',label:'UK/EU',pct:22},{flag:'🌎',label:'Other',pct:10}],
  summary:{totalSpend:18400,totalLeads:62,avgCPL:297,metaSpend:12400,googleSpend:6000,metaLeads:38,googleLeads:24,totalOpportunities:28,pipelineAttributed:4200000,roas:228,avgCTR:0.9,avgCPC:8.4,closingsAttributed:6,period:'Mock — last 30 days'},
  campaigns:[
    _ac('AA-A1','CFO Lead Campaign','LinkedIn',5200,18,289,0.9,1200000,84,'active',false,'USA/EU'),
    _ac('AA-A2','Operations Consulting Ads','LinkedIn',4200,12,350,0.8,840000,80,'active',false,'USA'),
    _ac('AA-A3','Executive Webinar Campaign','LinkedIn',3000,8,375,1.1,600000,78,'active',false,'USA/EU'),
    _ac('AA-A4','Retargeting Decision Makers','Google',4200,18,233,1.2,1200000,88,'active',false,'USA'),
    _ac('AA-A5','Brand Awareness — Broad','LinkedIn',1800,6,300,0.6,0,28,'active',true,'Global'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause Brand Awareness Broad — zero SQL conversion','Save $1,800/mo','Quality score 28. 6 MQLs, 0 SQLs. Zero pipeline attribution. Reallocate to Retargeting.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Retargeting Decision Makers — highest SQL rate','+8 SQLs/mo','Quality score 88, CAC $233. Increase from $140/day to $200/day.','Increase Budget'),
    _ar(3,'opportunity','🎯','Retarget proposal page visitors with case study ads','+4 proposals/mo','Companies that visited /proposals in last 30 days. Expected CPL $280.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.logistics,{adsIntelligence:{
  period:'Paid Media · LinkedIn + Google · Last 30 days',
  alertText:'Lane-specific campaigns generating low-margin quotes — $2.8K at risk. Tighten targeting →',
  metrics:[
    {label:'Total Spend',     value:'$14.6K',  sub:'30 days',            color:'text'},
    {label:'Target Accts',    value:'38',      sub:'$384 avg CPT',       color:'navyMid'},
    {label:'RFQs',            value:'22',      sub:'58% acct→RFQ rate',  color:'gold'},
    {label:'Quotes Sent',     value:'18',      sub:'82% RFQ→quote rate', color:'gold'},
    {label:'Awarded Lanes',   value:'8',       sub:'44% win rate',       color:'success'},
    {label:'Margin',          value:'$124K',   sub:'Awarded lanes',      color:'success'},
    {label:'Revenue',         value:'$618K',   sub:'Attributed',         color:'text'},
    {label:'Avg CTR',         value:'0.8%',    sub:'All campaigns',      color:'text'},
  ],
  daily14:_d14(487,1),
  channelSplit:[
    {label:'LinkedIn Ads', color:'#0A66C2', spend:9200, leads:24, resultLabel:'RFQs', pct:63},
    {label:'Google Ads',   color:'#EA4335', spend:5400, leads:14, resultLabel:'RFQs', pct:37},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:58},{flag:'🇲🇽',label:'Mexico',pct:24},{flag:'🇯🇵',label:'APAC',pct:18}],
  summary:{totalSpend:14600,totalLeads:38,avgCPL:384,metaSpend:9200,googleSpend:5400,metaLeads:24,googleLeads:14,totalOpportunities:18,pipelineAttributed:618000,roas:42,avgCTR:0.8,avgCPC:12.1,closingsAttributed:8,period:'Mock — last 30 days'},
  campaigns:[
    _ac('FC-A1','APAC Lane Campaign','LinkedIn',4200,12,350,0.9,280000,84,'active',false,'USA/APAC'),
    _ac('FC-A2','Cold Chain Logistics Ads','LinkedIn',3200,8,400,0.8,180000,80,'active',false,'USA'),
    _ac('FC-A3','Freight RFQ Retargeting','Google',3600,12,300,1.2,220000,86,'active',false,'USA/MX'),
    _ac('FC-A4','Warehouse Capacity Campaign','LinkedIn',1800,4,450,0.6,0,32,'active',true,'USA'),
    _ac('FC-A5','MX Cross-Border — Search','Google',1800,2,900,0.7,118000,72,'active',false,'MX/USA'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause Warehouse Capacity — no RFQs generated','Save $1,800/mo','Quality score 32. Zero RFQs in 30 days. Wrong audience targeting. Rebuild with shipper intent signals.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Freight RFQ Retargeting — best win rate','+4 awarded lanes/mo','Quality score 86, CPT $300. Increase from $120/day to $180/day.','Increase Budget'),
    _ar(3,'opportunity','🎯','Target APAC shippers with lane-specific rate offers','+6 RFQs/mo','APAC-to-USA lane has highest margin. Create LinkedIn campaign targeting logistics managers in JP/KR/SG.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.wellness,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'Weekend class campaigns filling low-demand slots — $1.4K at risk. Shift to peak-hour ads →',
  metrics:[
    {label:'Total Spend',    value:'$6.8K',   sub:'30 days',            color:'text'},
    {label:'Trials',         value:'84',      sub:'$81 avg CPT',        color:'navyMid'},
    {label:'Trial Show Rate',value:'78%',     sub:'66 attended',        color:'gold'},
    {label:'Memberships',    value:'28',      sub:'42% trial→member',   color:'gold'},
    {label:'Churn Risk',     value:'12',      sub:'Flagged members',    color:'danger'},
    {label:'Class Fill Rate',value:'68%',     sub:'Avg across classes', color:'success'},
    {label:'Revenue',        value:'$28K',    sub:'New MRR',            color:'success'},
    {label:'ROAS',           value:'4.1x',    sub:'Revenue / Spend',    color:'text'},
  ],
  daily14:_d14(227,3),
  channelSplit:[
    {label:'Meta Ads',    color:'#1877F2', spend:4400, leads:56, resultLabel:'trials', pct:65},
    {label:'Google Ads',  color:'#EA4335', spend:2400, leads:28, resultLabel:'trials', pct:35},
  ],
  regionSplit:[{flag:'📍',label:'Local (5km)',pct:82},{flag:'🏘️',label:'Nearby',pct:14},{flag:'🌎',label:'Other',pct:4}],
  summary:{totalSpend:6800,totalLeads:84,avgCPL:81,metaSpend:4400,googleSpend:2400,metaLeads:56,googleLeads:28,totalOpportunities:28,pipelineAttributed:28000,roas:4.1,avgCTR:2.2,avgCPC:2.1,closingsAttributed:28,period:'Mock — last 30 days'},
  campaigns:[
    _ac('SF-A1','Pilates Trial Campaign','Meta',1800,28,64,2.6,9800,86,'active',false,'Local'),
    _ac('SF-A2','Yoga Membership Ads','Meta',1600,22,73,2.4,7700,82,'active',false,'Local'),
    _ac('SF-A3','Reformer Class Retargeting','Meta',1200,18,67,2.8,6300,84,'active',false,'Local'),
    _ac('SF-A4','Weekend Class Fill Campaign','Meta',1000,10,100,1.8,3500,36,'active',true,'Local'),
    _ac('SF-A5','HIIT Trial — Google Search','Google',1200,6,200,4.8,2100,68,'active',false,'Local'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause Weekend Class Fill — wrong time slots targeted','Save $1,000/mo','Quality score 36. Filling low-demand weekend slots. Retarget peak-hour class leads instead.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Pilates Trial — highest membership conversion','+12 members/mo','Quality score 86, 46% trial-to-member rate. Increase Pilates Trial to $80/day.','Increase Budget'),
    _ar(3,'opportunity','🎯','Retarget trial no-shows with reschedule offer','+8 memberships/mo','18 trial leads who did not attend. Reschedule message with 1 free trial credit. Expected CPL $60.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.education,{adsIntelligence:{
  period:'Paid Media · Meta + Google · Last 30 days',
  alertText:'2 broad awareness campaigns generating inquiries with 0 applications — $2.4K at risk →',
  metrics:[
    {label:'Total Spend',      value:'$9.6K',   sub:'30 days',            color:'text'},
    {label:'Inquiries',        value:'218',     sub:'$44 avg CPI',        color:'navyMid'},
    {label:'Applications',     value:'48',      sub:'22% inq→app rate',   color:'gold'},
    {label:'Completed Apps',   value:'32',      sub:'67% completion rate',color:'gold'},
    {label:'Enrollments',      value:'14',      sub:'44% app→enroll rate',color:'success'},
    {label:'Tuition Pipeline', value:'$1.8M',   sub:'Projected',          color:'success'},
    {label:'Cost/Enrollment',  value:'$686',    sub:'Fully attributed',   color:'text'},
    {label:'Avg CTR',          value:'2.6%',    sub:'All campaigns',      color:'text'},
  ],
  daily14:_d14(320,7),
  channelSplit:[
    {label:'Meta Ads',    color:'#1877F2', spend:5800, leads:138, resultLabel:'inquiries', pct:60},
    {label:'Google Ads',  color:'#EA4335', spend:3800, leads:80,  resultLabel:'inquiries', pct:40},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA/CA',pct:62},{flag:'🇲🇽',label:'LATAM',pct:24},{flag:'🌎',label:'Other',pct:14}],
  summary:{totalSpend:9600,totalLeads:218,avgCPL:44,metaSpend:5800,googleSpend:3800,metaLeads:138,googleLeads:80,totalOpportunities:48,pipelineAttributed:1800000,roas:187,avgCTR:2.6,avgCPC:1.6,closingsAttributed:14,period:'Mock — last 30 days'},
  campaigns:[
    _ac('BA-A1','Admissions Inquiry Campaign','Meta',2800,84,33,3.2,840000,86,'active',false,'USA/CA'),
    _ac('BA-A2','Open House Campaign','Meta',1800,46,39,2.8,420000,82,'active',false,'USA'),
    _ac('BA-A3','Middle School Program Ads','Google',2200,48,46,4.8,480000,80,'active',false,'USA/LATAM'),
    _ac('BA-A4','Application Deadline Retargeting','Google',1600,32,50,5.2,360000,84,'active',false,'USA'),
    _ac('BA-A5','Brand Awareness — Broad','Meta',1200,8,150,1.2,0,28,'active',true,'USA'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause Brand Awareness Broad — zero applications','Save $1,200/mo','Quality score 28. 8 inquiries, 0 applications. Poor audience targeting. Reallocate to retargeting.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Application Deadline Retargeting — highest completion rate','+8 enrollments/mo','Quality score 84. Deadline urgency drives 67% completion. Increase to $80/day near deadlines.','Increase Budget'),
    _ar(3,'opportunity','🎯','Retarget parents with missing documents near deadline','+6 completions/mo','Create audience from parents who started but did not finish application. Send checklist ad.','New Campaign'),
  ],
}});

Object.assign(window.VERTICAL_PROFILES.professional,{adsIntelligence:{
  period:'Paid Media · LinkedIn + Google · Last 30 days',
  alertText:'2 general practice campaigns producing low-fit inquiries — $2.2K at risk →',
  metrics:[
    {label:'Total Spend',       value:'$14.8K',  sub:'30 days',            color:'text'},
    {label:'Consultations',     value:'44',      sub:'$336 avg CPC',       color:'navyMid'},
    {label:'Qualified Intakes', value:'28',      sub:'64% qual. rate',     color:'gold'},
    {label:'Proposals',         value:'14',      sub:'50% intake→prop',    color:'gold'},
    {label:'Signed Engagements',value:'8',       sub:'57% proposal rate',  color:'success'},
    {label:'Matter Value',      value:'$3.1M',   sub:'Attributed',         color:'success'},
    {label:'CAC',               value:'$1,850',  sub:'Per signed client',  color:'text'},
    {label:'Avg CTR',           value:'0.7%',    sub:'All campaigns',      color:'text'},
  ],
  daily14:_d14(493,1),
  channelSplit:[
    {label:'LinkedIn Ads', color:'#0A66C2', spend:9600, leads:28, resultLabel:'consultations', pct:65},
    {label:'Google Ads',   color:'#EA4335', spend:5200, leads:16, resultLabel:'consultations', pct:35},
  ],
  regionSplit:[{flag:'🇺🇸',label:'USA',pct:72},{flag:'🇬🇧',label:'UK/EU',pct:18},{flag:'🌎',label:'Other',pct:10}],
  summary:{totalSpend:14800,totalLeads:44,avgCPL:336,metaSpend:9600,googleSpend:5200,metaLeads:28,googleLeads:16,totalOpportunities:28,pipelineAttributed:3100000,roas:209,avgCTR:0.7,avgCPC:14.2,closingsAttributed:8,period:'Mock — last 30 days'},
  campaigns:[
    _ac('LP-A1','Corporate Advisory Campaign','LinkedIn',4800,14,343,0.8,1400000,86,'active',false,'USA/EU'),
    _ac('LP-A2','Real Estate Closing Leads','Google',3200,12,267,1.1,840000,82,'active',false,'USA'),
    _ac('LP-A3','Tax Advisory Retargeting','LinkedIn',2800,8,350,0.7,420000,80,'active',false,'USA'),
    _ac('LP-A4','Consultation Booking Ads','Google',2000,4,500,0.6,240000,76,'active',false,'USA'),
    _ac('LP-A5','General Practice — Broad','LinkedIn',2000,6,333,0.5,0,28,'active',true,'USA'),
  ],
  recommendations:[
    _ar(1,'urgent','⛔','Pause General Practice Broad — zero signed engagements','Save $2,000/mo','Quality score 28. 6 consultations, 0 signed. Low practice-area fit. Pause and rebuild with specific matter targeting.','Pause Campaign'),
    _ar(2,'scale','🚀','Scale Corporate Advisory — highest matter value','+3 signed engagements/mo','Quality score 86. Avg matter value $480K. Increase from $160/day to $240/day.','Increase Budget'),
    _ar(3,'opportunity','🎯','Retarget qualified intakes who did not book consultation','+4 consultations/mo','Create audience from intake form visitors who did not book in last 14 days. Expected CPL $280.','New Campaign'),
  ],
}});

// ─── CONTENT MANAGER DATA ─────────────────────────────────────────────────────
// Helpers
function _ch(id,name,handle,color,followers,growth,posts,reach,eng,last){return{id,name,handle,color,followers,followerGrowth:growth,posts,reach,engagementRate:eng,impressions:Math.round(reach*2.3),avgLikes:Math.round(reach*eng/100/posts*0.8),avgComments:Math.round(reach*eng/100/posts*0.08),status:'connected',lastPost:last};}
function _sp(id,plat,title,preview,date,reach,likes,comments,eng,campaign,owner){return{id,platform:plat,title,previewText:preview,date,time:'10:00',reach,likes,comments,engagement:eng+'%',campaign,owner,status:'published'};}
function _cal(id,date,time,plat,title,campaign,owner,status){return{id,date,time,platform:plat,title,campaign,owner,status};}
function _apv(id,title,plat,campaign,preview,status,note,owner){return{id,title,platform:plat,campaign,previewText:preview,status,lastUpdate:'May 14 · 10:00',note,owner};}
function _cm(channels,socialPosts,calendar,approvals,insights){return{channels,socialPosts,calendar,approvals,insights};}

Object.assign(window.VERTICAL_PROFILES.clinics,{contentManager:_cm(
  [_ch('ig','Instagram','@vitaclinic','#E1306C',12840,224,198,96000,5.2,'3h ago'),_ch('fb','Facebook','Vita Clinic Health','#1877F2',7320,64,142,62000,2.8,'6h ago'),_ch('li','LinkedIn','Vita Clinic Specialists','#0A66C2',3180,42,88,24000,4.1,'2d ago')],
  [_sp('VS1','ig','Meet Dr. Roberts — Orthopedic Specialist','20+ years in joint replacement. 98% patient satisfaction. Book your consultation today.','May 14',7200,580,28,8.4,'Doctor Spotlight','Dr. Roberts'),_sp('VS2','fb','Patient Recovery Story — Hip Replacement','After 3 years of pain, María is walking again. Read her journey.','May 13',4800,312,44,7.4,'Testimonials','Dr. Vega'),_sp('VS3','li','Q1 Surgical Outcomes Report','96.2% success rate in joint replacements. See our full Q1 clinical outcomes.','May 12',2800,102,26,4.6,'Clinical Excellence','Dr. Chen'),_sp('VS4','ig','Post-op Care Tips from Dr. Vega','Top 5 things to do in your first week after surgery. Save this!','May 11',6100,490,34,8.6,'Health Education','Dr. Vega'),_sp('VS5','fb','Free Health Check-up — Limited Slots','Book your complimentary preventive check-up. Only 20 slots available.','May 10',5400,288,38,6.0,'Promotions','Dr. Roberts')],
  [_cal('VC1','2026-05-15','09:00','ig','Dr. Roberts Q&A — Joint Pain Answers','Doctor Spotlight','Dr. Roberts','scheduled'),_cal('VC2','2026-05-15','12:00','fb','Recovery Week 1 — What to Expect','Health Education','Dr. Vega','scheduled'),_cal('VC3','2026-05-16','10:00','li','Cosmetic Surgery Safety Standards','Clinical Excellence','Dr. Chen','pending'),_cal('VC4','2026-05-17','09:30','fb','Free Check-up Reminder','Promotions','Dr. Vega','approved'),_cal('VC5','2026-05-18','11:00','ig','Hip Replacement Walkthrough Video','Doctor Spotlight','Dr. Roberts','wip')],
  [_apv('VA1','Dr. Roberts Q&A — Joint Pain','ig','Doctor Spotlight','Got joint pain questions? Dr. Roberts answers the top 5 in our latest reel.','pending','Awaiting Dr. Roberts sign-off.','Dr. Roberts'),_apv('VA2','Free Health Check-up Offer','fb','Promotions','Book your free preventive check-up before May 31. Limited slots available.','approved','Approved. Ready to boost.','Dr. Vega'),_apv('VA3','Hip Replacement Walkthrough','ig','Doctor Spotlight','Step inside our orthopedic suite. Safe, modern, compassionate care. DM to book.','wip','Draft copy pending final medical review.','Dr. Chen')],
  {totalReach:182000,totalEngagement:'6.1%',followerGrowth:'+330 this month',bestPlatform:'Instagram',bestPost:'Dr. Roberts — Orthopedic Spotlight',pendingApprovals:1,wipPosts:2,approvedPosts:6,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:96000,engagement:'7.2%',growth:'224',posts:5,bestPost:'Dr. Roberts Spotlight'},{platform:'Facebook',color:'#1877F2',reach:62000,engagement:'5.1%',growth:'64',posts:4,bestPost:'Patient Recovery Story'},{platform:'LinkedIn',color:'#0A66C2',reach:24000,engagement:'4.1%',growth:'42',posts:3,bestPost:'Q1 Surgical Outcomes'}],campaignBreakdown:[{campaign:'Doctor Spotlight',posts:3,reach:52000,engagement:'8.1%',status:'active'},{campaign:'Testimonials',posts:2,reach:38000,engagement:'7.4%',status:'active'},{campaign:'Health Education',posts:3,reach:46000,engagement:'6.2%',status:'active'},{campaign:'Clinical Excellence',posts:2,reach:18000,engagement:'4.4%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.restaurants,{contentManager:_cm(
  [_ch('ig','Instagram','@mesagroup','#E1306C',14200,312,210,108000,6.4,'2h ago'),_ch('fb','Facebook','Mesa Group Dining','#1877F2',8100,88,164,74000,3.2,'5h ago'),_ch('li','LinkedIn','Mesa Events','#0A66C2',2480,38,72,18000,2.8,'1d ago')],
  [_sp('MS1','ig','Weekend Special — Terrace Dining','Golden hour on our terrace. Saturday 7 PM. Reserve your table now.','May 14',8400,680,42,8.8,'Weekend Reservations','Manager Sofia'),_sp('MS2','fb','Private Event Package — Contact Us','Corporate events, weddings, birthdays. Full buyout available. Enquire today.','May 13',5200,240,38,5.3,'Private Events','Manager Sofia'),_sp('MS3','ig','Chef\'s Special — Truffle Risotto','Tonight only. Chef Marco\'s signature truffle risotto. Limited tables. Book now.','May 12',7100,580,30,8.6,'Chef Specials','Chef Marco'),_sp('MS4','fb','Lunch Menu — New Arrivals','Fresh, seasonal, locally sourced. Our updated lunch menu is live. Come try it.','May 11',4400,188,22,4.8,'Lunch Specials','Manager Sofia'),_sp('MS5','li','Private Dining & Corporate Events','Host your next board dinner or client event at Mesa. Dedicated team, custom menu.','May 10',2200,88,18,4.8,'Corporate Events','Manager Sofia')],
  [_cal('MC1','2026-05-15','09:00','ig','Weekend Terrace — Book Now','Weekend Reservations','Manager Sofia','scheduled'),_cal('MC2','2026-05-15','12:00','fb','Private Event — Last Spots This Month','Private Events','Manager Sofia','scheduled'),_cal('MC3','2026-05-16','18:00','ig','Friday Night Special — Chef Marco','Chef Specials','Chef Marco','pending'),_cal('MC4','2026-05-17','11:00','fb','Lunch Menu Highlight Reel','Lunch Specials','Manager Sofia','approved'),_cal('MC5','2026-05-18','10:00','li','Corporate Dining Solutions','Corporate Events','Manager Sofia','wip')],
  [_apv('MA1','Weekend Terrace Campaign','ig','Weekend Reservations','Golden hour on our terrace. Saturday 7 PM. Only 4 tables left. Reserve now.','pending','Awaiting final photo from photographer.','Manager Sofia'),_apv('MA2','Private Event — June Availability','fb','Private Events','June bookings open. Full restaurant buyout from $8,000. Enquire today.','approved','Approved. Schedule for Friday.','Manager Sofia'),_apv('MA3','Chef\'s Weekly Special Post','ig','Chef Specials','This week Chef Marco presents: Pan-seared seabass with citrus beurre blanc. Limited covers.','wip','Draft pending menu confirmation from kitchen.','Chef Marco')],
  {totalReach:200000,totalEngagement:'6.8%',followerGrowth:'+438 this month',bestPlatform:'Instagram',bestPost:'Weekend Terrace Dining',pendingApprovals:1,wipPosts:2,approvedPosts:7,rejectedPosts:1,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:108000,engagement:'8.2%',growth:'312',posts:6,bestPost:'Weekend Terrace Special'},{platform:'Facebook',color:'#1877F2',reach:74000,engagement:'4.6%',growth:'88',posts:5,bestPost:'Private Event Package'},{platform:'LinkedIn',color:'#0A66C2',reach:18000,engagement:'3.2%',growth:'38',posts:2,bestPost:'Corporate Dining'}],campaignBreakdown:[{campaign:'Weekend Reservations',posts:4,reach:68000,engagement:'8.4%',status:'active'},{campaign:'Private Events',posts:3,reach:48000,engagement:'5.8%',status:'active'},{campaign:'Chef Specials',posts:3,reach:44000,engagement:'7.6%',status:'active'},{campaign:'Lunch Specials',posts:2,reach:28000,engagement:'4.2%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.tourism,{contentManager:_cm(
  [_ch('ig','Instagram','@pacificescapes','#E1306C',18600,428,246,142000,7.2,'1h ago'),_ch('fb','Facebook','Pacific Escapes Travel','#1877F2',10200,124,184,88000,3.8,'4h ago'),_ch('li','LinkedIn','Pacific Escapes Experiences','#0A66C2',2880,48,92,22000,3.4,'1d ago')],
  [_sp('PS1','ig','Ocean View Room — Available Jun','Wake up to this. Ocean view villa available June 22. DM to book.','May 14',9200,740,48,8.6,'Ocean View Campaign','Travel Advisor Ana'),_sp('PS2','fb','Sunset Catamaran — Book for Summer','4 hours on the Pacific. Snorkeling, cocktails, sunset. Only 12 guests per departure.','May 13',5800,320,34,6.1,'Catamaran Ads','Travel Advisor Ana'),_sp('PS3','ig','Rainforest Canopy Tour — New Route','Our new 2km canopy route just launched. Half-day adventure. Book from $480.','May 12',7400,600,36,8.6,'Rainforest Campaign','Travel Advisor Ana'),_sp('PS4','fb','Low Season Special — Jun & Jul','50% off select experiences in June and July. Limited availability.','May 11',4600,228,28,5.6,'Low Season Push','Travel Advisor Ana'),_sp('PS5','ig','Guest Story — Williams Family','A week of memories. From rainforest to ocean. Hear what the Williams family said.','May 10',7800,640,52,8.8,'Testimonials','Travel Advisor Ana')],
  [_cal('PC1','2026-05-15','09:00','ig','Ocean View — June Availability Alert','Ocean View Campaign','Travel Advisor Ana','scheduled'),_cal('PC2','2026-05-15','12:00','fb','Low Season Offer — June & July','Low Season Push','Travel Advisor Ana','scheduled'),_cal('PC3','2026-05-16','10:00','ig','Catamaran Tour — Sunset Video','Catamaran Ads','Travel Advisor Ana','pending'),_cal('PC4','2026-05-17','11:00','fb','Guest Story — Lee Group','Testimonials','Travel Advisor Ana','approved'),_cal('PC5','2026-05-18','09:00','ig','Rainforest Canopy — New Route Launch','Rainforest Campaign','Travel Advisor Ana','wip')],
  [_apv('PA1','Ocean View June Availability','ig','Ocean View Campaign','June 22 is open. Wake up to this view. Ocean villa from $5,600 for 4 nights. Book now.','pending','Awaiting final property photo approval.','Travel Advisor Ana'),_apv('PA2','Low Season Offer — June Deals','fb','Low Season Push','50% off select packages in June & July. Rainforest, ocean, adventure. Limited slots.','approved','Approved. Boost from Friday.','Travel Advisor Ana'),_apv('PA3','Catamaran Sunset Video','ig','Catamaran Ads','Sunset over the Pacific from a private catamaran. 4 hours of pure experience.','wip','Video edit in progress. Ready Thursday.','Travel Advisor Ana')],
  {totalReach:252000,totalEngagement:'7.1%',followerGrowth:'+600 this month',bestPlatform:'Instagram',bestPost:'Guest Story — Williams Family',pendingApprovals:1,wipPosts:1,approvedPosts:8,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:142000,engagement:'8.4%',growth:'428',posts:7,bestPost:'Guest Story — Williams Family'},{platform:'Facebook',color:'#1877F2',reach:88000,engagement:'5.2%',growth:'124',posts:5,bestPost:'Catamaran Campaign'},{platform:'LinkedIn',color:'#0A66C2',reach:22000,engagement:'3.4%',growth:'48',posts:2,bestPost:'Pacific Escapes Brand'}],campaignBreakdown:[{campaign:'Ocean View Campaign',posts:4,reach:72000,engagement:'8.2%',status:'active'},{campaign:'Catamaran Ads',posts:3,reach:56000,engagement:'7.4%',status:'active'},{campaign:'Rainforest Campaign',posts:3,reach:48000,engagement:'8.1%',status:'active'},{campaign:'Low Season Push',posts:2,reach:32000,engagement:'5.8%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.retail,{contentManager:_cm(
  [_ch('ig','Instagram','@novaretail','#E1306C',24800,568,324,188000,5.8,'1h ago'),_ch('fb','Facebook','Nova Retail Shop','#1877F2',14200,188,228,114000,3.2,'3h ago'),_ch('li','LinkedIn','Nova Retail Deals','#0A66C2',3420,54,108,26000,2.4,'1d ago')],
  [_sp('NR1','ig','Skincare Bundle — Best Seller 🔥','Our top selling skincare bundle is back in stock. Limited units. Shop now.','May 14',9800,780,52,8.4,'Best Seller Campaign','Content Team'),_sp('NR2','fb','Cart Recovery — 10% Off This Weekend','Left something in your cart? Use code SAVE10 until Sunday. Don\'t miss out.','May 13',6200,288,34,5.2,'Cart Recovery Ads','Content Team'),_sp('NR3','ig','New Collection — Summer Drop','The Summer 2026 collection is here. 28 new styles. Shop before they\'re gone.','May 12',8400,680,44,8.6,'New Collection Launch','Content Team'),_sp('NR4','fb','VIP Customers — Early Access','As a VIP, you get first access to our next drop. Check your inbox.','May 11',5400,220,28,4.6,'VIP Retargeting','Content Team'),_sp('NR5','ig','Bundle of the Week — Save 20%','Mix and match. Build your own bundle and save 20%. This week only.','May 10',7200,580,38,8.4,'Bundle Promotions','Content Team')],
  [_cal('NRC1','2026-05-15','09:00','ig','Skincare Bundle — Restock Alert','Best Seller Campaign','Content Team','scheduled'),_cal('NRC2','2026-05-15','12:00','fb','Cart Recovery Weekend Push','Cart Recovery Ads','Content Team','scheduled'),_cal('NRC3','2026-05-16','10:00','ig','Summer Collection Day 2 Reveal','New Collection Launch','Content Team','pending'),_cal('NRC4','2026-05-17','14:00','fb','VIP Sneak Peek — Next Drop','VIP Retargeting','Content Team','approved'),_cal('NRC5','2026-05-18','10:00','ig','Bundle Monday — 20% Off This Week','Bundle Promotions','Content Team','wip')],
  [_apv('NRA1','Skincare Bundle Restock Alert','ig','Best Seller Campaign','Back in stock! Our #1 best seller. Only 48 units remaining. Shop before they\'re gone.','pending','Awaiting stock confirmation before posting.','Content Team'),_apv('NRA2','Cart Recovery — SAVE10 Weekend','fb','Cart Recovery Ads','You left something in your cart. Use code SAVE10 for 10% off this weekend only.','approved','Approved. Auto-schedule for Friday 9 PM.','Content Team'),_apv('NRA3','Summer Collection Day 2','ig','New Collection Launch','Day 2 of our summer drop: beachwear, accessories, and must-haves. Shop the link.','wip','Copy approved. Waiting for final product photos.','Content Team')],
  {totalReach:328000,totalEngagement:'5.6%',followerGrowth:'+810 this month',bestPlatform:'Instagram',bestPost:'New Collection — Summer Drop',pendingApprovals:1,wipPosts:2,approvedPosts:9,rejectedPosts:1,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:188000,engagement:'6.8%',growth:'568',posts:8,bestPost:'Summer Collection Drop'},{platform:'Facebook',color:'#1877F2',reach:114000,engagement:'4.2%',growth:'188',posts:6,bestPost:'Cart Recovery Weekend'},{platform:'LinkedIn',color:'#0A66C2',reach:26000,engagement:'2.4%',growth:'54',posts:2,bestPost:'Brand Story'}],campaignBreakdown:[{campaign:'Best Seller Campaign',posts:4,reach:84000,engagement:'7.2%',status:'active'},{campaign:'Cart Recovery Ads',posts:3,reach:58000,engagement:'5.4%',status:'active'},{campaign:'New Collection Launch',posts:4,reach:72000,engagement:'8.1%',status:'active'},{campaign:'VIP Retargeting',posts:2,reach:44000,engagement:'4.8%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.b2b,{contentManager:_cm(
  [_ch('ig','Instagram','@atlasadvisory','#E1306C',4200,88,84,32000,3.4,'8h ago'),_ch('fb','Facebook','Atlas Advisory','#1877F2',3800,52,68,28000,2.2,'1d ago'),_ch('li','LinkedIn','Atlas Executive Insights','#0A66C2',18400,324,248,142000,6.8,'2h ago')],
  [_sp('AA1','li','The 3 Strategic Levers CEOs Miss in Q2','Most CEOs focus on revenue. The best ones focus on margin, velocity, and retention.','May 14',14200,480,62,7.4,'Executive Insights','Alexandra Rios'),_sp('AA2','li','Webinar Recap — CFO Roundtable on M&A','42 CFOs shared how they approach acquisitions under uncertainty. Key takeaways inside.','May 13',9800,320,48,5.8,'Executive Webinar','David Park'),_sp('AA3','ig','Case Study — TechCorp Digital Transformation','From siloed operations to unified growth. How TechCorp scaled 40% in 18 months.','May 12',5200,280,24,5.8,'Case Studies','Alexandra Rios'),_sp('AA4','fb','Consulting Insight — When to Scale vs Fix','Scale a broken system and you scale the problems. Our framework for the right call.','May 11',4400,148,18,3.8,'Consulting Framework','David Park'),_sp('AA5','li','Proposal Conversion: What Decides Yes or No','After 300+ proposals, here are the 5 factors that close enterprise deals.','May 10',11200,440,54,7.8,'Sales Enablement','Alexandra Rios')],
  [_cal('AC1','2026-05-15','08:00','li','Strategic Levers Q2 — Carousel Post','Executive Insights','Alexandra Rios','scheduled'),_cal('AC2','2026-05-15','12:00','li','M&A Webinar Registration — Last Spots','Executive Webinar','David Park','scheduled'),_cal('AC3','2026-05-16','09:00','ig','TechCorp Case Study — Part 2','Case Studies','Alexandra Rios','pending'),_cal('AC4','2026-05-17','10:00','fb','How We Helped NovaBanc Compliance','Case Studies','Ingrid Müller','approved'),_cal('AC5','2026-05-18','08:00','li','5 Proposal Conversion Factors','Sales Enablement','Alexandra Rios','wip')],
  [_apv('AVA1','CFO Roundtable Recap Carousel','li','Executive Webinar','42 CFOs. One room. Here are the 5 most cited challenges in M&A decision-making.','pending','Awaiting legal review of anonymised data.','Alexandra Rios'),_apv('AVA2','TechCorp Case Study — Published','ig','Case Studies','From 0 to 40% growth in 18 months. The TechCorp digital transformation story.','approved','Approved by client relations. Schedule May 16.','Alexandra Rios'),_apv('AVA3','5 Proposal Conversion Factors','li','Sales Enablement','After 300 proposals here are the signals that separate yes from no in enterprise deals.','wip','Draft copy in review. Expected ready Wed.','David Park')],
  {totalReach:202000,totalEngagement:'5.8%',followerGrowth:'+464 this month',bestPlatform:'LinkedIn',bestPost:'Strategic Levers CEOs Miss in Q2',pendingApprovals:1,wipPosts:1,approvedPosts:8,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:32000,engagement:'4.2%',growth:'88',posts:3,bestPost:'TechCorp Case Study'},{platform:'Facebook',color:'#1877F2',reach:28000,engagement:'2.8%',growth:'52',posts:2,bestPost:'Consulting Framework'},{platform:'LinkedIn',color:'#0A66C2',reach:142000,engagement:'7.2%',growth:'324',posts:8,bestPost:'Strategic Levers Q2'}],campaignBreakdown:[{campaign:'Executive Insights',posts:4,reach:68000,engagement:'7.1%',status:'active'},{campaign:'Executive Webinar',posts:3,reach:48000,engagement:'6.2%',status:'active'},{campaign:'Case Studies',posts:3,reach:42000,engagement:'5.8%',status:'active'},{campaign:'Sales Enablement',posts:2,reach:34000,engagement:'7.4%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.logistics,{contentManager:_cm(
  [_ch('ig','Instagram','@freightcore','#E1306C',3800,68,62,28000,2.8,'12h ago'),_ch('fb','Facebook','FreightCore Logistics','#1877F2',4200,74,84,34000,2.4,'8h ago'),_ch('li','LinkedIn','FreightCore LinkedIn','#0A66C2',12400,248,188,98000,5.2,'3h ago')],
  [_sp('FC1','li','APAC to USA Lane — New Q3 Rates','Competitive rates for APAC-to-USA LCL and FCL now available. Get your quote today.','May 14',9800,280,38,4.2,'APAC Lane Campaign','Kevin Sales'),_sp('FC2','li','Cold Chain Logistics — What Makes Us Different','Temperature-controlled, GPS-tracked, insured end-to-end. See our cold chain network.','May 13',7200,220,32,3.8,'Cold Chain Ads','Kevin Sales'),_sp('FC3','fb','RFQ in 24 Hours — No Waiting','Send us your RFQ and get a competitive quote within 24 hours. Any lane, any volume.','May 12',4800,148,22,3.6,'RFQ Retargeting','Kevin Sales'),_sp('FC4','li','Warehouse Capacity — Available June','24,000 sqft available in Los Angeles starting June 1. Climate controlled, secured.','May 11',6400,198,28,3.8,'Warehouse Capacity','Kevin Sales'),_sp('FC5','fb','On-Time Delivery — 98.4% Track Record','Reliability is not a promise. It\'s our track record. 98.4% on-time across all lanes.','May 10',3800,108,14,3.2,'Brand Trust','Kevin Sales')],
  [_cal('FCC1','2026-05-15','08:00','li','Q3 APAC Rate Sheet — Available Now','APAC Lane Campaign','Kevin Sales','scheduled'),_cal('FCC2','2026-05-15','12:00','li','Cold Chain Network — Infographic','Cold Chain Ads','Kevin Sales','scheduled'),_cal('FCC3','2026-05-16','09:00','fb','24h RFQ — This Week Only','RFQ Retargeting','Kevin Sales','pending'),_cal('FCC4','2026-05-17','10:00','li','LA Warehouse — June Availability','Warehouse Capacity','Kevin Sales','approved'),_cal('FCC5','2026-05-18','09:00','fb','98.4% On-Time — Client Stories','Brand Trust','Kevin Sales','wip')],
  [_apv('FCA1','APAC Q3 Rate Sheet Post','li','APAC Lane Campaign','APAC-to-USA LCL from $1,650/container. FCL from $4,200. Valid April–June 2026.','pending','Awaiting final rate confirmation from ops team.','Kevin Sales'),_apv('FCA2','Cold Chain Infographic','li','Cold Chain Ads','From farm to shelf. Our cold chain network covers 42 countries with zero excursions.','approved','Approved. Post Monday 8 AM for LinkedIn algorithm.','Kevin Sales'),_apv('FCA3','24h RFQ Launch Post','fb','RFQ Retargeting','Got freight? Send us your RFQ and receive a competitive quote in under 24 hours.','wip','Design in progress. Copy approved.','Kevin Sales')],
  {totalReach:160000,totalEngagement:'3.8%',followerGrowth:'+390 this month',bestPlatform:'LinkedIn',bestPost:'APAC to USA Lane Rates',pendingApprovals:1,wipPosts:1,approvedPosts:6,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:28000,engagement:'3.2%',growth:'68',posts:2,bestPost:'Brand Campaign'},{platform:'Facebook',color:'#1877F2',reach:34000,engagement:'3.4%',growth:'74',posts:4,bestPost:'RFQ 24h Campaign'},{platform:'LinkedIn',color:'#0A66C2',reach:98000,engagement:'4.4%',growth:'248',posts:7,bestPost:'APAC Lane Rates'}],campaignBreakdown:[{campaign:'APAC Lane Campaign',posts:3,reach:42000,engagement:'4.2%',status:'active'},{campaign:'Cold Chain Ads',posts:2,reach:36000,engagement:'3.8%',status:'active'},{campaign:'RFQ Retargeting',posts:3,reach:28000,engagement:'3.6%',status:'active'},{campaign:'Warehouse Capacity',posts:2,reach:24000,engagement:'3.4%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.wellness,{contentManager:_cm(
  [_ch('ig','Instagram','@studioforma','#E1306C',16200,368,228,124000,7.4,'2h ago'),_ch('fb','Facebook','Studio Forma Pilates','#1877F2',6400,88,148,52000,3.8,'6h ago'),_ch('li','LinkedIn','Studio Forma Wellness','#0A66C2',2200,32,64,14000,3.2,'2d ago')],
  [_sp('SF1','ig','Pilates Trial — Book This Week 🧘','First class on us. Book your Pilates Foundations trial this week. Only 3 spots left.','May 14',8800,720,44,8.6,'Pilates Trial Campaign','Coach Maya'),_sp('SF2','ig','Instructor Spotlight — Coach Leila','Leila has been teaching Pilates for 12 years. 98% of her trial students convert.','May 13',7200,580,38,8.8,'Instructor Spotlight','Coach Leila'),_sp('SF3','fb','This Week\'s Class Schedule — Full Update','Updated weekly schedule. Pilates, HIIT, Yoga, Boxing. Book your spot before it fills.','May 12',4800,208,28,5.0,'Class Schedule','Coach Maya'),_sp('SF4','ig','Annual Membership — Save $180 vs Monthly','Unlimited classes. 12 months. Save $180 compared to paying monthly.','May 11',6400,520,34,8.6,'Membership Offer','Coach Carlos'),_sp('SF5','fb','Member Story — Rachel Kim Lost 12kg','8 months of Pilates and HIIT. Rachel shares how Studio Forma changed her routine.','May 10',5200,288,42,6.3,'Testimonials','Coach Maya')],
  [_cal('SFC1','2026-05-15','09:00','ig','Pilates Trial — 3 Spots Left (Urgency)','Pilates Trial Campaign','Coach Maya','scheduled'),_cal('SFC2','2026-05-15','12:00','fb','Class Schedule — Week of May 19','Class Schedule','Coach Maya','scheduled'),_cal('SFC3','2026-05-16','09:00','ig','Coach Leila — Reformer Pilates Demo','Instructor Spotlight','Coach Leila','pending'),_cal('SFC4','2026-05-17','10:00','fb','Annual Membership — Last Days Offer','Membership Offer','Coach Carlos','approved'),_cal('SFC5','2026-05-18','09:00','ig','Rachel Kim — 8 Month Transformation','Testimonials','Coach Maya','wip')],
  [_apv('SFA1','Pilates Trial — 3 Spots Urgent','ig','Pilates Trial Campaign','Only 3 spots left in Thursday 9 AM Pilates Foundations. Your first class is on us.','pending','Awaiting confirmation of spot availability from coach.','Coach Maya'),_apv('SFA2','Annual Membership Offer Post','fb','Membership Offer','Unlimited Pilates, HIIT, Yoga, and Boxing for $840/year. Save $180 vs monthly.','approved','Approved. Schedule for Friday 8 AM peak engagement.','Coach Carlos'),_apv('SFA3','Rachel Kim 8 Month Story','ig','Testimonials','From couch to Pilates queen. Rachel lost 12kg and gained confidence in 8 months.','wip','Client photo release pending. Copy approved.','Coach Maya')],
  {totalReach:190000,totalEngagement:'7.0%',followerGrowth:'+488 this month',bestPlatform:'Instagram',bestPost:'Instructor Spotlight — Coach Leila',pendingApprovals:1,wipPosts:1,approvedPosts:7,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:124000,engagement:'8.4%',growth:'368',posts:7,bestPost:'Coach Leila Spotlight'},{platform:'Facebook',color:'#1877F2',reach:52000,engagement:'4.6%',growth:'88',posts:5,bestPost:'Member Transformation'},{platform:'LinkedIn',color:'#0A66C2',reach:14000,engagement:'3.2%',growth:'32',posts:2,bestPost:'Wellness at Work'}],campaignBreakdown:[{campaign:'Pilates Trial Campaign',posts:4,reach:56000,engagement:'8.6%',status:'active'},{campaign:'Instructor Spotlight',posts:3,reach:42000,engagement:'8.2%',status:'active'},{campaign:'Membership Offer',posts:2,reach:32000,engagement:'6.4%',status:'active'},{campaign:'Testimonials',posts:3,reach:38000,engagement:'7.4%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.education,{contentManager:_cm(
  [_ch('ig','Instagram','@brightpathacademy','#E1306C',8400,188,148,64000,5.8,'4h ago'),_ch('fb','Facebook','BrightPath Admissions','#1877F2',12800,248,196,98000,4.4,'2h ago'),_ch('li','LinkedIn','BrightPath Families','#0A66C2',4600,88,108,34000,4.2,'8h ago')],
  [_sp('BA1','fb','Open House — May 24 — Register Now','Visit our campus, meet faculty, see the programs. Free. Family welcome. Seats filling fast.','May 14',9200,480,48,5.8,'Open House Campaign','Admissions Sara'),_sp('BA2','ig','MBA Program 2026 — 6 Spots Left','Last 6 spots in our September MBA cohort. Applications close May 30.','May 13',7400,580,38,8.4,'MBA Campaign','Admissions Sara'),_sp('BA3','fb','Parent FAQ — What Parents Ask Most','Tuition, schedule, scholarships, career outcomes. We answered the 10 most asked questions.','May 12',6800,288,44,5.0,'Parent Education','Admissions Sara'),_sp('BA4','ig','Data Science Bootcamp — Jul Intake','6 months. Hands-on. Career-ready. 22 students enrolled. 8 spots left.','May 11',5600,440,28,8.4,'Bootcamp Campaign','Admissions Sara'),_sp('BA5','li','Graduate Outcomes 2025 — 94% Placed','Our 2025 graduates achieved 94% placement within 3 months. See where they landed.','May 10',6200,188,32,4.8,'Graduate Outcomes','Admissions Sara')],
  [_cal('BC1','2026-05-15','09:00','fb','Open House May 24 — Final Reminder','Open House Campaign','Admissions Sara','scheduled'),_cal('BC2','2026-05-15','12:00','ig','MBA — Only 6 Spots. Apply Now.','MBA Campaign','Admissions Sara','scheduled'),_cal('BC3','2026-05-16','10:00','fb','Application Checklist — Parent Guide','Parent Education','Admissions Sara','pending'),_cal('BC4','2026-05-17','09:00','ig','Data Science Bootcamp Jul — Last Week','Bootcamp Campaign','Admissions Sara','approved'),_cal('BC5','2026-05-18','11:00','li','Alumni Story — From Student to Startup','Graduate Outcomes','Admissions Sara','wip')],
  [_apv('BA1A','Open House Final Reminder','fb','Open House Campaign','May 24. Campus open 9 AM – 1 PM. Meet faculty. Explore programs. Family welcome.','pending','Awaiting principal approval before boosting.','Admissions Sara'),_apv('BA2A','MBA — 6 Spots Urgency Post','ig','MBA Campaign','Only 6 seats remain in our September MBA cohort. Applications close May 30. Apply today.','approved','Approved. Boost $80/day through May 28.','Admissions Sara'),_apv('BA3A','Data Science Jul — Last Week','ig','Bootcamp Campaign','Last week to apply for our July Data Science Bootcamp. 8 spots. Scholarship available.','wip','Copy in review. Design pending.','Admissions Sara')],
  {totalReach:196000,totalEngagement:'5.4%',followerGrowth:'+524 this month',bestPlatform:'Facebook',bestPost:'Open House May 24 Campaign',pendingApprovals:1,wipPosts:1,approvedPosts:8,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:64000,engagement:'8.2%',growth:'188',posts:5,bestPost:'MBA 6 Spots Urgency'},{platform:'Facebook',color:'#1877F2',reach:98000,engagement:'5.0%',growth:'248',posts:6,bestPost:'Open House Campaign'},{platform:'LinkedIn',color:'#0A66C2',reach:34000,engagement:'4.4%',growth:'88',posts:3,bestPost:'Graduate Outcomes 2025'}],campaignBreakdown:[{campaign:'Open House Campaign',posts:4,reach:58000,engagement:'6.1%',status:'active'},{campaign:'MBA Campaign',posts:3,reach:44000,engagement:'8.4%',status:'active'},{campaign:'Bootcamp Campaign',posts:3,reach:38000,engagement:'7.8%',status:'active'},{campaign:'Parent Education',posts:2,reach:32000,engagement:'4.8%',status:'active'}]}
)});

Object.assign(window.VERTICAL_PROFILES.professional,{contentManager:_cm(
  [_ch('ig','Instagram','@lexapartners','#E1306C',3200,52,64,22000,3.2,'1d ago'),_ch('fb','Facebook','Lexa Partners Advisory','#1877F2',4600,68,84,36000,2.8,'8h ago'),_ch('li','LinkedIn','Lexa Legal Insights','#0A66C2',16400,288,228,128000,6.4,'2h ago')],
  [_sp('LP1','li','5 Things Every Board Should Know Before an Acquisition','Most M&A transactions fail at integration. Here are the 5 questions your board should ask first.','May 14',12400,420,54,6.8,'Corporate Advisory','Alexandra Rios'),_sp('LP2','li','Real Estate Closing — What Can Go Wrong','Title issues, covenant breaches, delayed funding. Our team has seen it all. Here\'s how we protect you.','May 13',8800,280,38,5.2,'RE Closing Leads','Alexandra Rios'),_sp('LP3','fb','Tax Season Advisory — Book a Consultation','Complex tax situation? Our tax advisory team handles corporate, trust, and international tax.','May 12',5200,188,22,4.0,'Tax Advisory','Ingrid Müller'),_sp('LP4','li','Employment Law — What Triggers Wrongful Termination','3 in 5 employers misclassify dismissals. Here is what the law actually says.','May 11',9600,360,48,6.2,'Employment Law','David Park'),_sp('LP5','fb','Consultation Booking — Now Online','Book a 30-minute consultation with our partners directly from our website. Free for new clients.','May 10',4400,148,18,3.8,'Consultation Booking','Alexandra Rios')],
  [_cal('LC1','2026-05-15','08:00','li','M&A Board Checklist — Carousel','Corporate Advisory','Alexandra Rios','scheduled'),_cal('LC2','2026-05-15','12:00','fb','Tax Advisory — Book May Consultation','Tax Advisory','Ingrid Müller','scheduled'),_cal('LC3','2026-05-16','09:00','li','Wrongful Termination — Case Summary','Employment Law','David Park','pending'),_cal('LC4','2026-05-17','10:00','fb','Client Story — Successful RE Closing','RE Closing Leads','Alexandra Rios','approved'),_cal('LC5','2026-05-18','08:00','li','5 Signs You Need Outside Legal Counsel','Corporate Advisory','Alexandra Rios','wip')],
  [_apv('LA1','M&A Board Checklist Carousel','li','Corporate Advisory','5 questions every board should ask before signing an acquisition. Practical. Tested.','pending','Awaiting partner review and compliance check.','Alexandra Rios'),_apv('LA2','Tax Advisory May Offer','fb','Tax Advisory','Complex tax situation? Our specialists handle corporate, trust, and international tax. Book May.','approved','Approved. Post Thursday 8 AM for professional audience.','Ingrid Müller'),_apv('LA3','Wrongful Termination Case Summary','li','Employment Law','Employment law case study: how we secured full settlement for a senior executive in 6 weeks.','wip','Client anonymisation in progress. Ready Friday.','David Park')],
  {totalReach:186000,totalEngagement:'5.6%',followerGrowth:'+408 this month',bestPlatform:'LinkedIn',bestPost:'5 Things Every Board Should Know Before an Acquisition',pendingApprovals:1,wipPosts:1,approvedPosts:7,rejectedPosts:0,byPlatform:[{platform:'Instagram',color:'#E1306C',reach:22000,engagement:'3.6%',growth:'52',posts:2,bestPost:'Brand Campaign'},{platform:'Facebook',color:'#1877F2',reach:36000,engagement:'3.4%',growth:'68',posts:4,bestPost:'Tax Advisory Offer'},{platform:'LinkedIn',color:'#0A66C2',reach:128000,engagement:'6.6%',growth:'288',posts:8,bestPost:'M&A Board Checklist'}],campaignBreakdown:[{campaign:'Corporate Advisory',posts:4,reach:58000,engagement:'6.4%',status:'active'},{campaign:'Employment Law',posts:3,reach:46000,engagement:'6.2%',status:'active'},{campaign:'RE Closing Leads',posts:2,reach:34000,engagement:'5.2%',status:'active'},{campaign:'Tax Advisory',posts:2,reach:28000,engagement:'4.0%',status:'active'}]}
)});
