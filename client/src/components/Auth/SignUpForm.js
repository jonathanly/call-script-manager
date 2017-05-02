import React from 'react';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { signUp } from './AuthService';

const style = {
  paper: {
    padding: "1.5rem 0 1.5rem 0",
    margin: "0 auto",
    width: "350px"
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        businessName: '',
        businessAddress: ''
      },
      error: null
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    let { firstName, lastName, email, password, passwordConfirmation, businessName, businessAddress } = document.forms.registrationForm
    this.setState({
      form: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        passwordConfirmation: passwordConfirmation.value,
        type: "admin",
        businessName: businessName.value,
        businessAddress: businessAddress.value
      }
    })
  }

  render() {
    const SignUpButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          label="Sign Up"
          primary={true}
          onClick={(e) => {
            e.preventDefault()
            signUp(this.state.form)
            .then(user => {
              console.log(user)
              this.props.onSignIn(user)
              history.push('/pending')
            })
            .catch(err => {
              console.log(err)
            })
          }}
        />
      )
    })

    return (
      <Paper style={style.paper} zDepth={2} rounded={false}>
        <form name="registrationForm">
          <h4>User Details</h4>
          <TextField
            floatingLabelText="First Name"
            name="firstName"
            value={this.state.form.firstName}
            onChange={this.handleUserInput}
          />
          <br />
          <TextField
            floatingLabelText="Last Name"
            name="lastName"
            value={this.state.form.lastName}
            onChange={this.handleUserInput}
          />
          <br />
          <TextField
            floatingLabelText="Email"
            name="email"
            value={this.state.form.email}
            onChange={this.handleUserInput}
          />
          <br />
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            value={this.state.form.password}
            onChange={this.handleUserInput}
          />
          <br />
          <TextField
            floatingLabelText="Password Confirmation"
            name="passwordConfirmation"
            type="password"
            value={this.state.form.passwordConfirmation}
            onChange={this.handleUserInput}
          />
          <br />
          <h4>Business Details</h4>
          <TextField
            floatingLabelText="Business Name"
            name="businessName"
            type="businessName"
            value={this.state.form.businessName}
            onChange={this.handleUserInput}
          />
          <br />
          <TextField
            floatingLabelText="Business Address"
            name="businessAddress"
            type="businessAddress"
            value={this.state.form.businessAddress}
            onChange={this.handleUserInput}
          />
          <br />
          <SignUpButton />
        </form>
      </Paper>
    )
  }
}

export default SignUpForm;
