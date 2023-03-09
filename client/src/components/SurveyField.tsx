//create a survey field component with typescript typed parameters

const SurveyField = ({
  input,
  label,
  meta: { error, touched },
}: FieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

type FieldProps = {
  input: any;
  label: string;
  meta: { error: string; touched: boolean };
};

export default SurveyField;
