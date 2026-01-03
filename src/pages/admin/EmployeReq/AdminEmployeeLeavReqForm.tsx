import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';
import { toast } from 'sonner';
import { useLeaveRequest } from '@zenra/services';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';

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
    status1: false,
    status2: false,
    status3: false,
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

    const { leaveReqAddMutate, leaveReqUpdateMutate } = useLeaveRequest();
    const { loggedEmployee } = useSelector((state: RootState) => state.auth);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: EmployeeLeaveRequestFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(formData.startDate);
        startDate.setHours(0, 0, 0, 0);
        if (startDate < today) {
            toast.error('Start date cannot be in the past');
            return;
        }
        const endDate = new Date(formData.endDate);
        endDate.setHours(0, 0, 0, 0);
        if (endDate < startDate) {
            toast.error('End date cannot be before start date');
            return;
        }

        if (editData) {
            const updatedObj: EmployeeLeaveRequestFormData = {
                ...formData,
                id: editData._id ? editData._id : undefined
            };
            leaveReqUpdateMutate(updatedObj, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Leave request updated successfully!');
                },
                onError: (error: any) => {
                    toast.error('Leave request update failed');
                    console.error('Leave request update failed:', error);
                }
            });
        } else {
            const addObj: EmployeeLeaveRequestFormData = {
                ...formData,
                employeeId: loggedEmployee ? loggedEmployee.employeeId : '',
            };
            leaveReqAddMutate(addObj, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Leave request added successfully!');
                },
                onError: (error: any) => {
                    toast.error('Leave request addition failed');
                    console.error('Leave request addition failed:', error);
                }
            });
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
            status1: data.status1,
            status2: data.status2,
            status3: data.status3,
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
                                <p className="text-gray-700">{`${dataView.status1}, ${dataView.status2}, ${dataView.status3}`}</p>
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