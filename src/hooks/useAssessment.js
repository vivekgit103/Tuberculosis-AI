import { useState } from 'react';
import { getItem, setItem } from '../utils/storage.js';
import { scoreAssessment } from '../utils/scoringEngine.js';
import { buildRecommendations } from '../utils/recommendationEngine.js';

const historyKey = 'tbGuardianHistory';

export const useAssessment = () => {
  const [currentResult, setCurrentResult] = useState(null);

  const loadHistory = () => getItem(historyKey, []);

  const saveAssessment = (values) => {
    const { score, category, topFactors } = scoreAssessment(values);
    const recommendations = buildRecommendations(values, score);
    const assessment = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: values.name,
      email: values.email || 'anonymous',
      date: new Date().toISOString().slice(0, 10),
      score,
      category,
      topFactors,
      recommendations,
      values,
    };

    const history = loadHistory();
    setItem(historyKey, [assessment, ...history]);
    setItem('tbGuardianLastResult', assessment);
    setCurrentResult(assessment);
    return assessment;
  };

  return { currentResult, saveAssessment, loadHistory };
};
