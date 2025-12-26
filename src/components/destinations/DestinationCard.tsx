import { useTranslation } from 'react-i18next';
import { Button } from '@zenra/widgets';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LocationMapModal } from './LocationMapModal';

interface DestinationCardProps {
  id: string;
  image: string;
}

export const DestinationCard = ({ id, image }: DestinationCardProps) => {
  const { t } = useTranslation();
  const location = `destinations.locations.${id}`;
  const [isMapOpen, setIsMapOpen] = useState(false);

  const categories = useMemo(() => {
    const value = t(`${location}.categories`, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  }, [t, location]);

  const getTranslatedArray = (key: string): string[] => {
    const value = t(`${location}.${key}`, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };

  return (
    <motion.div
      id={id}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={image}
        alt={t(`${location}.name`)}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t(`${location}.name`)}</h2>
            <p className="text-blue-600">{t(`${location}.region`)}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {t(`${location}.bestTime`)}
          </span>
        </div>

        <p className="text-gray-600 mb-6">{t(`${location}.description`)}</p>

        <div className="mb-6 flex-grow">
          <h3 className="font-semibold text-gray-900 mb-2">{t(`destinations.sections.highlights`)}</h3>
          <div className="flex flex-wrap gap-2">
            {getTranslatedArray('highlights').map((highlight: string, index: number) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">{t(`destinations.sections.activities`)}</h3>
          <div className="flex flex-wrap gap-2">
            {getTranslatedArray('activities').map((activity: string, index: number) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="primary"
              className="flex-1 min-w-[120px]"
              startIcon={<MapPinIcon className="h-5 w-5" />}
              onClick={() => setIsMapOpen(true)}
            >
              {t('destinations.viewLocation')}
            </Button>
          </div>
        </div>
      </div>
      <LocationMapModal
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        locationId={id}
      />
    </motion.div>
  );
};