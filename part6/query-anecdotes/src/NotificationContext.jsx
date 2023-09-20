/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types';

const notificationReducer = (state, action) => {
  console.log('in notificationReducer', action)

  switch (action.type) {
    case "DISPLAY":
      return action.payload
    default:
      return ''
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}
NotificationContextProvider.propTypes = {
  children: PropTypes.any
}

export const useNotificationValue = () => {
  const [notification, _] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [_, notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export const useNotification = () => {
  const [_, notificationDispatch] = useContext(NotificationContext)

  return (message) => {
    notificationDispatch({ type: 'DISPLAY', payload: message})
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 4000);  
  }
}

export default NotificationContext
