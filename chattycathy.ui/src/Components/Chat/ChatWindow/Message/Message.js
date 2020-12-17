
import React from 'react';

const Message = (props) => (
    <div className="card border-primary"
        style={{ background: "#eee", borderRadius: '1rem', padding: '0 10px' }}>
        <div className="card-body">
            <p><strong>{props.user}</strong> says:</p>
            <p>{props.message}</p>
        </div>
    </div>
);

export default Message;