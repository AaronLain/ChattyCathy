import React from 'react';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <h1 className="display text-center">Chatty Cathy</h1>
        <img className="img-fluid" src="https://i.ibb.co/K6sWZL3/p.png" alt="cathy" border="0" />
      </div>
    );
    }
}

export default Home;