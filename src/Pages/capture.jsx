// Capture.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
const Capture = ({ photoSrc, setPhotoSrc }) => {
  const navigate = useNavigate();
  return (
    <div className="captured-photo-wrapper">
      <img src={photoSrc} alt="Captured" className="captured-photo" />
      {/* Overlay with buttons */}
     <div  className="shot">
    <span className="shot_titleC">GREAT SHOT!</span>
    </div>
      <div className="photo-overlay">
        <span className="overlay-text">Preview</span>
        {/* Action Buttons in Overlay */}
        <div className="overlay-buttons">
          {/* Retake Button */}
          <button className="btn_for__retake" onClick={() => setPhotoSrc(null)}> Retake</button>
          {/* Use this Photo Button */}
          <button className="btn_for_Usethis" onClick={() => navigate("/Result")}> Use This Photo</button>
        </div>
      </div>
    </div>
  );
};
export default Capture;