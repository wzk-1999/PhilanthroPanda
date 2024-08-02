import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NonProfitHeader from "./NonProfitHeader";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function VolunteerRegistration() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    image_type: "",
    location: "",
    skills: "",
  });

  const [applicationMessage, setApplicationMessage] = useState(null); // State to store application message
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.firstName = "Title is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.location) {
      newErrors.email = "Location is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      let body = reader.result.split(",");
      formData.image_type = body[0] + ",";
      formData.image = body[1];
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      formData.user_id = userId;
      // Handle form submission, e.g., send data to backend or display a success message
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${API_BASE_URL}/Add/job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage("Job Created");
          navigate("/nonprofithome");
        } else {
          const errorData = await response.json();
          setMessage(`Job Creation Failed: ${errorData.message}`);
        }
      } catch (error) {
        setMessage(`Job Creation failed: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        // console.log("token exists");
        try {
          const decodedToken = jwtDecode(token); // Decode JWT token using jwt-decode

          // console.log(decodedToken);
          // console.log(decodedToken.id);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <NonProfitHeader headerNavigation="nonprofithome"></NonProfitHeader>
      <Container component="main" width="m">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Post New Job
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="Title"
              autoFocus
              value={formData.title}
              onChange={handleChange}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="Description"
              value={formData.description}
              onChange={handleChange}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="Location"
              value={formData.location}
              onChange={handleChange}
              error={Boolean(errors.location)}
              helperText={errors.location}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="skills"
              label="Skills Required"
              name="skills"
              autoComplete="Skills Required"
              value={formData.skills}
              onChange={handleChange}
              error={Boolean(errors.skills)}
              helperText={errors.skills}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Post New Job
            </Button>

            {message && (
              <Typography color="error" sx={{ mt: 2 }}>
                {message}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default VolunteerRegistration;
