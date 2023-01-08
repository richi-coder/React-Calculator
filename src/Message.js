import React from 'react';

export const Message = props => {
  return (
    <h2 
    className="message"
    style={{display: props.zero ? "block" : "none"}}>
      You can not divide by zero
    </h2>
  )
}