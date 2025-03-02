import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import {
  FormState,
  FormAction,
  formReducer,
  initialFormState,
} from "./FormReducer";
import { FormValues } from "./FormSchema";
import { get } from "lodash";

// コンテキストの型定義
interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  handleSetValue: (path: string, value: unknown) => void;
  handleValidate: (path: string) => void;
  handleSetValueAndValidate: (path: string, value: unknown) => void;
  handleBlur: (path: string) => void;
  handleSubmit: (
    e: React.FormEvent,
    onSubmit: (values: FormValues) => Promise<void>
  ) => void;
  resetForm: () => void;
  getValue: (path: string) => unknown;
  getError: (path: string) => string | undefined;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const handleSetValue = useCallback((path: string, value: unknown) => {
    dispatch({ type: "SET_VALUE", path, value });
  }, []);

  const handleValidate = useCallback((path: string) => {
    dispatch({ type: "VALIDATE_FIELD", path });
  }, []);

  const handleSetValueAndValidate = useCallback(
    (path: string, value: unknown) => {
      dispatch({ type: "SET_VALUE", path, value });
      dispatch({ type: "VALIDATE_FIELD", path });
    },
    []
  );

  const handleBlur = useCallback((path: string) => {
    dispatch({ type: "SET_TOUCHED", path });
    dispatch({ type: "VALIDATE_FIELD", path });
  }, []);

  const getValue = useCallback(
    (path: string): unknown => {
      return get(state.values, path);
    },
    [state.values]
  );

  const getError = useCallback(
    (path: string) => {
      return state.errors[path];
    },
    [state.errors]
  );

  const handleSubmit = useCallback(
    async (
      e: React.FormEvent,
      onSubmit: (values: FormValues) => Promise<void>
    ) => {
      e.preventDefault();
      dispatch({ type: "VALIDATE_ALL" });

      // 全体のバリデーション
      const isValid = Object.values(state.errors).every((error) => !error);

      if (isValid) {
        dispatch({ type: "SUBMIT_START" });
        try {
          await onSubmit(state.values);
        } finally {
          dispatch({ type: "SUBMIT_END" });
        }
      }
    },
    [state.values, state.errors]
  );

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      handleSetValue,
      handleValidate,
      handleSetValueAndValidate,
      handleBlur,
      handleSubmit,
      resetForm,
      getValue,
      getError,
    }),
    [
      getError,
      getValue,
      handleBlur,
      handleSetValue,
      handleSetValueAndValidate,
      handleSubmit,
      handleValidate,
      resetForm,
      state,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// TODO 更新用と参照で分割
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
};
