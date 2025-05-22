import { createSlice } from "@reduxjs/toolkit"
import { arrayMove } from "@dnd-kit/sortable"

// Initial state
const initialState = {
    pages: [{ id: "home", name: "Home", path: "/", isDefault: true }],
    activePage: { id: "home", name: "Home", path: "/", isDefault: true },
    pageContainers: {
        outlet: false,
        home: [],
    },
    activeId: null,
    overIndex: null,
    activeComponent: null,
    activeDroppableId: null,
}

// Create the slice
export const websiteBuilderSlice = createSlice({
    name: "websiteBuilder",
    initialState,
    reducers: {
        // Set active drag item
        setActiveId: (state, action) => {
            state.activeId = action.payload
        },
        // Set over index for container insertion
        setOverIndex: (state, action) => {
            state.overIndex = action.payload
        },
        // Set active component data
        setActiveComponent: (state, action) => {
            state.activeComponent = action.payload
        },
        // Set active droppable container id
        setActiveDroppableId: (state, action) => {
            state.activeDroppableId = action.payload
        },
        // Change active page
        changePage: (state, action) => {
            state.activePage = action.payload
            if (!state.pageContainers[action.payload.id]) {
                state.pageContainers[action.payload.id] = []
            }
        },
        // Create a new page
        createPage: (state, action) => {
            const pageName = action.payload
            if (pageName.trim() === "") return
            const newId = `page-${Date.now()}`
            const newPath = `/${pageName.toLowerCase().replace(/\s+/g, "-")}`
            const newPage = {
                id: newId,
                name: pageName,
                path: newPath,
            }
            state.pages.push(newPage)
            state.activePage = newPage
            state.pageContainers[newId] = []
        },
        // Rename a page
        renamePage: (state, action) => {
            const { pageId, newName } = action.payload
            if (newName.trim() === "") return
            const newPath = `/${newName.toLowerCase().replace(/\s+/g, "-")}`
            state.pages = state.pages.map((page) =>
                page.id === pageId ? { ...page, name: newName, path: newPath } : page
            )
            if (state.activePage.id === pageId) {
                state.activePage = {
                    ...state.activePage,
                    name: newName,
                    path: newPath,
                }
            }
        },
        // Delete a page
        deletePage: (state, action) => {
            const pageId = action.payload
            if (state.pages.find((p) => p.id === pageId)?.isDefault) return
            state.pages = state.pages.filter((page) => page.id !== pageId)
            if (state.activePage.id === pageId) {
                const defaultPage = state.pages.find((p) => p.isDefault) || state.pages[0]
                state.activePage = defaultPage
            }
            delete state.pageContainers[pageId]
        },
        // Delete a container
        deleteContainer: (state, action) => {
            const containerId = action.payload
            const pageId = state.activePage.id
            state.pageContainers[pageId] = state.pageContainers[pageId].filter(
                (container) => container.id !== containerId
            )
        },
        // Delete a component from a container
        deleteComponent: (state, action) => {
            const containerId = action.payload
            const pageId = state.activePage.id
            state.pageContainers[pageId] = state.pageContainers[pageId].map((container) => {
                if (container.id === containerId) {
                    return {
                        ...container,
                        component: null,
                    }
                }
                return container
            })
        },
        // Move containers (reorder)
        moveContainers: (state, action) => {
            const { activeIndex, overIndex } = action.payload
            const pageId = state.activePage.id
            state.pageContainers[pageId] = arrayMove(
                [...state.pageContainers[pageId]],
                activeIndex,
                overIndex
            )
        },
        // Add a component to a container
        addComponentToContainer: (state, action) => {
            const { targetContainerId, component } = action.payload
            const pageId = state.activePage.id
            state.pageContainers[pageId] = state.pageContainers[pageId].map((container) => {
                if (container.id === targetContainerId) {
                    return {
                        ...container,
                        component,
                    }
                }
                return container
            })
        },
        // Move a component between containers
        moveComponentBetweenContainers: (state, action) => {
            const { sourceContainerId, targetContainerId } = action.payload
            const pageId = state.activePage.id
            const sourceContainer = state.pageContainers[pageId].find(
                (c) => c.id === sourceContainerId
            )
            const componentToMove = sourceContainer?.component
            if (componentToMove) {
                state.pageContainers[pageId] = state.pageContainers[pageId].map((container) => {
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
                })
            }
        },
        // Add a new container
        addContainer: (state, action) => {
            const { newContainer, overIndex } = action.payload
            const pageId = state.activePage.id
            if (overIndex !== null) {
                const newContainers = [...state.pageContainers[pageId]]
                newContainers.splice(overIndex, 0, newContainer)
                state.pageContainers[pageId] = newContainers
            } else {
                state.pageContainers[pageId].push(newContainer)
            }
        },
        updateComponentCode: (state, action) => {
            const { containerId, code } = action.payload;
            const pageId = state.activePage.id;

            const updateDeepestComponent = (component) => {
                if (
                    component &&
                    typeof component === "object" &&
                    component.component &&
                    typeof component.component === "object"
                ) {
                    return {
                        ...component,
                        component: updateDeepestComponent(component.component),
                    };
                }

                return {
                    ...component,
                    component: code,
                };
            };

            state.pageContainers[pageId] = state.pageContainers[pageId].map((container) => {
                if (container.id === containerId && container.component) {
                    console.log(JSON.parse(JSON.stringify(container)));
                    return {
                        ...container,
                        component: updateDeepestComponent(container.component),
                    };
                }
                return container;
            });
        },

    },
})

// Export actions
export const {
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
    updateComponentCode,
} = websiteBuilderSlice.actions

// Selectors
export const selectPages = (state) => state.websiteBuilder.pages
export const selectActivePage = (state) => state.websiteBuilder.activePage
export const selectContainers = (state) => state.websiteBuilder.pageContainers[state.websiteBuilder.activePage.id] || []
export const selectActiveId = (state) => state.websiteBuilder.activeId
export const selectOverIndex = (state) => state.websiteBuilder.overIndex
export const selectActiveComponent = (state) => state.websiteBuilder.activeComponent
export const selectActiveDroppableId = (state) => state.websiteBuilder.activeDroppableId

export default websiteBuilderSlice.reducer
