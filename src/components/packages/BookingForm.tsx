import { useState } from 'react';
import { TextField, Button, Checkbox, FormGroup } from '@zenra/widgets';
import { UserIcon, EnvelopeIcon, PhoneIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { BookingFormData, BookingFormProps } from '@zenra/models';
import { useTranslation } from 'react-i18next';

export const BookingForm = ({ packageName, packageId, onSubmit, isLoading }: BookingFormProps) => {
  const { t } = useTranslation();
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<BookingFormData>({
    packageId: packageId,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    adults: 1,
    children: 0,
    mealPlan: 'bb',
    status: 'pending',
    includeTransport: false,
    includeAccommodation: false,
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    name === "adults" ?
      setFormData(prev => ({ ...prev, [name]: Math.max(1, parseInt(value)) })) :
      name === "children" ?
        setFormData(prev => ({ ...prev, [name]: Math.max(0, parseInt(value)) })) :
        name === "travelDate" ?
          setFormData(prev => ({ ...prev, [name]: value >= today ? value : today })) :
          setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
          }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('packages.booking.title')} - {packageName}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label={t('packages.booking.form.firstName')}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            startIcon={<UserIcon className="h-5 w-5" />}
          />

          <TextField
            label={t('packages.booking.form.lastName')}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            startIcon={<UserIcon className="h-5 w-5" />}
          />
        </div>

        <TextField
          label={t('packages.booking.form.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          startIcon={<EnvelopeIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('packages.booking.form.phone')}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          startIcon={<PhoneIcon className="h-5 w-5" />}
        />

        <TextField
          label={t('packages.booking.form.travelDate')}
          name="travelDate"
          type="date"
          value={formData.travelDate}
          onChange={handleChange}
          required
          startIcon={<CalendarDaysIcon className="h-5 w-5" />}
          InputProps={{
            inputProps: { min: new Date().toISOString().split("T")[0] }
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label={t('packages.booking.form.adults')}
            name="adults"
            type="number"
            value={formData.adults}
            onChange={handleChange}
            required
            startIcon={<UserGroupIcon className="h-5 w-5" />}
          />

          <TextField
            label={t('packages.booking.form.children')}
            name="children"
            type="number"
            helperText='Please enter an age between 2 and 12'
            value={formData.children}
            onChange={handleChange}
            startIcon={<UserGroupIcon className="h-5 w-5" />}
          />
        </div>

        {/* <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('packages.booking.form.hotel.label')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageData.hotels.map((hotel) => (
              <div
                key={hotel.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.hotelId === hotel.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'
                  }`}
                onClick={() => handleChange({ target: { name: 'hotelId', value: hotel.id } } as any)}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold">{hotel.name}</h4>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1">{hotel.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="text-xl font-bold text-primary">
                  ${hotel.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {t('packages.booking.form.hotel.pricePerNight')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('packages.booking.form.services.title')}</h3>
          <FormGroup>
            <div className="space-y-4">
              <h4 className="font-medium">{t('packages.booking.form.services.mealPlan.label')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['bb', 'hb', 'fb'].map((plan) => (
                  <div
                    key={plan}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.mealPlan === plan
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                      }`}
                    onClick={() => handleChange({ target: { name: 'mealPlan', value: plan } } as any)}
                  >
                    <h5 className="font-semibold mb-2">
                      {t(`packages.booking.form.services.mealPlan.${plan}.title`)}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {t(`packages.booking.form.services.mealPlan.${plan}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Checkbox
              checked={formData.includeTransport}
              onChange={handleChange}
              name="includeTransport"
              label={t('packages.booking.form.services.transport')}
            />
            <Checkbox
              checked={formData.includeAccommodation}
              onChange={handleChange}
              name="includeAccommodation"
              label={t('packages.booking.form.services.accommodation')}
            />
          </FormGroup>
        </div>

        <TextField
          label={t('packages.booking.form.specialRequests.label')}
          name="specialRequests"
          multiline
          rows={4}
          value={formData.specialRequests}
          onChange={handleChange}
          helperText={t('packages.booking.form.specialRequests.placeholder')}
        />

        <Button
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={isLoading}
        >
          {t('packages.booking.form.submit')}
        </Button>
      </form>
    </div>
  );
};