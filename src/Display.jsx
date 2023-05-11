export const Display = ({memory,actual,displayState}) => {
  return (
    <div className="screen">
      <div
      style={{visibility: displayState ? "hidden" : "visible"}} 
      id="actual">{memory.join('')}
      </div>
      <div id="display">{actual}</div>
    </div>
  );
};