// src/components/Home/Home.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import SaleBanner from "../Banner/SaleBanner/SaleBanner";
import { getAllProducts, clearErrors } from "../../actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

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
    dispatch(getAllProducts());
  }, [dispatch, error]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const featured = Array.isArray(products) ? products.slice(0, 3) : [];
  const moreProducts = Array.isArray(products) ? products.slice(3, 6) : [];

  return (
    <>
      <MetaData title="Studio Kiran" />
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            bgcolor: "#fdfdfdff",
            minHeight: "100vh",
            py: { xs: 3, md: 5 },
          }}
        >
          <Container maxWidth="100%">
            {/* WHITE PAGE WRAPPER */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#ffffff",
                borderRadius: "8px",
                px: { xs: 2, md: 5 },
                py: { xs: 3, md: 6 },
                boxShadow: "0 18px 40px rgba(0,0,0,0.06)",
              }}
            >
              {/* HERO SECTION (nav + big hero) */}
              <SaleBanner />

              {/* WHY CHOOSE US */}
              <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Why Choose Us
                </Typography>
                <Divider sx={{ mb: 3, maxWidth: 120 }} />

                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src="https://res.cloudinary.com/dlozyi9yd/image/upload/v1765036777/soap-making-home-flat-lay_rciotl.jpg"
                      alt="Why choose us"
                      sx={{
                        width: "100%",
                        borderRadius: "16px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          Minimalist Elegance
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Clean lines, neutral tones and simple jars that
                          blend into any interior.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          Quality Craftsmanship
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Hand-poured soy wax and carefully selected
                          fragrance oils for a smooth burn.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          Versatile Scents
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          From fresh florals to warm woods, find the
                          perfect candle for every room.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>

              {/* CRAFTING SECTION */}
              <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Crafting Simplicity,
                  <br />
                  Defining Elegance
                </Typography>
                <Divider sx={{ mb: 4, maxWidth: 150 }} />

                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      1. Our Mission
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 4 }}
                    >
                      At Studio we believe that simplicity is
                      the new luxury. Each candle is carefully designed to
                      bring a calm, refined atmosphere into your home.
                    </Typography>

                    <Box
                      component="img"
                      src="https://res.cloudinary.com/dlozyi9yd/image/upload/v1765037602/2149239354_rctxzf.jpg"
                      alt="mission"
                      sx={{
                        width: "100%",
                        borderRadius: "16px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      2. Craftsmanship Difference
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 4 }}
                    >
                      Every candle is hand-poured in small batches with
                      precise temperatures, clean-burning wicks and
                      thoughtfully layered scents to ensure a soft,
                      consistent glow.
                    </Typography>

                    <Box
                      component="img"
                      src="https://res.cloudinary.com/dlozyi9yd/image/upload/v1765037741/4950206_sfbhhc.jpg"
                      alt="craft"
                      sx={{
                        width: "100%",
                        borderRadius: "16px",
                        objectFit: "cover",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* EXPLORE OUR PRODUCTS */}
              <Box sx={{ mt: 8 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Explore Our Products
                </Typography>
                <Divider sx={{ mb: 4, maxWidth: 170 }} />

                {/* first row */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  {featured.map((p) => (
                    <Grid item xs={12} md={4} key={p._id}>
                      <ProductCard product={p} />
                    </Grid>
                  ))}
                </Grid>

                {/* second row */}
                <Grid container spacing={3}>
                  {moreProducts.map((p) => (
                    <Grid item xs={12} md={4} key={p._id}>
                      <ProductCard product={p} />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />
            </Paper>
          </Container>
        </Box>
      )}

      {/* Snackbar for error messages */}
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

export default Home;