import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const PlayerForm = ({ handleChange, handleSubmit, player }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={player.title || ''}
        placeholder="Player Title Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="text">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="text"
        value={player.text || ''}
        placeholder="Player Text Goes Here"
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
