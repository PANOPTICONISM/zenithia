import { TimeTrackerProps } from 'lib/timetracker';

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