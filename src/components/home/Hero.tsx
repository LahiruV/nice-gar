import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => console.log('Auto-play prevented:', error));
    }
  }, []);

  const handleExploreClick = () => {
    navigate('/packages');
  };

  return (
    <div
      className="relative h-[600px] overflow-hidden"
    >
      <video
        id="hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="https://res.cloudinary.com/digipumwy/video/upload/v1753761362/1550080-hd_1280_720_30fps_axgofx.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-white max-w-2xl">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0, x: isVideoLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0, x: isVideoLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
          >
            {t('home.hero.exploreButton')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};