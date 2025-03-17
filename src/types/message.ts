import { Attachment } from "./attachment";

import { User } from "./user";

export interface Message {
  id: number;
  body: string | null;
  attachment: Attachment | null;
  from_user: User;
  viewed_at: string | null;
  created_at: string;
}

export interface APIGetMessages {
  messages: Message[];
}

export interface APICreateMessage {
  message: Message;
}

export interface APIDeleteMessage {
  success: boolean;
}

export interface UpdateMessageEvent {
  type: "create" | "delete";
  message?: Message;
  query: {
    chat_id: number;
    message_id?: number;
  };
}

export interface MarkMessageAsViewedEvent {
  query: {
    chat_id: number;
    exclude_user_id: number;
  };
}
