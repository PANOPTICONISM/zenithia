import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ContactsIcon from '@mui/icons-material/Contacts';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { AccountTreeOutlined, ArrowForwardIos, CalendarMonthOutlined, GridViewOutlined, HourglassBottomOutlined, InsightsOutlined, TrackChangesOutlined } from '@mui/icons-material';
import { Drawer, DrawerHeader, ListLink, Subtitle, drawerWidth, drawerWidthMobile } from './Sidebar.utils';
import { useIsSidebarOpen } from '../../contexts/SidebarProvider';
import { AppBar, Stack, SwipeableDrawer, Toolbar, useMediaQuery } from '@mui/material';
import { darkBlue, white } from '../../App';
import { Logo } from '../../icons/logo';

const Navigation = ({ open } : { open: boolean; }) => {
  return (
    <>
      <List disablePadding={open}>
        <ListLink open={open} text="Dashboard" icon={<GridViewOutlined sx={{ color: white }} />} path="/" />
      </List>
      {open ? <Subtitle text='Pages' /> : <Divider sx={{ background: white }} />}
      <List disablePadding={open}>
        <ListLink open={open} text="Calendar" icon={<CalendarMonthOutlined sx={{ color: white }} />} path="/calendar" />
        <ListLink open={open} text="Tasks" icon={<DomainVerificationIcon sx={{ color: white }} />} path="/tasks" />
      </List>
      {open ? <Subtitle text='Data' /> : <Divider sx={{ background: white }} />}
      <List disablePadding={open}>
        <ListLink open={open} text="Projects" icon={<AccountTreeOutlined sx={{ color: white }} />} path="/projects" />
        <ListLink open={open} text="Clients" icon={<ContactsIcon sx={{ color: white }} />} path="/clients" />
        <ListLink open={open} text="Time Tracker" icon={<HourglassBottomOutlined sx={{ color: white }} />} path="/timetracker" />
      </List>
      {open ? <Subtitle text='Performance' /> : <Divider sx={{ background: white }} />}
      <List disablePadding={open}>
        <ListLink open={open} text="Revenue" icon={<TrackChangesOutlined sx={{ color: white }} />} path="/revenue" />
        <ListLink open={open} text="Monthly" icon={<InsightsOutlined sx={{ color: white }} />} path="/monthly" />
        <ListLink open={open} text="Yearly" icon={<DonutLargeIcon sx={{ color: white }} />} path="/yearly" />
      </List>
    </>
  );
};

export default function Sidebar() {
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const [open, setOpen] = useIsSidebarOpen();

  return (
    <Box>
      {tabletBreakpoint ? 
        <>
          <Stack direction="row" justifyContent="space-between" padding={2}>
            <Logo color='black' background="white" />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowBackIosIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
          <SwipeableDrawer
            open={open} onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}>
            <Box sx={{ background: darkBlue, height: '100%' }}>
              <Toolbar />
              <Navigation open={open} />
            </Box>
          </SwipeableDrawer>
        </>
        :
        <>
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - (60px + ${open ? drawerWidth : drawerWidthMobile}px))` ,
              background: 'transparent',
              boxShadow: 'none'
            }}
          >
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={() => setOpen(!open)}
              >
                {open ? <ArrowBackIosIcon /> : <ArrowForwardIos />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <Logo color='white' background='#191E38' />
            </DrawerHeader>
            <Navigation open={open} />
          </Drawer>
        </>}
    </Box>
  );
}
