import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const destinations = [
  {
    id: 'kandy',
    image: "../../images/kandy.jpg",
  },
  {
    id: 'yala',
    image: '../../images/elephant.jpg'
  },
  {
    id: 'galle',
    image: '../../images/galle.jpg'
  },
  {
    id: 'sigiriya',
    image: '../../images/sigiriya.jpg'
  },
  {
    id: 'ella',
    image: '../../images/ella.jpg'
  },
  {
    id: 'unawatuna',
    image: '../../images/rekawa.jpeg'
  }
];

export const FeaturedDestinations = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDestinationClick = (id: string) => {
    navigate('/destinations', { state: { selectedDestination: id } });
  };

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-full">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('featured.title')}</h2>
          </div>
        </AnimatedSection>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            reverseDirection: true
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
        >
          {destinations.map((destination) => (
            <SwiperSlide key={destination.id}>
              <motion.div
                className="rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleDestinationClick(destination.id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={destination.image}
                  alt={t(`destinations.locations.${destination.id}.name`)}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`featured.locations.${destination.id}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`featured.locations.${destination.id}.description`)}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};