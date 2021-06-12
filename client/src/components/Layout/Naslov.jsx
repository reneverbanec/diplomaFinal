import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBAnimation,
  MDBCard,
  MDBCardHeader,
  MDBTypography,
  MDBCardBody,
  MDBTableBody,
  MDBTableHead,
  MDBTable,
} from "mdbreact";

import EkipeFinder from "../../apis/EkipeFinder";
import { useHistory } from "react-router";

import slika1 from "../../img/slika1.jpg";
import slika2 from "../../img/slika2.jpg";
import slika3 from "../../img/slika3.jpg";
import slika4 from "../../img/slika4.jpg";

const Naslov = () => {
  const [zadnjiKrog, setZadnjiKrog] = useState([]);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/zadnjikrog");
        setZadnjiKrog(response.data.data.tekme);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGameSelect = (id_match) => {
    history.push(`/vml/razpored/${id_match}`);
  };

  return (
    <MDBContainer fluid className="justify-content-center">
      <MDBAnimation reveal type="zoomIn">
        <br />
        <MDBCarousel
          activeItem={1}
          length={4}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
          slide
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img className="d-block w-100" src={slika1} alt="First slide" />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src={slika2}
                  alt="Second slide"
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img className="d-block w-100" src={slika3} alt="Third slide" />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="4">
              <MDBView>
                <img
                  className="d-block w-100"
                  src={slika4}
                  alt="Fourth slide"
                />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>

        <MDBCard className="z-depth-5 mt-5 mb-5">
          <MDBCardHeader className="border-top">
            <MDBTypography tag="h1" variant="h1" className="text-center m-3">
              Rezultati zadnjih odigranih krogov
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
                {zadnjiKrog &&
                  zadnjiKrog.map((razpor) => {
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
      </MDBAnimation>
    </MDBContainer>
  );
};

export default Naslov;
