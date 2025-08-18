// pages/CameraCapture.jsx
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import DiamondSmall from "../Assets/camera-icon.jpg";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import { FaCamera } from "react-icons/fa";
const CameraCapture = () => {
  const [showCameraAccess, setShowCameraAccess] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <br /><br />
      <div className="start_anal">To START ANALYSIS</div>

      <div className="diamond-container">
        {/* Diamond Button opens Camera Access */}
        <button onClick={() => setShowCameraAccess(true)}>
          <img
            src={DiamondSmall}
            alt="Rotating Diamond"
            className="diamond-img"
          />
        </button>
        <div className="arrow"></div>
        <div className="arrow-label">
          ALLOW A.I.<br />TO SCAN YOUR FACE
        </div>

        {showCameraAccess && (
          <div className="Camera-access">
            <span className="scan-face">ALLOW A.I. TO SCAN YOUR FACE</span>
            <br /><br /><br /><br /><br />

            <hr className="line" />

            <div>
              <button className="scan">Deny</button>
              {/* Navigate to video page */}
              <button onClick={() => navigate("/camera")} className="allow">
                Allow
              </button>
            </div>
          </div>
        )}
        
      </div>
      <div className="left__section--back">
        <Link to="/testing" className="buttin-icon-shrunk">
          <img src={buttinIcon} alt="Discover AI icon" />
          <span className="label">Back</span>
        </Link>
      </div>

    </>
  );
};

export default CameraCapture;