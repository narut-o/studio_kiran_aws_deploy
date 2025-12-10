
import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItemsCard from "./CartItemsCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  let subTotalPrice = 0;
  cartItems.forEach((item) => {
    subTotalPrice += item.price * item.quantity;
  });

  const discount = Math.floor(subTotalPrice * 0.2);
  const tax = Math.floor((subTotalPrice - discount) * 0.18);
  const total = subTotalPrice - discount + tax;

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          background:
            "radial-gradient(circle at top, #f5f7ff 0, #f3f4f6 45%, #e5e7eb 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
          px: 2,
        }}
      >
        <RemoveShoppingCartIcon
          sx={{ fontSize: 64, color: "text.secondary" }}
        />
        <Typography variant="h6" color="text.primary">
          Your cart is empty
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse our collection and add something you love.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          sx={{
            mt: 1,
            textTransform: "none",
            borderRadius: 999,
            px: 4,
            py: 1.2,
          }}
        >
          Continue shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #f5f7ff 0, #f3f4f6 40%, #e5e7eb 100%)",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* LEFT – cart items */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 4,
                p: { xs: 2.5, md: 3 },
                backdropFilter: "blur(10px)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                >
                  Cart
                </Typography>
                <Chip
                  label={`${cartItems.length} item${
                    cartItems.length > 1 ? "s" : ""
                  }`}
                  size="small"
                  sx={{
                    bgcolor: "#eef2ff",
                    color: "#4338ca",
                    fontWeight: 500,
                  }}
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cartItems.map((item) => (
                  <Paper
                    key={item.product}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      p: { xs: 1.5, sm: 2 },
                      bgcolor: "#ffffff",
                      border: "1px solid #f3f4f6",
                    }}
                  >
                    <CartItemsCard item={item} />
                  </Paper>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT – summary */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 4,
                p: 3,
                position: { md: "sticky", xs: "static" },
                top: { md: 32 },
              }}
            >
              {/* Promo input */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 2,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Promo code"
                  InputProps={{
                    startAdornment: (
                      <LocalOfferOutlinedIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: 999,
                    px: 3,
                  }}
                >
                  Apply
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Subtotal / discount / etc */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1.5,
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  Subtotal
                </Typography>
                <Typography variant="subtitle1">₹ {subTotalPrice}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Discount
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#16a34a" }}>
                  - ₹ {discount}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Delivery
                </Typography>
                <Typography variant="subtitle2">₹ 0</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Tax
                </Typography>
                <Typography variant="subtitle2">₹ {tax}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Total */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  mb: 2.5,
                }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  ₹ {total}
                </Typography>
              </Box>

              {/* Buttons */}
              <Button
                fullWidth
                variant="contained"
                onClick={checkoutHandler}
                sx={{
                  mb: 1.5,
                  textTransform: "none",
                  borderRadius: 999,
                  py: 1.2,
                  fontWeight: 500,
                  fontSize: 15,
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow:
                    "0 12px 25px rgba(37, 99, 235, 0.28), 0 2px 4px rgba(15, 23, 42, 0.15)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #1d4ed8 100%)",
                    boxShadow:
                      "0 10px 20px rgba(37, 99, 235, 0.22), 0 2px 4px rgba(15, 23, 42, 0.18)",
                  },
                }}
              >
                Proceed to checkout
              </Button>

              <Button
                fullWidth
                variant="text"
                component={Link}
                to="/products"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  py: 1,
                  fontWeight: 500,
                  bgcolor: "#f9fafb",
                  "&:hover": {
                    bgcolor: "#eef2ff",
                  },
                }}
              >
                Continue shopping
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
