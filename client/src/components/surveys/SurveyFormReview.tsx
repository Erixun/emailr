import { connect, RootStateOrAny } from "react-redux";
import { getFormValues } from "redux-form";
import FormFields from "./FormFields";
import * as actions from "../../actions";
import "./surveys.css";
import { useHistory } from "react-router-dom";
import { History } from "history";

const SurveyFormReview = ({
  formValues,
  onCancel,
  submitSurvey,
}: SurveyFormReviewProps) => {
  console.log(formValues);

  const renderFields = () =>
    FormFields.map(({ label, name }: { label: string; name: string }) => (
      <div className="field-review" key={name}>
        <label>{label}</label>
        <div className="field-value">{formValues[name]}</div>
      </div>
    ));

  const history = useHistory();

  const handleSubmit = () => {
    console.log("submitting");
    submitSurvey(formValues, history);
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h5>Please confirm your entries</h5>
      <div>
        {renderFields()}
        <button className="yellow darken-3 btn-flat" onClick={onCancel}>
          <i className="material-icons left">arrow_back</i>
          Back
        </button>
        <button
          className="teal white-text btn-flat right"
          onClick={handleSubmit}
        >
          <i className="material-icons right">outgoing_mail</i>
          Send Survey
        </button>
      </div>
    </div>
  );
};

interface SurveyFormReviewProps {
  formValues?: any;
  onCancel?: () => void;
  history?: History;
  submitSurvey: (formValues: any, history: History) => void;
}

/**
 * Takes the form values from the redux store and passes them to the component
 * @param state - the redux store
 * @returns {object} - the form values
 */
const mapStateToProps = (state: RootStateOrAny): object => {
  return {
    formValues: getFormValues("surveyForm")(state) || {},
  };
};

export default connect(mapStateToProps, actions)(SurveyFormReview);
