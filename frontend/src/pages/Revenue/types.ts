import { TimeTrackerProps } from 'lib/timetracker';

export type ProjectFormattedProps = {
    id?: number,
    title: string,
    clients?: string,
    start_date: string,
    finish_date: string,
    revenue: string,
    total: number | undefined,
    price_total: number,
    time_tracker?: TimeTrackerProps[],
    base_price: number | null,
  }