import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventApi, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/core';
import { Box, Button, List, ListItem, ListItemText, Modal, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { darkBlue, white } from 'App';
import { v4 as uuidv4 } from 'uuid';
import { updateCalendar } from 'lib/calendar';
import { toast } from 'react-toastify';

const EventModal = ({ open, setOpen, card } : { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, card: EventClickArg}) => {
  const [title, setTitle] = React.useState<string>(card.event.title);

  const handleUpdateEvent = async () => {
    try {
      const eventCalendarUpdated = {
        id: card.event.id,
        title: card.event.title,
        start: card.event.startStr,
        end: card.event.endStr,
      };
    
      await updateCalendar(card.event.id, eventCalendarUpdated);
    } catch (err) {
      toast.error('Could not update the event');
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box sx={{ position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        p: 4
      }}>
        <TextField
          label="Appointment's title"
          defaultValue={title}
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
        <Stack direction="column" spacing={1} mt="12px">
          <Button 
            variant="contained" 
            sx={{ background: darkBlue }}           
            onClick={handleUpdateEvent}
          >
        Update
          </Button>
          <Button variant="outlined" color="error">
        Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

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
  const [editableCard, setEditableCard] = React.useState<EventClickArg | undefined>(undefined);
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
            eventsSet={(events) => setCurrentEvents(events)}
            eventContent={(info) => <EventItem info={info} />}
            initialEvents={[
              { id: uuidv4(), title: 'All-day event example', date: '2023-03-02', },
              { id: uuidv4(), title: 'All-day event', date: '2023-05-16', }
            ]}
          />
        </Box>
      </Stack>
      {editableCard && <EventModal open={isEditCard} setOpen={setIsEditCard} card={editableCard} />}
    </>
  );
};

export default Calendar;