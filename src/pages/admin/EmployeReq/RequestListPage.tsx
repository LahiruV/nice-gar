import { useMemo, useState } from 'react';
import { PageTransition } from '@zenra/components';
import { CircularIndeterminate, sortArray, SortConfig, Table } from '@zenra/widgets';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';
import { toast } from 'sonner';
import { getLeaveRequests, useLeaveRequest } from '@zenra/services';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';
import { requestListPageColumns } from './RequestListPageColumns';

export const RequestListPage = () => {
    const { loggedEmployee } = useSelector((state: RootState) => state.auth);
    const { leaveReqUpdateMutate } = useLeaveRequest();
    const { response: tableData, refetch, isFetching } = getLeaveRequests(true);

    const [sortConfig, setSortConfig] = useState<{
        field: string;
        direction: 'asc' | 'desc';
    }>({
        field: 'employeeName',
        direction: 'asc',
    });

    const handleAccept = (data: EmployeeLeaveRequest) => {
        const obj = {
            id: data._id,
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            status1: loggedEmployee === null ? 2 : 1,
            status2: loggedEmployee?.employeePosition === 'General Manager' ? 2 : 1,
            status3: loggedEmployee?.employeePosition === 'Factory Manager' ? 2 : 1,
            status4: loggedEmployee?.employeePosition === 'LSO Officer' ? 2 : 1,
        };
        leaveReqUpdateMutate(obj, {
            onSuccess: () => {
                refetch();
                toast.success('Leave request updated successfully!');
            },
            onError: (error: any) => {
                toast.error('Leave request update failed');
                console.error('Leave request update failed:', error);
            }
        });
    };

    const handleReject = (data: EmployeeLeaveRequest) => {
        const obj = {
            id: data._id,
            employeeId: data.employeeId,
            employeeName: data.employeeName,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            status1: loggedEmployee === null ? 3 : 1,
            status2: loggedEmployee?.employeePosition === 'General Manager' ? 3 : 1,
            status3: loggedEmployee?.employeePosition === 'Factory Manager' ? 3 : 1,
            status4: loggedEmployee?.employeePosition === 'LSO Officer' ? 3 : 1,
        };
        leaveReqUpdateMutate(obj, {
            onSuccess: () => {
                refetch();
                toast.success('Leave request updated successfully!');
            },
            onError: (error: any) => {
                toast.error('Leave request update failed');
                console.error('Leave request update failed:', error);
            }
        });
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
                            columns={requestListPageColumns({ handleAccept, handleReject })}
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
        </PageTransition>
    );
};