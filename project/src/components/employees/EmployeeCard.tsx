import React from 'react';
import { Mail, Building } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(employee)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4">
        <img
          src={employee.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
          alt={employee.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-gray-600">{employee.position}</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Building className="w-4 h-4" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{employee.email}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <span className="text-sm text-gray-500">
          Joined: {new Date(employee.joinDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default EmployeeCard;