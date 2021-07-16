import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { indexEntries } from '../../api/entries'

class Players extends Component {
  constructor () {
    super()
    this.state = {
      player: null
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexEntries(user)
      .then(res => this.setState({ player: res.data.player }))
      .then(() => msgAlert({
        heading: 'Player Index Success!',
        message: 'messages.playerIndexSuccess',
        variant: 'success'
      }))
      .catch()
  }
  render () {
    let playerJsx = ''
    if (this.state.player === null) {
      playerJsx = <Spinner animation="border" variant="info" />
    } else if (this.state.player.length === 0) {
      playerJsx = <p>No players to display! Go make some.</p>
    } else {
      playerJsx = (
        <ul>
          {this.state.player.map((player, i) => (
            <li key={player._id}><Link to={`/players/${player._id}`}>{player.title}</Link></li>
          ))}
        </ul>
      )
    }

    return (
      <Fragment>
        <div>
          <h2>All Players</h2>
          {playerJsx}
        </div>
      </Fragment>
    )
  }
}

export default Players
