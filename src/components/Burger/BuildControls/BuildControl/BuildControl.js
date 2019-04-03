import React from 'react';
import './BuildControl.css';
const bulidControl = (props) =>(
<div className="BuildControl">
      <div className="Label">{props.label}</div>
        <button 
          className="Less" 
          onClick={props.deleted} 
          disabled={props.disabled}>Less </button>
      <button 
          className="More"
          onClick={props.added}>More </button>
</div>
);

export default bulidControl;