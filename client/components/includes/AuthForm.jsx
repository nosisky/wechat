import React, { Component } from 'react';
import Login from './Login';
import Registeration from './Registeration';

class AuthForm extends Component {
  render() {
    return (
      <div className="col-lg-6">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a href="#" className="active"
                      id="login-form-link">Login</a>
                  </div>
                  <div className="col-xs-6">
                    <a href="#" id="register-form-link">Register</a>
                  </div>
                </div>
                <hr />
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                    <Login />
                    <Registeration />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
