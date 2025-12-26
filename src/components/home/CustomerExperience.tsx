import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { StarIcon } from '@heroicons/react/24/solid';
import { getFeedbacks } from '@zenra/services';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularIndeterminate } from '@zenra/widgets';

export const CustomerExperience = () => {
  const { t } = useTranslation();
  const { response, isFetching } = getFeedbacks(true);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const feedbacks = response?.data || [];
  const displayedFeedbacks = useMemo(
    () => (expanded ? feedbacks : feedbacks.slice(0, 6)),
    [expanded, feedbacks]
  );

  const toggleLabel = expanded
    ? t('home.testimonials.showLess', 'Less Travelers Experiences')
    : t('home.testimonials.readMore', 'More Travelers Experiences');

  return (
    <section className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {t('home.testimonials.subtitle')}
          </p>
        </AnimatedSection>

        {isFetching ? <CircularIndeterminate /> :
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedFeedbacks.map((feedback, index) => (
              <AnimatedSection key={feedback.id} delay={index * 0.2}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg p-6"
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        feedback.name
                      )}`}
                      alt={feedback.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                      <p className="text-gray-500 text-sm">{feedback.country || 'Unknown'}</p>
                    </div>
                  </div>

                  <div className="flex mb-4" aria-label={t('home.testimonials.ratingLabel', 'Rating')}>
                    {[...Array(Math.round(feedback.serviceRating))].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    ))}
                  </div>

                  <p className="text-gray-600 italic">"{feedback.message}"</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        }

        {feedbacks.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              aria-expanded={expanded}
              aria-label={toggleLabel}
              onClick={() => setExpanded(prev => !prev)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {toggleLabel}
              <motion.span
                className="ml-2"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            </button>
          </div>
        )}
      </div>
      <div className='flex justify-center'>
        <motion.button
          onClick={() => {
            navigate('/contact');
          }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold  hover:bg-blue-700 transition-colors mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Feedback
        </motion.button>
      </div>
    </section>
  );
};
