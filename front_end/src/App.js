import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import JobDescription from "./components/JobDescription";
import Profile from "./components/Profile";
import BusinessRegistration from "./components/BusinessRegistration";
import VolunteerRegistration from "./components/VolunteerRegistration";
import HomePage from "./components/HomePage";
import NonProfitHome from "./components/NonProfitHome";
import NewJob from "./components/NewJob";
import AppliedJobs from "./components/AppliedJobs";
import Search from "./components/Search";
import ApplicantList from "./components/ApplicantList";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jobdescription" element={<JobDescription />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/businessregistration"
          element={<BusinessRegistration />}
        />
        <Route
          path="/volunteerregistration"
          element={<VolunteerRegistration />}
        />
        <Route path="/NonProfitHome" element={<NonProfitHome />} />
        <Route path="/NewJob" element={<NewJob />} />
        <Route path="/appliedJobs" element={<AppliedJobs />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ApplicantList" element={<ApplicantList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
