import React from "react";
import "./index.css"
import BigDiamond from "../component/BigDiamonde";
const Home=()=>{
 
return(

<> 
{/*top left corner*/}
<div className="container">
<BigDiamond position="left" />
 <BigDiamond position="right" />
 < div className="wrapper__top-left-right">
 < div className="left__top">
< span className="brand">SKINSTRIC</span>
 <span className="intro"> [INTRO]</span>
 </div>
 {/*top right corner*/}
 <div  className="right__top">
  <button className="code_input">Enter Code</button>

 </div>
 </div>
 {/* Left diamonde button */}
 <div className="left__section">
   <div className="diamonde">
    <span className="arrow">&#9664;</span>
   </div>
   <span className="label">DISCOVER A.I.</span>
 </div>
   {/*right diamonde button*/ }
<div className="right__section">
  <span className="label">TAKE TEST</span>
  <div className="diamonde">
    <span className="arrow">&#9654;</span>
  </div>
</div>
 <h1 className="heading">
  sophesticated <br/> skincare
 </h1>
 {/*bottom left description*/}
 <div className="bottom__left">
SKINSTRIC DEVELOPED AN A.I. THAT CREATES A <br />
 HIGHLY-PERSONALIZED ROUTINE TAILORED TO <br />
 WHAT YOUR SKIN NEEDS.
 </div>
</div>

</>

)


}
export default Home