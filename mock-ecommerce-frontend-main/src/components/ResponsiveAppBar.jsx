import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import ThemeContext from "../contextAPi/ThemeContext";

const pages = ["Jewelery", `Men's Clothing`, `Women's Clothing`, "Electronics"];
const menu = [
  { label: "Create Product", path: "/createproduct" },
  { label: "New Products", path: "/newproducts" },
  { label: "Logout", path: "/logout" },
];

function ResponsiveAppBar({ user, setUser }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const createSlug = (text) =>
    text
      .toLowerCase()
      .replace(/'/g, "") // remove apostrophe
      .replace(/\s+/g, "-"); // replace spaces with dash

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const ITEM_HEIGHT = 48;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "white", color: "blue" }}>
      <Container maxWidth="xl" className="mx-auto max-w-6xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              const path = "/products";
              navigate(path);
            }}
          >
            SHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    const path = `/category/${page.toLowerCase()}`;
                    navigate(path);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: "center", color: "black" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              const path = "/products";
              navigate(path);
            }}
          >
            SHOP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const slug = createSlug(page);
              const path = `/category/${slug}`;
              const isActive = location.pathname === path;

              return (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(path);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    my: 2,
                    display: "block",
                    backgroundColor: isActive ? "#1976d2" : "transparent",
                    color: isActive ? "white" : "black",
                    "&:hover": {
                      backgroundColor: isActive ? "#1565c0" : "#f5f5f5",
                    },
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <div className="text-lg mr-5 " onClick={toggleTheme}>
            {theme === "light" ? <IoMoonOutline /> : <IoSunny />}
          </div>
          <ShoppingCartIcon onClick={() => navigate("/cart")} />
          {user ? (
            <div>
              <IconButton
                aria-label="account"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ color: "blue" }}
              >
                <AccountCircleIcon />
              </IconButton>

              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {menu
                  .filter((item) => {
                    if (
                      item.path === "/createproduct" ||
                      item.path === "/newproducts"
                    ) {
                      return user.role === "admin";
                    }
                    return true;
                  })
                  .map(({ label, path }) => (
                    <MenuItem
                      key={label}
                      onClick={() => {
                        handleClose();

                        if (label === "Logout") {
                          localStorage.removeItem("user");
                          setUser(null);
                          navigate("/login");
                        } else {
                          navigate(path);
                        }
                      }}
                    >
                      {label}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate("/login")}
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
