// FlightsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Iflight } from "./types";
import axios from "axios";

interface State {
    flights: Iflight[];
    selectedFlight: Iflight | null;
    loading: boolean;
    error: string | null;
}

const initialState: State = {
    flights: [],
    selectedFlight: null,
    loading: false,
    error: null,
};

export const fetchFlights = createAsyncThunk<Iflight[]>(
    'flights/fetchFlights',
    async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights");
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
    }
    }
);

export const fetchFlightById = createAsyncThunk<Iflight, string>(
    'flights/fetchFlightById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);


export const FlightsSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlights.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlights.fulfilled, (state, action: PayloadAction<Iflight[]>) => {
                state.loading = false;
                state.flights = action.payload;
            })
            .addCase(fetchFlights.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchFlightById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFlightById.fulfilled, (state, action: PayloadAction<Iflight>) => {
                state.loading = false;
                state.selectedFlight = action.payload;
            })
            .addCase(fetchFlightById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default FlightsSlice.reducer;