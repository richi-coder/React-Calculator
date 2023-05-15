export const Display = ({memory,actual}) => {
  return (
    <div className="screen">
      <div
      id="actual">{memory}
      </div>
      <div id="display">{actual}</div>
    </div>
  );
};