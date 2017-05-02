import React from 'react';
import { Paper, RaisedButton } from 'material-ui';
import { validateQuestion, saveQuestion } from './ScriptService';

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

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        question: '',
        scriptId: ''
      },
      message: null,
      error: null
    }
  }

  handleUserInput = (question) => {
    this.setState({
      form: {
        question,
        scriptId: this.props.currentScript
      }
    });
  }

  handleSubmit = (e) => {
    console.log('sending: ', this.state.form)
    validateQuestion(this.state.form)
    .then(validatedQuestion => {
      saveQuestion(this.state.form)
      .then(res => {
        this.setState({
          form: {
            question: '',
            scriptId: ''
          },
          message: res.message,
          error: null
         })
        this.props.getQuestions();
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

    return (
      <div>
        { error && <p style={style.error}>{error.message}</p>}
        { message && <p style={style.success}>{message}</p>}

        <Paper style={style.paper} zDepth={2} rounded={false}>
          <h3>Enter Your Question</h3>
          <QuestionForm
            question={this.state.form.question}
            handleUserInput={this.handleUserInput}
          />
          <br/>
          <RaisedButton
            label="Save Question"
            primary={true}
            onClick={this.handleSubmit}
          />
        </Paper>
      </div>
    )
  }
}

export default AddQuestion;
