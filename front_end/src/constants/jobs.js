import { useEffect, useState } from "react";

function useJobs() {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/api/jobs`); // Use full URL if necessary
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // const response = await fetch("/api/jobs");
      const data = await response.json();

      if (data) {
        data.forEach((dt) => {
          //dt.imageurl = URL.createObjectURL(dt.image_type+dt.image);
        });
      }

      //   console.log("Fetched jobs:", data); // Debugging log
      setJobs(data);
      // fetch("http://${API_BASE_URL}/api/jobs")
      //   .then((res) => res.json())
      //   .then((result) => setJobs(result));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    // console.log("runed");
    fetchJobs();
    // fetch("http://${API_BASE_URL}/api/jobs")
    //   .then((res) => res.json())
    //   .then((result) => setJobs(result));
  }, []);

  return jobs;
}

export default useJobs;
