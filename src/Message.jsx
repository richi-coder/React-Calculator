export const Message = ({zero}) => 
    <h2 
    className="message"
    style={{display: zero ? "block" : "none"}}>
      You can not divide by zero
    </h2>