import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBEdgeHeader,
  MDBAnimation,
  MDBFreeBird,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBTypography,
} from "mdbreact";
import EkipeFinder from "../../apis/EkipeFinder";
import { EkipeContext } from "../../context/EkipeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setIsAuth } = useContext(EkipeContext);
  let history = useHistory();

  /* ZA REGISTRACIJO
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /*
  const handleReg = async (e) => {
    e.preventDefault();
    try {
      const response = await EkipeFinder.post("/register", {
        username: usernameReg,
        password: passwordReg,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
*/

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await EkipeFinder.post("/login", {
        username: username,
        password: password,
      });

      if (response.data.message) {
        toast.error(response.data.message);
        setIsAuth(false);
      } else {
        localStorage.setItem("accessToken", response.data);
        toast.success("Uspešna prijava");
        setIsAuth(true);
        setTimeout(() => {
          history.push("/admin");
        }, 1700);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBContainer fluid className="napaka">
      <MDBEdgeHeader color="indigo darken-3"></MDBEdgeHeader>
      <MDBAnimation reveal type="zoomIn">
        <MDBFreeBird>
          <MDBCard className="z-depth-5">
            <MDBCardHeader>
              <MDBTypography tag="h1" variant="h1" className="text-center m-5">
                Prijavi se
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow center className="m-5">
                <MDBCol md="6">
                  <form>
                    <div className="grey-text">
                      <MDBInput
                        label="Vnesi uporabniško ime"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <MDBInput
                        label="Vnesi geslo"
                        icon="lock"
                        group
                        type="password"
                        validate
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={handleLogin} color="info">
                        Prijava
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <ToastContainer />
          </MDBCard>
        </MDBFreeBird>
      </MDBAnimation>
    </MDBContainer>
  );
  /*}
          <MDBContainer className="border">
            <MDBRow>
              <MDBCol md="6">
                <form>
                  <p className="h5 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Your username"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={usernameReg}
                      onChange={(e) => setUsernameReg(e.target.value)}
                    />

                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={passwordReg}
                      onChange={(e) => setPasswordReg(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn color="primary" onClick={handleReg}>
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
  </MDBContainer>{" "}*/
};

export default Login;
