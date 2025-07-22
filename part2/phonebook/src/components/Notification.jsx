const Notification = ({ message, errorStyle }) => {
  const confirmedStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const styleType = errorStyle ? errStyle : confirmedStyle;

  if (message === null) {
    return null;
  }

  return <div style={styleType}>{message}</div>;
};

export default Notification;
