import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipHoverComponentProps {
  children: React.ReactNode;
  text?: string;
  className?: string;
}

export default function ToolTipHoverComponent({
  children,
  text,
  className,
}: ToolTipHoverComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p className={className}>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
