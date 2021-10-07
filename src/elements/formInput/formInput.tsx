import "./formInput.scss";

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  onChange?: (value: string) => void;
  validationProblem?: string;
  style?: "row" | "column";
}

const FormInput: React.FC<FormInputProps> = ({ style = "row", ...props }) => (
  <>
    <div className={`form-field-${style}`}>
      <label className="form-input-label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className={`form-input-${style} ${props.validationProblem !== undefined && "form-input-invalid"}`}
        type={props.type}
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
