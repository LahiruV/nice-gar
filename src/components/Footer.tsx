import { useTranslation } from 'react-i18next';
import { COMPANY_NAME } from '@zenra/constants';
import { PowerdBy } from '@zenra/widgets';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{COMPANY_NAME}</h3>
            <p className="text-gray-400">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2">
              <li><a href="/destinations" className="text-gray-400 hover:text-white">{t('footer.quickLinks.destinations')}</a></li>
              <li><a href="/packages" className="text-gray-400 hover:text-white">{t('footer.quickLinks.packages')}</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">{t('footer.quickLinks.about')}</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">{t('footer.quickLinks.contact')}</a></li>
              <li><a href="/admin" className="text-gray-400 hover:text-white">Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.popularDestinations.title')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.popularDestinations.colombo')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.popularDestinations.kandy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">{t('footer.popularDestinations.galle')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footer.contact.email')}</li>
              <li>{t('footer.contact.phone')}</li>
              <li>{t('footer.contact.address')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          {/* <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. {t('footer.rights')}</p> */}
          <PowerdBy isFull={true} /> All rights reserved.
        </div>
      </div>
    </footer>
  );
};