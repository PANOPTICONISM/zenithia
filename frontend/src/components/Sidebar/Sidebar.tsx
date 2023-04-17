import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AllOutIcon from '@mui/icons-material/AllOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountTreeOutlined, AnalyticsOutlined, ArrowForwardIos, CalendarMonthOutlined, GridViewOutlined, HourglassBottomOutlined, InsightsOutlined, ListAltOutlined, TrackChangesOutlined } from '@mui/icons-material';
import { Drawer, DrawerHeader, ListLink, Subtitle, drawerWidth, drawerWidthMobile } from './Sidebar.utils';
import { useIsSidebarOpen } from '../../contexts/SidebarProvider';
import { AppBar, Stack, SwipeableDrawer, Toolbar, useMediaQuery } from '@mui/material';
import { white } from '../../App';

const Navigation = ({ open } : { open: boolean; }) => {
  return (
    <>
      <List disablePadding={open}>
        <ListLink open={open} text="Dashboard" icon={<GridViewOutlined sx={{ color: white }} />} path="/" />
      </List>
      {open ? <Subtitle text='Pages' /> : <Divider />}
      <List disablePadding={open}>
        <ListLink open={open} text="Calendar" icon={<CalendarMonthOutlined sx={{ color: white }} />} path="/calendar" />
        <ListLink open={open} text="Tasks" icon={<ListAltOutlined sx={{ color: white }} />} path="/tasks" />
      </List>
      {open ? <Subtitle text='Data' /> : <Divider />}
      <List disablePadding={open}>
        <ListLink open={open} text="Projects" icon={<AccountTreeOutlined sx={{ color: white }} />} path="/projects" />
        <ListLink open={open} text="Clients" icon={<ListAltOutlined sx={{ color: white }} />} path="/clients" />
        <ListLink open={open} text="Hours" icon={<HourglassBottomOutlined sx={{ color: white }} />} path="/hours" />
      </List>
      {open ? <Subtitle text='Performance' /> : <Divider />}
      <List disablePadding={open}>
        <ListLink open={open} text="Revenue" icon={<TrackChangesOutlined sx={{ color: white }} />} path="/revenue" />
        <ListLink open={open} text="Yearly" icon={<AnalyticsOutlined sx={{ color: white }} />} path="/yearly" />
        <ListLink open={open} text="Monthly" icon={<InsightsOutlined sx={{ color: white }} />} path="/monthly" />
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
            <AllOutIcon sx={{ fontSize: '50px', color: white }} />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowBackIosIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
          <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
            <Toolbar />
            <Navigation open={open} />
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
              <AllOutIcon sx={{ fontSize: '50px', margin: '16px auto', color: white }} />
            </DrawerHeader>
            <Navigation open={open} />
          </Drawer>
        </>}
    </Box>
  );
}
