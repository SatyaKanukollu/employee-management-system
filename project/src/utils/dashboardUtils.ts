import type { Employee, Evaluation } from '../types';

interface DashboardStats {
  totalEmployees: number;
  pendingReviews: number;
  completedReviews: number;
  departmentGoals: number;
  currentQuarter: number;
  currentYear: number;
}

export const calculateDashboardStats = (
  employees: Employee[],
  evaluations: Evaluation[]
): DashboardStats => {
  const currentDate = new Date();
  const currentQuarter = Math.floor((currentDate.getMonth() / 3) + 1);
  const currentYear = currentDate.getFullYear();
  
  const currentQuarterEvaluations = evaluations.filter(evaluation => 
    evaluation.quarter === currentQuarter && 
    evaluation.year === currentYear
  );

  const completedReviews = currentQuarterEvaluations.length;
  const pendingReviews = employees.length - completedReviews;

  // Get unique departments for goals
  const departments = new Set(employees.map(emp => emp.department));
  const departmentGoals = departments.size * 2; // 2 goals per department

  return {
    totalEmployees: employees.length,
    pendingReviews: Math.max(0, pendingReviews),
    completedReviews,
    departmentGoals,
    currentQuarter,
    currentYear,
  };
};