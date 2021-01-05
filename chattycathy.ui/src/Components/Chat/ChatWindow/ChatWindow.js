import React from 'react';

import Message from './Message/Message';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.userName}
            message={m.content}/>);

    return(     
        <div className="ChatWindow">
        <div className="row">
          <div className="col">
            <div className="card" 
             style={{backgroundColor: '#fff', borderRadius: '.5rem'}}>
              <div className="card-title">
                <h4 className="display-4 heading text-center">Chat your heart out!</h4>
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