import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useColumnsAndRows } from "./Projects.utils";
import { ProjectProps } from "./Projects.types";
import Main from "../../components/Main/Main";
import { useFiltering } from "../../components/SearchBar/SearchBar.utils";
import { postProject, updateProject } from "../../api/projects";
import { toast } from "react-toastify";
import { useUserData } from "contexts/UserProvider";
import { v4 as uuidv4 } from "uuid";
import { currentDate, dateFromJSDateToISOForApi } from "lib/dates";

const Projects = () => {
  const { columns, rows, setRows } = useColumnsAndRows();
  const { filterModel, handleFilterChange } = useFiltering({
    columnField: "title",
  });

  const [user] = useUserData();

  const handleProcessRowUpdate = React.useCallback(
    (newRow: ProjectProps, oldRow: ProjectProps) => {
      if (!oldRow.id || !user) {
        return oldRow;
      }

      const row = {
        title: newRow.title,
        start_date: dateFromJSDateToISOForApi(newRow.start_date),
        finish_date: dateFromJSDateToISOForApi(newRow.finish_date),
        status: newRow.status,
        revenue: newRow.revenue,
        base_price: newRow.base_price,
        client_id: newRow.client_id === "" ? null : newRow.client_id,
      };
      updateProject(user.token, oldRow.id, row).catch((error) =>
        toast.error(error),
      );
      return newRow;
    },
    [user],
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
  }, []);

  const addProject = () => {
    if (!user) {
      return;
    }
    const obj = {
      id: uuidv4(),
      title: "",
      start_date: currentDate,
      finish_date: currentDate,
      status: "Standby",
      revenue: "Hourly",
      base_price: null,
      client_id: null,
    };

    postProject(user.token, obj)
      .then(() => setRows((current) => [...current, obj]))
      .catch((error) => toast.error(error));
  };

  return (
    <Main
      title="Projects"
      handleClick={addProject}
      buttonText="Add project"
      isSearch
    >
      <Box sx={{ height: 620, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          editMode="row"
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
        />
      </Box>
    </Main>
  );
};

export default Projects;
