import React from 'react';
import Main from '../components/Main/Main';
import { Grid, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { grey, lightBlue } from 'App';
import { DateAndLevel } from 'components/KanbanColumn/KanbanColumn.utils';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getTasks } from 'lib/tasks';
import { toast } from 'react-toastify';
import { TaskProps } from 'lib/tasks';
import lodash from 'lodash';
import Calendar from 'components/Calendar/Calendar';
import { EarningsTimeline } from './Revenue/Revenue';
import PublicIcon from '@mui/icons-material/Public';
import TodayIcon from '@mui/icons-material/Today';
import { logsByTimeline } from './Revenue/Revenue.utils';
import { useGetProjectsFormatted } from 'hooks/useGetProjectsFormatted';
import { valueFormatter } from './Projects/Projects.utils';

const Dashboard = () => {
  const [tasks, setTasks] = React.useState<TaskProps[]>([]);

  const date = new Date();
  const time = date.getHours();
  const greeting = (time < 12)? 'morning' :
    ((time <= 18 && time >= 12 ) ? 'afternoon' : 'night');

  const { projects } = useGetProjectsFormatted();
  const { totalMonthlySum, totalYearlySum } = logsByTimeline(projects);
  
  React.useEffect(() => {
    getTasks()
      .then((data) => {
        const sortedData = lodash.sortBy(data, 'deadline');
        setTasks(sortedData);
      })
      .catch(() => toast.error('Could not get the tasks'));
  }, []);

  return (
    <Main title={`Good ${greeting}`} hideMargin>
      <Typography fontSize={24} fontWeight={500}>{DateTime.now().toFormat('cccc, MMMM dd')}</Typography>
      <Grid container spacing={3} padding="24px 0">
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            <EarningsTimeline text="Earnings this year" total={valueFormatter.format(Number(totalYearlySum))} icon={<PublicIcon sx={{ height: '100%', width: '70px' }} />} />
            <EarningsTimeline text="Earnings this month" total={valueFormatter.format(Number(totalMonthlySum))} icon={<TodayIcon sx={{ height: '100%', width: '70px' }} />} />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={4} justifyItems="center">
          <Stack sx={{ border: `1px solid ${grey}`, maxWidth: '350px', maxHeight: '500px', overflow: 'auto' }}>
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
        <Grid item xs={12} lg={4}>
          <Calendar isDashboard />
        </Grid>
      </Grid>
    </Main>
  );
};

export default Dashboard;
