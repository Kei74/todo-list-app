import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo-list app
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/about">
          About
        </Button>
        <Button color="inherit" component={Link} href="/contact">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
