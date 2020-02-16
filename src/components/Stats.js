import React from 'react';

function Stats(props) {
  return (
    <div className='stats'>
      <div className='stats_title'>burgers</div>
      <div className='stats_count'>{props.count}</div>
    </div>
  );
}

export default Stats;
