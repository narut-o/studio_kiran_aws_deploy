import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Stack,
  Divider,
  Grid,
  Fade,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { logout } from "../../actions/userAction";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogout = () => {
    dispatch(logout());
    setSnackbar({
      open: true,
      message: "Logged Out",
      severity: "success",
    });
    navigate("/");
  };

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <MetaData title="My Profile" />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {/* HEADER BANNER */}
          <Fade in timeout={600}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                mb: 4,
                boxShadow: "0 18px 45px rgba(0,0,0,0.16)",
                backgroundImage: isDark
                  ? "linear-gradient(135deg, #020617 0%, #111827 40%, #4b5563 100%)"
                  : "linear-gradient(135deg, #e0f2fe 0%, #f9fafb 40%, #fee2e2 100%)",
                minHeight: 190,
              }}
            >
              {/* Banner content */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: { xs: 3, md: 5 },
                  py: { xs: 3, md: 4 },
                  gap: 3,
                }}
              >
                <Avatar
                  src={user?.avatar?.url}
                  alt={user?.name}
                  sx={{
                    width: 96,
                    height: 96,
                    border: "3px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                  }}
                />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#f9fafb" : "#0f172a",
                      mb: 0.5,
                    }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark
                        ? "rgba(248,250,252,0.7)"
                        : "text.secondary",
                      mb: 1.5,
                    }}
                  >
                    {/* You can put a subtitle here if you want */}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      component={Link}
                      to="/profile/update"
                      size="small"
                      sx={{
                        borderRadius: 1.2,
                        textTransform: "none",
                        px: 2.5,
                        py: 0.5,
                        fontSize: 13,
                        bgcolor: isDark ? "#f9fafb" : "#111827",
                        color: isDark ? "#020617" : "#f9fafb",
                        "&:hover": {
                          bgcolor: isDark ? "#e5e7eb" : "#000",
                        },
                      }}
                    >
                      Edit Profile
                    </Button>

                    {user?.role === "admin" && (
                      <Button
                        component={Link}
                        to="/dashboard"
                        size="small"
                        variant="outlined"
                        sx={{
                          borderRadius: 1,
                          textTransform: "none",
                          px: 2.3,
                          py: 0.5,
                          fontSize: 13,
                          borderColor: isDark
                            ? "rgba(248,250,252,0.4)"
                            : "rgba(15,23,42,0.3)",
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Dashboard
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* MAIN GRID: Left (quick actions) + Right (details/settings) */}
          <Grid container spacing={3}>
            {/* LEFT COLUMN – QUICK ACTIONS */}
            <Grid item xs={12} md={4}>
              <Fade in timeout={700}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid rgba(148,163,184,0.35)",
                    bgcolor: "background.paper",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Quick Actions
                  </Typography>

                  <Stack spacing={1.5}>
                    <Button
                      component={Link}
                      to="/orders"
                      fullWidth
                      variant="outlined"
                      sx={{
                        justifyContent: "flex-start",
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: 14,
                        px: 2.5,
                      }}
                    >
                      My Orders
                    </Button>

                    <Button
                      component={Link}
                      to="/password/update"
                      fullWidth
                      variant="outlined"
                      sx={{
                        justifyContent: "flex-start",
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: 14,
                        px: 2.5,
                      }}
                    >
                      Change Password
                    </Button>

                    <Button
                      onClick={handleLogout}
                      fullWidth
                      sx={{
                        justifyContent: "flex-start",
                        borderRadius: 1,
                        textTransform: "none",
                        fontSize: 14,
                        px: 2.5,
                        color: "error.main",
                        "&:hover": {
                          bgcolor: "rgba(220,38,38,0.06)",
                        },
                      }}
                    >
                      Log Out
                    </Button>
                  </Stack>
                </Paper>
              </Fade>
            </Grid>

            {/* RIGHT COLUMN – DETAILS + SETTINGS */}
            <Grid item xs={12} md={8}>
              <Fade in timeout={800}>
                <Stack spacing={3}>
                  {/* Account details card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid rgba(148,163,184,0.35)",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      Account Information
                    </Typography>

                    <Stack spacing={2.5}>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            textTransform: "uppercase",
                            color: "text.secondary",
                          }}
                        >
                          Full Name
                        </Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                          {user?.name}
                        </Typography>
                      </Box>

                      <Divider />

                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            textTransform: "uppercase",
                            color: "text.secondary",
                          }}
                        >
                          Email
                        </Typography>
                        <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
                          {user?.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  {/* Settings style section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      border: "1px solid rgba(148,163,184,0.35)",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 2 }}
                    >
                      Preferences & Settings
                    </Typography>

                    <Stack spacing={2.5}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                            Order updates
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Receive email updates about your orders and shipping.
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderRadius: 999,
                            fontSize: 12,
                          }}
                        >
                          Manage
                        </Button>
                      </Box>

                      <Divider />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "spaceBetween",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                            Addresses
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Add or edit your saved delivery addresses.
                          </Typography>
                        </Box>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            borderRadius: 999,
                            fontSize: 12,
                          }}
                          component={Link}
                          to="/shipping"
                        >
                          Edit
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>
                </Stack>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Snackbar for logout message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
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

export default Profile;