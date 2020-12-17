
import React from 'react';

const Message = (props) => (
    <div className="card border-primary mx-auto"
        style={{ background: "#eee", borderRadius: '1rem', margin: '2rem', width: '25rem' }}>
        <div className="card-body">
            <p><strong>{props.user}</strong> says:</p>
            <p>{props.message}</p>
        </div>
    </div>
);

export default Message;