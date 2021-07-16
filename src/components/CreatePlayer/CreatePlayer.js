import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import EntryForm from '../shared/EntryForm'
import { createPlayer } from '../../api/players'
import messages from '../AutoDismissAlert/messages'

class PlayerCreate extends Component {
  constructor () {
    super()

    this.state = {
      player: {
        name: '',
        position: '',
        team: ''
      },
      createdId: null
    }
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
    const { msgAlert, user } = this.props
    const entry = { ...this.state.player, owner: user._id }
    createPlayer(entry, user)
      .then(res => this.setState({ createdId: res.data.player._id }))
      .catch(() => msgAlert({
        heading: 'Create Player',
        message: messages.playerCreateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Player',
        message: messages.playerCreateFailure,
        variant: 'success'
      }))
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/players/${this.state.createdId}`}/>
    }

    return (
      <Fragment>
        <div>
          <h2>Create a Player Page</h2>
          <EntryForm
            entry={this.state.player}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </Fragment>
    )
  }
}

export default PlayerCreate
