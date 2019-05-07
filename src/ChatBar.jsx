import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: 'Anonymous',
      message: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  }

  onEnter = (event) => {
    if(event.key === "Enter") {

      this.props.handleEnter({
        message: {
          type: 'incomingMessage',
          content: this.state.message,
          username: this.state.currentUser,
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
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}/>
        <input
          className="chatbar-message"
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
