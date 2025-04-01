import { useSortable } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical } from "lucide-react"
import { Trash2 } from "lucide-react"
import { cn } from "../lib/utils"
import { ContainerComponentItem } from "./container-Components"
import { useState } from "react"
import { current } from "@reduxjs/toolkit"
import final from "../lib/db"

export function SortableContainer({ id, title, component, isOver, handleDeleteContainer }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
    const [visible, setVisible] = useState(true)

    const { setNodeRef: setDroppableRef } = useDroppable({
        id: `droppable-${id}`,
        data: {
            accepts: "component",
            containerId: id,
        },
    })
    console.log(visible)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            onMouseEnter={() => setVisible(false)}
            onMouseLeave={() => setVisible(true)}
            className={cn(
                `relative border  shadow-sm`,
                isDragging && "z-10",
                visible ? 'opacity-0' : 'opacity-1',
                isOver && "ring-2 ring-primary ring-offset-2",
            )}
            {...attributes}
        >
            {!visible && <button
                className="absolute z-100 cursor-pointer top-[-20px] right-2 p-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => handleDeleteContainer(id)}
            >
                <Trash2 className="h-5 w-5" />
            </button>}
            <div className="flex z-10 absolute items-center rounded-br-md">
                {!visible && <div className=" bg-white cursor-grab touch-none" {...listeners}>
                    <GripVertical className="" />
                </div>}
                {/* <span className="font-medium">{title}</span> */}
            </div>

            <div ref={setDroppableRef} className={cn(" w-full", isOver && !component ? "bg-primary/5" : "")}>
                {component ? (
                    <ContainerComponentItem component={component} containerId={id} />
                ) : (
                    <div className="flex h-[150px] items-center justify-center text-sm text-muted-foreground">
                        Drag a component here
                    </div>
                )}
            </div>
        </div>
    )
}

