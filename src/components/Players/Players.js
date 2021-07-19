import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { indexPlayers } from '../../api/players'

class Players extends Component {
  constructor () {
    super()
    this.state = {
      players: null
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    indexPlayers(user)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => this.setState({ players: res.data.player }))
      .then(() => msgAlert({
        heading: 'Player Index Success!',
        message: 'messages.playerIndexSuccess',
        variant: 'success'
      }))
      .catch()
  }
  render () {
    let playerJsx = ''
    if (this.state.players === null) {
      playerJsx = <Spinner animation="border" variant="info" />
    } else if (this.state.players.length === 0) {
      playerJsx = <p>No players to display! Go make some.</p>
    } else {
      playerJsx = this.state.players.map(player => (
        <div className="player" key={player.id}>
          <h3 className="player-name">{player.name}</h3>
          <p className="player-position">{player.position}</p>
          <p className="player-team">{player.team}</p>
        </div>
      ))
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
