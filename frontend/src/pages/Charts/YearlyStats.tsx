import { Box } from "@mui/material";
import PlaceholderDataAlert from "../../components/Charts/components/PlaceholderDataAlert";
import PieChart from "../../components/Charts/PieChart";
import Loading from "../../components/Loading/Loading";
import Main from "../../components/Main/Main";
import { useRevenueData } from "./YearlyStats.utils";

const YearlyStats = () => {
  const { result, isPlaceholderData } = useRevenueData();

  return (
    <Main title="Yearly Revenue">
      {result ? (
        <>
          <PlaceholderDataAlert isPlaceholderData={isPlaceholderData} />
          <Box height="500px">
            <PieChart result={result} />
          </Box>
        </>
      ) : (
        <Loading />
      )}
    </Main>
  );
};

export default YearlyStats;
