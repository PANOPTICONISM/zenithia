import { Copyright } from '@mui/icons-material';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { darkBlue } from 'App';

const Authentication = ({ setToken } : { setToken: React.Dispatch<React.SetStateAction<string | undefined>> }) => {
  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);

  const handleSubmit = () => {
    console.log('oi');
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
              Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setUsername(e.target.value)}
            />
            <Button 
              onClick={handleSubmit} 
              fullWidth
              variant='contained' 
              startIcon={<LoginIcon />}
              sx={{ background: darkBlue, }}>
                Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Don\'t have an account? Sign up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Authentication;