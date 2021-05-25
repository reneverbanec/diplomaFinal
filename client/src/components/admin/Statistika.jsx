import React, { useEffect, useState } from "react";

import EkipeFinder from "../../apis/EkipeFinder";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCol } from "mdbreact";

const Statistika = () => {
  const [stgames, setSTGames] = useState([]);
  const [stteams, setSTTeams] = useState([]);
  const [stplayers, setSTPlayers] = useState([]);
  const [stgoals, setSTGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EkipeFinder.get("/statistika/ekipe");
        setSTTeams(response.data.data.numberofteams);

        const response1 = await EkipeFinder.get("/statistika/igralci");
        setSTPlayers(response1.data.data.numberofplayers);

        const response2 = await EkipeFinder.get("/statistika/tekme");
        setSTGames(response2.data.data.numberofmatches);

        const response3 = await EkipeFinder.get("/statistika/goli");
        setSTGoals(response3.data.data.numberofgoalsandassists);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <MDBCol className="d-flex justify-content-center mb-5">
      {stteams &&
        stteams.map((tm, i) => {
          return (
            <MDBCard
              className="text-center m-2"
              style={{ width: "15rem" }}
              key={i}
            >
              <MDBCardHeader color="indigo">Število ekip</MDBCardHeader>
              <MDBCardBody>{tm.stevilo_ekip}</MDBCardBody>
            </MDBCard>
          );
        })}
      {stplayers &&
        stplayers.map((tm, i) => {
          return (
            <MDBCard
              className="text-center m-2"
              style={{ width: "15rem" }}
              key={i}
            >
              <MDBCardHeader color="indigo">Število igralcev</MDBCardHeader>
              <MDBCardBody>{tm.stevilo_igralcev}</MDBCardBody>
            </MDBCard>
          );
        })}
      {stgames &&
        stgames.map((tm, i) => {
          return (
            <MDBCard
              className="text-center m-2"
              style={{ width: "15rem" }}
              key={i}
            >
              <MDBCardHeader color="indigo">Število Tekem</MDBCardHeader>
              <MDBCardBody>{tm.stevilo_tekem}</MDBCardBody>
            </MDBCard>
          );
        })}
      {stgoals &&
        stgoals.map((tm, i) => {
          return (
            <MDBCard
              className="text-center m-2"
              style={{ width: "15rem" }}
              key={i}
            >
              <MDBCardHeader color="indigo">Število Golov</MDBCardHeader>
              <MDBCardBody>{tm.golov}</MDBCardBody>
            </MDBCard>
          );
        })}
      {stgoals &&
        stgoals.map((tm, i) => {
          return (
            <MDBCard
              className="text-center m-2"
              style={{ width: "15rem" }}
              key={i}
            >
              <MDBCardHeader color="indigo">Število Asistenc</MDBCardHeader>
              <MDBCardBody>{tm.asistenc}</MDBCardBody>
            </MDBCard>
          );
        })}
    </MDBCol>
  );
};

export default Statistika;
