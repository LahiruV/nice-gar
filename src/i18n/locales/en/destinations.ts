export const destinations = {
  title: 'Discover Sri Lanka\'s Most Beautiful Places',
  subtitle: 'From ancient cities to pristine beaches, explore the diverse destinations of this tropical paradise',
  viewLocation: 'View Location',
  viewHotels: 'Nearby Hotels',
  getDirections: 'Get Directions',
  filters: {
    province: 'Filter by Province',
    category: 'Filter by Category',
    season: 'Best Time to Visit',
    provinces: {
      all: 'All Provinces',
      central: 'Central Province',
      eastern: 'Eastern Province',
      northern: 'Northern Province',
      southern: 'Southern Province',
      western: 'Western Province',
      northCentral: 'North Central Province',
      uva: 'Uva Province'
    },
    categories: {
      all: 'All Categories',
      unesco: 'UNESCO Heritage',
      beach: 'Beaches',
      wildlife: 'Wildlife',
      cultural: 'Cultural',
      historical: 'Historical',
      adventure: 'Adventure',
      nature: 'Nature'
    },
    seasons: {
      all: 'Any Season',
      decMar: 'December - March',
      aprMay: 'April - May',
      junSep: 'June - September',
      octNov: 'October - November'
    }
  },
  sections: {
    highlights: 'Highlights',
    activities: 'Activities'
  },
  locations: {
    sigiriya: {
      name: 'Sigiriya',
      region: 'Central Province',
      description: 'Ancient palace and fortress complex, known as the \'Lion Rock\', featuring stunning frescoes and landscaped gardens.',
      categories: ['UNESCO', 'Heritage', 'Historical'],
      bestTime: 'January to March',
      highlights: [
        'UNESCO World Heritage Site',
        '5th Century Palace Ruins',
        'Ancient Frescoes',
        'Mirror Wall',
        'Lion Gate',
        'Water Gardens'
      ],
      activities: [
        'Rock Climbing',
        'Archaeological Tours',
        'Photography',
        'Bird Watching'
      ]
    },
    kandy: {
      name: 'Kandy',
      region: 'Central Province',
      description: 'The last royal capital of Sri Lanka, home to the Temple of the Tooth Relic and surrounded by misty hills.',
      categories: ['UNESCO', 'Cultural', 'Religious'],
      bestTime: 'December to April',
      highlights: [
        'Temple of the Tooth',
        'Kandy Lake',
        'Royal Botanical Gardens',
        'Cultural Shows',
        'Traditional Markets'
      ],
      activities: [
        'Cultural Tours',
        'Temple Visits',
        'Tea Factory Tours',
        'Nature Walks'
      ]
    },
    ella: {
      name: 'Ella',
      region: 'Uva Province',
      description: 'A scenic mountain village famous for its tea plantations, hiking trails, and breathtaking views.',
      categories: ['Nature', 'Adventure', 'Scenic'],
      bestTime: 'January to March',
      highlights: [
        'Nine Arch Bridge',
        'Ella Rock',
        'Little Adam\'s Peak',
        'Tea Plantations',
        'Ravana Falls'
      ],
      activities: [
        'Hiking',
        'Tea Plantation Tours',
        'Train Journeys',
        'Photography',
        'Waterfall Visits'
      ]
    },
    galle: {
      name: 'Galle',
      region: 'Southern Province',
      description: 'Historic coastal city with a well-preserved Dutch colonial fort, charming streets, and beautiful beaches.',
      categories: ['UNESCO', 'Colonial', 'Coastal'],
      bestTime: 'December to April',
      highlights: [
        'Galle Fort (UNESCO Site)',
        'Dutch Reformed Church',
        'Maritime Museum',
        'Lighthouse',
        'Historical Mansions'
      ],
      activities: [
        'Walking Tours',
        'Shopping for Artisan Crafts',
        'Sunset Walks',
        'Food Tours',
        'Cultural Photography'
      ]
    },
    unawatuna: {
      name: 'Unawatuna',
      region: 'Southern Province',
      description: 'A picturesque beach destination known for its coral reefs, sea turtles, and laid-back atmosphere.',
      categories: ['Beach', 'Marine', 'Water Sports'],
      bestTime: 'November to April',
      highlights: [
        'Golden Sandy Beach',
        'Coral Reefs',
        'Japanese Peace Pagoda',
        'Beach Restaurants',
        'Jungle Beach'
      ],
      activities: [
        'Snorkeling',
        'Scuba Diving',
        'Beach Relaxation',
        'Surfing',
        'Yoga'
      ]
    },
    colombo: {
      name: 'Colombo',
      region: 'Western Province',
      description: 'The vibrant capital city blending modern luxury with colonial heritage, offering diverse shopping and cultural experiences.',
      categories: ['Urban', 'Shopping', 'Cultural'],
      bestTime: 'January to March',
      highlights: [
        'Galle Face Green',
        'Gangaramaya Temple',
        'National Museum',
        'Pettah Market',
        'Independence Square'
      ],
      activities: [
        'Shopping',
        'Food Tours',
        'City Walks',
        'Cultural Shows',
        'Rooftop Dining'
      ]
    },
    negombo: {
      name: 'Negombo',
      region: 'Western Province',
      description: 'A charming coastal town known for its fishing industry, golden beaches, and Dutch colonial heritage.',
      categories: ['Beach', 'Fishing', 'Colonial'],
      bestTime: 'December to April',
      highlights: [
        'Fish Market',
        'Dutch Canal',
        'Negombo Beach',
        'St. Mary\'s Church',
        'Dutch Fort Ruins'
      ],
      activities: [
        'Beach Activities',
        'Fishing Tours',
        'Canal Boat Rides',
        'Seafood Dining',
        'Church Visits'
      ]
    },
    weligama: {
      name: 'Weligama',
      region: 'Southern Province',
      description: 'A picturesque bay famous for its stilt fishermen, surfing spots, and traditional fishing culture.',
      categories: ['Beach', 'Surfing', 'Cultural'],
      bestTime: 'December to March',
      highlights: [
        'Stilt Fishermen',
        'Surfing Beaches',
        'Taprobane Island',
        'Fish Market',
        'Kushta Raja Gala'
      ],
      activities: [
        'Surfing',
        'Photography',
        'Fishing Village Tours',
        'Cooking Classes',
        'Beach Hopping'
      ]
    },
    anuradhapura: {
      name: 'Anuradhapura',
      region: 'North Central Province',
      description: 'Ancient capital city with well-preserved ruins of Sri Lankan civilization, featuring stunning stupas and religious monuments.',
      categories: ['UNESCO', 'Historical', 'Religious'],
      bestTime: 'May to September',
      highlights: [
        'Sri Maha Bodhi Tree',
        'Ruwanwelisaya Stupa',
        'Jetavanaramaya',
        'Abhayagiri Monastery',
        'Isurumuniya Temple'
      ],
      activities: [
        'Historical Tours',
        'Temple Visits',
        'Cycling Tours',
        'Meditation Sessions',
        'Archaeological Walks'
      ]
    },
    jaffna: {
      name: 'Jaffna',
      region: 'Northern Province',
      description: 'Historic city with unique Tamil culture, Hindu temples, and Dutch colonial heritage.',
      categories: ['Cultural', 'Religious', 'Historical'],
      bestTime: 'May to September',
      highlights: [
        'Nallur Kandaswamy Temple',
        'Jaffna Fort',
        'Nagadeepa Temple',
        'Public Library',
        'Casuarina Beach'
      ],
      activities: [
        'Temple Tours',
        'Cultural Experiences',
        'Local Food Tasting',
        'Historical Sites',
        'Beach Visits'
      ]
    },
    nilaweli: {
      name: 'Nilaweli',
      region: 'Eastern Province',
      description: 'Pristine beach destination known for its white sands and crystal-clear waters.',
      categories: ['Beach', 'Marine', 'Water Sports'],
      bestTime: 'April to September',
      highlights: [
        'Nilaweli Beach',
        'Pigeon Island',
        'Coral Reefs',
        'Hot Springs',
        'Marine Life'
      ],
      activities: [
        'Snorkeling',
        'Diving',
        'Beach Activities',
        'Boat Tours',
        'Marine Photography'
      ]
    },
    polonnaruwa: {
      name: 'Polonnaruwa',
      region: 'North Central Province',
      description: 'Ancient city featuring well-preserved ruins and archaeological treasures.',
      categories: ['UNESCO', 'Historical', 'Archaeological'],
      bestTime: 'June to September',
      highlights: [
        'Royal Palace',
        'Gal Vihara',
        'Polonnaruwa Vatadage',
        'Rankoth Vehera',
        'Ancient Reservoirs'
      ],
      activities: [
        'Archaeological Tours',
        'Cycling',
        'Photography',
        'Historical Walks',
        'Cultural Visits'
      ]
    },
    yala: {
      name: 'Yala National Park',
      region: 'Southern Province',
      description: 'Largest national park famous for leopards, elephants, and diverse wildlife.',
      categories: ['Wildlife', 'Safari', 'Nature'],
      bestTime: 'February to July',
      highlights: [
        'Leopard Sightings',
        'Wild Elephants',
        'Coastal Ecosystems',
        'Ancient Ruins',
        'Bird Watching'
      ],
      activities: [
        'Safari Tours',
        'Wildlife Photography',
        'Bird Watching',
        'Camping',
        'Nature Walks'
      ]
    },
    rekawa: {
      name: 'Rekawa Turtle Beach',
      region: 'Southern Province',
      description: 'Natural turtle nesting site where five species of marine turtles come to nest.',
      categories: ['Wildlife', 'Marine', 'Conservation'],
      bestTime: 'Year-round',
      highlights: [
        'Turtle Watching',
        'Pristine Beach',
        'Conservation Center',
        'Night Tours',
        'Marine Life'
      ],
      activities: [
        'Turtle Watching',
        'Beach Walks',
        'Conservation Activities',
        'Photography',
        'Educational Tours'
      ]
    },
    mirissa: {
      name: 'Mirissa',
      region: 'Southern Province',
      description: 'Charming coastal town known for whale watching, surfing, and beautiful beaches.',
      categories: ['Beach', 'Marine', 'Wildlife'],
      bestTime: 'November to April',
      highlights: [
        'Whale Watching',
        'Secret Beach',
        'Coconut Tree Hill',
        'Surf Points',
        'Sunset Views'
      ],
      activities: [
        'Whale Watching',
        'Surfing',
        'Snorkeling',
        'Beach Relaxation',
        'Sunset Cruises'
      ]
    },
    nuwaraeliya: {
      name: 'Nuwara Eliya',
      region: 'Central Province',
      description: 'Hill country retreat known for tea plantations, cool climate, and colonial architecture.',
      categories: ['Nature', 'Tea', 'Colonial'],
      bestTime: 'March to May',
      highlights: [
        'Tea Plantations',
        'Gregory Lake',
        'Victoria Park',
        'Horton Plains',
        'Colonial Buildings'
      ],
      activities: [
        'Tea Factory Tours',
        'Golf',
        'Boating',
        'Garden Visits',
        'Mountain Hiking'
      ]
    },
    arugambay: {
      name: 'Arugam Bay',
      region: 'Eastern Province',
      description: 'World-renowned surfing destination with beautiful beaches, vibrant beach culture, and stunning coastal landscapes.',
      categories: ['Beach', 'Surfing', 'Adventure'],
      bestTime: 'April to October',
      highlights: [
        'Main Point Break',
        'Pottuvil Point',
        'Elephant Rock',
        'Whiskey Point',
        'Lagoon Safari'
      ],
      activities: [
        'Surfing',
        'Yoga Sessions',
        'Wildlife Safaris',
        'Beach Parties',
        'Lagoon Tours'
      ]
    }
  }
};