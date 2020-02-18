import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Game from './components/Game';
import Coupons from './components/Coupons';
import Profile from './components/Profile';

import './App.css';

class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };
    this.setClicks = this.setClicks.bind(this);
  }

  setClicks(clicks) {
    this.setState({
      clicks: clicks
    });
  }

  render() {
    return (
      <Router>
        <div className='clicker'>
          <Route
            path='/'
            exact
            render={props => (
              <Game clicks={this.state.clicks} setClicks={this.setClicks} />
            )}
          />
          <Route
            path='/coupons'
            render={props => <Coupons clicks={this.state.clicks} />}
          />
          <Route path='/profile' component={Profile} />
          <Menu claimableCoupons={5} />
        </div>
      </Router>
    );
  }
}

export default Clicker;
