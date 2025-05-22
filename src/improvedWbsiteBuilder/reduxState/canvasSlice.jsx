import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  canvasSize: [1280, 720], // Default size
  activeDevice: "desktop", // Default device
  selectedResolution: "1280x720", // Default resolution string
}

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvasSize: (state, action) => {
      state.canvasSize = action.payload
      // Update the selected resolution string when canvas size changes
      state.selectedResolution = `${action.payload[0]}x${action.payload[1]}`
    },
    setActiveDevice: (state, action) => {
      state.activeDevice = action.payload
    },
    setSelectedResolution: (state, action) => {
      state.selectedResolution = action.payload
    },
    resetCanvas: (state) => {
      return initialState
    },
  },
})

export const { setCanvasSize, setActiveDevice, setSelectedResolution, resetCanvas } = canvasSlice.actions

export default canvasSlice.reducer
