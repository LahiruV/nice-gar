import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { Employee, EmployeeFormData } from '@zenra/models';
import { toast } from 'sonner';
import { useImageToBase64, usePackage } from '@zenra/services';
import { Input } from '@mui/material';

interface PackageFormProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editingPackage: Employee | null;
    setEditingPackage: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    viewingPackage: Employee | null;
    setViewingPackage: Function;
    formData: EmployeeFormData;
    setFormData: Function;
    refetch: Function;
}

const initialFormData: EmployeeFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    position: '',
    image: '',
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

    const handleEdit = (pkg: Employee) => {
        setEditingPackage(pkg);
        setFormData({
            firstName: pkg.firstName,
            lastName: pkg.lastName,
            email: pkg.email,
            phone: pkg.phone,
            password: pkg.password,
            position: pkg.position,
            image: pkg.image,
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />

                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={!editingPackage}
                        helperText={editingPackage ? "Leave blank to keep current password" : ""}
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
                            {editingPackage ? 'Update Employee' : 'Add Employee'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Employee Details"
            >
                {viewingPackage && (
                    <div className="space-y-6">
                        <img

                            src={`data:image/png;base64,${viewingPackage.image}`}
                            alt={viewingPackage.firstName + " " + viewingPackage.lastName}
                            className="w-full h-64 object-cover rounded-lg"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {viewingPackage.firstName + " " + viewingPackage.lastName}
                            </h2>
                            <p className="text-gray-600 mb-4">{viewingPackage.position}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-700">{viewingPackage.email}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                                <p className="text-gray-700">{viewingPackage.phone}</p>
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