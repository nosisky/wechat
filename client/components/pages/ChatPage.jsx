import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Link } from 'react-router-dom'
import jwt from 'jsonwebtoken';

import OnlineLists from "../includes/OnlineLists";
import Footer from "../includes/Footer";
import { getChatHistory, submitChat } from '../../actions/ChatActions';
import { logoutAction } from '../../actions/UserActions';

const socket = io.connect('/');


class ChatPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      onlineUsers: {},
      onChatPage: false,
      message: '',
      receiverId: '',
      messageReceived: false
    }

    this.renderOnlineUsers = this.renderOnlineUsers.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmitChat = this.onSubmitChat.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMic = this.onMic.bind(this);

  }


  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/');
    }

    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);

    socket.emit('connected user', decoded.currentUser)

    socket.on('new online', (data) => {
      this.setState({
        onlineUsers: data
      })
    })
  }

  onClick() {
    this.props.logoutAction()
      .then((response) => {
        socket.disconnect();
        this.props.history.push('/')
      })
  }

  onMic() {
    recognition.start()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.messages.length
      > this.props.messages.messages.length) {
      this.setState({
        messageReceived: true
      }, () => {
        if (document.getElementById('conversation')) {
          document
            .getElementById('conversation')
            .scrollTop = document.getElementById('conversation').scrollHeight;
        }
      })
    }

    const oldReceiverId = this.props.match.params.id;
    const newReceiverId = nextProps.match.params.id;

    if (newReceiverId && newReceiverId !== oldReceiverId) {
      this.props.getChatHistory(newReceiverId)
      if (!this.props.apiStatus) {
        this.setState({
          onChatPage: true,
          receiverId: newReceiverId
        }, () => {
          if (document.getElementById('conversation')) {
            document
              .getElementById('conversation')
              .scrollTop = document.getElementById('conversation').scrollHeight;
          }
        })
      }
    }
  }

  renderMessage() {
    const allMessage = this.props.messages.messages;
    const receiverId = this.props.match.params.id;
    const userId = this.props.user.id;

    return allMessage.map((message) => {
      if (userId === message.receiverId
        && message.senderId === Number(receiverId)) {
        return (
          <div key={message.id} className="row message-body">
            <div className="col-sm-12 message-main-receiver">
              <div className="receiver">
                <div className="message-text">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        if (userId === message.senderId) {
          return (
            <div key={message.id} className="row message-body">
              <div className="col-sm-12 message-main-sender">
                <div className="sender">
                  <div className="message-text">
                    {message.message}
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }
    })
  }

  onSubmitChat(event) {
    event.preventDefault();

    const inputValue = $("#main-text").val();

    if (this.state.message.length < 1) {
      this.setState({
        message: inputValue
      }, () => {
        this.props.submitChat(this.state)
          .then(() => {
            this.setState({
              message: ''
            })
          })
      })
    } else {
      this.props.submitChat(this.state)
        .then(() => {
          this.setState({
            message: ''
          })
        })
    }
  }

  insertEmoji() {
    const previousText = $("#main-text").val();

    $("#main-text").val(previousText + ' 😁😁😁');
  }

  onChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  renderOnlineUsers() {
    const receiverId = this.props.match.params.id;
    let users = Object.keys(this.state.onlineUsers);

    return users.map((user, i) => {
      let username = this.state.onlineUsers[user].username;
      let id = this.state.onlineUsers[user].id;
      return (
        id && <OnlineLists
          id={id}
          key={i}
          onlineId={receiverId}
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
            <div className="col-sm-4 side hidden-xs">
              <div className="side-one">
                <div className="row heading">
                  <div className="col-sm-3 col-xs-3 heading-avatar">
                    <div className="heading-avatar-icon">
                      <img src="/img/whatsapp.png" />
                    </div>
                  </div>
                  <div className="col-sm-2 col-xs-2 heading-compose  pull-right">
                    <Link to="/"> <i
                      className="fa fa-home fa-2x  pull-right"
                      aria-hidden="true" /></Link>
                  </div>
                </div>

                {this.renderOnlineUsers()}
              </div>
            </div>

            <div className="col-sm-8 conversation">
              <Loader
                width={20}
                radius={50}
                loaded={!this.props.apiStatus}>
                <div className="row heading">
                  <div className="col-sm-2 col-md-1 col-xs-3 heading-avatar">
                    <div className="heading-avatar-icon">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                    </div>
                  </div>

                  <div className="col-sm-8 col-xs-7 heading-name">
                    <a className="heading-name-meta">{this.props.user.username}
                    </a>
                    <span className="heading-online">Online</span>
                  </div>
                  <div className="col-sm-1 col-xs-1  heading-dot pull-right">
                    <i onClick={this.onClick}
                      className="fa fa-times-circle fa-2x  pull-right" aria-hidden="true" />
                  </div>
                </div>
                <div className="row message" id="conversation">
                  {!this.state.onChatPage &&
                    <h1 id="welcome-message" style={{ textAlign: 'center' }}>
                      Welcome to WeChat {this.props.username &&
                        this.props.user.username.toUpperCase()}, <br />
                      select an online user from the left menu to begin a chat.</h1>
                  }
                  {this.state.onChatPage &&
                    this.renderMessage()}

                </div>
                {this.state.onChatPage &&
                  <div className="row reply">
                    <div className="col-sm-1 col-xs-1 reply-emojis">
                      <i onClick={this.insertEmoji}
                        className="fa fa-smile-o fa-2x" />
                    </div>
                    <div className="col-sm-9 col-xs-9 reply-main">
                      <form id="message_form"
                        name="chat-box" onSubmit={this.onSubmitChat}>
                        <input name="message" onChange={this.onChange}
                          className="form-control"
                          id="main-text"
                          placeholder="Type your message..."
                          required autoFocus />
                      </form>
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-recording">
                      <i onClick={this.onMic}
                        className="fa fa-microphone fa-2x" aria-hidden="true" />
                    </div>
                    <div className="col-sm-1 col-xs-1 reply-send">
                      <i className="fa fa-send fa-2x" aria-hidden="true" />
                    </div>
                  </div>}
              </Loader>

            </div>


          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, {
  logoutAction,
  getChatHistory, submitChat
})(ChatPage);
