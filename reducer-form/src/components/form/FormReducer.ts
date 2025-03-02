import { formSchema, FormValues, initialFormValues } from "./FormSchema";
import { set } from "lodash";

export interface FormState {
  values: FormValues;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export const initialFormState: FormState = {
  values: initialFormValues,
  errors: {},
  touched: {},
  isSubmitting: false,
  isValid: false,
};

export type FormAction =
  | { type: "SET_VALUE"; path: string; value: unknown }
  | { type: "VALIDATE_FIELD"; path: string }
  | { type: "VALIDATE_ALL" }
  | { type: "SET_TOUCHED"; path: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "RESET_FORM" };

// Reducer 関数
export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_VALUE": {
      const newValues = { ...state.values };
      set(newValues, action.path, action.value);

      return {
        ...state,
        values: newValues,
      };
    }
    case "VALIDATE_FIELD": {
      const result = formSchema.safeParse(state.values);
      let fieldError = "";

      if (!result.success) {
        const foundError = result.error.issues.find((issue) => {
          const errorPath = issue.path.join(".");
          return errorPath === action.path;
        });

        fieldError = foundError?.message || "";
      }

      const newErrors = {
        ...state.errors,
        [action.path]: fieldError,
      };

      const isValid = Object.values(newErrors).every((error) => !error);

      return {
        ...state,
        errors: newErrors,
        isValid,
      };
    }
    case "VALIDATE_ALL": {
      const result = formSchema.safeParse(state.values);
      const newErrors: Record<string, string> = {};

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          newErrors[path] = issue.message;
        });
      }

      return {
        ...state,
        errors: newErrors,
        isValid: result.success,
      };
    }
    case "SET_TOUCHED": {
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.path]: true,
        },
      };
    }
    case "SUBMIT_START": {
      return {
        ...state,
        isSubmitting: true,
      };
    }
    case "SUBMIT_END": {
      return {
        ...state,
        isSubmitting: false,
      };
    }
    case "RESET_FORM": {
      return initialFormState;
    }
    default:
      return state;
  }
}
