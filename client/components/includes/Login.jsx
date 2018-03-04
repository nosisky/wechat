import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/UserActions';


class Login extends Component {
  render() {
    return (
      <div>
        <form id="login-form" style={{ display: 'block' }}>
          <div className="form-group">
            <input type="text" name="username" id="username"
              className="form-control" placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" name="password" id="password"
              className="form-control" placeholder="Password" />
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

export default connect(null, { loginAction })(Login);
