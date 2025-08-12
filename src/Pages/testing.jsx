import React, { useRef } from "react";
import "../index.css";
import { useNavigate,Link } from "react-router-dom";
import buttinIcon from "../Assets/buttin-icon-shrunk.png"
import TopBar from "./Top_bar";

const Test = () => {
 const navigate = useNavigate();
  const InputRef = useRef(null);

  const handleFocus = () => {
    const input = InputRef.current;
    if (input) {
      const middle = Math.floor(input.value.length / 2);
      input.setSelectionRange(middle, middle);
    }
  };
 const handleBack = () => {
    navigate("/"); // ← Go back to Home page
  };

  return (
    
    <div className="container">

      {/* Rotating boxes in background */}
      <div className="rotating-box box1"></div>
      <div className="rotating-box box2"></div>
      <div className="rotating-box box3"></div>

      {/* Fixed input in center */}
      <div className="input-overlay">
        <label className="typing_label">CLICK TO TYPE</label><br />
        <input
          type="text"
          className="intro_name"
          name="name"
          ref={InputRef}
          onFocus={handleFocus}
          placeholder="Introduce Yourself"
        />
      </div>
       <div className="left__section--back">
       <Link path to="/"> <button 
          className="buttin-icon-shrunk" onClick={handleBack}>
       <img src={buttinIcon} alt="Discover AI icon" />
        <span className="label">Back</span>
        </button>
        </Link>
    </div>
    </div>
   
  );
};

export default Test;
