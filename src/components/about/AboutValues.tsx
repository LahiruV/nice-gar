import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAsiaAustraliaIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const values = [
  {
    icon: ShieldCheckIcon,
    key: 'trust'
  },
  {
    icon: GlobeAsiaAustraliaIcon,
    key: 'sustainability'
  },
  {
    icon: UserGroupIcon,
    key: 'personal'
  },
  {
    icon: SparklesIcon,
    key: 'excellence'
  }
];

export const AboutValues = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.services.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.key}
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <value.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">
              {t(`about.services.items.${value.key}.title`)}
            </h3>
            <p className="text-text/60">
              {t(`about.services.items.${value.key}.description`)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};