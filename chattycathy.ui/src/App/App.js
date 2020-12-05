import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chat from '../Components/Chat/Chat';
import Home from '../Components/Home/Home';
import TheNavbar from '../Components/TheNavbar/TheNavbar';

import fbConnection from '../Components/Helpers/Data/connection';

fbConnection();

class App extends React.Component {
  state = {authed: true};

  componentDidMount() {
    document.body.style.backgroundColor = "#FFDD99"
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
              <Route path='/' component={Home} authed={authed} />
              <Route path='/chat' component={Chat} authed={authed} />
            </Switch>
          </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;