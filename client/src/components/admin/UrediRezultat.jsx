import {
  MDBContainer,
  MDBTypography,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBEdgeHeader,
  MDBFreeBird,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBAnimation,
  MDBCardFooter,
  MDBRow,
  MDBCol,
} from "mdbreact";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import EkipeFinder from "../../apis/EkipeFinder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UrediRezultat = () => {
  const { id_match } = useParams();
  const [tekma, setTekma] = useState([]);
  let history = useHistory();
  const [rez1, setRez1] = useState(null);
  const [rez2, setRez2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await EkipeFinder.get(`/posamezna/${id_match}`);
      setTekma(response.data.data.tekme);
      setRez1(response.data.data.tekme[0].goli1);
      setRez2(response.data.data.tekme[0].goli2);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMatch = await EkipeFinder.put(
      `/rezultat/${id_match}`,
      {
        home: rez1,
        away: rez2,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    if (updatedMatch.data.error) {
      toast.error(updatedMatch.data.error.detail);
      toast.error(updatedMatch.data.error.message);
    } else {
      toast.success("Vnos je bil uspešno izveden");
      history.push("/admin/tekme");
    }
  };

  const handleDelete = async (id_match) => {
    try {
      const response = await EkipeFinder.delete(`/rezultat/${id_match}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (response.data.error) {
        toast.error(response.data.error.detail);
        toast.error(response.data.error.message);
      } else {
        toast.success("Vnos je bil uspešno izveden");
        setTekma(
          tekma.filter((tekma) => {
            return tekma.id_match !== id_match;
          })
        );
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
                Uredi rezultat tekme
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form action="">
                    <div className="">
                      <MDBInput
                        label="Vnesi rezultat domače ekipe"
                        group
                        type="number"
                        validate
                        value={rez1}
                        onChange={(e) => setRez1(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi rezultat gostujoče ekipe"
                        group
                        type="number"
                        validate
                        value={rez2}
                        onChange={(e) => setRez2(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={handleSubmit} type="submit" color="info">
                        Uredi rezultat
                        <MDBIcon icon="pen" className="ml-2" />
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
                    <th>id_match</th>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Domači</th>
                    <th></th>
                    <th>:</th>
                    <th></th>
                    <th>Gostje</th>
                    <th>Izbriši</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {tekma &&
                    tekma.map((posamezna, i) => {
                      return (
                        <tr key={i}>
                          <td>{posamezna.id_match}</td>
                          <td>{posamezna.date_time.substring(0, 10)}</td>
                          <td>{posamezna.date_time.substring(11, 16)}</td>
                          <td>{posamezna.home}</td>
                          <td>{posamezna.goli1}</td>
                          <td>:</td>
                          <td>{posamezna.goli2}</td>
                          <td>{posamezna.away}</td>
                          <td>
                            <MDBBtn
                              color="danger"
                              onClick={() => handleDelete(posamezna.id_match)}
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

export default withRouter(UrediRezultat);
