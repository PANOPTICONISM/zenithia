import { ClientProps } from 'lib/clients';
import { TimeTrackerProps } from 'lib/timetracker';

export type ProjectProps = {
    id?: string,
    project_id?: string,
    title: string,
    start_date: string,
    finish_date: string,
    status: string,
    revenue: string,
    base_price: number | null,
    client_id: string | null,
    clients?: ClientProps,
    time_tracker?: TimeTrackerProps[]
}