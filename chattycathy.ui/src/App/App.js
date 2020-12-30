import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chatty from '../Components/Chat/Chat';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import TheNavbar from '../Components/TheNavbar/TheNavbar';

import fbConnection from '../Components/Helpers/Data/connection';

fbConnection();

class App extends React.Component {
  state = {authed: true};

  componentDidMount() {
    document.body.style.backgroundColor = "#C7E8F3"
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });

  }
  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const {authed} = this.state;

    return (
      <div className='App'>
      <BrowserRouter>
        <React.Fragment>
          <TheNavbar authed={authed} />
          <div className='container d-flex justify-content-center'>
            <Switch>
              <Route path='/home' component={Home} authed={authed} />
              <Route path='/login' component={Login} authed={authed} />
              <Route path='/chat' component={Chatty} authed={authed} />
              <Redirect from="*" to="/home"/>
            </Switch>
          </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;