import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const stats = [
  { 
    value: '5+',
    label: 'about.stats.experience.label'
  },
  { 
    value: '10K+',
    label: 'about.stats.travelers.label'
  },
  { 
    value: '100+',
    label: 'about.stats.destinations.label'
  },
  { 
    value: '30+',
    label: 'about.stats.services.label'
  }
];

export const AboutStats = () => {
  const { t } = useTranslation();

  return (
    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 -mt-16 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-sm text-text/60">{t(stat.label)}</div>
        </motion.div>
      ))}
    </div>
  );
};