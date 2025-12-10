import React from "react";
import { Box, Stack, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png"; // adjust path if needed

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { label: "Products", to: "/products" },
    { label: "Blog", to: "/blog" },
    { label: "Shop", to: "/products" },
    { label: "Contacts", to: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        mt: 8,
        borderTop: "6px solid #fce9d9",
        bgcolor: "#f7f7f7",
        py: { xs: 3, md: 4 },
        px: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          gap: { xs: 2.5, md: 0 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* LEFT: NAV LINKS */}
        <Stack
          direction="row"
          spacing={3}
          flexWrap="wrap"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1.2,
            fontSize: 13,
          }}
        >
          {links.map((link) => (
            <MuiLink
              key={link.label}
              component={Link}
              to={link.to}
              underline="none"
              sx={{
                color: "#555",
                "&:hover": { color: "#000" },
              }}
            >
              {link.label}
            </MuiLink>
          ))}
        </Stack>

        {/* CENTER: LOGO */}
        <Box
          component="img"
          src={logo}
          alt="Studio Kiran"
          sx={{
            width: { xs: 32, md: 36 },
            height: "auto",
            opacity: 0.7,
            my: { xs: 0.5, md: 0 },
          }}
        />

        {/* RIGHT: COPYRIGHT */}
        <Typography
          sx={{
            fontSize: 13,
            color: "#666",
            whiteSpace: { xs: "normal", md: "nowrap" },
            textAlign: { xs: "center", md: "right" },
          }}
        >
          © {year} Studio kiran . All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;