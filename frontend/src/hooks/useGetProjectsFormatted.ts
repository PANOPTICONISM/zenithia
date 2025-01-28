import { getProjects } from "api/projects";
import { TimeTrackerProps } from "api/timetracker";
import { useUserData } from "contexts/UserProvider";
import { finalizeTotals } from "pages/Revenue/Revenue.utils";
import React from "react";
import { toast } from "react-toastify";

export type ProjectFormattedProps = {
  id?: string;
  title: string;
  client?: string;
  start_date: string;
  finish_date: string;
  revenue: string;
  tracked_time_in_milliseconds: number | undefined;
  estimated_earnings: number;
  time_tracker?: TimeTrackerProps[];
  base_price: number | null;
};

export const useGetProjectsFormatted = () => {
  const [projects, setProjects] = React.useState<ProjectFormattedProps[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        return;
      }
      getProjects(user.token, "*").then((allProjects) => {
        const result = allProjects.map((project) => {
          const obj = {
            id: project.id,
            title: project.title,
            client: project.client?.name || undefined,
            start_date: project.start_date,
            finish_date: project.finish_date,
            base_price: project.base_price,
            revenue: project.revenue,
            tracked_time_in_milliseconds: finalizeTotals([project])?.[0]
              .hoursTotal,
            estimated_earnings: finalizeTotals([project])?.[0].totalPrice,
            time_tracker:
              project.time_tracker?.[0]?.id === null
                ? []
                : project.time_tracker,
          };
          return obj;
        });
        setProjects(result);
      });
    };
    fetchAll().catch((error) => toast.error(error));
  }, [user]);

  return { projects, setProjects };
};
