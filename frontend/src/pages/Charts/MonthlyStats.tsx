import { Box } from "@mui/material";
import PlaceholderDataAlert from "../../components/Charts/components/PlaceholderDataAlert";
import LineChart from "../../components/Charts/LineChart";
import Loading from "../../components/Loading/Loading";
import Main from "../../components/Main/Main";
import { useRevenueData } from "./MonthlyStats.utils";

const MonthlyStats = () => {
  const { result, isPlaceholderData } = useRevenueData();

  return (
    <Main title="Monthly Revenue">
      {result ? (
        <>
          <PlaceholderDataAlert isPlaceholderData={isPlaceholderData} />
          <Box height="600px">
            <LineChart result={result} />
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Main>
  );
};

export default MonthlyStats;
