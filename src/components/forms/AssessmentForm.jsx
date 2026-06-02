import React, { useState } from 'react';
import { validateAssessment } from '../../utils/validators.js';
import { Button } from '../ui/Button.jsx';

const initialState = {
  name: '',
  age: '',
  gender: '',
  smoking: '',
  hivStatus: '',
  diabetes: '',
  weightLoss: false,
  fever: false,
  chestPain: false,
  nightSweats: false,
  fatigue: false,
  coughDuration: 0,
  additionalSymptoms: '',
};

export const AssessmentForm = ({ onSubmit }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validation = validateAssessment(values);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    setErrors({});
    onSubmit({
      ...values,
      age: Number(values.age),
      coughDuration: Number(values.coughDuration),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-2" style={{ gap: '24px' }}>
      <div className="card card-inner">
        <div className="input-group">
          <label htmlFor="name">Patient name</label>
          <input id="name" value={values.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Full name" />
          {errors.name && <span className="input-error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input id="age" type="number" value={values.age} onChange={(e) => handleChange('age', e.target.value)} placeholder="e.g. 34" />
          {errors.age && <span className="input-error">{errors.age}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" value={values.gender} onChange={(e) => handleChange('gender', e.target.value)}>
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="input-error">{errors.gender}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="smoking">Smoking status</label>
          <select id="smoking" value={values.smoking} onChange={(e) => handleChange('smoking', e.target.value)}>
            <option value="">Choose</option>
            <option value="yes">Current smoker</option>
            <option value="no">Non-smoker</option>
          </select>
          {errors.smoking && <span className="input-error">{errors.smoking}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="hivStatus">HIV status</label>
          <select id="hivStatus" value={values.hivStatus} onChange={(e) => handleChange('hivStatus', e.target.value)}>
            <option value="">Choose</option>
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
          </select>
          {errors.hivStatus && <span className="input-error">{errors.hivStatus}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="diabetes">Diabetes</label>
          <select id="diabetes" value={values.diabetes} onChange={(e) => handleChange('diabetes', e.target.value)}>
            <option value="">Choose</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.diabetes && <span className="input-error">{errors.diabetes}</span>}
        </div>
      </div>

      <div className="card card-inner">
        <div className="grid" style={{ gap: '18px', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <div className="input-group">
            <label htmlFor="coughDuration">Cough duration (weeks)</label>
            <input id="coughDuration" type="number" value={values.coughDuration} onChange={(e) => handleChange('coughDuration', e.target.value)} min="0" />
            {errors.coughDuration && <span className="input-error">{errors.coughDuration}</span>}
          </div>

          <div className="input-group">
            <label>Symptom flags</label>
            <div style={{ display: 'grid', gap: '12px' }}>
              {['weightLoss', 'fever', 'chestPain', 'nightSweats', 'fatigue'].map((field) => (
                <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
                  <input type="checkbox" checked={values[field]} onChange={(e) => handleChange(field, e.target.checked)} />
                  {field === 'weightLoss' ? 'Weight loss' : field === 'chestPain' ? 'Chest pain' : field === 'nightSweats' ? 'Night sweats' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="additionalSymptoms">Additional symptoms</label>
          <textarea id="additionalSymptoms" value={values.additionalSymptoms} onChange={(e) => handleChange('additionalSymptoms', e.target.value)} placeholder="Describe any other symptoms..." />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <Button type="submit" variant="primary">Calculate risk</Button>
        </div>
      </div>
    </form>
  );
};
