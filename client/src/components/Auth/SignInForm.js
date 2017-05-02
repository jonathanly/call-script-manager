import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { Link, withRouter } from 'react-router-dom';
import { signIn } from './AuthService';

const style = {
  paper: {
    padding: "1.5rem 0 1.5rem 0",
    margin: "0 auto",
    width: "350px"
  }
}

class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        email: '',
        password: ''
      }
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    let { email, password } = document.forms.userForm
    this.setState({
      form: {
        email: email.value,
        password: password.value
      }
    })
  }

  render() {
    const SignInButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          label="Sign In"
          primary={true}
          onClick={(e) => {
            e.preventDefault();
            signIn(this.state.form)
            .then(user => {
              this.props.onSignIn(user)
              history.push('/dashboard')
            })
            .catch(err => {
              console.log(err)
            })
          }}
        />
      )
    })

    return (
      <div>
        <h2>Sign In</h2>
        <Paper style={style.paper} zDepth={2} rounded={false}>
          <form name="userForm">
            <TextField
              name="email"
              floatingLabelText="Email"
              value={this.state.form.email}
              onChange={this.handleUserInput}
            />
            <br />
            <TextField
              name="password"
              type="password"
              floatingLabelText="Password"
              value={this.state.form.password}
              onChange={this.handleUserInput}
            />
            <br />
            <br />
            <SignInButton />
            <br />
            <p>Don't have an account? Sign up <Link to="/register">here</Link></p>
          </form>
        </Paper>
      </div>
    )
  }
}

export default SignInForm;
