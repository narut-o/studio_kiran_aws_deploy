// src/components/Product/NoProducts.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Link } from "react-router-dom";

const NoProducts = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: "rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 46, color: "rgba(0,0,0,0.4)" }} />
      </Box>

      {/* Heading */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        No Products Found
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          color: "text.secondary",
          maxWidth: 360,
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        We couldn't find anything matching your search.  
        Try adjusting your filters or explore our full collection.
      </Typography>

      {/* CTA Button */}
      <Button
        variant="contained"
        component={Link}
        to="/products"
        sx={{
          mt: 1,
          borderRadius: 999,
          px: 4,
          py: 1.2,
          textTransform: "none",
          fontSize: 14,
          bgcolor: "#111827",
          "&:hover": { bgcolor: "#000" },
        }}
      >
        Browse All Products
      </Button>
    </Box>
  );
};

export default NoProducts;