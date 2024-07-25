import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function DefaultHeader({headerNavigation}) {
  const navigate = useNavigate();
  let link = headerNavigation ? '/'+headerNavigation : '/';

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ height: 45, width: 45, m: 2 }}
            alt="Logo"
            src={require("../static/icons/panda.png")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            onClick={() => navigate(link)}
            sx={{
              ml: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PhilontroPanda
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default DefaultHeader;
