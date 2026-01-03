import { useMemo, useState } from 'react';
import { PageTransition } from '@zenra/components';
import { AlertDialogSlide, Button, CircularIndeterminate, sortArray, SortConfig, Table } from '@zenra/widgets';
import { PlusIcon } from '@heroicons/react/24/outline';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';
import { toast } from 'sonner';
import { getEmployees, useEmployee } from '@zenra/services';
import { AdminEmployeeLeavReqForm } from './AdminEmployeeLeavReqForm';
import { leaveReqColumns } from './AdminEmployeeLeavReqColumns';

const initialFormData: EmployeeLeaveRequestFormData = {
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Pending',
};

export const AdminEmployeeLeavReq = () => {

    const { employeeDeleteMutate } = useEmployee();
    const { response: employees, refetch, isFetching } = getEmployees(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<EmployeeLeaveRequest | null>(null);
    const [viewingEmployee, setViewingEmployee] = useState<EmployeeLeaveRequest | null>(null);
    const [formData, setFormData] = useState<EmployeeLeaveRequestFormData>(initialFormData);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [agreeButtonText, setAgreeButtonText] = useState<string>('Yes');
    const [disagreeButtonText, setDisagreeButtonText] = useState<string>('No');
    const [delID, setDelID] = useState<string>('');

    const [sortConfig, setSortConfig] = useState<{
        field: string;
        direction: 'asc' | 'desc';
    }>({
        field: 'firstName',
        direction: 'asc',
    });

    const handleEdit = (data: EmployeeLeaveRequest) => {
        setEditingEmployee(data);
        setFormData({
            id: data._id,
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            status: data.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setIsDeleteDialogOpen(true);
        setTitle('Confirm Deletion');
        setDescription('Are you sure you want to delete this employee?');
        setAgreeButtonText('Delete');
        setDisagreeButtonText('Cancel');
        setDelID(id);
    };

    const handleView = (data: EmployeeLeaveRequest) => {
        setViewingEmployee(data);
        setIsViewModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingEmployee(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const handleDialogClose = () => setIsDeleteDialogOpen(false);

    const handleDeleteConfirmed = () => {
        if (delID) {
            // employeeDeleteMutate(delID, {
            //     onSuccess: () => {
            //         refetch();
            //         toast.success('Employee deleted successfully!');
            //     },
            //     onError: (error) => {
            //         toast.error('Failed to delete employee. Please try again.');
            //         console.error('Delete failed:', error);
            //     },
            // });
        }
        setIsDeleteDialogOpen(false);
    };
    const handleDeleteCancelled = () => {
        setIsDeleteDialogOpen(false);
        toast.info('Deletion cancelled');
    };

    const sortedEmployees = useMemo(() => {
        const data = Array.isArray(employees?.data) ? employees?.data : [];
        return sortArray(data, sortConfig as SortConfig<EmployeeLeaveRequest>);
    }, [employees, sortConfig]);

    const handleSort = (field: string, direction: 'asc' | 'desc') => setSortConfig({ field, direction });


    return (
        <PageTransition>
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900"> Leave Requests</h1>
                        <Button
                            variant="primary"
                            startIcon={<PlusIcon className="h-5 w-5" />}
                            onClick={handleAddNew}
                        >
                            Add Leave Request
                        </Button>
                    </div>
                    {isFetching ? <CircularIndeterminate /> :
                        <Table
                            columns={leaveReqColumns({ handleView, handleEdit, handleDelete })}
                            data={sortedEmployees || []}
                            keyExtractor={(data) => data._id ?? ''}
                            defaultSort={sortConfig}
                            onSort={handleSort}
                            rowsPerPageOptions={[5, 10, 25]}
                            defaultRowsPerPage={10}
                        />
                    }
                    <AdminEmployeeLeavReqForm
                        refetch={refetch}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        editData={editingEmployee}
                        setEditingData={setEditingEmployee}
                        isViewModalOpen={isViewModalOpen}
                        setIsViewModalOpen={setIsViewModalOpen}
                        dataView={viewingEmployee}
                        setDataView={setViewingEmployee}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
            </div>

            <AlertDialogSlide
                open={isDeleteDialogOpen}
                handleAgree={handleDeleteConfirmed}
                handleDisagree={handleDeleteCancelled}
                onClose={handleDialogClose}
                handleClose={handleDialogClose}
                title={title}
                description={description}
                agreeButtonText={agreeButtonText}
                disagreeButtonText={disagreeButtonText}
                aColor='error'
                aVariant='contained'
                aSize='small'
                dColor='primary'
                dVariant='outlined'
                dSize='small'
            />
        </PageTransition>
    );
};