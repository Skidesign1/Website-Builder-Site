import { useState } from "react"
import { Provider } from "react-redux"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import { store } from "./store/store"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import {
  addContainer,
  moveContainers,
  addComponentToContainer,
  moveComponent,
  setActiveDroppableId,
  setOverIndex,
  setSelectedContainer,
} from "./store/containersSlice"

import { DraggableSidebarItem } from "./components/draggable-sidebar-item"
import { DraggableComponent } from "./components/draggable-component"
import { CanvasDroppable } from "./components/canvas-droppable"
import { ContainerOverlay } from "./components/container-overlay"
import sidebarComponents from "./components/sidebar/sidebar-components"
import WebsiteBuilderToolbar from "../components/Navbar"
import TextEditor from "../components/sidebars/textEditor"
import Sidebar from "../components/Sidebar"

// Add click handler to deselect when clicking outside
function DragAndDropContent() {
  // Get state from Redux
  const containers = useAppSelector((state) => state.containers.containers)
  const activeDroppableId = useAppSelector((state) => state.containers.activeDroppableId)
  const overIndex = useAppSelector((state) => state.containers.overIndex)
  const dispatch = useAppDispatch()

  // Local state for drag and drop
  const [activeId, setActiveId] = useState(null)
  const [activeComponent, setActiveComponent] = useState(null)
  const [activeContainer, setActiveContainer] = useState(null)

  // Configure sensors for drag detection with lower activation constraints
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1, // Very small distance to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Handle click outside to deselect container
  const handleBackgroundClick = (e) => {
    // Only deselect if clicking directly on the background
    if (e.target === e.currentTarget) {
      dispatch(setSelectedContainer(null))
    }
  }

  // Handle drag start
  function handleDragStart(event) {
    const { active } = event
    setActiveId(active.id)
    dispatch(setOverIndex(null))

    // Check if dragging a component
    if (active.data.current?.isComponent) {
      const componentData = active.data.current
      const componentType = sidebarComponents.find((c) => c.id === componentData.componentId)

      setActiveComponent({
        type: componentData.type,
        label: componentData.label,
        componentId: componentData.componentId,
        icon: componentType?.icon,
      })
      setActiveContainer(null)
    }
    // Check if dragging an existing container
    else if (active.id !== "sidebar-container") {
      const container = containers.find((c) => c.id === active.id)
      if (container) {
        setActiveContainer({
          id: container.id,
          title: container.title,
          component: container.component,
        })
        setActiveComponent(null)
      } else {
        setActiveContainer(null)
        setActiveComponent(null)
      }
    } else {
      // Dragging a new container from sidebar
      setActiveContainer(null)
      setActiveComponent(null)
    }
  }

  // Handle drag over for showing preview position
  function handleDragOver(event) {
    const { active, over } = event

    // If not dragging over anything
    if (!over) {
      dispatch(setOverIndex(null))
      dispatch(setActiveDroppableId(null))
      return
    }

    // If dragging a component (from sidebar or from another container)
    if (active.data.current?.isComponent) {
      // Check if over a container's droppable area
      if (over.id.toString().startsWith("droppable-")) {
        dispatch(setActiveDroppableId(over.id.toString()))
      } else {
        dispatch(setActiveDroppableId(null))
      }
      return
    }

    // If dragging a container from sidebar
    if (active.id === "sidebar-container") {
      if (over.id === "canvas-droppable") {
        // If over the empty canvas, set index to end
        dispatch(setOverIndex(containers.length))
      } else {
        // If over an existing container, find its index
        const overIndex = containers.findIndex((c) => c.id === over.id)
        if (overIndex !== -1) {
          dispatch(setOverIndex(overIndex))
        }
      }
    }
    // If sorting existing containers
    else if (active.id !== over.id) {
      const activeIndex = containers.findIndex((c) => c.id === active.id)
      const overIndex = containers.findIndex((c) => c.id === over.id)

      if (activeIndex !== -1 && overIndex !== -1) {
        dispatch(moveContainers({ activeIndex, overIndex }))
      }
    }
  }

  // Handle drag end
  function handleDragEnd(event) {
    const { active, over } = event

    // Reset states
    setActiveId(null)
    setActiveComponent(null)
    setActiveContainer(null)

    // If not dropping over anything, do nothing
    if (!over) {
      dispatch(setOverIndex(null))
      dispatch(setActiveDroppableId(null))
      return
    }

    // If dragging a component
    if (active.data.current?.isComponent && over.id.toString().startsWith("droppable-")) {
      const targetContainerId = over.data.current?.containerId

      if (targetContainerId) {
        // If moving an existing component between containers
        if (active.data.current?.isExistingComponent) {
          const sourceContainerId = active.data.current.sourceContainerId

          // If source and target containers are different
          if (sourceContainerId !== targetContainerId) {
            // Find the component to move
            const sourceContainer = containers.find((c) => c.id === sourceContainerId)
            const componentToMove = sourceContainer?.component

            if (componentToMove) {
              dispatch(
                moveComponent({
                  sourceContainerId,
                  targetContainerId,
                  component: componentToMove,
                }),
              )

              // Select the target container after moving
              dispatch(setSelectedContainer(targetContainerId))
            }
          }
        }
        // If adding a new component from sidebar
        else {
          dispatch(
            addComponentToContainer({
              containerId: targetContainerId,
              componentId: active.data.current.componentId,
              type: active.data.current.type,
              label: active.data.current.label,
            }),
          )

          // Select the container after adding a component
          dispatch(setSelectedContainer(targetContainerId))
        }
      }
    }
    // If dragging a container from sidebar
    else if (active.id === "sidebar-container") {
      // Create a new container at the specific position if overIndex is set
      if (overIndex !== null) {
        dispatch(addContainer({ index: overIndex }))
      } else {
        // Otherwise append to the end
        dispatch(addContainer({}))
      }
    }

    // Reset states
    dispatch(setOverIndex(null))
    dispatch(setActiveDroppableId(null))
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <WebsiteBuilderToolbar />
      <div className="grid grid-cols-[200px_1fr_200px] h-screen">
        {/* Sidebar */}
        <div className=" border-r bg-muted/40">
          {/* <h2 className="mb-4 font-semibold">Sidebar</h2> */}

          {/* Container */}
          {/* <DraggableSidebarItem id="sidebar-container" title="Container" isContainer={true} /> */}
          <Sidebar id="sidebar-container" title="Container" isContainer={true} />
          {/* Components */}
          <h3 className="text-sm font-medium mb-2">Components</h3>
          <div className="space-y-1">
            {sidebarComponents.map((component) => (
              <DraggableComponent
                key={component.id}
                id={`component-${component.id}`}
                type={component.type}
                label={component.label}
                icon={component.icon}
                componentId={component.id}
              />
            ))}
          </div>
        </div>

        {/* Canvas - Full height - Add click handler to deselect */}
        <div className="flex-1 flex flex-col h-full" onClick={handleBackgroundClick}>
          <CanvasDroppable
            containers={containers}
            overIndex={overIndex}
            isDraggingNew={activeId === "sidebar-container"}
            activeDroppableId={activeDroppableId}
          />
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeId ? (
            activeComponent ? (
              // When dragging a component
              <div className="opacity-90 w-64">
                {sidebarComponents.find((c) => c.id === activeComponent.componentId)?.component}
              </div>
            ) : activeContainer ? (
              // When dragging an existing container
              <ContainerOverlay title={activeContainer.title} component={activeContainer.component} />
            ) : activeId === "sidebar-container" ? (
              // When dragging a new container from sidebar
              <ContainerOverlay title="New Container" component={null} />
            ) : null
          ) : null}
        </DragOverlay>
        <TextEditor />
      </div>

    </DndContext>
  )
}

export default function DragAndDropPage() {
  return (
    <Provider store={store}>
      <DragAndDropContent />
    </Provider>
  )
}

