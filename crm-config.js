// CRM Vertical Configuration — Sales & Catalog data per vertical

window.VERTICAL_SALES_CONFIG = {
  realEstate: {
    closedDeals: window.FBR.closings,
  },
  
  clinics: {
    closedDeals: [
      { id: 'T-001', patient: 'María González', flag: '🇲🇽', service: 'Knee Replacement Surgery', amount: 48500, fee: 2425, date: 'May 12, 2026', agent: 'Dr. Ramírez', photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400' },
      { id: 'T-002', patient: 'James Chen', flag: '🇺🇸', service: 'Spine Treatment', amount: 19600, fee: 980, date: 'May 10, 2026', agent: 'Dr. Patel', photo: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400' },
      { id: 'T-003', patient: 'Sophie Laurent', flag: '🇫🇷', service: 'Sports Medicine Consult', amount: 9200, fee: 460, date: 'May 8, 2026', agent: 'Dr. Kim', photo: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400' },
      { id: 'T-004', patient: 'Ahmed Al-Rashid', flag: '🇦🇪', service: 'Physical Therapy Package', amount: 6800, fee: 340, date: 'May 5, 2026', agent: 'Dr. Ramírez', photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400' },
      { id: 'T-005', patient: 'Emma Johnson', flag: '🇬🇧', service: 'Diagnostic Imaging', amount: 3200, fee: 160, date: 'May 2, 2026', agent: 'Dr. Patel', photo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400' }
    ],
  },
  
  restaurants: {
    closedDeals: [
      { id: 'B-001', guest: 'Anderson Wedding', flag: '🇺🇸', event: 'Private Dining Room', amount: 8500, serviceCharge: 1700, date: 'May 15, 2026', agent: 'Main Location', photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
      { id: 'B-002', guest: 'Tech Corp Dinner', flag: '🇺🇸', event: 'Corporate Event', amount: 12300, serviceCharge: 2460, date: 'May 13, 2026', agent: 'Waterfront', photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400' },
      { id: 'B-003', guest: 'Martínez Family', flag: '🇲🇽', event: 'Tasting Menu', amount: 680, serviceCharge: 136, date: 'May 12, 2026', agent: 'Main Location', photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400' },
      { id: 'B-004', guest: 'Smith Anniversary', flag: '🇨🇦', event: 'Wine Pairing Dinner', amount: 890, serviceCharge: 178, date: 'May 10, 2026', agent: 'Downtown', photo: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400' }
    ],
  },
  
  retail: {
    closedDeals: [
      { id: 'O-1847', customer: 'Jennifer Lee', flag: '🇺🇸', items: 'Premium Audio Collection', amount: 1850, margin: 555, date: 'May 16, 2026', agent: 'Online Store', photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { id: 'O-1846', customer: 'Marco Rossi', flag: '🇮🇹', items: 'Smart Home Bundle', amount: 980, margin: 294, date: 'May 15, 2026', agent: 'Flagship NYC', photo: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400' },
      { id: 'O-1845', customer: 'Lisa Wang', flag: '🇨🇳', items: 'Fashion Accessories Set', amount: 340, margin: 102, date: 'May 14, 2026', agent: 'Online Store', photo: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400' },
      { id: 'O-1844', customer: 'David Park', flag: '🇰🇷', items: 'Gift Box Collection', amount: 240, margin: 72, date: 'May 13, 2026', agent: 'Pop-up SF', photo: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' }
    ],
  },
};

window.VERTICAL_CATALOG_CONFIG = {
  realEstate: {
    items: window.FBR.listings,
  },
  
  clinics: {
    items: [
      { id: 'S01', title: 'Knee Replacement Surgery', type: 'Surgery', category: 'Orthopedics', price: '$48,500', duration: '3-4 hours', doctor: 'Dr. Roberts', status: 'Available', details: '3-4 hours', availability: 'Available' },
      { id: 'S02', title: 'Hip Replacement Surgery', type: 'Surgery', category: 'Orthopedics', price: '$52,000', duration: '2-3 hours', doctor: 'Dr. Chen', status: 'Available', details: '2-3 hours', availability: 'Available' },
      { id: 'S03', title: 'Spine Evaluation', type: 'Consultation', category: 'Neurology', price: '$850', duration: '45 min', doctor: 'Dr. Martinez', status: 'Available', details: '45 min', availability: 'Available' },
      { id: 'S04', title: 'Physical Therapy Package', type: 'Treatment', category: 'Rehabilitation', price: '$2,200', duration: '10 sessions', doctor: 'Therapist Team', status: 'Available', details: '10 sessions', availability: 'Available' },
      { id: 'S05', title: 'MRI Scan - Full Body', type: 'Diagnostics', category: 'Imaging', price: '$3,400', duration: '60 min', doctor: 'Radiology', status: 'Available', details: '60 min', availability: 'Available' },
      { id: 'S06', title: 'Pain Management Consultation', type: 'Consultation', category: 'Pain Medicine', price: '$650', duration: '30 min', doctor: 'Dr. Anderson', status: 'Available', details: '30 min', availability: 'Available' },
      { id: 'S07', title: 'Sports Medicine Evaluation', type: 'Consultation', category: 'Sports Medicine', price: '$550', duration: '45 min', doctor: 'Dr. Kim', status: 'Available', details: '45 min', availability: 'Available' },
      { id: 'S08', title: 'Cardiac Stress Test', type: 'Diagnostics', category: 'Cardiology', price: '$1,800', duration: '2 hours', doctor: 'Dr. Patel', status: 'Available', details: '2 hours', availability: 'Available' }
    ],
  },
  
  restaurants: {
    items: [
      { id: 'M01', title: 'Chef\'s Tasting Menu', type: 'Dinner', category: 'Fine Dining', price: '$185', details: '7 courses', status: 'Available', availability: 'Available', meta: '7 courses' },
      { id: 'M02', title: 'Weekend Brunch', type: 'Breakfast', category: 'Casual', price: '$45', details: 'Sat-Sun 9AM-2PM', status: 'Available', availability: 'Available', meta: 'Sat-Sun' },
      { id: 'M03', title: 'Wine Pairing Dinner', type: 'Events', category: 'Special Event', price: '$220', details: '5 courses + wine', status: 'Available', availability: 'Limited', meta: '5 courses' },
      { id: 'M04', title: 'Private Dining Room', type: 'Private Dining', category: 'Group Event', price: '$2,500', details: 'Up to 20 guests', status: 'Available', availability: 'By Reservation', meta: 'Up to 20' },
      { id: 'M05', title: 'Business Lunch Special', type: 'Lunch', category: 'Quick Service', price: '$32', details: 'Mon-Fri 11:30-2PM', status: 'Available', availability: 'Available', meta: 'Weekdays' },
      { id: 'M06', title: 'Holiday Catering Package', type: 'Events', category: 'Catering', price: '$1,800', details: 'Serves 30', status: 'Available', availability: 'Pre-order', meta: 'Serves 30' },
      { id: 'M07', title: 'Cocktail Tasting Experience', type: 'Events', category: 'Bar Service', price: '$65', details: '4 signature cocktails', status: 'Available', availability: 'Available', meta: '4 cocktails' },
      { id: 'M08', title: 'Sunday Roast Tradition', type: 'Dinner', category: 'Traditional', price: '$58', details: 'Classic roast dinner', status: 'Available', availability: 'Sundays only', meta: 'Sunday special' }
    ],
  },
  
  retail: {
    items: [
      { id: 'P01', title: 'Premium Wireless Headphones', type: 'Apparel', category: 'Audio', price: '$299', details: 'Noise cancelling', status: 'In Stock', availability: 'In Stock', meta: '45 units' },
      { id: 'P02', title: 'Designer Leather Jacket', type: 'Apparel', category: 'Outerwear', price: '$645', details: 'Italian leather', status: 'In Stock', availability: 'Limited', meta: '8 units' },
      { id: 'P03', title: 'Smart Fitness Watch', type: 'Accessories', category: 'Wearables', price: '$399', details: 'Heart rate + GPS', status: 'In Stock', availability: 'In Stock', meta: '120 units' },
      { id: 'P04', title: 'Canvas Weekend Bag', type: 'Accessories', category: 'Travel', price: '$185', details: 'Water resistant', status: 'In Stock', availability: 'In Stock', meta: '34 units' },
      { id: 'P05', title: 'Running Shoes Pro', type: 'Footwear', category: 'Athletic', price: '$149', details: 'Carbon plate', status: 'In Stock', availability: 'In Stock', meta: '67 units' },
      { id: 'P06', title: 'Minimalist Wallet', type: 'Accessories', category: 'Small Goods', price: '$65', details: 'RFID protection', status: 'On Sale', availability: 'In Stock', meta: '200 units' },
      { id: 'P07', title: 'Sunglasses Collection', type: 'Accessories', category: 'Eyewear', price: '$220', details: 'UV400 protection', status: 'In Stock', availability: 'In Stock', meta: '45 units' },
      { id: 'P08', title: 'Laptop Backpack Pro', type: 'Accessories', category: 'Tech Carry', price: '$129', details: 'TSA approved', status: 'In Stock', availability: 'In Stock', meta: '88 units' }
    ],
  }
};
