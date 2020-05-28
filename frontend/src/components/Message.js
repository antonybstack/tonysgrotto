import React from "react";

const getStyle = (props) => {
  if (props.message.msgError) return "errorMessage";
  else return "successMessage";
};

//error message handling
const Message = (props) => {
  console.log("Message");

  return (
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
    </div>
  );
};

export default Message;
