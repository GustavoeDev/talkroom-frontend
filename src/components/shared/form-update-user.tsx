"use client";

import { UpdateUserData, updateUserSchema } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUser } from "@/lib/requests";
import { User } from "@/types/user";

interface FormUpdateUserProps {
  user: User | null;
  handleUpdateAvatarUser: (user: User) => void;
}

export default function FormUpdateUser({
  user,
  handleUpdateAvatarUser,
}: FormUpdateUserProps) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const { register, handleSubmit, reset } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: "",
      confirm_password: "",
    },
  });

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const allowedExtensions = ["jpg", "jpeg", "png"];

      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (
        allowedTypes.includes(file.type) &&
        fileExtension &&
        allowedExtensions.includes(fileExtension)
      ) {
        setAvatar(file);
        setAvatarUrl(URL.createObjectURL(file));
      } else {
        toast.error("Formato de arquivo não suportado. Use JPEG ou PNG.", {
          position: "bottom-right",
        });
      }
    }
  }

  async function handleUpdateUserForm(data: UpdateUserData) {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);

    if (data.password) {
      formData.append("password", data.password);
    }

    if (avatar) {
      formData.append("avatar", avatar, avatar.name);
    }

    const response = await updateUser(formData);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });
      return;
    }

    const user = response.data.user;

    localStorage.setItem("user", JSON.stringify(user));
    handleUpdateAvatarUser(user);
    setAvatar(null);

    reset({
      name: user.name,
      email: user.email,
      password: "",
      confirm_password: "",
    });

    toast.success("Usuário atualizado com sucesso!", {
      position: "bottom-right",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleUpdateUserForm)}
      className="my-3 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={avatarUrl ? avatarUrl : user?.avatar}
            alt={user?.name}
          />
          <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <input
          className="border py-1 px-4 rounded-md text-sm w-full border-zinc-400"
          type="file"
          id="avatar"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="nameUser">Nome</label>
        <input
          type="text"
          id="nameUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Nome"
          {...register("name")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="emailUser">E-mail</label>
        <input
          type="text"
          id="emailUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="E-mail"
          {...register("email")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="passwordUser">Senha</label>
        <input
          type="text"
          id="passwordUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Senha"
          {...register("password")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPasswordUser">Confirmar senha</label>
        <input
          type="text"
          id="confirmPasswordUser"
          className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
          placeholder="Confirmar senha"
          {...register("confirm_password")}
        />
      </div>

      <button
        type="submit"
        className="bg-emerald-700 py-3 font-medium text-white rounded-md border-0 hover:bg-emerald-800 transition-colors cursor-pointer mt-3"
      >
        Confirmar alterações
      </button>
    </form>
  );
}
