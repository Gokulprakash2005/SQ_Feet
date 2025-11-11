'use client';

import { useState, useEffect } from 'react';

interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqFeet: number;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqFeet: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (searchTerm = '') => {
    try {
      const url = searchTerm ? `/api/properties?search=${searchTerm}` : '/api/properties';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      setProperties([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      sqFeet: parseInt(formData.sqFeet)
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`/api/properties/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        setEditingId(null);
      } else {
        response = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Submit error:', errorData);
        alert('Error: ' + errorData.error);
        return;
      }
      
      setFormData({ title: '', description: '', price: '', location: '', bedrooms: '', bathrooms: '', sqFeet: '' });
      fetchProperties();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save property');
    }
  };

  const handleEdit = (property: Property) => {
    setEditingId(property.id);
    setFormData({
      title: property.title,
      description: property.description || '',
      price: property.price.toString(),
      location: property.location,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      sqFeet: property.sqFeet.toString()
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete error:', errorData);
        alert('Error: ' + errorData.error);
        return;
      }
      
      fetchProperties();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete property');
    }
  };

  const handleSearch = () => {
    fetchProperties(search);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }} suppressHydrationWarning={true}>
      <h1>SQ Feet Realty - Property Management</h1>
      
      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={handleSearch} style={{ padding: '8px 16px' }}>Search</button>
        <button onClick={() => { setSearch(''); fetchProperties(); }} style={{ padding: '8px 16px', marginLeft: '10px' }}>Clear</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px' }} suppressHydrationWarning={true}>
        <h3>{editingId ? 'Edit Property' : 'Add New Property'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Square Feet"
            value={formData.sqFeet}
            onChange={(e) => setFormData({ ...formData, sqFeet: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            placeholder="Bathrooms"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            required
            style={{ padding: '8px' }}
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={{ padding: '8px', marginTop: '10px', width: '100%', height: '60px' }}
        />
        <div style={{ marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
            {editingId ? 'Update Property' : 'Add Property'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: '', description: '', price: '', location: '', bedrooms: '', bathrooms: '', sqFeet: '' });
              }}
              style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Properties List */}
      <div>
        <h3>Properties ({properties.length})</h3>
        {properties.map((property) => (
          <div key={property.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px' }}>
            <h4>{property.title}</h4>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
            <p><strong>Size:</strong> {property.sqFeet} sq ft | {property.bedrooms} bed | {property.bathrooms} bath</p>
            {property.description && <p><strong>Description:</strong> {property.description}</p>}
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => handleEdit(property)}
                style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', marginRight: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property.id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}