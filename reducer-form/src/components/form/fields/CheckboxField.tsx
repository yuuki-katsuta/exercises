import React, { memo, useCallback } from "react";
import { useForm } from "../FormContext";

interface CheckboxFieldProps {
  name: string;
  label: string;
}

export const CheckboxField = memo(function CheckboxField({
  name,
  label,
}: CheckboxFieldProps) {
  const { handleSetValue, getValue } = useForm();

  const checked = Boolean(getValue(name));

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSetValue(name, e.target.checked);
    },
    [handleSetValue, name]
  );

  return (
    <div className="checkbox-field">
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
});
