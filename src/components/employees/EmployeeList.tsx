import React from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import EmployeeCard from './EmployeeCard';
import type { Employee } from '../../types';

interface EmployeeListProps {
  onSelectEmployee: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onSelectEmployee }) => {
  const { employees } = useEmployees();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onSelect={onSelectEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeList;