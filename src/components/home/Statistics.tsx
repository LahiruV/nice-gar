import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AnimatedSection } from './AnimatedSection';

export const Statistics = () => {
  const { t } = useTranslation();

  const stats = [
    { key: 'destinations', icon: '🌍' },
    { key: 'travelers', icon: '👥' },
    { key: 'experience', icon: '⭐' },
    { key: 'satisfaction', icon: '💯' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.key} delay={index * 0.2}>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl mb-4 block">{stat.icon}</span>
                <div className="text-3xl font-bold text-primary mb-2">
                  {t(`home.stats.${stat.key}.value`)}
                </div>
                <div className="text-gray-600">
                  {t(`home.stats.${stat.key}.label`)}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};