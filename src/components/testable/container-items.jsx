import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"

export function ContainerItem({ title, isSidebar }) {
    return (
        <div className={cn("flex w-[200px] h-20 items-center rounded-md bg-black/10 p-4 shadow-md", isSidebar ? "w-52" : "w-full")}>
            {/* <GripVertical className="mr-2 h-10 text-muted-foreground" /> */}
            <span>{title}</span>
        </div>
    )
}

