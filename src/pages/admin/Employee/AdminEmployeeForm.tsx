import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { Package, EmployeeFormData } from '@zenra/models';
import { toast } from 'sonner';
import { useImageToBase64, usePackage } from '@zenra/services';
import { Input } from '@mui/material';

interface PackageFormProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editingPackage: Package | null;
    setEditingPackage: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    viewingPackage: Package | null;
    setViewingPackage: Function;
    formData: EmployeeFormData;
    setFormData: Function;
    refetch: Function;
}

const initialFormData: EmployeeFormData = {
    title: '',
    description: '',
    image: '',
    price: 0,
    duration: '',
    groupSize: '',
    startDate: '',
};

export const AdminEmployeeForm = ({
    isModalOpen,
    setIsModalOpen,
    editingPackage,
    setEditingPackage,
    isViewModalOpen,
    setIsViewModalOpen,
    viewingPackage,
    formData,
    setFormData,
    refetch,
}: PackageFormProps) => {

    const { packageAddMutate, packageUpdateMutate } = usePackage();
    const { imageToBase64Mutate } = useImageToBase64();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        name === "duration" ?
            setFormData((prev: EmployeeFormData) => ({ ...prev, [name]: Math.max(0, parseInt(value)) })) :
            name === "price" ?
                setFormData((prev: EmployeeFormData) => ({ ...prev, [name]: Math.max(0, parseFloat(value)) })) :
                setFormData((prev: EmployeeFormData) => ({
                    ...prev,
                    [name]: name === 'price' ? parseFloat(value) || 0 : value
                }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPackage) {
            const updatedPackage: EmployeeFormData = {
                ...formData,
                id: editingPackage._id ? editingPackage._id : undefined
            };
            packageUpdateMutate(updatedPackage, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Package updated successfully!');
                },
                onError: (error) => {
                    toast.error('Package update failed');
                    console.error('Package update failed:', error);
                }
            });
        } else {
            packageAddMutate(formData, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Package added successfully!');
                },
                onError: (error) => {
                    toast.error('Package addition failed');
                    console.error('Package addition failed:', error);
                }
            });
        }
        handleCloseModal();
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            image: pkg.image,
            price: pkg.price,
            duration: pkg.duration,
            groupSize: pkg.groupSize,
            startDate: pkg.startDate,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPackage(null);
        setFormData(initialFormData);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                title={editingPackage ? 'Edit Package Form' : 'Add New Employee'}
            >
                <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <TextField
                        label="Package Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        required
                    />

                    <Input
                        type='file'
                        name="image"
                        onChange={(e) => {
                            const input = e.target as HTMLInputElement;
                            const file = input.files?.[0];
                            if (file) {
                                imageToBase64Mutate(file, {
                                    onSuccess: (base64Image) => {
                                        setFormData((prev: EmployeeFormData) => ({
                                            ...prev,
                                            image: base64Image
                                        }));
                                    },
                                    onError: (error) => {
                                        toast.error('Image conversion failed');
                                        console.error('Image conversion failed:', error);
                                    }
                                });
                            }
                        }}
                        required
                        inputProps={{ accept: 'image/*' }}
                        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Price ($)"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />

                        <TextField
                            label="Duration Days"
                            name="duration"
                            type='number'
                            value={formData.duration}
                            onChange={handleInputChange}
                            required
                            helperText="e.g 5 Days"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Group Size"
                            name="groupSize"
                            value={formData.groupSize}
                            onChange={handleInputChange}
                            required
                            helperText="e.g., Max 10"
                        />

                        <TextField
                            label="Availability"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            required
                            helperText="e.g., Available year-round"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            {editingPackage ? 'Update Package' : 'Add Package'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Package Details"
            >
                {viewingPackage && (
                    <div className="space-y-6">
                        <img

                            src={`data:image/png;base64,${viewingPackage.image}`}
                            alt={viewingPackage.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {viewingPackage.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{viewingPackage.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="font-semibold text-gray-700">Price:</span>
                                <p className="text-2xl font-bold text-primary">${viewingPackage.price}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Duration:</span>
                                <p className="text-gray-900">{viewingPackage.duration}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Group Size:</span>
                                <p className="text-gray-900">{viewingPackage.groupSize}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Availability:</span>
                                <p className="text-gray-900">{viewingPackage.startDate}</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6">
                            <Button
                                variant="outline"
                                onClick={() => setIsViewModalOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setIsViewModalOpen(false);
                                    handleEdit(viewingPackage);
                                }}
                                startIcon={<PencilIcon className="h-5 w-5" />}
                            >
                                Edit Package
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};