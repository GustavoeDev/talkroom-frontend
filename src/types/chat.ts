import { Message } from "./message";

import { User } from "./user";

export interface Chat {
  id: number;
  last_message: Message | null;
  message_not_viewed: number;
  user: User;
  viewed_at: string | null;
  created_at: string;
}

export interface APIGetChats {
  chats: Chat[];
}

export interface APICreateChat {
  chat: Chat;
}

export interface APIDeleteChat {
  success: boolean;
}

export interface UpdateChatEvent {
  type?: "delete";
  query: {
    chat_id?: number;
    users: number[];
  };
}
