export const buildRecommendations = (values, score) => {
  const recommendations = [];

  if (values.coughDuration > 3) {
    recommendations.push({
      title: 'Chest X-Ray recommended',
      description: 'A prolonged cough suggests imaging to evaluate your lungs and rule out infection.',
      variant: 'warning',
    });
  }
  if (values.weightLoss) {
    recommendations.push({
      title: 'Consult a nutritionist',
      description: 'Sudden weight loss can signal systemic illness and nutritional support may help recovery.',
      variant: 'info',
    });
  }
  if (values.hivStatus === 'positive') {
    recommendations.push({
      title: 'Immediate specialist referral',
      description: 'HIV-positive patients require urgent TB care coordination and close clinical monitoring.',
      variant: 'danger',
    });
  }
  if (values.smoking === 'yes') {
    recommendations.push({
      title: 'Enrol in smoking cessation programme',
      description: 'Smoking increases respiratory risk and quitting will support your lung health.',
      variant: 'warning',
    });
  }
  if (values.diabetes === 'yes') {
    recommendations.push({
      title: 'Enhanced TB monitoring required',
      description: 'Diabetes can intensify TB progression, so extra monitoring is advised.',
      variant: 'warning',
    });
  }
  if (score > 70) {
    recommendations.push({
      title: 'Seek immediate medical attention',
      description: 'A high-risk score indicates you should contact a healthcare provider right away.',
      variant: 'danger',
    });
  }

  if (!recommendations.length) {
    recommendations.push({
      title: 'Continue regular screening',
      description: 'Your current profile appears stable, but watch for symptom changes and stay vigilant.',
      variant: 'success',
    });
  }

  return recommendations;
};
