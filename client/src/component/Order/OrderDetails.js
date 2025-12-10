import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Chip,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { error, order } = useSelector((state) => state.orderDetails);

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
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box sx={{ maxWidth: 1100, mx: "auto", py: 4, px: 2 }}>
        {/* Order Title */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 3, letterSpacing: 0.3 }}
        >
          Order #{order?._id?.slice(-6)}
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT SECTION — Order Items */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Items in this Order
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {order?.orderItems?.map((item, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ py: 2 }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 2,
                        objectFit: "cover",
                      }}
                    />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 500 }}>
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Qty: {item.quantity}
                      </Typography>

                      <Chip
                        size="small"
                        label={order?.paymentInfo?.status}
                        sx={{
                          mt: 1,
                          bgcolor:
                            order?.paymentInfo?.status === "PAID"
                              ? "rgba(0,150,0,0.1)"
                              : "rgba(200,0,0,0.1)",
                          color:
                            order?.paymentInfo?.status === "PAID"
                              ? "green"
                              : "red",
                          fontWeight: 500,
                        }}
                      />
                    </Box>

                    <Typography sx={{ fontWeight: 600 }}>
                      ₹ {item.price}
                    </Typography>
                  </Stack>

                  {index < order.orderItems.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* RIGHT SECTION — Delivery Info */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Delivery Details
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                {order?.user?.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                {order?.shippingInfo?.address}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {order?.shippingInfo?.city}, {order?.shippingInfo?.state}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 2, mb: 0.5 }}
              >
                Phone:
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>
                {order?.shippingInfo?.phoneNo}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Order Status
              </Typography>

              <Chip
                label={order?.orderStatus}
                sx={{
                  mt: 1.5,
                  bgcolor:
                    order?.orderStatus === "Delivered"
                      ? "rgba(0,150,0,0.1)"
                      : "rgba(255,165,0,0.15)",
                  color:
                    order?.orderStatus === "Delivered"
                      ? "green"
                      : "rgb(200,150,0)",
                  fontWeight: 500,
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

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

export default OrderDetails;