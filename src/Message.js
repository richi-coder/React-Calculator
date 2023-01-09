import React from 'react';

export const Message = ({zero}) => {
  return (
    <h2 
    className="message"
    style={{display: zero ? "block" : "none"}}>
      You can not divide by zero
    </h2>
  )
}