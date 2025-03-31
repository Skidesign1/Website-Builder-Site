import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    containers: [],
    activeContainer: null,
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        addContainer: (state, action) => {
            state.containers.push(action.payload);
        },
        setActiveContainer: (state, action) => {
            state.activeContainer = action.payload;
        },
        reorderContainers: (state, action) => {
            const { oldIndex, newIndex } = action.payload;
            if (oldIndex !== -1 && newIndex !== -1) {
                const movedItem = state.containers.splice(oldIndex, 1)[0];
                state.containers.splice(newIndex, 0, movedItem);
            }
        },
        deleteContainer: (state, action) => {
            state.containers = state.containers.filter((c) => c.id !== action.payload);
        },
    },
});

export const { addContainer, setActiveContainer, reorderContainers, deleteContainer } =
    canvasSlice.actions;
export default canvasSlice;
