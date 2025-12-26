import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';

export const CallToAction = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleExplore = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/packages');
  }, [navigate]);

  useEffect(() => {
    const video = document.getElementById('cta-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => console.log('Auto-play prevented:', error));
    }
  }, []);

  return (
    <motion.section
      className="relative py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <video
        id="cta-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="https://res.cloudinary.com/digipumwy/video/upload/v1753760488/4611986-uhd_2560_1440_30fps_bma6qc.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <h2 className="text-3xl font-bold text-white mb-4">{t('home.cta.title')}</h2>
        <p className="text-xl text-white mb-8">{t('home.cta.subtitle')}</p>
        <motion.button
          onClick={handleExplore}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('home.cta.button')}
        </motion.button>
      </div>
    </motion.section>
  );
};