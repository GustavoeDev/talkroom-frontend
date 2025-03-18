/* Auth and User */

import { APISignIn, APISignUp } from "@/types/auth";
import { axiosAPI } from "./axios-api";
import { SignInData, SignUpData } from "./schemas/auth-schema";
import { APIUpdateUser } from "@/types/user";
import { APICreateChat, APIDeleteChat, APIGetChats } from "@/types/chat";
import { NewChatData } from "./schemas/chat-schema";
import {
  APICreateMessage,
  APIDeleteMessage,
  APIGetMessages,
} from "@/types/message";

export const signIn = async (data: SignInData) => {
  return await axiosAPI<APISignIn>({
    endpoint: "users/signin",
    method: "POST",
    withAuth: false,
    data,
  });
};

export const signUp = async (data: SignUpData) => {
  return await axiosAPI<APISignUp>({
    endpoint: "users/signup",
    method: "POST",
    withAuth: false,
    data,
  });
};

export const updateUser = async (data: FormData) => {
  return await axiosAPI<APIUpdateUser>({
    endpoint: "users/me",
    method: "PUT",
    data,
    withAttachment: true,
  });
};

/* Chats */

export const getChats = async () => {
  return await axiosAPI<APIGetChats>({
    endpoint: "/chats",
  });
};

export const createChat = async (data: NewChatData) => {
  return await axiosAPI<APICreateChat>({
    endpoint: "/chats",
    method: "POST",
    data,
  });
};

export const deleteChat = async (chat_id: number) => {
  return await axiosAPI<APIDeleteChat>({
    endpoint: `/chats/${chat_id}`,
    method: "DELETE",
  });
};

export const getChatMessages = async (chat_id: number) => {
  return await axiosAPI<APIGetMessages>({
    endpoint: `/chats/${chat_id}/messages`,
  });
};

export const createChatMessages = async (chat_id: number, data: FormData) => {
  return await axiosAPI<APICreateMessage>({
    endpoint: `/chats/${chat_id}/messages`,
    method: "POST",
    data,
    withAttachment: true,
  });
};

export const deleteChatMessages = async (
  chat_id: number,
  message_id: number
) => {
  return await axiosAPI<APIDeleteMessage>({
    endpoint: `/chats/${chat_id}/messages/${message_id}`,
    method: "DELETE",
  });
};
