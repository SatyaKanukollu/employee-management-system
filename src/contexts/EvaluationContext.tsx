import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, setStoredData } from '../utils/localStorage';
import type { Evaluation } from '../types';

interface EvaluationContextType {
  evaluations: Evaluation[];
  addEvaluation: (evaluation: Omit<Evaluation, 'id'>) => void;
  updateEvaluation: (id: string, updates: Partial<Evaluation>) => void;
  getEmployeeEvaluations: (employeeId: string) => Evaluation[];
  getEvaluationById: (id: string) => Evaluation | undefined;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => 
    getStoredData('evaluations', [])
  );

  useEffect(() => {
    setStoredData('evaluations', evaluations);
  }, [evaluations]);

  const addEvaluation = (evaluation: Omit<Evaluation, 'id'>) => {
    const newEvaluation: Evaluation = {
      ...evaluation,
      id: Date.now().toString(),
    };
    setEvaluations(prevEvaluations => [...prevEvaluations, newEvaluation]);
  };

  const updateEvaluation = (id: string, updates: Partial<Evaluation>) => {
    setEvaluations(prevEvaluations => prevEvaluations.map(evaluation => 
      evaluation.id === id ? { ...evaluation, ...updates } : evaluation
    ));
  };

  const getEmployeeEvaluations = (employeeId: string) => {
    return evaluations.filter(evaluation => evaluation.employeeId === employeeId);
  };

  const getEvaluationById = (id: string) => {
    return evaluations.find(evaluation => evaluation.id === id);
  };

  return (
    <EvaluationContext.Provider value={{ 
      evaluations, 
      addEvaluation, 
      updateEvaluation, 
      getEmployeeEvaluations,
      getEvaluationById
    }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluations = () => {
  const context = useContext(EvaluationContext);
  if (!context) {
    throw new Error('useEvaluations must be used within an EvaluationProvider');
  }
  return context;
};