import React, { useRef, useState, useEffect } from "react";
import { useNavigate,Link} from "react-router-dom";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-regular-svg-icons'; // regular camera
const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      console.log("Requesting camera access...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("Camera access granted:", mediaStream);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
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
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div className="Take_Photo">
      

      {/* Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="photo_size"
      />

      {/* Capture Button */}
      {stream && !photoSrc && (
        <div >

  <div className="camera-overlay">
   
  <span className="take-picture-text">TAKE PICTURE</span>
  </div>
      <div className="camera-cercle">
<button className="capture-btn">
  <FontAwesomeIcon icon={faCamera} className="Camera_icon"size="lg" />       
</button>
    </div>
    
    </div>
      )}
 <div className="Photo_instructions--wrapper"> 
<h4>TO GET BETTER RESULTS MAKE SURE TO HAVE</h4>
<div className="  Photo_instructions"> 
    
     <div className="photo_instruction">
◇ NEUTRAL EXPRESSION
 </div>
 <div className="photo_instruction">
◇ FRONTAL POSE
</div> 
<div className="photo_instruction">
◇ ADEQUATE LIGHTING
 </div>
 </div>
</div>
      {/* Captured Photo */}
      {photoSrc && (
        <>
          <img src={photoSrc} alt="Captured" className="" />
          <div>
            <button onClick={() => setPhotoSrc(null)}>🔄 Retake</button>

          </div>
           </>
        
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="left__section--back">
        <Link to="/Result" className="buttin-icon-shrunk">
          <img src={buttinIcon} alt="Discover AI icon" />
          <span className="label">Back</span>
        </Link>
      </div>
    </div>
  );
};

export default Camera;