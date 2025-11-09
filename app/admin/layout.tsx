'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Manage Properties', icon: '🏠' },
  { href: '/admin/users', label: 'Manage Users', icon: '👥' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/payments', label: 'Payments', icon: '💰' },
  { href: '/admin/messages', label: 'Messages', icon: '💬' },
  { href: '/admin/reports', label: 'Reports', icon: '📈' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 p-2 rounded-md hover:bg-gray-100"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-blue-600">SQ Feet Realty</h1>
            <span className="ml-2 text-sm text-gray-500">Admin Panel</span>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-sm transition-all duration-300`}>
          <nav className="p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}