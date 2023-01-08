import React from 'react';

export const Number = (props) => {
  const numbers = Array(10).fill(null);
  return (
    <div className="numbers">
      {numbers.map((n, i) => {
        return (
          <button 
          key={i}
          onClick={props.handleEnter}
          className="number"
          value={numbers.length - i - 1}
          >
            {numbers.length - i - 1}
          </button>
        );
      })}
    </div>
  );
};