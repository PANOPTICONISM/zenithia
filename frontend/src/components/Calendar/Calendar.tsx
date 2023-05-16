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
import { AddEventModal, EventModal } from './Modals';

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = React.useState<(EventApi | CalendarProps)[]>([]);
  const [isAddCard, setIsAddCard] = React.useState<boolean>(false);
  const [newCard, setNewCard] = React.useState<DateSelectArg | undefined>(undefined);
  const [isEditCard, setIsEditCard] = React.useState<boolean>(false);
  const [editableCard, setEditableCard] = React.useState<EventClickArg | undefined>(undefined);
  const tabletBreakpoint = useMediaQuery('(max-width:800px)');
  const desktopBreakpoint = useMediaQuery('(max-width:1300px)');

  React.useEffect(() => {
    getCalendar()
      .then((res) => setCurrentEvents(res))
      .catch(() => toast.error('Could not add the event'));
  }, []);

  const handleDateClick = (selected: DateSelectArg) => {
    setNewCard(selected);
    setIsAddCard(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    setIsEditCard(true);
    setEditableCard(selected);
  };

  return (
    <>
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
                    event.start ? <Typography>{formatDate(event.start, {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}</Typography> : ''
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex="1 1 100%">
          {currentEvents.length > 0 && 
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
            eventsSet={(events) => setCurrentEvents(events)}
            eventContent={(info) => <EventItem info={info} />}
            initialEvents={currentEvents as EventSourceInput}
          />}
        </Box>
      </Stack>
      {editableCard && <EventModal open={isEditCard} setOpen={setIsEditCard} card={editableCard} />}
      {newCard && <AddEventModal open={isAddCard} setOpen={setIsAddCard} card={newCard} />}
    </>
  );
};

export default Calendar;