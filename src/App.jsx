import React, {Component, Fragment} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}


class App extends Component {

  constructor(props) {
    super();
    this.state = {
      currentUser: 'Anonymous',
      messages: [],
    }
    this.socket = undefined;
  }



  handleEnter = (messageBlock) => {
    const {newUsername} = messageBlock;

    if (newUsername) {  // if you are setting new username
      this.setState({
        currentUser: newUsername,
      });
    } else { 
      this.socket.send(JSON.stringify(messageBlock));
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      this.setState({
        messages: [...this.state.messages, data.message],
        
      })
    }

  }



  render() {
    return (
      <Fragment>
        <Navbar />
        <MessageList currentUser={this.state.currentUser} messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} handleEnter={this.handleEnter}/>
      </Fragment>
    );
  }
}
export default App;
