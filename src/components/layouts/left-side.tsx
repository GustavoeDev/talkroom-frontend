"use client";

import ProfileSettings from "@/components/shared/profile-settings";
import NewChat from "@/components/shared/new-chat";
import { Lock, Search } from "lucide-react";

import {
  ModeToggle,
  socket,
  ToolTipHoverComponent,
} from "@/components/layouts/providers";
import { useChatStore } from "@/stores/chat-store";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Chat, UpdateChatEvent } from "@/types/chat";
import { getChats } from "@/lib/requests";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ChatComponent from "../shared/chat";

export default function LeftSide() {
  const { chat: currentChat, chats, setChats, setChat } = useChatStore();

  const [user, setUser] = useState<User | null>(null);
  const [queryInput, setQueryInput] = useState("");
  const [chatsFiltered, setChatsFiltered] = useState<Chat[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    setUser(user);
  }, []);

  async function handleGetChats() {
    const response = await getChats();

    if (response.data) {
      setChats(response.data.chats);
    }
  }

  function handleFilterChats() {
    if (!chats) return;

    setChatsFiltered(
      chats.filter((chat) =>
        chat.user.name.toLowerCase().includes(queryInput.toLowerCase())
      )
    );
  }

  useEffect(() => {
    handleGetChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!queryInput && chats) {
      setChatsFiltered(chats);
      return;
    }
  }, [queryInput, chats]);

  useEffect(() => {
    const handleUpdateChat = (data: UpdateChatEvent) => {
      if (user && data.query.users.includes(user.id)) {
        handleGetChats();
      }

      if (data.type === "delete" && data.query.chat_id === currentChat?.id) {
        setChat(null);
        toast.info("A conversa foi deletada", { position: "bottom-right" });
      }
    };

    socket.on("update_chats", handleUpdateChat);

    return () => {
      socket.off("update_chats", handleUpdateChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  return (
    <aside className="max-w-[25%] w-full dark:bg-zinc-900 bg-white border-r dark:border-zinc-800 border-zinc-300 flex flex-col">
      <div className="p-4 flex flex-col gap-8">
        <div className="flex items-center justify-between mt-2">
          <ToolTipHoverComponent text="Conversas">
            Conversas
          </ToolTipHoverComponent>
          <div className="flex items-center gap-4">
            <NewChat variant="default" />
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full py-2 px-4 dark:bg-zinc-950 bg-zinc-200 flex items-center gap-3 rounded-md text-sm">
            <label htmlFor="searchInput" className="cursor-pointer">
              <Search size={18} />
            </label>
            <input
              type="text"
              id="searchInput"
              placeholder="Pesquisar"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
          </div>

          <Button
            onClick={handleFilterChats}
            className="cursor-pointer dark:bg-zinc-950 dark:text-white text-black bg-zinc-200 hover:dark:bg-zinc-800 hover:bg-zinc-300 transition-colors duration-300"
          >
            <Search />
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto h-full">
        {chatsFiltered.length > 0 ? (
          chatsFiltered.map((chat) => (
            <ChatComponent
              key={chat.id}
              user={chat.user}
              userLogged={user}
              chat={chat}
              onClick={() => {
                setChat(chat);
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-center">Nenhuma conversa encontrada</p>
          </div>
        )}
        <div className="border-t dark:border-zinc-800 border-zinc-300 mx-4 py-4 flex items-center justify-center gap-2">
          <Lock size={14} />
          <p className="text-sm">Suas mensagens estão protegidas</p>
        </div>
      </div>

      <div className="mt-auto p-4 flex items-center justify-between">
        <p className="text-sm">Configurações de conta</p>
        <div className="flex items-center gap-4">
          <ProfileSettings />
        </div>
      </div>
    </aside>
  );
}
