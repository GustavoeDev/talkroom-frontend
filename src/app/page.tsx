import { ModeToggle } from "@/components/layouts/providers";
import Chat from "@/components/shared/chat";
import DropdownMenuComponent from "@/components/shared/dropdown-menu-component";
import ToolTipHoverComponent from "@/components/shared/tooltip-component";
import { Lock, MessageSquareDiff, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen w-full flex">
      <aside className="max-w-[25%] w-full dark:bg-zinc-900 bg-white border-r dark:border-zinc-800 border-zinc-300 flex flex-col">
        <div className="p-4 flex flex-col gap-8">
          <div className="flex items-center justify-between mt-2">
            <ToolTipHoverComponent text="Conversas">
              Conversas
            </ToolTipHoverComponent>
            <div className="flex items-center gap-4">
              <ToolTipHoverComponent text="Nova conversa">
                <MessageSquareDiff className="dark:text-zinc-400 dark:hover:text-zinc-100 hover:text-zinc-600 cursor-pointer" />
              </ToolTipHoverComponent>
              <ModeToggle />
            </div>
          </div>
          <div className="w-full py-2 px-4 dark:bg-zinc-950 bg-zinc-200 flex items-center gap-3 rounded-md text-sm">
            <label htmlFor="searchInput" className="cursor-pointer">
              <Search size={18} />
            </label>
            <input type="text" id="searchInput" placeholder="Pesquisar" />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <div className="border-t dark:border-zinc-800 border-zinc-300 mx-4 py-4 flex items-center justify-center gap-2">
            <Lock size={14} />
            <p className="text-sm">Suas mensagens estão protegidas</p>
          </div>
        </div>

        <div className="mt-auto p-4 flex items-center justify-between">
          <p className="text-sm">Configurações de conta</p>
          <div className="flex items-center gap-4">
            <DropdownMenuComponent />
          </div>
        </div>
      </aside>
      <div>
        <h1>main</h1>
      </div>
    </main>
  );
}
