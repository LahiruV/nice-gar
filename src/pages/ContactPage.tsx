import { PageTransition, ContactForm, ContactInfo, TravelFeatures, ContactHero } from '@zenra/components';
import { useTranslation } from 'react-i18next';

export const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <ContactHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="text-center mt-16 mb-12">
            <p className="text-xl text-gray-600">
              {t('contact.description')}
            </p>
          </div>

          <TravelFeatures />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};