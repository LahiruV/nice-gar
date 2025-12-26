import { Modal } from '@zenra/widgets';
import { useTranslation } from 'react-i18next';
import { Button } from '@zenra/widgets';
import { MapIcon } from '@heroicons/react/24/outline';

interface LocationMapModalProps {
  open: boolean;
  onClose: () => void;
  locationId: string;
}

export const LocationMapModal = ({ open, onClose, locationId }: LocationMapModalProps) => {
  const { t } = useTranslation();
  const location = `destinations.locations.${locationId}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(`${location}.name`)}
    >
      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <iframe
          src={t(`map.locations.${locationId}.mapUrl`)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t(`${location}.name`)}
        />
      </div>
      <div className="mt-4 space-y-2 text-gray-600">
        <p>
          <span className="font-semibold">{t('map.duration')}:</span>{' '}
          {t(`map.locations.${locationId}.duration`)}
        </p>
        <p>
          <span className="font-semibold">{t('map.distance')}:</span>{' '}
          {t(`map.locations.${locationId}.distance`)}
        </p>
        <div className="pt-5">
          <Button
            variant="primary"
            fullWidth
            startIcon={<MapIcon className="h-5 w-5" />}
            onClick={() => {
              window.open(`https://www.google.com/maps/dir/Current+Location/${t(`destinations.locations.${locationId}.name`, { lng: 'en' })}+Sri+Lanka`, '_blank');
            }}
          >
            {t('destinations.getDirections')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};