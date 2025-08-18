import React from "react";

const TopBar = () => {
  return (
    <div className="topBar">
      {/* Top left brand */}
      <div className="left__top">
        <span>SKINSTRIC</span>
        <span className="introduction"> [INTRO]</span>
      </div>
      {/* Right button */}
      <button className="right__top--button">
        <span className="Enter__code">ENTER CODE</span>
      </button>
    </div>
  );
};

export default TopBar;