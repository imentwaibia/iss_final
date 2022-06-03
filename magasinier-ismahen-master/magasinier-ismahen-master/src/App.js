import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./pages/login";
import NavMenu from "./components/navMenu";
import ListProduit from "./pages/listProduit";
import AjoutProduit from "./pages/ajoutProduit";
import UpdateProduit from "./pages/updateProduit";
import AjoutCommande from "./pages/commande/ajout-commande";
import Facture from "./pages/facture";
import ListCommande from "./pages/list-commnades";
import ListeCategorie from "./pages/categorie/listCategorie";

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
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact component={Login} />
        <Redirect path="/" exact component={Login}/>
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
