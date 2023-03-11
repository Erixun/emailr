import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { useState } from "react";

/**
 * Handles the creation of a new survey and transitions between
 * the creation of a new survey and the review of a new survey.
 * Shows the SurveyForm or SurveyFormReview component.
 * @returns {JSX.Element}
 */
const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);
  return (
    <div>
      {showFormReview ? (
        <SurveyFormReview />
      ) : (
        //  onCancel={() => setShowFormReview(false)} />
        <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />
      )}
    </div>
  );
};

export default SurveyNew;
