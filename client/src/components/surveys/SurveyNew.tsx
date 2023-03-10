import SurveyForm from "./SurveyForm";

/**
 * Handles the creation of a new survey and transitions between
 * the creation of a new survey and the review of a new survey.
 * Shows the SurveyForm or SurveyFormReview component.
 * @returns {JSX.Element}
 */
const SurveyNew = () => {
  return (
    <div>
      <SurveyForm />
    </div>
  );
};

export default SurveyNew;
