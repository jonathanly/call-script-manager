import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getUser, signOut } from './components/Auth/AuthService';
import { FontIcon } from 'material-ui';
import './App.css';

import NavBar from './components/Layouts/NavBar';
import Dashboard from './components/Layouts/Dashboard';
import SignInForm from './components/Auth/SignInForm';
import SignUpForm from './components/Auth/SignUpForm';
import ActivationComplete from './components/Auth/ActivationComplete';
import ActivationPending from './components/Auth/ActivationPending';
import ContactContainer from './components/Contact/ContactContainer';
import ScriptsContainer from './components/Scripts/ScriptsContainer';
import AdminContainer from './components/Admin/AdminContainer';

const iconStyle = {
  color: "white"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  checkForUser = () => {
    this.setState({ currentUser: getUser() })
  }

  onSignIn = (user) => {
    this.setState({ currentUser: user })
  }

  onSignOut = () => {
    this.setState({ currentUser: null })
    signOut();
  }

  componentWillMount() {
    this.checkForUser();
  }

  render() {
    const checkUser = (this.state.currentUser)
    let navBar = null;
    if (checkUser) {
      navBar = <NavBar currentUser={this.state.currentUser} onSignOut={this.onSignOut} />;
    };

    const currentUser =  this.state;
    const PrivateRoute = ({ component, currentUser, ...rest }) => (
      <Route {...rest} render={props => (
        ( this.state.currentUser && this.state.currentUser.activated) ? (
          React.createElement(component, currentUser, props)
        ) :
        (this.state.currentUser && !this.state.currentUser.activated) ? (
          <Redirect to={{
            pathname: '/pending',
            state: { from: props.location }
          }}/>
        ) : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
          }}/>
        )
      )}/>
    )

    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div className="App">
            <div className="App-header">
              <h2><FontIcon className="fa fa-phone fa-6" style={iconStyle}/> Call Script Manager</h2>
                { navBar }
              <br />
            </div>

            <Switch>
              <Route path="/signin" render={() => <SignInForm onSignIn={this.onSignIn}/>} />
              <Route path="/register" render={() => <SignUpForm onSignIn={this.onSignIn}/>} />
              <Route path="/activate/:token" render={({ match }) => <ActivationComplete token={match.params.token} onSignIn={this.onSignIn}/>} />
              <Route path="/pending" component={ActivationPending}/>

              <PrivateRoute path="/dashboard" component={Dashboard} currentUser={currentUser}/>
              <PrivateRoute path="/contacts" component={ContactContainer} currentUser={currentUser}/>
              <PrivateRoute path="/scripts" component={ScriptsContainer} currentUser={currentUser}/>
              <PrivateRoute path="/admin" component={AdminContainer} currentUser={currentUser}/>
            </Switch>

          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
