import React, { memo, useCallback } from "react";
import { useForm } from "../FormContext";
import { ErrorMessage } from "../../common/ErrorMessage";

interface TextFieldProps {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export const TextField = memo(function TextField({
  name,
  label,
  required = false,
  maxLength,
  placeholder,
}: TextFieldProps) {
  const { handleSetValue, handleBlur, getValue, getError } = useForm();

  const value = String(getValue(name) || "");
  const error = getError(name);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSetValue(name, e.target.value);
    },
    [handleSetValue, name]
  );

  const onBlur = useCallback(() => {
    handleBlur(name);
  }, [handleBlur, name]);

  const showError = error;

  return (
    <div className="form-field">
      <label htmlFor={name.replace(/\./g, "-")}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        id={name.replace(/\./g, "-")}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={showError ? "true" : "false"}
        className={showError ? "input-error" : ""}
      />
      {showError && <ErrorMessage message={error || ""} />}
    </div>
  );
});
