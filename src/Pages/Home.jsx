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
    {/* ====== LARGE SCREENS LAYOUT ====== */}
    <div className="desktop-layout">
      {!hideLeftBg && <div className="big-diamond left"></div>}
      {!hideRightBg && <div className="big-diamond right"></div>}

      {!hideLeftBg && (
        <div className="left__section">
          <button
            className={`buttin-icon-shrunk ${isHoveringLeft ? "move-right" : ""}`}
            onMouseEnter={() => setIsHoveringLeft(true)}
            onMouseLeave={() => setIsHoveringLeft(false)}
          >
            <div className="diamond-button-wrapper">
              <div className="diamond-button"><span>◀</span></div>
              <span className="label">&nbsp;DISCOVER A.I.</span>
            </div>
          </button>
        </div>
      )}

      {!hideRightBg && (
        <Link to="/testing">
          <div className="right__section">
            <button
              className={`buttin-icon-shrunk ${isHoveringRight ? "move-left" : ""}`}
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseLeave={() => setIsHoveringRight(false)}
            >
              <div><span className="text_black">TEKE TEST &nbsp;</span></div>
              <div className="diamond-button-wrapper">
                <div className="diamond-button"><span>▶</span></div>
              </div>
            </button>
          </div>
        </Link>
      )}

      <h1 className={`heading ${isHoveringLeft ? "move-right" : ""} ${isHoveringRight ? "move-left" : ""}`}>
        Sophisticated <br /> skincare
      </h1>

      <div className={`bottom__left ${isHoveringLeft ? "move-right" : ""} ${isHoveringRight ? "move-left" : ""}`} />
      <div className="bottom__left">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
        WHAT YOUR SKIN NEEDS.
      </div>
    </div>

    {/* ====== MOBILE NESTED DIAMOND LAYOUT ====== */}
    <div className="mobile-nested-layout">
      <div className="diamond-outer">
        <div className="diamond-midle">
        <div className="diamond-content">
          <h1 className="mobile-heading">Sophisticated<br />skincare</h1>
          <p className="mobile-subtext">
            Skinstric developed an A.I. that creates a<br />
            highly-personalized routine tailored to<br />
            what your skin needs.
          </p>
          <Link to="/testing" className="mobile-button">
          ENTER EXPERIENCE
          <button
              className={`buttin-icon-shrunk ${isHoveringRight ? "move-left" : ""}`}
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseLeave={() => setIsHoveringRight(false)}
            >
              <div className="diamond-button-wrapper">
                <div className="diamond-button"><span>▶</span></div>
              </div>
            </button>
             
          </Link>
        </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Home;
