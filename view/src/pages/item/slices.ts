import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";

interface DataState {
    data: [] | null;
    loading: boolean;
    error: string | null;
}

interface ItemState {
    items: DataState;
    item: DataState;
}

const initialState: ItemState = {
    items: { data: [], loading: false, error: null },
    item: { data: [], loading: false, error: null },
}

export const fetchItems = createAsyncThunk('item/fetchItems', async (params, { rejectWithValue }) => {
    try {
        const response = await api.get('/production/items/', { params });
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Items.');
    }
})
export const fetchItem = createAsyncThunk('item/fetchItem', async (id, { rejectWithValue }) => {
    try {
        const response = await api.get(`/production/items/${id}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to fetch Item.');
    }
})
export const updateItem = createAsyncThunk('item/updateItem', async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/production/items/${id}/`, formData)
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update the Item.')
    }
})

export const updateItems = createAsyncThunk('item/updateItems', async (_, { rejectWithValue }) => {
    try {
        const response = await api.post('/production/items/update_items/')
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'Failed to update Items.');
    }
})

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.items.loading = true;
                state.items.error = null;
                state.items.data = []

            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<[]>) => {
                state.items.loading = false;
                state.items.error = null;
                state.items.data = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.items.loading = false;
                state.items.error = action.payload || 'Unknown error';
                state.items.data = []
            })
            .addCase(fetchItem.pending, (state) => {
                state.item.loading = true;
                state.item.error = null;
                state.item.data = []

            })
            .addCase(fetchItem.fulfilled, (state, action: PayloadAction<[]>) => {
                state.item.loading = false;
                state.item.error = null;
                state.item.data = action.payload;
            })
            .addCase(fetchItem.rejected, (state, action) => {
                state.item.loading = false;
                state.item.error = action.payload || 'Unknown error';
                state.item.data = []
            })
            .addCase(updateItem.pending, (state) => {
                state.item.loading = true;
                state.item.error = null;
                state.item.data = []

            })
            .addCase(updateItem.fulfilled, (state, action: PayloadAction<[]>) => {
                state.item.loading = false;
                state.item.error = null;
                state.item.data = action.payload;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.item.loading = false;
                state.item.error = action.payload || 'Unknown error';
                state.item.data = []
            })
            .addCase(updateItems.pending, (state) => {
                state.items.loading = true;
                state.items.error = null;
                state.items.data = []

            })
            .addCase(updateItems.fulfilled, (state, action: PayloadAction<[]>) => {
                state.items.loading = false;
                state.items.error = null;
                state.items.data = action.payload;
            })
            .addCase(updateItems.rejected, (state, action) => {
                state.items.loading = false;
                state.items.error = action.payload || 'Unknown error';
                state.items.data = []
            })
    }
})

export default itemSlice.reducer;