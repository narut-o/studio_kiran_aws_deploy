// src/components/Auth/AuthCard.jsx
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
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";


const AuthCard = ({ onSuccess }) => {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
const [showLoginPassword, setShowLoginPassword] = useState(false);
const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreveiw] = useState("/Profile.png");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      // Close popup if parent passed onSuccess
      if (onSuccess) onSuccess();
      navigate(redirect);
    }
  }, [error, dispatch, alert, navigate, isAuthenticated, redirect, onSuccess]);

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

  if (loading) return <Loader />;

  return (
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
      {/* LEFT PANEL */}
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

      {/* RIGHT PANEL – FORMS */}
      <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: "background.paper" }}>
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

        {/* LOGIN */}
        {activeTab === "login" && (
          <Box
            component="form"
            onSubmit={loginSubmit}
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
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
  type={showLoginPassword ? "text" : "password"}
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
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowLoginPassword(!showLoginPassword)}
          edge="end"
        >
          {showLoginPassword ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
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
              <Typography
                component={Link}
                to="/password/forgot"
                sx={{
                  fontSize: 13,
                  textDecoration: "none",
                  color: "primary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: 999,
                textTransform: "none",
                py: 1.2,
                fontWeight: 500,
                bgcolor: "#111827",
                "&:hover": { bgcolor: "#000" },
              }}
              fullWidth
            >
              Login
            </Button>
          </Box>
        )}

        {/* REGISTER */}
        {activeTab === "register" && (
          <Box
            component="form"
            onSubmit={registerSubmit}
            encType="multipart/form-data"
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
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
  type={showRegisterPassword ? "text" : "password"}
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
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
          edge="end"
        >
          {showRegisterPassword ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
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
              sx={{
                borderRadius: 999,
                textTransform: "none",
                py: 1.2,
                fontWeight: 500,
                bgcolor: "#111827",
                "&:hover": { bgcolor: "#000" },
              }}
              fullWidth
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AuthCard;