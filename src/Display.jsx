import { useEffect } from "react";

// Component to show calculator DISPLAY (two things: the current value being entered and the expression that is formed when entering values)
export const Display = ({memoryRef, displayRef }) => {
  // Initializing state using useRef once Display component in mounted
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
      <div
      ref={displayRef}
      id="display">
        0
      </div>
    </div>
  );
};