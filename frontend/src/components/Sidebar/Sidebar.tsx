import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AllOutIcon from '@mui/icons-material/AllOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { GridViewColumnIcon } from '@mui/x-data-grid';
import { AccountTreeOutlined, AnalyticsOutlined, CalendarMonthOutlined, GridViewOutlined, HourglassBottomOutlined, InsightsOutlined, ListAltOutlined, PeopleAltOutlined, TrackChangesOutlined } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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
  minHeight: '140px',
  zIndex: '999'
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
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

const ListLink = ({ open, text, icon } : {open: boolean, text: string, icon: React.ReactNode}) => {
  return (
    <ListItem>
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
  );
};

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const linkIconsSecondGroup = (index: number) => {
    if (index === 0) {
      return <CalendarMonthOutlined />;
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
          <AllOutIcon sx={{ fontSize: '50px', margin: '16px auto' }} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ marginTop: 10, right: '-10px', position: 'absolute' }}
          >
            {open ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
          </IconButton>
        </DrawerHeader>
        <ListLink open={open} text="Dashboard" icon={<GridViewOutlined />} />
        <Divider />
        <List>
          {['Calendar', 'Tasks'].map((text, index) => (
            <ListLink 
              key={index} 
              open={open} 
              text={text} 
              icon={index === 0 ? <CalendarMonthOutlined /> : <ListAltOutlined /> } />
          ))}
        </List>
        <Divider />
        <List>
          {['Projects', 'Clients', 'Hours'].map((text, index) => (
            <ListLink 
              key={index} 
              open={open} 
              text={text} 
              icon={linkIconsSecondGroup(index)} />
          ))}
        </List>
        <Divider />
        <List>
          {['Revenue', 'Yearly', 'Monthly'].map((text, index) => (
            <ListLink 
              key={index} 
              open={open} 
              text={text} 
              icon={linkIconsThirdGroup(index)} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
