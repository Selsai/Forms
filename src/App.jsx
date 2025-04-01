import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: "onBlur" // Validation déclenchée lors du blur
  });

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    reset(); // Réinitialiser le formulaire après soumission
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Nom de la tâche */}
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la tâche"
            {...register("name", {
              required: "Le nom est obligatoire",
              minLength: {
                value: 3,
                message: "Le nom doit contenir au moins 3 caractères"
              }
            })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>
         {/* Date de rendu */}
         <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Date de rendu</Form.Label>
          <Form.Control
            type="date"
            {...register("dueDate", {
              required: "La date est obligatoire"
            })}
          />
          {errors.dueDate && <p className="text-danger">{errors.dueDate.message}</p>}
        </Form.Group>

        {/* Priorité */}
        <Form.Group className="mb-3" controlId="taskPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Control as="select" {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Élevée</option>
          </Form.Control>
        </Form.Group>

        {/* Complétée */}
        <Form.Group className="mb-3" controlId="taskIsCompleted">
          <Form.Check
            type="checkbox"
            label="Complétée"
            {...register("isCompleted")}
          />
        </Form.Group>

        {/* Bouton soumettre */}
        <Button variant="primary" type="submit">
          Ajouter la tâche
        </Button>
      </Form>
    </Container>
  );
}

export default App; 