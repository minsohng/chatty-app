import React, {Component, Fragment} from 'react';

class Message extends Component {
  constructor(props) {
    super();
    this.createMessage = this.createMessage.bind(this)
  }

  createMessage(type) {
    const message = this.props.message;
    if (type === 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    } else if (type === 'incomingNotification') {
      return (
        <div className="message system">
          {message.content}
        </div>
      )
    }
  };

  render() {

    const type = this.props.message.username ? 'incomingMessage' : 'incomingNotification'
    const message = this.createMessage(type);
    return (
      <Fragment>
        {message}
      </Fragment>
    )
  }
}
export default Message;


