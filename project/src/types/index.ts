export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  joinDate: string;
  avatar?: string;
}

export interface Evaluation {
  id: string;
  employeeId: string;
  date: string;
  quarter: number;
  year: number;
  performance: number;
  communication: number;
  leadership: number;
  technical: number;
  comments: string;
  goals: string[];
  evaluatorId: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  email: string;
}