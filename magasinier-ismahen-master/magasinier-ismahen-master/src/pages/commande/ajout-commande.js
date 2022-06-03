import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";

function AjoutCommande() {
  const [list, setlist] = useState();
  useEffect(() => {
    const sendRequest = async () => {
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

    sendRequest();
  }, []);

  console.log(list);
  const [name, setName] = useState();
  const [categorie, setCategorie] = useState();
  const [poid, setPois] = useState();
  const [date, setDate] = useState();
  const [quantite, setQuantite] = useState();
  const [prix, setPrix] = useState();
  const [fournisseur, setFournisseur] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [prixTotal, setPrixTotal] = useState(0);

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
    } else if (e.target.name === "prix") {
      setPrix(e.target.value);
    } else {
      setFournisseur(e.target.value);
      setProduit([]);
    }
  };

  const [produit, setProduit] = useState([]);

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();

    console.log(fournisseur);

    const p = {
      name: name,
      categorie: categorie,
      poidsNet: poid,
      dateFb: date,
      quantite: quantite,
      prix: prix,
      founisseur: fournisseur,
      idMagasinier: auth.userId,
    };

    setProduit(produit.concat(p));
    setPrixTotal(prixTotal + parseInt(p.prix, 10));
    console.log(p.categorie);
    console.log(prixTotal);
    console.log(produit);
  };

  const ajoutProduixexterne = async (id) => {
    produit.map(async (el) => {
      try {
        let response = await fetch(
          "http://localhost:5000/api/produitExterne/ajout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: el.name,
              categorie: el.categorie,
              poidsNet: el.poidsNet,
              dateFb: el.dateFb,
              quantite: el.quantite,
              poidsNet: el.poidsNet,
              prix: el.prix,
              commandeExterneId: id,
            }),
          }
        );
        let responsedata = await response.json();
        if (!response.ok) {
          throw new Error(responsedata.message);
        }
      } catch (err) {
        console.log(err);
        seterror(err.message || "probleme!!");
      }
    });
  };

  const validerCommande = async (e) => {
    e.preventDefault();
    console.log(prixTotal);

    try {
      let response = await fetch(
        "http://localhost:5000/api/commandeExterne/ajout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prix: prixTotal,
            founisseurId: fournisseur,
            magasinierId: auth.userId,
          }),
        }
      );
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      let id = responsedata.commandeExterne._id;
      ajoutProduixexterne(id);
      setsuccess("Commande bien ajouter");
      setProduit([]);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  const [listCategorie, setListCategorie] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categorie/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setListCategorie(responseData.existingCategorie);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Founisseur</Form.Label>
                <Form.Control
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
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>name</Form.Label>
                  <Form.Control
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
                    as="select"
                    name="categorie"
                    onChange={onchange}
                    required
                  >
                    {listCategorie &&
                      listCategorie.map((row) => (
                        <option value={row.nom}>{row.nom}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>poid net</Form.Label>
                <Form.Control
                  placeholder="poid net"  
                  name="poid"
                  type="number"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  placeholder="prix"
                  name="prix"
                  type="number"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label> Date de fabrication </Form.Label>
                <br></br>
                <input
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
                  placeholder="Quantité"
                  name="quantite"
                  type="number"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Ajouter
              </Button>
            </Form>
            {produit && (
              <div style={{ marginTop: "50px" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>nom</th>
                      <th>categorie</th>
                      <th>founisseur</th>
                      <th>poidsNet</th>
                      <th>quantite</th>
                      <th>prix</th>
                      <th>date de fabrication</th>
                      <th>action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {produit.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.categorie}</td>
                        <td>{item.founisseur}</td>
                        <td>{item.poidsNet}</td>
                        <td>{item.quantite}</td>
                        <td>{item.prix}</td>
                        <td>{item.dateFb}</td>

                        <td>
                          <div style={{ marginBottom: "5%" }}>
                            <Button
                              variant="danger"
                              onClick={() => {
                                setProduit(produit.filter((el) => el !== item));
                                setPrixTotal(
                                  prixTotal - parseInt(item.prix, 10)
                                );
                              }}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Form onSubmit={validerCommande}>
                  <Button variant="primary" type="submit">
                    Valider la commande
                  </Button>
                </Form>
              </div>
            )}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default AjoutCommande;
