import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className='tc'>
      <p className='message'>This Magic Brain will detect faces in your pictures. Give it a try!</p>
      <div className='center'>
        <div className='center form pa4 br3 shadow-3'>
          <input className='input border f4 pa2 center' type='text' onChange={onInputChange} />
          <button className='btn f4 link grow ph3 pv2 mh2 dib border' onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
