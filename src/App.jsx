import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './App.css';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est obligatoire")
    .min(3, "Le nom doit contenir au moins 3 caractères"),
  dueDate: yup.date().required("La date est obligatoire"),
  priority: yup.string().oneOf(["Basse", "Moyenne", "Elevée"], "Priorité invalide"),
  isCompleted: yup.boolean()
});

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "", // Champ vide par défaut
      dueDate: "", // Champ vide par défaut
      priority: "Basse", // Priorité basse par défaut
      isCompleted: false // Case décochée par défaut
    }
  });

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
    reset();
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter une tâche</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Nom */}
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de la tâche"
            {...register("name")}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </Form.Group>

        {/* Date */}
        <Form.Group className="mb-3" controlId="taskDueDate">
          <Form.Label>Date </Form.Label>
          <Form.Control
            type="date"
            {...register("dueDate")}
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
          {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
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
        <Button style={{ border: 'none' }} type="submit">
         Ajouter la tâche
        </Button>

      </Form>
    </Container>
  );
}

export default App;
