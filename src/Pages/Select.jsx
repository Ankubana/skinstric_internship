import React from "react";
import {  Link, useLocation,} from "react-router-dom";
import buttinIcon from "../Assets/buttin-icon-shrunk.png";
const items = [
  { label: "DEMOGRAPHICS" },
  { label: "COSMETIC CONCERNS" },
  { label: "SKIN TYPE DETAILS" },
  { label: "WEATHER"},
];

export default function DiamondGrid() {
   const location = useLocation();
  const { photoSrc } = location.state || {}; 
  return (<div>
    <div  className="ResultsDesc">
     <h2>A.I. ANALYSIS</h2>
  <p className="subtext"  >A.I. HAS ESTIMATED THE FOLLLOWING.</p>
   <p className="subtext">FIX ESTIMATED INFORMATION IF NEEDED</p>
   </div>
    <div className="diamond-shape-container">
    
      {/* Top Diamond */}
      <button >
      <div className="diamond-shape diamond-top">
        <span  >DEMOGRAPHICS</span>
        <Link  to="/Summary" state={{ photoSrc:`data:image/png;base64,${photoSrc}`}}>
          <div className="rotating-diamond--box box16"></div>
          </Link>
          
      </div></button>
      {/* Left Diamond */} 
      
      <div className="diamond-shape diamond-left">
          
        <span className="">COSMETIC CONCERNS</span>
         <div className="rotating-diamond--box box17"></div>
      </div>

      {/* Right Diamond */}
      <div className="diamond-shape diamond-right">
        <span className="">SKIN TYPE DETAILS</span>
        <div className="rotating-diamond--box box18"></div>
      </div>

      {/* Bottom Diamond */}
<div className="diamond-shape diamond-bottom">
        <span >WEATHER</span>
        <div className="rotating-diamond--box box19"></div>
      </div>
        
    </div>
    < div>
   <Link to="/Result">
               <div className="diamond_arrow__wrapper">
               <div className="diamond_arrow--button">
                  <span>◀</span>
                 </div>
                  &nbsp;&nbsp;&nbsp;Back
                 </div>
           </Link>
            <Link to="/Summary" state={{ photoSrc: `data:image/png;base64,${photoSrc}` }}>
                     <div className="right__section--procceed">
                      <span className="proceed_text">GET SUMMARY</span> 
                       <button className="buttin-icon-shrunk">
                       <div class="diamond-right--button">
                            <span>▶</span>
                         </div>
                       </button>
                     </div>
                   </Link>

            </div>
    </div>
    
    
  );
}

