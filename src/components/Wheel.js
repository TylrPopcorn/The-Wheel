import React from "react";

const wheel = 1;

const Wheel = (props) => {
  return (
    <div className="WHEEL">
      <div className="wheel-container">
        <div id="wheel-physical">
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <div
              key={val}
              className={`cog ${wheel === val ? "active" : ""}`}
              style={{ "--i": val }}
            >
              {/* --i is a custom CSS property. */}
            </div>
          ))}
        </div>

        <p className="TM_text"> Times moved: 0</p>

        <div id="keypad">
          <button>{"-"}</button>
          <button>{"+"}</button>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
