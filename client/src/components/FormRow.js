const FormRow = ({ type, name, value, handleChange, labelText, id }) => {
  return (
    <div className="form-row">
      <label htmlFor={id || name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={id || name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
