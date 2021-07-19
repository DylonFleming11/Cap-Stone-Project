import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GameLogForm = ({ handleChange, handleSubmit, gamelog, playerId }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="game">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="game"
        value={gamelog.game || ''}
        placeholder="Game goes here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="yards">
      <Form.Label></Form.Label>
      <Form.Control
        type="hidden"
        name="yards"
        value={gamelog.yards || ''}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="touchdowns">
      <Form.Label></Form.Label>
      <Form.Control
        type="hidden"
        name="touchdowns"
        value={gamelog.touchdowns || ''}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button type="submit">Add GameLog</Button>
  </Form>
)

export default GameLogForm
