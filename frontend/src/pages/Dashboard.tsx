import PublicIcon from "@mui/icons-material/Public";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TodayIcon from "@mui/icons-material/Today";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import filter from "lodash/filter";
import sortBy from "lodash/sortBy";
import { DateTime } from "luxon";
import React from "react";
import { toast } from "react-toastify";
import { TaskProps, getTasks } from "../api/tasks";
import { grey, lightBlue } from "../App";
import Calendar from "../components/Calendar/Calendar";
import LineChart from "../components/Charts/LineChart";
import { DateAndLevel } from "../components/common/DateAndLevel";
import Main from "../components/Main/Main";
import { useUserData } from "../contexts/UserProvider";
import { useGetProjectsFormatted } from "../hooks/useGetProjectsFormatted";
import { currencyToLocale } from "../lib/currency";
import { useRevenueData } from "./Charts/MonthlyStats.utils";
import { EarningsTimeline } from "./Revenue/Revenue";
import { logsByTimeline } from "./Revenue/Revenue.utils";
import { COLUMNS } from "./Tasks/Tasks";

const exampleData = [
  {
    id: "sdf98fd",
    title: "Example task",
    importance: "medium",
    deadline: "2023-10-05",
    column_id: COLUMNS.TO_DO,
    projects: {
      title: "Ragnarock",
      start_date: "2023-01-01",
      finish_date: "2023-12-31",
      status: "ongoing",
      revenue: "10000",
      base_price: 5000,
      currency: "USD",
      client_id: "client123"
    },
    project_id: "0000"
  }
];

const Dashboard = () => {
  const desktopBreakpoint = useMediaQuery("(min-width:1200px)");

  const [tasks, setTasks] = React.useState<{
    data: TaskProps[];
    isLoading: boolean;
  }>({ data: exampleData, isLoading: true });

  const date = new Date();
  const time = date.getHours();
  const greeting =
    time < 12 ? "morning" : time <= 18 && time >= 12 ? "afternoon" : "night";

  const { projects } = useGetProjectsFormatted();
  const { totalMonthlySum, totalYearlySum } = logsByTimeline(projects);

  const { result } = useRevenueData();
  const [user] = useUserData();

  React.useEffect(() => {
    if (!user) {
      return;
    }
    getTasks(user.token)
      .then((data) => {
        const filteredOutDoneTasks = filter(
          data,
          (task) => task.column_id !== COLUMNS.DONE
        );
        const sortedData = sortBy(filteredOutDoneTasks, "deadline");
        setTasks({ data: sortedData, isLoading: false });
      })
      .catch(() => toast.error("Could not get the tasks. Try again later."));
  }, [user]);

  return (
    <Main title={`Good ${greeting}`} hideMargin>
      <Typography fontSize={24} fontWeight={500}>
        {DateTime.now().toFormat("cccc, MMMM dd")}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="auto"
        gap={2}
        padding="24px 0">
        <Box
          gridColumn={desktopBreakpoint ? "1/5" : "span 12"}
          gridRow={desktopBreakpoint ? "1/2" : "auto"}>
          <Stack spacing={2} height="100%">
            <EarningsTimeline
              text="Earnings this year"
              total={currencyToLocale(totalYearlySum)}
              icon={<PublicIcon sx={{ height: "100%", width: "70px" }} />}
            />
            <EarningsTimeline
              text="Earnings this month"
              total={currencyToLocale(totalMonthlySum)}
              icon={<TodayIcon sx={{ height: "100%", width: "70px" }} />}
            />
          </Stack>
        </Box>
        <Box
          gridColumn={desktopBreakpoint ? "5/9" : "span 12"}
          gridRow={desktopBreakpoint ? "1/2" : "auto"}>
          <Calendar isDashboard />
        </Box>
        <Box
          gridColumn={desktopBreakpoint ? "9/-1" : "span 12"}
          gridRow={desktopBreakpoint ? "1/5" : "auto"}>
          <Stack
            sx={{
              border: `1px solid ${grey}`,
              height: "100%",
              overflow: "auto"
            }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ padding: "24px 24px 0 24px" }}>
              <ReceiptLongIcon />
              <Typography>Urgent</Typography>
            </Stack>
            <Stack padding="24px" spacing={2}>
              {tasks.isLoading
                ? null
                : tasks.data.map((task) => (
                    <Stack
                      key={task.id}
                      sx={{ background: lightBlue, padding: "24px" }}>
                      <Typography fontWeight={700} fontSize="16px">
                        {task.title}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        paddingTop="16px"
                        flexWrap="wrap">
                        <DateAndLevel
                          deadline={DateTime.fromISO(task.deadline)
                            .toFormat("MMM, dd")
                            .toLocaleString()}
                          level={task.importance}
                        />
                        <Typography
                          fontWeight={100}
                          fontSize="14px"
                          sx={{ marginLeft: "auto" }}>
                          {task.project?.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
            </Stack>
          </Stack>
        </Box>
        {result ? (
          <Box
            height="100%"
            maxHeight="326px"
            gridColumn={desktopBreakpoint ? "span 8" : "span 12"}
            gridRow={desktopBreakpoint ? "2/4" : "auto"}
            border={`1px solid ${grey}`}>
            <LineChart result={result} />
          </Box>
        ) : null}
      </Box>
    </Main>
  );
};

export default Dashboard;
