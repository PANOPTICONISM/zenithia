import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button } from "@mui/material";
import { GridColDef, GridEditInputCell, GridRowId } from "@mui/x-data-grid";
import React from "react";
import { toast } from "react-toastify";
import { ClientId, ClientProps, getClients } from "../../api/clients";
import { deleteProject, getProjects } from "../../api/projects";
import { lightBlue } from "../../App";
import StatusTag from "../../components/StatusTag/StatusTag";
import { useUserData } from "../../contexts/UserProvider";
import { currencyFromCents, currencyToLocale } from "../../lib/currency";
import { dateToLocaleString } from "../../lib/dates";
import { ProjectProps } from "./Projects.types";

export const useColumnsAndRows = () => {
  const [rows, setRows] = React.useState<ProjectProps[]>([]);
  const [clients, setClients] = React.useState<(ClientProps & ClientId)[]>([]);

  const [user] = useUserData();

  React.useEffect(() => {
    const fetchAll = async () => {
      if (!user) {
        return;
      }
      await Promise.all([
        getClients(user.token),
        getProjects<ProjectProps[]>(user.token)
      ]).then(([clientsRes, projectsRes]) => {
        setClients(clientsRes);
        setRows(projectsRes);
      });
    };
    fetchAll().catch((error) => toast.error(error));
  }, [user]);

  const deleteEntry = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        if (!user) {
          return;
        }
        deleteProject(user.token, id)
          .then(() =>
            setRows((prevRows) => prevRows.filter((row) => row.id !== id))
          )
          .catch((error) => toast.error(error));
      });
    },
    [user]
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      valueFormatter: (value: string | undefined) => value?.slice(0, 8)
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 100,
      editable: true
    },
    {
      field: "client_id",
      headerName: "Client",
      minWidth: 100,
      flex: 1,
      type: "singleSelect",
      editable: true,
      valueOptions: clients.map((client) => ({
        value: client.id,
        label: client.name
      })),
      valueGetter: (value) => value || "",
      renderCell: (params) =>
        params.formattedValue && (
          <Box
            sx={{
              background: lightBlue,
              padding: "0 10px"
            }}>
            {params.formattedValue}
          </Box>
        )
    },
    {
      field: "start_date",
      headerName: "Start",
      minWidth: 100,
      flex: 1,
      valueFormatter: (value) => dateToLocaleString(value),
      type: "date",
      editable: true
    },
    {
      field: "finish_date",
      headerName: "Finish",
      minWidth: 100,
      flex: 1,
      valueFormatter: (value) => dateToLocaleString(value),
      type: "date",
      editable: true
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      type: "singleSelect",
      valueOptions: ["Active", "Standby", "Archived"],
      editable: true,
      renderCell: ({ value }) => {
        if (value === "Archived") {
          return <StatusTag color="inherit" value={value} />;
        }

        if (value === "Standby") {
          return <StatusTag color="warning" value={value} />;
        }

        return <StatusTag color="success" value={value} />;
      }
    },
    {
      field: "base_price",
      headerName: "Base Price",
      flex: 1,
      minWidth: 120,
      type: "number",
      editable: true,
      valueFormatter: (value) => currencyToLocale(value),
      renderEditCell: (params) => {
        const value = currencyFromCents(params.value);
        return <GridEditInputCell {...params} value={value} />;
      }
    },
    {
      field: "revenue",
      headerName: "Revenue",
      minWidth: 80,
      type: "singleSelect",
      valueOptions: ["Hourly", "Project"],
      editable: true
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 135,
      renderCell: (params) => (
        <Button
          onClick={deleteEntry(params.id)}
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error">
          Delete
        </Button>
      )
    }
  ];

  return { columns, rows, setRows };
};
