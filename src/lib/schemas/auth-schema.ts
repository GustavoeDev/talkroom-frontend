"use client";

import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type SignInData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Nome obrigatório")
    .max(255, "Nome excede o limite de 255 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(255, "Email excede o limite de 255 caracteres"),
  password: z
    .string()
    .min(1, "Senha obrigatória")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[^a-zA-Z0-9\s]).+$/,
      "A senha deve conter pelo menos um número, uma letra e um caractere especial"
    )
    .max(80, "Senha muito grande"),
});

export type SignUpData = z.infer<typeof signUpSchema>;
