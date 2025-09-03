// pages/CameraCapture.jsx
import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import DiamondSmall from "../Assets/camera-icon.jpg";
import galleyImage from "../Assets/gallery.png";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const CameraCapture = () => {
  const [showCameraAccess, setShowCameraAccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  const handleDeny = () => setShowCameraAccess(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    
    if (file) {
      
      const imageURL = URL.createObjectURL(file);
       setSelectedImage(imageURL);
      setTimeout(() => {
        
        
        
         alert("Image analyzed successfully!")
         setLoading(false);
        navigate("/Select", { state: { selectedImage } });
      }, 2000); // simulate processing delay
    }
  };

  return (
    <>
      <br /><br />
      <div className="start_anal">TO START ANALYSIS</div>
      <span className="preview_text">Preview</span>
  {/* Only show selected image preview */}
        
          <div className="Preview_img">
            {selectedImage && (
            <img src={selectedImage} alt="Selected Preview" className="selected_img" />
             )}
            </div>
       
      <div className="diamond-container">
  
        {/* Skeleton loader while processing */}
        {loading && ( <>
          <div className="skeleton">
             <div className="diamond-box box10"></div>
             <div className="diamond-box box11"></div>
             <div className="diamond-box box12"></div>
            <span className="process_data">PREPARING ANALYSIS...</span>
               <br/> 
              <div className="circles-wrapper">
            <div className="circle circle1"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle2"></div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="circle circle3"></div>
               </div>
              </div>
            </>   
        )}
        

        {/* Only show icons and stickers when NOT loading */}
        {!loading && (
          <>
            {/* Diamonds */}
            <div className="diamond-box box4"></div>
            <div className="diamond-box box5"></div>
            <div className="diamond-box box6"></div>

            {/* Diamond Button with sticker */}
            <div className="diamond-button-container">
              <button onClick={() => setShowCameraAccess(true)} className="circle-button">
                <div className="circle-wrapper">
                  <img src={DiamondSmall} alt="Rotating Diamond" className="diamond-img" />
                </div>
              </button>
              <div className="arrow"></div>
              <div className="diamond-label">
                ALLOW A.I.<br />TO SCAN YOUR FACE
              </div>
            </div>

            {/* Camera access modal */}
            {showCameraAccess && (
              <div className="Camera-access"><br/>
                <span className="scan-face">ALLOW A.I. TO SCAN YOUR FACE</span>
                <hr className="line" />
                <div>
                  <button className="scan" onClick={handleDeny}>Deny</button>
                  <button onClick={() => navigate("/camera")} className="allow">Allow</button>
                </div>
              </div>
            )}

            <div className="diamond-box box7"></div>
            <div className="diamond-box box8"></div>
            <div className="diamond-box box9"></div>

            {/* Gallery Button with sticker */}
            <div className="gallery-button-container">
              <button onClick={handleButtonClick}>
                <img src={galleyImage} alt="Gallery" className="galley-img" />
              </button>
              <div className="gallery_access--text">
                ALLOW A.I.<br />ACCESS GALLERY
              </div>
            </div>
          

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className="diagonal-line"></div>
        </>
        )}
      </div>

      {/* Back Button */}
      <Link to="/testing">
                  <div className="diamond_arrow__wrapper">
                  <div class="diamond_arrow--button">
                     <span>◀</span>
                    </div>
                     &nbsp;&nbsp;&nbsp;Back
                    </div>
              </Link>
           
      
    </>
  );
};

export default CameraCapture;