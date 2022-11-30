import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDeliveryDates } from './deliveryDateAPI'
import { TDeliveryDate, TInitialState, TSelectedDate } from './types'

const initialState: TInitialState = {
  deliveryDates: [],
  selectedDate: null,
  selectedStore: null,
  loading: false,
}

export const availableDateSlice = createSlice({
  name: 'availableDate',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<TSelectedDate>) => {
      state.selectedDate = action.payload
    },
    setSelectedStore: (state, action: PayloadAction<string>) => {
      state.selectedStore = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryDates.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDeliveryDates.fulfilled, (state, action: PayloadAction<TDeliveryDate[]>) => {
        state.deliveryDates = action.payload
        state.loading = false
      })
      .addCase(fetchDeliveryDates.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setSelectedDate, setSelectedStore } = availableDateSlice.actions

export default availableDateSlice.reducer
