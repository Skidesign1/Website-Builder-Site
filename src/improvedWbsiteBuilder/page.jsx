import WebsiteBuilderNavbar from "./components/website-builder-navbar"
import { WebsiteBuilderSidebar } from "./components/website-builder-sidebar"
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { CanvasDroppable } from "./components/canvas-droppable"
import { ContainerItem } from "./components/container-item"
import { ComponentPreview } from "./components/component-preview"
import { useDispatch, useSelector } from "react-redux"
import {
  selectActivePage,
  selectPages,
  selectContainers,
  selectActiveId,
  selectOverIndex,
  selectActiveComponent,
  selectActiveDroppableId,
  setActiveId,
  setOverIndex,
  setActiveComponent,
  setActiveDroppableId,
  changePage,
  createPage,
  renamePage,
  deletePage,
  deleteContainer,
  deleteComponent,
  moveContainers,
  addComponentToContainer,
  moveComponentBetweenContainers,
  addContainer,
} from "./reduxState/websiteBuilderSlice"
import TextEditor from "./subs/textEditor"

export default function WebsiteBuilderPage() {
  const dispatch = useDispatch()

  // Redux state selectors
  const pages = useSelector(selectPages)
  const activePage = useSelector(selectActivePage)
  const containers = useSelector(selectContainers)
  const activeId = useSelector(selectActiveId)
  const overIndex = useSelector(selectOverIndex)
  const activeComponent = useSelector(selectActiveComponent)
  const activeDroppableId = useSelector(selectActiveDroppableId)

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // Page management functions
  const handlePageChange = (page) => {
    dispatch(changePage(page))
  }

  const handleCreatePage = (pageName) => {
    if (pageName.trim() === "") return
    dispatch(createPage(pageName))
  }

  const handleRenamePage = (pageId, newName) => {
    if (newName.trim() === "") return
    dispatch(renamePage({ pageId, newName }))
  }

  const handleDeletePage = (pageId) => {
    dispatch(deletePage(pageId))
  }

  // Container and component management
  const handleDeleteContainer = (containerId) => {
    dispatch(deleteContainer(containerId))
  }

  const handleDeleteComponent = (containerId) => {
    dispatch(deleteComponent(containerId))
  }

  // Handle drag start
  function handleDragStart(event) {
    const { active } = event
    dispatch(setActiveId(active.id))
    dispatch(setOverIndex(null))

    // Check if dragging a component
    if (active.data.current?.isComponent) {
      dispatch(
        setActiveComponent({
          type: active.data.current.type,
          label: active.data.current.label,
          component: active.data.current.component,
        }),
      )
    } else {
      dispatch(setActiveComponent(null))
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
        dispatch(setOverIndex(containers?.length))
      } else {
        // If over an existing container, find its index
        const overIndex = containers?.findIndex((c) => c.id === over.id)
        if (overIndex !== -1) {
          dispatch(setOverIndex(overIndex))
        }
      }
    }
    // If sorting existing containers
    else if (active.id !== over.id) {
      const activeIndex = containers?.findIndex((c) => c.id === active.id)
      const overIndex = containers?.findIndex((c) => c.id === over.id)

      if (activeIndex !== -1 && overIndex !== -1) {
        dispatch(moveContainers({ activeIndex, overIndex }))
      }
    }
  }

  // Handle drag end
  function handleDragEnd(event) {
    const { active, over } = event

    // Reset states
    dispatch(setActiveId(null))
    dispatch(setActiveComponent(null))

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
            dispatch(
              moveComponentBetweenContainers({
                sourceContainerId,
                targetContainerId,
              }),
            )
          }
        }
        // If adding a new component from sidebar
        else {
          dispatch(
            addComponentToContainer({
              targetContainerId,
              component: {
                id: `${active.data.current.type}-${Date.now()}`,
                type: active.data.current.type,
                label: active.data.current.label,
                component: active.data.current.component,
              },
            }),
          )
        }
      }
    }
    // If dragging a container from sidebar
    else if (active.id === "sidebar-container") {
      // Create a new container
      const newContainer = {
        id: `container-${Date.now()}`,
        title: `Container ${containers?.length + 1}`,
        component: null,
      }

      dispatch(addContainer({ newContainer, overIndex }))
    }

    // Reset states
    dispatch(setOverIndex(null))
    dispatch(setActiveDroppableId(null))
  }

  return (
    <div className="flex flex-col h-screen">
      <WebsiteBuilderNavbar
        pages={pages}
        activePage={activePage}
        onPageChange={handlePageChange}
        onCreatePage={handleCreatePage}
        onRenamePage={handleRenamePage}
        onDeletePage={handleDeletePage}
      />
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-[200px_1fr_200px] overflow-hidden">
          {/* Sidebar */}
          <WebsiteBuilderSidebar
            pages={pages}
            activePage={activePage}
            containers={containers}
            onPageChange={handlePageChange}
            onCreatePage={handleCreatePage}
            onRenamePage={handleRenamePage}
            onDeletePage={handleDeletePage}
            onDeleteContainer={handleDeleteContainer}
            onDeleteComponent={handleDeleteComponent}
          />

          {/* Canvas - Full height */}
          <div className="border-dashed h-[100vh] no-scrollbar overflow-auto p-4 border relative">
            <CanvasDroppable
              containers={containers}
              overIndex={overIndex}
              isDraggingNew={activeId === "sidebar-container"}
              activeDroppableId={activeDroppableId}
              onDeleteContainer={handleDeleteContainer}
              onDeleteComponent={handleDeleteComponent}
              className="overflow-hidden"
            />
          </div>

          {/* Text Editor */}
          <div className="overflow-hidden">
            <TextEditor />
          </div>
          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              activeComponent ? (
                <ComponentPreview
                  type={activeComponent.type}
                  label={activeComponent.label}
                  component={activeComponent.component}
                />
              ) : activeId === "sidebar-container" ? (
                <ContainerItem title="Container" isSidebar={false} />
              ) : (
                <ContainerItem
                  title={containers.find((c) => c.id === activeId)?.title || "Container"}
                  isSidebar={false}
                />
              )
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  )
}
