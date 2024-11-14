// InputItem.jsx
import React from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import "./form.scss";

export const InputItem = ({
  id,
  name,
  type,
  placeholder,
  label,
  value,
  error,
  helperText,
  isRequired = false,
  options = [],
  selectType = "standard",
  isMulti = false,
  showEm = true,
  onChange,
}) => {
  if (type === "select" && selectType === "select2") {
    // Convert value to format expected by react-select
    let selectedValue = null;
    if (isMulti) {
      selectedValue = Array.isArray(value)
        ? options.filter((option) => value.includes(option.value))
        : [];
    } else {
      selectedValue = options.find((option) => option.value === value) || null;
    }

    return (
      <Form.Group className="custom-form-input">
        <Form.Label htmlFor={id}>
          {label} {isRequired && showEm ? <em>*</em> : ""}
        </Form.Label>
        <Select
          id={id}
          name={name}
          options={options}
          value={selectedValue}
          onChange={(selected) => {
            if (isMulti) {
              onChange(selected ? selected.map((item) => item.value) : []);
            } else {
              onChange(selected ? selected.value : "");
            }
          }}
          isMulti={isMulti}
          isClearable
          placeholder={placeholder}
          aria-describedby={`${id}HelpBlock`}
          // Ensure each option has a unique key
          getOptionValue={(option) => `${option.value}`}
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
        {helperText && (
          <Form.Text id={`${id}HelpBlock`} muted>
            {helperText}
          </Form.Text>
        )}
      </Form.Group>
    );
  }

  return (
    <Form.Group className="custom-form-input">
      <Form.Label htmlFor={id}>
        {label} {isRequired && showEm ? <em>*</em> : ""}
      </Form.Label>
      <Form.Control
        as={type === "textarea" ? "textarea" : "input"}
        type={type !== "textarea" ? type : undefined}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        isInvalid={!!error}
        required={isRequired}
        aria-describedby={`${id}HelpBlock`}
      />
      {helperText && (
        <Form.Text id={`${id}HelpBlock`} muted>
          {helperText}
        </Form.Text>
      )}
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
