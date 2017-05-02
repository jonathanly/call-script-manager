import React from 'react';
import axios from 'axios';
import AddQuestion from './AddQuestion';
import { withRouter } from 'react-router-dom';
import { RaisedButton, FontIcon } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class QuestionTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    this.getQuestions();
  };

  getQuestions = () => {
    const id = this.props.currentScript
    axios.get(`/scripts/${id}`)
    .then(res => {
      this.setState({ questions: res.data._questions })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteQuestion = (id) => {
    axios.delete(`/questions/${id}`)
    .then(res => {
      const questions = this.state.questions.filter((question) => (question._id !== id))
      // let { message } = res.data
      // console.log(message)
      this.setState({ message: "Hi", questions });
    })
    .catch(err => {
      // this.setState({ message: err });
    })
  }

  render() {
    const questionTable = this.state.questions.map((question, i) => {
      return (
        <TableRow key={i}>
          <TableRowColumn key={question._id}>{question.question}</TableRowColumn>
          <TableRowColumn><FontIcon className="fa fa-trash" onClick={(e) => this.deleteQuestion(question._id)} /></TableRowColumn>
        </TableRow>
      )
    })

    const NextStepButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          label="Next Step"
          secondary={true}
          onClick={(e) => {
            e.preventDefault();
            history.push('/scripts/answers')
          }}
        />
      )
    })

    return (
      <div>
        <AddQuestion
          getQuestions={this.getQuestions}
          currentScript={this.props.currentScript}
        />
        <br/>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Question</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {questionTable}
          </TableBody>
        </Table>
        <br/>
        <NextStepButton />
      </div>
    )
  }
}

export default QuestionTable;
