import {
  MDBContainer,
  MDBTypography,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBBox,
  MDBAnimation,
  MDBIframe,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCardHeader,
  MDBCardFooter,
} from "mdbreact";
import React from "react";

import odeon from "../../img/odeon.png";
import petrol from "../../img/petrol.png";
import maleric from "../../img/maleric.png";
import tgh from "../../img/tgh.jpg";
import apsn from "../../img/apsn.png";
import kbs from "../../img/kbš.jpg";

const AboutUs = () => {
  return (
    <MDBContainer fluid>
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography
                tag="h1"
                variant="display-1"
                className="text-justify d-flex justify-content-center"
              >
                O nas
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBContainer>
                <MDBBox
                  tag="p"
                  justifyContent="center"
                  alignContent="center"
                  className="lead text-justify"
                >
                  ŠTD, Športno turistično društvo Vinica obstaja že več kot
                  trideset let in prireja več prireditev lokalnega značaja, med
                  njimi pa so najbolj prepoznavne tradicionalni pohod po
                  Župančičevi poti, ki poteka od Dragatuša do Vinice in je na
                  sporedu v začetku meseca junija. Poleg pohoda in ostalih
                  prireditev pa prirejamo še “Poletje v Vinici”, ki je naša
                  največja prireditev in jo v vseh treh dnevih obišče več kot
                  1500 ljudi. V sklopu Poletja v Vinici pa vsako drugo leto
                  prirejamo izbor za Miss Kolpe – Kupe, ki izmenjujoče poteka na
                  slovenski in hrvaški strani že skoraj 30 let! V zadnjih letih
                  pa tudi organiziramo Viniško Malonogometno Ligo, ki privablja
                  ekipe iz celotne Bele krajine.
                </MDBBox>
                <MDBBox
                  tag="p"
                  justifyContent="center"
                  alignContent="center"
                  className="lead"
                >
                  ŠPORTNO TURISTIČNO DRUŠTVO VINICA <br />
                  Vinica 44, 8344 Vinica <br />
                  Davčna številka: 56637080 <br />
                  IBAN: SI56 6100 0001 6538 653 <br />
                </MDBBox>
              </MDBContainer>

              <MDBContainer className="border-top">
                <MDBTypography
                  tag="h5"
                  variant="display-5"
                  className="text-justify d-flex justify-content-center m-4"
                >
                  Naši sponzorji
                </MDBTypography>
                <MDBRow>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage className="img-fluid" src={odeon} waves />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>Radio Odeon</MDBCardTitle>

                        <MDBBtn href="https://www.radio-odeon.com/">
                          Obišči
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage className="img-fluid" src={petrol} waves />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>Petrol Vinica</MDBCardTitle>

                        <MDBBtn href="https://www.petrol.si/prodajna-mesta/0342-bs-vinica-bencinski-servis">
                          Obišči
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage
                        className="img-fluid p-1"
                        src={maleric}
                        waves
                      />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>KMS Malerič</MDBCardTitle>

                        <MDBBtn href="https://www.kms-inoxproizvodi.si/">
                          Obišči
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>{" "}
                <br />
                <MDBRow>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage
                        className="img-fluid w-100 h-100"
                        src={tgh}
                        waves
                      />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>TGH</MDBCardTitle>

                        <MDBBtn href="https://tgh.si/">Obišči</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage className="img-fluid " src={apsn} waves />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>APSN</MDBCardTitle>

                        <MDBBtn href="http://www.apsn.si/">Obišči</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                  <MDBCol className="d-flex justify-content-center">
                    <MDBCard className="text-center" style={{ width: "15rem" }}>
                      <MDBCardImage className="img-fluid" src={kbs} waves />
                      <MDBCardBody className="border-top">
                        <MDBCardTitle>KBŠ</MDBCardTitle>

                        <MDBBtn href="https://klub-kbs.si/">Obišči</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBContainer>
                <br />
                <MDBIframe
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1399.23401706086!2d15.25132345830262!3d45.46037492608371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4764684d93367b1d%3A0x987f4f9771e6a645!2sKrajevna%20skupnost%20Vinica!5e0!3m2!1ssl!2ssi!4v1616432200256!5m2!1ssl!2ssie"
                />
              </MDBContainer>
            </MDBCardFooter>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default AboutUs;
