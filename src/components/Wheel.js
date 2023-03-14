//--vars:
import React, { useState, useEffect } from "react";

//---Main function:
function Wheel(props) {
  //
  const navigate = props.navigate; //Used to navigate around the page.
  //State to keep track of the data:
  const [state, setData] = useState({
    TimesMoved: 0,
    Wheel: 4,
  });

  useEffect(() => {
    //After the page has loaded.
    setTimeout(() => {
      verify(navigate); //'Verify' if the user is logged in.
    }, 2);
  }, [navigate]);

  //Each time one of the buttons gets clicked on:
  function onClick(option) {
    const amount = option === "-" ? -1 : 1; //The amount to add to get the next number
    let newWheel = state.Wheel + amount; //The actual next number

    //Finalize the next number:
    if (newWheel < 0) {
      newWheel = 5;
    } else if (newWheel > 5) {
      newWheel = 0;
    }

    //Update the data:
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
        <div id="wheel-physical"> {/*credit to BloomTech*/}
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
//--
//Used to verify if the user has logged in:
function verify(navigate) {
  const token = localStorage.getItem("token"); //check for any active tokens

  if (token == null) {
    //IF the user is not logged in,
    navigate("/"); //redirect.
  }
}

//
//
//----Exports:
export default Wheel;
