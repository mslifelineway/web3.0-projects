import React from "react";
import "./styles.css";

const Input = ({
  type = "text",
  name,
  value,
  handleChange,
  error,
  placeholder,
  className,
}) => {
  return (
    <div className={`input__box ${className || ""}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input linear_gradient_primary"
        autoComplete="off"
      />
      {error && error !== "" && <small className="error">{error}</small>}
    </div>
  );
};

export default Input;
