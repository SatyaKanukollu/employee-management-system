import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';
import { useEvaluations } from '../contexts/EvaluationContext';
import { useAuth } from '../contexts/AuthContext';
import EvaluationForm from '../components/evaluations/EvaluationForm';
import EvaluationList from '../components/evaluations/EvaluationList';
import type { Employee, Evaluation } from '../types';

const Evaluations = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);

  const { user } = useAuth();
  const { employees } = useEmployees();
  const { addEvaluation, updateEvaluation } = useEvaluations();

  const canCreateEvaluation = user?.role === 'admin' || user?.role === 'manager';

  const handleNewEvaluation = () => {
    setEditingEvaluation(null);
    setShowEvaluationForm(true);
  };

  const handleEvaluationSubmit = async (evaluation: Omit<Evaluation, 'id'>) => {
    if (editingEvaluation) {
      await updateEvaluation(editingEvaluation.id, evaluation);
    } else {
      await addEvaluation(evaluation);
    }
    setShowEvaluationForm(false);
    setSelectedEmployee(null);
    setEditingEvaluation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Evaluations</h2>
        {canCreateEvaluation && (
          <button
            onClick={handleNewEvaluation}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Evaluation
          </button>
        )}
      </div>

      {showEvaluationForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingEvaluation ? 'Edit Evaluation' : 'New Evaluation'}
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Employee
            </label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedEmployee?.id || ''}
              onChange={(e) => {
                const employee = employees.find(emp => emp.id === e.target.value);
                setSelectedEmployee(employee || null);
              }}
              disabled={!!editingEvaluation}
            >
              <option value="">Select an employee...</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </option>
              ))}
            </select>
          </div>
          
          {selectedEmployee && (
            <EvaluationForm
              employee={selectedEmployee}
              initialData={editingEvaluation}
              onSubmit={handleEvaluationSubmit}
            />
          )}
        </div>
      ) : (
        <EvaluationList
          onEdit={setEditingEvaluation}
          canEdit={canCreateEvaluation}
        />
      )}
    </div>
  );
};

export default Evaluations;