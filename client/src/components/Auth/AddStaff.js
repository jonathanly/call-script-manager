import React from 'react';
import { RaisedButton, Paper } from 'material-ui';
import UserForm from './UserForm';
import { validateStaffForm, newStaff } from './AuthService';
import { withRouter } from 'react-router-dom';

const style = {
  paper: {
    padding: "1.5rem 0 1.5rem 0",
    margin: "0 auto",
    width: "350px"
  },
  error: {
    color: 'red'
  },
  success: {
    color: 'green'
  }
}

class AddStaff extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      staff: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          businessId: ''
      },
      message: null,
      error: null
    }
  }

  handleUserInput = (newStaff) => {
    this.setState({
      staff: {
        email: newStaff.email,
        firstName: newStaff.firstName,
        lastName: newStaff.lastName,
        password: newStaff.password,
        passwordConfirmation: newStaff.passwordConfirmation,
        businessId: this.props.currentUser._business
      }
    })
  }

  render() {
    console.log(this.state.error)
    const { message } = this.state
    const { error } = this.state
    const CreateStaffButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          label="Add Staff"
          primary={true}
          onClick={(e) => {
            e.preventDefault()
            validateStaffForm(this.state.staff)
            .then(res => {
              newStaff(res)
              .then(staff => {
                this.setState({
                  message: staff.message,
                  error: null,
                  staff: {
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      passwordConfirmation: '',
                      businessId: ''
                  }
                })
              })
              .catch(error => {
                this.setState({ error });
              })
            })
            .catch(error => {
              this.setState({ error });
            })
          }}
        />
      )
    })

    return (
      <div>
        { error && <p style={style.error}>{error.message}</p>}
        { message && <p style={style.success}>{message}</p>}

        <Paper style={style.paper} zDepth={1} rounded={false}>
          <h2>Create Staff Account</h2>
          <UserForm
            user={this.state.staff}
            handleUserInput={this.handleUserInput}
          />
          <br/>
          <CreateStaffButton/>
        </Paper>
      </div>
    )
  }
}

export default AddStaff;
