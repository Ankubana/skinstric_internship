import React, { useState, useEffect } from "react";
import "./index.css";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import buttinIcon2 from "../Assets/button-icon-text-shrunk (2).png";
import {Link} from "react-router-dom"
const Home = () => {
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [hideRightBg, setHideRightBg] = useState(false);

  useEffect(() => {
    let timer;
    if (isHoveringLeft) {
      timer = setTimeout(() => {
        setHideRightBg(true); // only hide right bg diamond
      }, 1500); // match text forward animation duration
    } else {
      setHideRightBg(false); // show right bg when going back
    }
    return () => clearTimeout(timer);
  }, [isHoveringLeft]);

  return (
    <div className="container">
    
      {/* Left big diamond always visible */}
      <div className="big-diamond left"></div>

      {/* Right big diamond only visible when not hovering */}
      {!hideRightBg && <div className="big-diamond right"></div>}

      {/* Left arrow button */}
      <div className="left__section">
        <button
          className={`buttin-icon-shrunk ${isHoveringLeft ? "move-right" : ""}`}
          onMouseEnter={() => setIsHoveringLeft(true)}
          onMouseLeave={() => setIsHoveringLeft(false)}
        >
       <img src={buttinIcon} alt="Discover AI icon" />
        <span className="label">DISCOVER A.I.</span>
        </button>
          
      </div>
      {/* Right arrow diamond button */}
      {!hideRightBg && (
        <Link to="/Test">
  <div className="right__section">
    <button className="buttin-icon-shrunk">
      <img src={buttinIcon2} alt="Right icon" />
    </button>
  </div>
</Link>
      )}
      {/* Center heading */}
      <h1 className={`heading ${isHoveringLeft ? "move-right" : ""}`}>
           Sophisticated <br/>skincare
      </h1>
      {/* Bottom left text */}
      <div className="bottom__left">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
};
export default Home;