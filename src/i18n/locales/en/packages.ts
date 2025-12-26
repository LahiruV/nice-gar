export const packages = {
  title: 'Explore Our Packages',
  subtitle: 'Discover our carefully curated travel packages for an unforgettable Sri Lankan experience',
  items: {
    culturalHeritage: {
      title: "Cultural Heritage Tour",
      description: "Explore ancient temples, historical sites, and traditional villages.",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hotels: [
        {
          id: "ch-1",
          name: "Heritage Kandy Resort",
          description: "Luxury resort with traditional architecture and modern amenities",
          image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
          rating: 4.5,
          price: 200,
          amenities: ["Pool", "Spa", "Restaurant", "WiFi", "Garden"]
        },
        {
          id: "ch-2",
          name: "Sigiriya Forest Lodge",
          description: "Eco-friendly lodge surrounded by nature",
          image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
          rating: 4.8,
          price: 180,
          amenities: ["Nature Trails", "Restaurant", "WiFi", "Tours"]
        }
      ],
      price: 1299,
      duration: "6 Days",
      groupSize: "Max 12 people",
      startDate: "Available year-round"
    },
    beachParadise: {
      title: "Beach Paradise Escape",
      description: "Relax on pristine beaches and enjoy water sports activities.",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hotels: [
        {
          id: "bp-1",
          name: "Oceanfront Resort & Spa",
          description: "Luxury beachfront resort with private beach access",
          image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
          rating: 4.7,
          price: 250,
          amenities: ["Private Beach", "Spa", "Pool", "Water Sports", "Restaurants"]
        },
        {
          id: "bp-2",
          name: "Tropical Beach Villa",
          description: "Boutique villa with stunning ocean views",
          image: "https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg",
          rating: 4.6,
          price: 220,
          amenities: ["Ocean View", "Pool", "Restaurant", "Beach Access"]
        }
      ],
      price: 999,
      duration: "5 Days",
      groupSize: "Max 10",
      startDate: "Available year-round"
    },
    wildlifeSafari: {
      title: "Wildlife Safari Adventure",
      description: "Encounter elephants, leopards, and exotic birds in their natural habitat.",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      hotels: [
        {
          id: "ws-1",
          name: "Safari Lodge Yala",
          description: "Luxury tented camp near Yala National Park",
          image: "https://images.pexels.com/photos/3613236/pexels-photo-3613236.jpeg",
          rating: 4.9,
          price: 280,
          amenities: ["Safari Tours", "Restaurant", "Pool", "Nature Trails"]
        },
        {
          id: "ws-2",
          name: "Wilderness Resort",
          description: "Eco-friendly resort with wildlife viewing opportunities",
          image: "https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg",
          rating: 4.5,
          price: 200,
          amenities: ["Wildlife Tours", "Restaurant", "Pool", "Nature Activities"]
        }
      ],
      price: 1499,
      duration: "7 Days",
      groupSize: "Max 8 people",
      startDate: "Available year-round"
    }
  },
  filters: {
    duration: {
      label: 'Duration',
      all: 'All Durations',
      short: '1-3 Days',
      medium: '4-7 Days',
      long: '8+ Days'
    },
    price: {
      label: 'Price Range',
      all: 'All Prices',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: 'Book Your Trip',
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      travelDate: 'Travel Date',
      adults: 'Number of Adults',
      children: 'Number of Children',
      hotel: {
        label: 'Select Hotel',
        amenities: 'Amenities',
        rating: 'Rating',
        pricePerNight: 'per night'
      },
      services: {
        title: 'Additional Services',
        mealPlan: {
          label: 'Meal Plan',
          bb: {
            title: 'Bed & Breakfast (BB)',
            description: 'Includes breakfast only'
          },
          hb: {
            title: 'Half Board (HB)',
            description: 'Includes breakfast and dinner'
          },
          fb: {
            title: 'Full Board (FB)',
            description: 'Includes breakfast, lunch, and dinner'
          }
        },
        transport: 'Include Transport',
        accommodation: 'Include Accommodation'
      },
      specialRequests: {
        label: 'Special Requests',
        placeholder: 'Optional: Any dietary requirements or special accommodations'
      },
      submit: 'Book Now',
      perPerson: '/person'
    }
  }
};