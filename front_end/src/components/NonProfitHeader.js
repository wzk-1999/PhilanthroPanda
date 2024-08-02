import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

const pages = ["Jobs Posted", "Post new Job"];
const settings = ["Profile", "Logout"];

function NonProfitHeader({headerNavigation}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateToPage = (event) => {
    setAnchorElUser(null);
    if (event.currentTarget.id === "Jobs Posted") {
      navigate("/nonprofithome");
    } else if(event.currentTarget.id === "Post new Job"){
      navigate("/newJob");
    }
  }

  const navigate = useNavigate();

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    if (event.currentTarget.id === "Profile") {
      navigate("/profile");
    } else if(event.currentTarget.id === "Logout"){
      navigate("/");
    }
  };

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
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PhilontroPanda
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                id={page}
                onClick={navigateToPage}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/Profile.jpeg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  id={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NonProfitHeader;
