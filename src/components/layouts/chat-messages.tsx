"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EllipsisVertical,
  File,
  FileMinus,
  Images,
  Mic,
  Plus,
  SendHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { useChatStore } from "@/stores/chat-store";
import { createChatMessages, getChatMessages } from "@/lib/requests";
import { toast } from "sonner";

export default function ChatMessages() {
  const { chat: currentChat } = useChatStore();

  const [user, setUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  async function handleGetChatMessages() {
    if (!currentChat) return;

    const response = await getChatMessages(currentChat.id);

    if (response) {
      console.log(response.data);
    }
  }

  useEffect(() => {
    handleGetChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      console.log("File exists", file);
      setSelectedFile(file);
      setFileExists(true);
    }
  }

  async function handleCreateNewMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentChat) return;

    const formData = new FormData();

    formData.append("from_user", JSON.stringify(user));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    if (messageInput) {
      formData.append("body", messageInput);
    }

    try {
      const response = await createChatMessages(currentChat?.id, formData);

      if (response.error) {
        toast.error(response.error.message, { position: "bottom-right" });
        return;
      }

      toast.success("Mensagem enviada com sucesso!", {
        position: "bottom-right",
      });
      setMessageInput("");
      setSelectedFile(null);
      setFileExists(false);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem", { position: "bottom-right" });
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <header className="flex items-center justify-between p-4 bg-zinc-900">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2>gustavo emanuel</h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Trash2 size={14} className="text-red-500" />
              Excluir conversa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div></div>

      <footer className="bg-zinc-800 px-3 py-4 flex items-center justify-between gap-4">
        <form
          onSubmit={handleCreateNewMessage}
          className="flex items-center gap-4 justify-between w-full"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer p-2 hover:bg-zinc-600 transition-colors duration-300 rounded-full">
                <Plus size={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  const fileInput = document.getElementById(
                    "fileMessage"
                  ) as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <div className="flex items-center gap-2 cursor-pointer w-full">
                  <Images size={14} />
                  Foto e vídeo
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  const fileInput = document.getElementById(
                    "fileMessage"
                  ) as HTMLInputElement;
                  fileInput?.click();
                }}
              >
                <div className="flex items-center gap-2 cursor-pointer w-full">
                  <File size={14} />
                  Documento
                </div>
                <input
                  type="file"
                  id="fileMessage"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="text"
            className="w-full bg-zinc-700 p-3 text-sm rounded-sm "
            placeholder="Digite uma mensagem"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />

          <div className="relative w-11 h-11">
            <button
              type="submit"
              className={`
              absolute top-0 left-0 w-full h-full 
              flex items-center justify-center
              cursor-pointer p-2 transition-all duration-300 
              ${
                messageInput.length > 0
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-180 scale-50"
              }
            `}
            >
              <SendHorizontal size={22} />
            </button>

            <button
              className={`
              absolute top-0 left-0 w-full h-full 
              flex items-center justify-center
              cursor-pointer p-2 transition-all duration-300 
              ${
                messageInput.length > 0
                  ? "opacity-0 rotate-180 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }
            `}
            >
              <Mic size={22} />
            </button>
          </div>
        </form>

        <Drawer open={fileExists} onOpenChange={setFileExists}>
          <DrawerContent>
            <form onSubmit={handleCreateNewMessage}>
              <DrawerHeader className="mt-2 flex flex-col items-center justify-center">
                <DrawerTitle>{selectedFile?.name}</DrawerTitle>
              </DrawerHeader>

              <div className="my-12 flex flex-col items-center justify-center">
                <FileMinus size={200} />
              </div>

              <DrawerFooter>
                <Button type="submit" className="cursor-pointer">
                  Enviar
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
      </footer>
    </div>
  );
}
