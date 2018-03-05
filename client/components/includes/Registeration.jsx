import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerAction } from '../../actions/UserActions';


class Registeration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(event) {
    event.preventDefault();
    this.props.registerAction(this.state)
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
        <form id="register-form"
          onSubmit={this.onSubmit}
          style={{ display: 'none' }}>
          <div className="form-group">
            <input type="text"
              name="username" id="username"
              pattern=".{4,}"
              title="4 characters minimum"
              className="form-control"
              onChange={this.onChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="a valid email, e.g: hello@gmail.com"
              name="email" id="email"

              className="form-control"
              placeholder="Email Address"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              pattern=".{4,}"
              title="4 characters minimum"
              type="password"
              name="password"
              id="password"
              className="form-control"
              onChange={this.onChange}
              placeholder="Password"
              required />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <input type="submit" name="register-submit" id="register-submit"
                  className="form-control btn btn-register"
                  defaultValue="Register" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { registerAction })(Registeration));
