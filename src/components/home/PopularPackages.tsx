import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedSection } from './AnimatedSection';
import { Button } from '@zenra/widgets';
import { Link, useNavigate } from 'react-router-dom';

export const PopularPackages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const packages = [
    {
      id: 'cultural',
      image: 'https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 1299
    },
    {
      id: 'beach',
      image: 'https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 999
    },
    {
      id: 'wildlife',
      image: 'https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 1499
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{t('home.packages.title')}</h2>
          <p className="text-gray-600 text-center mb-12">{t('home.packages.subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.id} delay={index * 0.2}>
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={pkg.image}
                  alt={t(`home.packages.${pkg.id}.title`)}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`home.packages.${pkg.id}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(`home.packages.${pkg.id}.description`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${pkg.price}</span>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/packages')}
                    >
                      {t('home.packages.viewDetails')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};