import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PublicIcon from "@mui/icons-material/Public";
import SavingsIcon from "@mui/icons-material/Savings";
import TodayIcon from "@mui/icons-material/Today";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid, DataGridProps, GridFilterModel } from "@mui/x-data-grid";
import { grey } from "App";
import Main from "components/Main/Main";
import { currencyToLocale } from "lib/currency";
import React from "react";
import {
  finalizeTotals,
  logsByTimeline,
  useColumnsAndRows,
} from "./Revenue.utils";

export const EarningsTimeline = ({
  text,
  total,
  icon,
}: {
  text: string;
  total: string;
  icon: React.ReactNode;
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      boxSizing="border-box"
      padding="24px"
      sx={{ border: `1px solid ${grey}`, width: "100%" }}
      alignItems="center"
    >
      {icon}
      <Box>
        <Typography fontWeight={700}>{text}</Typography>
        <Typography fontSize="30px">{total}</Typography>
      </Box>
    </Stack>
  );
};

const SuggestionBox = ({
  title,
  tagline,
  icon,
}: {
  title: string;
  tagline: string;
  icon: React.ReactNode;
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      padding="24px"
      sx={{ border: `1px solid ${grey}`, width: "100%" }}
      alignItems="center"
    >
      {icon}
      <Box>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography>{tagline}</Typography>
      </Box>
    </Stack>
  );
};

const DataGridInfo = ({
  text,
  total,
  icon,
}: {
  text: string;
  total: string;
  icon: React.ReactNode;
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      padding="24px"
      sx={{ border: `1px solid ${grey}`, width: "100%" }}
      alignItems="center"
    >
      {icon}
      <Box>
        <Typography>{text}</Typography>
        <Typography fontSize="30px">{total}</Typography>
      </Box>
    </Stack>
  );
};

const Revenue = () => {
  const { columns, rows, filteredData, setFilteredData } = useColumnsAndRows();
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
  const { totalMonthlySum, totalYearlySum } = logsByTimeline(rows);

  const handleFilterChange: NonNullable<DataGridProps["onFilterModelChange"]> =
    React.useCallback(
      (model) => {
        const filteringData =
          model.items[0].value !== undefined
            ? rows.filter((entry) => {
              if (
                model.items[0].field === "start_date" &&
                model.items[0].operator === "onOrAfter"
              ) {
                return model.items[0].value <= entry.start_date;
              }
              if (
                model.items[0].field === "start_date" &&
                model.items[0].operator === "is"
              ) {
                return model.items[0].value === entry.start_date;
              }
              if (
                model.items[0].field === "start_date" &&
                model.items[0].operator === "not"
              ) {
                return model.items[0].value !== entry.start_date;
              }

              if (
                model.items[0].field === "finish_date" &&
                model.items[0].operator === "onOrAfter"
              ) {
                return model.items[0].value <= entry.finish_date;
              }
              if (
                model.items[0].field === "finish_date" &&
                model.items[0].operator === "onOrBefore"
              ) {
                return model.items[0].value >= entry.finish_date;
              }
              if (
                model.items[0].field === "finish_date" &&
                model.items[0].operator === "is"
              ) {
                return model.items[0].value === entry.finish_date;
              }
              if (
                model.items[0].field === "finish_date" &&
                model.items[0].operator === "not"
              ) {
                return model.items[0].value !== entry.finish_date;
              }
            })
            : filteredData;
        setFilteredData(filteringData);

        setFilterModel(model);
      },
      [filteredData],
    );

  const absoluteTotal = finalizeTotals(filteredData).reduce(
    (partialSum, { totalPrice }) => partialSum + totalPrice,
    0,
  );

  return (
    <Main title="Revenue">
      <Stack direction="row" spacing={2} paddingBottom="24px">
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
      <Stack direction="row" spacing={2} paddingBottom="24px">
        <SuggestionBox
          title="Earnings as shown below"
          tagline="Add date filters in the table below to find out how much you earned under a specific timeframe."
          icon={<EmojiObjectsIcon sx={{ height: "100%", width: "70px" }} />}
        />
        <DataGridInfo
          text="Estimated total of earnings"
          total={currencyToLocale(absoluteTotal)}
          icon={<SavingsIcon sx={{ height: "100%", width: "70px" }} />}
        />
      </Stack>
      <Box sx={{ height: 350, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};

export default Revenue;
