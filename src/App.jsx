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
      messages: [
        {
          username: undefined,
          content: undefined,
        }
      ],
    }
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <MessageList />
        <ChatBar/>
      </Fragment>
    );
  }
}
export default App;
