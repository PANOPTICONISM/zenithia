import { getProjects } from 'lib/projects';
import { TimeTrackerProps } from 'lib/timetracker';
import { Duration } from 'luxon';
import React from 'react';

export type ProjectFormattedProps = {
    id?: number,
    title: string,
    clients?: string,
    start_date: string,
    finish_date: string,
    revenue: string,
    tracked_time_in_milliseconds: number | undefined,
    estimated_earnings: number,
    time_tracker?: TimeTrackerProps[],
    base_price: number | null,
}

export const useGetProjectsFormatted = () => {
  const [projects, setProjects] = React.useState<ProjectFormattedProps[]>([]);

  React.useEffect(() => {
    getProjects('*, time_tracker(*), clients(*)')
      .then((res) => {
        const result = res.map((entry) => {
          const initialValue = 0;
          const hoursTotal = entry?.time_tracker?.reduce(
            (accumulator, currentValue) => accumulator + (currentValue?.total || 0),
            initialValue
          );
      
          const totalMinutes = hoursTotal && Duration.fromMillis(hoursTotal).toFormat('mm');
          let totalPrice = 0;
          if (entry.base_price && hoursTotal) {
            if (entry.revenue === 'Project') {
              totalPrice = entry.base_price;
            } else {
              totalPrice = (entry.base_price / 100) * Number(totalMinutes);
            }
          }
      
          const obj = {
            id: entry.id,
            title: entry.title,
            client: entry.clients?.name,
            start_date: entry.start_date,
            finish_date: entry.finish_date,
            base_price: entry.base_price,
            revenue: entry.revenue,
            tracked_time_in_milliseconds: hoursTotal,
            estimated_earnings: totalPrice,
            time_tracker: entry.time_tracker,
          };
          return obj;
        });
        setProjects(result);
      })
      .catch((error) => console.log('GET: ' + error));
  }, []);

  return { projects, setProjects };
};