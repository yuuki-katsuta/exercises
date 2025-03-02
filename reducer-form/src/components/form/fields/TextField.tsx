import { ComponentProps } from "react";

import { ErrorMessage } from "../../common/ErrorMessage";

type Props = {
  label: string;
  value: string | undefined;
  error?: string;
} & Omit<ComponentProps<"input">, "value">;

export const TextField = ({ label, value, error, ...props }: Props) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input value={value} {...props} />
      {error && <ErrorMessage message={error || ""} />}
    </div>
  );
};
