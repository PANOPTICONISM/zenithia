import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogProvider } from "./contexts/DialogProvider";
import { SearchBarProvider } from "./contexts/SearchBarProvider";
import { SidebarProvider } from "./contexts/SidebarProvider";
import { useUserData } from "./contexts/UserProvider";
import Authentication from "./pages/Authentication/Authentication";
import MonthlyStats from "./pages/Charts/MonthlyStats";
import YearlyStats from "./pages/Charts/YearlyStats";
import Clients from "./pages/Clients/Clients";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects/Projects";
import Revenue from "./pages/Revenue/Revenue";
import Schedule from "./pages/Schedule/Schedule";
import Tasks from "./pages/Tasks/Tasks";
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

function App() {
  const [user] = useUserData();

  return (
    <SidebarProvider>
      <SearchBarProvider>
        <DialogProvider>
          {user ? (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="calendar" element={<Schedule />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="projects" element={<Projects />} />
                <Route path="clients" element={<Clients />} />
                <Route path="timetracker" element={<TimeTracker />} />
                <Route path="revenue" element={<Revenue />} />
                <Route path="monthly" element={<MonthlyStats />} />
                <Route path="yearly" element={<YearlyStats />} />
              </Routes>
            </BrowserRouter>
          ) : (
            <Authentication />
          )}
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
