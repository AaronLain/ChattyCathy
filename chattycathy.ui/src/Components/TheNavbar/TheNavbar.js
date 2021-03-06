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
        id: '',
        photoUrl: ''
      }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      }

      logOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
      }
    
      componentDidMount() {
        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const uid = firebase.auth().currentUser.uid;
            authData.getUsers()
               // gets the firebase uid from logged in user, then sets the their picture in the navbar
               // sets the userid based on their firebase uid so they can see their profile
              .then(response => response.filter(u => u.fBuid === uid))
              .then(user => user ? this.setState({id: user[0].userId, photoUrl:user[0].imageUrl}) : console.log('no user'))
              .catch(err => console.error('Could not filter users', err))
          }
        })
      }
    
      componentWillUnmount() {
        this.removeListener();
      }

      loginClickEvent = (e) => {
        e.preventDefault();
        authData.registerUser();
      };

    render() {
        const { isOpen } = this.state;
        const { authed } = this.props;


        // renders navbar based on login status
        const authedNavBar = () => {
          if (authed) {
            return(
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} to='/chat'>Chat</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/profile/${this.state.id}`}>Profile</NavLink>
                </NavItem>
                <NavItem>
                  <a className="navbar-brand" style={{ borderRadius: '50rem'}}>
                    <img src={this.state.photoUrl} width="30" height="30" className="d-inline-block ml-auto" alt=""/>
                  </a>
                </NavItem>
                <NavItem>
                  <NavLink className="btn btn-danger ml-auto" onClick={this.logOut}>Logout</NavLink>
                </NavItem>
                </Nav>
            )
          } else {
            return (
              <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink tag={RRNavLink} to='/chat'>Chat</NavLink>
                </NavItem>
              <NavItem>
                <button className="btn btn-success ml-auto" onClick={this.loginClickEvent}>Google Login</button>
              </NavItem>
              </Nav>
            )
          }
        }

        return (
        <div className="TheNavbar">
          <Navbar color="transparent" light expand="md">
            <NavbarBrand href="/">
              CC
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
                {authedNavBar()}
            </Collapse>
          </Navbar>
        </div>
        );
    }
}

export default TheNavbar;














