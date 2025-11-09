'use client';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Houses', value: '156', icon: '🏠', color: 'bg-blue-500' },
    { title: 'Total Users', value: '1,234', icon: '👥', color: 'bg-green-500' },
    { title: 'Active Bookings', value: '89', icon: '📅', color: 'bg-yellow-500' },
    { title: 'Monthly Revenue', value: '$45,678', icon: '💰', color: 'bg-purple-500' },
  ];

  const recentBookings = [
    { id: 1, property: 'Luxury Villa Downtown', user: 'John Doe', status: 'Active', amount: '$2,500' },
    { id: 2, property: 'Modern Apartment', user: 'Jane Smith', status: 'Pending', amount: '$1,800' },
    { id: 3, property: 'Cozy Studio', user: 'Mike Johnson', status: 'Cancelled', amount: '$1,200' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-full text-white text-2xl mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{booking.property}</p>
                  <p className="text-sm text-gray-500">{booking.user}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{booking.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'Active' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Add New Property
            </button>
            <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              View All Bookings
            </button>
            <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}