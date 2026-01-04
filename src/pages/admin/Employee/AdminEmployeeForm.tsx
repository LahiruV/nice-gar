import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { Employee, EmployeeFormData } from '@zenra/models';
import { toast } from 'sonner';
import { useEmployee, useImageToBase64 } from '@zenra/services';
import { Input, MenuItem, Select } from '@mui/material';

interface PackageFormProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editingEmployee: Employee | null;
    setEditingEmployee: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    viewingEmployee: Employee | null;
    setViewingEmployee: Function;
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
    editingEmployee,
    setEditingEmployee,
    isViewModalOpen,
    setIsViewModalOpen,
    viewingEmployee,
    formData,
    setFormData,
    refetch,
}: PackageFormProps) => {

    const { employeeAddMutate, employeeUpdateMutate } = useEmployee();
    const { imageToBase64Mutate } = useImageToBase64();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: EmployeeFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEmployee) {
            const updatedEmployee: EmployeeFormData = {
                ...formData,
                id: editingEmployee._id ? editingEmployee._id : undefined
            };
            employeeUpdateMutate(updatedEmployee, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Employee updated successfully!');
                },
                onError: (error) => {
                    toast.error('Employee update failed');
                    console.error('Employee update failed:', error);
                }
            });
        } else {
            employeeAddMutate(formData, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Employee added successfully!');
                },
                onError: (error) => {
                    toast.error('Employee addition failed');
                    console.error('Employee addition failed:', error);
                }
            });
        }
        handleCloseModal();
    };

    const handleEdit = (data: Employee) => {
        setEditingEmployee(data);
        setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            position: data.position,
            image: data.image,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
        setFormData(initialFormData);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                title={editingEmployee ? 'Edit Employee Form' : 'Add New Employee'}
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

                    <Select
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={(e) => setFormData((prev: EmployeeFormData) => ({
                            ...prev,
                            position: e.target.value as string
                        }))}
                        fullWidth
                        required
                        defaultValue=''
                    >
                        <MenuItem value="" style={{
                            color: 'red'
                        }}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                        <MenuItem value="General Manager">General Manager</MenuItem>
                        <MenuItem value="Factory Manager">Factory Manager</MenuItem>
                        <MenuItem value="LSO Officer">LSO Officer</MenuItem>
                    </Select>

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required={!editingEmployee}
                        helperText={editingEmployee ? "Leave blank to keep current password" : ""}
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
                            {editingEmployee ? 'Update Employee' : 'Add Employee'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Employee Details"
            >
                {viewingEmployee && (
                    <div className="space-y-6">
                        <img

                            src={`data:image/png;base64,${viewingEmployee.image}`}
                            alt={viewingEmployee.firstName + " " + viewingEmployee.lastName}
                            className="w-full h-64 object-cover rounded-lg"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {viewingEmployee.firstName + " " + viewingEmployee.lastName}
                            </h2>
                            <p className="text-gray-600 mb-4">{viewingEmployee.position}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-700">{viewingEmployee.email}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                                <p className="text-gray-700">{viewingEmployee.phone}</p>
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
                                    handleEdit(viewingEmployee);
                                }}
                                startIcon={<PencilIcon className="h-5 w-5" />}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};