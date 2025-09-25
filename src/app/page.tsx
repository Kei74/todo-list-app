'use client'
import {
  Container,
  Typography,
} from "@mui/material";
import Tasklist from "./_components/tasklist";
import AddTaskForm from "./_components/addTaskForm";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      <AddTaskForm />
      <Tasklist />
    </Container>
  );
};

export default Home;
