import { Box } from "@mui/material";
import PieChart from "components/Charts/PieChart";
import Loading from "components/Loading/Loading";
import Main from "components/Main/Main";
import PlaceholderDataAlert from "components/PlaceholderDataAlert/PlaceholderDataAlert";
import { useRevenueData } from "./YearlyStats.utils";

const YearlyStats = () => {
  const { result, isPlaceholderData } = useRevenueData();

  if (!result) {
    return <Loading />;
  }

  return (
    <Main title="Yearly Revenue">
      <PlaceholderDataAlert isPlaceholderData={isPlaceholderData} />
      <Box height="500px">
        <PieChart result={result} />
      </Box>
    </Main>
  );
};

export default YearlyStats;
