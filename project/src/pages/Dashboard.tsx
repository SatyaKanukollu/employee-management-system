import React from 'react';
import { BarChart, Users, Award, Target } from 'lucide-react';
import { useEvaluations } from '../contexts/EvaluationContext';
import { useEmployees } from '../contexts/EmployeeContext';
import { calculateDashboardStats } from '../utils/dashboardUtils';
import StatCard from '../components/dashboard/StatCard';

const Dashboard = () => {
  const { evaluations } = useEvaluations();
  const { employees } = useEmployees();

  const {
    totalEmployees,
    pendingReviews,
    completedReviews,
    departmentGoals,
    currentQuarter,
    currentYear,
  } = calculateDashboardStats(employees, evaluations);

  const stats = [
    {
      icon: Users,
      title: 'Total Employees',
      value: totalEmployees,
      color: 'bg-blue-500',
    },
    {
      icon: BarChart,
      title: 'Pending Reviews',
      value: pendingReviews,
      color: 'bg-yellow-500',
    },
    {
      icon: Award,
      title: 'Completed Reviews',
      value: completedReviews,
      color: 'bg-green-500',
    },
    {
      icon: Target,
      title: 'Department Goals',
      value: departmentGoals,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="text-sm text-gray-600">
          Q{currentQuarter} {currentYear}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;