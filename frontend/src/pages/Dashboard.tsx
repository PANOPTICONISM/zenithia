import React from 'react';
import Main from '../components/Main/Main';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { grey, lightBlue } from 'App';
import { DateAndLevel } from 'components/KanbanColumn/KanbanColumn.utils';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getTasks } from 'lib/tasks';
import { toast } from 'react-toastify';
import { TaskProps } from 'lib/tasks';

const Dashboard = () => {
  const [tasks, setTasks] = React.useState<TaskProps[]>([]);
  const date = new Date();
  const time = date.getHours();
  const greeting = (time < 12)? 'morning' :
    ((time <= 18 && time >= 12 ) ? 'afternoon' : 'night');
  
  React.useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch(() => toast.error('Could not get the tasks'));
  }, []);

  return (
    <Main title={`Good ${greeting}`} hideMargin>
      <Typography fontSize={24} fontWeight={500}>{DateTime.now().toFormat('cccc, MMMM dd')}</Typography>
      <Grid padding="24px 0">
        <Stack sx={{ border: `1px solid ${grey}`, maxWidth: '350px' }}>
          <Stack direction="row" spacing={1} sx={{ padding: '24px 24px 0 24px' }}>
            <ReceiptLongIcon />
            <Typography>Urgent</Typography>
          </Stack>
          <Stack padding="24px" spacing={2}>
            {tasks.map((task) => (
              <Stack key={task.id} sx={{ background: lightBlue, padding: '24px', }}>
                <Typography fontWeight={700} fontSize="16px">{task.title}</Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" paddingTop="16px" flexWrap="wrap">
                  <DateAndLevel deadline={DateTime.fromISO(task.deadline).toFormat('MMMM, dd')} level={task.importance} />
                  <Typography fontWeight={100} fontSize="14px" sx={{ marginLeft: 'auto' }}>{task.projects?.title}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Main>
  );
};

export default Dashboard;
