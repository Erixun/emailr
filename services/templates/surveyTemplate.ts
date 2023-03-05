const surveyTemplate = ({ body }: { body?: string }) =>
  `<div>${body ?? "No content"}</div>`;

export default surveyTemplate;
