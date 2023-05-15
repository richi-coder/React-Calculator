import { useEffect } from "react";

export const Display = ({memoryRef, displayRef }) => {

  useEffect(() => {
   memoryRef.current.innerHTML = '';
    displayRef.current.innerHTML = 0
  }, [])
  

  return (
    <div className="screen">
      <div
      ref={memoryRef}
      id="actual">
      </div>
      <div ref={displayRef} id="display">0</div>
    </div>
  );
};