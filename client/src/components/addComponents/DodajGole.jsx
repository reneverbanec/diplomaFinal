import React, { useContext, useState, useEffect } from "react";
import { EkipeContext } from "../../context/EkipeContext";
import { useParams, withRouter } from "react-router-dom";
import EkipeFinder from "../../apis/EkipeFinder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCardFooter,
  MDBEdgeHeader,
  MDBAnimation,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdbreact";
const DodajGole = () => {
  const { id_match } = useParams();
  const { addStrelciAsistenti } = useContext(EkipeContext);
  const [tekma, setTekma] = useState([]);
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [igralec, setIgralec] = useState(0);
  const [selected, setSelected] = useState("");
  const { goalass, setGoalAss } = useContext(EkipeContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await EkipeFinder.get(`/posamezna/${id_match}`);

      setTekma(response.data.data.tekme); //nastav tekma na to
      const domaci = await EkipeFinder.get(
        `/igralci/${response.data.data.tekme[0].domaciID}`
      );

      setHome(domaci.data.data.igralci);
      const gosti = await EkipeFinder.get(
        `/igralci/${response.data.data.tekme[0].gostiID}`
      );
      setAway(gosti.data.data.igralci);

      const strelcitekem = await EkipeFinder.get(`/tekme/goli/${id_match}`);
      setGoalAss(strelcitekem.data.data.players);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //home so domači igralci notri
  //away so gostujoči igralci notri
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };
  let type = null;
  let ekipica = null;
  let options = [];

  if (selected === "Domači") {
    type = home;
    ekipica = type[0].id_team;
  } else if (selected === "Gostje") {
    type = away;
    ekipica = type[0].id_team;
  }

  if (type) {
    options = type.map((el) => (
      <option value={el.id_player} key={el.id_player}>
        {el.id_player} {el.club} : {el.first_name} {el.last_name}
      </option>
    ));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await EkipeFinder.post(
        "/gol",
        {
          id_match: id_match,
          id_team: ekipica,
          id_player: igralec,
          goals: goals,
          assists: assists,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.data.error) {
        toast.error(response.data.error.detail);
        toast.error(response.data.error.message);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        addStrelciAsistenti(response.data.data.rezultat);
        const strelcitekem = await EkipeFinder.get(`/tekme/goli/${id_match}`);
        setGoalAss(strelcitekem.data.data.players);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id_score) => {
    try {
      const response = await EkipeFinder.delete(
        `/tekme/goli/${id_match}/${id_score}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.data.error) {
        toast.error(response.data.error.name);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        setGoalAss(
          goalass.filter((posamezna) => {
            return posamezna.id_score !== id_score;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBContainer fluid>
      <ToastContainer />
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Uredi Gole in Asistence
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form>
                    <div className="text-center select">
                      {/** Bind changeSelectOptionHandler to onChange method of select.
                       * This method will trigger every time different
                       * option is selected.
                       */}
                      <select
                        onChange={changeSelectOptionHandler}
                        className="select-text"
                      >
                        <option>Izberi ekipo</option>
                        <option>Domači</option>
                        <option>Gostje</option>
                      </select>
                      <span className="select-highlight"></span>
                      <span className="select-bar"></span>
                    </div>
                    <div className="text-center select">
                      <select
                        className="select-text"
                        name="ekipa"
                        id="ekipa"
                        group="form-control"
                        value={igralec}
                        onChange={(e) => setIgralec(e.target.value)}
                      >
                        <option>Izberi igralca</option>
                        {
                          /** This is where we have used our options variable */
                          options
                        }
                      </select>
                      <span className="select-highlight"></span>
                      <span className="select-bar"></span>
                      <MDBInput
                        label="Vnesi številko golov"
                        group
                        type="number"
                        validate
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi število asistenc"
                        group
                        type="number"
                        validate
                        value={assists}
                        onChange={(e) => setAssists(e.target.value)}
                      />

                      <MDBBtn
                        onClick={handleSubmit}
                        type="submit"
                        color="success"
                      >
                        Dodaj Gole / Asistence
                        <MDBIcon icon="plus" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBTable hover bordered className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>id_match</th>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Domači</th>
                    <th></th>
                    <th>:</th>
                    <th></th>
                    <th>Gostje</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {tekma &&
                    tekma.map((posamezna) => {
                      return (
                        <tr key={posamezna.id_match}>
                          <td>{posamezna.id_match}</td>
                          <td>{posamezna.date_time.substring(0, 10)}</td>
                          <td>{posamezna.date_time.substring(11, 16)}</td>
                          <td>{posamezna.home}</td>
                          <td>{posamezna.goli1}</td>
                          <td>:</td>
                          <td>{posamezna.goli2}</td>
                          <td>{posamezna.away}</td>
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
              <MDBTable hover bordered className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>id_score</th>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Ekipa</th>
                    <th>Goli</th>
                    <th>Asistence</th>
                    <th>Izbriši</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {goalass &&
                    goalass.map((posamezna) => {
                      return (
                        <tr key={posamezna.id_score}>
                          <td>{posamezna.id_score}</td>
                          <td>{posamezna.first_name}</td>
                          <td>{posamezna.last_name}</td>
                          <td>{posamezna.club}</td>
                          <td>{posamezna.goals}</td>
                          <td>{posamezna.assists}</td>
                          <td>
                            <MDBBtn
                              color="danger"
                              onClick={() => handleDelete(posamezna.id_score)}
                            >
                              Izbriši
                              <MDBIcon far icon="trash-alt" className="ml-2" />
                            </MDBBtn>
                          </td>
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </MDBCardFooter>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default withRouter(DodajGole);
