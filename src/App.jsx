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
  }

  handleEnter = (messageBlock) => {
    console.log(messageBlock)
    this.setState({
      messages: [...this.state.messages, messageBlock.message],
      currentUser: messageBlock.message.username,
    });

  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 11, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
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
