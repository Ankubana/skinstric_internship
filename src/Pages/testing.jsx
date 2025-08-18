import React, { useRef, useState } from "react";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import buttinIcon2 from "../Assets/button-icon-text-shrunk (3).png";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import TopBar from "./Top_bar";
import Skeleton from "react-loading-skeleton" 
const Test = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading,setLoading]=useState(false)
  const [isNameFilled, setIsNameFilled] = useState(false); // Track if name is filled
  const [message, setMessage] = useState(null); // State to hold the success or failure message
  const [thanks,setThanks]=useState("CLICK TO TYPE")
  const [proceed,setProceed]=useState(false)
  const[input_control,setInput_control]=useState("")
  const InputRef = useRef(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFocus = () => {
    const input = InputRef.current;
    if (input) {
      const middle = Math.floor(input.value.length / 2);
      input.setSelectionRange(middle, middle);
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter" && name.trim() !== "") {
     
      setIsNameFilled(true); // Show location input when name is filled
      console.log("Name field filled, switching to location input.");
    } // Only show the message if name is still empty after delay
       else {
      // Delay showing validation message
      setTimeout(() => {
        if (name.trim() === "") {
          setInput_control("Please enter your name");
        }
      }, 1000); // 1 second delay
    }
  };

  const handleLocationKeyDown = async (e) => {
  // Only when location is filled and Enter is pressed
  if (e.key === "Enter" && name.trim() !== "" && location.trim() !== "") {
    setLoading(true);  // Start loading before the fetch request

    console.log("Location entered, sending data to API...");

    // Prepare the data to send to the API
    const userData = {
      name: name.trim(),
      location: location.trim(),
    };
   setTimeout(async () => {
    try {
      const response = await fetch("https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Send userData in the request body
      });

      // Handle the response here
      if (response.ok) {
        const data = await response.json(); // Assuming the response is JSON
        console.log("Response Data:", data);
        setMessage("Proceed to the next step!");
        setProceed(true);  // Set proceed to true to navigate or show the next section
      } else {
        console.error("Error:", response.status, response.statusText);
        setMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Request failed", error);
      setMessage("Error occurred. Please try again.");
    } finally {
      setLoading(false);  // Stop loading after the fetch request is done
    }
  }, 5000); // 500ms delay before executing the fetch
}
};
  return (
    <div className="container">
      {/* Rotating boxes in background */}
      <div className="rotating-box box1"></div>
      <div className="rotating-box box2"></div>
      <div className="rotating-box box3"></div>
      {/* Fixed input in center */}
      <div className="input-overlay">
        <label className="typing_label">{thanks}</label><br />
        {/* Render either inputs or message */}
        <div className="input_control">{input_control}</div>
        {loading? (
       <div className="skeleton"> <Skeleton className=""></Skeleton>Processing submission <br/><br/>  

       <div data-aos="fade-up"class="circle circle1"></div>&nbsp;&nbsp;&nbsp;&nbsp;
       <div data-aos="fade-up" class="circle circle2"></div>&nbsp;&nbsp;&nbsp;&nbsp;
       <div data-aos="fade-up" class="circle circle3"></div>
        
        </div>
         ) :!message ? (
          !isNameFilled ? (
            // Name Input
            <input
              type="text"
              className="intro"
              name="name"
              ref={InputRef}
              onFocus={handleFocus}
              onChange={handleNameChange}
              onKeyDown={handleNameKeyDown} // Handle key press in name input
              value={name}
              placeholder="Introduce Yourself"
            />
          ) : (
            // Location Input when name is filled and Enter is pressed
            <input
              type="text"
              className="intro"
              name="location"
              onChange={handleLocationChange}
              onKeyDown={handleLocationKeyDown} // Handle key press in location input
              value={location}
              placeholder="Where are you located?"
            />
          )
        ) : (
          // Success or failure message
          <div className="success-message">

            <p>{message}</p>
          </div>
            )}
      </div>

      <div className="left__section--back">
        <Link to="/" className="buttin-icon-shrunk">
          <img src={buttinIcon} alt="Discover AI icon" />
          <span className="label">Back</span>
        </Link>
      </div>
     {proceed?(
      <Link to="/Result">
    <div className="right__section--procceed">
    <button className="buttin-icon-shrunk">
      <img src={buttinIcon2} alt="Right icon" />
    </button>
  </div></Link>
     ):null
}
 </div>
  );
};

export default Test;