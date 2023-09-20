import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    displayNotification(state, action) {
      console.log('in notificationSlice reducer', JSON.parse(JSON.stringify(state)), action)  
      return action.payload
    },
    clearNotification(state, action) {
      console.log('in notificationSlice reducer', JSON.parse(JSON.stringify(state)), action)
      return ''
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
