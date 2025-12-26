import { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { DestinationHero, DestinationGrid } from '@zenra/components';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface Filters {
  province: string;
  category: string;
  season: string;
}

const destinationIds = [
  {
    id: 'mirissa',
    image: "../images/mirissa.jpg",
  },
  {
    id: 'sigiriya',
    image: "../images/sigiriya.jpg",
  },
  {
    id: 'ella',
    image: "../images/ella.jpg",
  },
  {
    id: 'kandy',
    image: "../images/kandy.jpg",
  },
  {
    id: 'jaffna',
    image: "../images/jaffna.avif",
  },
  {
    id: 'nilaweli',
    image: "../images/nilaweli.jpeg",
  },
  {
    id: 'anuradhapura',
    image: "../images/anuradhapura.jpg",
  },
  {
    id: 'unawatuna',
    image: "../images/unawatuna.jpg",
  },
  {
    id: 'yala',
    image: "../images/yala.avif",
  },
  {
    id: 'polonnaruwa',
    image: "../images/polonnaruwa.avif",
  },

  {
    id: 'weligama',
    image: "../images/weligama.avif",
  },
  {
    id: 'nuwaraeliya',
    image: "../images/nuwaraeliya.avif",
  },
  {
    id: 'rekawa',
    image: "../images/rekawa.jpeg",
  },
  {
    id: 'galle',
    image: "../images/galle.jpg",
  },
  {
    id: 'arugambay',
    image: "../images/arugambay.jpeg"
  },
  {
    id: 'colombo',
    image: "../images/colombo.jpg",
  },
  {
    id: 'negombo',
    image: "../images/negombo.avif",
  }
];

export const DestinationsPage = () => {
  const [filters, setFilters] = useState<Filters>({
    province: 'all',
    category: 'all',
    season: 'all'
  });
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const selectedDestination = location.state?.selectedDestination;
    if (selectedDestination) {
      const element = document.getElementById(selectedDestination);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const filteredDestinations = destinationIds.filter(destination => {
    const locationData = {
      region: t(`destinations.locations.${destination.id}.region`),
      categories: t(`destinations.locations.${destination.id}.categories`, { returnObjects: true }) as string[],
      bestTime: t(`destinations.locations.${destination.id}.bestTime`).toLowerCase()
    };

    if (filters.province !== 'all') {
      const province = filters.province.replace('-', ' ');
      if (!locationData.region.toLowerCase().includes(province)) {
        return false;
      }
    }

    if (filters.category !== 'all') {
      if (!locationData.categories.some(cat => cat.toLowerCase() === filters.category)) {
        return false;
      }
    }

    if (filters.season !== 'all') {
      const seasonMap = {
        'dec-mar': ['december', 'january', 'february', 'march'],
        'apr-may': ['april', 'may'],
        'jun-sep': ['june', 'july', 'august', 'september'],
        'oct-nov': ['october', 'november']
      };

      const months = seasonMap[filters.season as keyof typeof seasonMap];
      if (!months.some(month => locationData.bestTime.includes(month))) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <DestinationHero
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <DestinationGrid destinations={filteredDestinations} />
      </div>
    </PageTransition>
  );
};