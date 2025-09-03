import React, { useRef, useState } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import buttinIcon1 from "../Assets/button-icon-text-shrunk (3).png";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import Skeleton from "react-loading-skeleton";

const Test = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [message, setMessage] = useState(null);
  const [typingMessage, setTypingMessage] = useState("CLICK TO TYPE");
  const [proceed, setProceed] = useState(false);
  const [inputControl, setInputControl] = useState("");
  const [typingLabel, setTypingLabel] = useState("typing_label");

  const InputRef = useRef(null);
  const navigate = useNavigate();
  const handleFocus = () => {
    const input = InputRef.current;
    if (input) {
      const middle = Math.floor(input.value.length / 2);
      input.setSelectionRange(middle, middle);
    }
  };

  // Name input validation
  const handleNameKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const trimmedName = name.trim();
    const nameRegex = /^[a-zA-Z\s]+$/; // letters and spaces only

    if (trimmedName === "") {
      setInputControl(" Please enter your name");
    } else if (!nameRegex.test(trimmedName)) {
      setInputControl(
        "Please enter a valid name without numbers or special characters"
      );
    } else {
      setIsNameFilled(true);
      setInputControl("");
    }
  };

  // Location input validation
  const handleLocationKeyDown = async (e) => {
    setTypingMessage("")
    if (e.key !== "Enter") return;

    const trimmedName = name.trim();
    const trimmedLocation = location.trim();
    const locationRegex = /^[a-zA-Z\s]+$/; // letters and spaces only

    if (trimmedName === "") {
      setInputControl("Please enter your name first");
      return;
    }

    if (trimmedLocation === "") {
      setInputControl(" Please enter your location");
      return;
    }

    if (!locationRegex.test(trimmedLocation)) {
      setInputControl(
        "Please enter a valid location without numbers or special characters"
      );
      return;
    }

    setLoading(true);
    

    const userData = { name: trimmedName, location: trimmedLocation };

    setTimeout(async () => {
      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Response Data:", data);
          setMessage("Proceed to the next step!");
          setProceed(true);
        } else {
          setMessage("Submission failed. Please try again.");
        }
      } catch (error) {
        setMessage("Error occurred. Please try again.");
      } finally {
        setLoading(false);
        setTypingLabel("typinglabel");
        setTypingMessage("Thank you!");
    
      }
      
    }, 3000);
    
  };

  return (
    <div className="container">
      <div className="input-wrapper">
      {/* Background rotating cubes */}
      <div className="rotating-box box1"></div>
      <div className="rotating-box box2"></div>
      <div className="rotating-box box3"></div>
      {/* Fixed input on top of rotating boxes */}
      <div className="input-box">
        
        {loading ? (
          <div className="skeleton">
            <span className="process_data">Processing submission</span><br/>
            <div className="circles-wrapper">
            <div className="circle circle1"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle2"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle3"></div>
          </div>
          </div>
        ) : message ? (
          <div className="success-message">
             <div className="appre_message">{typingMessage}</div> 
            <p className="success-message">{message}</p>
          </div>
        ) : (
          <div className="input_wrapper">
          <label className={typingLabel}>{typingMessage}</label>
        <div className="input_control">{inputControl}</div>
        <br />
          <input
            type="text"
            className="intro"
            ref={InputRef}
            onFocus={handleFocus}
            onChange={(e) =>
              isNameFilled ? setLocation(e.target.value) : setName(e.target.value)
            }
            onKeyDown={isNameFilled ? handleLocationKeyDown : handleNameKeyDown}
            value={isNameFilled ? location : name}
            placeholder={isNameFilled ? "Your City Name?" : "Introduce Yourself"}
          /></div>
        )}
      </div>
       </div>
      {/* Back button */}
      
        <Link to="/">
            <div className="diamond_arrow__wrapper">
            <div class="diamond_arrow--button">
               <span>◀</span>
              </div>
               &nbsp;&nbsp;&nbsp;Back
              </div>
        </Link>
     

      {/* Proceed button */}
      {proceed && (
        <Link to="/Result">
          <div className="right__section--procceed">
           <span className="proceed_text">PROCEED</span> 
            <button className="buttin-icon-shrunk">
            <div class="diamond-right--button">
                 <span>▶</span>
              </div>
            </button>
          </div>
        </Link>
      )}
      
    </div>
  );
};

export default Test;