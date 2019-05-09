import React, {Component, Fragment} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class Navbar extends Component {

  render() {
    const usersCount = this.props.connectedUsersCount;
    
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="navbar-usercount">{usersCount} {usersCount > 1 ? 'Users' : 'User'} connected</div>
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
      connectedUsersCount: null,
    }
    this.socket = undefined;
  }



  handleEnter = (messageBlock) => {
    const {newUsername} = messageBlock;
    
    if (newUsername) {  // if you are setting new username
      this.setState({
        currentUser: newUsername,
      });
    } 

    this.socket.send(JSON.stringify(messageBlock));
    
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const {connectedUsersCount} = data

      if (connectedUsersCount) {
        this.setState({
          connectedUsersCount: connectedUsersCount,
        })
        return;
      }


      this.setState({
        messages: [...this.state.messages, data],
      });
    }
  }


  componentDidUpdate() {
    window.scrollTo(0,document.body.scrollHeight); //always scroll to bottom after rendering
  }



  render() {
    return (
      <Fragment>
        <Navbar connectedUsersCount={this.state.connectedUsersCount}/>
        <MessageList currentUser={this.state.currentUser} messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} handleEnter={this.handleEnter}/>
      </Fragment>
    );
  }
}
export default App;
