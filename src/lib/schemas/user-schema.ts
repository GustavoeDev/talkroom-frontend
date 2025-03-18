import { z } from "zod";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(255, "Nome excede o limite de 255 caracteres"),
    email: z
      .string()
      .email("Email inválido")
      .max(255, "Email excede o limite de 255 caracteres"),
    password: z
      .string()
      .max(80, "Senha muito grande")
      .refine(
        (value) =>
          !value ||
          /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^a-zA-Z0-9\s]).+$/.test(value),
        {
          message:
            "A senha deve conter pelo menos um número, uma letra e um caractere especial",
        }
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não correspondem",
    path: ["confirm_password"],
  });

export type UpdateUserData = z.infer<typeof updateUserSchema>;
