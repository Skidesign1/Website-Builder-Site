









import { createSlice } from "@reduxjs/toolkit"
import { arrayMove } from "@dnd-kit/sortable"

const initialState = {
    containers: [],
    activeDroppableId: null,
    overIndex: null,
    selectedContainerId: null,
}

export const containersSlice = createSlice({
    name: "containers",
    initialState,
    reducers: {
        addContainer: (state, action) => {
            const newContainer = {
                id: `container-${Date.now()}`,
                title: `Container ${state.containers.length + 1}`,
                component: null,
            }

            if (action.payload.index !== undefined) {
                state.containers.splice(action.payload.index, 0, newContainer)
            } else {
                state.containers.push(newContainer)
            }
        },

        moveContainers: (state, action) => {
            const { activeIndex, overIndex } = action.payload
            state.containers = arrayMove(state.containers, activeIndex, overIndex)
        },

        addComponentToContainer: (state, action) => {
            const { containerId, componentId, type, label } = action.payload
            const containerIndex = state.containers.findIndex((c) => c.id === containerId)

            if (containerIndex !== -1) {
                state.containers[containerIndex].component = {
                    id: `${type}-${Date.now()}`,
                    type,
                    componentId,
                    label,
                }
            }
        },

        moveComponent: (state, action) => {
            const { sourceContainerId, targetContainerId, component } = action.payload

            const sourceIndex = state.containers.findIndex((c) => c.id === sourceContainerId)
            if (sourceIndex !== -1) {
                state.containers[sourceIndex].component = null
            }

            const targetIndex = state.containers.findIndex((c) => c.id === targetContainerId)
            if (targetIndex !== -1) {
                state.containers[targetIndex].component = component
            }
        },

        setActiveDroppableId: (state, action) => {
            state.activeDroppableId = action.payload
        },

        setOverIndex: (state, action) => {
            state.overIndex = action.payload
        },

        setSelectedContainer: (state, action) => {
            state.selectedContainerId = action.payload
        },

        deleteContainer: (state, action) => {
            const containerIndex = state.containers.findIndex((c) => c.id === action.payload)
            if (containerIndex !== -1) {
                state.containers.splice(containerIndex, 1)
            }
            if (state.selectedContainerId === action.payload) {
                state.selectedContainerId = null
            }
        },

        deleteComponentFromContainer: (state, action) => {
            const containerIndex = state.containers.findIndex((c) => c.id === action.payload)
            if (containerIndex !== -1) {
                state.containers[containerIndex].component = null
            }
        },
    },
})

export const {
    addContainer,
    moveContainers,
    addComponentToContainer,
    moveComponent,
    setActiveDroppableId,
    setOverIndex,
    setSelectedContainer,
    deleteContainer,
    deleteComponentFromContainer,
} = containersSlice.actions

export default containersSlice.reducer













































import { createSlice } from "@reduxjs/toolkit"
import { arrayMove } from "@dnd-kit/sortable"

const initialState = {
    containers: [], // Array of pages
    activeDroppableId: null,
    overIndex: null,
    selectedContainerId: null,
}

export const containersSlice = createSlice({
    name: "containers",
    initialState,
    reducers: {
        // Add a new page
        addPage: (state, action) => {
            const newPage = {
                id: `page-${Date.now()}`,
                title: `Page ${state.containers.length + 1}`,
                containers: [],
            }
            state.containers.push(newPage)
        },

        // Add container to a specific page
        addContainer: (state, action) => {
            const { pageIndex, containerIndex } = action.payload
            const newContainer = {
                id: `container-${Date.now()}`,
                component: null,
            }

            const page = state.containers[pageIndex]
            if (!page) return

            if (containerIndex !== undefined) {
                page.containers.splice(containerIndex, 0, newContainer)
            } else {
                page.containers.push(newContainer)
            }
        },

        // Move containers within a page
        moveContainers: (state, action) => {
            const { pageIndex, activeIndex, overIndex } = action.payload
            const page = state.containers[pageIndex]
            if (page) {
                page.containers = arrayMove(page.containers, activeIndex, overIndex)
            }
        },

        // Add component to a container in a specific page
        addComponentToContainer: (state, action) => {
            const { pageIndex, containerId, componentId, type, label } = action.payload
            const page = state.containers[pageIndex]
            if (!page) return

            const container = page.containers.find((c) => c.id === containerId)
            if (container) {
                container.component = {
                    id: `${type}-${Date.now()}`,
                    type,
                    componentId,
                    label,
                }
            }
        },

        // Move component between containers on the same or different page
        moveComponent: (state, action) => {
            const { sourcePageIndex, sourceContainerId, targetPageIndex, targetContainerId, component } = action.payload

            const sourcePage = state.containers[sourcePageIndex]
            const targetPage = state.containers[targetPageIndex]
            if (!sourcePage || !targetPage) return

            const sourceContainer = sourcePage.containers.find((c) => c.id === sourceContainerId)
            const targetContainer = targetPage.containers.find((c) => c.id === targetContainerId)

            if (sourceContainer) sourceContainer.component = null
            if (targetContainer) targetContainer.component = component
        },

        deleteContainer: (state, action) => {
            const { pageIndex, containerId } = action.payload
            const page = state.containers[pageIndex]
            if (!page) return

            const index = page.containers.findIndex((c) => c.id === containerId)
            if (index !== -1) {
                page.containers.splice(index, 1)
            }

            if (state.selectedContainerId === containerId) {
                state.selectedContainerId = null
            }
        },

        deleteComponentFromContainer: (state, action) => {
            const { pageIndex, containerId } = action.payload
            const page = state.containers[pageIndex]
            if (!page) return

            const container = page.containers.find((c) => c.id === containerId)
            if (container) container.component = null
        },

        setActiveDroppableId: (state, action) => {
            state.activeDroppableId = action.payload
        },

        setOverIndex: (state, action) => {
            state.overIndex = action.payload
        },

        setSelectedContainer: (state, action) => {
            state.selectedContainerId = action.payload
        },
    },
})

export const {
    addPage,
    addContainer,
    moveContainers,
    addComponentToContainer,
    moveComponent,
    setActiveDroppableId,
    setOverIndex,
    setSelectedContainer,
    deleteContainer,
    deleteComponentFromContainer,
} = containersSlice.actions

export default containersSlice.reducer
