export const validateAssessment = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Patient name is required';
  }
  if (!values.age || values.age < 1 || values.age > 120) {
    errors.age = 'Enter a valid age between 1 and 120';
  }
  if (!values.gender) {
    errors.gender = 'Gender is required';
  }
  if (!values.smoking) {
    errors.smoking = 'Please select smoking status';
  }
  if (!values.hivStatus) {
    errors.hivStatus = 'Please select HIV status';
  }
  if (!values.diabetes) {
    errors.diabetes = 'Please select diabetes status';
  }
  if (values.coughDuration === '' || values.coughDuration < 0) {
    errors.coughDuration = 'Enter cough duration in weeks';
  }

  return errors;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateAuth = (values, isRegister = false) => {
  const errors = {};

  if (isRegister && !values.name.trim()) {
    errors.name = 'Name is required';
  }
  if (!values.email.trim() || !EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!values.password || values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (isRegister && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
};
