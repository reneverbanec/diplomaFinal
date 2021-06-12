import React, { useContext, useEffect } from "react";
import EkipeFinder from "../../apis/EkipeFinder";
import { EkipeContext } from "../../context/EkipeContext";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBContainer,
  MDBIcon,
} from "mdbreact";

const ListEkipe = (props) => {
  const { ekipe, setEkipe } = useContext(EkipeContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/ekipe");
        setEkipe(response.data.data.teams);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id_team) => {
    try {
      const response = await EkipeFinder.delete(`/mostvo/${id_team}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      if (response.data.error) {
        toast.error(response.data.error.detail);
        toast.error(response.data.error.message);
      } else {
        toast.success("Uspešno izbrisano");
        setEkipe(
          ekipe.filter((ekipa) => {
            return ekipa.id_team !== id_team;
          })
        );
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id_team) => {
    history.push(`/admin/ekipa/${id_team}/update`);
  };

  const handleTeamSelect = (id_team) => {
    history.push(`/admin/ekipa/${id_team}`);
  };

  return (
    <MDBContainer fluid>
      <MDBTable hover bordered className="text-center">
        <MDBTableHead color="primary-color-dark" textWhite>
          <tr>
            <th>ID_TEAM</th>
            <th>Ime</th>
            <th>Kratki naziv</th>
            <th>Uredi</th>
            <th>Izbriši</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {ekipe &&
            ekipe.map((ekipa) => {
              return (
                <tr key={ekipa.id_team}>
                  <td>{ekipa.id_team}</td>
                  <td onClick={() => handleTeamSelect(ekipa.id_team)}>
                    {ekipa.club}
                  </td>
                  <td>{ekipa.shorthand}</td>
                  <td>
                    <MDBBtn
                      color="info"
                      onClick={() => handleUpdate(ekipa.id_team)}
                    >
                      Uredi
                      <MDBIcon icon="pen" className="ml-2" />
                    </MDBBtn>
                  </td>
                  <td>
                    <MDBBtn
                      color="danger"
                      onClick={() => handleDelete(ekipa.id_team)}
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
    </MDBContainer>
  );
};

export default ListEkipe;
