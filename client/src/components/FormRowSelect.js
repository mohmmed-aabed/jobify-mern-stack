const FormRowSelect = ({
  options,
  name,
  value,
  handleChange,
  labelText,
  id,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={id || name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={id || name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
