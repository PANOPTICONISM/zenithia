import { Box, Button, Grid, Link, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { darkBlue, grey, highlight, white } from 'App';
import { postLoginUser, signUpUser } from 'lib/authentication';
import { toast } from 'react-toastify';
import { Logo } from 'icons/logo';
import { useUserData } from 'contexts/UserProvider';

const Authentication = () => {
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  
  const [username, setUsername] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [isSignup, setIsSignup] = React.useState(false);

  const [, setUser] = useUserData();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!username || !password) {
      return;
    }
    
    if (!isSignup) {
      return postLoginUser({
        username,
        password
      }).then((data) => setUser({ id: data.id, username: data?.email?.split('@')[0] || '', token: data.token }))
        .catch((error) => toast.error('' + error));
    }

    return signUpUser({
      username,
      password
    }).then(() => toast.success('We\'ve sent you an email for confirmation.'))
      .catch((error) => toast.error('' + error));
  };

  return (
    <Stack sx={{ height: tabletBreakpoint ? 'auto' : '100vh', background: darkBlue, padding: tabletBreakpoint ? '50px' : 0 }} justifyContent="center" alignItems="center">
      <Grid container sx={{ height: tabletBreakpoint ? 'auto' : '80%', width: tabletBreakpoint ? 'auto' : '80%' }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ background: highlight, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '50px 0' }}
        >
          <Logo color='white' background={highlight} width={180} height={180} />
          <Typography variant='h2' fontFamily="'Bungee Outline', cursive" color={grey}>
          Zenithia
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{
          backgroundImage: 'url(/background-image.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: highlight,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 87, 145, 0.8)',
              width: '100%',
              height: tabletBreakpoint ? 'auto' : '100%',
              padding: tabletBreakpoint ? '50px 0' : '0'
            }}
          >
            <Typography component="h1" variant="h2" color={white} fontWeight={700} fontFamily="'DM Sans', sans-serif">
              {isSignup ? 'Sign up' : 'Login'}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, color: white, padding: '0 60px' }}>
              <TextField
                variant='filled'
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e => setUsername(e.target.value)}
                sx={{ input: { color: white } }}
                InputLabelProps={{
                  style: { color: white },
                }}
                InputProps={{ autoFocus: true }}
              />
              <TextField
                margin="normal"
                variant='filled'
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
                sx={{ input: { color: white } }}
                InputLabelProps={{
                  style: { color: white },
                }}
              />
              <Button 
                type='submit'
                fullWidth
                variant='contained' 
                startIcon={<LoginIcon />}
                sx={{ background: darkBlue, }}>
                {isSignup ? 'Create account' : 'Login'}
              </Button>
              <Grid container justifyContent="end" marginTop="6px">
                {isSignup ? (
                  <Grid item>
                    {'Have an account already? '}
                    <Link 
                      onClick={() => setIsSignup(false)} 
                      variant="body2" 
                      sx={{ cursor: 'pointer', color: white, textDecoration: 'underline' }}>
                      {'Login.'}
                    </Link>
                  </Grid>) :
                  <Grid item>
                    {'Don\'t have an account? '}
                    <Link 
                      onClick={() => setIsSignup(true)} 
                      variant="body2" 
                      sx={{ cursor: 'pointer', color: white, textDecoration: 'underline' }}>
                      {'Sign up.'}
                    </Link>
                  </Grid>}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Authentication;