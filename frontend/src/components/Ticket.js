import React from "react";
import ModalEdit from "../Modals/ModalEdit";
import Profile from "./Profile";
import { OverlayTrigger, Popover, Button, Modal, Tooltip } from "react-bootstrap";
import EditTicket from "../changeData/EditTicket";
import DeleteTicket from "../changeData/DeleteTicket";

//this component's purpose is for cleaner code and is used in EditTicket. EditTicket takes data from TicketContext and passes that data to this component to output the html.
const Ticket = (props) => {
  let userID = props.ticket.created_by.toString();
  const [modalShow, setModalShow] = React.useState(false);
  let ticket = props;

  console.log("Ticket");

  //once editticket is submitted, callback function is executed to close modal
  const editTicketHandler = () => {
    setModalShow(false);
  };

  function MyVerticallyCenteredModal(props) {
    let prop = {
      props,
      ticket,
    };
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{ticket.ticket.ticket_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditTicket value={prop} action={editTicketHandler} />
        </Modal.Body>
        <Modal.Footer>
          <DeleteTicket value={prop} action={editTicketHandler} />
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function renderTooltip(props) {
    return (
      <Tooltip id="button-tooltip" {...props}>
        <Profile userID={userID} />
      </Tooltip>
    );
  }

  return (
    <>
      <OverlayTrigger placement="bottom" delay={{ show: 10, hide: 50 }} overlay={renderTooltip}>
        <div className="ticketItem">
          <span>
            <OverlayTrigger
              trigger={["focus"]}
              key="top"
              placement="top"
              overlay={
                <Popover id="popover-positioned-top">
                  <Popover.Title as="h3">options</Popover.Title>
                  <Popover.Content>
                    {/* <ModalEdit ticket={props} /> */}
                    <Button variant="primary" data-dismiss="OverlayTrigger" onClick={() => setModalShow(true)}>
                      Edit Ticket
                    </Button>
                  </Popover.Content>
                </Popover>
              }
            >
              <Button variant="secondary">{props.ticket.ticket_name}</Button>
            </OverlayTrigger>{" "}
          </span>
        </div>
      </OverlayTrigger>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Ticket;
