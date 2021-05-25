import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBTypography,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
} from "mdbreact";
import EkipeFinder from "../../apis/EkipeFinder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePlayer = (props) => {
  const { id_team } = useParams();
  const { id_player } = useParams();
  let history = useHistory();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [kit, setKit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await EkipeFinder.get(`/ekipe/${id_team}/${id_player}`);

      setFirst_name(response.data.data.player.first_name);
      setLast_name(response.data.data.player.last_name);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlayer = await EkipeFinder.put(
      `/mostvo/${id_team}/${id_player}`,
      {
        first_name: first_name,
        last_name: last_name,
        kit: kit,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    if (updatedPlayer.data.error) {
      toast.error(updatedPlayer.data.error.detail);
      toast.error(updatedPlayer.data.error.message);
    } else {
      toast.success("Vnos je bil uspešno izveden");
      setTimeout(() => {
        history.push(`/admin/ekipa/${id_team}`);
      }, 1700);
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
                Uredi igralca
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form action="">
                    <div className="">
                      <MDBInput
                        label="Vnesi ime"
                        group
                        type="text"
                        validate
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi priimek"
                        group
                        type="text"
                        validate
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                      />{" "}
                      <MDBInput
                        label="Vnesi številko dresa"
                        group
                        type="number"
                        validate
                        value={kit}
                        onChange={(e) => setKit(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={handleSubmit} type="submit" color="info">
                        Uredi Igralca
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

export default withRouter(UpdatePlayer);
