import React from 'react';

export const Display = (props) => {
  return (
    <div className="display">
      <div id="memory">{props.memory}</div>
      <div id="actual">{props.actual}</div>
      <div id="myId">Richi Coder</div>
    </div>
  );
};