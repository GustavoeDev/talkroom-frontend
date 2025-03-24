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

import AvatarComponent from "./avatar-component";
import { LogOut, UserRoundPen } from "lucide-react";
import { handleSignOut } from "@/lib/server/auth";
import { useState } from "react";
import FormUpdateUser from "./form-update-user";

export default function DropdownMenuComponent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  function handleUpdateClickModal() {
    setOpenDialog(true);
    setOpenDropdown(false);
  }

  function handleSignOutLocalStorage() {
    localStorage.removeItem("user");
  }

  return (
    <>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger>
          <AvatarComponent className="cursor-pointer h-9 w-9" />
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
          <FormUpdateUser />
        </DialogContent>
      </Dialog>
    </>
  );
}
