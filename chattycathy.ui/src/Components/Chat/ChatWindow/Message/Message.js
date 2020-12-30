
import React from 'react';

const Message = (props) => (
    <div className="card w-50 mx-auto"
        style={props.user == "Cathy" 
               ? {background: "#fcba03", borderRadius: '0rem', margin: '2rem', width: '25rem' } 
               : {background: "#B49FCC", borderRadius: '1rem', margin: '2rem', width: '25rem' }}>
        <div className="card-body">
            <p ><strong>{props.user}</strong> says: </p>
            <p >{" " + props.message}</p>
        </div>
    </div>
);

export default Message;