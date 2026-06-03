// Rosetta Client Portal — Comprehensive Mock Data
// Rich realistic data for all verticals and modules

(function() {
  'use strict';
  
  if (!window.FBR) window.FBR = {};
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MARKETING / CONTENT STUDIO DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.marketing = {
    channels: [
      { id: 'ig', platform: 'Instagram', followers: 24500, growth: '+12%', engagementRate: '4.2%', posts: 156 },
      { id: 'fb', platform: 'Facebook', followers: 18200, growth: '+8%', engagementRate: '2.8%', posts: 203 },
      { id: 'li', platform: 'LinkedIn', followers: 5600, growth: '+18%', engagementRate: '6.1%', posts: 87 }
    ],
    
    socialPosts: [
      { id: 1, platform: 'ig', content: 'New luxury waterfront listing — 4BR, panoramic ocean views', status: 'published', date: 'May 18', engagement: 1243, reach: 12400 },
      { id: 2, platform: 'fb', content: 'Open house this weekend! Modern downtown condo with rooftop access', status: 'scheduled', date: 'May 20', scheduledTime: '10:00 AM' },
      { id: 3, platform: 'li', content: 'Market update: Spring selling season trends and insights', status: 'pending', date: 'May 19', approver: 'Marketing Director' },
      { id: 4, platform: 'ig', content: 'Just closed! Congratulations to our clients on their dream home', status: 'approved', date: 'May 17', engagement: 856, reach: 8200 },
      { id: 5, platform: 'fb', content: 'Client testimonial: Working with our team made the process seamless', status: 'wip', date: 'Draft', assignee: 'Content Team' }
    ],
    
    insights: [
      { metric: 'Total Reach', value: '124K', change: '+15%', period: 'Last 30 days' },
      { metric: 'Engagement Rate', value: '4.1%', change: '+0.3%', period: 'Last 30 days' },
      { metric: 'New Followers', value: '2,340', change: '+22%', period: 'Last 30 days' },
      { metric: 'Posts Published', value: '42', change: '+5', period: 'Last 30 days' }
    ]
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ADS / CAMPAIGN INTELLIGENCE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.campaigns = [
    {
      id: 'camp-001',
      name: 'Spring Luxury Listings',
      platform: 'Meta',
      status: 'active',
      budget: 5000,
      spend: 3420,
      impressions: 245000,
      clicks: 3680,
      conversions: 47,
      ctr: '1.5%',
      cpc: '$0.93',
      cpa: '$72.76',
      roas: '4.2x',
      quality: 85,
      fatigue: 'low',
      startDate: 'May 1',
      endDate: 'May 31'
    },
    {
      id: 'camp-002',
      name: 'Downtown Condos Campaign',
      platform: 'Google',
      status: 'active',
      budget: 3500,
      spend: 2890,
      impressions: 156000,
      clicks: 2340,
      conversions: 31,
      ctr: '1.5%',
      cpc: '$1.23',
      cpa: '$93.22',
      roas: '3.8x',
      quality: 78,
      fatigue: 'medium',
      startDate: 'May 5',
      endDate: 'May 28'
    },
    {
      id: 'camp-003',
      name: 'First-Time Buyers',
      platform: 'Meta',
      status: 'paused',
      budget: 2500,
      spend: 2450,
      impressions: 189000,
      clicks: 2830,
      conversions: 38,
      ctr: '1.5%',
      cpc: '$0.86',
      cpa: '$64.47',
      roas: '5.1x',
      quality: 92,
      fatigue: 'high',
      startDate: 'Apr 15',
      endDate: 'May 15'
    }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // COMMUNICATIONS / ACTIVITIES DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.activities = [
    { id: 1, type: 'email', lead: 'Sarah Chen', agent: 'Robert Hayes', subject: 'RE: Waterfront property inquiry', date: '2 hours ago', status: 'unread', channel: 'email' },
    { id: 2, type: 'call', lead: 'Michael Torres', agent: 'Jennifer Park', subject: 'Follow-up call scheduled', date: '5 hours ago', status: 'completed', channel: 'phone', duration: '23 min' },
    { id: 3, type: 'meeting', lead: 'Emma Richardson', agent: 'Robert Hayes', subject: 'Property viewing — Downtown Loft', date: 'Yesterday', status: 'completed', channel: 'in-person' },
    { id: 4, type: 'email', lead: 'David Kim', agent: 'Jennifer Park', subject: 'Financing pre-approval documents', date: 'Yesterday', status: 'read', channel: 'email' },
    { id: 5, type: 'text', lead: 'Lisa Anderson', agent: 'Robert Hayes', subject: 'Showing confirmation for Saturday 10am', date: '2 days ago', status: 'replied', channel: 'sms' },
    { id: 6, type: 'note', lead: 'James Wilson', agent: 'Jennifer Park', subject: 'Client interested in investment properties', date: '3 days ago', status: 'internal', channel: 'internal' },
    { id: 7, type: 'email', lead: 'Maria Garcia', agent: 'Robert Hayes', subject: 'Contract terms review', date: '3 days ago', status: 'read', channel: 'email' },
    { id: 8, type: 'call', lead: 'Thomas Brown', agent: 'Jennifer Park', subject: 'Initial consultation call', date: '4 days ago', status: 'completed', channel: 'phone', duration: '18 min' }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // LEADS / CONTACTS DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.leads = [
    { id: 1, name: 'Sarah Chen', flag: '🇺🇸', email: 'sarah.chen@email.com', phone: '+1 415-555-0123', source: 'Website', stage: 'Qualified', agent: 'Robert Hayes', created: 'May 15, 2026', lastContact: '2 hours ago', score: 92 },
    { id: 2, name: 'Michael Torres', flag: '🇲🇽', email: 'mtorres@email.com', phone: '+1 619-555-0456', source: 'Referral', stage: 'Meeting Set', agent: 'Jennifer Park', created: 'May 14, 2026', lastContact: '5 hours ago', score: 88 },
    { id: 3, name: 'Emma Richardson', flag: '🇬🇧', email: 'e.richardson@email.com', phone: '+44 20-555-0789', source: 'Instagram', stage: 'Viewing Scheduled', agent: 'Robert Hayes', created: 'May 12, 2026', lastContact: 'Yesterday', score: 85 },
    { id: 4, name: 'David Kim', flag: '🇰🇷', email: 'dkim@email.com', phone: '+1 213-555-0234', source: 'Facebook Ads', stage: 'Qualified', agent: 'Jennifer Park', created: 'May 11, 2026', lastContact: 'Yesterday', score: 79 },
    { id: 5, name: 'Lisa Anderson', flag: '🇺🇸', email: 'lisa.a@email.com', phone: '+1 858-555-0567', source: 'Website', stage: 'New Lead', agent: 'Robert Hayes', created: 'May 10, 2026', lastContact: '2 days ago', score: 72 },
    { id: 6, name: 'James Wilson', flag: '🇨🇦', email: 'jwilson@email.com', phone: '+1 604-555-0890', source: 'Google Ads', stage: 'Qualified', agent: 'Jennifer Park', created: 'May 9, 2026', lastContact: '3 days ago', score: 81 },
    { id: 7, name: 'Maria Garcia', flag: '🇪🇸', email: 'mgarcia@email.com', phone: '+34 91-555-0123', source: 'LinkedIn', stage: 'Contract Review', agent: 'Robert Hayes', created: 'May 5, 2026', lastContact: '3 days ago', score: 95 },
    { id: 8, name: 'Thomas Brown', flag: '🇦🇺', email: 'tbrown@email.com', phone: '+61 2-555-0456', source: 'Referral', stage: 'New Lead', agent: 'Jennifer Park', created: 'May 4, 2026', lastContact: '4 days ago', score: 68 }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CLOSINGS / REVENUE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.closings = [
    { id: 'cls-001', lead: 'Jennifer Martinez', flag: '🇺🇸', prop: '2847 Ocean View Dr', salePrice: 1850000, commission: 55500, date: 'May 15, 2026', agent: 'Robert Hayes', type: 'Single Family' },
    { id: 'cls-002', lead: 'Robert Chen', flag: '🇨🇳', prop: 'Downtown Loft #405', salePrice: 725000, commission: 21750, date: 'May 12, 2026', agent: 'Jennifer Park', type: 'Condo' },
    { id: 'cls-003', lead: 'Sophie Anderson', flag: '🇬🇧', prop: '1234 Harbor Blvd', salePrice: 2400000, commission: 72000, date: 'May 10, 2026', agent: 'Robert Hayes', type: 'Single Family' },
    { id: 'cls-004', lead: 'Carlos Rodriguez', flag: '🇲🇽', prop: 'Skyline Tower #2801', salePrice: 890000, commission: 26700, date: 'May 8, 2026', agent: 'Jennifer Park', type: 'Condo' },
    { id: 'cls-005', lead: 'Emily Thompson', flag: '🇨🇦', prop: '567 Maple Street', salePrice: 1250000, commission: 37500, date: 'May 5, 2026', agent: 'Robert Hayes', type: 'Single Family' },
    { id: 'cls-006', lead: 'David Park', flag: '🇰🇷', prop: 'Marina Bay #1204', salePrice: 1680000, commission: 50400, date: 'May 3, 2026', agent: 'Jennifer Park', type: 'Condo' },
    { id: 'cls-007', lead: 'Isabella Rossi', flag: '🇮🇹', prop: '3456 Sunset Ridge', salePrice: 3200000, commission: 96000, date: 'May 1, 2026', agent: 'Robert Hayes', type: 'Single Family' },
    { id: 'cls-008', lead: 'Ahmed Hassan', flag: '🇪🇬', prop: 'Parkview Estates #15', salePrice: 1420000, commission: 42600, date: 'Apr 28, 2026', agent: 'Jennifer Park', type: 'Townhouse' },
    { id: 'cls-009', lead: 'Olivia Schmidt', flag: '🇩🇪', prop: '789 Beachfront Ave', salePrice: 2950000, commission: 88500, date: 'Apr 25, 2026', agent: 'Robert Hayes', type: 'Single Family' },
    { id: 'cls-010', lead: 'Lucas Silva', flag: '🇧🇷', prop: 'City Center #3305', salePrice: 795000, commission: 23850, date: 'Apr 22, 2026', agent: 'Jennifer Park', type: 'Condo' }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // OFFERS / PIPELINE DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.offers = [
    { id: 'off-001', lead: 'Maria Garcia', flag: '🇪🇸', prop: '4521 Coastal Highway', amount: 1950000, status: 'Under Review', date: 'May 17, 2026', agent: 'Robert Hayes', contingencies: 2 },
    { id: 'off-002', lead: 'James Wilson', flag: '🇨🇦', prop: 'Hillside View #801', amount: 1125000, status: 'Accepted', date: 'May 16, 2026', agent: 'Jennifer Park', contingencies: 1 },
    { id: 'off-003', lead: 'Emma Richardson', flag: '🇬🇧', prop: 'Downtown Loft #1205', amount: 875000, status: 'Negotiating', date: 'May 15, 2026', agent: 'Robert Hayes', contingencies: 3 },
    { id: 'off-004', lead: 'David Kim', flag: '🇰🇷', prop: '2233 Garden Terrace', amount: 1680000, status: 'Pending Inspection', date: 'May 14, 2026', agent: 'Jennifer Park', contingencies: 2 }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // CATALOG / LISTINGS DATA (Real Estate vertical)
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.listings = [
    { id: 'prop-001', title: '2847 Ocean View Drive', type: 'Single Family', price: '$1,850,000', beds: 4, baths: 3.5, sqft: 3200, location: 'Pacific Beach', status: 'Active', image: 'https://placehold.co/400x300/C09B57/FFFFFF?text=Ocean+View', featured: true },
    { id: 'prop-002', title: 'Downtown Loft #405', type: 'Condo', price: '$725,000', beds: 2, baths: 2, sqft: 1450, location: 'Downtown', status: 'Active', image: 'https://placehold.co/400x300/163061/FFFFFF?text=Downtown+Loft', featured: true },
    { id: 'prop-003', title: '1234 Harbor Boulevard', type: 'Single Family', price: '$2,400,000', beds: 5, baths: 4, sqft: 4100, location: 'Harbor District', status: 'Active', image: 'https://placehold.co/400x300/C09B57/FFFFFF?text=Harbor+Blvd', featured: false },
    { id: 'prop-004', title: 'Skyline Tower #2801', type: 'Condo', price: '$890,000', beds: 2, baths: 2, sqft: 1680, location: 'Midtown', status: 'Pending', image: 'https://placehold.co/400x300/163061/FFFFFF?text=Skyline', featured: true },
    { id: 'prop-005', title: '567 Maple Street', type: 'Single Family', price: '$1,250,000', beds: 3, baths: 2.5, sqft: 2400, location: 'North Park', status: 'Active', image: 'https://placehold.co/400x300/C09B57/FFFFFF?text=Maple+St', featured: false },
    { id: 'prop-006', title: 'Marina Bay #1204', type: 'Condo', price: '$1,680,000', beds: 3, baths: 3, sqft: 2200, location: 'Marina District', status: 'Active', image: 'https://placehold.co/400x300/163061/FFFFFF?text=Marina+Bay', featured: true },
    { id: 'prop-007', title: '3456 Sunset Ridge', type: 'Single Family', price: '$3,200,000', beds: 6, baths: 5, sqft: 5200, location: 'Sunset Hills', status: 'Sold', image: 'https://placehold.co/400x300/C09B57/FFFFFF?text=Sunset+Ridge', featured: false },
    { id: 'prop-008', title: 'Parkview Estates #15', type: 'Townhouse', price: '$1,420,000', beds: 3, baths: 3.5, sqft: 2800, location: 'Park District', status: 'Active', image: 'https://placehold.co/400x300/163061/FFFFFF?text=Parkview', featured: false }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // MARKET DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.market = {
    avgPrice: 1285000,
    avgDays: 42,
    inventory: 145,
    soldLast30: 38,
    trend: '+8.2%',
    hotNeighborhoods: [
      { name: 'Pacific Beach', avg: '$1.8M', trend: '+12%' },
      { name: 'Downtown', avg: '$920K', trend: '+6%' },
      { name: 'Marina District', avg: '$1.5M', trend: '+15%' }
    ]
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // AGENTS / TEAM DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.agents = [
    { id: 'ag-001', name: 'Robert Hayes', role: 'Senior Agent', deals: 24, revenue: 2840000, photo: 'https://i.pravatar.cc/150?img=12' },
    { id: 'ag-002', name: 'Jennifer Park', role: 'Agent', deals: 19, revenue: 2150000, photo: 'https://i.pravatar.cc/150?img=45' },
    { id: 'ag-003', name: 'Michael Chen', role: 'Agent', deals: 16, revenue: 1890000, photo: 'https://i.pravatar.cc/150?img=33' }
  ];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SERVICE PLAN DATA
  // ═══════════════════════════════════════════════════════════════════════════
  
  window.FBR.servicePlan = {
    monthlyHours: 40,
    usedHours: 23.5,
    services: [
      { name: 'Social Media Management', hours: 8, status: 'active' },
      { name: 'Content Creation', hours: 12, status: 'active' },
      { name: 'Ad Campaign Management', hours: 3.5, status: 'active' },
      { name: 'Strategic Consulting', hours: 0, status: 'available' }
    ],
    upcomingDeadlines: [
      { task: 'Q2 Strategy Review', date: 'May 25', priority: 'high' },
      { task: 'June Content Calendar', date: 'May 28', priority: 'medium' },
      { task: 'Campaign Performance Report', date: 'May 31', priority: 'medium' }
    ]
  };
  
  console.log('✅ Rosetta mock data loaded:', Object.keys(window.FBR));
})();
