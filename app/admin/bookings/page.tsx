'use client';

import { useState } from 'react';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      property: 'Luxury Villa Downtown', 
      tenant: 'John Doe', 
      owner: 'Sarah Wilson',
      startDate: '2024-01-15', 
      endDate: '2024-07-15', 
      amount: '$2,500', 
      status: 'Active' 
    },
    { 
      id: 2, 
      property: 'Modern Apartment', 
      tenant: 'Jane Smith', 
      owner: 'Mike Johnson',
      startDate: '2024-02-01', 
      endDate: '2024-08-01', 
      amount: '$1,800', 
      status: 'Pending' 
    },
    { 
      id: 3, 
      property: 'Cozy Studio', 
      tenant: 'Bob Brown', 
      owner: 'Alice Davis',
      startDate: '2024-01-10', 
      endDate: '2024-01-20', 
      amount: '$1,200', 
      status: 'Cancelled' 
    },
  ]);

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Bookings</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full text-white text-xl mr-4">✅</div>
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-2xl font-bold text-gray-800">{bookings.filter(b => b.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full text-white text-xl mr-4">⏳</div>
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{bookings.filter(b => b.status === 'Pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-full text-white text-xl mr-4">❌</div>
            <div>
              <p className="text-gray-500 text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-gray-800">{bookings.filter(b => b.status === 'Cancelled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full text-white text-xl mr-4">📊</div>
            <div>
              <p className="text-gray-500 text-sm">Total</p>
              <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{booking.property}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {booking.tenant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {booking.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <div className="text-sm">
                    <div>{booking.startDate}</div>
                    <div>to {booking.endDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {booking.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}