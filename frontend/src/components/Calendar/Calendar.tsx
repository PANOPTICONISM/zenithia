import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventApi, EventClickArg, EventSourceInput, formatDate } from '@fullcalendar/core';
import { Box, List, ListItem, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material';
import { darkBlue, white } from 'App';
import { CalendarProps, getCalendar } from 'lib/calendar';
import { toast } from 'react-toastify';
import { EventItem } from './EventItem';
import { useDialogEnqueue } from 'contexts/DialogProvider';
import { EventAddModal, EventUpdateModal } from './Modals';
import { useUserData } from 'contexts/UserProvider';

const ListEvent = ({ primary, secondary }: { primary: string, secondary?: React.ReactNode }) => {
  return (
    <ListItem
      sx={{
        background: darkBlue,
        margin: '10px 0',
        borderRadius: '4px',
        color: white
      }}>
      <ListItemText
        color={white}
        primary={<Typography
          variant='overline'
          fontWeight={700}>{primary}
        </Typography>}
        secondary={secondary}
      />
    </ListItem>
  );
};

const Calendar = ({ isDashboard = false, maxHeight } : { isDashboard?: boolean, maxHeight?: string }) => {
  const [currentEvents, setCurrentEvents] = React.useState<(EventApi | CalendarProps)[]>([]);
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const desktopBreakpoint = useMediaQuery('(max-width:1300px)');
  const queueDialog = useDialogEnqueue();
  const [user] = useUserData();

  React.useEffect(() => {
    if (!user) {
      return;
    }
    getCalendar(user.token)
      .then((res) => setCurrentEvents(res))
      .catch(() => toast.error('Could not add the event'));
  }, [user]);

  const handleDateClick = React.useCallback((selected: DateSelectArg) => {
    return queueDialog({
      data: (close) => ({
        title: 'Add event',
        overwriteContentAndActions: (<EventAddModal close={close} selected={selected} />),
      })
    });
  }, []);

  const handleEventClick = React.useCallback((selected: EventClickArg) => {
    return queueDialog({
      data: (close) => ({
        title: 'Edit Event',
        overwriteContentAndActions: (<EventUpdateModal close={close} selected={selected} />),
      })
    });
  }, []);

  return (
    <Stack>
      <Box flex="1 1 100%">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
          initialView={tabletBreakpoint || isDashboard ? 'listMonth' : 'dayGridMonth'}
          headerToolbar={!isDashboard ? {
            left: tabletBreakpoint ? 'title' : 'prev,next today',
            center: !tabletBreakpoint ? 'title' : '',
            right: tabletBreakpoint ? 'prev,next' : 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          } : false}
          editable
          selectable
          selectMirror
          dayMaxEvents
          select={handleDateClick}
          eventClick={handleEventClick}
          eventContent={(info) => <EventItem info={info} />}
          events={currentEvents as EventSourceInput}
        />
      </Box>
    </Stack>
  );
};

export default Calendar;