import { useCallback } from "react";

import "./App.css";
import { FormProvider, useForm } from "./components/form/FormContext";

import { TextField } from "./components/form/fields/TextField";
import { CheckboxField } from "./components/form/fields/CheckboxField";
import { FormValues } from "./components/form/FormSchema";

const FormContent = () => {
  const { state, handleSubmit } = useForm();

  const onSubmit = useCallback(async (values: FormValues) => {
    console.log("送信データ:", values);
    // API呼び出し
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("送信完了しました！");
  }, []);

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
      <h1>ユーザー登録フォーム</h1>

      <fieldset>
        <legend>個人情報</legend>

        <TextField
          name="personal.firstName"
          label="名前"
          required
          maxLength={20}
          placeholder="例：太郎"
        />

        <TextField
          name="personal.lastName"
          label="姓"
          required
          maxLength={20}
          placeholder="例：山田"
        />
      </fieldset>

      <fieldset>
        <legend>連絡先情報</legend>

        <TextField
          name="contact.email"
          label="メールアドレス"
          required
          placeholder="例：example@example.com"
        />

        <TextField
          name="contact.phone"
          label="電話番号"
          placeholder="例：090-1234-5678"
        />
      </fieldset>

      <TextField name="age" label="年齢" required placeholder="例：25" />

      <fieldset>
        <legend>通知設定</legend>

        <CheckboxField
          name="preferences.notifications.email"
          label="メールで通知を受け取る"
        />

        <CheckboxField
          name="preferences.notifications.sms"
          label="SMSで通知を受け取る"
        />
      </fieldset>

      <div className="form-actions">
        <button type="submit" disabled={state.isSubmitting}>
          {state.isSubmitting ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
};

function App() {
  return (
    <div className="form-page">
      <FormProvider>
        <FormContent />
      </FormProvider>
    </div>
  );
}

export default App;
