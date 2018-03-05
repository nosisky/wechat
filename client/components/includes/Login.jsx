import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginAction } from '../../actions/UserActions';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.loginAction(this.state)
      .then((response) => {
        if (response) {
          this.props.history.push('/chat');
        }
      });
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}
          id="login-form" style={{ display: 'block' }}>
          <div className="form-group">
            <input type="text" onChange={this.onChange} name="username" id="username"
              className="form-control" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input onChange={this.onChange}
              type="password" name="password" id="password"
              className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group text-center">
            <input type="checkbox" name="remember"
              id="remember" />
            <label htmlFor="remember"> Remember Me</label>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input type="submit" name="login-submit"
                  id="login-submit"
                  className="form-control btn btn-login" value="Log In" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <a href="#"
                    className="forgot-password">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { loginAction })(Login));

