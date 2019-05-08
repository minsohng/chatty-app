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
    }
  }

  onEnter = (event) => {
    const inputDOM = event.target.name;

    if (event.key === "Enter" && inputDOM === 'chatbar-username') {
      this.props.handleEnter({
        newUsername: event.target.value,
      });
    }

    if (event.key === "Enter" &&inputDOM === 'chatbar-message') {
      this.props.handleEnter({
        message: {
          type: 'incomingMessage',
          content: this.state.message,
          username: this.props.currentUser,
        },
      });
      this.setState({
        message: "",
      });
    }
    
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
        />
      </footer>
    )
  }
}
export default ChatBar;
