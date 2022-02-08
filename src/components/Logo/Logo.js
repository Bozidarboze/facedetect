import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt tc br2 border shadow-3' options={{ max: 35 }}>
        <div className='Tilt-inner'>
          <img className='logo' src={brain} alt='logo' />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
