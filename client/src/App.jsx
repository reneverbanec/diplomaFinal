import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EkipeContext } from "./context/EkipeContext";
import { MDBContainer } from "mdbreact";

import AboutUs from "./components/mainPages/AboutUs";
import Home from "./components/mainPages/Home";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Strelci from "./components/mainPages/Strelci";
import Asistence from "./components/mainPages/Asistenti";
import RazporedCelotnihTekem from "./components/mainPages/RazporedCelotnihTekem";

import Lestvica from "./components/mainPages/Lestvica";
import ListEkipe from "./components/admin/ListEkipe";
import AdminHome from "./components/admin/AdminHome";
import DodajEkipo from "./components/addComponents/DodajEkipo";
import UrediEkipo from "./components/admin/UrediEkipo";
import UrediIgralce from "./components/admin/UrediIgralce";
import UpdatePlayer from "./components/updateComponents/UpdatePlayer";
import DodajTekmo from "./components/addComponents/DodajTekmo";
import UrediRezultat from "./components/admin/UrediRezultat";
import DodajGole from "./components/addComponents/DodajGole";
import PosameznaEkipa from "./components/mainPages/PosameznaEkipa";
import PosameznaTekma from "./components/mainPages/PosameznaTekma";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Napaka from "./components/Layout/Napaka";
import Login from "./components/Layout/Login";
import axios from "axios";

const App = (props) => {
  const { isAuth, setIsAuth } = useContext(EkipeContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/vml/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBContainer fluid className="ozadje">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/onas" component={AboutUs} />
          <Route exact path="/vml/strelci" component={Strelci} />
          <Route exact path="/vml/asistence" component={Asistence} />
          <Route exact path="/vml/lestvica" component={Lestvica} />
          <Route exact path="/vml/tekme" component={RazporedCelotnihTekem} />
          <Route exact path="/vml/ekipe" component={ListEkipe} />
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
          <Route
            exact
            path="/vml/razpored/:id_match"
            component={PosameznaTekma}
          />
          <ProtectedRoute
            exact
            path="/admin"
            component={AdminHome}
            isAuth={isAuth}
          />
          <Route exact path="/login" component={Login} />
          <Route path="*" component={Napaka} />
        </Switch>
        <Footer className="fixed-bottom" />
      </Router>
    </MDBContainer>
  );
};

export default App;
