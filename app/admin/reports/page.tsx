'use client';

export default function Reports() {
  const locationStats = [
    { location: 'Downtown', properties: 45, bookings: 38, revenue: '$95,000' },
    { location: 'Midtown', properties: 32, bookings: 28, revenue: '$67,500' },
    { location: 'Uptown', properties: 28, bookings: 23, revenue: '$52,000' },
    { location: 'Suburbs', properties: 51, bookings: 35, revenue: '$78,000' },
  ];

  const monthlyStats = [
    { month: 'Jan 2024', bookings: 45, revenue: '$112,500' },
    { month: 'Feb 2024', bookings: 52, revenue: '$128,000' },
    { month: 'Mar 2024', bookings: 48, revenue: '$118,500' },
    { month: 'Apr 2024', bookings: 55, revenue: '$135,000' },
  ];

  const propertyTypes = [
    { type: 'Apartments', count: 78, percentage: 50 },
    { type: 'Villas', count: 35, percentage: 22.4 },
    { type: 'Studios', count: 28, percentage: 17.9 },
    { type: 'Condos', count: 15, percentage: 9.6 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Analytics & Reports</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg">
            <option>Last 30 Days</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Export PDF
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full text-white text-xl mr-4">🏠</div>
            <div>
              <p className="text-gray-500 text-sm">Total Properties</p>
              <p className="text-2xl font-bold text-gray-800">156</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full text-white text-xl mr-4">📈</div>
            <div>
              <p className="text-gray-500 text-sm">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-800">87%</p>
              <p className="text-sm text-green-600">+5% from last month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-500 p-3 rounded-full text-white text-xl mr-4">💰</div>
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">$292,500</p>
              <p className="text-sm text-green-600">+18% from last month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full text-white text-xl mr-4">⭐</div>
            <div>
              <p className="text-gray-500 text-sm">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-800">4.8</p>
              <p className="text-sm text-green-600">+0.2 from last month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Locations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Locations</h2>
          <div className="space-y-4">
            {locationStats.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">{location.location}</h3>
                  <p className="text-sm text-gray-500">{location.properties} properties • {location.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{location.revenue}</p>
                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(location.bookings / location.properties) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Property Types */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Types Distribution</h2>
          <div className="space-y-4">
            {propertyTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-gray-700">{type.type}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">{type.count}</span>
                  <span className="text-sm text-gray-500">({type.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyStats.map((stat, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {stat.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {stat.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {stat.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-green-600">+{Math.floor(Math.random() * 20 + 5)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}