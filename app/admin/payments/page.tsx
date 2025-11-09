'use client';

export default function ManagePayments() {
  const payments = [
    { 
      id: 1, 
      property: 'Luxury Villa Downtown', 
      tenant: 'John Doe', 
      amount: '$2,500', 
      date: '2024-01-15', 
      status: 'Completed',
      method: 'Credit Card'
    },
    { 
      id: 2, 
      property: 'Modern Apartment', 
      tenant: 'Jane Smith', 
      amount: '$1,800', 
      date: '2024-01-20', 
      status: 'Pending',
      method: 'Bank Transfer'
    },
    { 
      id: 3, 
      property: 'Cozy Studio', 
      tenant: 'Bob Brown', 
      amount: '$1,200', 
      date: '2024-01-10', 
      status: 'Failed',
      method: 'PayPal'
    },
  ];

  const totalEarnings = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace(/[$,]/g, '')), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Payments</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Export Report
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full text-white text-xl mr-4">💰</div>
            <div>
              <p className="text-gray-500 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800">${totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full text-white text-xl mr-4">✅</div>
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{payments.filter(p => p.status === 'Completed').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full text-white text-xl mr-4">⏳</div>
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{payments.filter(p => p.status === 'Pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-full text-white text-xl mr-4">❌</div>
            <div>
              <p className="text-gray-500 text-sm">Failed</p>
              <p className="text-2xl font-bold text-gray-800">{payments.filter(p => p.status === 'Failed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">TXN-{payment.id.toString().padStart(6, '0')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{payment.property}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {payment.tenant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{payment.amount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {payment.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                  {payment.status === 'Failed' && (
                    <button className="text-green-600 hover:text-green-900">Retry</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}