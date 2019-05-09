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
      isTyping: false,
    }
    this.socket = undefined;
  }

  broadcastTyping = () => {
    this.socket.send(JSON.stringify({isTyping: true})); 
  }

  handleKeyUp = () => {
    this.socket.send(JSON.stringify({notTyping: true}));
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

  handleKeyUp = () => {
    this.socket.send(JSON.stringify({notTyping: true})); 
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const {connectedUsersCount} = data;
      const {isTyping, notTyping} = data;
      if (isTyping) {
        this.setState({
          isTyping: true,
        });
        return;
      }

      if (notTyping) {
        this.setState({
          isTyping: false,
        });
        return;
      }



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
        
        <ChatBar 
          currentUser={this.state.currentUser} 
          handleEnter={this.handleEnter} 
          broadcastTyping={this.broadcastTyping} 
  
          handleKeyUp={this.handleKeyUp}
        />
        <TypeIndicator isTyping={this.state.isTyping}/>
      </Fragment>
    );
  }
}

class TypeIndicator extends Component {

  shouldComponentUpdate() {
    if (this.props.isTyping === true) {
      return false;
    } 
    return true;

  }
  
  render() {
    return <div className="typing-indicator message system">{this.props.isTyping ? 'someone is typing...' : undefined}</div>
  }
}
export default App;
