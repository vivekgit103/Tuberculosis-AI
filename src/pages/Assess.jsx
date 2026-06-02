import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentForm } from '../components/forms/AssessmentForm.jsx';
import { useAssessment } from '../hooks/useAssessment.js';

export const Assess = () => {
  const { saveAssessment } = useAssessment();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    saveAssessment(values);
    navigate('/results');
  };

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section-header">
          <div>
            <h1 className="section-title">TB risk assessment</h1>
            <p className="section-copy">Complete the screening form to generate an explainable risk profile and personalised care suggestions.</p>
          </div>
        </div>
        <AssessmentForm onSubmit={handleSubmit} />
      </section>
    </main>
  );
};
