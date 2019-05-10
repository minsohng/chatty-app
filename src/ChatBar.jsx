import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      message: "",
    }
  }

  handleChange = (event) => {
    const inputDOM = event.target.name;
    if (inputDOM === 'chatbar-message') {
      this.setState({
        message: event.target.value,
      });
      this.props.broadcastTyping();
    }
  }

  onEnter = (event) => {
    const inputDOM = event.target.name;
    // handle changing user name
    if (event.key === "Enter" && inputDOM === 'chatbar-username' && event.target.value !== this.props.currentUser) {
      this.props.handleEnter({
        message: {
          type: 'postNotification',
          content: `${this.props.currentUser} has changed their name to ${event.target.value}`,
        },
        newUsername: event.target.value,
      });
    }

    //handle chat message
    if (event.key === "Enter" &&inputDOM === 'chatbar-message') {
      this.props.handleEnter({
        message: {
          type: 'postMessage',
          content: this.state.message,
          username: this.props.currentUser,
        },
      });
      this.setState({
        message: "",
      });
    }
    
  }

  onKeyUp = () => {
    this.props.handleKeyUp();
  }

  render() {

    return (
      <footer className="chatbar">
        <input 
          className="chatbar-username"
          name="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue={this.props.currentUser}
          onChange={this.handleChange}
          onKeyPress={this.onEnter}
        />
        <input
          className="chatbar-message"
          name="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onEnter}
          onChange={this.handleChange}
          value={this.state.message}
          onKeyUp={this.onKeyUp}
        />
      </footer>
    )
  }
}
export default ChatBar;
