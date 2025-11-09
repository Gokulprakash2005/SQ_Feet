'use client';

import { useState, useEffect } from 'react';

export default function ManageProperties() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.get('title'),
          sqFeet: formData.get('sqFeet'),
          price: formData.get('price'),
          location: formData.get('location'),
          ownerId: 'temp-owner-id', // Replace with actual owner ID
        }),
      });
      
      if (response.ok) {
        fetchProperties();
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Properties</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Property
        </button>
      </div>

      {/* Add Property Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
          <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Property Title"
              className="p-3 border rounded-lg"
              required
            />
            <input
              name="sqFeet"
              type="number"
              placeholder="Square Feet"
              className="p-3 border rounded-lg"
              required
            />
            <input
              name="price"
              placeholder="Price (e.g., $1,500/month)"
              className="p-3 border rounded-lg"
              required
            />
            <input
              name="location"
              placeholder="Location"
              className="p-3 border rounded-lg"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Property
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sq Feet</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{property.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {property.sqFeet} sq ft
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {property.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {property.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {property.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}