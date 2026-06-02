const WEIGHTS = {
  coughWeek: { label: 'Prolonged cough', score: 20 },
  nightSweats: { label: 'Night sweats', score: 15 },
  weightLoss: { label: 'Weight loss', score: 15 },
  fever: { label: 'Fever', score: 10 },
  hivStatus: { label: 'HIV positive', score: 20 },
  diabetes: { label: 'Diabetes', score: 10 },
  smoking: { label: 'Smoking', score: 5 },
  fatigue: { label: 'Fatigue', score: 5 },
  chestPain: { label: 'Chest pain', score: 8 },
  age: { label: 'Age over 60', score: 5 },
};

export const scoreAssessment = (values) => {
  const factors = [];
  let rawScore = 0;

  if (values.coughDuration > 3) {
    rawScore += WEIGHTS.coughWeek.score;
    factors.push({ key: 'coughWeek', label: WEIGHTS.coughWeek.label, value: WEIGHTS.coughWeek.score });
  }
  if (values.nightSweats) {
    rawScore += WEIGHTS.nightSweats.score;
    factors.push({ key: 'nightSweats', label: WEIGHTS.nightSweats.label, value: WEIGHTS.nightSweats.score });
  }
  if (values.weightLoss) {
    rawScore += WEIGHTS.weightLoss.score;
    factors.push({ key: 'weightLoss', label: WEIGHTS.weightLoss.label, value: WEIGHTS.weightLoss.score });
  }
  if (values.fever) {
    rawScore += WEIGHTS.fever.score;
    factors.push({ key: 'fever', label: WEIGHTS.fever.label, value: WEIGHTS.fever.score });
  }
  if (values.hivStatus === 'positive') {
    rawScore += WEIGHTS.hivStatus.score;
    factors.push({ key: 'hivStatus', label: WEIGHTS.hivStatus.label, value: WEIGHTS.hivStatus.score });
  }
  if (values.diabetes === 'yes') {
    rawScore += WEIGHTS.diabetes.score;
    factors.push({ key: 'diabetes', label: WEIGHTS.diabetes.label, value: WEIGHTS.diabetes.score });
  }
  if (values.smoking === 'yes') {
    rawScore += WEIGHTS.smoking.score;
    factors.push({ key: 'smoking', label: WEIGHTS.smoking.label, value: WEIGHTS.smoking.score });
  }
  if (values.fatigue) {
    rawScore += WEIGHTS.fatigue.score;
    factors.push({ key: 'fatigue', label: WEIGHTS.fatigue.label, value: WEIGHTS.fatigue.score });
  }
  if (values.chestPain) {
    rawScore += WEIGHTS.chestPain.score;
    factors.push({ key: 'chestPain', label: WEIGHTS.chestPain.label, value: WEIGHTS.chestPain.score });
  }
  if (values.age > 60) {
    rawScore += WEIGHTS.age.score;
    factors.push({ key: 'age', label: WEIGHTS.age.label, value: WEIGHTS.age.score });
  }

  const totalMax = Object.values(WEIGHTS).reduce((sum, w) => sum + w.score, 0);
  const normalized = Math.round((rawScore / totalMax) * 100);

  const category = normalized > 70 ? 'High' : normalized > 30 ? 'Medium' : 'Low';

  const topFactors = factors
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)
    .map((factor) => ({
      name: factor.label,
      contribution: Math.round((factor.value / totalMax) * 100),
    }));

  return {
    score: normalized,
    category,
    topFactors,
  };
};
