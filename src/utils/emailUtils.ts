import { generateEvaluationReport } from './evaluationUtils';
import type { Evaluation } from '../types';

export const sendEvaluationEmail = async (
  recipientEmail: string,
  evaluation: Evaluation
): Promise<void> => {
  const report = generateEvaluationReport(evaluation);
  const subject = `Your Performance Evaluation for Q${evaluation.quarter} ${evaluation.year}`;

  // In a real application, this would connect to an email service
  // For demo purposes, we'll just log the email
  console.log('Sending evaluation email:', {
    to: recipientEmail,
    subject,
    content: report,
  });
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
};