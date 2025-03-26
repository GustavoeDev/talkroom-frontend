"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { LogOut, UserRoundPen } from "lucide-react";
import { handleSignOut } from "@/lib/server/auth";
import { useEffect, useState } from "react";
import FormUpdateUser from "./form-update-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { useChatStore } from "@/stores/chat-store";

export default function ProfileSettings() {
  const { setChat, setChatMessages, setChats } = useChatStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUserAuthenticated(user ? JSON.parse(user) : null);
  }, []);

  function handleUpdateAvatarUser(user: User) {
    setUserAuthenticated(user);
  }

  function handleUpdateClickModal() {
    setOpenDialog(true);
    setOpenDropdown(false);
  }

  function handleSignOutLocalStorage() {
    localStorage.removeItem("user");
    setChats(null);
    setChat(null);
    setChatMessages(null);
  }

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger>
          <Avatar className="cursor-pointer h-9 w-9">
            <AvatarImage src={userAuthenticated?.avatar} />
            <AvatarFallback>
              {userAuthenticated?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleUpdateClickModal}
            className="cursor-pointer"
          >
            <UserRoundPen size={16} />
            Editar dados
          </DropdownMenuItem>

          <form action={handleSignOut}>
            <DropdownMenuItem asChild className="cursor-pointer">
              <button
                type="submit"
                className="w-full"
                onClick={handleSignOutLocalStorage}
              >
                <LogOut className="text-red-500" />
                Sair
              </button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar dados do usuário</DialogTitle>
          </DialogHeader>
          <FormUpdateUser
            user={userAuthenticated}
            handleUpdateAvatarUser={handleUpdateAvatarUser}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
