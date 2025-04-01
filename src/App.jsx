import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    priority: 'Basse',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group controlId="taskName" className="mb-3">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Entrez le nom de la tâche"
          required
        />
      </Form.Group>

      <Form.Group controlId="dueDate" className="mb-3">
        <Form.Label>Date due</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="priority" className="mb-3">
        <Form.Label>Priorité</Form.Label>
        <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Elevée">Elevée</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="isCompleted" className="mb-3">
        <Form.Check
          type="checkbox"
          name="isCompleted"
          label="Tâche complétée"
          checked={formData.isCompleted}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Soumettre
      </Button>
    </Form>
  );
};

export default TaskForm;
