import type { Evaluation } from '../types';

export const generateEvaluationReport = (evaluation: Evaluation): string => {
  const ratings = {
    performance: getRatingDescription(evaluation.performance),
    communication: getCommunicationDescription(evaluation.communication),
    leadership: getLeadershipDescription(evaluation.leadership),
    technical: getTechnicalDescription(evaluation.technical),
  };

  return `
Performance Evaluation Report
---------------------------

Performance: ${ratings.performance}

Communication: ${ratings.communication}

Leadership: ${ratings.leadership}

Technical Skills: ${ratings.technical}

Comments:
${evaluation.comments}

Goals for Next Quarter:
${evaluation.goals.map((goal, index) => `${index + 1}. ${goal}`).join('\n')}
`;
};

const getRatingDescription = (rating: number): string => {
  const descriptions = {
    1: 'Needs immediate improvement in overall job performance',
    2: 'Performing below expectations',
    3: 'Meets some basic expectations but needs significant improvement',
    4: 'Approaching expected performance levels',
    5: 'Meets basic performance expectations',
    6: 'Consistently meets performance expectations',
    7: 'Exceeds expectations in some areas',
    8: 'Consistently exceeds expectations',
    9: 'Demonstrates exceptional performance',
    10: 'Shows outstanding performance in all areas',
  };
  return `Rated ${rating}/10 - ${descriptions[rating as keyof typeof descriptions]}`;
};

const getCommunicationDescription = (rating: number): string => {
  const descriptions = {
    1: 'Requires significant improvement in communication skills',
    2: 'Struggles with clear communication',
    3: 'Shows basic communication abilities',
    4: 'Developing communication skills',
    5: 'Demonstrates adequate communication',
    6: 'Communicates effectively most times',
    7: 'Shows strong communication abilities',
    8: 'Excels in communication',
    9: 'Demonstrates exceptional communication skills',
    10: 'Shows mastery in all aspects of communication',
  };
  return `Rated ${rating}/10 - ${descriptions[rating as keyof typeof descriptions]}`;
};

const getLeadershipDescription = (rating: number): string => {
  const descriptions = {
    1: 'Needs fundamental leadership development',
    2: 'Shows limited leadership capabilities',
    3: 'Demonstrates basic leadership potential',
    4: 'Developing leadership skills',
    5: 'Shows adequate leadership abilities',
    6: 'Demonstrates good leadership qualities',
    7: 'Shows strong leadership capabilities',
    8: 'Excels in leadership roles',
    9: 'Demonstrates exceptional leadership',
    10: 'Shows outstanding leadership in all situations',
  };
  return `Rated ${rating}/10 - ${descriptions[rating as keyof typeof descriptions]}`;
};

const getTechnicalDescription = (rating: number): string => {
  const descriptions = {
    1: 'Needs significant technical skill development',
    2: 'Shows limited technical proficiency',
    3: 'Demonstrates basic technical skills',
    4: 'Developing technical capabilities',
    5: 'Shows adequate technical knowledge',
    6: 'Demonstrates good technical proficiency',
    7: 'Shows strong technical capabilities',
    8: 'Excels in technical areas',
    9: 'Demonstrates exceptional technical expertise',
    10: 'Shows mastery of all technical aspects',
  };
  return `Rated ${rating}/10 - ${descriptions[rating as keyof typeof descriptions]}`;
};