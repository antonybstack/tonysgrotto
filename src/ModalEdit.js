import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import EditTicket from "./addData/EditTicket";
import DeleteTicket from "./addData/DeleteTicket";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("root"));

const ModalEdit = (props) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // console.log(props);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="editButton" onClick={openModal}>
        edit/delete
      </button>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>edit/delete</h2>
        <EditTicket value={props} />
        <DeleteTicket value={props} />
        <button className="closeModal" onClick={closeModal}>
          close
        </button>
      </Modal>
    </div>
  );
};

export default ModalEdit;
