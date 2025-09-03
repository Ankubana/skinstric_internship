import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Capture = ({ photoSrc, setPhotoSrc}) => {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleUseThisPhoto = () => {
    if (loading) return; // prevent multiple clicks

    setLoading(true);

    // Delay navigation after 7 seconds
    setTimeout(() => {
      navigate("/Select", { state: { photoSrc } });
    }, 2000);
  };

  return (
    <div className="captured-photo-wrapper">
      <img src={photoSrc} alt="Captured" className="captured-photo" />
          <div className="shot">
            <span className="shot_title">GREAT SHOT!</span>
          </div>
          <div className="photo-overlay">
            <span className="overlay-text">Preview</span>
            <div className="overlay-buttons">
              <button className="btn_for__retake" onClick={() => setPhotoSrc(null)}>Retake</button>
              <button className="btn_for_Usethis" onClick={handleUseThisPhoto}>Use This Photo</button>
            </div>
          </div>
      {loading && (
        // Skeleton loader
        <div className="skeleton-capture">
        <div className="skeleton-text">ANALYZE IMAGE...</div>
        <div className="circles-wrapper">
            <div className="circle circle1"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle2"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle3"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Capture;