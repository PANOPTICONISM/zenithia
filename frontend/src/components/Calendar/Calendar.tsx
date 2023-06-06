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

const Calendar = ({ isDashboard = false, maxHeight } : { isDashboard?: boolean, maxHeight?: string }) => {
  const [currentEvents, setCurrentEvents] = React.useState<(EventApi | CalendarProps)[]>([]);
  const tabletBreakpoint = useMediaQuery('(max-width:900px)');
  const desktopBreakpoint = useMediaQuery('(max-width:1300px)');
  const queueDialog = useDialogEnqueue();

  React.useEffect(() => {
    getCalendar()
      .then((res) => setCurrentEvents(res))
      .catch(() => toast.error('Could not add the event'));
  }, []);

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
    <Stack direction={desktopBreakpoint ? 'column' : 'row'} spacing={2}>
      {!isDashboard && (
        <Box flex="1 1 22%">
          <Typography variant='h5'>Events</Typography>
          <List sx={{ maxHeight: tabletBreakpoint ? '300px' : '710px', overflow: 'auto' }}>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{ background: darkBlue, margin: '10px 0', borderRadius: '4px', color: white }}
              >
                <ListItemText
                  color={white}
                  primary={<Typography variant='overline' fontWeight={700}>{event.title}</Typography>}
                  secondary={
                    event.start ? <Typography>{formatDate(event.start, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}</Typography> : ''
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <Box flex="1 1 100%">
        {currentEvents.length > 0 && 
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
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
            eventsSet={(events) => setCurrentEvents(events)}
            eventContent={(info) => <EventItem info={info} />}
            initialEvents={currentEvents as EventSourceInput}
            height={isDashboard || desktopBreakpoint ? maxHeight || '400px' : '100%'}
          />}
      </Box>
    </Stack>
  );
};

export default Calendar;