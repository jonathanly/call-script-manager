import React from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import {Paper} from 'material-ui';

const style = {
  paper: {
    padding: "1.5rem 0 1.5rem 0",
    margin: "0 auto",
    width: "375px"
  }
}

class AddContact extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contact: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        mobile: '',
        business: '',
        group: ''
      },
      message: null,
      error: null
    }
  }

  handleUserInput = (newContact) => {
    this.setState({
      contact: {
        firstName: newContact.firstName,
        lastName: newContact.lastName,
        email: newContact.email,
        phone: newContact.phone,
        mobile: newContact.mobile,
        business: this.props.currentUser._business,
        group: newContact.group
      }
    })
  }

  handleSubmit = () => {
    const newContact = this.state.contact
    axios.post('/contacts', newContact)
    .then(res => {
      let { message, contact, business } = res.data
      console.log('Contact created: ', contact);
      console.log("Business created", business)
      this.setState({
        message,
        contact: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          mobile: '',
          business: '',
          group: ''
        }
       });
    })
    .then(error => {
      this.setState({ error });
    })
  }

  render() {
    const { message } = this.state;
    const { error } = this.state;

    return (
      <div>
        { error && <p>{error.message}</p> }
        { message && <p>{message}</p> }
        <Paper style={style.paper} zDepth={2} rounded={false}>
          <h3>New Contact</h3>
          <ContactForm
            contact={this.state.contact}
            handleUserInput={this.handleUserInput}
            handleSubmit={this.handleSubmit}
          />
        </Paper>
      </div>
    )
  }
}

export default AddContact;
