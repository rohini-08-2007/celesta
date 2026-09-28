import { CategoryInfo, Provider, QuoteRequest, Booking } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_event_celebration_1790587038375.jpg';
export const DECOR_IMAGE = '/src/assets/images/category_event_decor_1790587057100.jpg';
export const PHOTO_IMAGE = '/src/assets/images/category_photography_1790587072342.jpg';
export const CATERING_IMAGE = '/src/assets/images/category_catering_culinary_1790587088434.jpg';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'decor',
    name: 'Decorations',
    shortDesc: 'Breathtaking floral arches, stage setups, theme lighting, and luxury backdrops.',
    iconName: 'Sparkles',
    coverImage: DECOR_IMAGE,
    providerCount: 38,
    startingFrom: 450,
    popularFor: ['Weddings', 'Engagements', 'Birthdays', 'Anniversaries']
  },
  {
    id: 'photo',
    name: 'Photography',
    shortDesc: 'Artistic candid captures, portraiture, pre-wedding reels, and drone vistas.',
    iconName: 'Camera',
    coverImage: PHOTO_IMAGE,
    providerCount: 46,
    startingFrom: 600,
    popularFor: ['Weddings', 'Baby Showers', 'College Fests', 'Birthdays']
  },
  {
    id: 'video',
    name: 'Videography',
    shortDesc: 'Cinematic 4K films, wedding trailers, multi-camera live streams, and highlights.',
    iconName: 'Video',
    coverImage: PHOTO_IMAGE,
    providerCount: 29,
    startingFrom: 850,
    popularFor: ['Weddings', 'Corporate Events', 'College Fests']
  },
  {
    id: 'catering',
    name: 'Catering',
    shortDesc: 'Multi-cuisine banquets, artisanal live food stations, and curated cocktail bars.',
    iconName: 'Utensils',
    coverImage: CATERING_IMAGE,
    providerCount: 32,
    startingFrom: 22,
    popularFor: ['Weddings', 'Anniversaries', 'Corporate Dinners']
  },
  {
    id: 'dj',
    name: 'DJ & Music',
    shortDesc: 'Club-grade sound systems, intelligent lighting, live percussionists, and playlist curation.',
    iconName: 'Music',
    coverImage: HERO_IMAGE,
    providerCount: 24,
    startingFrom: 400,
    popularFor: ['Birthdays', 'College Fests', 'Weddings', 'Afterparties']
  },
  {
    id: 'anchor',
    name: 'Anchors & MCs',
    shortDesc: 'Dynamic bilingual hosts, crowd engagement specialists, and ceremonial coordinators.',
    iconName: 'Mic',
    coverImage: HERO_IMAGE,
    providerCount: 19,
    startingFrom: 350,
    popularFor: ['Corporate Events', 'College Fests', 'Weddings', 'Sangeet']
  },
  {
    id: 'makeup',
    name: 'Makeup Artists',
    shortDesc: 'Bridal HD airbrush styling, red-carpet glam, hairstyling, and party looks.',
    iconName: 'Palette',
    coverImage: DECOR_IMAGE,
    providerCount: 35,
    startingFrom: 200,
    popularFor: ['Weddings', 'Engagements', 'Graduations', 'Fashion Shows']
  },
  {
    id: 'mehendi',
    name: 'Mehendi Artists',
    shortDesc: 'Intricate traditional bridal henna, contemporary Arabic motifs, and organic stains.',
    iconName: 'Feather',
    coverImage: DECOR_IMAGE,
    providerCount: 21,
    startingFrom: 120,
    popularFor: ['Weddings', 'Engagements', 'Baby Showers', 'Festivals']
  },
  {
    id: 'bakers',
    name: 'Cakes & Bakery',
    shortDesc: 'Custom architectural wedding cakes, dessert towers, and artisanal confections.',
    iconName: 'Cake',
    coverImage: CATERING_IMAGE,
    providerCount: 27,
    startingFrom: 150,
    popularFor: ['Birthdays', 'Weddings', 'Baby Showers', 'Milestones']
  },
  {
    id: 'florists',
    name: 'Florists',
    shortDesc: 'Exotic bridal bouquets, floral table-runners, vehicle garnishes, and boutonnières.',
    iconName: 'Flower2',
    coverImage: DECOR_IMAGE,
    providerCount: 22,
    startingFrom: 180,
    popularFor: ['Weddings', 'Engagements', 'Anniversaries']
  },
  {
    id: 'planning',
    name: 'Event Planning',
    shortDesc: 'Turnkey event production, vendor logistics, timeline management, and budget oversight.',
    iconName: 'CalendarCheck',
    coverImage: HERO_IMAGE,
    providerCount: 18,
    startingFrom: 1200,
    popularFor: ['Weddings', 'Large Celebrations', 'Corporate Galas']
  }
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'prov-1',
    businessName: 'Aura Grand Events & Floral Styling',
    ownerName: 'Sophia Montgomery',
    email: 'sophia@auragrandevents.com',
    phone: '+1 (555) 234-8901',
    category: 'Decorations',
    location: 'Downtown & Metro Area',
    city: 'San Francisco, CA',
    startingPrice: 550,
    rating: 4.9,
    reviewCount: 48,
    description: 'Boutique event design studio specializing in lush botanical installations, fairy-light canopies, and bespoke luxury stages.',
    aboutLong: 'With over 9 years of curating luxury celebrations, Aura Grand Events transforms venues into ethereal wonderlands. From intimate rooftop engagements to 500-guest grand wedding receptions, we handle custom stage architecture, sustainable botanical arrangements, intelligent ambient lighting, and bespoke photo-booth backdrops. Every project begins with a 3D moodboard to visualize your dream day.',
    coverImage: DECOR_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=AuraGrand&backgroundColor=55144b&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 9,
    responseRate: '98%',
    responseTime: '< 1 hour',
    eventTypes: ['Wedding', 'Engagement', 'Birthday Party', 'Anniversary'],
    subscriptionTier: 'premium',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-1',
        name: 'Intimate Celebration',
        price: 550,
        duration: 'Up to 6 hours setup',
        description: 'Ideal for birthday gatherings, intimate engagements, and anniversary dinners up to 60 guests.',
        features: [
          'Custom floral backdrop (8ft x 8ft)',
          'Ambient LED uplighting package (8 fixtures)',
          'Designer welcome easel with calligraphy',
          'Cake table styling & pedestals',
          'Complete setup and strike down'
        ]
      },
      {
        id: 'pkg-2',
        name: 'Signature Luxe Ballroom',
        price: 1450,
        duration: 'Full day installation',
        popular: true,
        description: 'Our most requested package for grand wedding receptions and milestone celebrations.',
        features: [
          'Grand custom stage backdrop with fresh florals',
          'Ceiling fairy light drape canopy (up to 40ft)',
          '10 floral centerpieces with brass candelabras',
          'VIP sweetheart table styling with monogram',
          'Entrance red-carpet arch with floral garnish',
          'Dedicated on-site decor coordinator'
        ]
      },
      {
        id: 'pkg-3',
        name: 'Royal Heritage Gala',
        price: 2900,
        duration: 'Turnkey 2-day production',
        description: 'Full bespoke transformation for luxury weddings and multi-day celebrations.',
        features: [
          'Full venue ceiling draping and crystal chandeliers',
          'Custom structural floral arch and mandap/altar',
          '20 premium tablescapes with gold cutlery & crystal chargers',
          'Interactive LED photo wall with custom neon sign',
          'Cocktail lounge area with vintage plush seating',
          'Post-event botanical donation/clean-up service'
        ]
      }
    ],
    portfolio: [
      { id: 'port-1', title: 'Whimsical Garden Arch', imageUrl: DECOR_IMAGE, category: 'Floral', eventType: 'Wedding' },
      { id: 'port-2', title: 'Candlelit Banquet Pavilion', imageUrl: HERO_IMAGE, category: 'Lighting', eventType: 'Anniversary' },
      { id: 'port-3', title: 'Golden Hour Sweetheart Table', imageUrl: DECOR_IMAGE, category: 'Stage', eventType: 'Engagement' }
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Camilla & David Thorne',
        rating: 5,
        date: 'September 14, 2026',
        eventType: 'Wedding',
        comment: 'Sophia and her team made our wedding look like something straight out of Architectural Digest! The fairy lights canopy and fresh peony arch left our guests speechless.',
        providerReply: 'Thank you Camilla and David! Designing your celebration at the conservatory was pure joy for our team.'
      },
      {
        id: 'rev-2',
        authorName: 'Rohan Mehta',
        rating: 5,
        date: 'August 28, 2026',
        eventType: 'Engagement',
        comment: 'Super responsive from the first quote request to the final cleanup. Everything was punctual, pristine, and exactly as promised.',
        providerReply: 'Thank you Rohan! Congratulations once again on your engagement.'
      }
    ]
  },
  {
    id: 'prov-2',
    businessName: 'Golden Hour Candid Studios',
    ownerName: 'Julian Croft',
    email: 'julian@goldenhourstudios.com',
    phone: '+1 (555) 472-9182',
    category: 'Photography',
    location: 'Northside District',
    city: 'San Francisco, CA',
    startingPrice: 650,
    rating: 5.0,
    reviewCount: 62,
    description: 'Documentary-style candid wedding & event photography capturing real unscripted emotions with cinematic color grading.',
    aboutLong: 'Julian Croft is an award-winning visual storyteller whose editorial work has been featured in Junebug Weddings and Vogue Celebrations. We believe the most powerful photos are the ones you didn’t pose for—the spontaneous laughs, quiet tears, and electric dance floor bursts. We deliver full online high-res galleries within 14 days.',
    coverImage: PHOTO_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=JulianCroft&backgroundColor=3d0c37&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 7,
    responseRate: '100%',
    responseTime: '< 30 mins',
    eventTypes: ['Wedding', 'Engagement', 'Baby Shower', 'Birthday Party'],
    subscriptionTier: 'premium',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-201',
        name: 'Half-Day Celebration',
        price: 650,
        duration: '4 hours coverage',
        description: 'Ideal for intimate birthday parties, engagement dinners, and baby showers.',
        features: [
          '1 Lead Documentary Photographer',
          '180+ fully edited high-resolution images',
          'Private online proofing gallery with print rights',
          'Same-week sneak peek highlight reel (10 photos)'
        ]
      },
      {
        id: 'pkg-202',
        name: 'Full Day Wedding Story',
        price: 1550,
        duration: '8 hours coverage',
        popular: true,
        description: 'Comprehensive coverage from pre-event morning prep to the grand reception exit.',
        features: [
          '2 Photographers (Lead + Second Shooter)',
          '450+ hand-color graded master images',
          'Complimentary 1-hour sunset engagement session',
          'Drone aerial venue photography (weather permitting)',
          'Delivered on engraved walnut USB keepsake'
        ]
      }
    ],
    portfolio: [
      { id: 'port-201', title: 'Sunset Couple Portrait', imageUrl: PHOTO_IMAGE, category: 'Candid', eventType: 'Wedding' },
      { id: 'port-202', title: 'First Dance Motion Blur', imageUrl: HERO_IMAGE, category: 'Dance', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-201',
        authorName: 'Maya Patel',
        rating: 5,
        date: 'September 2, 2026',
        eventType: 'Wedding',
        comment: 'Julian was invisible during the ceremony yet managed to capture every single tear and smile. The color grading is breathtaking!',
        providerReply: 'Maya, working with you and Arjun was an absolute highlight of my season. Thank you!'
      }
    ]
  },
  {
    id: 'prov-3',
    businessName: 'Saffron & Sage Culinary Co.',
    ownerName: 'Chef Antoine Laurent',
    email: 'catering@saffronsageevents.com',
    phone: '+1 (555) 381-0024',
    category: 'Catering',
    location: 'West Suburbs & Bay',
    city: 'San Francisco, CA',
    startingPrice: 35,
    rating: 4.8,
    reviewCount: 39,
    description: 'Farm-to-table artisanal catering offering modern fusion menus, live chef stations, and craft mixology bars.',
    aboutLong: 'Chef Antoine brings Michelin-starred kitchen experience into bespoke celebratory catering. From wood-fired flatbread live bars and Mediterranean mezze tables to formal plated multi-course dinners and nitrogen dessert lounges, we cater for dietary inclusiveness (vegan, gluten-free, halal) without compromising an ounce of flavor.',
    coverImage: CATERING_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=AntoineSage&backgroundColor=711a62&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 12,
    responseRate: '95%',
    responseTime: '< 2 hours',
    eventTypes: ['Wedding', 'Corporate Event', 'Anniversary', 'Birthday Party'],
    subscriptionTier: 'pro',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-301',
        name: 'Gourmet Cocktail Reception',
        price: 35,
        duration: 'Per guest (min 30 guests)',
        description: 'Roaming canapés, artisanal charcuterie grazing table, and mocktail bar.',
        features: [
          '6 Passed hot & cold luxury hors d’oeuvres',
          'Artisanal farm cheese & cured meat grazing display',
          'Professional waitstaff and bartender service',
          'Premium compostable or porcelain tableware'
        ]
      },
      {
        id: 'pkg-302',
        name: 'Grand Plated Banquet',
        price: 85,
        duration: 'Per guest (min 50 guests)',
        popular: true,
        description: 'Three-course plated dining experience with bespoke seasonal menu design.',
        features: [
          'Tasting session for the couple/host beforehand',
          'Artisan bread service with compound butters',
          'Choice of 3 curated main entrees (Fish, Tenderloin, Vegan)',
          'Plated dessert duo or midnight snack station'
        ]
      }
    ],
    portfolio: [
      { id: 'port-301', title: 'Artisanal Charcuterie Table', imageUrl: CATERING_IMAGE, category: 'Appetizers', eventType: 'Wedding' },
      { id: 'port-302', title: 'Dessert Pedestal Spread', imageUrl: CATERING_IMAGE, category: 'Desserts', eventType: 'Birthday Party' }
    ],
    reviews: [
      {
        id: 'rev-301',
        authorName: 'Jonathan Brand',
        rating: 5,
        date: 'August 12, 2026',
        eventType: 'Corporate Event',
        comment: 'Our tech company gala of 220 attendees had nothing but praise for the live slider and ceviche stations. Spotless service.',
        providerReply: 'Glad we could provide an unforgettable gastronomic night for your team, Jonathan!'
      }
    ]
  },
  {
    id: 'prov-4',
    businessName: 'Resonance DJ Collective',
    ownerName: 'DJ Ryan "R-Vibe" Brooks',
    email: 'ryan@resonancedjs.com',
    phone: '+1 (555) 890-3312',
    category: 'DJ & Music',
    location: 'Metro & East Hills',
    city: 'San Francisco, CA',
    startingPrice: 450,
    rating: 4.9,
    reviewCount: 54,
    description: 'Premier open-format DJs equipped with concert-grade QSC sound, computer-controlled light shows, and zero cheesy hype.',
    aboutLong: 'We bridge modern music taste with effortless celebration management. No cringe mic talk—just seamless transitions spanning 90s nostalgia, Hip-Hop, House, Bollywood, Latin, and Top 40 hits. We also supply wireless microphones, cold-spark machines for grand entrances, and low-lying dry ice fog for cloud dances.',
    coverImage: HERO_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=ResonanceDJ&backgroundColor=2b0528&textColor=ffffff',
    verified: true,
    featured: false,
    isAvailable: true,
    experienceYears: 8,
    responseRate: '99%',
    responseTime: '< 1 hour',
    eventTypes: ['College Fest', 'Wedding', 'Birthday Party', 'Corporate Event'],
    subscriptionTier: 'pro',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-401',
        name: 'Party Starter Sound Rig',
        price: 450,
        duration: 'Up to 4 hours',
        description: 'Perfect for college parties, birthdays, and anniversaries.',
        features: [
          'Professional Club DJ with custom playlist curation',
          '2 QSC 2000W Active Speakers + Subwoofer',
          '2 Wireless handheld mics for toasts and announcements',
          'Sound-activated dance floor light bar'
        ]
      },
      {
        id: 'pkg-402',
        name: 'The Platinum Dance Floor Experience',
        price: 980,
        duration: 'Up to 7 hours',
        popular: true,
        description: 'Complete AV production for high-energy wedding receptions.',
        features: [
          'Lead DJ + Audio Engineer technician',
          'Concert sound system with dual 18" subwoofers',
          'Computer-synchronized moving head lights on truss totems',
          'Cold spark pyrotechnic fountain machines (indoor safe)',
          'Dancing on the Clouds low-lying fog effect'
        ]
      }
    ],
    portfolio: [
      { id: 'port-401', title: 'Illuminated DJ Booth', imageUrl: HERO_IMAGE, category: 'Lighting', eventType: 'College Fest' }
    ],
    reviews: [
      {
        id: 'rev-401',
        authorName: 'Jessica Lin',
        rating: 5,
        date: 'July 24, 2026',
        eventType: 'College Fest',
        comment: 'Ryan had 600 students dancing non-stop until the final minute! Best DJ we have ever hired for our spring formal.',
        providerReply: 'The energy at your campus was unreal! Thanks Jessica.'
      }
    ]
  },
  {
    id: 'prov-5',
    businessName: 'Marcus Vance Ceremonial Host & MC',
    ownerName: 'Marcus Vance',
    email: 'marcus@marcusvance.com',
    phone: '+1 (555) 671-8840',
    category: 'Anchors & MCs',
    location: 'Downtown & South Bay',
    city: 'San Francisco, CA',
    startingPrice: 350,
    rating: 4.9,
    reviewCount: 31,
    description: 'Charismatic, articulate anchor specializing in multicultural weddings, corporate award summits, and high-energy interactive game fests.',
    aboutLong: 'Marcus ensures your celebration runs smoothly without awkward lulls or disorganized announcements. Fluent in English and conversational Spanish, Marcus liaises with catering, the DJ, and photographers to keep your schedule flawlessly on track while keeping the room laughing and engaged.',
    coverImage: HERO_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=MarcusVance&backgroundColor=55144b&textColor=ffffff',
    verified: true,
    featured: false,
    isAvailable: true,
    experienceYears: 6,
    responseRate: '94%',
    responseTime: '< 3 hours',
    eventTypes: ['Wedding', 'Corporate Event', 'College Fest', 'Birthday Party'],
    subscriptionTier: 'free',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-501',
        name: 'Reception Master of Ceremonies',
        price: 350,
        duration: 'Up to 4 hours',
        description: 'Grand entrances, bridal party introductions, toasts coordination, and cake cutting pacing.',
        features: [
          'Pre-event timeline consultation call',
          'Custom welcome speech & family introductions',
          'Interactive shoe game or anniversary dance coordination',
          'Coordination with venue director and AV crew'
        ]
      }
    ],
    portfolio: [
      { id: 'port-501', title: 'Keynote & Gala Hosting', imageUrl: HERO_IMAGE, category: 'Host', eventType: 'Corporate Event' }
    ],
    reviews: [
      {
        id: 'rev-501',
        authorName: 'Claire & Kevin Wu',
        rating: 5,
        date: 'August 19, 2026',
        eventType: 'Wedding',
        comment: 'Marcus saved our reception schedule when dinner was delayed by 30 minutes. He kept everyone entertained without missing a beat!',
        providerReply: 'Thank you Claire and Kevin! It was an honor guiding your family’s special evening.'
      }
    ]
  },
  {
    id: 'prov-6',
    businessName: 'Glow Bridal & Glamour Studio',
    ownerName: 'Natasha Sterling',
    email: 'natasha@glowbridalglam.com',
    phone: '+1 (555) 782-9901',
    category: 'Makeup Artists',
    location: 'Northside & Metro',
    city: 'San Francisco, CA',
    startingPrice: 220,
    rating: 5.0,
    reviewCount: 45,
    description: 'Certified luxury bridal makeup and hair styling. Flawless waterproof HD airbrush techniques for high-definition photography.',
    aboutLong: 'Natasha has 10 years of editorial and bridal beauty mastery using cruelty-free, luxury brands like Charlotte Tilbury, Dior, and NARS. Whether you want dewy natural elegance or dramatic Hollywood glam, Natasha tailors every look to your facial architecture and event lighting.',
    coverImage: DECOR_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=NatashaGlow&backgroundColor=8f237c&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 10,
    responseRate: '97%',
    responseTime: '< 1 hour',
    eventTypes: ['Wedding', 'Engagement', 'Birthday Party', 'Anniversary'],
    subscriptionTier: 'pro',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-601',
        name: 'Celebration Glam',
        price: 220,
        duration: '90 minutes',
        description: 'For birthday honorees, bridesmaids, and engagement parties.',
        features: [
          'Full luxury skin prep & HD foundation',
          'Custom mink/silk false lashes',
          'Soft waves or classic textured updo styling',
          'Touch-up kit (lipstick sample, blotting sheets, powder puff)'
        ]
      },
      {
        id: 'pkg-602',
        name: 'The Couture Bride',
        price: 490,
        duration: '3.5 hours on-site',
        popular: true,
        description: 'Comprehensive VIP bridal glam package with pre-wedding trial.',
        features: [
          '2-Hour in-studio bridal preview trial before the wedding',
          'Airbrush waterproof 18-hour makeup application',
          'Architectural hair styling with veil/headpiece placement',
          'Chest & back glow illumination'
        ]
      }
    ],
    portfolio: [
      { id: 'port-601', title: 'Dewy Natural Bridal Glow', imageUrl: DECOR_IMAGE, category: 'Bridal', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-601',
        authorName: 'Serena Gomez',
        rating: 5,
        date: 'September 10, 2026',
        eventType: 'Wedding',
        comment: 'My makeup stayed 100% flawless through 8 hours of dancing, outdoor heat, and happy tears. Natasha is a magician!',
        providerReply: 'Serena, you looked utterly radiant! Wishing you both a lifetime of happiness.'
      }
    ]
  },
  {
    id: 'prov-7',
    businessName: 'Zoya Bridal Henna & Arts',
    ownerName: 'Zoya Qureshi',
    email: 'zoya@zoyahenna.com',
    phone: '+1 (555) 431-7729',
    category: 'Mehendi Artists',
    location: 'West Suburbs & Bay',
    city: 'San Francisco, CA',
    startingPrice: 150,
    rating: 4.9,
    reviewCount: 28,
    description: 'Handcrafted organic henna paste delivering rich mahogany stains. Specializing in intricate bridal motifs, skylines, and portraits.',
    aboutLong: 'Zoya creates 100% triple-sifted organic Rajasthani henna infused with pure essential oils, guaranteed safe for all skin types. From delicate Arabic floral vines for bridal parties to royal bridal figures with customized wedding dates, Zoya’s clean symmetry has adorned hundreds of happy brides.',
    coverImage: DECOR_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=ZoyaHenna&backgroundColor=55144b&textColor=ffffff',
    verified: true,
    featured: false,
    isAvailable: true,
    experienceYears: 7,
    responseRate: '98%',
    responseTime: '< 2 hours',
    eventTypes: ['Wedding', 'Engagement', 'Baby Shower'],
    subscriptionTier: 'free',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-701',
        name: 'Guest Henna Lounge',
        price: 150,
        duration: 'Hourly rate (min 2 hours)',
        description: 'Speedy, elegant designs for wedding guests, sangeet parties, and baby showers.',
        features: [
          'Covers 10-12 guests per hour (both sides of hands)',
          'All natural organic henna cones included',
          'Lemon-sugar sealant application for deep color'
        ]
      },
      {
        id: 'pkg-702',
        name: 'Royal Bridal Henna',
        price: 380,
        duration: '4-5 hours',
        popular: true,
        description: 'Elaborate bespoke bridal design to the elbows and mid-calf.',
        features: [
          'Custom hidden names & wedding date motifs',
          'Organic eucalyptus essential oil aftercare balm',
          'Glitter sealant and wrapping materials included'
        ]
      }
    ],
    portfolio: [
      { id: 'port-701', title: 'Intricate Bridal Palms', imageUrl: DECOR_IMAGE, category: 'Bridal', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-701',
        authorName: 'Ananya Sharma',
        rating: 5,
        date: 'August 14, 2026',
        eventType: 'Wedding',
        comment: 'Zoya’s line work is mind-blowing. The stain was deep burgundy for two weeks. Everyone kept asking who my henna artist was!',
        providerReply: 'Thank you Ananya! Blessed to have been part of your mehendi night.'
      }
    ]
  },
  {
    id: 'prov-8',
    businessName: 'Velvet Crust Artisanal Bakehouse',
    ownerName: 'Pastry Chef Liam Cooper',
    email: 'orders@velvetcrustbakehouse.com',
    phone: '+1 (555) 912-4467',
    category: 'Cakes & Bakery',
    location: 'Downtown & Metro',
    city: 'San Francisco, CA',
    startingPrice: 160,
    rating: 4.9,
    reviewCount: 51,
    description: 'Architectural fondant & buttercream statement cakes, French macaron towers, and bespoke confectionery bars.',
    aboutLong: 'Velvet Crust merges French pastry precision with sculpture. Every cake is baked fresh with organic European butter, Belgian chocolate, and real fruit purées. We specialize in edible 24k gold leaf details, hand-sculpted sugar flowers, and structural gravity-defying cakes.',
    coverImage: CATERING_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=VelvetCrust&backgroundColor=711a62&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 8,
    responseRate: '96%',
    responseTime: '< 3 hours',
    eventTypes: ['Birthday Party', 'Wedding', 'Baby Shower', 'Anniversary'],
    subscriptionTier: 'pro',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-801',
        name: 'Celebration 2-Tier Cake',
        price: 160,
        duration: 'Serves 25-35 guests',
        description: 'Ideal for stylish birthdays, milestone anniversaries, and baby showers.',
        features: [
          'Choice of signature flavors (Salted Caramel, Earl Grey Lavender, Red Velvet)',
          'Custom cake topper or gold acrylic lettering',
          'Fresh floral accents or metallic accents',
          'Refrigerated safe delivery to venue'
        ]
      },
      {
        id: 'pkg-802',
        name: 'The Grand Tier Wedding Cake',
        price: 480,
        duration: 'Serves 90-120 guests',
        popular: true,
        description: 'Showstopper 3 or 4-tier structural masterpiece designed to your wedding theme.',
        features: [
          'Complimentary tasting box with 6 flavor combinations',
          'Handmade sugar peonies and edible gold leaf application',
          'On-site cake assembly and coordinate with florist',
          'Cake stand rental included'
        ]
      }
    ],
    portfolio: [
      { id: 'port-801', title: 'Gold Leaf Peony Wedding Cake', imageUrl: CATERING_IMAGE, category: 'Cake', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-801',
        authorName: 'Emily Hirsch',
        rating: 5,
        date: 'July 30, 2026',
        eventType: 'Birthday Party',
        comment: 'Not only was the cake a showstopping piece of art, it was the best Earl Grey cake I have ever tasted in my life.',
        providerReply: 'Thank you Emily! We loved creating that delicate color palette for your 30th celebration.'
      }
    ]
  },
  {
    id: 'prov-9',
    businessName: 'Botanica Luxury Florals',
    ownerName: 'Isabella Rossi',
    email: 'isabella@botanicaflorals.com',
    phone: '+1 (555) 519-7023',
    category: 'Florists',
    location: 'Northside & Metro',
    city: 'San Francisco, CA',
    startingPrice: 200,
    rating: 4.8,
    reviewCount: 33,
    description: 'Fine-art floral designs utilizing garden roses, ranunculus, imported orchids, and whimsical seasonal foliage.',
    aboutLong: 'Botanica Florals believes flowers tell the emotional narrative of an event. We source directly from sustainable California growers and Dutch flower auctions. From bridal hand-tied bouquets wrapped in silk ribbon to hanging floral chandeliers and altar installations, we ensure your blooms stay vibrant throughout the night.',
    coverImage: DECOR_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=BotanicaFloral&backgroundColor=3d0c37&textColor=ffffff',
    verified: true,
    featured: false,
    isAvailable: true,
    experienceYears: 6,
    responseRate: '93%',
    responseTime: '< 2 hours',
    eventTypes: ['Wedding', 'Engagement', 'Anniversary'],
    subscriptionTier: 'free',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-901',
        name: 'Bridal Floral Suite',
        price: 280,
        duration: 'Hand-delivered morning of',
        description: 'Complete personal flowers for the bridal couple and wedding party.',
        features: [
          '1 Luxe bridal bouquet with hand-dyed silk ribbons',
          '1 Groom boutonnière',
          '3 Bridesmaid petite bouquets',
          '3 Groomsmen boutonnières',
          'Complimentary flower petal basket for flower girl'
        ]
      }
    ],
    portfolio: [
      { id: 'port-901', title: 'Dutch Peony Bridal Bouquet', imageUrl: DECOR_IMAGE, category: 'Bouquet', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-901',
        authorName: 'Rachel Green-Cohen',
        rating: 5,
        date: 'September 5, 2026',
        eventType: 'Wedding',
        comment: 'The scent of the garden roses when Isabella delivered the bouquet brought tears to my eyes. Flawless artistry.',
        providerReply: 'Rachel, your color scheme was an absolute dream to work with. Thank you!'
      }
    ]
  },
  {
    id: 'prov-10',
    businessName: 'Opulence Event Architects',
    ownerName: 'Alexander Sterling & Grace Liu',
    email: 'concierge@opulenceevents.com',
    phone: '+1 (555) 700-1122',
    category: 'Event Planning',
    location: 'All Greater Bay Area',
    city: 'San Francisco, CA',
    startingPrice: 1200,
    rating: 5.0,
    reviewCount: 42,
    description: 'High-touch, full-service event planning & production studio orchestrating unforgettable weddings and corporate galas.',
    aboutLong: 'Opulence Event Architects takes the stress off your shoulders. We manage venue contract negotiations, budget tracking spreadsheets, complete vendor vetting, minute-by-minute day-of production timelines, and guest experience logistics. You simply show up and celebrate.',
    coverImage: HERO_IMAGE,
    profileImage: 'https://api.dicebear.com/7.x/initials/svg?seed=OpulenceEvents&backgroundColor=2b0528&textColor=ffffff',
    verified: true,
    featured: true,
    isAvailable: true,
    experienceYears: 11,
    responseRate: '100%',
    responseTime: '< 15 mins',
    eventTypes: ['Wedding', 'Corporate Event', 'Anniversary', 'Engagement'],
    subscriptionTier: 'premium',
    approvalStatus: 'approved',
    packages: [
      {
        id: 'pkg-1001',
        name: 'Month-Of Coordination',
        price: 1200,
        duration: '4 weeks before + Day Of',
        description: 'For clients who have chosen vendors but need professional execution on the big day.',
        features: [
          'Detailed master event timeline creation',
          'Vendor confirmation and insurance checks',
          'Ceremony rehearsal directing (1 hour)',
          '2 Coordinators on-site for up to 10 hours',
          'Emergency bridal kit on hand'
        ]
      },
      {
        id: 'pkg-1002',
        name: 'Full Turnkey Event Production',
        price: 3400,
        duration: 'Comprehensive planning',
        popular: true,
        description: 'From initial concept visioning to post-event teardown and vendor settlements.',
        features: [
          'Venue scouting & contract negotiation',
          'Design curation (styling, moodboards, floorplans)',
          'Complete vendor management (Catering, DJ, Decor, Photo)',
          'Budget tracker and payment schedule management',
          'Dedicated lead planner + 3 assistants on event day'
        ]
      }
    ],
    portfolio: [
      { id: 'port-1001', title: 'Winery Estate Wedding', imageUrl: HERO_IMAGE, category: 'Full Production', eventType: 'Wedding' }
    ],
    reviews: [
      {
        id: 'rev-1001',
        authorName: 'Harrison & Victoria Ross',
        rating: 5,
        date: 'August 31, 2026',
        eventType: 'Wedding',
        comment: 'Investing in Opulence was the smartest decision we made. Grace handled a sudden thunderstorm like a master general, moving our dinner indoors seamlessly.',
        providerReply: 'Harrison and Victoria, our team was honored to safeguard your special day. Thank you!'
      }
    ]
  }
];

