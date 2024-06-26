import { useEffect, useState } from "react";

function useJobs() {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/jobs"); // Use full URL if necessary
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const response = await fetch("/api/jobs");
      const data = await response.json();
      //   console.log("Fetched jobs:", data); // Debugging log
      setJobs(data);
      // fetch("http://127.0.0.1:3001/api/jobs")
      //   .then((res) => res.json())
      //   .then((result) => setJobs(result));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    // console.log("runed");
    fetchJobs();
    // fetch("http://127.0.0.1:3001/api/jobs")
    //   .then((res) => res.json())
    //   .then((result) => setJobs(result));
  }, []);

  return jobs;
}

export default useJobs;
