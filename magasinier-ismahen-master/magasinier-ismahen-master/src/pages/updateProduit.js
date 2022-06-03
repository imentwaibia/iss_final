import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import { useParams } from "react-router-dom";

function UpdateProduit() {
  const [list, setlist] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/produit/${id}`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setName(responseData.produit.name);
        setCategorie(responseData.produit.categorie);
        setPois(responseData.produit.poidsNet);
        setDate(responseData.produit.dateFb);
        setQuantite(responseData.produit.quantite);
        setFournisseur(responseData.produit.founisseur);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();

    const sendRequest1 = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fournisseur/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setlist(responseData.fournisseur);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest1();
  }, []);
  const [name, setName] = useState();
  const [categorie, setCategorie] = useState();
  const [poid, setPois] = useState();
  const [date, setDate] = useState();
  const [quantite, setQuantite] = useState();
  const [fournisseur, setFournisseur] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "categorie") {
      setCategorie(e.target.value);
    } else if (e.target.name === "poid") {
      if (e.target.value < 1 || e.target.value > 100) {
        seterror("Pois invalid!");
      } else {
        setPois(e.target.value);
        seterror(null);
      }
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    } else if (e.target.name === "quantite") {
      setQuantite(e.target.value);
    } else {
      setFournisseur(e.target.value);
    }
  };

  const auth = useContext(Authcontext);
  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`http://localhost:5000/api/produit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          categorie: categorie,
          poidsNet: poid,
          dateFb: date,
          quantite: quantite,
          founisseur: fournisseur,
          idMagasinier: auth.userId,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Produit bien modifier");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>name</Form.Label>
                  <Form.Control
                    value={name}
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>catégorie</Form.Label>
                  <Form.Control
                    value={categorie}
                    type="text"
                    placeholder="catégorie"
                    name="categorie"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>poid net</Form.Label>
                <Form.Control
                  value={poid}
                  placeholder="poid net"
                  name="poid"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label> Date de fabrication </Form.Label>
                <br></br>
                <input
                  value={date}
                  type="date"
                  id="start"
                  name="date"
                  min="2010-01-01"
                  max="2021-12-31"
                  name="date"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  value={quantite}
                  placeholder="Quantité"
                  name="quantite"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Founisseur</Form.Label>
                <Form.Control
                  value={fournisseur}
                  as="select"
                  name="fournisseur"
                  onChange={onchange}
                  required
                >
                  {list &&
                    list.map((row) => (
                      <option value={row._id}>{row.name}</option>
                    ))}
                </Form.Control>{" "}
              </Form.Group>

              <Button variant="primary" type="submit">
                Modifier
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default UpdateProduit;
