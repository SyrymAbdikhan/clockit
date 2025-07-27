import { cn } from "@/lib/utils";

interface NumberLabelProps {
  value?: number;
  label?: string;
  className?: string;
}

export function NumberLabel({ value = 0, label, className }: NumberLabelProps) {
  return (
    <div className={cn("flex gap-3 items-end", className)}>
      <div className="text-6xl min-w-[80px] text-right">{value}</div>
      <div className="text-3xl min-w-[100px]">{label}</div>
    </div>
  );
}
