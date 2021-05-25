import React, { useContext, useEffect } from "react";
import { EkipeContext } from "../../context/EkipeContext";
import EkipeFinder from "../../apis/EkipeFinder";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
  MDBAnimation,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
} from "mdbreact";

const Strelci = (props) => {
  const { ekipe, setEkipe } = useContext(EkipeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/strelci");
        setEkipe(response.data.data.strelci);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MDBContainer fluid className="celoten">
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center  m-5">
                Lestvica najboljših strelcev
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable hover borderless className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Klub</th>
                    <th>Goli</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {ekipe &&
                    ekipe.map((ekipa, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{ekipa.first_name}</th>
                          <td>{ekipa.last_name}</td>
                          <td>{ekipa.club}</td>
                          <td>{ekipa.total}</td>
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

export default Strelci;
