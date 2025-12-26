import { useTranslation } from 'react-i18next';
import { Dropdown } from '@zenra/widgets';

interface DestinationHeroProps {
  filters: {
    province: string;
    category: string;
    season: string;
  };
  onFilterChange: Function;
}

export const DestinationHero = ({ filters, onFilterChange }: DestinationHeroProps) => {
  const { t } = useTranslation();

  const provinces = [
    { value: 'all', label: t('destinations.filters.provinces.all') },
    { value: 'central', label: t('destinations.filters.provinces.central') },
    { value: 'eastern', label: t('destinations.filters.provinces.eastern') },
    { value: 'northern', label: t('destinations.filters.provinces.northern') },
    { value: 'southern', label: t('destinations.filters.provinces.southern') },
    { value: 'western', label: t('destinations.filters.provinces.western') },
    { value: 'north-central', label: t('destinations.filters.provinces.northCentral') },
    { value: 'uva', label: t('destinations.filters.provinces.uva') },
  ];

  const categories = [
    { value: 'all', label: t('destinations.filters.categories.all') },
    { value: 'unesco', label: t('destinations.filters.categories.unesco') },
    { value: 'beach', label: t('destinations.filters.categories.beach') },
    { value: 'wildlife', label: t('destinations.filters.categories.wildlife') },
    { value: 'cultural', label: t('destinations.filters.categories.cultural') },
    { value: 'historical', label: t('destinations.filters.categories.historical') },
    { value: 'adventure', label: t('destinations.filters.categories.adventure') },
    { value: 'nature', label: t('destinations.filters.categories.nature') },
  ];

  const seasons = [
    { value: 'all', label: t('destinations.filters.seasons.all') },
    { value: 'dec-mar', label: t('destinations.filters.seasons.decMar') },
    { value: 'apr-may', label: t('destinations.filters.seasons.aprMay') },
    { value: 'jun-sep', label: t('destinations.filters.seasons.junSep') },
    { value: 'oct-nov', label: t('destinations.filters.seasons.octNov') },
  ];

  return (
    <div
      className="relative h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: 'url("../../images/destination.avif")',
      }}
    >
      <div className="relative bg-black bg-opacity-50 z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" style={{ paddingTop: "130px" }}>{t('destinations.title')}</h1>
        <p className="text-xl text-center max-w-2xl mb-8">{t('destinations.subtitle')}</p>
        <div className="w-full max-w-4xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 flex flex-col md:flex-row gap-2"
            style={{ padding: '13px' }}>
            <Dropdown
              label={t('destinations.filters.province')}
              options={provinces}
              value={filters.province}
              onChange={(value) => onFilterChange('province', value)}
              className="flex-1"
            />
            <Dropdown
              label={t('destinations.filters.category')}
              options={categories}
              value={filters.category}
              onChange={(value) => onFilterChange('category', value)}
              className="flex-1"
            />
            <Dropdown
              label={t('destinations.filters.season')}
              options={seasons}
              value={filters.season}
              onChange={(value) => onFilterChange('season', value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};