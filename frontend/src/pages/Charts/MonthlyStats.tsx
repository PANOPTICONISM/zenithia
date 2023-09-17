import Main from "components/Main/Main";
import { Box } from "@mui/material";
import LineChart from "components/Charts/LineChart";
import Loading from "components/Loading/Loading";
import { useRevenueData } from "./MonthlyStats.utils";
import PlaceholderDataAlert from "components/PlaceholderDataAlert/PlaceholderDataAlert";

const MonthlyStats = () => {
  const { result, isPlaceholderData } = useRevenueData();

  if (!result) {
    return <Loading />;
  }

  return (
    <Main title="Monthly Revenue">
      <PlaceholderDataAlert isPlaceholderData={isPlaceholderData} />
      <Box height="600px">
        <LineChart result={result} />
      </Box>
    </Main>
  );
};

export default MonthlyStats;
