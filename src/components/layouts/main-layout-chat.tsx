"use client";

import { useChatStore } from "@/stores/chat-store";
import BannerDefault from "../shared/banner-default";
import ChatMessages from "./chat-messages";

export default function MainLayoutChat() {
  const { chat: currentChat } = useChatStore();

  return <>{currentChat ? <ChatMessages /> : <BannerDefault />}</>;
}
