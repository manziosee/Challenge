import { useState } from 'react';
import { Home, PieChart, Settings, Wallet, Receipt, Target, Menu, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Transactions', href: '/transactions', icon: Wallet },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Budgets', href: '/budgets', icon: Target },
  { name: 'Categories', href: '/categories', icon: Receipt },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth(); // Use the logout function from the context

  return (
    <div className={clsx(
      'flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
      isOpen ? 'w-64' : 'w-20'
    )}>
      <div className="flex items-center h-16 px-4">
        <button
          title="Toggle Sidebar"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>
        {isOpen && (
          <Link to="/" className="flex items-center space-x-2 ml-2">
            <Wallet className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">TaskForce</span>
          </Link>
        )}
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                location.pathname === item.href
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          );
        })}
        {/* Add the logout button */}
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </nav>
    </div>
  );
}