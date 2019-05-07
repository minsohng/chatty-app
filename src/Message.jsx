import React, {Component} from 'react';

class Message extends Component {
  constructor(props) {
    super();
    this.createMessage = this.createMessage.bind(this)
  }

  createMessage(type) {
    const message = {}
    if (type === 'incomingMessage') {
      message.username = this.props.message.username;
      message.content = this.props.message.content;

      return (
        <div className="message">
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>
      )
    } else if (type === 'incomingNotification') {
      message.content = this.props.message.content;
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
      <div>
        {message}
      </div>
    )
  }
}
export default Message;