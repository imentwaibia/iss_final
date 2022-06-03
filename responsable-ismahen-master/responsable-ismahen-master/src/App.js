import React from "react";
import { Route, BrowserRouter,Redirect } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./pages/login";
import ListeOuvrier from "./pages/ouvrier.js/list-ouvrier";
import DrawerMenu from "./components/drawerMenu";
import AjoutOuvrier from "./pages/ouvrier.js/ajout-ouvrier";
import UpdateOuvrier from "./pages/ouvrier.js/update-ouvrier";
import ListeMagasinier from "./pages/magasinier/liste-magasinier";
import AjoutMagasinier from "./pages/magasinier/ajout-magasinier";
import UpdateMagasinier from "./pages/magasinier/update-magasinier";
import ListeFournisseur from "./pages/founisseur/liste-forniseur";
import AjoutFournisseur from "./pages/founisseur/ajout-fourniseur";
import UpdateFournisseur from "./pages/founisseur/update-fourniseur";
import Pointage from "./pages/pointage/list";
import Commande from "./pages/commande/Commande";
import ChartsPage from "./pages/chart";

function App() {
  const { userId, token, login, logout } = UserAuth();
  let routes;
  if (token) {
    routes = (
      <React.Fragment>
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
        <Route path="/" exact component={Login} />
        <Redirect path="/" exact component={Login} />
      </React.Fragment>
    );
  }
  return (
    <div>
      <Authcontext.Provider
        value={{ userId: userId, token: token, login: login, logout: logout }}
      >
        <BrowserRouter>
          {token && <DrawerMenu content={routes} />}
          {!token && routes}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
