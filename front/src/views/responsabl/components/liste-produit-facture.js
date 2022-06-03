import React, { useState, useEffect } from "react";
import { Modal, Button,Table } from "react-bootstrap";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

function MyVerticallyCenteredModal(props) {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produitExterne/facture/${props.id}`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingProduit);
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
          Liste produits
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Categorie</th>
                  <th>poids</th>
                  <th>Date</th>
                  <th>Quantitée </th>
                  <th>Prix </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.categorie}</td>
                      <td>{item.poidsNet}Kg</td>
                      <td>{item.dateFb}</td>
                      <td>{item.quantite}</td>
                      <td>{item.prix}DT</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ListProduitFacture = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <FormatListNumberedIcon
        onClick={() => {
          setModalShow(true);
        }}
        style={{ color: "blueviolet" }}
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

export default ListProduitFacture;
