import React from 'react';

export const Number = ({handleEnter}) => {
  const numbers = Array(10).fill(null);
  return (
    <div className="numbers">
      {numbers.map((n, i) => {
        return (
          <button 
          key={i}
          onClick={handleEnter}
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