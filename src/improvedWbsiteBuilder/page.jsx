
import WebsiteBuilderNavbar from "./components/website-builder-navbar"
import { WebsiteBuilderSidebar } from "./components/website-builder-sidebar"
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { CanvasDroppable } from "./components/canvas-droppable"
import WebsiteBuilderToolbar from "./components/navbar"
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
}  from "./reduxState/websiteBuilderSlice"
// import { useCode } from "../context/CodeContext"
import { Link } from "react-router-dom"
import { Code } from "lucide-react"
import MyComponent from "./components/stylesSection"
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

  // const { setCode } = useCode()

  // Update code context with current containers
  // setCode(containers)

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
          <div className="border-dashed h-[100vh] no-scrollbar overflow-scroll p-4 border">
            <CanvasDroppable
              containers={containers}
              overIndex={overIndex}
              isDraggingNew={activeId === "sidebar-container"}
              activeDroppableId={activeDroppableId}
              onDeleteContainer={handleDeleteContainer}
              onDeleteComponent={handleDeleteComponent}
            />
          </div>
          <div>
          <TextEditor/>  
            {/* <div className="mt-4 p-4 border-t border-gray-200">
              <Link
                to="/code-editor"
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Code className="mr-2" size={16} />
                Open Code Editor
              </Link>
            </div> */}
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









































































// import WebsiteBuilderNavbar from "./components/website-builder-navbar"
// import { WebsiteBuilderSidebar } from "./components/website-builder-sidebar"
// import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
// import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
// import { CanvasDroppable } from "./components/canvas-droppable"
// import { ContainerItem } from "./components/container-item"
// import { ComponentPreview } from "./components/component-preview"
// import TextEditor from "../components/sidebars/textEditor"
// import { useDispatch, useSelector } from "react-redux"
// import {
//   selectActivePage,
//   selectPages,
//   selectContainers,
//   selectActiveId,
//   selectOverIndex,
//   selectActiveComponent,
//   selectActiveDroppableId,
//   setActiveId,
//   setOverIndex,
//   setActiveComponent,
//   setActiveDroppableId,
//   changePage,
//   createPage,
//   renamePage,
//   deletePage,
//   deleteContainer,
//   deleteComponent,
//   moveContainers,
//   addComponentToContainer,
//   moveComponentBetweenContainers,
//   addContainer,
// }  from "./reduxState/websiteBuilderSlice"
// import { useCode } from "../context/CodeContext"

// export default function WebsiteBuilderPage() {
//   const dispatch = useDispatch()

//   // Redux state selectors
//   const pages = useSelector(selectPages)
//   const activePage = useSelector(selectActivePage)
//   const containers = useSelector(selectContainers)
//   const activeId = useSelector(selectActiveId)
//   const overIndex = useSelector(selectOverIndex)
//   const activeComponent = useSelector(selectActiveComponent)
//   const activeDroppableId = useSelector(selectActiveDroppableId)

//   const { setCode } = useCode()

//   // Update code context with current containers
//   setCode(containers)

//   // Configure sensors for drag detection
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     }),
//   )

//   // Page management functions
//   const handlePageChange = (page) => {
//     dispatch(changePage(page))
//   }

//   const handleCreatePage = (pageName) => {
//     if (pageName.trim() === "") return
//     dispatch(createPage(pageName))
//   }

//   const handleRenamePage = (pageId, newName) => {
//     if (newName.trim() === "") return
//     dispatch(renamePage({ pageId, newName }))
//   }

//   const handleDeletePage = (pageId) => {
//     dispatch(deletePage(pageId))
//   }

//   // Container and component management
//   const handleDeleteContainer = (containerId) => {
//     dispatch(deleteContainer(containerId))
//   }

//   const handleDeleteComponent = (containerId) => {
//     dispatch(deleteComponent(containerId))
//   }

//   // Handle drag start
//   function handleDragStart(event) {
//     const { active } = event
//     dispatch(setActiveId(active.id))
//     dispatch(setOverIndex(null))

