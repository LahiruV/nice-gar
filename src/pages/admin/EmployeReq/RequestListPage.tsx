import { useMemo, useState } from 'react';
import { PageTransition } from '@zenra/components';
import { AlertDialogSlide, CircularIndeterminate, sortArray, SortConfig, Table } from '@zenra/widgets';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';
import { toast } from 'sonner';
import { getLeaveRequests, useLeaveRequest } from '@zenra/services';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';
import { requestListPageColumns } from './RequestListPageColumns';

const initialFormData: EmployeeLeaveRequestFormData = {
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    status1: 1,
    status2: 1,
    status3: 1,
    status4: 1,
};

export const RequestListPage = () => {
    const { loggedEmployee } = useSelector((state: RootState) => state.auth);
    const { leaveReqDeleteMutate } = useLeaveRequest();
    const { response: tableData, refetch, isFetching } = getLeaveRequests(true);
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
        field: 'employeeName',
        direction: 'asc',
    });

    const handleEdit = (data: EmployeeLeaveRequest) => {
        setFormData({
            id: data._id,
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            status1: data.status1,
            status2: data.status2,
            status3: data.status3,
            status4: data.status4,
        });
    };

    const handleDelete = (id: string) => {
        setIsDeleteDialogOpen(true);
        setTitle('Confirm Deletion');
        setDescription('Are you sure you want to delete this leave request?');
        setAgreeButtonText('Delete');
        setDisagreeButtonText('Cancel');
        setDelID(id);
    };

    const handleDialogClose = () => setIsDeleteDialogOpen(false);

    const handleDeleteConfirmed = () => {
        if (delID) {
            leaveReqDeleteMutate(delID, {
                onSuccess: () => {
                    refetch();
                    toast.success('Leave request deleted successfully!');
                },
                onError: (error) => {
                    toast.error('Failed to delete leave request. Please try again.');
                    console.error('Delete failed:', error);
                },
            });
        }
        setIsDeleteDialogOpen(false);
    };
    const handleDeleteCancelled = () => {
        setIsDeleteDialogOpen(false);
        toast.info('Deletion cancelled');
    };

    const sortedValue = useMemo(() => {
        const data = Array.isArray(tableData?.data) ? tableData?.data : [];
        return sortArray(data, sortConfig as SortConfig<EmployeeLeaveRequest>);
    }, [tableData, sortConfig]);

    const handleSort = (field: string, direction: 'asc' | 'desc') => setSortConfig({ field, direction });


    return (
        <PageTransition>
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900"> Leave Requests</h1>
                    </div>
                    {isFetching ? <CircularIndeterminate /> :
                        <Table
                            columns={requestListPageColumns({ handleEdit, handleDelete })}
                            data={sortedValue || []}
                            keyExtractor={(data) => data._id ?? ''}
                            defaultSort={sortConfig}
                            onSort={handleSort}
                            rowsPerPageOptions={[5, 10, 25]}
                            defaultRowsPerPage={10}
                        />
                    }
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