

import { useState } from "react"
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { DraggableSidebarItem } from "./draggable-sidebar-items"
import { CanvasDroppable } from "./canvasDropable"
import { ContainerItem } from "./container-items"
import WebsiteBuilderToolbar from "../Navbar"
import TextEditor from "../sidebars/textEditor"


export default function DragAndDropPage() {
    const [containers, setContainers] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [overIndex, setOverIndex] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    function handleDragStart(event) {
        const { active } = event
        setActiveId(active.id)
        setOverIndex(null)
    }

    function handleDragOver(event) {
        const { active, over } = event

        if (!over) {
            setOverIndex(null)
            return
        }

        if (active.id === "sidebar-container") {
            if (over.id === "canvas-droppable") {
                setOverIndex(containers.length)
            } else {
                const overIndex = containers.findIndex((c) => c.id === over.id)
                if (overIndex !== -1) {
                    setOverIndex(overIndex)
                }
            }
        } else if (active.id !== over.id) {
            const activeIndex = containers.findIndex((c) => c.id === active.id)
            const overIndex = containers.findIndex((c) => c.id === over.id)

            if (activeIndex !== -1 && overIndex !== -1) {
                setContainers((items) => arrayMove(items, activeIndex, overIndex))
            }
        }
    }

    function handleDragEnd(event) {
        const { active, over } = event
        setActiveId(null)

        if (!over) {
            setOverIndex(null)
            return
        }

        if (active.id === "sidebar-container") {
            const newContainer = {
                id: `container-${Date.now()}`,
                title: `Container ${containers.length + 1}`,
            }

            if (overIndex !== null) {
                const newContainers = [...containers]
                newContainers.splice(overIndex, 0, newContainer)
                setContainers(newContainers)
            } else {
                setContainers((prev) => [...prev, newContainer])
            }
        }

        setOverIndex(null)
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <WebsiteBuilderToolbar />
            <div className="grid grid-cols-[200px_1fr_200px] gap-1 relative">
                <div className=" bg-muted/40 p-4">
                    <h2 className="mb-4 font-semibold">Sidebar</h2>
                    <div className="mb-4">
                        <DraggableSidebarItem id="sidebar-container" title="Drag me to canvas" />
                    </div>
                </div>
                <div>
                    <CanvasDroppable
                        containers={containers}
                        overIndex={overIndex}
                        isDraggingNew={activeId === "sidebar-container"}
                    />
                </div>
                <DragOverlay>
                    {activeId ? (
                        activeId === "sidebar-container" ? (
                            <ContainerItem title="New Container" isSidebar={false} />
                        ) : (
                            <ContainerItem
                                title={containers.find((c) => c.id === activeId)?.title || "Container"}
                                isSidebar={false}
                            />
                        )
                    ) : null}
                </DragOverlay>
                <TextEditor />
            </div>


        </DndContext>
    )
}

