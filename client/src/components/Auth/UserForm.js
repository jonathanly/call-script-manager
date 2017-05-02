import React from 'react';
import TextField from 'material-ui/TextField';

class UserForm extends React.Component {
  handleChange = (event) => {
    event.preventDefault();
    const form = document.forms.userForm
    let newUser = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
      passwordConfirmation: form.passwordConfirmation.value
    }
    this.props.handleUserInput(newUser);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    return (
      <div>
        <form name="userForm">
          <TextField
            floatingLabelText="First Name"
            name="firstName"
            value={this.props.user.firstName}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Last Name"
            name="lastName"
            value={this.props.user.lastName}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Email"
            name="email"
            value={this.props.user.email}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Password"
            name="password"
            type="password"
            value={this.props.user.password}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Password Confirmation"
            name="passwordConfirmation"
            type="password"
            value={this.props.user.passwordConfirmation}
            onChange={this.handleChange}
          />
          <br />
        </form>
      </div>
    )
  }
}

export default UserForm