//     // Check if dragging a component
//     if (active.data.current?.isComponent) {
//       dispatch(
//         setActiveComponent({
//           type: active.data.current.type,
//           label: active.data.current.label,
//           component: active.data.current.component,
//         }),
//       )
//     } else {
//       dispatch(setActiveComponent(null))
//     }
//   }

//   // Handle drag over for showing preview position
//   function handleDragOver(event) {
//     const { active, over } = event

//     // If not dragging over anything
//     if (!over) {
//       dispatch(setOverIndex(null))
//       dispatch(setActiveDroppableId(null))
//       return
//     }

//     // If dragging a component (from sidebar or from another container)
//     if (active.data.current?.isComponent) {
//       // Check if over a container's droppable area
//       if (over.id.toString().startsWith("droppable-")) {
//         dispatch(setActiveDroppableId(over.id.toString()))
//       } else {
//         dispatch(setActiveDroppableId(null))
//       }
//       return
//     }

//     // If dragging a container from sidebar
//     if (active.id === "sidebar-container") {
//       if (over.id === "canvas-droppable") {
//         // If over the empty canvas, set index to end
//         dispatch(setOverIndex(containers.length))
//       } else {
//         // If over an existing container, find its index
//         const overIndex = containers.findIndex((c) => c.id === over.id)
//         if (overIndex !== -1) {
//           dispatch(setOverIndex(overIndex))
//         }
//       }
//     }
//     // If sorting existing containers
//     else if (active.id !== over.id) {
//       const activeIndex = containers.findIndex((c) => c.id === active.id)
//       const overIndex = containers.findIndex((c) => c.id === over.id)

//       if (activeIndex !== -1 && overIndex !== -1) {
//         dispatch(moveContainers({ activeIndex, overIndex }))
//       }
//     }
//   }

//   // Handle drag end
//   function handleDragEnd(event) {
//     const { active, over } = event

//     // Reset states
//     dispatch(setActiveId(null))
//     dispatch(setActiveComponent(null))

//     // If not dropping over anything, do nothing
//     if (!over) {
//       dispatch(setOverIndex(null))
//       dispatch(setActiveDroppableId(null))
//       return
//     }

//     // If dragging a component
//     if (active.data.current?.isComponent && over.id.toString().startsWith("droppable-")) {
//       const targetContainerId = over.data.current?.containerId

//       if (targetContainerId) {
//         // If moving an existing component between containers
//         if (active.data.current?.isExistingComponent) {
//           const sourceContainerId = active.data.current.sourceContainerId

//           // If source and target containers are different
//           if (sourceContainerId !== targetContainerId) {
//             dispatch(
//               moveComponentBetweenContainers({
//                 sourceContainerId,
//                 targetContainerId,
//               }),
//             )
//           }
//         }
//         // If adding a new component from sidebar
//         else {
//           dispatch(
//             addComponentToContainer({
//               targetContainerId,
//               component: {
//                 id: `${active.data.current.type}-${Date.now()}`,
//                 type: active.data.current.type,
//                 label: active.data.current.label,
//                 component: active.data.current.component,
//               },
//             }),
//           )
//         }
//       }
//     }
//     // If dragging a container from sidebar
//     else if (active.id === "sidebar-container") {
//       // Create a new container
//       const newContainer = {
//         id: `container-${Date.now()}`,
//         title: `Container ${containers.length + 1}`,
//         component: null,
//       }

//       dispatch(addContainer({ newContainer, overIndex }))
//     }

//     // Reset states
//     dispatch(setOverIndex(null))
//     dispatch(setActiveDroppableId(null))
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <WebsiteBuilderNavbar
//         pages={pages}
//         activePage={activePage}
//         onPageChange={handlePageChange}
//         onCreatePage={handleCreatePage}
//         onRenamePage={handleRenamePage}
//         onDeletePage={handleDeletePage}
//       />
//       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-[200px_1fr_200px] overflow-hidden">
//           {/* Sidebar */}
//           <WebsiteBuilderSidebar
//             pages={pages}
//             activePage={activePage}
//             containers={containers}
//             onPageChange={handlePageChange}
//             onCreatePage={handleCreatePage}
//             onRenamePage={handleRenamePage}
//             onDeletePage={handleDeletePage}
//             onDeleteContainer={handleDeleteContainer}
//             onDeleteComponent={handleDeleteComponent}
//           />

