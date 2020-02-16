import React from 'react';
import { Link } from 'react-router-dom';

import iconburger from '../img/icon-burger.png';
import iconboy from '../img/icon-boy.png';
import iconcoupon from '../img/icon-coupon.png';

function Menu(props) {
  return (
    <div className='menu'>
      <Link to='/'>
        <div>
          <img src={iconburger} alt='game' />
        </div>
      </Link>
      <Link to='/coupons'>
        <div>
          <img src={iconcoupon} alt='coupon' />
          <span className='badge'>{props.claimableCoupons}</span>
        </div>
      </Link>
      <Link to='/profile'>
        <div>
          <img src={iconboy} alt='profile' />
        </div>
      </Link>
    </div>
  );
}
export default Menu;
