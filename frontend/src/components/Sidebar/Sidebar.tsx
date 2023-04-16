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
import { AppBar, Stack, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from '@mui/material';

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

const Navigation = ({ open } : { open: boolean; }) => {
  return (
    <>
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
    </>
  );
};

export default function Sidebar() {
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const [open, setOpen] = useIsSidebarOpen();

  return (
    <Box>
      {/* {tabletBreakpoint ?
        <>
          <Stack direction="row" justifyContent="space-between" padding={2}>
            <AllOutIcon sx={{ fontSize: '50px' }} />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowBackIosIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
          <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
            <Navigation open={open} />
          </SwipeableDrawer>
        </> :  */}
      {tabletBreakpoint ? 
        <>
          <Stack direction="row" justifyContent="space-between" padding={2}>
            <AllOutIcon sx={{ fontSize: '50px' }} />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowBackIosIcon /> : <MenuIcon />}
            </IconButton>
          </Stack>
          <SwipeableDrawer open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
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
              <AllOutIcon sx={{ fontSize: '50px', margin: '16px auto' }} />
            </DrawerHeader>
            <Navigation open={open} />
          </Drawer>
        </>}
    </Box>
  );
}
