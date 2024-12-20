import React, { useState, useEffect } from 'react';
import type { Employee, Evaluation } from '../types';

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
  const [evaluation, setEvaluation] = useState({
    performance: 5,
    communication: 5,
    leadership: 5,
    technical: 5,
    comments: '',
    goals: [''],
  });

  useEffect(() => {
    if (initialData) {
      setEvaluation({
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
    onSubmit({
      ...evaluation,
      employeeId: employee.id,
      employeeEmail: employee.email,
      date: new Date().toISOString(),
      quarter: Math.floor((new Date().getMonth() / 3) + 1),
      year: new Date().getFullYear(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form content remains the same */}
    </form>
  );
};

export default EvaluationForm;