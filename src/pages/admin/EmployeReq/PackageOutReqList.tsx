import { useMemo, useState } from 'react';
import { PageTransition } from '@zenra/components';
import { CircularIndeterminate, sortArray, SortConfig, Table } from '@zenra/widgets';
import { PackageOutRequest } from '@zenra/models';
import { toast } from 'sonner';
import { getPackageOutRequests, usePackageOutRequest } from '@zenra/services';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';
import { packageOutRequestListPageColumns } from './PackageOutReqListColumns';

type LeaveStatus = 1 | 2 | 3; // 1=pending, 2=accepted, 3=rejected (adjust if different)

type ApproverKey = 'status1' | 'status2' | 'status3' | 'status4';

const ACCEPT: LeaveStatus = 2;
const REJECT: LeaveStatus = 3;

const getApproverKey = (loggedEmployee: any): ApproverKey | null => {
    if (loggedEmployee === null) return 'status1'; // HR / admin user (null)
    switch (loggedEmployee?.employeePosition) {
        case 'General Manager':
            return 'status2';
        case 'Factory Manager':
            return 'status3';
        case 'LSO Officer':
            return 'status4';
        default:
            return null;
    }
};

// OPTIONAL: enforce approval order HR -> GM -> Factory -> LSO
const canActByOrder = (key: ApproverKey, data: PackageOutRequest) => {
    // If you don't want order enforcement, just return true always.
    // return true;

    // Example rule:
    // - GM can act only if HR accepted
    // - Factory can act only if HR+GM accepted
    // - LSO can act only if HR+GM+Factory accepted
    if (key === 'status1') return true;

    if (key === 'status2') return data.status1 === ACCEPT;
    if (key === 'status3') return data.status1 === ACCEPT && data.status2 === ACCEPT;
    if (key === 'status4') return data.status1 === ACCEPT && data.status2 === ACCEPT && data.status3 === ACCEPT;

    return false;
};

const buildUpdatePayload = (
    data: PackageOutRequest,
    approverKey: ApproverKey,
    newStatus: LeaveStatus
) => {
    return {
        id: data._id,
        employeeId: data.employeeId,
        employeeName: data.employeeName,
        packageName: data.packageName,
        packageDetails: data.packageDetails,
        date: data.date,
        time: data.time,
        location: data.location,

        // Preserve everyone exactly as-is, only change the active approver key
        status1: approverKey === 'status1' ? newStatus : (data.status1 as LeaveStatus),
        status2: approverKey === 'status2' ? newStatus : (data.status2 as LeaveStatus),
        status3: approverKey === 'status3' ? newStatus : (data.status3 as LeaveStatus),
        status4: approverKey === 'status4' ? newStatus : (data.status4 as LeaveStatus),
    };
};

export const PackageOutReqList = () => {
    const { loggedEmployee } = useSelector((state: RootState) => state.auth);
    const { response: tableData, refetch, isFetching } = getPackageOutRequests(true);
    const { packageOutUpdateMutate } = usePackageOutRequest();

    const [sortConfig, setSortConfig] = useState<{
        field: string;
        direction: 'asc' | 'desc';
    }>({
        field: 'employeeName',
        direction: 'asc',
    });

    const act = (data: PackageOutRequest, newStatus: LeaveStatus) => {
        const approverKey = getApproverKey(loggedEmployee);

        if (!approverKey) {
            toast.error('You are not allowed to approve/reject package out requests.');
            return;
        }

        if (!canActByOrder(approverKey, data)) {
            toast.error('You cannot act yet. Waiting for previous approval(s).');
            return;
        }

        const payload = buildUpdatePayload(data, approverKey, newStatus);

        packageOutUpdateMutate(payload, {
            onSuccess: () => {
                refetch();
                toast.success('Package out request updated successfully!');
            },
            onError: (error: any) => {
                toast.error('Package out request update failed');
                console.error('Package out request update failed:', error);
            },
        });
    };

    const handleAccept = (data: PackageOutRequest) => act(data, ACCEPT);
    const handleReject = (data: PackageOutRequest) => act(data, REJECT);

    const sortedValue = useMemo(() => {
        const data = Array.isArray(tableData?.data) ? tableData?.data : [];
        return sortArray(data, sortConfig as SortConfig<PackageOutRequest>);
    }, [tableData, sortConfig]);

    const handleSort = (field: string, direction: 'asc' | 'desc') =>
        setSortConfig({ field, direction });

    return (
        <PageTransition>
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Package Out Requests</h1>
                    </div>

                    {isFetching ? (
                        <CircularIndeterminate />
                    ) : (
                        <Table
                            columns={packageOutRequestListPageColumns({ handleAccept, handleReject, loggedEmployee })}
                            data={sortedValue || []}
                            keyExtractor={(data) => data._id ?? ''}
                            defaultSort={sortConfig}
                            onSort={handleSort}
                            rowsPerPageOptions={[5, 10, 25]}
                            defaultRowsPerPage={10}
                        />
                    )}
                </div>
            </div>
        </PageTransition>
    );
};