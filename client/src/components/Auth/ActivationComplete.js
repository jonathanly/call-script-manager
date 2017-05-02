import React from 'react';
import axios from 'axios';
import decodeJWT from 'jwt-decode'
import { Link } from 'react-router-dom';
import { writeToken } from './AuthService';

class ActivationComplete extends React.Component {

  activateAccount = () => {
    const { token } = this.props;

    axios.post(`/auth/activate/${token}`)
    .then(token => {
      console.log(token)
      const { onSignIn } = this.props
      let user = decodeJWT(token)
      writeToken(token);
      onSignIn(user);
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.activateAccount();
  }

  render() {
    return (
      <div>
        <p>Your account has been activated</p>
        <p>Click <Link to="/dashboard">here</Link> to continue to your dashboard</p>
      </div>
    )
  }
}

export default ActivationComplete;
