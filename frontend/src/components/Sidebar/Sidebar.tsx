import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AllOutIcon from '@mui/icons-material/AllOut';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountTreeOutlined, AnalyticsOutlined, CalendarMonthOutlined, GridViewOutlined, HourglassBottomOutlined, InsightsOutlined, ListAltOutlined, TrackChangesOutlined } from '@mui/icons-material';
import { Drawer, DrawerHeader, ListLink, Subtitle } from './Sidebar.utils';
import { useIsSidebarOpen } from '../../contexts/SidebarProvider';

export default function Sidebar() {
  const [open, setOpen] = useIsSidebarOpen();

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
