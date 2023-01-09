import React from 'react';

export const Display = ({memory,actual}) => {
  return (
    <div className="display">
      <div id="memory">{memory}</div>
      <div id="actual">{actual}</div>
      <div id="myId">Richi Coder</div>
    </div>
  );
};