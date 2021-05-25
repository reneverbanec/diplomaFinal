import React, { useContext, useEffect } from "react";
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
} from "mdbreact";

const Lestvica = () => {
  const { lestvica, setLestvica } = useContext(EkipeContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/lestvica");
        setLestvica(response.data.data.lestvica);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTeamSelect = (id_team) => {
    history.push(`/vml/ekipa/${id_team}`);
  };
  return (
    <MDBContainer fluid className="celoten">
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5 ">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Lestvica Točk
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable responsive hover borderless className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Mesto</th>
                    <th>Ekipa</th>
                    <th>Igrane</th>
                    <th>Zmage</th>
                    <th>Neodločene</th>
                    <th>Porazi</th>
                    <th>G+</th>
                    <th>G-</th>
                    <th>Gol razlika</th>
                    <th>Točke</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {lestvica &&
                    lestvica.map((el) => {
                      return (
                        <tr key={el.place}>
                          <td>{el.place}</td>
                          <td onClick={() => handleTeamSelect(el.id_team)}>
                            {el.team_name}
                          </td>
                          <td>{el.total_number_of_matches}</td>
                          <td>{el.matches_won}</td>
                          <td>{el.matches_draw}</td>
                          <td>{el.matches_lost}</td>
                          <td>{el.total_goals_scored}</td>
                          <td>{el.total_goals_conceded}</td>
                          <td>{el.goal_difference}</td>
                          <td>{el.points}</td>
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default Lestvica;
