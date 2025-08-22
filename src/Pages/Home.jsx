import React, { useState, useEffect } from "react";
import "./index.css";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import buttinIcon2 from "../Assets/button-icon-text-shrunk (2).png";
import { Link } from "react-router-dom";

const Home = () => {
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  
  const [hideRightBg, setHideRightBg] = useState(false);
  const [hideLeftBg, setHideLeftBg] = useState(false);

  // Hide right side (diamond + button) when hovering left
  useEffect(() => {
    let timer;
    if (isHoveringLeft) {
      timer = setTimeout(() => {
        setHideRightBg(true);
      }, 500);
    } else {
      setHideRightBg(false);
    }
    return () => clearTimeout(timer);
  }, [isHoveringLeft]);

  // Hide left side (diamond + button) when hovering right
  useEffect(() => {
    let timer;
    if (isHoveringRight) {
      timer = setTimeout(() => {
        setHideLeftBg(true);
      }, 500);
    } else {
      setHideLeftBg(false);
    }
    return () => clearTimeout(timer);
  }, [isHoveringRight]);

  return (
    <div className="container">
      {/* Left big diamond */}
      {!hideLeftBg && <div className="big-diamond left"></div>}

      {/* Right big diamond */}
      {!hideRightBg && <div className="big-diamond right"></div>}

      {/* Left button (only show if not hidden) */}
      {!hideLeftBg && (
        <div className="left__section">
          <button
            className={`buttin-icon-shrunk ${isHoveringLeft ? "move-right" : ""}`}
            onMouseEnter={() => setIsHoveringLeft(true)}
            onMouseLeave={() => setIsHoveringLeft(false)}
          >
            <img src={buttinIcon} alt="Discover AI icon" className="diamond_img" />
            <span className="label">DISCOVER A.I.</span>
          </button>
        </div>
      )}

      {/* Right button (only show if not hidden) */}
      {!hideRightBg && (
        <Link to="/testing">
          <div className="right__section">
           <div> <span className="text_black">TEKE TEST</span></div>
            <button
              className={`buttin-icon-shrunk ${isHoveringRight ? "move-left" : ""}`}
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseLeave={() => setIsHoveringRight(false)}
            >
              <img src={buttinIcon2} alt="Right icon"className="diamond_img" />
            </button>
          </div>
        </Link>
      )}

      {/* Center heading */}
      <h1
        className={`heading 
          ${isHoveringLeft ? "move-right" : ""} 
          ${isHoveringRight ? "move-left" : ""}
        `}
      >
        Sophisticated <br />
        skincare
      </h1>

      {/* Bottom text */}
      <div
      
        className={`bottom__left 
          ${isHoveringLeft ? "move-right" : ""} 
          ${isHoveringRight ? "move-left" : ""}
        `}
      >
        
      </div>
      < div className="bottom__left ">
      SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
        </div>
    </div>
  );
};

export default Home;