//           {/* Canvas - Full height */}
//           <div className="border-dashed h-[100vh] no-scrollbar overflow-scroll p-4 border">
//             <CanvasDroppable
//               containers={containers}
//               overIndex={overIndex}
//               isDraggingNew={activeId === "sidebar-container"}
//               activeDroppableId={activeDroppableId}
//               onDeleteContainer={handleDeleteContainer}
//               onDeleteComponent={handleDeleteComponent}
//             />
//           </div>
//           <div>
//             <TextEditor />
//           </div>
//           {/* Drag Overlay */}
//           <DragOverlay>
//             {activeId ? (
//               activeComponent ? (
//                 <ComponentPreview
//                   type={activeComponent.type}
//                   label={activeComponent.label}
//                   component={activeComponent.component}
//                 />
//               ) : activeId === "sidebar-container" ? (
//                 <ContainerItem title="Container" isSidebar={false} />
//               ) : (
//                 <ContainerItem
//                   title={containers.find((c) => c.id === activeId)?.title || "Container"}
//                   isSidebar={false}
//                 />
//               )
//             ) : null}
//           </DragOverlay>
//         </div>
//       </DndContext>
//     </div>
//   )
// }

































// import { useState } from "react"
// import WebsiteBuilderNavbar from "./components/website-builder-navbar"
// import { WebsiteBuilderSidebar } from "./components/website-builder-sidebar"
// import {
//   DndContext,
//   DragOverlay,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core"
// import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
// import { CanvasDroppable } from "./components/canvas-droppable"
// import { ContainerItem } from "./components/container-item"
// import { ComponentPreview } from "./components/component-preview"
// import TextEditor from "../components/sidebars/textEditor"
// import CodeEditor from "../components/CodeEditor"
// import { useCode } from "../context/CodeContext"
// export default function WebsiteBuilderPage() {
//   let { code, setCode } = useCode()
//   // Page management state - start with only Home page
//   const [pages, setPages] = useState([{ id: "home", name: "Home", path: "/", isDefault: true }])
//   const [activePage, setActivePage] = useState(pages[0])

//   // State for containers on the canvas by page
//   const [pageContainers, setPageContainers] = useState({
//     outlet: false,
//     home: [],
//   })

//   // State for active drag item
//   const [activeId, setActiveId] = useState(null)
//   // State to track where a new container would be inserted
//   const [overIndex, setOverIndex] = useState(null)
//   // State to track active component data
//   const [activeComponent, setActiveComponent] = useState(null)
//   // State to track which container is being hovered for component drop
//   const [activeDroppableId, setActiveDroppableId] = useState(null)

//   // Get current page containers
//   const containers = pageContainers[activePage.id] || []
//   setCode(containers)
//   // Configure sensors for drag detection
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     }),
//   )

//   // Page management functions
//   const handlePageChange = (page) => {
//     setActivePage(page)

//     // Initialize page containers if they don't exist
//     if (!pageContainers[page.id]) {
//       setPageContainers((prev) => ({
//         ...prev,
//         [page.id]: [],
//       }))
//     }
//   }

//   const handleCreatePage = (pageName) => {
//     if (pageName.trim() === "") return

//     const newId = `page-${Date.now()}`
//     const newPath = `/${pageName.toLowerCase().replace(/\s+/g, "-")}`

//     const newPage = {
//       id: newId,
//       name: pageName,
//       path: newPath,
//     }

//     setPages([...pages, newPage])
//     setActivePage(newPage)

//     // Initialize empty containers for the new page
//     setPageContainers((prev) => ({
//       ...prev,
//       [newId]: [],
//     }))
//   }

//   const handleRenamePage = (pageId, newName) => {
//     if (newName.trim() === "") return

//     const newPath = `/${newName.toLowerCase().replace(/\s+/g, "-")}`

//     const updatedPages = pages.map((page) =>
//       page.id === pageId ? { ...page, name: newName, path: newPath } : page
//     )

//     setPages(updatedPages)

//     if (activePage.id === pageId) {
//       setActivePage({
//         ...activePage,
//         name: newName,
//         path: newPath,
//       })
//     }
//   }

