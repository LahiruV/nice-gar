import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const images = [
  {
    url: 'https://res.cloudinary.com/digipumwy/image/upload/v1756013270/IMG-20250714-WA0002_puphqk.jpg',
    caption: 'gallery.beaches',
  },
  {
    url: 'https://images.unsplash.com/photo-1586846288010-25744d79a132?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'gallery.culture',
  },
  {
    url: 'https://res.cloudinary.com/digipumwy/image/upload/c_crop,w_2600,h_1950,ar_4:3,g_auto/v1756013516/IMG-20250714-WA0007_alpdsj.jpg',
    caption: 'gallery.nature',
  },
  {
    url: 'https://res.cloudinary.com/digipumwy/image/upload/v1756013379/IMG-20250714-WA0003_l60s0j.jpg',
    caption: 'gallery.wildlife',
  },
  {
    url: 'https://cdn.pixabay.com/photo/2018/03/18/00/59/mask-3235633_1280.jpg',
    caption: 'gallery.adventure',
  },
  {
    url: 'https://res.cloudinary.com/digipumwy/image/upload/v1756013731/IMG-20250714-WA0006_z4p9ma.jpg',
    caption: 'gallery.temples',
  },
];

const shuffleArray = (array: typeof images) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ImageGallery = () => {
  const { t } = useTranslation();
  const [currentImages, setCurrentImages] = useState(shuffleArray(images));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(shuffleArray(images));
    }, 5000); // Change images every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white relative">
      <div className="grid grid-cols-3 auto-rows-[300px]">
        {currentImages.map((image, index) => (
          <AnimatePresence key={image.url}>
            <motion.div
              className={`relative overflow-hidden cursor-pointer ${index === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <img
                src={image.url}
                alt={t(`home.${image.caption}`)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
};