import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div>
      {isSignedIn ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={() => onRouteChange("signin")} className='f4 pa2 ma2 link underline dim pointer'>
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={() => onRouteChange("signin")} className='f4 pa2 ma2 link underline dim pointer'>
            Sign In
          </p>
          <p onClick={() => onRouteChange("register")} className='f4 pa2 ma2 link underline dim pointer'>
            Register
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
