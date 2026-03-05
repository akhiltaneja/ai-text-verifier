
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (value: string) => void
  discount?: boolean
}

export function Tab({ text, selected, setSelected, discount }: TabProps) {
  return (
    <button
      className={cn(
        "relative flex h-10 items-center justify-center whitespace-nowrap rounded-full px-5 text-sm font-medium transition-all",
        selected ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => setSelected(text)}
    >
      <span className="relative z-10">{text}</span>
      {discount && (
        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          40%
        </span>
      )}
    </button>
  )
}
