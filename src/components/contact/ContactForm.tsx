import { useState } from 'react';
import { TextField, Button } from '@zenra/widgets';
import { TextField as MuiTextField } from '@mui/material';
import { EnvelopeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Rating } from '@mui/material';
import { FeedbackFormData } from '@zenra/models';
import { useFeedback } from '@zenra/services';
import { toast } from 'sonner';

// ✅ Add this country list (can be moved to a utils file)
const countries = [
  'Albania', 'Andorra', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bangladesh', 'Belarus', 'Belgium', 'Bosnia and Herzegovina', 'Brazil',
  'Bulgaria', 'Canada', 'China', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany',
  'Greece', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Ireland',
  'Italy', 'Japan', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Malaysia', 'Malta', 'Mexico', 'Moldova',
  'Monaco', 'Montenegro', 'Netherlands', 'New Zealand', 'North Macedonia',
  'Norway', 'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Romania',
  'Russia', 'San Marino', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia',
  'South Africa', 'Spain', 'Sri Lanka', 'Sweden', 'Switzerland',
  'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States',
  'Vatican City'
].sort();

export const ContactForm = () => {
  const { t } = useTranslation();
  const { feedBackMutate } = useFeedback();

  const [formData, setFormData] = useState<FeedbackFormData & { country?: string }>({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceRating: 0.5,
    country: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    feedBackMutate(formData, {
      onSuccess: () => {
        toast.success(t('Feedback submitted successfully'));
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          serviceRating: 0.5,
          country: ''
        });
      },
      onError: (error) => {
        toast.error(t('Feedback submission failed'));
        console.error('Feedback submission failed:', error);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setFormData(prev => ({
      ...prev,
      serviceRating: newValue ?? 1
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t('contact.form.title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label={t('contact.form.name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          startIcon={<UserIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('contact.form.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          startIcon={<EnvelopeIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('contact.form.phone')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          startIcon={<PhoneIcon className="h-5 w-5" />}
        />

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Country
          </label>
          <Autocomplete
            options={countries}
            value={formData.country || ''}
            onChange={(_, newValue) => {
              setFormData(prev => ({
                ...prev,
                country: newValue || ''
              }));
            }}
            renderInput={(params) => (
              <MuiTextField
                {...params}
                placeholder={'Select a country'}
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            {t('contact.form.rate')}
          </label>
          <Rating
            className='pl-2'
            name="serviceRating"
            value={formData.serviceRating}
            onChange={handleRatingChange}
            precision={0.5}
          />
        </div>
        <TextField
          label={t('contact.form.message.label')}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          multiline
          rows={4}
          helperText={t('contact.form.message.placeholder')}
        />

        <Button
          style={{ marginTop: '40px' }}
          type="submit"
          variant="primary"
          size="large"
          fullWidth
        >
          {t('contact.form.submit')}
        </Button>

      </form>
    </div>
  );
};