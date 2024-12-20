import React from 'react';
import { useEvaluations } from '../../contexts/EvaluationContext';
import { useEmployees } from '../../contexts/EmployeeContext';
import type { Evaluation } from '../../types';

interface EvaluationListProps {
  onEdit: (evaluation: Evaluation) => void;
  canEdit: boolean;
}

const EvaluationList: React.FC<EvaluationListProps> = ({ onEdit, canEdit }) => {
  const { evaluations } = useEvaluations();
  const { getEmployeeById } = useEmployees();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quarter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {evaluations.map((evaluation) => {
            const employee = getEmployeeById(evaluation.employeeId);
            return (
              <tr key={evaluation.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {employee?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {employee?.position}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Q{evaluation.quarter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {evaluation.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onEdit(evaluation)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    disabled={!canEdit}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationList;