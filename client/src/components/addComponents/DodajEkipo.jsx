import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBContainer,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBCardFooter,
} from "mdbreact";
import React, { useContext, useState } from "react";
import DodajEkipoNaslov from "../headings/DodajEkipoNaslov";
import ListEkipe from "../admin/ListEkipe";
import EkipeFinder from "../../apis/EkipeFinder";
import { EkipeContext } from "../../context/EkipeContext";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DodajEkipo = () => {
  const { addEkipe } = useContext(EkipeContext);
  const [team_name, setTeam_name] = useState("");
  const [team_short, setTeam_short] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (team_name.length < 1 || team_short.length < 1) {
      setTeam_name("");
      setTeam_short("");
      toast.error("Vnesi podatke");
    } else {
      try {
        const response = await EkipeFinder.post(
          "/mostvo",
          {
            club: team_name,
            shorthand: team_short,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        );
        if (response.data.error) {
          toast.error(response.data.error.detail);
          toast.error(response.data.error.message);
        } else {
          addEkipe(response.data.data.mostvo);
          toast.success("Vnos je bil uspešno izveden");
          setTeam_name("");
          setTeam_short("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <MDBContainer fluid>
      <ToastContainer />
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <DodajEkipoNaslov />
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form onSubmit={handleSubmit}>
                    <MDBInput
                      label="Vnesi ime moštva"
                      icon="users"
                      group
                      className="form-control"
                      type="text"
                      maxLength="25"
                      value={team_name}
                      validate
                      onChange={(e) => setTeam_name(e.target.value)}
                    />
                    <MDBInput
                      label="Vnesi kratko ime ekipe (3 črke)"
                      icon="angle-double-right"
                      maxLength="3"
                      group
                      className="form-control"
                      validate
                      type="text"
                      value={team_short.toUpperCase()}
                      onChange={(e) => setTeam_short(e.target.value)}
                    />
                    <div className="text-center">
                      <MDBBtn type="submit" color="success">
                        Dodaj Ekipo
                        <MDBIcon icon="plus" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBRow className="m-2">
                <MDBCol>
                  <MDBTooltip placement="top">
                    <MDBBtn color="elegant">
                      <MDBIcon icon="info" className="mr-3" size="lg" />
                      Dodaj Igralca
                    </MDBBtn>
                    <div className="text-center p-3">
                      Za dodajanje igralca posamezni ekipi klikni na ime ekipe v
                      spodnji tabeli
                    </div>
                  </MDBTooltip>
                </MDBCol>
              </MDBRow>
              <ListEkipe />
            </MDBCardFooter>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default withRouter(DodajEkipo);
