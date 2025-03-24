"use client";

import { useForm } from "react-hook-form";
import { AuthLayout } from "../layouts/providers";
import { SignInData, signInSchema } from "@/lib/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignIn } from "@/lib/server/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInComponent() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleFormSignIn(data: SignInData) {
    const response = await handleSignIn(data);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });

      return;
    }

    localStorage.setItem("user", JSON.stringify(response.data.user));

    toast.success("Usuário autenticado com sucesso!", {
      position: "bottom-right",
    });

    router.push("/");
  }

  return (
    <AuthLayout>
      <div className="max-w-[440px] w-full px-10 py-12 rounded-lg dark:bg-zinc-900 bg-white">
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="text-2xl font-semibold">Login</h2>
          <h4 className="text-lg">Acesse o Talk Room:</h4>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSignIn)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="emailUser">E-mail</label>
            <input
              type="text"
              id="emailUser"
              className="border border-zinc-400 rounded-sm p-2 text-sm"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="passwordUser">Senha</label>
            <input
              type="password"
              id="passwordUser"
              className="border border-zinc-400 rounded-sm p-2 text-sm"
              placeholder="Senha"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            className="mt-8 bg-emerald-600 hover:bg-emerald-700 cursor-pointer py-3 rounded-sm font-medium text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
