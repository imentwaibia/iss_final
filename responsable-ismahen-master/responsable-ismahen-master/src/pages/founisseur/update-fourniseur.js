import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { useParams } from "react-router-dom";

const UpdateFournisseur = (props) => {
  const [nom, setNom] = useState();
  const [cin, setCin] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();
  const [adresse, setAdresse] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/fournisseur/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setCin(responseData.fournisseur.cin)
        setNom(responseData.fournisseur.name);
        setEmail(responseData.fournisseur.email);
        setAdresse(responseData.fournisseur.adresse);
        setTel(responseData.fournisseur.tel);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    } else if (e.target.name === "cin") {
      setCin(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(
        `http://localhost:5000/api/fournisseur/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cin:cin,
            name: nom,
            email: email,
            tel: tel,
            adresse: adresse,
          }),
        }
      );
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }
      setsuccess("fournisseur modifier avec succée");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    value={nom}
                    placeholder="Nom"
                    name="nom"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control
                  value={cin}
                    placeholder="CIN"
                    name="cin"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                  value={tel}
                  placeholder="90762489"
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Addresse</Form.Label>
                <Form.Control
                  value={adresse}
                  placeholder="Apartment, studio"
                  name="adresse"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Confirmer
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateFournisseur;
