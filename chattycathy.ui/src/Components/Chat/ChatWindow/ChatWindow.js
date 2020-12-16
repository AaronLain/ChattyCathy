import React from 'react';

import Message from './Message/Message';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.userName}
            message={m.content}/>);
        console.log(props.chat, 'props')
    return(
        
        <div className="SinglePainting">
        <div className="row my-4">
          <div className="col-sm d-flex">
            <div className="card m-3" 
             style={{backgroundColor: '#99E6FF', borderRadius: '1.5rem'}}>
              <div className="card-title">
                <h4 className="title mt-3 heading">Chatroom</h4>
              </div>
                <div className="card-body text-center">
                {chat}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default ChatWindow;