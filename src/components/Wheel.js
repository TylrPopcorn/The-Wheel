import React, { useState } from "react";

function Wheel(props) {
  const [state, setData] = useState({
    TimesMoved: 0,
    Wheel: 4,
  });

  function onClick(option) {
    const amount = option === "-" ? -1 : 1;
    let newWheel = state.Wheel + amount;

    if (newWheel < 0) {
      newWheel = 5;
    } else if (newWheel > 5) {
      newWheel = 0;
    }

    setData({
      ...state,
      TimesMoved: state.TimesMoved + 1,
      Wheel: newWheel,
    });
  }

  //render to the screen:
  return (
    <div className="WHEEL">
      <div className="wheel-container">
        {/* the actual wheel */}
        <div id="wheel-physical">
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <div
              key={val}
              className={`cog ${state.Wheel === val ? "active" : ""}`}
              style={{ "--i": val }}
            >
              {/* --i is a custom CSS property. */}
            </div>
          ))}
        </div>
        {/*--------     -----------*/}

        <p className="TM_text">{`Times moved: ${state.TimesMoved}`}</p>

        {/* KEYPAD */}
        <div id="keypad">
          <button onClick={() => onClick("-")}>{"-"}</button>
          <button onClick={() => onClick("+")}>{"+"}</button>
        </div>
        {/*--------     -----------*/}
      </div>
    </div>
  );
}

export default Wheel;
