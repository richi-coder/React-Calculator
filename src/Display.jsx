export const Display = ({memory,actual,displayState}) => {
  return (
    <div className="display">
      <div
      style={{visibility: displayState ? "hidden" : "visible"}} 
      id="display">{memory.join('')}
      </div>
      <div id="actual">{actual}</div>
    </div>
  );
};