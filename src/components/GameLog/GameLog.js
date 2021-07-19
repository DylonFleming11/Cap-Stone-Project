import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { createGame } from '../../api/players'
import messages from '../AutoDismissAlert/messages'

class GameLog extends Component {
  constructor () {
    super()

    this.state = {
      game: {
        game: '',
        yards: '',
        touchDown: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState((currentState) => {
      return { game: {
        ...currentState.game,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert, user } = this.props
    const game = { ...this.state.entry, owner: user._id }
    createGame(game, user)
      .then(res => this.setState({ createdId: res.data.entry._id }))
      .then(() => msgAlert({
        heading: 'Create GameLog Success!',
        message: messages.gamelogCreateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Entry Failed',
        message: messages.gamelogCreateFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { content, author } = this.props
    if (this.state.createdId) {
      return <Redirect to={`/entries/${this.state.createdId}`}/>
    }

    return (
      <Fragment>
        <li>{content}  {author}</li>
      </Fragment>
    )
  }
}

export default GameLog
