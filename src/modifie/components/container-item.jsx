import { GripVertical } from "lucide-react"
import { cn } from "../../components/lib/utils"

export function ContainerItem({ title, isSidebar }) {
  return (
    <div className={cn("flex items-center border bg-card p-4 shadow-md", isSidebar ? "w-52" : "w-full")}>
      <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
      <span>{title}</span>
    </div>
  )
}

