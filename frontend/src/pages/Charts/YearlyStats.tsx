import Main from "components/Main/Main";
import { Box } from "@mui/material";
import PieChart from "components/Charts/PieChart";
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
