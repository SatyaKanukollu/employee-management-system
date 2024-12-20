import { useEvaluations } from '../contexts/EvaluationContext';
import { generateEvaluationReport } from '../utils/evaluationUtils';
import { sendEvaluationEmail } from '../utils/emailUtils';
import type { Evaluation } from '../types';

export const useEvaluationActions = () => {
  const { addEvaluation, updateEvaluation } = useEvaluations();

  const submitEvaluation = async (evaluation: Omit<Evaluation, 'id'>) => {
    const newEvaluation = {
      ...evaluation,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    addEvaluation(newEvaluation);

    const report = generateEvaluationReport(newEvaluation as Evaluation);

    try {
      await sendEvaluationEmail(
        evaluation.employeeEmail,
        'Your Performance Evaluation Report',
        report
      );
    } catch (error) {
      console.error('Failed to send evaluation email:', error);
    }

    return newEvaluation;
  };

  const editEvaluation = async (id: string, updates: Partial<Evaluation>) => {
    updateEvaluation(id, updates);

    const report = generateEvaluationReport(updates as Evaluation);

    try {
      await sendEvaluationEmail(
        updates.employeeEmail!,
        'Your Updated Performance Evaluation Report',
        report
      );
    } catch (error) {
      console.error('Failed to send evaluation update email:', error);
    }

    return updates;
  };

  return {
    submitEvaluation,
    editEvaluation,
  };
};