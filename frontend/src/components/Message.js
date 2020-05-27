import React from "react";

const getStyle = (props) => {
  if (props.message.msgError) return "errorMessage";
  else return "successMessage";
};

const Message = (props) => {
  console.log(props.message.msgBody);
  return (
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
    </div>
  );
};

export default Message;
