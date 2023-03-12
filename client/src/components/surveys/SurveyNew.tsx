import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { useState } from "react";
import { reduxForm } from "redux-form";

/**
 * Handles the creation of a new survey and transitions between
 * the creation of a new survey and the review of a new survey.
 * Shows the SurveyForm or SurveyFormReview component.
 * @returns {JSX.Element}
 */
const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  return (
    <div className="container">
      {showFormReview ? (
        <SurveyFormReview onCancel={() => setShowFormReview(false)} />
      ) : (
        <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
      )}
    </div>
  );
};

// This clears the form values when the component unmounts
// since reduxForm config param destroyOnUnmount = true by default
export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
