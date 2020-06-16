import React from "react";
import { Alert } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

const getStyle = (props) => {
  if (props.message.msgError) return "errorMessage";
  else return "successMessage";
};

//error message handling
const Message = (props) => {
  if (props.message != undefined && props.message != null) {
    return (
      <>
        <div className={getStyle(props)}>{props.message.msgBody}</div>
        {props.message.msgError === false && <Spinner animation="border" variant="light" className="successSpinner" />}
      </>
    );
  } else {
    return null;
  }
};

export default Message;
