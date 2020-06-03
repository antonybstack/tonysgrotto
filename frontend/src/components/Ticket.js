import React, { useState, useRef, useContext } from "react";
import ModalEdit from "../Modals/ModalEdit";
import Profile from "./Profile";
import { OverlayTrigger, Overlay, Popover, Button, Modal, Tooltip } from "react-bootstrap";
import EditTicket from "../changeData/EditTicket";
import DeleteTicket from "../changeData/DeleteTicket";
import { useSpring, animated } from "react-spring";
import { MobileContext } from "../contexts/MobileContext.js";

//this component's purpose is for cleaner code and is used in EditTicket. EditTicket takes data from TicketContext and passes that data to this component to output the html.
const Ticket = (props) => {
  let userID = props.ticket.created_by.toString();
  const [modalShow, setModalShow] = useState(false);
  const spring = useSpring({ opacity: 1, from: { opacity: 0 } });
  let ticket = props;
  let tipPlacement = "right";
  const { windowSize } = useContext(MobileContext);

  if (props.ticket.ticket_status === "done") tipPlacement = "left";
  if (windowSize.width < 850) {
    tipPlacement = "bottom";
  }

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const useREF = useRef(null);

  console.log("Ticket");

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

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
      <OverlayTrigger placement={tipPlacement} delay={{ show: 10, hide: 50 }} overlay={renderTooltip}>
        <animated.div style={spring} className="ticky">
          <div ref={useREF} className="ticketItem" onClick={handleClick}>
            <div className="ticketName">{props.ticket.ticket_name}</div>

            <Overlay show={show} onHide={() => setShow(false)} target={target} rootClose={true} placement="bottom" container={useREF.current} containerPadding={20} key="top" placement="top">
              <Popover id="popover-positioned-top">
                <Popover.Title as="h3">options</Popover.Title>
                <Popover.Content>
                  {/* <ModalEdit ticket={props} /> */}
                  <Button
                    variant="primary"
                    data-dismiss="OverlayTrigger"
                    onClick={() => {
                      setModalShow(true);
                      setShow(false);
                    }}
                  >
                    Edit Ticket
                  </Button>
                </Popover.Content>
              </Popover>
            </Overlay>
          </div>
        </animated.div>
      </OverlayTrigger>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
  // return (
  //   <>
  //     <OverlayTrigger placement="bottom" delay={{ show: 10, hide: 50 }} overlay={renderTooltip}>
  //       <div className="ticketItem">
  //         <span>
  //           <OverlayTrigger
  //             trigger={["focus"]}
  //             key="top"
  //             placement="top"
  //             overlay={
  //               <Popover id="popover-positioned-top">
  //                 <Popover.Title as="h3">options</Popover.Title>
  //                 <Popover.Content>
  //                   {/* <ModalEdit ticket={props} /> */}
  //                   <Button variant="primary" data-dismiss="OverlayTrigger" onClick={() => setModalShow(true)}>
  //                     Edit Ticket
  //                   </Button>
  //                 </Popover.Content>
  //               </Popover>
  //             }
  //           >
  //             <animated.div style={spring}>
  //               <Button variant="secondary">{props.ticket.ticket_name}</Button>
  //             </animated.div>
  //           </OverlayTrigger>{" "}
  //         </span>
  //       </div>
  //     </OverlayTrigger>
  //     <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
  //   </>
  // );
};

export default Ticket;
