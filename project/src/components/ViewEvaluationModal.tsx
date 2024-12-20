import React from 'react';
import { X } from 'lucide-react';
import type { Evaluation, Employee } from '../types';

interface ViewEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: Evaluation;
  employee: Employee;
}

const ViewEvaluationModal: React.FC<ViewEvaluationModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  employee,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Evaluation Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Employee Information</h3>
            <p className="text-gray-700">Name: {employee.name}</p>
            <p className="text-gray-700">Position: {employee.position}</p>
            <p className="text-gray-700">Department: {employee.department}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Performance</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(evaluation.performance / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{evaluation.performance}/10</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Communication</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(evaluation.communication / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{evaluation.communication}/10</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Leadership</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(evaluation.leadership / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{evaluation.leadership}/10</span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Technical Skills</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(evaluation.technical / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{evaluation.technical}/10</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Comments</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{evaluation.comments}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Goals for Next Quarter</h3>
            <ul className="list-disc list-inside space-y-1">
              {evaluation.goals.map((goal, index) => (
                <li key={index} className="text-gray-700">{goal}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEvaluationModal;