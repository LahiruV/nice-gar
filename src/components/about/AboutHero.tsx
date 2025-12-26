import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export const AboutHero = () => {
  const { t } = useTranslation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.getElementById('about-hero-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => console.log('Auto-play prevented:', error));
    }
  }, []);

  return (
    <div
      className="relative h-[400px] overflow-hidden"
    >
      <video
        id="about-hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="https://res.cloudinary.com/digipumwy/video/upload/v1753761835/191283-889685028_tiny_difp4r.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          {t('about.hero.title')}
        </motion.h1>
        <motion.p
          className="text-xl text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0, y: isVideoLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('about.hero.subtitle')}
        </motion.p>
      </div>
    </div>
  );
};