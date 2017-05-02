import React from 'react';
import { Route, Switch } from 'react-router-dom'
import AdminMenu from './AdminMenu';
import StaffTable from './StaffTable';
import AddStaff  from '../Auth/AddStaff';

const AdminContainer = (props) => {
  return(
    <div>
      <h1>Admin Menu</h1>
      <Switch>
        <Route path="/admin/menu" component={AdminMenu} />
        <Route path="/admin/stafftable" render={() => <StaffTable currentUser={props.currentUser}/>} />
        <Route path="/admin/addstaff" render={() => <AddStaff currentUser={props.currentUser}/> } />
      </Switch>
    </div>
  )
}

export default AdminContainer;

// DELICIOUS DELICIOUS ZOMBIE CODE
//
// class AdminContainer extends React.Component {
//   render() {
//     return(
//       <div>
//         <h1>Admin Menu</h1>
//         <Switch>
//           <Route path="/admin/menu" component={AdminMenu} />
//           <Route path="/admin/stafftable" render={() => <StaffTable currentUser={this.props.currentUser}/>} />
//           <Route path="/admin/addstaff" render={() => <AddStaff currentUser={this.props.currentUser}/> } />
//         </Switch>
//       </div>
//     )
//   }
// }
