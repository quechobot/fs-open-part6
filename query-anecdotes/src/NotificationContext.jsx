import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "new":
            return `new anecdote ${action.content} added`
        case "voted":
            return `anecdote ' ${action.content} ' voted`
        case "short":
            return `too short anecdote, must have length 5 or more`
        case null: return '';
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext