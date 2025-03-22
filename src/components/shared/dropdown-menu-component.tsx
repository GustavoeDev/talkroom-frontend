import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarComponent from "./avatar-component";
import { LogOut, UserRoundPen } from "lucide-react";

export default function DropdownMenuComponent() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarComponent className="cursor-pointer h-9 w-9" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <UserRoundPen />
          Editar dados
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="text-red-500" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
