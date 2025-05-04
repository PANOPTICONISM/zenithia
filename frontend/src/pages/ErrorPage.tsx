import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { darkBlue, white } from "../App";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route error:", error);

  const getErrorDetails = React.useCallback(() => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return {
          title: "🔍 404",
          message: "This page does not exist."
        };
      }

      if (error.status === 401) {
        return {
          title: "🔒 401",
          message: "You are not authorized to view this page."
        };
      }

      if (error.status === 503) {
        return {
          title: "⚠️ 503",
          message: "Service unavailable. Please try again later."
        };
      }
      return {
        title: "🚧 Out of service",
        message: "We're working on fixing this. Please try again later."
      };
    }
    return {
      title: "❌ Error",
      message: "An unexpected error occurred."
    };
  }, [error]);
  const { title, message } = getErrorDetails();

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: darkBlue,
        color: white
      }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </Stack>
    </Container>
  );
};
