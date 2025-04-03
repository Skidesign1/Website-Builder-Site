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

