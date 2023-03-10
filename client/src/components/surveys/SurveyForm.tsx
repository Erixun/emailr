import { useState } from "react";
import { reduxForm } from "redux-form";

const SurveyForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    subject: "",
    body: "",
    recipients: "",
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div>
      <form>
        <div>
          <label>Survey Title</label>
          <input
            value={formValues.title}
            onChange={onInputChange}
            name="title"
          />
        </div>
        <div>
          <label>Subject Line</label>
          <input
            value={formValues.subject}
            onChange={onInputChange}
            name="subject"
          />
        </div>
        <div>
          <label>Email Body</label>
          <input value={formValues.body} onChange={onInputChange} name="body" />
        </div>
        <div>
          <label>Recipient List</label>
          <input
            value={formValues.recipients}
            onChange={onInputChange}
            name="recipients"
          />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({ form: "surveyForm" })(SurveyForm);
