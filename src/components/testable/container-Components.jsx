
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { cn } from "../lib/utils"
import { useDraggable } from "@dnd-kit/core"
import final from "../lib/db"


export function ContainerComponentItem({ curr, component, containerId }) {
    // console.log(curr)
    let current = final.find(m => m.label === component.label)
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: component.id,
        data: {
            type: component.type,
            label: component.label,
            isComponent: true,
            isExistingComponent: true,
            sourceContainerId: containerId,
            component: 'hello'
        },
    })
    const style = transform
        ? {
            transform: CSS.Translate.toString(transform),
        }
        : undefined

    // Render different component types
    const renderComponent = () => {

        switch (component.type) {
            case current?.label:
                return (
                    <div>  {current.component}</div>


                )
            // case "input":
            //     return (
            //         <input
            //             type="text"
            //             placeholder={component.label}
            //             className="w-full rounded-md border border-input bg-background px-3 py-2"
            //         />
            //     )
            // case "text":
            //     return (
            //         <div className="w-full rounded-md bg-muted p-3">
            //             <p>{component.label}</p>
            //             <p className="text-sm text-muted-foreground">This is a sample text block that can be edited.</p>
            //         </div>
            //     )
            // case "image":
            //     return (
            //         <div className="w-full rounded-md bg-muted aspect-video flex items-center justify-center">
            //             <span className="text-4xl">🖼️</span>
            //         </div>
            //     )
            // case "card":
            //     return (
            //         <div className="w-full rounded-md border p-4">
            //             <h3 className="text-lg font-medium">{component.label}</h3>
            //             <p className="text-sm text-muted-foreground mt-1">This is a card component with a title and description.</p>
            //         </div>
            //     )
            default:
                return <div>{component.label}</div>
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn("relative w-full h-full", isDragging && "opacity-50")}
            {...attributes}
        >
            <div
                className="absolute bg-white top-0 right-0 p-1 cursor-grab z-10 bg-background rounded-bl-md"
                {...listeners}
            >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="w-full h-full">{renderComponent()}</div>
        </div>
    )
}

