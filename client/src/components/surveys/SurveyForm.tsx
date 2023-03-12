import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import validateEmails from "../../utils/validateEmails";
import SurveyField from "./SurveyField";
import FormFields from "./FormFields";

// Github copilot keyboard shortcuts for a swedish keyboard

// Accept inline code suggestion — Tab
// Dismiss inline code suggestion — Esc
// Show next suggestion — Alt + å or Alt + ] or Option (⌥) + ]
// Show previous suggestion — Alt + ´ or Alt + [ or Option (⌥) + [
// Trigger suggestion — Alt + § or Alt + \ or Option (⌥) + \
// Open ten suggestions in a separate pane — Ctrl + Enter

type StringIndexed = { [key: string]: string };

export interface FormState extends StringIndexed {
  title: string;
  subject: string;
  body: string;
  recipients: string;
}

interface SurveyFormProps {
  onSurveySubmit: () => void;
  invalid?: boolean;
}
const SurveyForm = ({ onSurveySubmit, invalid }: SurveyFormProps) => {
  const renderFields = () =>
    FormFields.map(({ label, name, type }) => (
      <Field
        key={name}
        type={type}
        name={name}
        label={label}
        component={SurveyField}
      />
    ));

  const handleSurveySubmit = () => {
    onSurveySubmit();
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <form onSubmit={() => handleSurveySubmit()}>
        {renderFields()}

        <Link to="/surveys">
          <button type="reset" className="red btn-flat white-text">
            Cancel
            <i className="material-icons right">close</i>
          </button>
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
    </div>
  );
};

const validate = (values: FormState) => {
  const errors: StringIndexed = {};
  FormFields.forEach(
    ({ name, label, type }: { name: string; label: string; type: string }) => {
      if (!values[name]) errors[name] = `${label} is required`;

      if (values[name] && type === "email") {
        errors[name] = validateEmails(values[name]) || "";
      }
    }
  );
  return errors;
};

export default reduxForm<StringIndexed, SurveyFormProps>({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
