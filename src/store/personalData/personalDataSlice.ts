import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPersonalData } from './types'

const initialState: TPersonalData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
}

export const personalDataSlice = createSlice({
  name: 'personalData',
  initialState,
  reducers: {
    setPersonalData: (state, action: PayloadAction<TPersonalData>) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.phone = action.payload.phone
    },
  },
})

export const { setPersonalData } = personalDataSlice.actions

export default personalDataSlice.reducer