//   const handleDeletePage = (pageId) => {
//     // Don't allow deleting the default page
//     if (pages.find((p) => p.id === pageId)?.isDefault) return

//     const updatedPages = pages.filter((page) => page.id !== pageId)
//     setPages(updatedPages)

//     // If the active page was deleted, switch to the default page
//     if (activePage.id === pageId) {
//       const defaultPage = updatedPages.find((p) => p.isDefault) || updatedPages[0]
//       setActivePage(defaultPage)
//     }

//     // Remove the page's containers
//     const updatedPageContainers = { ...pageContainers }
//     delete updatedPageContainers[pageId]
//     setPageContainers(updatedPageContainers)
//   }

//   // Container and component management
//   const handleDeleteContainer = (containerId) => {
//     const updatedContainers = containers.filter((container) => container.id !== containerId)
//     setPageContainers((prev) => ({
//       ...prev,
//       [activePage.id]: updatedContainers,
//     }))
//   }

//   const handleDeleteComponent = (containerId) => {
//     const updatedContainers = containers.map((container) => {
//       if (container.id === containerId) {
//         return {
//           ...container,
//           component: null,
//         }
//       }
//       return container
//     })

//     setPageContainers((prev) => ({
//       ...prev,
//       [activePage.id]: updatedContainers,
//     }))
//   }

//   // Handle drag start
//   function handleDragStart(event) {
//     const { active } = event
//     setActiveId(active.id)
//     setOverIndex(null)

//     // Check if dragging a component
//     if (active.data.current?.isComponent) {
//       setActiveComponent({
//         type: active.data.current.type,
//         label: active.data.current.label,
//         component: active.data.current.component,
//       })
//     } else {
//       setActiveComponent(null)
//     }
//   }

//   // Handle drag over for showing preview position
//   function handleDragOver(event) {
//     const { active, over } = event

//     // If not dragging over anything
//     if (!over) {
//       setOverIndex(null)
//       setActiveDroppableId(null)
//       return
//     }

//     // If dragging a component (from sidebar or from another container)
//     if (active.data.current?.isComponent) {
//       // Check if over a container's droppable area
//       if (over.id.toString().startsWith("droppable-")) {
//         setActiveDroppableId(over.id.toString())
//       } else {
//         setActiveDroppableId(null)
//       }
//       return
//     }

//     // If dragging a container from sidebar
//     if (active.id === "sidebar-container") {
//       if (over.id === "canvas-droppable") {
//         // If over the empty canvas, set index to end
//         setOverIndex(containers.length)
//       } else {
//         // If over an existing container, find its index
//         const overIndex = containers.findIndex((c) => c.id === over.id)
//         if (overIndex !== -1) {
//           setOverIndex(overIndex)
//         }
//       }
//     }
//     // If sorting existing containers
//     else if (active.id !== over.id) {
//       const activeIndex = containers.findIndex((c) => c.id === active.id)
//       const overIndex = containers.findIndex((c) => c.id === over.id)

//       if (activeIndex !== -1 && overIndex !== -1) {
//         const newContainers = arrayMove([...containers], activeIndex, overIndex)
//         setPageContainers((prev) => ({
//           ...prev,
//           [activePage.id]: newContainers,
//         }))
//       }
//     }
//   }

//   // Handle drag end
//   function handleDragEnd(event) {
//     const { active, over } = event

//     // Reset states
//     setActiveId(null)
//     setActiveComponent(null)

//     // If not dropping over anything, do nothing
//     if (!over) {
//       setOverIndex(null)
//       setActiveDroppableId(null)
//       return
//     }

//     // If dragging a component
//     if (active.data.current?.isComponent && over.id.toString().startsWith("droppable-")) {
//       const targetContainerId = over.data.current?.containerId

//       if (targetContainerId) {
//         // If moving an existing component between containers
//         if (active.data.current?.isExistingComponent) {
//           const sourceContainerId = active.data.current.sourceContainerId

//           // If source and target containers are different
//           if (sourceContainerId !== targetContainerId) {
//             // Find the component to move
//             const sourceContainer = containers.find((c) => c.id === sourceContainerId)
//             const componentToMove = sourceContainer?.component

