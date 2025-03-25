import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import final from '../lib/db';

export const fetchComponents = createAsyncThunk(
    'counter/fetchValue',
    async () => {
        const response = await final(); // Assuming final() is an API call that returns a value
        return response;
    }
);

const initialState = {
    canvasComponents: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    final: []
};

const component = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        canvasMountComponent(state, action) {
            state.canvasComponents = [...state.canvasComponents, action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComponents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComponents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.final = action.payload;
            })
            .addCase(fetchComponents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});
export const { canvasMountComponent } = component.actions
export default component.reducer;
