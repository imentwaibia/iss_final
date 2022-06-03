import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ListProduitFacture from "../../components/liste-produit-facture";
import FournisseurDetail from "../../components/fournisseur";
import MagasinierDetail from "../../components/magasinier";
import TablePagination from "@material-ui/core/TablePagination";

function Commande() {
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
        const response = await fetch(
          `http://localhost:5000/api/commandeExterne/`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingCommandeExterne);
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
                  <th>Prix</th>
                  <th>Founisseur</th>
                  <th>Magasinier</th>
                  <th>Produits </th>
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
                        <td>{item.prix}DT</td>
                        <td>
                          <FournisseurDetail id={item.founisseurId} />
                        </td>
                        <td>
                          <MagasinierDetail id={item.magasinierId} />
                        </td>

                        <td>
                          <ListProduitFacture id={item._id} />
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

export default Commande;
