import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarApi, DateSelectArg, EventApi, EventClickArg, formatDate } from '@fullcalendar/core';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { darkBlue, white } from 'App';

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = React.useState<EventApi[]>([]);

  const handleDateClick = (selected: DateSelectArg) => {
    console.log('oi', selected);
    const title = prompt('Please enter a new title');

    const calenderApi = selected.view.calendar;
    calenderApi.unselect();

    if (title) {
      calenderApi.addEvent({
        id: `${selected.start}-${title}`,
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

  return (
    <Box>
      <Box flex="1 1 20%" p="15px">
        <Typography variant='h5'>Events</Typography>
        <List>
          {currentEvents.map((event) => (
            <ListItem
              key={event.id}
              sx={{ background: darkBlue, margin: '10px 0', borderRadius: '4px', color: white }}
            >
              <ListItemText
                color={white}
                primary={event.title}
                secondary={
                  <Typography>{formatDate(event.startStr, {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}</Typography>
                }
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex="1 1 100%" ml="15px">
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
          }}
          editable
          selectable
          selectMirror
          dayMaxEvents
          select={handleDateClick}
          eventClick={handleEventClick}
          eventsSet={(events) => setCurrentEvents(events)}
          initialEvents={[
            { id: '43545', title: 'All-day event example', date: '2022-03-02', },
            { id: '435435', title: 'All-day event', date: '2022-05-16', }
          ]}
        />
      </Box>
    </Box>
  );
};

export default Calendar;