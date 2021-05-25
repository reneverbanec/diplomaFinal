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
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBCardFooter,
} from "mdbreact";
import React, { useContext, useState, useEffect } from "react";
import { EkipeContext } from "../../context/EkipeContext";
import { useHistory, withRouter } from "react-router-dom";
import EkipeFinder from "../../apis/EkipeFinder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DodajTekmo = () => {
  const { ekipe, setEkipe } = useContext(EkipeContext);
  const { tekme, setTekme } = useContext(EkipeContext);
  const { addMatches } = useContext(EkipeContext);
  const [homeID, setHomeID] = useState(0);
  const [awayID, setAwayID] = useState(0);
  const [time, setTime] = useState(undefined);
  const [date, setDate] = useState(undefined);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/ekipe");
        setEkipe(response.data.data.teams);

        const response1 = await EkipeFinder.get("/tekmedefault");
        setTekme(response1.data.data.tekme);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id_match) => {
    try {
      const response = await EkipeFinder.delete(`/tekme/${id_match}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (response.data.error) {
        toast.error(response.data.error.detail);
        toast.error(response.data.error.message);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        setTekme(
          tekme.filter((tekma) => {
            return tekma.id_match !== id_match;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await EkipeFinder.post(
        "/tekma",
        {
          id_home: homeID,
          id_away: awayID,
          date_time: date + " " + time,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      addMatches(response.data.data.tekma);
      const response1 = await EkipeFinder.get("/tekmedefault");
      setTekme(response1.data.data.tekme);

      if (response.data.error) {
        toast.error(response.data.error.detail);
        toast.error(response.data.error.message);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        if (response.data.status === "success") {
          const idTekma = response.data.data.tekma.id_match;

          const ustvariTekmo = await EkipeFinder.post(
            "/rezultat",
            {
              id_match: idTekma,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          );
          toast.success(ustvariTekmo.data.status);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGameDetail = async (id_match) => {
    history.push(`/admin/tekme/${id_match}`);
  };

  const handleGoalAssistDetail = async (id_match) => {
    history.push(`/admin/tekme/goli/${id_match}`);
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
                Dodaj Tekmo
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form action="">
                    <div className="text-center select">
                      <select
                        className="select-text"
                        name="home"
                        id="home"
                        group="form-control"
                        value={homeID}
                        onChange={(e) => setHomeID(e.target.value)}
                      >
                        <option>Izberi domačo ekipo</option>
                        {ekipe.map((ekipa) => {
                          return (
                            <option value={ekipa.id_team}>{ekipa.club}</option>
                          );
                        })}
                      </select>
                      <span className="select-highlight"></span>
                      <span className="select-bar"></span>
                      <div className="select-text">
                        <input
                          group="form-control"
                          type="date"
                          id="start"
                          name="trip-start"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        ></input>
                      </div>
                      <div className="select-text">
                        <input
                          group="form-control"
                          type="time"
                          id="time"
                          name="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        ></input>
                      </div>
                      <div className="select">
                        <select
                          className="select-text"
                          name="away"
                          id="away"
                          group="form-control"
                          value={awayID}
                          onChange={(e) => setAwayID(e.target.value)}
                        >
                          <option>Izberi gostujočo ekipo</option>
                          {ekipe.map((ekipa) => {
                            return (
                              <option value={ekipa.id_team}>
                                {ekipa.club}
                              </option>
                            );
                          })}
                        </select>
                        <span className="select-highlight"></span>
                        <span className="select-bar"></span>
                      </div>
                      <MDBBtn
                        onClick={handleSubmit}
                        type="submit"
                        color="success"
                      >
                        Dodaj Tekmo
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
                    <th>ID_MATCH</th>
                    <th>Domači</th>
                    <th>:</th>
                    <th>Gostje</th>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Izbriši</th>
                    <th>Uredi rezultat</th>
                    <th>Uredi gole in asistence</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {tekme &&
                    tekme.map((tekma) => {
                      return (
                        <tr key={tekma.id_match}>
                          <td>{tekma.id_match}</td>

                          <td>{tekma.home}</td>
                          <td>:</td>

                          <td>{tekma.away}</td>

                          <td>{tekma.date_time.substring(0, 10)}</td>
                          <td>{tekma.date_time.substring(11, 16)}</td>

                          <td>
                            <MDBBtn
                              color="danger"
                              onClick={() => handleDelete(tekma.id_match)}
                            >
                              Izbriši
                              <MDBIcon far icon="trash-alt" className="ml-2" />
                            </MDBBtn>
                          </td>
                          <td>
                            <MDBBtn
                              color="info"
                              onClick={() => handleGameDetail(tekma.id_match)}
                            >
                              Uredi rezultat{" "}
                              <MDBIcon icon="pen" className="ml-2" />
                            </MDBBtn>
                          </td>
                          <td>
                            <MDBBtn
                              color="info"
                              onClick={() =>
                                handleGoalAssistDetail(tekma.id_match)
                              }
                            >
                              Uredi gole in asistence{" "}
                              <MDBIcon icon="pen" className="ml-2" />
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

export default withRouter(DodajTekmo);
