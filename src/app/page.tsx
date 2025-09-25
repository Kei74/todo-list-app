'use client'
import {
  Container,
  Typography,
} from "@mui/material";
import Tasklist from "./_components/tasklist";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      <Tasklist />
    </Container>
  );
};

export default Home;
