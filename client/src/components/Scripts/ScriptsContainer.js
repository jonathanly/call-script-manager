import React from 'react';
import { Route, Switch } from 'react-router-dom'

import ScriptMenu from './ScriptMenu';
import ScriptForm from './ScriptForm';
import StartQuestionForm from './StartQuestionForm';
import QuestionTable from './QuestionTable';
import AnswerForm from './AnswerForm';
import ScriptDisplay from './ScriptDisplay/ScriptDisplay';

class ScriptsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptId: ''
    }
  }

  onScriptCreate = (scriptId) => {
    this.setState({ scriptId })
  }

  render() {
    return(
      <div>
        <h2>Scripts</h2>
        <p>Test Script ID: 58dc4d51ae192bb635a096a9</p>
        <Switch>
          <Route path="/scripts/menu" render={() =>
            <ScriptMenu
              currentUser={this.props.currentUser}
              currentScript={this.state.scriptId}
            />}
          />
          <Route path="/scripts/new" render={() =>
            <ScriptForm
              currentUser={this.props.currentUser}
              onScriptCreate={this.onScriptCreate}
            />}
          />
          <Route path="/scripts/startQuestion" render={() =>
            <StartQuestionForm
              currentUser={this.props.currentUser}
              currentScript={this.state.scriptId}
            />}
          />
          <Route path="/scripts/questions" render={() =>
            <QuestionTable
              currentUser={this.props.currentUser}
              currentScript={this.state.scriptId}
            />}
          />
          <Route path="/scripts/answers" render={() =>
            <AnswerForm
              currentUser={this.props.currentUser}
              currentScript={this.state.scriptId}
            />}
          />
          <Route path="/scripts/play/:id" render={({ match }) =>
            <ScriptDisplay
              currentUser={this.props.currentUser}
              scriptId={match.params.id}
            />}
          />
        </Switch>
      </div>
    )
  }
}

// render={({ match }) => <ActivationComplete token={match.params.token} onSignIn={this.onSignIn}/>} />

export default ScriptsContainer
