import React, { useState, useEffect } from 'react';
import type { Employee, Evaluation } from '../../types';

interface EvaluationFormProps {
  employee: Employee;
  initialData?: Evaluation | null;
  onSubmit: (evaluation: Omit<Evaluation, 'id'>) => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ 
  employee, 
  initialData,
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    performance: 5,
    communication: 5,
    leadership: 5,
    technical: 5,
    comments: '',
    goals: [''],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        performance: initialData.performance,
        communication: initialData.communication,
        leadership: initialData.leadership,
        technical: initialData.technical,
        comments: initialData.comments,
        goals: initialData.goals,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
    onSubmit({
      ...formData,
      employeeId: employee.id,
      employeeEmail: employee.email,
      date: currentDate.toISOString(),
      quarter: Math.floor((currentDate.getMonth() / 3) + 1),
      year: currentDate.getFullYear(),
      evaluatorId: 'current-user-id', // This should come from auth context
    });
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData(prev => ({ ...prev, goals: newGoals }));
  };

  const addGoal = () => {
    setFormData(prev => ({ ...prev, goals: [...prev.goals, ''] }));
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Performance</label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.performance}
            onChange={(e) => setFormData(prev => ({ ...prev, performance: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-right">{formData.performance}/10</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Communication</label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.communication}
            onChange={(e) => setFormData(prev => ({ ...prev, communication: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-right">{formData.communication}/10</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Leadership</label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.leadership}
            onChange={(e) => setFormData(prev => ({ ...prev, leadership: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-right">{formData.leadership}/10</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.technical}
            onChange={(e) => setFormData(prev => ({ ...prev, technical: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-right">{formData.technical}/10</div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          value={formData.comments}
          onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Goals for Next Quarter</label>
        {formData.goals.map((goal, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={goal}
              onChange={(e) => handleGoalChange(index, e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter a goal..."
            />
            {formData.goals.length > 1 && (
              <button
                type="button"
                onClick={() => removeGoal(index)}
                className="px-2 py-1 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addGoal}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          + Add Goal
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit Evaluation
        </button>
      </div>
    </form>
  );
};

export default EvaluationForm;