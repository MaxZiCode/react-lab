import "./formInput.scss";

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  isPassword?: boolean;
  onChange?: (value: string) => void;
  validationProblem?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => (
  <>
    <div className="form-field">
      <label className="form-input-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={props.validationProblem ? "form-input-invalid" : "form-input"}
        type={props.isPassword ? "password" : "text"}
        name={props.name}
        id={props.id}
        onChange={(e) => {
          if (props.onChange) props.onChange(e.currentTarget.value);
        }}
      />
    </div>
    <div className="form-field-validation-problem">{props.validationProblem ? `*${props.validationProblem}` : ""}</div>
  </>
);

export default FormInput;
