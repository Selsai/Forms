import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      dueDate: '',
      priority: 'Basse',
      isCompleted: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset(); // Réinitialise le formulaire après soumission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3">
      {/* Champ Nom */}
      <Form.Group controlId="taskName" className="mb-3">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrez le nom de la tâche"
          {...register('name', { required: 'Ce champ est requis' })}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      {/* Champ Date due */}
      <Form.Group controlId="dueDate" className="mb-3">
        <Form.Label>Date due</Form.Label>
        <Form.Control
          type="date"
          {...register('dueDate', { required: 'Veuillez sélectionner une date' })}
        />
        {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
      </Form.Group>

      {/* Champ Priorité */}
      <Form.Group controlId="priority" className="mb-3">
        <Form.Label>Priorité</Form.Label>
        <Form.Select {...register('priority')}>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Elevée">Elevée</option>
        </Form.Select>
      </Form.Group>

      {/* Champ Tâche complétée */}
      <Form.Group controlId="isCompleted" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Tâche complétée"
          {...register('isCompleted')}
        />
      </Form.Group>

      {/* Bouton Soumettre */}
      <Button variant="primary" type="submit">
        Soumettre
      </Button>
    </Form>
  );
};

export default TaskForm;
