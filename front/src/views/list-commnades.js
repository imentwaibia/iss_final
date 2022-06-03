import { useState, useEffect } from "react";
import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import ErrorModel from "../models/error-model";
import SuccessModel from "../models/success-model";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import Produit from "../views/Components/produit";
import Ouvrier from "../views/Components/ouvrier";

function ListCommande() {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/commande/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingUser);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

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
                  <th>Date</th>
                  <th>Produit</th>
                  <th>Ouvrier</th>
                  <th>action </th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.date}</td>
                        <td>
                          <Produit id={item.idProduit} />
                        </td>
                        <td>
                          <Ouvrier id={item.idOuvrier} />
                        </td>

                        <td>
                          <div style={{ marginBottom: "5%" }}>
                            <Button
                              variant="success"
                              onClick={async (event) => {
                                try {
                                  let response = await fetch(
                                    `http://localhost:5000/api/commande/${item._id}`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                  let responsedata = await response.json();
                                  if (!response.ok) {
                                      seterror(responsedata.message)
                                    throw new Error(responsedata.message);
                                  }
                                  
                                  setsuccess("Commande valider");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            >
                              Valider
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={list && list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default ListCommande;
