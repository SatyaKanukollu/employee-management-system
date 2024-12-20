import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EmployeeList from '../components/employees/EmployeeList';
import type { Employee } from '../types';

const Employees = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addEmployee } = useEmployees();
  const { user } = useAuth();

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    addEmployee(newEmployee);
    setIsAddModalOpen(false);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    // Handle employee selection based on user role
    console.log('Selected employee:', employee);
  };

  const canAddEmployee = user?.role === 'admin' || user?.role === 'manager';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employees</h2>
        {canAddEmployee && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        )}
      </div>

      <EmployeeList onSelectEmployee={handleEmployeeSelect} />

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;