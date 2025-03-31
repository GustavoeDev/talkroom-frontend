import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat } from "@/types/chat";
import { User } from "@/types/user";
import dayjs from "dayjs";
import { CheckCheck, FileText, Images, Mic } from "lucide-react";
import { Badge } from "../ui/badge";

interface ChatProps {
  user: User;
  userLogged: User | null;
  chat: Chat;
  onClick?: () => void;
}

export default function ChatComponent({
  user,
  chat,
  onClick,
  userLogged,
}: ChatProps) {
  const isOnline: boolean = dayjs()
    .subtract(5, "minutes")
    .isBefore(dayjs(user.last_login));

  return (
    <button
      onClick={onClick}
      className="dark:hover:bg-zinc-800 hover:bg-zinc-100 cursor-pointer py-3 px-4 flex items-center gap-4 w-full"
    >
      <Avatar isOnline={isOnline} className="w-12 h-12">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center items-start gap-3 w-full h-full">
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-sm font-medium ">{user.name}</h2>
          <span className="text-xs dark:text-zinc-400 text-zinc-600">
            {dayjs(chat.viewed_at ? chat.viewed_at : chat.created_at).format(
              "DD/MM/YYYY"
            )}
          </span>
        </div>

        <div className="flex justify-between w-full gap-2">
          {chat.last_message ? (
            <div className="text-xs dark:text-zinc-400 text-zinc-600 flex items-center gap-2 justify-between w-full">
              {chat.last_message.body ? (
                chat.last_message.body.length > 25 ? (
                  chat.last_message.body.slice(0, 25) + "..."
                ) : (
                  chat.last_message.body
                )
              ) : chat.last_message.attachment?.audio ? (
                <div className="flex items-center gap-1">
                  <Mic size={16} />
                  Mensagem de voz
                </div>
              ) : chat.last_message.attachment?.file?.content_type.includes(
                  "application"
                ) ? (
                <div className="flex items-center gap-1">
                  <FileText size={16} />
                  Arquivo
                </div>
              ) : chat.last_message.attachment?.file?.content_type.includes(
                  "image"
                ) ? (
                <div className="flex items-center gap-1">
                  <Images size={16} />
                  Imagem
                </div>
              ) : (
                ""
              )}

              <div>
                {chat.message_not_viewed > 0 ? (
                  <Badge className="py-0 bg-emerald-500 font-medium">
                    {chat.message_not_viewed}
                  </Badge>
                ) : (
                  chat.last_message?.from_user.id === userLogged?.id && (
                    <div
                      className={
                        chat.last_message.viewed_at
                          ? "text-emerald-600"
                          : "text-zinc-500"
                      }
                    >
                      <CheckCheck size={16} />
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <span className="text-xs dark:text-zinc-400 text-zinc-600">
              Clique aqui para iniciar uma conversa
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
