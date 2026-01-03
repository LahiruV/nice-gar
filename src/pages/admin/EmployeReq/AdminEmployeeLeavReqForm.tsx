import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';

interface PackageFormProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editData: EmployeeLeaveRequest | null;
    setEditingData: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    dataView: EmployeeLeaveRequest | null;
    setDataView: Function;
    formData: EmployeeLeaveRequestFormData;
    setFormData: Function;
    refetch: Function;
}

const initialFormData: EmployeeLeaveRequestFormData = {
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',
};

export const AdminEmployeeLeavReqForm = ({
    isModalOpen,
    setIsModalOpen,
    editData,
    setEditingData,
    isViewModalOpen,
    setIsViewModalOpen,
    dataView,
    formData,
    setFormData,
    refetch,
}: PackageFormProps) => {

    // const { employeeAddMutate, employeeUpdateMutate } = useEmployee();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: EmployeeLeaveRequestFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editData) {
            const updatedObj: EmployeeLeaveRequestFormData = {
                ...formData,
                id: editData._id ? editData._id : undefined
            };
            // employeeUpdateMutate(updatedEmployee, {
            //     onSuccess: () => {
            //         refetch();
            //         setFormData(initialFormData);
            //         toast.success('EmployeeLeaveRequest updated successfully!');
            //     },
            //     onError: (error) => {
            //         toast.error('EmployeeLeaveRequest update failed');
            //         console.error('EmployeeLeaveRequest update failed:', error);
            //     }
            // });
        } else {
            // employeeAddMutate(formData, {
            //     onSuccess: () => {
            //         refetch();
            //         setFormData(initialFormData);
            //         toast.success('EmployeeLeaveRequest added successfully!');
            //     },
            //     onError: (error) => {
            //         toast.error('EmployeeLeaveRequest addition failed');
            //         console.error('EmployeeLeaveRequest addition failed:', error);
            //     }
            // });
        }
        handleCloseModal();
    };

    const handleEdit = (data: EmployeeLeaveRequest) => {
        setEditingData(data);
        setFormData({
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            status: data.status,
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingData(null);
        setFormData(initialFormData);
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                title={editData ? 'Edit Leave Request Form' : 'Add New Leave Request'}
            >
                <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <TextField
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        type='date'
                        onChange={handleInputChange}
                        required
                        focused
                    />

                    <TextField
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        type='date'
                        onChange={handleInputChange}
                        required
                        focused
                    />

                    <TextField
                        label="Reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        focused
                        required
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
                            {editData ? 'Update Leave Request' : 'Add Leave Request'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="EmployeeLeaveRequest Details"
            >
                {dataView && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Employee Name</h3>
                                <p className="text-gray-700">{dataView.employeeName}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Start Date</h3>
                                <p className="text-gray-700">{dataView.startDate}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">End Date</h3>
                                <p className="text-gray-700">{dataView.endDate}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Reason</h3>
                                <p className="text-gray-700">{dataView.reason}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                                <p className="text-gray-700">{dataView.status}</p>
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
                                    handleEdit(dataView);
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