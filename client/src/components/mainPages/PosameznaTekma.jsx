import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBTypography,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBEdgeHeader,
  MDBAnimation,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBox,
} from "mdbreact";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EkipeFinder from "../../apis/EkipeFinder";
import { EkipeContext } from "../../context/EkipeContext";

const PosameznaTekma = () => {
  const { id_match } = useParams();
  const [tekma, setTekma] = useState([]);
  const { goalass, setGoalAss } = useContext(EkipeContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await EkipeFinder.get(`/posamezna/${id_match}`); //Pridobi katera tekma je
      setTekma(response.data.data.tekme); //nastav tekma na to

      const strelcitekem = await EkipeFinder.get(`/tekme/goli/${id_match}`);
      setGoalAss(strelcitekem.data.data.players);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBContainer fluid>
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Tekma
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5 text-center ">
                <MDBCol>
                  {tekma &&
                    tekma.map((posamezna, i) => {
                      return (
                        <MDBBox
                          tag="p"
                          className="lead font-weight-bold"
                          key={i}
                        >
                          {posamezna.home}
                        </MDBBox>
                      );
                    })}
                </MDBCol>
                <MDBCol>
                  {tekma &&
                    tekma.map((posamezna, i) => {
                      return (
                        <MDBBox
                          tag="p"
                          className="lead font-weight-bold"
                          key={i}
                        >
                          {posamezna.goli1}
                        </MDBBox>
                      );
                    })}
                </MDBCol>

                <MDBCol>
                  <MDBBox tag="p" className="lead font-weight-bold">
                    :
                  </MDBBox>
                </MDBCol>
                <MDBCol>
                  {tekma &&
                    tekma.map((posamezna, i) => {
                      return (
                        <MDBBox tag="p" className="lead font-weight-bold">
                          {posamezna.goli2}
                        </MDBBox>
                      );
                    })}
                </MDBCol>
                <MDBCol>
                  {tekma &&
                    tekma.map((posamezna, i) => {
                      return (
                        <MDBBox
                          tag="p"
                          className="lead font-weight-bold"
                          key={i}
                        >
                          {posamezna.away}
                        </MDBBox>
                      );
                    })}
                </MDBCol>
              </MDBRow>
              <MDBRow center className="m-5 text-center ">
                {tekma &&
                  tekma.map((posamezna, i) => {
                    return (
                      <MDBBox tag="p" className="lead font-weight-bold" key={i}>
                        {posamezna.date_time.substring(0, 10)}
                      </MDBBox>
                    );
                  })}
              </MDBRow>
              <MDBRow center className="m-5 text-center ">
                {tekma &&
                  tekma.map((posamezna, i) => {
                    return (
                      <MDBBox tag="p" className="lead font-weight-bold" key={i}>
                        {posamezna.date_time.substring(11, 16)}
                      </MDBBox>
                    );
                  })}
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Strelci in asistenti na tekmi
              </MDBTypography>
              <MDBTable hover bordered className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Ekipa</th>
                    <th>Goli</th>
                    <th>Asistence</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {goalass &&
                    goalass.map((posamezna, i) => {
                      return (
                        <tr key={i}>
                          <td>{posamezna.first_name}</td>
                          <td>{posamezna.last_name}</td>
                          <td>{posamezna.club}</td>
                          <td>{posamezna.goals}</td>
                          <td>{posamezna.assists}</td>
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

export default PosameznaTekma;
