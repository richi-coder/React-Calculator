import React from 'react';

export const Display = ({memory,actual,displayState}) => {
  return (
    <div className="display">
      <div
      style={{visibility: displayState ? "hidden" : "visible"}} 
      id="memory">{memory}</div>
      <div id="actual">{actual}</div>
      <div id="myId">Richi Coder</div>
    </div>
  );
};