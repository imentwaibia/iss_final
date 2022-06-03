import { useContext } from "react";
import React from "react";
import {Navbar, Nav, Form , FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Authcontext} from '../../context/auth-context'

function NavMenu() {
  const auth = useContext(Authcontext)
  const logout =()=>{
    auth.logout()
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/" style={{textDecoration:'none'}}>
        <Nav.Link href="/">Liste produit</Nav.Link>
        </Link>
        <Link to="/ajoutProduit" style={{textDecoration:'none'}}>
        <Nav.Link href="/ajoutProduit">Ajout produit</Nav.Link>
        </Link>
        <Link to="/ajout-commande" style={{textDecoration:'none'}}>
        <Nav.Link href="/ajout-commande">Ajout une commande</Nav.Link>
        </Link>

        <Link to="/facture" style={{textDecoration:'none'}}>
        <Nav.Link href="/facture">Nos factures</Nav.Link>
        </Link>

        <Link to="/commande" style={{textDecoration:'none'}}>
        <Nav.Link href="/commande">Commande interne</Nav.Link>
        </Link>

        <Link to="/categorie" style={{textDecoration:'none'}}>
        <Nav.Link href="/categorie">Categorie produit</Nav.Link>
        </Link>
        
      </Nav>
      <Button variant="light" onClick={()=>logout()}>Logout</Button>
    </Navbar>
  );
}

export default NavMenu;
