import React from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { withRouter } from 'react-router-dom';
import { validateStartQuestion, saveStartQuestion } from './ScriptService';

import QuestionForm from './QuestionForm';

const style = {
  paper: {
    padding: "1.5rem 1.5rem",
    margin: "0 auto",
    width: "75vw"
  },
  error: {
    color: 'red'
  },
  success: {
    color: 'green'
  }
}

class StartQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        startQuestion: '',
        scriptId: ''
      },
      message: null,
      error: null
    }
  }

  handleUserInput = (startQuestion) => {
    this.setState({
      form: {
        startQuestion,
        scriptId: this.props.currentScript
      }
    });
  }

  handleSubmit = (e) => {
    console.log('sending: ', this.state.form)
    validateStartQuestion(this.state.form)
    .then(validatedQuestion => {
      saveStartQuestion(validatedQuestion)
      .then(res => {
        this.setState({
          message: res.message,
          error: null
        })
      })
      .catch(error => {
        this.setState({ error })
      })
    })
    .catch(error => {
      this.setState({ error })
    })

  }

  render() {
    const { error } = this.state
    const { message } = this.state

    const NextStepButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          label="Next Step"
          secondary={true}
          onClick={(e) => {
            e.preventDefault();
            history.push('/scripts/questions')
          }}
        />
      )
    })

    return (
      <div>
        { error && <p style={style.error}>{error.message}</p>}
        { message && <p style={style.success}>{message}</p>}

        <Paper style={style.paper} zDepth={1} rounded={false}>
          <h3>Enter The Starting Question</h3>
          <QuestionForm
            question={this.state.form.startQuestion}
            handleUserInput={this.handleUserInput}
          />
          <br/>
          <RaisedButton
            label="Save Start Question"
            primary={true}
            onClick={this.handleSubmit}
          />
          <br/>
          <br/>
          <NextStepButton />
        </Paper>
      </div>
    )
  }
}

export default StartQuestionForm;
