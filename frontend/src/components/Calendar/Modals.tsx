import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { Modal, Box, TextField, Stack, Button } from '@mui/material';
import { darkBlue } from 'App';
import { updateCalendar, deleteCalendar, postCalendar } from 'lib/calendar';
import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const EventModal = ({ open, setOpen, card } : { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, card: EventClickArg}) => {
  const [title, setTitle] = React.useState<string>(card.event.title);
  
  const handleUpdateEvent = () => {
    const eventCalendarUpdated = {
      id: card.event.id,
      title: title,
      start: card.event.startStr,
      end: card.event.endStr,
    };
  
    const calendarApi = card.view.calendar;
    const currentEvent = calendarApi.getEventById(card.event.id);
  
    updateCalendar(card.event.id, eventCalendarUpdated)
      .then(() => {
        if (currentEvent) {
          currentEvent.setProp('title', title);
        }
        setOpen(false);
        toast.success('Event updated');
      })
      .catch(() => toast.error('Could not update the event'));
  };
  
  const handleDeleteEvent = () => {
    deleteCalendar(card.event.id)
      .then(() => {
        card.event.remove();
        setOpen(false);
        toast.success('Event deleted successfully');
      })
      .catch(() => toast.error('Could not delete the event'));
  
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
          <Button
            variant="outlined" 
            color="error" 
            onClick={handleDeleteEvent}>
              Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
  
export const AddEventModal = ({ open, setOpen, card } : { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, card: DateSelectArg}) => {
  const [title, setTitle] = React.useState<string>('');
    
  const handleAddEvent = () => {
    const calendarApi = card.view.calendar;
    calendarApi.unselect();
  
    if (title) {
      const eventCalendar = {
        id: uuidv4(),
        title,
        start: card.startStr,
        end: card.endStr,
      };
            
      calendarApi.addEvent(eventCalendar);
  
      postCalendar(eventCalendar)
        .then(() => {
          setOpen(false);
          toast.success('Event added');
        })
        .catch(() => toast.error('Could not add the event'));
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
            onClick={handleAddEvent}
          >
                Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};