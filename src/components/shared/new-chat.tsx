"use client";

import { MessageSquareDiff } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewChatData, newChatSchema } from "@/lib/schemas/chat-schema";
import { createChat } from "@/lib/requests";
import { toast } from "sonner";
import { useChatStore } from "@/stores/chat-store";
import { ToolTipHoverComponent } from "../layouts/providers";

export default function NewChat() {
  const { setShowNewChat, showNewChat, setChat } = useChatStore();

  const { register, handleSubmit, reset } = useForm<NewChatData>({
    resolver: zodResolver(newChatSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleCreateChat(data: NewChatData) {
    const response = await createChat(data);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });

      return;
    }

    setChat(response.data.chat);
    toast.success("Conversa criada com sucesso!", {
      position: "bottom-right",
    });
    reset();
    setShowNewChat(false);
  }

  return (
    <>
      <Drawer open={showNewChat} onOpenChange={setShowNewChat}>
        <DrawerTrigger asChild>
          <ToolTipHoverComponent text="Nova conversa">
            <MessageSquareDiff className="dark:text-zinc-400 dark:hover:text-zinc-100 hover:text-zinc-600 cursor-pointer" />
          </ToolTipHoverComponent>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>Nova conversa</DrawerTitle>
            <DrawerDescription>
              Insira o e-mail do usuário para iniciar uma conversa.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(handleCreateChat)}>
            <div className="flex flex-col gap-3 p-4 mt-2 mb-3">
              <label htmlFor="emailUser">E-mail</label>
              <input
                type="text"
                id="emailUser"
                className="border py-2 px-2 rounded-md text-sm w-full border-zinc-400"
                placeholder="Digite o e-mail"
                {...register("email")}
              />
            </div>
            <DrawerFooter>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 border-0 cursor-pointer text-white font-medium transition-colors duration-300"
                type="submit"
              >
                Iniciar conversa
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
