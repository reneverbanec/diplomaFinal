import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBTypography,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBIcon,
} from "mdbreact";
import EkipeFinder from "../../apis/EkipeFinder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateTeam = (props) => {
  const { id_team } = useParams();
  let history = useHistory();
  const [team_name, setTeam_name] = useState("");
  const [team_short, setTeam_short] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await EkipeFinder.get(`/ekipe/${id_team}`);

      setTeam_name(response.data.data.team.club);
      setTeam_short(response.data.data.team.shorthand);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTeam = await EkipeFinder.put(
        `/mostvo/${id_team}`,
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
      if (updatedTeam.data.error) {
        toast.error(updatedTeam.data.error.detail);
        toast.error(updatedTeam.data.error.message);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        setTimeout(() => {
          history.push("/admin/ekipa");
        }, 1700);
      }
    } catch (err) {
      console.log(err);
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
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Uredi ekipo
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form action="">
                    <div>
                      <MDBInput
                        label="Vnesi spremenjeno ime moštva"
                        group
                        icon="users"
                        type="text"
                        validate
                        id="club"
                        value={team_name}
                        onChange={(e) => setTeam_name(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi spremenjeno kratko ime moštva (3 črke)"
                        group
                        icon="angle-double-right"
                        type="text"
                        validate
                        id="shorthand"
                        value={team_short}
                        onChange={(e) => setTeam_short(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn color="info" type="submit" onClick={handleSubmit}>
                        Uredi
                        <MDBIcon icon="pen" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
};

export default withRouter(UpdateTeam);
