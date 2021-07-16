import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { showPlayer, deletePlayer } from '../../api/players'
import messages from '../AutoDismissAlert/messages'
import GameLog from './../GameLog/GameLog'
// import CommentForm from '../shared/CommentForm'
// import DeleteComment from '../Comment/DeleteComment'
// import { createComment } from '../../api/comments'

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
    createGamelog(gamelog, user)
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
}

export default withRouter(ShowPlayer)
