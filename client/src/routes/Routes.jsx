import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { EkipeContext } from "../context/EkipeContext";

import AboutUs from "../routes/AboutUs";
import Home from "../routes/Home";

import Strelci from "../components/Strelci";
import Asistence from "../components/Asistenti";
import RazporedCelotnihTekem from "../components/RazporedCelotnihTekem";
import IgralciEkip from "../components/admin/IgralciEkip";
import TekmeKluba from "../components/admin/TekmeKluba";
import Lestvica from "../components/Lestvica";
import ListEkipe from "../components/ListEkipe";
import AdminHome from "../components/admin/AdminHome";
import DodajEkipo from "../components/addComponents/DodajEkipo";
import UrediEkipo from "../routes/UrediEkipo";
import UrediIgralce from "../routes/UrediIgralce";
import UpdatePlayer from "../components/updateComponents/UpdatePlayer";
import DodajTekmo from "../routes/DodajTekmo";
import UrediRezultat from "../components/admin/UrediRezultat";
import DodajGole from "../routes/DodajGole";
import EdgeHeaderPage from "../components/EdgeHeaderPage";
import PosameznaEkipa from "../routes/PosameznaEkipa";
import PosameznaTekma from "../routes/PosameznaTekma";
import ProtectedRoute from "../components/ProtectedRoutes";

import Login from "../components/Login";

const Routes = () => {
  const { isAuth } = useContext(EkipeContext);
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/abc" component={EdgeHeaderPage} />
      <Route exact path="/onas" component={AboutUs} />
      <Route exact path="/vml/strelci" component={Strelci} />
      <Route exact path="/vml/asistence" component={Asistence} />
      <Route exact path="/vml/lestvica" component={Lestvica} />
      <Route exact path="/vml/tekme" component={RazporedCelotnihTekem} />
      <Route exact path="/vml/igralci/:id" component={IgralciEkip} />
      <Route exact path="/vml/tekme/:id" component={TekmeKluba} />
      <Route exact path="/vml/ekipe" component={ListEkipe} />
      {/*<Route exact path="/admin" component={AdminHome} />*/}
      <ProtectedRoute
        exact
        path="/admin/ekipa"
        component={DodajEkipo}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/ekipa/:id_team/update"
        component={UrediEkipo}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/ekipa/:id_team"
        component={UrediIgralce}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/ekipa/:id_team/:id_player"
        component={UpdatePlayer}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/tekme"
        component={DodajTekmo}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/tekme/:id_match"
        component={UrediRezultat}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/admin/tekme/goli/:id_match"
        component={DodajGole}
        isAuth={isAuth}
      />
      <Route exact path="/vml/ekipa/:id_team" component={PosameznaEkipa} />
      <Route exact path="/vml/razpored/:id_match" component={PosameznaTekma} />
      <ProtectedRoute
        exact
        path="/admin"
        component={AdminHome}
        isAuth={isAuth}
      />
      <Route exact path="/login" component={Login} />
      {/*<Route path="*" component={Napaka} />*/}
    </div>
  );
};

export default Routes;
