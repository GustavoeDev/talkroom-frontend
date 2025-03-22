import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarComponentProps {
  className?: string;
}

export default function AvatarComponent({ className }: AvatarComponentProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src="https://avatars.githubusercontent.com/u/177130380?v=4" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
