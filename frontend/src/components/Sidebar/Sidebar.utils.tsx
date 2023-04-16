import { styled, Theme, CSSObject } from '@mui/material/styles';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';

export const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  padding: '30px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  padding: '30px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  position: 'relative',
  minHeight: '100px',
}));

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const ListLink = ({ open, text, icon, path } : { open: boolean, text: string, icon: React.ReactNode, path: string }) => {
  return (
    <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem disablePadding>
        <ListItemButton sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export const Subtitle = ({ text } : { text: string }) => {
  return (
    <Typography padding="6px 12px 4px 12px">{text}</Typography>
  );
};