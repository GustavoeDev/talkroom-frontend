import BannerImage from "@/assets/banner-img";
import { Lock } from "lucide-react";
import NewChat from "./new-chat";

export default function BannerDefault() {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-between gap-4 pt-16 pb-6 dark:bg-zinc-950 bg-zinc-200">
        <div className="flex flex-col items-center gap-8 max-w-[500px] text-center">
          <div className="h-64 w-64">
            <BannerImage />
          </div>
          <span>
            Por favor, selecione uma conversa para visualizar as mensagens ou
            inicie um novo chat.
          </span>
          <NewChat variant="banner" />
        </div>
        <div className="flex items-center gap-2">
          <Lock size={14} />
          <p className="text-sm">Suas mensagens estão protegidas.</p>
        </div>
      </div>
    </>
  );
}
