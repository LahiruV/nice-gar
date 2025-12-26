import { PageTransition } from '@zenra/components';
import { Button, CircularIndeterminate } from '@zenra/widgets';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';
import { getBookingDashboard, getBookingRecent, getBookingsExcel } from '@zenra/services';
import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { getStatusColor } from './Booking/BookingFilters';
import { NavLink } from 'react-router-dom';

export const DashboardPage = () => {

  const [isExcelExported, setIsExcelExported] = useState<boolean>(false);

  const { response: dashboardDetail } = getBookingDashboard(true);
  const { response: bookings, isFetching } = getBookingRecent(true);
  const { status } = getBookingsExcel(isExcelExported);
  const [usdToLkr, setUsdToLkr] = useState<number>(0);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        setUsdToLkr(data.rates.LKR);
      } catch (err) {
        console.error("Failed to fetch LKR rate", err);
      }
    };
    fetchRate();
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setIsExcelExported(false);
    }
  }, [status, isExcelExported]);

  const stats = [
    { name: 'Total Bookings', value: dashboardDetail?.data?.count ?? 0, icon: CalendarIcon },
    { name: 'Pending Bookings', value: dashboardDetail?.data?.pendingCount ?? 0, icon: CalendarIcon },
    {
      name: 'Total Revenue',
      value: (dashboardDetail?.data?.totalRevenue ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      icon: CurrencyDollarIcon
    },
    {
      name: 'Total Revenue ( LKR )',
      value: dashboardDetail?.data?.totalRevenue && usdToLkr
        ? (dashboardDetail.data.totalRevenue * usdToLkr).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
        : "0.00",
      icon: CurrencyRupeeIcon
    },
  ];

  return (
    <PageTransition>
      <div className="bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          {isFetching ? <CircularIndeterminate /> :
            <div>
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Package
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-left">
                            Guests
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                            Amount ($)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {bookings?.data.map((booking: any) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.firstName + ' ' + booking.lastName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.packageTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                              {`${(booking.adults || 0) + (booking.children || 0)} (${booking.adults || 0
                                } adults, ${booking.children || 0} children)`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.travelDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                              {booking.totalPrice != null
                                ? booking.totalPrice.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                })
                                : "0.00"}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <Chip
                                label={
                                  (booking.status || "").charAt(0).toUpperCase() +
                                  (booking.status || "").slice(1)
                                }
                                color={getStatusColor(booking.status)}
                                size="small"
                                style={{
                                  width: '80px'
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <NavLink to="/admin/packages">
                    <Button variant="primary" fullWidth>
                      View All Packages
                    </Button>
                  </NavLink>
                  <NavLink to="/admin/bookings">
                    <Button variant="primary" fullWidth>
                      View All Bookings
                    </Button>
                  </NavLink>
                  <Button variant="primary" fullWidth onClick={() => setIsExcelExported(true)}>
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </PageTransition >
  );
};