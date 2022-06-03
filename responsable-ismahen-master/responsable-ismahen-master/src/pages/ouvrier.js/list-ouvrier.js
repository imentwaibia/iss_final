import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "react-bootstrap";
import TablePagination from "@material-ui/core/TablePagination";
import BTNAdd from "../../components/btnAdd";
import { Link } from "react-router-dom";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { Form } from "react-bootstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const ListeOuvrier = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [list, setlist] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ouvrier/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setlist(responseData.ouvrier);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDep, setSearchDep] = useState("");

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const HandelSearchDep = (e) => {
    setSearchDep(e.target.value);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <div>
              <Link to="/ajout-ouvrier">
                <BTNAdd title="ajout ouvrier" />
              </Link>
            </div>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <div style={{ whiteSpace: "nowrap" }}>
              <div
                style={{
                  marginLeft: "50%",
                  marginRight: "10%",
                  display: "inline-block",
                }}
              >
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
              <div style={{ display: "inline-block" }}>
                <Form.Control
                  as="select"
                  defaultValue="Technique"
                  name="dep"
                  placeholder="Choisir le département"
                  onChange={HandelSearchDep}
                >
                  <option>Technique</option>
                  <option>Administrative</option>
                  <option>Finance</option>
                  <option>Comerciale</option>
                </Form.Control>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Nom</StyledTableCell>
                    <StyledTableCell>CIN</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Adresse</StyledTableCell>
                    <StyledTableCell align="right">Téléphone</StyledTableCell>
                    <StyledTableCell align="right">Département</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list &&
                    list
                      .filter((row) => {
                        if (searchDep == "") {
                          return list;
                        } else if (row.dep.includes(searchDep)) {
                          return row;
                        }
                      })
                      .filter((row) => {
                        if (searchTerm == "") {
                          return list;
                        } else if (row.name.includes(searchTerm)) {
                          return row;
                        }
                      })
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.cin}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.email}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.adresse}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.tel}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.dep}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Link to={`/update-ouvrier/${row._id}`}>
                              <UpdateIcon style={{ color: "green" }} />
                            </Link>

                            <DeleteForeverIcon
                              style={{ color: "red" }}
                              onClick={async (event) => {
                                try {
                                  let response = await fetch(
                                    `http://localhost:5000/api/ouvrier/${row._id}`,
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
                                  setlist(
                                    list.filter((el) => el._id !== row._id)
                                  );
                                  setsuccess("ouvrier bien suprimer");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            />
                            <Link to={`/pointage/${row._id}`}>
                              <EventAvailableIcon style={{ color: "blue" }} />
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={rows.length}
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
};

export default ListeOuvrier;
