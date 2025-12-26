import { useState, useMemo } from 'react';
import { PageTransition } from '@zenra/components';
import { BookingDetails, BookingFormData, Filters } from '@zenra/models';
import { AlertDialogSlide, CircularIndeterminate, sortArray, SortConfig, Table } from '@zenra/widgets';
import { getBookings, useBooking } from '@zenra/services';
import { BookingPageModal } from './BookingPageModal';
import { BookingFilters } from './BookingFilters';
import { bookingColumns } from './BookingColumns';
import { toast } from 'sonner';
import { EditBookingModal } from './EditBookingModal';

export const BookingsPage = () => {
  const defaultFilters: Filters = {
    status: 'all',
    startDate: '',
    endDate: '',
    packageName: 'all',
    search: '',
  };
  const { bookingUpdateMutate, bookingStatusUpdateMutate, bookingDeleteMutate } = useBooking();
  const { response: bookings, refetch, isFetching } = getBookings(true);

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [agreeButtonText, setAgreeButtonText] = useState<string>('Yes');
  const [disagreeButtonText, setDisagreeButtonText] = useState<string>('No');
  const [delID, setDelID] = useState<string>('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filterChangeTrigger, setFilterChangeTrigger] = useState(0);

  const [sortConfig, setSortConfig] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: 'travelDate',
    direction: 'desc',
  });

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setFilterChangeTrigger((prev) => prev + 1);
  };
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setFilterChangeTrigger((prev) => prev + 1);
  };

  const packages = useMemo(
    () => Array.from(new Set(bookings?.data.map((b) => b.packageTitle).filter(Boolean))),
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    console.log(filters);

    return bookings?.data.filter((b) => {
      if (filters.status !== 'all' && b.status !== filters.status) return false;
      if (filters.packageName !== 'all' && b.packageTitle !== filters.packageName) return false;
      if (filters.startDate && b.travelDate < filters.startDate) return false;
      if (filters.endDate && b.travelDate > filters.endDate) return false;

      if (filters.search) {
        const s = filters.search.toLowerCase();
        const name = (b.customerName || `${b.firstName || ''} ${b.lastName || ''}`).toLowerCase();
        const email = (b.email || '').toLowerCase();
        const pkg = (b.packageName || b.packageTitle || '').toLowerCase();

        return name.includes(s) || email.includes(s) || pkg.includes(s);
      }
      return true;
    });
  }, [bookings, filters]);

  const sortedBookings = useMemo(() => {
    return sortArray(filteredBookings || [], sortConfig as SortConfig<BookingDetails>);
  }, [filteredBookings, sortConfig]);

  const handleSort = (field: string, direction: 'asc' | 'desc') => setSortConfig({ field, direction });

  const handleView = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (delID) {
      bookingDeleteMutate(delID, {
        onSuccess: () => {
          refetch();
          toast.success('Booking deleted successfully!');
        },
        onError: (error) => {
          toast.error('Failed to delete booking');
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

  const handleDialogClose = () => setIsDeleteDialogOpen(false);

  const handleDelete = (id: string) => {
    setIsDeleteDialogOpen(true);
    setTitle('Confirm Deletion');
    setDescription('Are you sure you want to delete this package?');
    setAgreeButtonText('Delete');
    setDisagreeButtonText('Cancel');
    setDelID(id);
  };

  const handleEdit = (booking: BookingDetails) => {
    setSelectedBooking(booking);
    setIsEditOpen(true);
  };

  const handleUpdateBooking = async (updated: BookingDetails) => {
    const payload: BookingFormData = {
      id: String(updated._id),
      packageId: updated.packageId,
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      phone: updated.phone,
      travelDate: updated.travelDate,
      adults: updated.adults,
      children: updated.children,
      mealPlan: (["bb", "hb", "fb"].includes(updated.mealPlan) ? updated.mealPlan : "bb") as "bb" | "hb" | "fb",
      includeTransport: Boolean(updated.includeTransport),
      includeAccommodation: Boolean(updated.includeAccommodation),
      specialRequests: updated.specialRequests,
      increasePrice: updated.increasePrice,
      discount: updated.discount,
      status: (["pending", "confirmed", "cancelled"].includes(updated.status) ? updated.status : "pending") as "pending" | "confirmed" | "cancelled"
    }
    bookingUpdateMutate(payload, {
      onSuccess: () => {
        toast.success('Booking updated successfully!');
        refetch();
        setIsEditOpen(false);
      },
      onError: (err) => {
        toast.error('Failed to update booking');
        console.error(err);
      }
    });
  };

  const handleStatusChange = (bookingId: string, status: string) => {
    const validStatus = ["pending", "confirmed", "cancelled"].includes(status)
      ? (status as "pending" | "confirmed" | "cancelled")
      : "pending";
    bookingStatusUpdateMutate({ id: bookingId, status: validStatus },
      {
        onSuccess: () => {
          toast.success('Booking status updated successfully!');
          refetch();
        },
        onError: (err) => {
          toast.error('Failed to update booking status');
          console.error(err);
        }
      }
    );
  }

  return (
    <PageTransition>
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Bookings</h1>

          {isFetching ? <CircularIndeterminate /> :
            <div>
              <BookingFilters
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
                packages={packages}
              />
              <Table
                columns={bookingColumns({ handleView, handleEdit, handleDelete, handleStatusChange })}
                data={sortedBookings}
                keyExtractor={(b) => b._id}
                defaultSort={sortConfig}
                onSort={handleSort}
                rowsPerPageOptions={[5, 10, 25]}
                defaultRowsPerPage={5}
                resetPageTrigger={filterChangeTrigger}
              />
            </div>
          }
          <BookingPageModal
            isOpen={isModalOpen}
            setIsClose={setIsModalOpen}
            setIsEditOpen={setIsEditOpen}
            bookingDetails={selectedBooking}
          />
          <EditBookingModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            booking={selectedBooking}
            onUpdate={handleUpdateBooking}
          />
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
        </div>
      </div>
    </PageTransition>
  );
};
