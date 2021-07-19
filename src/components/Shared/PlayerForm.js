import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PlayerForm = ({ handleChange, handleSubmit, player }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="name">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={player.name || ''}
        placeholder="Player Name Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="position">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="position"
        value={player.position || ''}
        placeholder="Player position Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="team">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="team"
        value={player.team || ''}
        placeholder="Player Team Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <div className="createButton">
      <Button type="submit">Create Player</Button>
    </div>
  </Form>
)

export default PlayerForm
