import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const Map = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState('weligama');

  const locations = ['weligama', 'kandy', 'ella', 'sigiriya'];

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {t('map.title')}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {t('map.subtitle')}
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Location buttons */}
          <div className="lg:w-1/4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible">
            {locations.map((location) => (
              <motion.button
                key={location}
                className={`p-4 rounded-lg shadow-md flex-shrink-0 w-full ${selectedLocation === location
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                onClick={() => setSelectedLocation(location)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {t(`map.locations.${location}.name`)}
                </h3>
                <div className="text-sm">
                  <p className="mb-1">
                    <span className="font-medium">{t('map.duration')}:</span>{' '}
                    {t(`map.locations.${location}.duration`)}
                  </p>
                  <p>
                    <span className="font-medium">{t('map.distance')}:</span>{' '}
                    {t(`map.locations.${location}.distance`)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Map container */}
          <div className="lg:w-3/4 h-[600px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={t(`map.locations.${selectedLocation}.mapUrl`)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t(`map.locations.${selectedLocation}.name`)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};