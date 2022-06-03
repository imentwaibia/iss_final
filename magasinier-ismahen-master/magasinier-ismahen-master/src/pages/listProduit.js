import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import FournisseurDetail from "../components/fournisseur";

function ListProduit() {
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
        const response = await fetch(`http://localhost:5000/api/produit/`);

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
  }, []);

  console.log(list);

  const [searchTerm, setSearchTerm] = useState("");

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <div style={{ marginLeft: "80%" }}>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                onChange={handelSearch}
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>référence</th>
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
                {list &&
                  list
                    .filter((row) => {
                      if (searchTerm == "") {
                        return list;
                      } else if (row.name.includes(searchTerm)) {
                        return row;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.ref}</td>
                        <td>{item.name}</td>
                        <td>{item.categorie}</td>

                        <td><FournisseurDetail id={item.founisseur} /></td>

                        <td>{item.poidsNet}</td>
                        <td>{item.quantite}</td>
                        <td>{item.dateFb}</td>

                        <td>
                          <div style={{ marginBottom: "5%" }}>
                            <Button
                              variant="danger"
                              onClick={async (event) => {
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
                                    list.filter((el) => el._id !== item._id)
                                  );
                                  setsuccess("produit bien suprimer");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            >
                              Supprimer
                            </Button>
                          </div>

                          <Link to={`/modifier/${item._id}`}>
                            <Button variant="info">Modifier</Button>
                          </Link>
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

export default ListProduit;
