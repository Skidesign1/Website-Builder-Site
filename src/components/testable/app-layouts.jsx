
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
import { DraggableComponent } from "./draggable-component.jsx"
import { DraggableSidebarItem } from "./draggable-sidebar-item.jsx"
import { CanvasDroppable } from "./canvasDropable"
import { ContainerItem } from "./container-items"
import { ComponentOverlay } from "./componentOverlay.jsx"
import final from "../lib/db.jsx"
import WebsiteBuilderToolbar from "../Navbar.jsx"
import TextEditor from "../sidebars/textEditor.jsx"
import Sidebar from "../Sidebar.jsx"

// Component types that can be dragged from sidebar
const componentTypes = [
    { categories: 'button,', type: "button", label: "Button", icon: "B" },
    { categpries: 'input', type: "input", label: "Input Field", icon: "I" },
    { type: "text", label: "Text Block", icon: "T" },
    { type: "image", label: "Image", icon: "🖼️" },
    { type: "card", label: "Card", icon: "C" },
]

export default function DragAndDropPage() {
    const [containers, setContainers] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [overIndex, setOverIndex] = useState(null)
    const [activeComponent, setActiveComponent] = useState(null)
    const [activeDroppableId, setActiveDroppableId] = useState(null)

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
        console.log(active)

        if (active.data.current?.isComponent) {
            setActiveComponent({
                type: active.data.current.type,
                label: active.data.current.label,
            })
        } else {
            setActiveComponent(null)
        }
    }

    function handleDragOver(event) {
        const { active, over } = event

        if (!over) {
            setOverIndex(null)
            setActiveDroppableId(null)
            return
        }

        if (active.data.current?.isComponent) {
            if (over.id.toString().startsWith("droppable-")) {
                setActiveDroppableId(over.id.toString())
            } else {
                setActiveDroppableId(null)
            }
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
        setActiveComponent(null)

        if (!over) {
            setOverIndex(null)
            setActiveDroppableId(null)
            return
        }


        if (active.data.current?.isComponent && over.id.toString().startsWith("droppable-")) {
            const targetContainerId = over.data.current?.containerId

            if (targetContainerId) {
                if (active.data.current?.isExistingComponent) {
                    const sourceContainerId = active.data.current.sourceContainerId

                    if (sourceContainerId !== targetContainerId) {
                        const sourceContainer = containers.find((c) => c.id === sourceContainerId)
                        const componentToMove = sourceContainer?.component

                        if (componentToMove) {
                            setContainers(
                                containers.map((container) => {
                                    if (container.id === sourceContainerId) {
                                        return {
                                            ...container,
                                            component: null,
                                        }
                                    }
                                    if (container.id === targetContainerId) {
                                        return {
                                            ...container,
                                            component: componentToMove,
                                        }
                                    }
                                    return container
                                }),
                            )
                        }
                    }
                } else {
                    setContainers(
                        containers.map((container) => {
                            if (container.id === targetContainerId) {
                                console.log(active)
                                return {
                                    ...container,
                                    component: {
                                        id: `${active.data.current.type}-${Date.now()}`,
                                        type: active.data.current.type,
                                        label: active.data.current.label,
                                        component: active.data.current.component
                                    },
                                }
                            }
                            return container
                        }),
                    )
                }
            }
        } else if (active.id === "sidebar-container") {
            console.log(active)
            const newContainer = {
                id: `container-${Date.now()}`,
                title: `Container ${containers.length + 1}`,
                component: active.component
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
        setActiveDroppableId(null)
    }

    function handleDeleteContainer(containerId) {
        setContainers((prevContainers) => prevContainers.filter(c => c.id !== containerId));
    }


    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <WebsiteBuilderToolbar />
            <div className="grid grid-cols-[200px_1fr_200px] gap-1 h-[100vh] relative">
                <div className=" border-r bg-muted/40">
                    {/* <h2 className="mb-4 font-semibold">Sidebar</h2> */}

                    {/* <DraggableSidebarItem id="sidebar-container" title="Container" isContainer={true} />

                    <h3 className="text-sm font-medium mb-2">Components</h3>
                    <div className="space-y-1">
                        {final.map((component, index) => (
                            <DraggableComponent
                                key={index}
                                id={`component-${component.type}`}
                                type={component.type}
                                label={component.label}
                                icon={component.icon}
                            />
                        ))}
                    </div> */}
                    <Sidebar id='sidebar-container' title='container' isContainer={true} />
                </div>

                <CanvasDroppable
                    containers={containers}
                    overIndex={overIndex}
                    isDraggingNew={activeId === "sidebar-container"}
                    activeDroppableId={activeDroppableId}
                    handleDeleteContainer={handleDeleteContainer}

                />

                <DragOverlay>
                    {activeId ? (
                        activeComponent ? (
                            <ComponentOverlay type={activeComponent.type} label={activeComponent.label} />
                        ) : activeId === "sidebar-container" ? (
                            <ContainerItem isSidebar={false} />
                        ) : (
                            <ContainerItem
                                title={containers.find((c) => c.id === activeId)?.title || "Container"}
                                isSidebar={false}
                            />
                        )
                    ) : null}
                </DragOverlay>
                <div className="border-l"><TextEditor /></div>
            </div>
        </DndContext>
    )
}

