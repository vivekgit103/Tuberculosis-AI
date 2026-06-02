export const printAssessmentReport = (data) => {
  const title = `TB Guardian AI Report - ${data.name}`;
  document.title = title;
  window.print();
};
