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

  async function handleLogout() {
    await handleSignOut();
  }

  function handleUpdateClickModal() {
    setOpenDialog(true);
    setOpenDropdown(false);
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
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="text-red-500" />
            Sair
          </DropdownMenuItem>
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