//             if (componentToMove) {
//               // Remove from source container and add to target container
//               const updatedContainers = containers.map((container) => {
//                 if (container.id === sourceContainerId) {
//                   return {
//                     ...container,
//                     component: null,
//                   }
//                 }
//                 if (container.id === targetContainerId) {
//                   return {
//                     ...container,
//                     component: componentToMove,
//                   }
//                 }
//                 return container
//               })

//               setPageContainers((prev) => ({
//                 ...prev,
//                 [activePage.id]: updatedContainers,
//               }))
//             }
//           }
//         }
//         // If adding a new component from sidebar
//         else {
//           // Add the component to the container (replacing any existing component)
//           const updatedContainers = containers.map((container) => {
//             if (container.id === targetContainerId) {
//               return {
//                 ...container,
//                 component: {
//                   id: `${active.data.current.type}-${Date.now()}`,
//                   type: active.data.current.type,
//                   label: active.data.current.label,
//                   component: active.data.current.component,
//                 },
//               }
//             }
//             return container
//           })

//           setPageContainers((prev) => ({
//             ...prev,
//             [activePage.id]: updatedContainers,
//           }))
//         }
//       }
//     }
//     // If dragging a container from sidebar
//     else if (active.id === "sidebar-container") {
//       // Create a new container
//       const newContainer = {
//         id: `container-${Date.now()}`,
//         title: `Container ${containers.length + 1}`,
//         component: null,
//       }

//       // Insert at the specific position if overIndex is set
//       if (overIndex !== null) {
//         const newContainers = [...containers]
//         newContainers.splice(overIndex, 0, newContainer)

//         setPageContainers((prev) => ({
//           ...prev,
//           [activePage.id]: newContainers,
//         }))
//       } else {
//         // Otherwise append to the end
//         setPageContainers((prev) => ({
//           ...prev,
//           [activePage.id]: [...(prev[activePage.id] || []), newContainer],
//         }))
//       }
//     }

//     // Reset states
//     setOverIndex(null)
//     setActiveDroppableId(null)
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <WebsiteBuilderNavbar
//         pages={pages}
//         activePage={activePage}
//         onPageChange={handlePageChange}
//         onCreatePage={handleCreatePage}
//         onRenamePage={handleRenamePage}
//         onDeletePage={handleDeletePage}
//       />
//       <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
//         <div className="grid grid-cols-[200px_1fr_200px] overflow-hidden">
//           {/* Sidebar */}
//           <WebsiteBuilderSidebar
//             pages={pages}
//             activePage={activePage}
//             containers={containers}
//             onPageChange={handlePageChange}
//             onCreatePage={handleCreatePage}
//             onRenamePage={handleRenamePage}
//             onDeletePage={handleDeletePage}
//             onDeleteContainer={handleDeleteContainer}
//             onDeleteComponent={handleDeleteComponent}
//           />

//           {/* Canvas - Full height */}
//           <div className="border-dashed h-[100vh] no-scrollbar overflow-scroll p-4 border">
//             <CanvasDroppable
//               containers={containers}
//               overIndex={overIndex}
//               isDraggingNew={activeId === "sidebar-container"}
//               activeDroppableId={activeDroppableId}
//               onDeleteContainer={handleDeleteContainer}
//               onDeleteComponent={handleDeleteComponent}
//             />
//           </div>
//           <div>
//             <TextEditor />
//           </div>
//           {/* Drag Overlay */}
//           <DragOverlay>
//             {activeId ? (
//               activeComponent ? (
//                 <ComponentPreview
//                   type={activeComponent.type}
//                   label={activeComponent.label}
//                   component={activeComponent.component}
//                 />
//               ) : activeId === "sidebar-container" ? (
//                 <ContainerItem title="Container" isSidebar={false} />
//               ) : (
//                 <ContainerItem
//                   title={containers.find((c) => c.id === activeId)?.title || "Container"}
//                   isSidebar={false}
//                 />
//               )
//             ) : null}
//           </DragOverlay>
//         </div>
//       </DndContext>
     
//     </div>
//   )
// }
