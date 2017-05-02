import React from 'react';
import axios from 'axios'
import ScriptSegment from './ScriptSegment';

class ScriptDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startQuestion: [],
      segments: [],
      error: null
    }
  }

  componentDidMount() {
    this.loadStartQuestion(this.props.scriptId);
  }

  loadStartQuestion = (id) => {
    axios.get(`/scripts/${id}`)
    .then(res => {
      this.setState({
        startQuestion: [res.data._startQuestion],
        segments: [res.data._startQuestion]
      })
    })
    .catch(error => {
      this.setState({ error })
    })
  }

  onAnswerSelect = (nextQuestion) => {
    let segments = this.state.segments.slice();
    segments.push(nextQuestion);
    this.setState({ segments })
  }

  render() {
    const segments  = this.state.segments.map((segment, i) => {
      const { _id, _answers } = segment
      return (
        <ScriptSegment
          key={i}
          questionId={_id}
          text={segment.question}
          answers={_answers}
          onAnswerSelect={this.onAnswerSelect}
        />
      )
    });

    return (
      <div>
        {segments}
      </div>
    )
  }
}

export default ScriptDisplay;
