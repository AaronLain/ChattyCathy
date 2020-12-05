import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';



class TheNavbar extends React.Component {
    state = {
        isOpen: false,
      }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

    authedProfile = () => {
        if (authed) {
            return(
                <NavItem>
                  <NavLink tag={RRNavLink} to='/profile/:uid'>Profile</NavLink>
                </NavItem>
            )
        }
       
    }

    render() {
        const { isOpen } = this.state;
        return (
        <div className="DatNavbar">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Chatty Cathy!</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/chat'>Chat</NavLink>
                </NavItem>
                {}
                {/* <NavItem>
                  <NavLink onClick={this.logOut}>Logout</NavLink>
                </NavItem> */}
                </Nav>
            </Collapse>
          </Navbar>
        </div>
        );
    }
}

export default TheNavbar;














