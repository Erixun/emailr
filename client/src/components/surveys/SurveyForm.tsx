import { useState } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field, getFormValues } from "redux-form";
import validateEmails from "../../utils/validateEmails";
import SurveyField from "./SurveyField";
//make indexable with string
type StringIndexed = { [key: string]: string };
const DefaultLabel: StringIndexed = {
  title: "Survey Title",
  subject: "Subject Line",
  body: "Email Body",
  recipients: "Recipient List",
};
const DefaultState: StringIndexed = {
  title: "",
  subject: "",
  body: "",
  recipients: "",
};
const FIELDS = [
  { label: "Survey Title", name: "title", type: "text" },
  { label: "Subject Line", name: "subject", type: "text" },
  { label: "Email Body", name: "body", type: "text" },
  { label: "Recipient List", name: "recipients", type: "email" },
];
const initState = () => ({ ...DefaultState });
interface SurveyFormProps {
  // onFormSubmit: Function;
  onSurveySubmit: () => void;
  invalid?: boolean;
}
const SurveyForm = ({ onSurveySubmit, invalid }: SurveyFormProps) => {
  //unused
  // const [formValues, setFormValues] = useState(initState());

  // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  const renderFields = () =>
    FIELDS.map(({ label, name, type }) => (
      <Field
        key={name}
        type={type}
        name={name}
        label={label}
        component={SurveyField}
      />
    ));

  const handleSurveySubmit = (target: EventTarget) => {
    console.log(target);
    onSurveySubmit();
  };

  // const toTitleCase = (str: string) =>
  //   str.replace(/\w\S*/g, (txt) => txt.replace(/^\w/, (c) => c.toUpperCase()));
  return (
    <div style={{ margin: "3rem 0" }}>
      {/* component="input" specifies the type of tag we want to show
      can be replaced by a component, eg SurveyField */}
      <form onSubmit={({ target }) => handleSurveySubmit(target)}>
        {/* handleSubmit((values: any) => console.log(values)) */}
        {renderFields()}
        {/* TODO: determine if replace w renderField function */}
        {/* Generate 4 Field components in a loop */}
        {/* {Object.keys(formValues).map((key) => {
          return (
            <Field
              key={key}
              type="text"
              name={key}
              label={DefaultLabel[key]}
              component={SurveyField}
            />
          );
        })} */}

        {/* <Field
          type="text"
          name="title"
          label="LABEL!1"
          component={SurveyField}
        /> */}
        <Link to="/surveys">
          <button type="reset" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">close</i>
          </button>
          {/* Create a styled cancel button */}
        </Link>
        <button
          type="submit"
          disabled={invalid}
          className="teal btn-flat right white-text"
        >
          Next
          <i className="material-icons right">arrow_forward</i>
        </button>
      </form>
      {/* <form>
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
      </form> */}
    </div>
  );
};

const validate = (values: typeof DefaultState) => {
  const errors: StringIndexed = {};
  FIELDS.forEach(
    ({ name, label, type }: { name: string; label: string; type: string }) => {
      if (!values[name]) errors[name] = `${label} is required`;

      if (values[name] && type === "email") {
        errors[name] = validateEmails(values[name]) || "";
        // const emailRegex =
        //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const emails = values[name]?.split(",").map((email) => email.trim());
        // const invalidEmails = emails
        //   .filter((email) => !emailRegex.test(email))
        //   .join(", ");
        // if (invalidEmails.length) {
        //   errors[name] = `These emails are invalid: ${invalidEmails}`;
        // }
      }
    }
  );
  // if (!values.title) {
  //   errors.title = "Survey title is required";
  // }
  // if (!values.subject) {
  //   errors.subject = "Subject line is required";
  // }
  // if (!values.body) {
  //   errors.body = "Email body cannot be empty";
  // }
  // if (!values.recipients) {
  //   errors.recipients = "Recipient list cannot be empty";
  // }
  return errors;
};

export default reduxForm<StringIndexed, SurveyFormProps>({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
