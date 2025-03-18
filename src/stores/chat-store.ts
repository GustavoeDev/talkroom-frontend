import { Chat } from "@/types/chat";
import { Message } from "@/types/message";

import { create } from "zustand";

export interface ChatState {
  showNewChat: boolean;
  chats: Chat[] | null;
  chat: Chat | null;
  chatMessages: Message[] | null;
  loading: boolean;
  showChatsList: boolean;
}

export interface ChatActions {
  setShowNewChat: (show: boolean) => void;
  setChats: (chats: Chat[] | null) => void;
  setChat: (chat: Chat | null) => void;
  setChatMessages: (messages: Message[] | null) => void;
  setLoading: (loading: boolean) => void;
  setShowChatsList: (show: boolean) => void;
}

export type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
  showNewChat: false,
  chats: null,
  chat: null,
  chatMessages: null,
  loading: false,
  showChatsList: false,

  setShowNewChat: (show: boolean) => set({ showNewChat: show }),
  setShowChatsList: (show: boolean) => set({ showChatsList: show }),
  setChat: (chat: Chat | null) =>
    chat?.id != get().chat?.id && set({ chat, chatMessages: null }),
  setChats: (chats: Chat[] | null) => set({ chats }),
  setChatMessages: (messages: Message[] | null) =>
    set({ chatMessages: messages }),
  setLoading: (loading: boolean) => set({ loading }),
}));
