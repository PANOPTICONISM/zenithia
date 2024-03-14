import { Alert } from "@mui/material";
import React from "react";

const PlaceholderDataAlert = ({
  isPlaceholderData,
}: {
  isPlaceholderData: boolean;
}) => {
  return isPlaceholderData ? (
    <Alert severity="warning">
      The data in the chart underneath is a placeholder.
    </Alert>
  ) : null;
};

export default PlaceholderDataAlert;
