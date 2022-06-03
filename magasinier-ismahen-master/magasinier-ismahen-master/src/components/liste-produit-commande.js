import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import {Link} from 'react-router-dom'

function ListProduitCommande(props) {
  const [list, setList] = useState([]);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  console.log(props.list.categorie)

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
          <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>nom</th>
                  <th>categorie</th>
                  <th>founisseur</th>
                  <th>poidsNet</th>
                  <th>quantite</th>
                  <th>date de fabrication</th>
                  <th>action </th>
                </tr>
              </thead>
              <tbody>
                {props.list.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.categorie}</td>
                      <td>{item.founisseur}</td>
                      <td>{item.poidsNet}</td>
                      <td>{item.quantite}</td>
                      <td>{item.dateFb}</td>

                      <td>
                        <div style={{marginBottom:'5%'}}><Button variant="danger" onClick={
                          async (event) => {
                            try {
                              let response = await fetch(
                                `http://localhost:5000/api/produit/${item._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              let responsedata = await response.json();
                              if (!response.ok) {
                                throw new Error(responsedata.message);
                              }
                              setList(
                                list.filter(
                                  (el) => el._id !== item._id
                                )
                              );
                              setsuccess("produit bien suprimer");
                            } catch (err) {
                              console.log(err);
                              seterror(err.message || "il y a un probleme");
                            }
                          }
                        }
                        >Supprimer</Button></div>
                        

                        <Link to={`/modifier/${item._id}`} ><Button variant="info">Modifier</Button></Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ListProduitCommande;
