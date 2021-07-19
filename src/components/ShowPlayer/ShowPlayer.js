import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { showPlayer, deletePlayer } from '../../api/players'
import messages from '../AutoDismissAlert/messages'
// import GameLog from './../GameLog/GameLog'
import GameLogForm from '../Shared/GameLogForm'
import DeleteGameLog from '../GameLog/DeleteGameLog'
import { createGameLog } from '../../api/gamelog'

class ShowPlayer extends Component {
  constructor () {
    super()
    this.state = {
      player: null,
      user: null,
      createdId: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showPlayer(match.params.id, user)
      .then(res => {
        this.setState({ player: res.data.player })
      })
      .then(() => msgAlert({
        heading: 'Show Player',
        message: messages.playerShowSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Show Player',
        message: messages.playerShowFailure,
        variant: 'danger'
      }))
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState((currentState) => {
      return { gamelog: {
        ...currentState.gamelog,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert, user } = this.props
    // removed owner
    const gamelog = { ...this.state.gamelog }
    gamelog.entryId = this.props.match.params.id
    createGameLog(gamelog, user)
      .then(res => this.setState({ createdId: gamelog.entryId }))
      .then(() => msgAlert({
        heading: 'Create Entry Success!',
        message: messages.gamelogCreateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Entry Failed',
        message: messages.gamelogCreateFailure,
        variant: 'danger'
      }))
  }

  handleDelete = (event) => {
    const { user, match, history, msgAlert } = this.props
    deletePlayer(match.params.id, user)
      .then(() => history.push('/players'))
      .then(() => msgAlert({
        heading: 'Player Deleted!',
        message: messages.playerDeleteSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed',
        message: messages.playerDeleteFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { player } = this.state
    const { user } = this.props
    let playerJsx = ''
    if (player === null || player === undefined) {
      playerJsx = 'loading...'
    } else if (user === null) {
      playerJsx = (
        <Fragment>
          <div>
            <h3>{player.name}</h3>
            <p>{player.position}</p>
            <p>{player.team}</p>
            <p>GameLogs:</p>
            <ul>
              {player.gamelogs.map((gamelog) => (
                <li key={gamelog._id}>
                  <div>
                    {gamelog.game}
                    {gamelog.yards}
                    {gamelog.touchdowns}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Fragment>
      )
    } else if (this.state.createdId) {
      this.props.history.push('/temp')
      this.props.history.goBack()
    } else {
      playerJsx = (
        <Fragment>
          <div>
            <h3>{player.name}</h3>
            <p>{player.position}</p>
            <p>{player.team}</p>
            <ul>
              {player.gamelogs.map((gamelog) => (
                <li key={gamelog._id}>
                  <div>
                    {gamelog.game}
                    {gamelog.yards}
                    {gamelog.touchdowns}
                    <div>
                      <DeleteGameLog id={gamelog._id} user={this.props.user} playerId={this.props.match.params.id} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <GameLogForm
              gamelog={this.state.gamelog}
              playerId={this.props.match.paramas.id}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <div>
              <button onClick={this.handleDelete}>Delete Player</button>
              <Link to={`/players/${this.props.match.params.id}/edit`}>Update Player</Link>
            </div>
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        {playerJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowPlayer)
