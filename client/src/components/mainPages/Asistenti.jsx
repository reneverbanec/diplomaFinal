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

const Asistence = (props) => {
  const { asistenti, setAsistenti } = useContext(EkipeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/asistence");
        setAsistenti(response.data.data.asistenti);
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
                Lestvica najboljših asistentov
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable hover borderless className="text-center  ">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Klub</th>
                    <th>Asistence</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {asistenti &&
                    asistenti.map((asistent, i) => {
                      return (
                        <tr key={i}>
                          <th scope="row">{asistent.first_name}</th>
                          <td>{asistent.last_name}</td>
                          <td>{asistent.club}</td>
                          <td>{asistent.total}</td>
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

export default Asistence;
