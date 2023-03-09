import { useSelector } from "react-redux";

const SurveyFormReview = () => {
  const formValues = useSelector((state: any) => state.form.surveyForm.values);

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        <div>
          <label>Survey Title</label>
          <div>{formValues.title}</div>
        </div>
        <div>
          <label>Subject Line</label>
          <div>{formValues.subject}</div>
        </div>
        <div>
          <label>Email Body</label>
          <div>{formValues.body}</div>
        </div>
        <div>
          <label>Recipient List</label>
          <div>{formValues.recipients}</div>
        </div>
      </div>
    </div>
  );
};

export default SurveyFormReview;
