import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Menu from './components/Menu';
import Game from './components/Game';
import Coupons from './components/Coupons';
import Profile from './components/Profile';
import allCoupons from './components/allCoupons';

import './App.css';

class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      coupons: [],
      claimableCoupons: 0,
      countUpdateValue: 0
    };
    this.setClicks = this.setClicks.bind(this);
    this.claimCoupon = this.claimCoupon.bind(this);
    this.updateCouponCount = this.updateCouponCount.bind(this);
  }

  componentDidMount() {
    this.updateCouponCount(this.state.clicks);
  }

  updateCouponCount(clicks) {
    let coupons = 0;
    let updateValue = this.state.countUpdateValue;
    allCoupons.forEach(coupon => {
      if (coupon.price <= clicks) {
        coupons++;
      }
      if (
        (updateValue < clicks && coupon.price > updateValue) ||
        (coupon.price > clicks && coupon.price < updateValue)
      ) {
        updateValue = coupon.price;
      }
    });
    this.setState({
      claimableCoupons: coupons,
      countUpdateValue: updateValue
    });
  }

  setClicks(clicks) {
    this.setState({
      clicks: clicks
    });
    if (clicks > this.state.countUpdateValue) {
      this.updateCouponCount(clicks);
    }
  }

  claimCoupon(couponId) {
    let filteredCoupons = allCoupons.filter(offer => offer.id === couponId);
    let selectedCoupon = Object.assign({}, filteredCoupons[0]);
    selectedCoupon.claimed = Date.now();
    selectedCoupon.validDue = Date.now() + 14 * 24 * 60 * 60 * 1000;
    let clicks = this.state.clicks;
    clicks = clicks - selectedCoupon.price;
    let coupons = this.state.coupons.slice();
    coupons.push(selectedCoupon);
    this.setState({
      clicks: clicks,
      coupons: coupons
    });
    this.updateCouponCount(clicks);
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
            render={props => (
              <Coupons
                clicks={this.state.clicks}
                claimCoupon={this.claimCoupon}
              />
            )}
          />
          <Route
            path='/profile'
            render={props => (
              <Profile
                clicks={this.state.clicks}
                coupons={this.state.coupons}
              />
            )}
          />
          <Menu claimableCoupons={this.state.claimableCoupons} />
        </div>
      </Router>
    );
  }
}

export default Clicker;
