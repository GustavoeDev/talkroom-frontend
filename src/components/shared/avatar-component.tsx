import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarComponentProps {
  className?: string;
}

export default function AvatarComponent({ className }: AvatarComponentProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
