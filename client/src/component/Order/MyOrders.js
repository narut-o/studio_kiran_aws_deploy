import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Grid,
  Divider,
  Button,
  IconButton,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { clearErrors, myOrders } from "../../actions/orderAction";

const formatDateTime = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  // Snackbar state (replaces react-alert)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh", py: 4 }}>
          <Container maxWidth="lg">
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              My Orders
            </Typography>

            {orders && orders.length === 0 && (
              <Typography color="text.secondary">
                You have no orders yet.
              </Typography>
            )}

            {orders &&
              orders.map((order) => {
                const itemCount = order.orderItems?.length || 0;
                const shipping = order.shippingInfo || {};
                const status = order.orderStatus || "";

                const statusColor =
                  status.toLowerCase().includes("processing") ||
                  status.toLowerCase().includes("on the way")
                    ? "#f97316" // orange
                    : status.toLowerCase().includes("delivered") ||
                      status.toLowerCase().includes("shipped")
                    ? "#16a34a" // green
                    : "#6b7280"; // gray

                return (
                  <Paper
                    key={order._id}
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                      bgcolor: "#ffffff",
                    }}
                  >
                    {/* HEADER ROW */}
                    <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            Order #: {order._id}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            {itemCount} Products |{" "}
                            {formatDateTime(order.createdAt)}
                          </Typography>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon />}
                            sx={{
                              borderRadius: "999px",
                              textTransform: "none",
                              fontSize: 12,
                              px: 2,
                            }}
                          >
                            Download invoice
                          </Button>
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </Box>

                    <Divider />

                    {/* STATUS + ADDRESS BLOCK */}
                    <Box sx={{ px: 3, py: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body2"
                              sx={{ minWidth: 80, color: "text.secondary" }}
                            >
                              Status:
                            </Typography>
                            <Chip
                              label={status || "—"}
                              size="small"
                              sx={{
                                bgcolor: "rgba(22,163,74,0.08)",
                                color: statusColor,
                                fontWeight: 500,
                              }}
                            />
                          </Stack>

                          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ minWidth: 80, color: "text.secondary" }}
                            >
                              Total:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              ₹ {order.totalPrice?.toFixed(2)}
                            </Typography>
                          </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          {status === "Delivered" ? (
                            <Stack direction="row" spacing={2}>
                              <Typography
                                variant="body2"
                                sx={{
                                  minWidth: 80,
                                  color: "text.secondary",
                                }}
                              >
                                Delivered to:
                              </Typography>
                              <Typography variant="body2">
                                {shipping.address && `${shipping.address}, `}
                                {shipping.city}
                                {shipping.state && `, ${shipping.state}`}
                                {shipping.pinCode && `, ${shipping.pinCode}`}
                              </Typography>
                            </Stack>
                          ) : (
                            ""
                          )}
                        </Grid>
                      </Grid>
                    </Box>

                    <Divider />

                    {/* ITEMS GRID */}
                    <Box sx={{ px: 3, py: 2.5 }}>
                      <Grid container spacing={2}>
                        {order.orderItems?.map((item) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            key={item._id || `${order._id}-${item.product}`}
                          >
                            <Box
                              component={Link}
                              to={`/order/${order._id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                  bgcolor: "#f9fafb",
                                  borderRadius: 2,
                                  p: 1.5,
                                  alignItems: "flex-start",
                                  height: "100%",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 2,
                                    objectFit: "cover",
                                    flexShrink: 0,
                                  }}
                                />

                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, mb: 0.5 }}
                                  >
                                    {item.name}
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      color: "text.secondary",
                                    }}
                                  >
                                    Quantity: {item.quantity} × ₹ {item.price}
                                  </Typography>

                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      color: "text.secondary",
                                    }}
                                  >
                                    Subtotal: ₹ {item.quantity * item.price}
                                  </Typography>
                                </Box>
                              </Stack>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Paper>
                );
              })}
          </Container>
        </Box>
      )}

      {/* Snackbar for errors */}
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

export default MyOrders;