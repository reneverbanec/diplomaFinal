import React, { useContext, useEffect } from "react";
import { EkipeContext } from "../../context/EkipeContext";
import EkipeFinder from "../../apis/EkipeFinder";
import {
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
  MDBAnimation,
} from "mdbreact";
import { useHistory } from "react-router";

const RazporedCelotnihTekem = (props) => {
  const { razpored, setRazpored } = useContext(EkipeContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/tekme");
        setRazpored(response.data.data.tekme);
      } catch (err) {}
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameSelect = (id_match) => {
    history.push(`/vml/razpored/${id_match}`);
  };

  return (
    <MDBContainer fluid className="celoten">
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center  m-5">
                Razpored tekem
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBTable hover borderless className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Domači</th>
                    <th>D</th>
                    <th>G</th>
                    <th>Gostje</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {razpored &&
                    razpored.map((razpor) => {
                      return (
                        <tr
                          key={razpor.id_match}
                          onClick={() => handleGameSelect(razpor.id_match)}
                        >
                          <td>{razpor.date_time.substring(0, 10)}</td>
                          <td>{razpor.date_time.substring(11, 16)}</td>
                          <td>{razpor.home}</td>
                          <td>{razpor.goli1}</td>
                          <td>{razpor.goli2}</td>
                          <td>{razpor.away}</td>
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

export default RazporedCelotnihTekem;
