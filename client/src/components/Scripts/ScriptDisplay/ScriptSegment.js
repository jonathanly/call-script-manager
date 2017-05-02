import React from 'react';
import axios from 'axios';
import { Paper } from 'material-ui';
import SegmentAnswer from './SegmentAnswer';

const style = {
  paper: {
    padding: "1rem",
    margin: "2em auto",
    width: "60vw"
  }
}

class ScriptSegment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      error: null
    }
  }

  componentWillMount() {
    this.getAnswers();
  }

  getAnswers = () => {
    const id = this.props.questionId
    axios.get(`/questions/${id}`)
    .then(res => {
      this.setState({ answers: res.data._answers })
    })
    .catch(error => {
      console.log(error)
      this.setState({ error })
    })
  }

  onSelect = (questionId) => {
    axios.get(`/questions/${questionId}`)
    .then(res => {
      this.props.onAnswerSelect(res.data)
    })
    .catch(error => {
      console.log(error)
      this.setState({ error })
    })
  }

  removeOtherAnswers = (selectedAnswerId) => {
    axios.get(`/answers/${selectedAnswerId}`)
    .then(res => {
      this.setState({ answers: [res.data] })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  render() {
    const answers = this.state.answers.map(answer => {
      return (
        <div onClick={(e) => {
          e.preventDefault();
          this.onSelect(answer._nextQuestion)
          this.removeOtherAnswers(answer._id)
        }}>
          <SegmentAnswer
            answer={answer.answer}
            nextQuestion={answer._nextQuestion}
          />
        </div>
      )
    })

    return (
      <Paper style={style.paper} zDepth={1} rounded={false}>
        <h3>{this.props.text}</h3>
        {answers}
      </Paper>
    )
  }
}

export default ScriptSegment;
