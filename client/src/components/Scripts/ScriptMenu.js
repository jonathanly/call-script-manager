import React from 'react';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '60vw',
    height: '80vh'
  },
};

class ScriptMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scripts: [],
      error: null
    }
  }

  componentDidMount() {
    this.getScripts();
  }

  getScripts = () => {
    const id = this.props.currentUser._business

    axios.get(`/business/${id}`)
    .then(res => {
      this.setState({ scripts: res.data._scripts });
    })
    .catch(error => {
      this.setState({ error });
    })
  }

  render() {
    const scriptGrids = this.state.scripts.map((script, i) => {
      return (
        <Link to={`/scripts/play/${script._id}`}>
          <GridTile
            key={i}
            title={script.title}
          />
        </Link>
      )
    })


    return (
      <div style={styles.root}>
        <GridList
          cellHeight={250}
          style={styles.gridList}
        >
          {scriptGrids}
          <Link to="/scripts/new"><GridTile title="New Script" /></Link>
        </GridList>
      </div>

    )
  }
}

export default ScriptMenu
