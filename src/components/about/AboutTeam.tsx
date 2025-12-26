import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const leader = [
  {
    key: 'ceo',
    image: '../../images/ceo.jpg',
    social: {
      phone: '+94 74 386 2351',
      whatsapp: '+94743862351',
      email: 'lahiruclassen56@gmail.com',
      instagram: 'https://www.instagram.com/laheev?igsh=MTduZmRvNXQ5dTY0bA=='
    }
  }
];

export const SocialLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
  >
    <img src={icon} alt={label} className="w-5 h-5" />
    <span>{label}</span>
  </a>
);

export const AboutTeam = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('about.team.title')}</h2>
      <div className="flex justify-center">
        {leader.map((member, index) => (
          <motion.div
            key={member.key}
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img
              src={member.image}
              alt={t(`about.team.members.${member.key}.name`)}
              className="w-full h-96 object-cover object-top"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t(`about.team.members.${member.key}.name`)}
              </h3>
              <p className="text-blue-600 mb-4 text-lg">
                {t(`about.team.members.${member.key}.role`)}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t(`about.team.members.${member.key}.description`)}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed pt-5 font-bold">
                Hospitality Management
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-bold">
                NTD License Holder
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <PhoneIcon className="h-5 w-5" />
                  <a href={`tel:${member.social.phone}`} className="hover:text-primary transition-colors">
                    {member.social.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <EnvelopeIcon className="h-5 w-5" />
                  <a href={`mailto:${member.social.email}`} className="hover:text-primary transition-colors">
                    {member.social.email}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <SocialLink
                    href={`https://wa.me/${member.social.whatsapp}`}
                    icon="https://cdn.cdnlogo.com/logos/w/29/whatsapp-icon.svg"
                    label="WhatsApp"
                  />
                  {/* <SocialLink
                    href={member.social.instagram}
                    icon="https://cdn.cdnlogo.com/logos/i/92/instagram.svg"
                    label="Instagram"
                  />
                  <SocialLink
                    href={member.social.instagram}
                    icon="https://cdn.cdnlogo.com/logos/i/92/facebook.svg"
                    label="Facebook"
                  /> */}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};