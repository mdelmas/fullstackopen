import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log('in setNotification reducer', JSON.parse(JSON.stringify(state)), action)  
      return action.payload
    },
    clearNotification(state, action) {
      console.log('in clearNotification reducer', JSON.parse(JSON.stringify(state)), action)
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const displayNotification = (message, time) => {
  return async (dispatch) => {
    console.log('in displayNotification', message, time)
    dispatch(setNotification(message))

    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)  
  }
}

export default notificationSlice.reducer
