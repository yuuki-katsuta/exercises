import { z } from "zod";

export const formSchema = z.object({
  personal: z.object({
    firstName: z.string().min(1, "名前を入力してください"),
    lastName: z.string().min(1, "姓を入力してください"),
  }),
  contact: z.object({
    email: z.string().email("メールアドレスの形式が正しくありません"),
    phone: z.string().optional(),
  }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: "18歳以上である必要があります",
  }),
  preferences: z.object({
    notifications: z.object({
      email: z.boolean().default(false),
      sms: z.boolean().default(false),
    }),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export const initialFormValues: FormValues = {
  personal: {
    firstName: "",
    lastName: "",
  },
  contact: {
    email: "",
    phone: "",
  },
  age: "",
  preferences: {
    notifications: {
      email: false,
      sms: false,
    },
  },
};
