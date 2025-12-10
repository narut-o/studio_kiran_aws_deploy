// // CartItemsCard.jsx
import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { addToCart, removeItemsFromCart } from "../../actions/cartAction";

const CartItemsCard = ({ item }) => {
  const dispatch = useDispatch();

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Image */}
      <Grid item xs={3} sm={2.5}>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#f3f4f6",
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>

      {/* Name + quantity */}
      <Grid item xs={6} sm={6}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1,
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {item.name}
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            border: "1px solid #e5e7eb",
            bgcolor: "#f9fafb",
            px: 1.5,
            py: 0.4,
            gap: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={() => decreaseQty(item.product, item.quantity)}
            sx={{
              width: 26,
              height: 26,
              borderRadius: "999px",
              "&:hover": { bgcolor: "#e5e7eb" },
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>–</Typography>
          </IconButton>

          <Typography
            sx={{
              minWidth: 24,
              textAlign: "center",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {item.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={() =>
              increaseQty(item.product, item.quantity, item.stock)
            }
            sx={{
              width: 26,
              height: 26,
              borderRadius: "999px",
              bgcolor: "#111827",
              color: "#ffffff",
              "&:hover": { bgcolor: "#000000" },
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 500 }}>+</Typography>
          </IconButton>
        </Box>
      </Grid>

      {/* Price + remove */}
      <Grid item xs={3} sm={3.5}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-end", sm: "flex-end" },
            gap: 0.5,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            ₹ {item.price * item.quantity}
          </Typography>

          <Button
            size="small"
            onClick={() => removeCartItemHandler(item.product)}
            startIcon={<DeleteIcon sx={{ fontSize: 18 }} />}
            sx={{
              color: "text.secondary",
              textTransform: "none",
              fontSize: 12,
              px: 0,
              minWidth: "auto",
              "&:hover": {
                bgcolor: "transparent",
                color: "#ef4444",
              },
            }}
          >
            Remove
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartItemsCard;
