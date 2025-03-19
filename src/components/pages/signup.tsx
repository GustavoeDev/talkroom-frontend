"use client";

import { AuthLayout } from "@/components/layouts/providers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpData, signUpSchema } from "@/lib/schemas/auth-schema";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { handleSignUp } from "@/lib/server/auth";
import { toast } from "sonner";

export default function SignUpComponent() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleFormSignUp(data: SignUpData) {
    const response = await handleSignUp(data);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });

      return;
    }

    useAuthStore.getState().setUser(response.data.user);
    toast.success("Usuário autenticado com sucesso!", {
      position: "bottom-right",
    });

    router.push("/");
  }

  return (
    <AuthLayout>
      <div className="max-w-[440px] w-full px-10 py-12 rounded-lg dark:bg-zinc-900 bg-white">
        <div className="flex flex-col gap-2 mb-10">
          <h2 className="text-2xl font-semibold">Cadastrar-se</h2>
          <h4 className="text-lg">Acesse o Talk Room:</h4>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleFormSignUp)}
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="nameUser">Nome</label>
            <input
              type="text"
              id="nameUser"
              className="border border-zinc-400 rounded-sm p-2 text-sm"
              placeholder="Digite seu nome"
              {...register("name")}
            />
          </div>

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
            Cadastrar
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
