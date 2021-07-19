import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import { deleteGameLog } from '../../api/gamelog'

class DeleteGameLog extends Component {
  componentDidMount () {
  }

    handleDelete = (event) => {
      const { user, history, id, playerId } = this.props
      deleteGameLog(playerId, id, user)
        .then((res) => res)
        .catch(console.error)
        .finally(() => history.push('/temp'))
        .finally(() => history.goBack())
    }

    render () {
      return (
        <Fragment>
          <div className='deleteGameLog'><button onClick={this.handleDelete}><img className="delete-img" src="delete-24.png"/></button></div>
        </Fragment>
      )
    }
}

export default withRouter(DeleteGameLog)
