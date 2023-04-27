import { styled, Theme, CSSObject } from '@mui/material/styles';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import React from 'react';
import { darkBlue, highlight, white } from '../../App';

export const drawerWidth = 200;
export const drawerWidthMobile = 65;

const openedMixin = (theme: Theme): CSSObject => ({
  background: darkBlue,
  width: drawerWidth,
  padding: '30px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  background: darkBlue,
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
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
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
  const { pathname } = useLocation();

  return (
    <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem disablePadding>
        <ListItemButton sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          color: white,
          background: path === pathname ? highlight : 'inherit',
          borderRadius: '4px',
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
    <Typography padding="6px 12px 4px 12px" color={white}>{text}</Typography>
  );
};