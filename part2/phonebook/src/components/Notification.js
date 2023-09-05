const NotificationTypes = {
    NONE: 0,
    ERROR: 1,
    SUCCESS: 2
}

const Notification = ({ notification }) => {
    if (notification.type === NotificationTypes.NONE) return null;

    let style = {
        backgroundColor: notification.type === NotificationTypes.ERROR ? 'red' : 'green',
        color: 'white',
        fontSize: '20px',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return <div style={ style } className="notification">{ notification.message }</div> 
}

export { NotificationTypes, Notification }