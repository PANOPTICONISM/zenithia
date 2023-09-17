import Main from "components/Main/Main";
import React from "react";
import { DateTime } from "luxon";
import { Box } from "@mui/material";
import { useGetProjectsFormatted } from "hooks/useGetProjectsFormatted";
import PieChart from "components/Charts/PieChart";
import { PieChartProps } from "components/Charts/Charts.types";
import PlaceholderDataAlert from "components/PlaceholderDataAlert/PlaceholderDataAlert";
import { useRevenueData } from "./YearlyStats.utils";
import Loading from "components/Loading/Loading";

const YearlyStats = () => {
  const { yearlyLogsTotals, isPlaceholderData } = useRevenueData();

  if (!yearlyLogsTotals) {
    return <Loading />;
  }

  return (
    <Main title="Yearly Revenue">
      <PlaceholderDataAlert isPlaceholderData={isPlaceholderData} />
      <Box height="500px">
        <PieChart logs={yearlyLogsTotals} />
      </Box>
    </Main>
  );
};

export default YearlyStats;
