import { useState } from 'react';
import { PageTransition, PackageCard, PackageHero } from '@zenra/components';
import { getPackages } from '@zenra/services';
import { CircularIndeterminate } from '@zenra/widgets';

interface PackageType {
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
}

interface Filters {
  duration: string;
  priceRange: string;
}

export const PackagesPage = () => {
  const { response, isFetching } = getPackages(true);
  const [filters, setFilters] = useState<Filters>({
    duration: 'all',
    priceRange: 'all'
  });

  const allPackages = Array.isArray(response?.data)
    ? response.data.map((item: any) => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      image: item.image,
      price: Number(item.price),
      duration: item.duration,
      groupSize: item.groupSize,
      startDate: item.startDate,
      hotels: item.hotels
    }))
    : [];

  const filterPackages = (packages: PackageType[]) => {
    return packages.filter(pkg => {
      // Filter by duration
      if (filters.duration !== 'all') {
        const days = parseInt(pkg.duration);
        switch (filters.duration) {
          case '1-3':
            if (days > 3) return false;
            break;
          case '4-7':
            if (days < 4 || days > 7) return false;
            break;
          case '8+':
            if (days < 8) return false;
            break;
        }
      }

      // Filter by price range
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          if (pkg.price < min || pkg.price > max) return false;
        } else if (pkg.price < min) return false;
      }

      return true;
    });
  };

  const filteredPackages = filterPackages(allPackages);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <PackageHero filters={filters} onFilterChange={handleFilterChange} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {isFetching ? <CircularIndeterminate /> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, index) => (
                <PackageCard key={index} {...pkg} />
              ))}
            </div>
          }
        </main>
      </div>
    </PageTransition>
  );
};