import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filters',
  initialState, 
  reducers: {
    changeFiler(state, action) {
      console.log('in changeFiler reducer', JSON.parse(JSON.stringify(state)), action)
      return action.payload      
    }
  }
})

export const { changeFiler } = filterSlice.actions
export default filterSlice.reducer
