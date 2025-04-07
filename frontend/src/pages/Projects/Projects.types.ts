import { ClientProps } from "api/clients";
import { TimeTrackerProps } from "api/timetracker";

export type ProjectProps = {
  id: string;
  title: string;
  start_date: string;
  finish_date: string;
  status: string;
  revenue: string;
  base_price: number | null;
  currency: string | null;
  client_id: string | null;
  client?: ClientProps;
  time_tracker?: TimeTrackerProps[];
};
