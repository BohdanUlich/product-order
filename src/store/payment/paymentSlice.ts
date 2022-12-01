import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TInitialState, TPaymentData } from './types'

const initialState: TInitialState = {
  formVisibility: false,
  paymentData: null,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setFormVisibility: (state) => {
      state.formVisibility = true
    },
    setPaymentData: (state, action: PayloadAction<TPaymentData>) => {
      state.paymentData = action.payload
    },
  },
})

export const { setFormVisibility, setPaymentData } = paymentSlice.actions

export default paymentSlice.reducer
