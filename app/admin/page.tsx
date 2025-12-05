'use client'

import { useState, useEffect, useRef } from 'react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('template')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const formRefs = useRef<{ [key: string]: HTMLFormElement | null }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchData = async (endpoint: string) => {
    try {
      const url = endpoint === 'template-details' && searchTerm 
        ? `/api/${endpoint}?search=${searchTerm}`
        : `/api/${endpoint}`
      const response = await fetch(url)
      const result = await response.json()
      setData(Array.isArray(result) ? result : [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setData([])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, endpoint: string) => {
    e.preventDefault()
    
    if (loading) return
    
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    if (editingId) {
      formData.append('oldId', editingId.toString())
    }
    
    try {
      const method = editingId ? 'PUT' : 'POST'
      
      const response = await fetch(`/api/${endpoint}`, {
        method,
        body: formData
      })
      
      if (response.ok) {
        alert(editingId ? 'Data updated successfully!' : 'Data saved successfully!')
        if (formRefs.current[activeTab]) {
          formRefs.current[activeTab]!.reset()
        }
        setEditingId(null)
        setSelectedImage(null)
        await fetchData(endpoint)
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error || 'Failed to save data'}`)
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, endpoint: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        alert('Data deleted successfully!')
        fetchData(endpoint)
      } else {
        alert('Error deleting data')
      }
    } catch (error) {
      alert('Error deleting data')
    }
  }

  const handleEdit = (item: any) => {
    setEditingId(item.id)
    setTimeout(() => {
      const form = formRefs.current[activeTab]
      if (form) {
        Object.keys(item).forEach(key => {
          const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement
          if (input && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
            if (input.type === 'datetime-local') {
              input.value = new Date(item[key]).toISOString().slice(0, 16)
            } else {
              input.value = item[key]
            }
          }
        })
      }
    }, 100)
  }

  useEffect(() => {
    if (!mounted) return
    
    const endpoints = {
      template: 'template-details',
      description: 'description',
      basic: 'basic-details',
      location: 'location',
      status: 'status-availability',
      area: 'area-details'
    }
    fetchData(endpoints[activeTab as keyof typeof endpoints])
  }, [activeTab, searchTerm, mounted])

  const tabs = [
    { id: 'template', label: 'Template Details', endpoint: 'template-details' },
    { id: 'description', label: 'Description', endpoint: 'description' },
    { id: 'basic', label: 'Basic Details', endpoint: 'basic-details' },
    { id: 'location', label: 'Location', endpoint: 'location' },
    { id: 'status', label: 'Status & Availability', endpoint: 'status-availability' },
    { id: 'area', label: 'Area Details', endpoint: 'area-details' }
  ]

  const currentTab = tabs.find(tab => tab.id === activeTab)
  const currentEndpoint = currentTab?.endpoint || ''

  const resetForm = () => {
    setEditingId(null)
    setSelectedImage(null)
    if (formRefs.current[activeTab]) {
      formRefs.current[activeTab]!.reset()
    }
  }

  if (!mounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'template' && (
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by property title or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border rounded"
                />
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Existing Records</h3>
              <div className="max-h-64 overflow-y-auto border rounded">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Details</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="p-2">{item.id}</td>
                        <td className="p-2">
                          {activeTab === 'template' && `${item.propertyTitle} - ${item.city}`}
                          {activeTab === 'description' && item.realSecurity?.substring(0, 30) + '...'}
                          {activeTab === 'basic' && `${item.propertyType} - ${item.bedrooms}BR`}
                          {activeTab === 'location' && `${item.city} - ${item.pincode}`}
                          {activeTab === 'status' && item.propertyStatus}
                          {activeTab === 'area' && item.builtUpArea}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, currentEndpoint)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {activeTab === 'template' && (
              <form ref={(el) => { formRefs.current['template'] = el }} onSubmit={(e) => handleSubmit(e, 'template-details')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Template Details</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <input name="propertyTitle" placeholder="Property Title" className="w-full p-3 border rounded" required />
                <input name="locationAddress" placeholder="Location Address" className="w-full p-3 border rounded" required />
                <input name="city" placeholder="City" className="w-full p-3 border rounded" required />
                <input name="price" type="number" placeholder="Price" className="w-full p-3 border rounded" required />
                <div className="w-full">
                  <input 
                    id="image-upload" 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      setSelectedImage(file ? file.name : null)
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className={`w-full p-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      selectedImage 
                        ? 'border-green-400 bg-green-50 text-green-700' 
                        : 'border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {selectedImage ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {selectedImage}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Image
                      </>
                    )}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Template Details
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'description' && (
              <form ref={(el) => { formRefs.current['description'] = el }} onSubmit={(e) => handleSubmit(e, 'description')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Description</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <textarea name="realSecurity" placeholder="Real Security" className="w-full p-3 border rounded h-24" required />
                <textarea name="ampleParking" placeholder="Ample Parking" className="w-full p-3 border rounded h-24" required />
                <textarea name="smartHomeIntegration" placeholder="Smart Home Integration" className="w-full p-3 border rounded h-24" required />
                <textarea name="verifiedSafety" placeholder="Verified Safety" className="w-full p-3 border rounded h-24" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Description
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'basic' && (
              <form ref={(el) => { formRefs.current['basic'] = el }} onSubmit={(e) => handleSubmit(e, 'basic-details')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Basic Details</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <input name="propertyType" placeholder="Property Type" className="w-full p-3 border rounded" required />
                <input name="propertySize" placeholder="Property Size" className="w-full p-3 border rounded" required />
                <input name="bedrooms" type="number" placeholder="Bedrooms" className="w-full p-3 border rounded" required />
                <input name="bathrooms" type="number" placeholder="Bathrooms" className="w-full p-3 border rounded" required />
                <input name="balconies" type="number" placeholder="Balconies" className="w-full p-3 border rounded" required />
                <input name="totalFloors" type="number" placeholder="Total Floors" className="w-full p-3 border rounded" required />
                <input name="floorNumber" type="number" placeholder="Floor Number" className="w-full p-3 border rounded" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Basic Details
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'location' && (
              <form ref={(el) => { formRefs.current['location'] = el }} onSubmit={(e) => handleSubmit(e, 'location')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Location</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <input name="address" placeholder="Address" className="w-full p-3 border rounded" required />
                <input name="city" placeholder="City" className="w-full p-3 border rounded" required />
                <input name="pincode" type="number" placeholder="Pincode" className="w-full p-3 border rounded" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Location
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'status' && (
              <form ref={(el) => { formRefs.current['status'] = el }} onSubmit={(e) => handleSubmit(e, 'status-availability')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Status & Availability</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <input name="propertyStatus" placeholder="Property Status" className="w-full p-3 border rounded" required />
                <input name="ageOfProperty" placeholder="Age of Property" className="w-full p-3 border rounded" required />
                <input name="availableFrom" type="datetime-local" placeholder="Available From" className="w-full p-3 border rounded" required />
                <input name="furnishingStatus" placeholder="Furnishing Status" className="w-full p-3 border rounded" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Status & Availability
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}

            {activeTab === 'area' && (
              <form ref={(el) => { formRefs.current['area'] = el }} onSubmit={(e) => handleSubmit(e, 'area-details')} className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Area Details</h2>
                <input name="id" type="number" placeholder="ID" className="w-full p-3 border rounded" required />
                <input name="builtUpArea" placeholder="Built Up Area" className="w-full p-3 border rounded" required />
                <input name="undividedShare" placeholder="Undivided Share" className="w-full p-3 border rounded" required />
                <textarea name="amenities" placeholder="Amenities" className="w-full p-3 border rounded h-24" required />
                <textarea name="features" placeholder="Features" className="w-full p-3 border rounded h-24" required />
                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50">
                    {loading ? 'Saving...' : (editingId ? 'Update' : 'Save')} Area Details
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}