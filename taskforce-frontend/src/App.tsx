import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Suspense, lazy } from 'react';
import { Sidebar } from './components/Sidebar';
import { ThemeToggle } from './components/ThemeToggle';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import { useTheme } from './hooks/useTheme';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Reports = lazy(() => import('./pages/Reports'));
const Budgets = lazy(() => import('./pages/Budgets'));
const Categories = lazy(() => import('./pages/Categories'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AuthProvider> {/* Wrap the application with AuthProvider */}
        <CurrencyProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/*"
                    element={
                      <div className="flex h-screen">
                        <div className="flex-shrink-0">
                          <Sidebar />
                        </div>
                        <div className="flex-1 flex flex-col overflow-hidden">
                          <header className="h-16 flex items-center justify-end px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <ThemeToggle />
                          </header>
                          <main className="flex-1 overflow-auto">
                            <Routes>
                              <Route path="/" element={<Dashboard />} />
                              <Route path="/transactions" element={<Transactions />} />
                              <Route path="/reports" element={<Reports />} />
                              <Route path="/budgets" element={<Budgets />} />
                              <Route path="/categories" element={<Categories />} />
                              <Route path="/settings" element={<Settings />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
              <Toaster position="top-right" />
            </div>
          </Router>
        </CurrencyProvider>
      </AuthProvider> {/* Close AuthProvider */}
    </div>
  );
}