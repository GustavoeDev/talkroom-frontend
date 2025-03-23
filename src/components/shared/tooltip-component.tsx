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
  ...triggerProps
}: ToolTipHoverComponentProps & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger {...triggerProps}>{children}</TooltipTrigger>
        <TooltipContent>
          <p className={className}>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
