
import React from 'react';

const Message = (props) => (
    <div className="card w-50 border-dark mx-auto"
        style={props.user == "Cathy" 
               ? {background: "#81e68b", borderRadius: '0rem', margin: '2rem', width: '25rem' } 
               : {background: "#b2d9d7", borderRadius: '1rem', margin: '2rem', width: '25rem' }}>
        <div className="card-body">
            <p><strong>{props.user}</strong> says: </p>
            <p>{" " + props.message}</p>
        </div>
    </div>
);

export default Message;