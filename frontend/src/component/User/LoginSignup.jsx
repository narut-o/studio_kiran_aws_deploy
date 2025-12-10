import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Avatar,
  Stack,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

const LoginSignup = ({ onClose }) => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreveiw] = useState("/Profile.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  // Snackbar state (replaces react-alert)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if (onClose) onClose();
      navigate(redirect);
    }
  }, [error, dispatch, navigate, isAuthenticated, redirect, onClose]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreveiw(reader.result);
          setAvatar(reader.result);
        }
      };
      if (e.target.files && e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleForgotPassword = () => {
    if (onClose) onClose();
    navigate("/password/forgot");
  };

  if (loading) return <Loader />;

  return (
    <>
      <Box
        sx={{
          minHeight: onClose ? "auto" : "100vh",
          bgcolor: onClose ? "transparent" : "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: onClose ? 2 : 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 960,
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
          }}
        >
          {/* LEFT PANEL – Brand / Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: { xs: 3, md: 4 },
              background:
                "radial-gradient(circle at top left, #e0f2fe 0%, #f9fafb 45%, #fee2e2 100%)",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, mb: 1, letterSpacing: 0.3 }}
              >
                Welcome back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", maxWidth: 320 }}
              >
                Sign in to access your orders, track deliveries, and manage your
                profile. Create an account to start exploring our handcrafted
                candle collection.
              </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", letterSpacing: 0.4 }}
              >
              Studio Kiran
              </Typography>
            </Box>
          </Box>

          {/* RIGHT PANEL – Forms */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              bgcolor: "background.paper",
            }}
          >
            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                mb: 3,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: 14,
                  minWidth: 0,
                  mr: 2,
                },
              }}
            >
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </Tabs>

            {/* LOGIN FORM */}
            {activeTab === "login" && (
              <Box
                component="form"
                onSubmit={loginSubmit}
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  required
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleForgotPassword}
                    sx={{
                      p: 0,
                      minWidth: "auto",
                      textTransform: "none",
                      fontSize: 13,
                      color: "primary.main",
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    borderRadius: 999,
                    textTransform: "none",
                    py: 1.2,
                    fontWeight: 500,
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  Login
                </Button>
              </Box>
            )}

            {/* REGISTER FORM */}
            {activeTab === "register" && (
              <Box
                component="form"
                onSubmit={registerSubmit}
                encType="multipart/form-data"
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  required
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={registerDataChangeHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaceIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  type="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={registerDataChangeHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={registerDataChangeHandler}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Avatar
                    src={avatarPreview}
                    alt="Avatar Preview"
                    sx={{ width: 56, height: 56 }}
                  />
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      textTransform: "none",
                      borderRadius: 999,
                      fontSize: 13,
                    }}
                  >
                    Upload Avatar
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      hidden
                      onChange={registerDataChangeHandler}
                    />
                  </Button>
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    py: 1.2,
                    fontWeight: 500,
                    bgcolor: "#111827",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  Register
                </Button>
              </Box>
            )}

            {!onClose && (
              <Typography
                variant="body2"
                sx={{ mt: 3, fontSize: 13, color: "text.secondary" }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  ← Back to home
                </Link>
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Snackbar (global for this component) */}
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

export default LoginSignup;