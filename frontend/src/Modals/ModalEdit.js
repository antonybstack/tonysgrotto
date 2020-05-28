import React from "react";
import Modal from "react-modal";
import EditTicket from "../changeData/EditTicket";
import DeleteTicket from "../changeData/DeleteTicket";
import { Button } from "react-bootstrap";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(44, 47, 51, 0.75)",
  },
  content: {
    paddingLeft: "75px",
    paddingRight: "75px",
    paddingBottom: "50px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "var(--dark)",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("root"));

const ModalEdit = (props) => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
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
      {/* <button className="editButton" onClick={openModal}>
        edit
      </button> */}
      <Button variant="outline-primary" onClick={openModal}>
        Edit
      </Button>{" "}
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>edit/delete</h2>
        <EditTicket value={props} />
        <div className="">
          <DeleteTicket value={props} />
          <button className="closeModal" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalEdit;