export const INITIAL_QUOTE_REQUESTS: QuoteRequest[] = [
  {
    id: 'EQ-84920',
    providerId: 'prov-1',
    providerName: 'Aura Grand Events & Floral Styling',
    providerCategory: 'Decorations',
    providerImage: DECOR_IMAGE,
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    customerPhone: '+1 (555) 345-6789',
    eventType: 'Wedding',
    eventDate: '2026-10-24',
    location: 'Presidio Officers Club, SF',
    guestCount: 120,
    serviceCategory: 'Decorations',
    selectedPackage: 'Signature Luxe Ballroom',
    budget: 1800,
    requirements: 'Looking for a warm candlelight and blush peony arch for the indoor ballroom and entry foyer.',
    status: 'responded',
    quoteAmount: 1650,
    providerNote: 'We would love to create this! The quote includes 10 floral centerpieces, fairy canopy, and entrance arch with complimentary delivery.',
    createdAt: '2026-09-26'
  },
  {
    id: 'EQ-84921',
    providerId: 'prov-2',
    providerName: 'Golden Hour Candid Studios',
    providerCategory: 'Photography',
    providerImage: PHOTO_IMAGE,
    customerName: 'Marcus & Liam',
    customerEmail: 'marcus.liam@example.com',
    customerPhone: '+1 (555) 789-0123',
    eventType: 'Engagement',
    eventDate: '2026-11-08',
    location: 'Baker Beach, San Francisco',
    guestCount: 30,
    serviceCategory: 'Photography',
    selectedPackage: 'Half-Day Celebration',
    budget: 800,
    requirements: 'Sunset golden hour candid shoot followed by family celebration dinner.',
    status: 'accepted',
    quoteAmount: 700,
    providerNote: 'Accepted! Looking forward to Baker Beach sunset with you two.',
    createdAt: '2026-09-25'
  },
  {
    id: 'EQ-84922',
    providerId: 'prov-3',
    providerName: 'Saffron & Sage Culinary Co.',
    providerCategory: 'Catering',
    providerImage: CATERING_IMAGE,
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@techco.org',
    customerPhone: '+1 (555) 432-8877',
    eventType: 'Corporate Event',
    eventDate: '2026-12-05',
    location: 'SoMa Loft 44, SF',
    guestCount: 85,
    serviceCategory: 'Catering',
    selectedPackage: 'Gourmet Cocktail Reception',
    budget: 3500,
    requirements: 'End of year company awards gala. Need vegan and gluten-free hors d’oeuvres and mocktail pairing.',
    status: 'pending',
    createdAt: '2026-09-27'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-1004',
    providerId: 'prov-1',
    providerName: 'Aura Grand Events & Floral Styling',
    providerCategory: 'Decorations',
    providerImage: DECOR_IMAGE,
    customerName: 'Sarah Jenkins',
    eventType: 'Wedding',
    eventDate: '2026-10-24',
    location: 'Presidio Officers Club, SF',
    packageName: 'Signature Luxe Ballroom',
    totalPrice: 1650,
    depositPaid: 500,
    status: 'confirmed',
    notes: 'Access to venue starts at 11:00 AM. Floral teardown at midnight.'
  },
  {
    id: 'BK-1002',
    providerId: 'prov-4',
    providerName: 'Resonance DJ Collective',
    providerCategory: 'DJ & Music',
    providerImage: HERO_IMAGE,
    customerName: 'Sarah Jenkins',
    eventType: 'Birthday Party',
    eventDate: '2026-08-15',
    location: 'Rooftop Lounge 9, SF',
    packageName: 'Party Starter Sound Rig',
    totalPrice: 450,
    depositPaid: 450,
    status: 'completed',
    notes: 'Event successfully concluded. Outstanding feedback from guests.'
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote: 'Planning our 150-guest wedding felt overwhelming until we used EventEase. We found our decorator and caterer in one evening, requested custom quotes, and booked with absolute clarity. The transparent pricing saved us thousands.',
    author: 'Danielle & Patrick Vance',
    role: 'Bride & Groom',
    location: 'San Francisco, CA',
    eventType: 'Wedding Celebration',
    rating: 5,
    verified: true
  },
  {
    id: 'test-2',
    quote: 'As an event organizer for a university fest of 800+ attendees, EventEase connected us directly with vetted sound engineers and anchors within 2 hours. Our event was flawless and under budget.',
    author: 'Aarav Patel',
    role: 'Student Council President',
    location: 'Berkeley, CA',
    eventType: 'College Cultural Fest',
    rating: 5,
    verified: true
  },
  {
    id: 'test-3',
    quote: 'I booked a custom birthday cake and balloon stage for my daughter’s first birthday. Both providers arrived early, coordinated with each other, and brought the dream theme to life.',
    author: 'Rachel Steinberg',
    role: 'Parent & Host',
    location: 'Oakland, CA',
    eventType: '1st Birthday Milestone',
    rating: 5,
    verified: true
  }
];

export const TRUST_METRICS = [
  { label: 'Verified Local Pros', value: '2,500+' },
  { label: 'Average Client Rating', value: '4.92 / 5' },
  { label: 'Celebrations Hosted', value: '18,400+' },
  { label: 'Average Quote Speed', value: '< 2 Hours' }
];
