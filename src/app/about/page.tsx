import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography>
        This is the about page of our SPA.
      </Typography>
    </Container>
  );
}
