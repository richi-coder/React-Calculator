export const Display = ({memory,actual, memoryRef, displayRef, test}) => {
  console.log(test);

  return (
    <div className="screen">
      <div
      ref={memoryRef}
      id="actual">{memory}
      </div>
      <div ref={displayRef} id="display">{actual}</div>
    </div>
  );
};