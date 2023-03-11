import { connect, RootStateOrAny, useSelector } from "react-redux";
import { getFormValues } from "redux-form";

const SurveyFormReview = ({ formValues }: { formValues: any }) => {
  console.log(formValues);
  // const formValues = getFormValues("surveyForm"); //useSelector((state: any) => state.form.surveyForm);

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

const mapStateToProps = (state: RootStateOrAny) => {
  return {
    formValues: getFormValues("surveyForm")(state) || {},
  };
};

export default connect(mapStateToProps)(SurveyFormReview);
