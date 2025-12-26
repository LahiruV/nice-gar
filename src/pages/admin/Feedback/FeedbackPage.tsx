import { useState } from 'react';
import { PageTransition } from '@zenra/components';
import { AlertDialogSlide, CircularIndeterminate, Table } from '@zenra/widgets';
import { toast } from 'sonner';
import { getFeedbacks, useFeedback } from '@zenra/services';
import { feedbackColumns } from './FeedbackColumns';

export const AdminFeedbacksPage = () => {

    const { feedbackDeleteMutate } = useFeedback();
    const { response, refetch, isFetching } = getFeedbacks(true);
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
        field: 'price',
        direction: 'desc',
    });

    const handleDelete = (id: string) => {
        setIsDeleteDialogOpen(true);
        setTitle('Confirm Deletion');
        setDescription('Are you sure you want to delete this feedback?');
        setAgreeButtonText('Delete');
        setDisagreeButtonText('Cancel');
        setDelID(id);
    };

    const handleDialogClose = () => setIsDeleteDialogOpen(false);

    const handleDeleteConfirmed = () => {
        if (delID) {
            feedbackDeleteMutate(delID, {
                onSuccess: () => {
                    refetch();
                    toast.success('Feedback deleted successfully!');
                },
                onError: (error) => {
                    toast.error('Failed to delete feedback');
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

    const handleSort = (field: string, direction: 'asc' | 'desc') => setSortConfig({ field, direction });


    return (
        <PageTransition>
            <div className="bg-gray-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
                    </div>

                    {isFetching ? <CircularIndeterminate /> :
                        <Table
                            columns={feedbackColumns({ handleDelete })}
                            data={response?.data || []}
                            keyExtractor={(pkg) => pkg._id ?? ''}
                            defaultSort={sortConfig}
                            onSort={handleSort}
                            rowsPerPageOptions={[5, 10, 25]}
                            defaultRowsPerPage={5}
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