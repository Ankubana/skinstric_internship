// Camera.jsx
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-regular-svg-icons";
import Capture from "../Pages/capture";
import DiamondSmall from "../Assets/camera-icon.jpg";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setLoading(false); // remove skeleton
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please allow permissions.");
      setLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      setPhotoSrc(dataURL);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startCamera();
      setLoading(false)
    }, 2000); // simulate loading

    return () => {
      
      clearTimeout(timer);
      stopCamera();
    };
  }, []);
  return (
    <>
      {/* Skeleton OUTSIDE Take_Photo */}
      {loading && (
        <div className="skeleton-overlay--wrapper">
        <div className="skeleton-overlay-camera">
    <div className="diamond-wrapper">
      <div className="diamond-box box13"></div>
      <div className="diamond-box box14"></div>
      <div className="diamond-box box15"></div>

      {/* One image positioned over all three boxes */}
      <img 
        src={DiamondSmall} 
        alt="Rotating Diamond" 
        className="diamond-img-cameraSetup" 
      />
      <span className="setting_camera"> SETTING UP CAMERA---</span>
    </div>
  </div>
  <div  className="posture-guideline">
                 TO GET BETTER RESULTS MAKE SURE TO HAVE
                </div>
  </div>
        
      )}

      {!loading && (
        <div className="Take_Photo">
          {/* Video Stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="photo_size"
            style={{ display: photoSrc ? "none" : "block" }}
          />

          {/* Capture Button */}
          {stream && !photoSrc && (
            <div>
              <div className="camera-overlay">
                <span className="take-picture-text">TAKE PICTURE</span>
              </div>
              <div className="posture-guidelines">
                <div  className="posture-guidelines__title">
                 TO GET BETTER RESULTS MAKE SURE TO HAVE
                </div>
            <div className="posture-guidelines__list">
            <div className="posture-guidelines__item">◇ NEUTRAL EXPRESSION</div> <div className="posture-guidelines__item">◇ FRONTAL POSE</div><div className="posture-guidelines__item">◇ ADEQUATE LIGHTING
              </div>
              </div>
              </div>
              <div className="camera-cercle">
                <button className="capture-btn" onClick={capturePhoto}>
                  <FontAwesomeIcon icon={faCamera} className="Camera_icon" size="lg" />
                </button>
                
              </div>
              
            </div>
          )}

          {/* Captured Photo */}
          {photoSrc && <Capture photoSrc={photoSrc} setPhotoSrc={setPhotoSrc} />}
            
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </>
  );
};

export default Camera;