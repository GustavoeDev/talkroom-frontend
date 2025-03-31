"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCheck,
  ChevronDown,
  EllipsisVertical,
  File,
  FileMinus,
  Images,
  Mic,
  Plus,
  SendHorizontal,
  Trash,
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
import {
  createChatMessages,
  deleteChat,
  deleteChatMessages,
  getChatMessages,
} from "@/lib/requests";
import { toast } from "sonner";
import dayjs from "dayjs";
import { socket } from "./providers";
import { MarkMessageAsViewedEvent, UpdateMessageEvent } from "@/types/message";

export default function ChatMessages() {
  const {
    chat: currentChat,
    setChat,
    setChatMessages,
    chatMessages,
  } = useChatStore();

  const [user, setUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [fileExists, setFileExists] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeFile, setTypeFile] = useState<"image" | "application" | "">("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  async function handleGetChatMessages() {
    if (!currentChat) return;

    const response = await getChatMessages(currentChat.id);

    if (response.data) {
      setChatMessages(response.data.messages);
    }
  }

  useEffect(() => {
    handleGetChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleUpdateChatMessage = (data: UpdateMessageEvent) => {
      if (data.type === "create" && currentChat?.id === data.query.chat_id) {
        handleGetChatMessages();
      }

      if (data.type === "delete" && currentChat?.id === data.query.chat_id) {
        handleGetChatMessages();
      }
    };

    socket.on("update_chat_message", handleUpdateChatMessage);

    return () => {
      socket.off("update_chat_message", handleUpdateChatMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, chatMessages]);

  useEffect(() => {
    const handleMarkAsViewedChat = (data: MarkMessageAsViewedEvent) => {
      if (data.query.chat_id === currentChat?.id) {
        handleGetChatMessages();
      }
    };

    socket.on("mark_message_as_viewed", handleMarkAsViewedChat);

    return () => {
      socket.off("mark_message_as_viewed", handleMarkAsViewedChat);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const type = file.type.split("/")[0];

      if (type === typeFile) {
        setFileExists(true);
      } else {
        toast.error(
          typeFile === "image"
            ? "Aceitamos apenas imagens"
            : "Aceitamos apenas documentos",
          { position: "bottom-right" }
        );
      }
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

      setMessageInput("");
      setSelectedFile(null);
      setFileExists(false);
    } catch {
      toast.error("Erro ao enviar mensagem", { position: "bottom-right" });
    }
  }

  async function handleDeleteMessage(
    e: React.FormEvent<HTMLFormElement>,
    messageId: number
  ) {
    e.preventDefault();

    if (!currentChat) return;

    const response = await deleteChatMessages(currentChat.id, messageId);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });
      return;
    }
  }

  async function handleDeleteChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!currentChat) return;

    const response = await deleteChat(currentChat.id);

    if (response.error) {
      toast.error(response.error.message, { position: "bottom-right" });
      return;
    }

    setChat(null);
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <header className="flex items-center justify-between p-4 bg-zinc-900">
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage
              src={currentChat?.user.avatar}
              alt={currentChat?.user.name}
            />
            <AvatarFallback>
              {currentChat?.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h2>{currentChat?.user.name}</h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <form onSubmit={(e) => handleDeleteChat(e)}>
              <DropdownMenuItem
                asChild
                className="flex items-center gap-2 cursor-pointer"
              >
                <button type="submit" className="w-full">
                  <Trash2 size={14} className="text-red-500" />
                  Excluir conversa
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-col h-full gap-4 p-4 overflow-y-auto">
        {chatMessages?.map((message) => {
          return message.from_user.id === currentChat?.user.id ? (
            <div
              key={message.id}
              className="flex items-center justify-end gap-4 text-sm px-2 py-2 bg-zinc-700 rounded-sm mr-auto"
            >
              {message.body && (
                <div className="flex items-end gap-3">
                  <span>{message.body}</span>
                  <span className="text-[10px] text-zinc-200">
                    {dayjs(message.created_at).format("HH:mm")}
                  </span>
                </div>
              )}
              {message.attachment?.file && (
                <div className="flex items-end gap-3">
                  <a target="_blank" href={message.attachment.file?.src}>
                    {message.attachment.file.name}.
                    {message.attachment.file.extension}
                  </a>
                  <span className="text-[10px] text-zinc-200">
                    {dayjs(message.created_at).format("HH:mm")}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div
              key={message.id}
              className="flex items-center justify-end gap-4 text-sm px-2 py-2 bg-emerald-600 rounded-sm ml-auto"
            >
              {message.body && (
                <div className="flex flex-col relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-0 bg-emerald-600 rounded-full cursor-pointer right-0 text-xs text-zinc-200 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <ChevronDown size={22} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <form
                        onSubmit={(e) => handleDeleteMessage(e, message.id)}
                      >
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <button className="w-full" type="submit">
                            <Trash size={14} className="text-red-500" />
                            Excluir
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex items-end gap-3">
                    <span>{message.body}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-200">
                        {dayjs(message.created_at).format("HH:mm")}
                      </span>
                      <CheckCheck
                        size={14}
                        className={
                          message.viewed_at
                            ? "text-emerald-900"
                            : "text-zinc-300"
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {message.attachment?.file && (
                <div className="flex flex-col relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="absolute top-0 bg-emerald-600 rounded-full cursor-pointer right-0 text-xs text-zinc-200 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <ChevronDown size={22} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <form
                        onSubmit={(e) => handleDeleteMessage(e, message.id)}
                      >
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <button className="w-full" type="submit">
                            <Trash size={14} className="text-red-500" />
                            Excluir
                          </button>
                        </DropdownMenuItem>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex items-end gap-3">
                    <a
                      target="_blank"
                      href={message.attachment.file?.src}
                      className="flex gap-2 items-center"
                    >
                      <File size={16} />
                      {message.attachment.file.name}.
                      {message.attachment.file.extension}
                    </a>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-200">
                        {dayjs(message.created_at).format("HH:mm")}
                      </span>
                      <CheckCheck
                        size={14}
                        className={
                          message.viewed_at
                            ? "text-emerald-900"
                            : "text-zinc-300"
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
              <DropdownMenuItem>
                <label
                  htmlFor="fileMessage"
                  className="flex items-center gap-2 cursor-pointer w-full"
                  onClick={() => setTypeFile("image")}
                >
                  <Images size={14} />
                  Foto e vídeo
                </label>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <label
                  htmlFor="fileMessage"
                  className="flex items-center gap-2 cursor-pointer w-full"
                  onClick={() => setTypeFile("application")}
                >
                  <File size={14} />
                  Documento
                </label>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <input
            type="file"
            id="fileMessage"
            className="hidden"
            onChange={handleFileChange}
          />

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
