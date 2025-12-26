import { EnvelopeIcon, PhoneIcon, MapPinIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { SocialLink } from '../about/AboutTeam';

export const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t('contact.info.title')}
      </h2>

      <div className="space-y-8">
        <div className="flex items-start">
          <MapPinIcon className="h-6 w-6 text-primary mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-text">{t('contact.info.address.label')}</h3>
            <p className="text-text/60">
              {t('contact.info.address.value').split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <PhoneIcon className="h-6 w-6 text-primary mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-text">{t('contact.info.phone.label')}</h3>
            <p className="text-text/60">
              +94 74 386 2351
            </p>
            <SocialLink
              href={`https://wa.me/+94743862351`}
              icon="https://cdn.cdnlogo.com/logos/w/29/whatsapp-icon.svg"
              label="WhatsApp"
            />
          </div>
        </div>

        <div className="flex items-start">
          <EnvelopeIcon className="h-6 w-6 text-primary mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-text">{t('contact.info.email.label')}</h3>
            <p className="text-text/60">
              lahiruclassen56@gmail.com
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <ClockIcon className="h-6 w-6 text-primary mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-text">{t('contact.info.hours.label')}</h3>
            <p className="text-text/60">
              24/7
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <GlobeAltIcon className="h-6 w-6 text-primary mt-1" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-text">{t('contact.info.languages.label')}</h3>
            <p className="text-text/60">
              {t('contact.info.languages.value')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};