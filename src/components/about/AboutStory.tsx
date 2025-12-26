import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const AboutStory = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.story.title')}</h2>
        <div className="prose prose-lg">
          {t<string[]>('about.story.content', { returnObjects: true }).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
        <div className="prose prose-lg">
          {t<string[]>('about.mission.content', { returnObjects: true }).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};