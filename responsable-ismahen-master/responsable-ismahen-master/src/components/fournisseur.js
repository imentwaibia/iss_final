import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PersonIcon from "@material-ui/icons/Person";

function MyVerticallyCenteredModal(props) {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/fournisseur/${props.id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.fournisseur);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, [props.id]);
  console.log(list);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Fournisseur 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              
              <th>Nom</th>
              <th>Adresse</th>
              <th>Email</th>
              <th>Tel</th>
            </tr>
          </thead>
          <tbody>
            {list && (
              <tr>
                
                <td>{list.name}</td>
                <td>{list.adresse}</td>
                <td>{list.email}</td>
                <td>{list.tel}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const FournisseurDetail = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <PersonIcon
        onClick={() => {
          setModalShow(true);
        }}
        style={{ color: "blueviolet" }}
        fontSize="large"
        color="primary"
        fontSize="large"
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        id={props.id}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default FournisseurDetail;
