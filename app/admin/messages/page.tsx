'use client';

import { useState } from 'react';

export default function ManageMessages() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      from: 'John Doe', 
      email: 'john@example.com',
      subject: 'Property Inquiry - Luxury Villa', 
      message: 'I am interested in renting the luxury villa downtown. Can you provide more details about the amenities?',
      date: '2024-01-20', 
      status: 'Unread',
      type: 'Inquiry'
    },
    { 
      id: 2, 
      from: 'Jane Smith', 
      email: 'jane@example.com',
      subject: 'Maintenance Request', 
      message: 'The air conditioning in my apartment is not working properly. Please arrange for repair.',
      date: '2024-01-19', 
      status: 'Read',
      type: 'Support'
    },
    { 
      id: 3, 
      from: 'Mike Johnson', 
      email: 'mike@example.com',
      subject: 'Booking Confirmation', 
      message: 'Please confirm my booking for the modern apartment from February 1st to August 1st.',
      date: '2024-01-18', 
      status: 'Replied',
      type: 'Booking'
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const markAsRead = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'Read' } : msg
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unread': return 'bg-red-100 text-red-800';
      case 'Read': return 'bg-yellow-100 text-yellow-800';
      case 'Replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Inquiry': return 'bg-blue-100 text-blue-800';
      case 'Support': return 'bg-orange-100 text-orange-800';
      case 'Booking': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Messages & Support</h1>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Messages</option>
            <option>Unread</option>
            <option>Read</option>
            <option>Replied</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>All Types</option>
            <option>Inquiry</option>
            <option>Support</option>
            <option>Booking</option>
          </select>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-red-500 p-3 rounded-full text-white text-xl mr-4">📧</div>
            <div>
              <p className="text-gray-500 text-sm">Unread</p>
              <p className="text-2xl font-bold text-gray-800">{messages.filter(m => m.status === 'Unread').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full text-white text-xl mr-4">❓</div>
            <div>
              <p className="text-gray-500 text-sm">Inquiries</p>
              <p className="text-2xl font-bold text-gray-800">{messages.filter(m => m.type === 'Inquiry').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-orange-500 p-3 rounded-full text-white text-xl mr-4">🔧</div>
            <div>
              <p className="text-gray-500 text-sm">Support</p>
              <p className="text-2xl font-bold text-gray-800">{messages.filter(m => m.type === 'Support').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full text-white text-xl mr-4">✅</div>
            <div>
              <p className="text-gray-500 text-sm">Replied</p>
              <p className="text-2xl font-bold text-gray-800">{messages.filter(m => m.status === 'Replied').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="divide-y">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'Unread') markAsRead(message.id);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{message.from}</h3>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(message.type)}`}>
                      {message.type}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
                <p className="font-medium text-gray-800 mb-1">{message.subject}</p>
                <p className="text-sm text-gray-600 truncate">{message.message}</p>
                <p className="text-xs text-gray-400 mt-2">{message.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Message Details</h2>
          </div>
          {selectedMessage ? (
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">{selectedMessage.subject}</h3>
                <p className="text-sm text-gray-500">From: {selectedMessage.from}</p>
                <p className="text-sm text-gray-500">Email: {selectedMessage.email}</p>
                <p className="text-sm text-gray-500">Date: {selectedMessage.date}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">{selectedMessage.message}</p>
              </div>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Reply
                </button>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Mark as Resolved
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}