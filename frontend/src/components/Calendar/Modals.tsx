import { EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { TextField, Stack, Button, DialogContent, DialogActions } from '@mui/material';
import { darkBlue } from 'App';
import { updateCalendar, deleteCalendar, postCalendar } from 'lib/calendar';
import React from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const EventAddModal = ({ close, selected } : { close: () => unknown, selected: DateSelectArg }) => {
  const [title, setTitle] = React.useState<string>('');

  const handleAddEvent = React.useCallback((close: () => unknown) => {
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
  
    if (title) {
      const eventCalendar = {
        id: uuidv4(),
        title,
        start: selected.startStr,
        end: selected.endStr,
      };
            
      calendarApi.addEvent(eventCalendar);
  
      postCalendar(eventCalendar)
        .then(() => {
          close();
          toast.success('Event added');
        })
        .catch(() => toast.error('Could not add the event'));
    }
  }, [title]);

  return (
    <Stack width="400px">
      <DialogContent sx={{ padding: '24px', paddingTop: '24px!important' }}>
        <TextField
          label="Appointment's title"
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px' }}>
        <Button 
          variant="contained" 
          sx={{ background: darkBlue }}           
          onClick={() => handleAddEvent(close)}
        >
                Confirm
        </Button>
      </DialogActions>
    </Stack>
  );
};

export const EventUpdateModal = ({ close, selected } : { close: () => unknown, selected: EventClickArg }) => {
  const [title, setTitle] = React.useState<string>('');

  const handleUpdateEvent = React.useCallback((close: () => unknown) => {
    const eventCalendarUpdated = {
      id: selected.event.id,
      title: title,
      start: selected.event.startStr,
      end: selected.event.endStr,
    };
    
    const calendarApi = selected.view.calendar;
    const currentEvent = calendarApi.getEventById(selected.event.id);
    
    updateCalendar(selected.event.id, eventCalendarUpdated)
      .then(() => {
        if (currentEvent) {
          currentEvent.setProp('title', title);
        }
        close();
        toast.success('Event updated');
      })
      .catch(() => toast.error('Could not update the event'));
  }, [title]);

  const handleDeleteEvent = React.useCallback((close: () => unknown) => {
    deleteCalendar(selected.event.id)
      .then(() => {
        selected.event.remove();
        close();
        toast.success('Event deleted successfully');
      })
      .catch(() => toast.error('Could not delete the event'));
  }, []);

  return (
    <Stack width="400px">
      <DialogContent sx={{ padding: '24px', paddingTop: '24px!important' }}>
        <TextField
          label="Appointment's title"
          defaultValue={selected.event.title}
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px' }}>
        <Stack direction="column" spacing={1} mt="12px" width="100%">
          <Button 
            variant="contained" 
            sx={{ background: darkBlue }}   
            fullWidth        
            onClick={() => handleUpdateEvent(close)}
          >
              Update
          </Button>
          <Button
            variant="outlined" 
            color="error" 
            fullWidth
            onClick={() => handleDeleteEvent(close)}
          >
              Delete
          </Button>
        </Stack>
      </DialogActions>
    </Stack>
  );
};