import React from 'react';
import { TextField } from 'material-ui';

class QuestionForm extends React.Component {
  handleChange = (e) => {
    e.preventDefault();
    let question = document.forms.questionForm.question.value
    this.props.handleUserInput(question);
  }

  render () {
    return (
      <div>
        <form name="questionForm">
          <br />
          <TextField
            hintText="Question"
            name="question"
            fullWidth={true}
            multiLine={true}
            value={this.props.question}
            onChange={this.handleChange}
          />
          <br />
        </form>
      </div>
    )
  }
}

export default QuestionForm;
