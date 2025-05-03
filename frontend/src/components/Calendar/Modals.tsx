import type { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField
} from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { toast } from "react-toastify";
import {
  deleteCalendar,
  postCalendar,
  updateCalendar
} from "../../api/calendar";
import { darkBlue } from "../../App";
import { useUserData } from "../../contexts/UserProvider";

export const EventAddModal = ({
  close,
  selected
}: {
  close: () => unknown;
  selected: DateSelectArg;
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [user] = useUserData();

  const handleAddEvent = React.useCallback(
    (close: () => unknown) => {
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();

      const startDate = DateTime.fromJSDate(selected.start).toISO();
      const endDate = DateTime.fromJSDate(selected.end).toISO();
      if (!user || !title || !startDate || !endDate) {
        return;
      }
      const eventCalendar = {
        title,
        start: startDate,
        end: endDate
      };

      calendarApi.addEvent(eventCalendar);

      postCalendar(user.token, eventCalendar)
        .then(() => {
          close();
          toast.success("Event added");
        })
        .catch(() => toast.error("Could not add the event"));
    },
    [selected, title, user]
  );

  return (
    <Stack width="400px">
      <DialogContent sx={{ padding: "24px", paddingTop: "24px!important" }}>
        <TextField
          label="Appointment's title"
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0 24px 24px 24px" }}>
        <Button
          variant="contained"
          sx={{ background: darkBlue }}
          onClick={() => handleAddEvent(close)}>
          Confirm
        </Button>
      </DialogActions>
    </Stack>
  );
};

export const EventUpdateModal = ({
  close,
  selected
}: {
  close: () => unknown;
  selected: EventClickArg;
}) => {
  const [title, setTitle] = React.useState<string>("");
  const [user] = useUserData();

  const handleUpdateEvent = React.useCallback(
    (close: () => unknown) => {
      const eventCalendarUpdated = {
        title: title,
        start: selected.event.startStr,
        end: selected.event.endStr
      };

      const calendarApi = selected.view.calendar;
      const currentEvent = calendarApi.getEventById(selected.event.id);

      if (!user) {
        return;
      }

      updateCalendar(user.token, selected.event.id, eventCalendarUpdated)
        .then(() => {
          if (currentEvent) {
            currentEvent.setProp("title", title);
          }
          close();
          toast.success("Event updated");
        })
        .catch(() => toast.error("Could not update the event"));
    },
    [title, selected, user]
  );

  const handleDeleteEvent = React.useCallback(
    (close: () => unknown) => {
      if (!user) {
        return;
      }
      deleteCalendar(user.token, selected.event.id)
        .then(() => {
          selected.event.remove();
          close();
          toast.success("Event deleted successfully");
        })
        .catch(() => toast.error("Could not delete the event"));
    },
    [user, selected]
  );

  return (
    <Stack width="400px">
      <DialogContent sx={{ padding: "24px", paddingTop: "24px!important" }}>
        <TextField
          label="Appointment's title"
          defaultValue={selected.event.title}
          fullWidth
          onChange={(event) => setTitle(event.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0 24px 24px 24px" }}>
        <Stack direction="column" spacing={1} mt="12px" width="100%">
          <Button
            variant="contained"
            sx={{ background: darkBlue }}
            fullWidth
            onClick={() => handleUpdateEvent(close)}>
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => handleDeleteEvent(close)}>
            Delete
          </Button>
        </Stack>
      </DialogActions>
    </Stack>
  );
};
