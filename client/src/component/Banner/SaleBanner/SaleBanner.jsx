// src/components/Banner/SaleBanner/SaleBanner.jsx
import { Box, Typography, Button, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";

const SaleBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: { xs: 0, md: "14px" },
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <Grid
        container
        sx={{
          // On mobile stack, on desktop side-by-side
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT TEXT SECTION */}
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "center",
            pl: { xs: 2.5, md: 4 },
            pr: { xs: 2.5, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Stack spacing={3} sx={{ maxWidth: 480 }}>
            {/* Logo */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, fontFamily: "sans-serif" }}
              >
                Studio Kiran
              </Typography>
            </Stack>

            {/* Big heading */}
            <Typography
              sx={{
                fontWeight: 700,
                lineHeight: 1.05,
                fontFamily: "sans-serif",
                // responsive font sizes
                fontSize: {
                  xs: "2.6rem",
                  sm: "3.2rem",
                  md: "4.2rem",
                },
              }}
            >
              Experience
              <br />
              Freshness
              <br />
              Like Never
              <br />
              Before
            </Typography>

            {/* Paragraph */}
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 380,
                fontSize: { xs: 14, md: 15 },
              }}
            >
              Handmade soy candles designed to elevate your ambience. Pure.
              Minimal. Premium.
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              component={Link}
              to="/products"
              sx={{
                width: "fit-content",
                borderRadius: 0,
                textTransform: "none",
                px: 5,
                py: 1.7,
                mt: 1,
                bgcolor: "#111111",
                fontSize: 15,
                "&:hover": { bgcolor: "#333" },
              }}
            >
              Explore Collection
            </Button>
          </Stack>
        </Grid>

        {/* RIGHT IMAGE SECTION */}
        <Grid item xs={12} md={7}>
          <Box
            component="img"
            src="https://res.cloudinary.com/dlozyi9yd/image/upload/v1765036779/young-woman-preparing-her-bath-time_ikyiog.jpg"
            alt="hero"
            sx={{
              width: "100%",
              height: { xs: 260, sm: 320, md: "100%" },
              objectFit: "cover",
              display: "block",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SaleBanner;