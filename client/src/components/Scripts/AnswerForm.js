import React from 'react';
import { DropDownMenu, MenuItem, TextField, RaisedButton, Paper } from 'material-ui';
import { saveAnswer, getQuestionsAndAnswers } from './ScriptService';

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

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      answers: [],
      parentQuestionId: '',
      answerValue: '',
      nextQuestionId: '',
      scriptId: '',
      message: null,
      error: null
    }
  }

  componentDidMount() {
    this.getQuestionsAndAnswers();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { parentQuestionId, answerValue, nextQuestionId, scriptId } = this.state
    const answer = {
      parentQuestionId,
      answerValue,
      nextQuestionId,
      scriptId
    }

    saveAnswer(answer)
    .then(res => {
      this.setState({
        parentQuestionId: '',
        answerValue: '',
        nextQuestionId: '',
        message: res.message,
        error: null
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  getQuestionsAndAnswers = () => {
    const id = this.props.currentScript
    getQuestionsAndAnswers(id)
    .then(res => {
      this.setState({
        questions: res._questions,
        answers: res._answers
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  handleParentQuestionChange = (e, index, value) => {
    e.preventDefault();
    this.setState({ parentQuestionId: value })
  }

  handleAnswerChange = (e) => {
    e.preventDefault();
    this.setState({
      answerValue: document.forms.answerForm.answer.value,
      scriptId: this.props.currentScript
    });
  }

  handleNextQuestionChange = (e, index, value) => {
    e.preventDefault();
    this.setState({ nextQuestionId: value })
  }

  render () {
    const { error } = this.state
    const { message } = this.state

    const showQuestions = this.state.questions.map(question => {
      return <MenuItem
        key={question._id}
        value={ question._id }
        primaryText={question.question}
      />
    });

    //TODO add filter out parent qustion so next question only show next questions

    return (
      <div>
        { error && <p style={style.error}>{error.message}</p>}
        { message && <p style={style.success}>{message}</p>}

        <Paper style={style.paper} zDepth={2} rounded={false}>
          <form name="answerForm">
            <h2>Answer Creation</h2>
            <h4>Parent Question</h4>
            <DropDownMenu
              maxHeight={300}
              name="parentQuestion"
              value={this.state.parentQuestionId}
              onChange={this.handleParentQuestionChange}
            >
              {showQuestions}
            </DropDownMenu>
            <br />
            <h4>Answer</h4>
            <TextField
              hintText="Answer"
              name="answer"
              fullWidth={true}
              multiLine={true}
              value={this.state.answerValue}
              onChange={this.handleAnswerChange}
            />
            <br />
            <h4>Next Question</h4>
            <DropDownMenu
              maxHeight={300}
              name="nextQuestion"
              value={this.state.nextQuestionId}
              onChange={this.handleNextQuestionChange}
            >
              {showQuestions}
              <MenuItem
                key="nonextquestion"
                primaryText="<End of script thread>"
              />
            </DropDownMenu>
            <br />
            <RaisedButton
              primary={true}
              label="Submit"
              onClick={this.handleSubmit}
            />
          </form>
        </Paper>
      </div>
    )
  }
}

export default AnswerForm;
