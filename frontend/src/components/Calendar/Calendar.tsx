import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventApi, EventChangeArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/core';
import { Box, List, ListItem, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material';
import { darkBlue, white } from 'App';
import { v4 as uuidv4 } from 'uuid';
import { updateCalendar } from 'lib/calendar';
import { toast } from 'react-toastify';

const EventItem = ({ info }: { info: EventContentArg }) => {
  const { event, timeText } = info;

  return (
    <Box>
      <Typography variant='overline' fontWeight={700}>{event.title}</Typography>
      <Typography>{timeText}</Typography>
    </Box>
  );
};

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = React.useState<EventApi[]>([]);
  const [isEditCard, setIsEditCard] = React.useState<boolean>(false);
  const tabletBreakpoint = useMediaQuery('(max-width:800px)');
  const desktopBreakpoint = useMediaQuery('(max-width:1300px)');

  const handleDateClick = (selected: DateSelectArg) => {
    const title = prompt('Please enter a new title');

    const calenderApi = selected.view.calendar;
    calenderApi.unselect();

    if (title) {
      calenderApi.addEvent({
        id: uuidv4(),
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay
      });
    }
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event ${selected.event.title}`)) {
      selected.event.remove();
    }
  };

  const handleUpdateEventSelect = async (selected: EventChangeArg) => {
    try {
      const eventCalendarUpdated = {
        id: selected.event.id,
        title: selected.event.title,
        start: selected.event.startStr,
        end: selected.event.endStr,
      };

      await updateCalendar(selected.event.id, eventCalendarUpdated);
    } catch (err) {
      toast.error('Could not update the event');
    }
  };

  return (
    <Stack direction={desktopBreakpoint ? 'column' : 'row'} spacing={2}>
      <Box flex="1 1 22%">
        <Typography variant='h5'>Events</Typography>
        <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{ background: darkBlue, margin: '10px 0', borderRadius: '4px', color: white }}
            >
              <ListItemText
                color={white}
                primary={<Typography variant='overline' fontWeight={700}>{event.title}</Typography>}
                secondary={
                  <Typography>{formatDate(event.startStr, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}</Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex="1 1 100%">
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
          initialView={tabletBreakpoint ? 'timeGridDay' : 'dayGridMonth'}
          headerToolbar={{
            left: tabletBreakpoint ? 'title' : 'prev,next today',
            center: !tabletBreakpoint ? 'title' : '',
            right: tabletBreakpoint ? 'prev,next' : 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          editable
          selectable
          selectMirror
          dayMaxEvents
          select={handleDateClick}
          eventClick={handleEventClick}
          eventChange={handleUpdateEventSelect}
          eventsSet={(events) => setCurrentEvents(events)}
          eventContent={(info) => <EventItem info={info} />}
          initialEvents={[
            { id: '43545', title: 'All-day event example', date: '2023-03-02', },
            { id: '435435', title: 'All-day event', date: '2023-05-16', }
          ]}
        />
      </Box>
    </Stack>
  );
};

export default Calendar;