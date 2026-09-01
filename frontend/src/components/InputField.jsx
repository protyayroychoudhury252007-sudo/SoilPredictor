function InputField({
  label,
  name,
  value,
  type = "number",
  description,
  onChange,
  min,
  max,
  step
}) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />

      {description && <small>{description}</small>}
    </div>
  );
}

export default InputField;