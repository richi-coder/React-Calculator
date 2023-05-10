export const Display = ({memory,actual,displayState}) => {
  console.log(memory.join(''), 'from DISPLAY');
  return (
    <div className="display">
      <div
      style={{visibility: displayState ? "hidden" : "visible"}} 
      id="display">{memory.join('')}</div>
      <div id="actual">{actual}</div>
    </div>
  );
};