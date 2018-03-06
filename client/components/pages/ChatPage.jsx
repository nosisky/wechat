import React, { Component } from 'react';
import { connect } from 'react-redux';
import OnlineLists from "../includes/OnlineLists";
import { getChatHistory, submitChat } from '../../actions/ChatActions';

const socket = io.connect('http://localhost:3000');


class ChatPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onlineUsers: {},
      onChatPage: false,
      message: '',
      receiverId: ''
    }

    this.renderOnlineUsers = this.renderOnlineUsers.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitChat = this.onSubmitChat.bind(this);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/');
    }
    socket.emit('connected user', this.props.user)

    socket.on('new online', (data) => {
      this.setState({
        onlineUsers: data
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    const oldReceiverId = this.props.match.params.id;
    const newReceiverId = nextProps.match.params.id;

    if (newReceiverId && newReceiverId !== oldReceiverId) {
      this.props.getChatHistory(newReceiverId)
        .then((response) => {
          if (response) {
            this.setState({
              onChatPage: true,
              receiverId: newReceiverId
            })
          }
        })
    }
  }

  renderMessage() {
    const allMessage = this.props.messages.messages;
    const receiverId = this.props.match.params.id;
    const userId = this.props.user.id;

    return allMessage.map((message) => {
      if (userId === message.receiverId) {
        return (
          <div key={message.id} className="row message-body">
            <div className="col-sm-12 message-main-receiver">
              <div className="receiver">
                <div className="message-text">
                  {message.message}
                </div>
                <span className="message-time pull-right">
                  sun
                </span>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div key={message.id} className="row message-body">
            <div className="col-sm-12 message-main-sender">
              <div className="sender">
                <div className="message-text">
                  {message.message}
                </div>
                <span className="message-time pull-right">
                  Sun
            </span>
              </div>
            </div>
          </div>
        )
      }
    })
  }

  onSubmitChat(event) {
    event.preventDefault();
    this.props.submitChat(this.state);
  }

  onChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  renderOnlineUsers() {
    let users = Object.keys(this.state.onlineUsers);

    return users.map((user, i) => {
      let username = this.state.onlineUsers[user].username;
      let id = this.state.onlineUsers[user].id;
      return (
        <OnlineLists
          id={id}
          key={i}
          username={username}
          userId={this.props.user.id}
        />
      )
    })
  }

  render() {

    const main = `
            html,
            body,
            div,
      span {
            height: 100%;
          width: 100%;
          overflow: hidden;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
  
      #toast-container * {
            -moz - box - sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          height: 80px
      }
      `
    return (
      <div>
        <style>{main}</style>
        <div className="container app">
          <div className="row app-one">
            <div className="col-sm-4 side">
              <div className="side-one">
                <div className="row heading">
                  <div className="col-sm-3 col-xs-3 heading-avatar">
                    <div className="heading-avatar-icon">
                      <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                    </div>
                  </div>
                  <div className="col-sm-1 col-xs-1  heading-dot  pull-right">
                    <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true" />
                  </div>
                  <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                    <i className="fa fa-comments fa-2x  pull-right" aria-hidden="true" />
                  </div>
                </div>
                <div className="row searchBox">
                  <div className="col-sm-12 searchBox-inner">
                    <div className="form-group has-feedback">
                      <input id="searchText" type="text" className="form-control" name="searchText" placeholder="Search" />
                      <span className="glyphicon glyphicon-search form-control-feedback" />
                    </div>
                  </div>
                </div>
                {this.renderOnlineUsers()}
              </div>
            </div>

            <div className="col-sm-8 conversation">
              <div className="row heading">
                <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                  <div className="heading-avatar-icon">
                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                  </div>
                </div>
                <div className="col-sm-8 col-xs-7 heading-name">
                  <a className="heading-name-meta">John Doe
                  </a>
                  <span className="heading-online">Online</span>
                </div>
                <div className="col-sm-1 col-xs-1  heading-dot pull-right">
                  <i className="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true" />
                </div>
              </div>
              <div className="row message" id="conversation">
                {this.state.onChatPage && this.renderMessage()}
              </div>
              <div className="row reply">
                <div className="col-sm-1 col-xs-1 reply-emojis">
                  <i className="fa fa-smile-o fa-2x" />
                </div>
                <div className="col-sm-9 col-xs-9 reply-main">
                  <form name="chat-box" onSubmit={this.onSubmitChat}>
                    <input name="message" onChange={this.onChange}
                      className="form-control"
                      id="comment" required />
                  </form>
                </div>
                <div className="col-sm-1 col-xs-1 reply-recording">
                  <i className="fa fa-microphone fa-2x" aria-hidden="true" />
                </div>
                <div className="col-sm-1 col-xs-1 reply-send">
                  <i className="fa fa-send fa-2x" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
    apiStatus: state.auth.apiStatus,
    messages: state.chats
  };
}

export default connect(mapStateToProps, { getChatHistory, submitChat })(ChatPage);
