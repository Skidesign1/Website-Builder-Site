import React from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "../lib/utils"

export function DraggableSidebarItem({ id, title, isContainer = false, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      type: "container",
      isContainer,
    },
  })

  const style = transform
    ? {
      transform: CSS.Translate.toString(transform),
    }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex cursor-grab items-center rounded-md border bg-card p-3 shadow-sm",
        isContainer ? "mb-6" : "mb-2",
      )}
      {...listeners}
      {...attributes}
    >
      {children || title}
    </div>
  )
}
