import "./Notification.css"

const Notification = ({ notif }) => {
  if (notif === null) return null



  const classes = notif.isError ? "notif error" : "notif noError"
  return (
    <div className={classes}>
      {notif.msg}
    </div>
  )

}

export default Notification
