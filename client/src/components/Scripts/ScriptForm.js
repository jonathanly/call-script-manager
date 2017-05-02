import React from 'react';
import { withRouter } from 'react-router-dom';
import { TextField, RaisedButton, Paper } from 'material-ui';
import { validateScriptForm, saveScript } from './ScriptService';

const style = {
  paper: {
    padding: "1.5rem 1.5rem",
    margin: "0 auto",
    width: "75vw"
  },
  button: {
    margin: "0 1em",
    width: "150px"
  },
  error: {
    color: 'red'
  },
  success: {
    color: 'green'
  }
}

class ScriptForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        title: '',
        businessId: ''
      },
      message: null,
      error: null
    }
  }

  handleUserInput = (e) => {
    e.preventDefault();
    this.setState({
      form: {
        title: document.forms.scriptForm.title.value,
        businessId: this.props.currentUser._business
      }
    })
  }

  onSubmit = (e) => {
    validateScriptForm(this.state.form)
    .then(validatedForm => {
      saveScript(validatedForm)
      .then(res => {
        this.setState({
          message: res.message,
          error: null
        })
        this.props.onScriptCreate(res.script._id)
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
    const { message } = this.state
    const { error } = this.state
    const NextButton = withRouter(({ history }) => {
      return (
        <RaisedButton
          className="nextButton"
          label="Next Step"
          style={style.button}
          secondary={true}
          onClick={(e) => {
            e.preventDefault();
            this.onSubmit();
            history.push('/scripts/startQuestion')
          }}
        />
      )
    })

    return(
      <div>
        { error && <p style={style.error}>{error.message}</p>}
        { message && <p style={style.success}>{message}</p>}

        <Paper style={style.paper} zDepth={1} rounded={false}>
          <h3>New Script Name</h3>
          <form name="scriptForm">
            <TextField
              hintText="Title"
              name="title"
              fullWidth={true}
              multiLine={true}
              value={this.state.form.title}
              onChange={this.handleUserInput}
              onSubmit={this.onSubmit}
            />
            <br/>
          </form>
          <br/>
          <RaisedButton
            label="Save"
            primary={true}
            style={style.button}
            onClick={this.onSubmit}
          />
          <NextButton />
        </Paper>
      </div>
    )
  }
}

export default ScriptForm;
