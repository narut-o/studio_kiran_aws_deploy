import React from "react";
import { Menu, MenuItem, Button, Snackbar, Alert } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Snackbar state
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    handleClose();
    navigate("/dashboard");
  };

  const handleOrders = () => {
    handleClose();
    navigate("/orders");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/account");
  };

  const handleLogout = () => {
    dispatch(logout());

    setSnackbar({
      open: true,
      message: "Logged Out",
      severity: "success",
    });

    handleClose();
  };

  return (
    <>
      <div className="option-btn">
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ color: "black" }}
        >
          Hi, {user.name}
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {user?.role === "admin" && (
            <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
          )}

          <MenuItem onClick={handleOrders}>
            <InventoryIcon style={{ paddingRight: "10px" }} />
            Orders
          </MenuItem>

          <MenuItem onClick={handleProfile}>
            <PersonIcon style={{ paddingRight: "10px" }} />
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon style={{ paddingRight: "10px" }} />
            Logout
          </MenuItem>
        </Menu>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserOptions;