import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EkipeContext } from "../../context/EkipeContext";
import EkipeFinder from "../../apis/EkipeFinder";
import { useHistory } from "react-router-dom";
import {
  MDBAnimation,
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBRow,
} from "mdbreact";

const PosameznaEkipa = () => {
  const { id_team } = useParams();
  const { lestvica, setLestvica } = useContext(EkipeContext);
  const [games, setGames] = useState([]);
  const [igralci, setIgralci] = useState([]);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //dobi lestvico za izpis točk..
        const response = await EkipeFinder.get("/lestvica");
        setLestvica(response.data.data.lestvica);

        //dobi tekme ekipe
        const response1 = await EkipeFinder.get(`/tekme/${id_team}`);
        setGames(response1.data.data.tekme);

        //dobi igralce ekipe
        const players = await EkipeFinder.get(`/igralci/${id_team}`);
        setIgralci(players.data.data.igralci);
      } catch (err) {}
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let izpis = null;

  for (let index = 0; index < lestvica.length; index++) {
    // eslint-disable-next-line eqeqeq
    if (lestvica[index].id_team == id_team) {
      izpis = lestvica[index];
    }
  }

  const handleRazpored = () => {
    history.push("/vml/tekme");
  };

  return (
    <MDBContainer fluid>
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography
                tag="h1"
                variant="h1"
                className="text-center m-5 font-weight-bold"
              >
                {izpis.team_name}
              </MDBTypography>
              <hr />
              <MDBRow center className="m-5 ">
                <MDBCol className="d-flex justify-content-center">
                  <MDBCard className="text-center " style={{ width: "15rem" }}>
                    <MDBCardHeader color="indigo">Mesto</MDBCardHeader>
                    <MDBCardBody>{izpis.place}</MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow center className="m-5">
                <MDBCol className="d-flex justify-content-center">
                  <MDBCard
                    className="text-center m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Zmage</MDBCardHeader>
                    <MDBCardBody>{izpis.matches_won}</MDBCardBody>
                  </MDBCard>
                  <MDBCard
                    className="text-center  m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Neodločene</MDBCardHeader>
                    <MDBCardBody>{izpis.matches_draw}</MDBCardBody>
                  </MDBCard>
                  <MDBCard
                    className="text-center  m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Porazi</MDBCardHeader>
                    <MDBCardBody>{izpis.matches_lost}</MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBRow center className="m-5">
                <MDBCol className="d-flex justify-content-center">
                  <MDBCard
                    className="text-center  m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Goli +</MDBCardHeader>
                    <MDBCardBody>{izpis.total_goals_scored}</MDBCardBody>
                  </MDBCard>
                  <MDBCard
                    className="text-center m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Gol Razlika</MDBCardHeader>
                    <MDBCardBody>{izpis.goal_difference}</MDBCardBody>
                  </MDBCard>
                  <MDBCard
                    className="text-center m-2"
                    style={{ width: "15rem" }}
                  >
                    <MDBCardHeader color="indigo">Goli -</MDBCardHeader>
                    <MDBCardBody>{izpis.total_goals_conceded}</MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTypography tag="h1" variant="h1" className="text-center m-2">
                Tekme ekipe
              </MDBTypography>
              <MDBTable hover bordered className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Domači</th>
                    <th> </th>
                    <th>:</th>
                    <th> </th>
                    <th>Gostje</th>
                    <th>Datum</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {games &&
                    games.map((tekma) => {
                      return (
                        <tr
                          key={tekma.id_match}
                          onClick={() => handleRazpored()}
                        >
                          <td>{tekma.home}</td>
                          <td>{tekma.goli1}</td>
                          <td>:</td>
                          <td>{tekma.goli2}</td>
                          <td>{tekma.away}</td>
                          <td>{tekma.date_time.substring(0, 10)}</td>{" "}
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
            <MDBCardFooter className="mb-5">
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Igralci
              </MDBTypography>
              <MDBCol className="d-flex justify-content-center">
                {igralci &&
                  igralci.map((igr, i) => {
                    return (
                      <MDBCard
                        className="text-center m-2"
                        style={{ width: "15rem" }}
                        key={i}
                      >
                        <MDBCardHeader>
                          {igr.first_name} <br /> {igr.last_name}
                        </MDBCardHeader>
                        <MDBCardBody>
                          Številka <br />
                          {igr.kit}
                        </MDBCardBody>
                      </MDBCard>
                    );
                  })}
              </MDBCol>
            </MDBCardFooter>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default PosameznaEkipa;
