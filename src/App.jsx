import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './App.css';
import * as yup from "yup";

// Définition du schéma de validation avec Yup
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Le nom est obligatoire")
    .min(8, "Le nom doit contenir au moins 8 caractères")
    .max(15, "Le nom ne doit pas dépasser 15 caractères"),
  dueDate: yup
    .string()
    .required("La date est obligatoire")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "La date doit respecter le format jj/mm/aaaa (un jour entre 01-31,un mois entre 01-12)"
    )
    .test(
      "isValidDate",
      "La date ne doit pas être antérieure à aujourd'hui",
      (value) => {
        const [day, month, year] = value.split("/");
        const inputDate = new Date(year, month - 1, day, 0, 0, 0, 0); // Mois -1 et heures à zéro
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Réinitialisation des heures pour éviter les erreurs
        return inputDate >= today; // Vérifie si la date est égale ou postérieure à aujourd'hui
      }
    ),
  priority: yup
    .string()
    .oneOf(["Basse", "Moyenne", "Elevée"], "Priorité invalide"),
  isCompleted: yup.boolean()
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: "Basse",
      isCompleted: false
    }
  });

  const onSubmit = (data) => {
    console.log("Données soumises :", data);
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
            type="text"
            placeholder="jj/mm/aaaa"
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <p className="text-danger">{errors.dueDate.message}</p>
          )}
        </Form.Group>

        {/* Priorité */}
        <Form.Group className="mb-3" controlId="taskPriority">
          <Form.Label>Priorité</Form.Label>
          <Form.Control as="select" {...register("priority")}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Élevée</option>
          </Form.Control>
          {errors.priority && (
            <p className="text-danger">{errors.priority.message}</p>
          )}
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
