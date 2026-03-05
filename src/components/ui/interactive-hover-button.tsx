
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export function InteractiveHoverButton({ text, className, onClick }: InteractiveHoverButtonProps) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className={cn(
        "relative inline-flex h-10 overflow-hidden rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <span
        className={`absolute inset-0 flex h-full w-full items-center justify-center transition-all duration-300 ${
          hovered ? "translate-y-full opacity-0" : ""
        }`}
      >
        {text}
      </span>
      <span
        className={`absolute inset-0 flex h-full w-full -translate-y-full items-center justify-center transition-all duration-300 ${
          hovered ? "translate-y-0 opacity-100" : "opacity-0"
        }`}
      >
        {text}
      </span>
      <span className="invisible">{text}</span>
    </button>
  );
}
