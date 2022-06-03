import { Route, BrowserRouter,Redirect } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import React from "react";
import Components from "views/Components/Components.js";
import NavMenu from "views/Components/navMenu";
import LoginPage from "views/LoginPage/LoginPage.js";
import Login from "views/login";
import ListeCategorie from "views/categorie/listCategorie";
import ListProduit from "views/listProduit";
import AjoutProduit from "views/ajoutProduit";
import UpdateProduit from "views/updateProduit";
import AjoutCommande from "views/commande/ajout-commande";
import Facture from "views/facture";
import ListCommande from "views/list-commnades";
import ChartsPage from "views/responsabl/chart";
import ListeOuvrier from "views/responsabl/ouvrier.js/list-ouvrier";
import UpdateOuvrier from "views/responsabl/ouvrier.js/update-ouvrier";
import ListeMagasinier from "views/responsabl/magasinier/liste-magasinier";
import AjoutMagasinier from "views/responsabl/magasinier/ajout-magasinier";
import UpdateMagasinier from "views/responsabl/magasinier/update-magasinier";
import ListeFournisseur from "views/responsabl/founisseur/liste-forniseur";
import AjoutFournisseur from "views/responsabl/founisseur/ajout-fourniseur";
import UpdateFournisseur from "views/responsabl/founisseur/update-fourniseur";
import Pointage from "views/responsabl/pointage/list";
import Commande from "views/responsabl/commande/Commande";
import AjoutOuvrier from "views/responsabl/ouvrier.js/ajout-ouvrier";
function App() {
  const { userId, token, login, logout } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={ListProduit} />
        <Route path="/ajoutProduit" component={AjoutProduit} />
        <Route path="/modifier/:id" component={UpdateProduit} />
        <Route path="/ajout-commande" component={AjoutCommande} />
        <Route path="/facture" component={Facture} />
        <Route path="/commande" component={ListCommande} />
        <Route path="/categorie" component={ListeCategorie} />
        <Route path="/" exact component={ChartsPage} />
        <Route path="/ouvrier"  component={ListeOuvrier} />
        <Route path="/ajout-ouvrier" component={AjoutOuvrier} />
        <Route path="/update-ouvrier/:id" component={UpdateOuvrier} />
        <Route path="/liste-magasinier" component={ListeMagasinier} />
        <Route path="/ajout-magasinier" component={AjoutMagasinier} />
        <Route path="/update-magasinier/:id" component={UpdateMagasinier} />
        <Route path="/liste-fournisseur" component={ListeFournisseur} />
        <Route path="/ajout-fournisseur" component={AjoutFournisseur} />
        <Route path="/update-fournisseur/:id" component={UpdateFournisseur} />
        <Route path="/pointage/:id" component={Pointage} />
        <Route path="/commande" component={Commande} />
      </React.Fragment>
    );

     } else {
    routes = (
      <React.Fragment>
        <Route path="/login-Page" exact component={LoginPage} />
        <Route path="/login" exact component={Login}/>
        <Route path="/" exact component={Components} />
      </React.Fragment>
    );
  }
  
  return (
    <Authcontext.Provider
    value={{ userId: userId, token: token, login: login, logout: logout }}
  >
    <BrowserRouter>
      {token && <NavMenu></NavMenu>}
      {routes}
    </BrowserRouter>
  </Authcontext.Provider>
  );
}
export default App;
