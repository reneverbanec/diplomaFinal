import React from "react";
import UpdateTeam from "../updateComponents/UpdateTeam";
import { withRouter } from "react-router-dom";

const UrediEkipo = () => {
  return (
    <div>
      <UpdateTeam />
    </div>
  );
};

export default withRouter(UrediEkipo);
