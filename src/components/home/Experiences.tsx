import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const experiences = [
  {
    id: 'adventure',
    icon: '🏃‍♂️'
  },
  {
    id: 'wellness',
    icon: '🧘‍♀️'
  },
  {
    id: 'culinary',
    icon: '🍛'
  },
  {
    id: 'wildlife',
    icon: '🐘'
  },
  {
    id: 'surfing',
    icon: '🏄‍♂️'
  },
  {
    id: 'hiking',
    icon: '🏔️'
  },
  {
    id: 'cultural',
    icon: '🎭'
  },
  {
    id: 'food',
    icon: '🥘'
  }
];

export const Experiences = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-full">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{t('home.experiences.title')}</h2>
            <p className="text-gray-600 text-center mb-12">{t('home.experiences.subtitle')}</p>
          </div>
        </AnimatedSection>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }} 
          className="experiences-slider"
        >
          {experiences.map((experience) => (
            <SwiperSlide key={experience.id}>
              <motion.div 
                className="text-center bg-white rounded-lg shadow-lg overflow-hidden p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`home.experiences.${experience.id}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`home.experiences.${experience.id}.description`)}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};