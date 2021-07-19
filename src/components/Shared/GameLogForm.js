import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GameLogForm = ({ handleChange, handleSubmit, gamelog, playerId }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="gamelog">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="content"
        value={gamelog.content || ''}
        placeholder="GameLog goes here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="playerId">
      <Form.Label></Form.Label>
      <Form.Control
        type="hidden"
        name="playerId"
        value={gamelog.content || ''}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button type="submit">Add GameLog</Button>
  </Form>
)

export default GameLogForm
