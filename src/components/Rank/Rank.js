import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
  return (
    <div className='tc'>
      <p className='title mb3 mt0'>{`${name}, your current entry count is..`}</p>
      <p className='entries mt0 mb5'>{entries}</p>
    </div>
  );
};

export default Rank;
