import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"
import final from "../lib/db"


export function ContainerItem({ title, isSidebar, component }) {
    console.log(title, 'continerItem')
    // let currentComponent = final.find(m => m. === component)
    return (
        <div className={cn("flex items-center rounded-md p-4 shadow-md", isSidebar ? "w-52" : "w-full")}>
            <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
            <span>not found</span>
        </div>
    )
}

