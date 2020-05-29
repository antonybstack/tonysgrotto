import React from "react";
import { Alert } from "react-bootstrap";

const getStyle = (props) => {
  // if (props.message.msgError) return "errorMessage";
  // else return "successMessage";
};

//error message handling
const Message = (props) => {
  console.log("Message");

  return (
    <span className="alert1">
      <Alert variant="danger">{props.message.msgBody ? props.message.msgBody : null}</Alert>
    </span>
  );
};

export default Message;
