import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import TableBarIcon from "@mui/icons-material/TableBar";
import Avvvatars from "avvvatars-react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../features/Auth/AuthSlice";
import StoreIcon from "@mui/icons-material/Store";
import { logoutUser } from "../../features/Auth/AuthActions";
import { fetchOrders } from "../../features/Order/OrderActions";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { fetchProducts } from "../../features/Product/ProductAction";
import SettingsModal from "../Settings/SettingsModal";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../../store";
import { AppstoreOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd/lib";
// import { IconButton } from '@mui/material';
const pages = ["Tables", "Store", "Orders", "Restaurant", "Kitchen", "Bar"];
const settings = ["Dashboard", "Profile", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth);
  // const user = JSON.parse(localStorage.getItem("user") || "null");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/tables");
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleTabClick = (page: string) => {
    // if (page === "Restaurant") navigate("/tables");
    // else if (page === "Bar") navigate("/bar");
    // else
    //  if (page === "Staff") navigate("/staff");
    // else if (page === "Kitchen") navigate("/kitchen");
    if (page === "Tables") navigate("/tables");
    else if (page === "Store") {
      navigate("/store");
      dispatch(fetchProducts());
    } else if (page === "Orders") {
      navigate("/Orders");
      dispatch(fetchOrders());
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="100px" sx={{ bgcolor: "#914F1E" }}>
        <Toolbar disableGutters>
          <img
            src="/android-chrome-192x192.png"
            alt="logo"
            height={70}
            width={120}
          />

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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page === "Restaurant" ? (
                    <Typography
                      textAlign="center"
                      fontSize="inherit"
                      onClick={() => navigate("/restaurant")}
                    >
                      Restaurant
                    </Typography>
                  ) : //  page === "Bar" ? (
                  //   <Typography
                  //     textAlign="center"
                  //     fontSize="inherit"
                  //     onClick={() => navigate("/bar")}
                  //   >
                  //     Bar
                  //   </Typography>
                  // )
                  //  :
                  // page === "Staff" ? (
                  //   <Typography
                  //     textAlign="center"
                  //     fontSize="inherit"
                  //     onClick={() => navigate("/staff")}
                  //   >
                  //     Staff
                  //   </Typography>
                  // ) :
                  //  page === "Kitchen" ? (
                  //   <Typography
                  //     textAlign="center"
                  //     fontSize="inherit"
                  //     onClick={() => navigate("/kitchen")}
                  //   >
                  //     Kitchen
                  //   </Typography>
                  // ) :
                  page === "Tables" ? (
                    <Typography
                      textAlign="center"
                      fontSize="inherit"
                      onClick={() => navigate("/tables")}
                    >
                      Tables
                    </Typography>
                  ) : page === "Store" ? (
                    <Typography
                      textAlign="center"
                      fontSize="inherit"
                      onClick={() => navigate("/store")}
                    >
                      Services
                    </Typography>
                  ) : page === "Orders" ? (
                    <Typography
                      textAlign="center"
                      fontSize="inherit"
                      onClick={() => navigate("/Orders")}
                    >
                      Orders
                    </Typography>
                  ) : (
                    ""
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", alignItems: "flex-end" },
            }}
          >
            <Tabs
              value={false}
              variant="scrollable"
              textColor="inherit"
              scrollButtons="auto"
            >
              {pages.map((page) => (
                <Tab
                  key={page}
                  label={
                    <>
                      {page === "Tables" && user ? (
                        <>
                          <TableBarIcon style={{ fontSize: "16px" }} />
                          <Typography fontSize="inherit">Tables</Typography>
                        </>
                      ) : page === "Store" &&
                        user?.role === "admin" ? (
                        <>
                          <StoreIcon style={{ fontSize: "16px" }} />
                          <Typography fontSize="inherit">Store</Typography>
                        </>
                      ) : page === "Orders" &&
                        user?.role === "admin" ? (
                        <>
                          <FilterFramesIcon style={{ fontSize: "16px" }} />
                          <Typography fontSize="inherit">Orders</Typography>
                        </>
                      ) : null}
                    </>
                  }
                  onClick={() => handleTabClick(page)}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting === "Dashboard" &&
                  user?.role === "admin" ? (
                    <Typography textAlign="center">Dashboard</Typography>
                  ) : setting === "Profile" ? (
                    <Typography textAlign="center">Profile</Typography>
                  ) : (
                    ""
                  )}
                </MenuItem>
              ))}
            </Menu>
            {user?.role === "admin" && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                style={{ color: "white" }}
                onClick={handleSidebarOpen}
              >
                <Tooltip title="Open Settings">
                  <AppstoreOutlined />
                </Tooltip>
              </IconButton>
            )}
          </Box>
          {user && (
            <Tooltip title={user?.name}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar icon={<UserOutlined />} />
              </IconButton>
            </Tooltip>
          )}
          {/* logout icon */}
          {user && (
            <Tooltip title="Logout">
              <LogoutOutlined
                onClick={handleLogout}
                style={{ fontSize: "26px" }}
              />
            </Tooltip>
          )}
        </Toolbar>
      </Container>
      <SettingsModal
        sidebarOpen={sidebarOpen}
        handleSidebarClose={handleSidebarClose}
      />
    </AppBar>
  );
}
export default Navbar;
