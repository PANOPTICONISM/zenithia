import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationWrapper } from "./contexts/AuthenticationWrapper";
import { DialogProvider } from "./contexts/DialogProvider";
import { SearchBarProvider } from "./contexts/SearchBarProvider";
import { SidebarProvider } from "./contexts/SidebarProvider";
import MonthlyStats from "./pages/Charts/MonthlyStats";
import YearlyStats from "./pages/Charts/YearlyStats";
import Clients from "./pages/Clients/Clients";
import Dashboard from "./pages/Dashboard";
import { ErrorPage } from "./pages/ErrorPage";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import Projects from "./pages/Projects/Projects";
import Revenue from "./pages/Revenue/Revenue";
import Schedule from "./pages/Schedule/Schedule";
import TimeTracker from "./pages/TimeTracker/TimeTracker";

export const black = "#000";
export const white = "#fff";
export const darkBlue = "#191E38";
export const lightBlue = "#F7F8FF";
export const highlight = "#1F2C4F";
export const grey = "#DBDBDB";
export const green = "#007D58";
export const yellow = "#ECB800";
export const red = "#E42C2C";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "calendar",
        element: <Schedule />
      },
      {
        path: "tasks",
        element: <KanbanBoard />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "clients",
        element: <Clients />
      },
      {
        path: "timetracker",
        element: <TimeTracker />
      },
      {
        path: "revenue",
        element: <Revenue />
      },
      {
        path: "monthly",
        element: <MonthlyStats />
      },
      {
        path: "yearly",
        element: <YearlyStats />
      }
    ]
  }
]);

function App() {
  return (
    <SidebarProvider>
      <SearchBarProvider>
        <DialogProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </DialogProvider>
      </SearchBarProvider>
    </SidebarProvider>
  );
}

export default App;
