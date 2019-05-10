import React, {Component, Fragment} from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
    this.createMessage = this.createMessage.bind(this)
  }

  createMessage(type) {
    const {header} = this.props.message;
    let {message: {content, username}} = this.props.message;
    let img = undefined;
 
    // handle image
    let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/;
    if (regex.test(content)) {
      img = content;
      content = undefined;
    }

    if (type === 'incomingMessage') {
      return (
        <Fragment>
        <div className="message">
          <span style={{color: header.textColor}} className="message-username">{username}</span>
          <span style={{color: header.textColor}} className="message-content">{content}</span> 
        </div>
        {img && <img src={img}/>}
        </Fragment>
      )
    } else if (type === 'incomingNotification') {
      return (
        <div className="message system">
          {content}
        </div>
      )
    }
  }

  render() {

    const type = this.props.message.message.username ? 'incomingMessage' : 'incomingNotification'
    const message = this.createMessage(type);
    return (
      <Fragment>
        {message}
      </Fragment>
    )
  }
}
export default Message;


