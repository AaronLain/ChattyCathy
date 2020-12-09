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
import firebase from 'firebase/app';
import 'firebase/auth';
import authData from '../Helpers/Data/authedData';


class TheNavbar extends React.Component {
    state = {
        isOpen: false,
      }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

    

    render() {
        const { isOpen } = this.state;
        const { authed } = this.props;
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
                <NavItem>
                  <NavLink tag={RRNavLink} to='/login'>Login</NavLink>
                </NavItem>
                
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














