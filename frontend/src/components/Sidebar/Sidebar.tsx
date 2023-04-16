import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AllOutIcon from '@mui/icons-material/AllOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountTreeOutlined, AnalyticsOutlined, CalendarMonthOutlined, GridViewOutlined, HourglassBottomOutlined, InsightsOutlined, ListAltOutlined, PeopleAltOutlined, TrackChangesOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  position: 'relative',
  minHeight: '100px',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

const ListLink = ({ open, text, icon, path } : { open: boolean, text: string, icon: React.ReactNode, path: string }) => {
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

const Subtitle = ({ text } : { text: string }) => {
  return (
    <Typography padding="6px 12px 4px 12px">{text}</Typography>
  );
};

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const linkIconsSecondGroup = (index: number) => {
    if (index === 0) {
      return <AccountTreeOutlined />;
    } else if (index === 1) {
      return <ListAltOutlined />;
    }
    return <HourglassBottomOutlined />;
  };

  const linkIconsThirdGroup = (index: number) => {
    if (index === 0) {
      return <TrackChangesOutlined />;
    } else if (index === 1) {
      return <AnalyticsOutlined />;
    }
    return <InsightsOutlined />;
  };

  return (
    <Box>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ marginTop: -3, right: open ? '-46px' : '-25px', position: 'absolute' }}
          >
            {open ? <ArrowBackIosIcon /> : <MenuIcon />}
          </IconButton>
          <AllOutIcon sx={{ fontSize: '50px', margin: '16px auto' }} />
        </DrawerHeader>
        <List disablePadding={open}>
          <ListLink open={open} text="Dashboard" icon={<GridViewOutlined />} path="/" />
        </List>
        {open ? <Subtitle text='Pages' /> : <Divider />}
        <List disablePadding={open}>
          {['Calendar', 'Tasks'].map((text, index) => (
            <ListLink 
              key={index} 
              path='/'
              open={open} 
              text={text} 
              icon={index === 0 ? <CalendarMonthOutlined /> : <ListAltOutlined /> } />
          ))}
        </List>
        {open ? <Subtitle text='Data' /> : <Divider />}
        <List disablePadding={open}>
          {['Projects', 'Clients', 'Hours'].map((text, index) => (
            <ListLink 
              key={index} 
              path='/projects'
              open={open} 
              text={text} 
              icon={linkIconsSecondGroup(index)} />
          ))}
        </List>
        {open ? <Subtitle text='Performance' /> : <Divider />}
        <List disablePadding={open}>
          {['Revenue', 'Yearly', 'Monthly'].map((text, index) => (
            <ListLink 
              key={index}
              path='/' 
              open={open} 
              text={text} 
              icon={linkIconsThirdGroup(index)} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
