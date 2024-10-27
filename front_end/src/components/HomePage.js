import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";

import DefaultHeader from "./DefaultHeader";

import { useNavigate } from "react-router-dom";

function HomePage() {
  const [loginType, setLoginType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const loginData = { email, password };

    const url = `${API_BASE_URL}/login`; // Adjust URL if needed based on loginType

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setMessage("");
      localStorage.setItem("token", data.token);
      if (loginType === "user") {
        navigate("/home");
      } else {
        navigate("/nonprofithome");
      }
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      setMessage("Login Failed");
      // Handle login error (e.g., show error message)
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/github`; // Backend GitHub OAuth2 endpoint
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`; // Backend google OAuth2 endpoint
  };

  const renderLoginForm = () => {
    return (
      <Box
        component="form"
        onSubmit={handleLoginSubmit}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {loginType === "user" ? "Volunteer Login" : "Non-Profit Login"}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Login
        </Button>
        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          Log in using a third-party account:
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
            onClick={handleGitHubLogin}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <DefaultHeader />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={require("../static/images/VolunteerHome.jpeg")} // Ensure the path is correct
              alt="Illustration"
              sx={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {loginType === null ? (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  onClick={() => setLoginType("user")}
                >
                  Volunteer Login
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setLoginType("business")}
                >
                  Non-Profit Login
                </Button>
              </>
            ) : (
              renderLoginForm()
            )}

            {loginType !== null ? (
              <>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  onClick={() => setLoginType(null)}
                >
                  Back to Login Options
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button
              variant="outlined"
              fullWidth
              sx={{ mb: 2, mt: 2 }}
              onClick={() => navigate("/volunteerregistration")}
            >
              Volunteer Registration
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/businessregistration")}
            >
              Non-Profit Registration
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;
