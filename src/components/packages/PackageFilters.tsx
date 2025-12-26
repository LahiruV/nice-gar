import { Dropdown } from '@zenra/widgets';
import { PackageFilters as PackageFiltersProps } from '@zenra/models';
import { useTranslation } from 'react-i18next';

export const PackageFilters = ({
  duration,
  setDuration,
  priceRange,
  setPriceRange,
}: PackageFiltersProps) => {
  const { t } = useTranslation();

  const durationOptions = [
    { value: 'all', label: t('packages.filters.duration.all') },
    { value: '1-3', label: t('packages.filters.duration.short') },
    { value: '4-7', label: t('packages.filters.duration.medium') },
    { value: '8+', label: t('packages.filters.duration.long') },
  ];

  const priceOptions = [
    { value: 'all', label: t('packages.filters.price.all') },
    { value: '0-1000', label: t('packages.filters.price.budget') },
    { value: '1000-2000', label: t('packages.filters.price.standard') },
    { value: '2000+', label: t('packages.filters.price.luxury') },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Dropdown
        label={t('packages.filters.duration.label')}
        options={durationOptions}
        value={duration}
        onChange={setDuration}
      />
      <Dropdown
        label={t('packages.filters.price.label')}
        options={priceOptions}
        value={priceRange}
        onChange={setPriceRange}
      />
    </div>
  );
};