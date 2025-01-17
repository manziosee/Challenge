// src/pages/Dashboard.tsx
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { ArrowUpRight, ArrowDownRight, Wallet, Calendar, CreditCard, Banknote } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { currency } = useCurrency();
  const [timeRange] = useState('This Month');

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Income',
        data: [150000, 200000, 180000, 250000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: [100000, 150000, 120000, 180000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
          'rgb(168, 85, 247)',
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
        ],
      },
    ],
  };

  const recentTransactions = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: -45000,
      date: '2024-03-15',
      category: 'Food',
    },
    {
      id: 2,
      description: 'Salary Deposit',
      amount: 250000,
      date: '2024-03-14',
      category: 'Income',
    },
    {
      id: 3,
      description: 'Internet Bill',
      amount: -25000,
      date: '2024-03-13',
      category: 'Bills',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Eric!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your financial overview</p>
        </div>
        <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select aria-label="Time Range" className="bg-transparent border-none focus:ring-0 text-sm">
            <option>{timeRange}</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">Total Balance</span>
          </div>
          <p className="text-3xl font-bold mb-1">{currency} 500,000</p>
          <p className="text-sm text-blue-100">Across all accounts</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">Income</span>
          </div>
          <p className="text-3xl font-bold mb-1">{currency} 250,000</p>
          <p className="text-sm text-green-100">+15% from last month</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Banknote className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">Expenses</span>
          </div>
          <p className="text-3xl font-bold mb-1">{currency} 180,000</p>
          <p className="text-sm text-red-100">72% of monthly budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Income vs Expenses</h2>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${currency} ${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-6">Expense Categories</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    transaction.amount > 0
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.amount > 0 ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {currency} {Math.abs(transaction.amount).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}