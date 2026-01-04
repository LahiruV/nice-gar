import { TextField, Button, Modal } from '@zenra/widgets';
import { PencilIcon, } from '@heroicons/react/24/outline';
import { PackageOutRequest, PackageOutRequestFormData } from '@zenra/models';
import { toast } from 'sonner';
import { usePackageOutRequest } from '@zenra/services';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';

interface PackageFormProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editData: PackageOutRequest | null;
    setEditingData: Function;
    isViewModalOpen: boolean;
    setIsViewModalOpen: Function;
    dataView: PackageOutRequest | null;
    setDataView: Function;
    formData: PackageOutRequestFormData;
    setFormData: Function;
    refetch: Function;
}

const initialFormData: PackageOutRequestFormData = {
    employeeId: '',
    packageName: '',
    packageDetails: '',
    date: '',
    time: '',
    location: '',
    status1: 1,
    status2: 1,
    status3: 1,
    status4: 1,
};

export const PackageOutRequestForm = ({
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

    const { packageOutAddMutate, packageOutUpdateMutate } = usePackageOutRequest();
    const { loggedEmployee } = useSelector((state: RootState) => state.auth);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: PackageOutRequestFormData) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(formData.date);
        startDate.setHours(0, 0, 0, 0);
        if (startDate < today) {
            toast.error('Start date cannot be in the past');
            return;
        }

        if (editData) {
            const updatedObj: PackageOutRequestFormData = {
                ...formData,
                id: editData._id ? editData._id : undefined
            };
            packageOutUpdateMutate(updatedObj, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Package out request updated successfully!');
                },
                onError: (error: any) => {
                    toast.error('Package out request update failed');
                    console.error('Package out request update failed:', error);
                }
            });
        } else {
            const addObj: PackageOutRequestFormData = {
                ...formData,
                employeeId: loggedEmployee ? loggedEmployee.employeeId : '',
            };
            packageOutAddMutate(addObj, {
                onSuccess: () => {
                    refetch();
                    setFormData(initialFormData);
                    toast.success('Package out request added successfully!');
                },
                onError: (error: any) => {
                    toast.error('Package out request addition failed');
                    console.error('Package out request addition failed:', error);
                }
            });
        }
        handleCloseModal();
    };

    const handleEdit = (data: PackageOutRequest) => {
        setEditingData(data);
        setFormData({
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            packageName: data.packageName,
            packageDetails: data.packageDetails,
            date: data.date,
            time: data.time,
            location: data.location,
            status1: data.status1,
            status2: data.status2,
            status3: data.status3,
            status4: data.status4,
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
                title={editData ? 'Edit Out Request Form' : 'Add New Package Out Request'}
            >
                <form onSubmit={handleSubmit} className="space-y-6 p-4">

                    <TextField
                        label="Package Name"
                        name="packageName"
                        value={formData.packageName}
                        onChange={handleInputChange}
                        focused
                        required
                    />

                    <TextField
                        label="Date"
                        name="date"
                        value={formData.date}
                        type='date'
                        onChange={handleInputChange}
                        required
                        focused
                    />

                    <TextField
                        label="Time"
                        name="time"
                        value={formData.time}
                        type='time'
                        onChange={handleInputChange}
                        required
                        focused
                    />

                    <TextField
                        label="Package Details"
                        name="packageDetails"
                        value={formData.packageDetails}
                        onChange={handleInputChange}
                        focused
                        required
                    />

                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
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
                            {editData ? 'Update Package Out Request' : 'Add Package Out Request'}
                        </Button>
                    </div>
                </form>
            </Modal>

            <Modal
                open={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Package Out Request Details"
            >
                {dataView && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Employee Name</h3>
                                <p className="text-gray-700">{dataView.employeeName}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Package Name</h3>
                                <p className="text-gray-700">{dataView.packageName}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Package Details</h3>
                                <p className="text-gray-700">{dataView.packageDetails}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Date</h3>
                                <p className="text-gray-700">{dataView.date}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Time</h3>
                                <p className="text-gray-700">{dataView.time}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                                <p className="text-gray-700">{dataView.location}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                                {(() => {
                                    const statuses = [dataView.status1, dataView.status2, dataView.status3, dataView.status4];
                                    let statusText = "Unknown";
                                    let chipClass = "bg-gray-100 text-gray-800";

                                    if (statuses.some(status => status === 3)) {
                                        statusText = "Rejected";
                                        chipClass = "bg-red-100 text-red-800";
                                    } else if (statuses.every(status => status === 2)) {
                                        statusText = "Accepted";
                                        chipClass = "bg-green-100 text-green-800";
                                    } else if (statuses.some(status => status === 1)) {
                                        statusText = "Pending";
                                        chipClass = "bg-yellow-100 text-yellow-800";
                                    }

                                    return (
                                        <span className={`px-3 py-1 rounded-full text-md font-medium ${chipClass}`}>
                                            {statusText}
                                        </span>
                                    );
                                })()}
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
                                Edit
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};