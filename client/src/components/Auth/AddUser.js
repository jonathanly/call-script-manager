import React from 'react';
import UserForm from './UserForm';
import { validateAdminForm } from './AuthService';

class AddUser extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      },
      error: null
    }

  }

  handleUserInput = (newUser) => {
    this.setState({
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        passwordConfirmation: newUser.passwordConfirmation
      }
    })
  }

  handleSubmit = () => {
    validateAdminForm(this.state.user)
    .then(data => {
      console.log('New User saved', this.state.user)
    })
    .catch(error => {
      this.setState({ error });
    })
  }

  render() {
    const { error } = this.state

    return (
      <div>
        { error && <p>{error.message}</p> }
        <UserForm
          user={this.state.user}
          handleUserInput={this.handleUserInput}
          handleSubmit={this.handleSubmit}
        />
      </div>

    )
  }
}

export default AddUser;
