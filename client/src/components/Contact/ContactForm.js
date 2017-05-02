import React from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class ContactForm extends React.Component {
  handleChange = (event) => {
    event.preventDefault();
    const form = document.forms.contactForm
    let newContact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      mobile: form.mobile.value,
      group: form.group.value
    }
    this.props.handleUserInput(newContact);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <form name='contactForm'>
          <TextField
            floatingLabelText="First Name"
            name='firstName'
            value={this.props.contact.firstName}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Last Name"
            name='lastName'
            value={this.props.contact.lastName}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Email"
            name="email"
            type="email"
            value={this.props.contact.email}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Phone"
            name='phone'
            value={this.props.contact.phone}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Mobile"
            name='mobile'
            value={this.props.contact.mobile}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            floatingLabelText="Group"
            name='group'
            value={this.props.contact.group}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <RaisedButton
            primary={true}
            label="Submit"
            onClick={this.props.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

export default ContactForm;
