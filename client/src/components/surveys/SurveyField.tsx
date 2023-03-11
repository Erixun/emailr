//create a survey field component with typescript typed parameters

//Alternative way to destructure props
// const SurveyField = (props: any) => {
//   console.log(props);
//   const {
//     input,
//     label,
//     type,
//     meta: { error, touched },
//   } = props;
const SurveyField = ({
  input,
  label,
  type,
  meta: { error, touched },
}: FieldProps) => {
  console.log(input);
  console.log(label);
  console.log(error);

  return (
    <div>
      <label>{label}</label>
      {/* {...input} hydrates the input tag with event handlers, eg onBlur, onChange etc */}
      <input {...input} type={type} style={{ marginBottom: "5px" }} />
      <div className="red-text text-darken-4" style={{ marginBottom: "20px" }}>
        {/* if touched, show error (or "") */}
        {touched && error}
      </div>
    </div>
  );
};

type FieldProps = {
  input: any;
  label: string;
  type: string;
  meta: { error: string; touched: boolean };
};

export default SurveyField;
