import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Chat from '../Components/Chat/Chat';
import TheNavbar from '../Components/TheNavbar/TheNavbar';

class App extends React.Component {
  state = {authed: true};

  render() {
    const {authed} = this.state;

    return (
      <div className='App'>
      <BrowserRouter>
        <React.Fragment>
          <TheNavbar authed={authed} />
          <div className='container d-flex justify-content-center'>
            <Switch>
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