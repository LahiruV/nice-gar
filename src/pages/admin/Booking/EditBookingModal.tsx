import { useState, useEffect } from 'react';
import { Modal, Button, TextField, Checkbox, FormGroup } from '@zenra/widgets';
import { BookingDetails } from '@zenra/models';
import { useTranslation } from 'react-i18next';
import { UserIcon, EnvelopeIcon, PhoneIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface EditBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: BookingDetails | null;
    onUpdate: (updatedBooking: BookingDetails) => Promise<void>;
}

export const EditBookingModal = ({ isOpen, onClose, booking, onUpdate }: EditBookingModalProps) => {
    const { t } = useTranslation();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState<BookingDetails | null>(booking);

    useEffect(() => {
        setFormData(booking);
    }, [booking]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!formData) return;
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;
        name === "adults" ?
            setFormData(prev => ({ ...prev!, [name]: Math.max(1, parseInt(value)) })) :
            name === "children" || name === "discount" || name === "increasePrice" ?
                setFormData(prev => ({ ...prev!, [name]: Math.max(0, parseInt(value)) })) :
                name === "travelDate" ?
                    setFormData(prev => ({ ...prev!, [name]: value >= today ? value : today })) :
                    setFormData(prev => ({
                        ...prev!,
                        [name]: type === 'checkbox' ? checked : value
                    }));
    };

    const handleMealPlanChange = (plan: 'bb' | 'hb' | 'fb') => {
        if (!formData) return;
        setFormData(prev => ({
            ...prev!,
            mealPlan: plan
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            await onUpdate(formData);
            onClose();
        }
    };

    if (!formData) return null;

    return (
        <Modal open={isOpen} onClose={onClose} title={'Edit Booking Form'}>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
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
                        inputProps: { min: today }
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
                        value={formData.children}
                        onChange={handleChange}
                        startIcon={<UserGroupIcon className="h-5 w-5" />}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        label={'Increase Amount'}
                        name="increasePrice"
                        type="number"
                        value={formData.increasePrice}
                        onChange={handleChange}
                        required
                        startIcon={<UserGroupIcon className="h-5 w-5" />}
                    />

                    <TextField
                        label={'Discount'}
                        name="discount"
                        type="number"
                        value={formData.discount}
                        onChange={handleChange}
                        startIcon={<UserGroupIcon className="h-5 w-5" />}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-semibold">{t('packages.booking.form.services.mealPlan.label')}</label>
                    <div className="flex gap-4">
                        {['bb', 'hb', 'fb'].map((plan) => (
                            <label key={plan} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="mealPlan"
                                    value={plan}
                                    checked={formData.mealPlan === plan}
                                    onChange={() => handleMealPlanChange(plan as 'bb' | 'hb' | 'fb')}
                                />
                                <span>{t(`packages.booking.form.services.mealPlan.${plan}.title`)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <FormGroup>
                    <Checkbox
                        checked={!!formData.includeTransport}
                        onChange={handleChange}
                        name="includeTransport"
                        label={t('packages.booking.form.services.transport')}
                    />
                    <Checkbox
                        checked={!!formData.includeAccommodation}
                        onChange={handleChange}
                        name="includeAccommodation"
                        label={t('packages.booking.form.services.accommodation')}
                    />
                </FormGroup>

                <TextField
                    label={t('packages.booking.form.specialRequests.label')}
                    name="specialRequests"
                    multiline
                    rows={3}
                    value={formData.specialRequests}
                    onChange={handleChange}
                />

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Update Booking
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
