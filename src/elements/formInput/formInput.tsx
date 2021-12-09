import "./formInput.scss";

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  onChange: (value: string) => void;
  validationProblem?: string;
  value: string;
}

const FormInput: React.VFC<FormInputProps> = ({ ...props }) => (
  <>
    <label className="form-field" htmlFor={props.id}>
      {props.label}
      <input
        className={`form-input ${props.validationProblem && "form-input-invalid"}`}
        type={props.type}
        name={props.name}
        id={props.id}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        value={props.value}
      />
    </label>
    <div className="form-field-validation-problem">{props.validationProblem && `*${props.validationProblem}`}</div>
  </>
);

export default FormInput;
