import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from 'react-loader';

import AuthForm from '../includes/AuthForm';
import NavBar from '../includes/NavBar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.setState({
      loaded: true
    })
  }
  render() {
    return (
      <Loader
        width={20}
        radius={50}
        loaded={this.state.loaded}>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h1
                  className="hidden-xs"
                  style={{
                    fontFamily: 'cursive',
                    fontSize: 99,
                    color: 'green',
                    backgroundColor: 'white',
                    paddingTop: 80,
                    marginTop: -1,
                    marginBottom: 8,
                    padding: 54,
                    paddingBottom: 75,
                    wordBreak: 'break-word',
                    borderRadius: 10
                  }}>
                  Welcome to WeChat!
            </h1>
              </div>
              <AuthForm />
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}

export default HomePage;
