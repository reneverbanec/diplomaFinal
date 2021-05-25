import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from "mdbreact";
import { EkipeContext } from "../../context/EkipeContext";

class NavbarPage extends Component {
  static contextType = EkipeContext;

  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isAuth } = this.context;
    if (isAuth) {
    }

    return (
      <MDBNavbar
        className="ok font-weight-bold"
        color="indigo darken-1"
        expand="md"
      >
        <MDBNavbarBrand>
          <MDBNavLink link to="/" className="white-text">
            Vinica Rezultati
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavLink link to="/" className="white-text">
              Domov
            </MDBNavLink>

            <MDBDropdown>
              <MDBDropdownToggle nav caret className="white-text">
                <span className="mr-2">VML 2021</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBNavLink link className="black-text" to="/vml/lestvica">
                  Lestvica
                </MDBNavLink>

                <MDBNavLink link className="black-text" to="/vml/tekme">
                  Razpored Tekem
                </MDBNavLink>

                <MDBNavLink link className="black-text" to="/vml/strelci">
                  Lestvica Strelcev
                </MDBNavLink>

                <MDBNavLink link className="black-text" to="/vml/asistence">
                  Lestvica Asistentov
                </MDBNavLink>
              </MDBDropdownMenu>
            </MDBDropdown>

            <MDBNavLink link to="/onas" className="white-text">
              O nas
            </MDBNavLink>
            <div>
              {isAuth ? (
                <MDBNavLink link to="/admin" className="white-text">
                  Admin
                </MDBNavLink>
              ) : (
                <MDBNavLink link to="/login" className="white-text">
                  Prijava
                </MDBNavLink>
              )}
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;
