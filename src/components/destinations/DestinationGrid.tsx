import { DestinationCard } from './DestinationCard';

interface Destination {
  id: string;
  image: string;
}

interface DestinationGridProps {
  destinations: Destination[];
}

export const DestinationGrid = ({ destinations }: DestinationGridProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            id={destination.id}
            image={destination.image}
          />
        ))}
      </div>
    </div>
  );
};