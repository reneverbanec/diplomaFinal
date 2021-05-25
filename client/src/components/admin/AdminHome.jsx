import {
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBCardFooter,
  MDBBtn,
} from "mdbreact";
import React, { useContext } from "react";
import { EkipeContext } from "../../context/EkipeContext";
import { Link } from "react-router-dom";
import Statistika from "./Statistika";
import { withRouter, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHome = () => {
  let history = useHistory();
  const { setIsAuth } = useContext(EkipeContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      toast.success("Uspešna odjava");
      setTimeout(() => {
        setIsAuth(false);
        localStorage.removeItem("accessToken");
        history.push("/");
      }, 1700);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBContainer fluid className="celoten">
      <ToastContainer />
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5 ">
            <MDBCardHeader className="align-items-center justify-content-center text-center">
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Nadzorna plošča administratorja
              </MDBTypography>
              <MDBBtn color="secondary" onClick={handleLogout} className="mb-5">
                Odjavi se
              </MDBBtn>
            </MDBCardHeader>
            <MDBCardBody className="align-items-center justify-content-center text-center">
              <MDBTypography tag="h2" variant="h2" className="text-center m-5">
                Statistični podatki
              </MDBTypography>
              <Statistika />
            </MDBCardBody>
            <MDBCardFooter className="align-items-center justify-content-center text-center">
              <MDBTypography tag="h2" variant="h2" className="text-center m-5">
                Urejaj Podatke
              </MDBTypography>
              <MDBListGroup className="p-2 ">
                <MDBListGroupItem hover>
                  <Link to="/admin/tekme">Dodaj Tekmo/Rezultat</Link>
                </MDBListGroupItem>

                <MDBListGroupItem hover>
                  <Link to="/admin/ekipa">Dodaj Ekipo/Igralca</Link>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardFooter>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default withRouter(AdminHome);
