import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PlayerForm from '../Shared/PlayerForm'
import { updatePlayer, showPlayer } from '../../api/players'
import messages from '../AutoDismissAlert/messages'

class PlayerUpdate extends Component {
  constructor () {
    super()
    this.state = {
      player: {
        name: '',
        position: '',
        team: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showPlayer(match.params.id, user)
      .then(res => {
        this.setState({ player: res.data.player })
      })
      .then(() => msgAlert({
        heading: 'Player Found Successfully',
        message: messages.playerUpdatedSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Player Could Not Be Found',
        message: messages.playerUpdatedFailure,
        variant: 'danger'
      }))
  }
  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState((currentState) => {
      return { player: {
        ...currentState.player,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, user, match, history } = this.props
    updatePlayer(this.state.player, match.params.id, user)
      .then(res => history.push(`/players/${match.params.id}`))
      .then(() => msgAlert({
        heading: 'Update Player Success!',
        message: messages.playerUpdateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Update Entry Failed',
        message: messages.playerUpdateFailure,
        variant: 'danger'
      }))
  }
  render () {
    return (
      <Fragment>
        <h2>Update a Player Page</h2>
        <PlayerForm
          entry={this.state.player}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}
export default withRouter(PlayerUpdate)
