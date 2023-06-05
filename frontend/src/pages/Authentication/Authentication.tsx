import { Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { darkBlue } from 'App';
import { postLoginUser, signUpUser } from 'lib/authentication';
import { toast } from 'react-toastify';

const Authentication = ({ setToken } : { setToken: React.Dispatch<React.SetStateAction<string | undefined>> }) => {
  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [isSignup, setIsSignup] = React.useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }
    
    if (!isSignup) {
      return postLoginUser({
        username,
        password
      }).then((data) => setToken(data.id))
        .catch((error) => toast.error('' + error));
    }

    return signUpUser({
      username,
      password
    }).then(() => toast.success('We\'ve sent you an email for confirmation.'))
      .catch((error) => toast.error('' + error));
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
            {isSignup ? 'Sign up' : 'Login'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
              onChange={e => setPassword(e.target.value)}
            />
            <Button 
              onClick={handleSubmit} 
              fullWidth
              variant='contained' 
              startIcon={<LoginIcon />}
              sx={{ background: darkBlue, }}>
              {isSignup ? 'Create an account' : 'Login'}
            </Button>
            <Grid container justifyContent="end" marginTop="6px">
              {isSignup ? (
                <Grid item>
                  {'Have an account already? '}
                  <Link onClick={() => setIsSignup(false)} variant="body2" sx={{ cursor: 'pointer' }}>
                    {'Login'}
                  </Link>
                </Grid>) :
                <Grid item>
                  {'Don\'t have an account? '}
                  <Link onClick={() => setIsSignup(true)} variant="body2" sx={{ cursor: 'pointer' }}>
                    {'Sign up'}
                  </Link>
                </Grid>}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Authentication;