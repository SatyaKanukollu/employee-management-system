import React, { createContext, useContext, useState, useEffect } from 'react';
import { employees as initialEmployees } from '../data/employees';
import { getStoredData, setStoredData } from '../utils/localStorage';
import type { Employee } from '../types';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  removeEmployee: (id: string) => void;
  getEmployeeById: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => 
    getStoredData('employees', initialEmployees)
  );

  useEffect(() => {
    setStoredData('employees', employees);
  }, [employees]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    ));
  };

  const removeEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider value={{ 
      employees, 
      addEmployee, 
      updateEmployee, 
      removeEmployee,
      getEmployeeById
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};