import React from 'react';
import { Link, Route } from 'react-router-dom';

import ContactTable from './ContactTable';
import AddContact from './AddContact';
import { RaisedButton } from 'material-ui';

const style = {
  margin: '0px 10px 30px 10px',
  width: "200px"
};

const ContactContainer = (props) => {
  return (
    <div>
      <h2>Contacts</h2>
        <Link to="/contacts/add">
          <RaisedButton label="New Contact" style={style}/>
        </Link>
        <Link to="/contacts/all">
          <RaisedButton label="View All Contacts" style={style}/>
        </Link>

      <Route exact path="/contacts/add" render={() => <AddContact currentUser={props.currentUser}/>}/>
      <Route exact path="/contacts/all" render={() => <ContactTable currentUser={props.currentUser}/>}/>
    </div>
  )
}

export default ContactContainer;
