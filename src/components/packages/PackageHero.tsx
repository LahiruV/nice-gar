import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Dropdown } from '@zenra/widgets';

interface PackageHeroProps {
  filters: {
    duration: string;
    priceRange: string;
  };
  onFilterChange: Function;
}

export const PackageHero = ({ filters, onFilterChange }: PackageHeroProps) => {
  const { t } = useTranslation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const durations = [
    { value: 'all', label: t('packages.filters.duration.all') },
    { value: '1-3', label: t('packages.filters.duration.short') },
    { value: '4-7', label: t('packages.filters.duration.medium') },
    { value: '8+', label: t('packages.filters.duration.long') }
  ];

  const priceRanges = [
    { value: 'all', label: t('packages.filters.price.all') },
    { value: '0-1000', label: t('packages.filters.price.budget') },
    { value: '1000-2000', label: t('packages.filters.price.standard') },
    { value: '2000+', label: t('packages.filters.price.luxury') }
  ];

  useEffect(() => {
    const video = document.getElementById('package-hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => console.log('Auto-play prevented:', error));
    }
  }, []);

  return (
    <div
      className="relative h-[400px] overflow-hidden"
    >
      <video
        id="package-hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="https://res.cloudinary.com/digipumwy/video/upload/v1753761588/132140-752588954_medium_h5cgr7.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          {t('packages.title')}
        </motion.h1>
        <motion.p
          className="text-xl text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('packages.subtitle')}
        </motion.p>
        <div className="w-full max-w-4xl pt-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col md:flex-row gap-2"
            style={{ padding: '13px' }}>
            <Dropdown
              label={t('packages.filters.duration.label')}
              options={durations}
              value={filters.duration}
              onChange={(value) => onFilterChange('duration', value)}
              className="flex-1"
            />
            <Dropdown
              label={t('packages.filters.price.label')}
              options={priceRanges}
              value={filters.priceRange}
              onChange={(value) => onFilterChange('priceRange', value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};