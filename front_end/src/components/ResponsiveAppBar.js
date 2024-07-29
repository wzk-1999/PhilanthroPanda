import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";


import { useNavigate } from "react-router-dom";

const pages = ["Best-Matches", "Most-Recent", "Applied", "Saved"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavClick = (event) => {
    setAnchorElNav(null);
    if (event.currentTarget.id === "Best-Matches") {
      navigate("/home");
    } else if(event.currentTarget.id === "Applied"){
      navigate("/appliedJobs");
    }
  };

  const navigate = useNavigate();

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    if (event.currentTarget.id === "Profile") {
      navigate("/profile");
    } else if(event.currentTarget.id === "Logout"){
      navigate("/");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search functionality here
    console.log("Search query submitted:", searchQuery);
    navigate('/search?key='+searchQuery);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 45,
              width: 45,
              m: 2,
            }}
            alt="The house from the offer."
            src={require("../static/icons/panda.png")}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
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
                onClick={handleNavClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ flexGrow: 1, mx: 2 }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
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
export default ResponsiveAppBar;
