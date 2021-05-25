import {
  MDBContainer,
  MDBTypography,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBCardFooter,
} from "mdbreact";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import EkipeFinder from "../../apis/EkipeFinder";
import { EkipeContext } from "../../context/EkipeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UrediIgralce = () => {
  const { id_team } = useParams();
  let history = useHistory();
  const { selectedTeam, setSelectedTeam } = useContext(EkipeContext);
  const { igralci, setIgralci } = useContext(EkipeContext);

  const { addPlayers } = useContext(EkipeContext);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [kit, setKit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get(`/ekipe/${id_team}`);
        setSelectedTeam(response.data.data.team);

        const players = await EkipeFinder.get(`/igralci/${id_team}`);
        setIgralci(players.data.data.igralci);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (first_name.length < 1 || last_name.length < 1) {
      setFirst_name("");
      setLast_name("");
      toast.error("Vnesi podatke");
    } else {
      try {
        const response = await EkipeFinder.post(
          "/igralec",
          {
            id_team: id_team,
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
        if (response.data.error) {
          toast.error(response.data.error.detail);
          toast.error(response.data.error.message);
        } else {
          toast.success("Vnos je bil uspešno izveden");
          addPlayers(response.data.data.igralec);

          setFirst_name("");

          setLast_name("");
          setKit(0);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (id_team, id_player) => {
    try {
      const response = await EkipeFinder.delete(
        `/mostvo/${id_team}/${id_player}`,
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
        toast.success("Vnos je bil uspešno izveden");
        setIgralci(
          igralci.filter((igralec) => {
            return igralec.id_player !== id_player;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id_team, id_player) => {
    history.push(`/admin/ekipa/${id_team}/${id_player}`);
  };

  return (
    <MDBContainer fluid>
      <ToastContainer />
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography
                tag="h1"
                variant="display-1"
                className="text-center  m-5"
              >
                {selectedTeam && selectedTeam.club}
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="">
                      <MDBInput
                        label="Vnesi ime"
                        icon="user"
                        group
                        type="text"
                        validate
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi priimek"
                        group
                        icon="user"
                        type="text"
                        validate
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                      />{" "}
                      <MDBInput
                        label="Vnesi številko dresa"
                        group
                        min="0"
                        max="99"
                        icon="sort-numeric-up-alt"
                        type="number"
                        validate
                        value={kit}
                        onChange={(e) => setKit(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn type="submit" color="success">
                        Dodaj Igralca
                        <MDBIcon icon="plus" className="ml-2" />
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter>
              <MDBTable hover bordered className="text-center">
                <MDBTableHead color="primary-color-dark" textWhite>
                  <tr>
                    <th>ID Igralca</th>
                    <th>Ime</th>
                    <th>Priimek</th>
                    <th>Številka dresa</th>
                    <th>Uredi</th>
                    <th>Izbriši</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {igralci &&
                    igralci.map((igralec) => {
                      return (
                        <tr>
                          <td>{igralec.id_player}</td>
                          <td>{igralec.first_name}</td>
                          <td>{igralec.last_name}</td>
                          <td>{igralec.kit}</td>
                          <td>
                            <MDBBtn
                              color="info"
                              onClick={() =>
                                handleUpdate(igralec.id_team, igralec.id_player)
                              }
                            >
                              Uredi
                              <MDBIcon icon="pen" className="ml-2" />
                            </MDBBtn>
                          </td>
                          <td>
                            <MDBBtn
                              color="danger"
                              onClick={() =>
                                handleDelete(igralec.id_team, igralec.id_player)
                              }
                            >
                              Izbriši
                              <MDBIcon far icon="trash-alt" className="ml-2" />
                            </MDBBtn>
                          </td>
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

export default withRouter(UrediIgralce);
