// src/components/layout/Header.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Badge,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../../images/logo.png";                  // adjust if needed
import Search from "../../Product/Search";                   // adjust path
import UserOptions from "./UserOptions"    // your dropdown
import AuthDialog from "../../User/AuthDialog";            // popup auth (login/signup)

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart || { cartItems: [] });
  const { isAuthenticated, user } = useSelector(
    (state) => state.user || { isAuthenticated: false, user: null }
  );

  const cartCount =
    cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "text.primary",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1180,
            width: "100%",
            mx: "auto",
            px: { xs: 2, md: 0 },
            minHeight: 64,
          }}
        >
          {/* LEFT: LOGO */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              mr: { xs: 1, md: 2 },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Studio Kiran"
              sx={{ width: 32, height: 32, borderRadius: "50%", mr: 1 }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, letterSpacing: 0.4 }}
            >
              Studio Kiran
            </Typography>
          </Box>

          {/* CENTER: NAV + SEARCH (DESKTOP ONLY) */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                ml: 4,
              }}
            >
              {/* Nav links */}
              <Stack direction="row" spacing={3} sx={{ mr: 4 }}>
                {navLinks.map((link) => (
                  <Typography
                    key={link.to}
                    component={Link}
                    to={link.to}
                    sx={{
                      textDecoration: "none",
                      fontSize: 14,
                      color: "text.secondary",
                      letterSpacing: 0.12,
                      textTransform: "uppercase",
                      "&:hover": { color: "text.primary" },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>

              {/* Search bar */}
              <Box sx={{ flexGrow: 1, maxWidth: 420 }}>
                <Search />
              </Box>
            </Box>
          )}

          {/* RIGHT: CART + USER + MENU */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ ml: "auto" }}
          >
            {/* Cart icon */}
            <IconButton
              component={Link}
              to="/cart"
              size="small"
              sx={{ color: "text.primary" }}
            >
              <Badge badgeContent={cartCount} color="primary" overlap="circular">
                <ShoppingBagOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>

            {/* Desktop: UserOptions or Sign In */}
            {!isMobile && (
              <>
                {isAuthenticated && user ? (
                  <UserOptions user={user} />
                ) : (
                  <Button
                    onClick={() => setAuthOpen(true)}
                    startIcon={<PersonOutlineIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      textTransform: "none",
                      fontSize: 13,
                      borderRadius: 999,
                      px: 2,
                      color: "text.primary",
                    }}
                  >
                    Sign in
                  </Button>
                )}
              </>
            )}

            {/* Mobile: hamburger menu */}
            {isMobile && (
              <IconButton edge="end" onClick={toggleDrawer(true)} sx={{ ml: 1 }}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 260,
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Studio Kiran"
              sx={{ width: 30, height: 30, borderRadius: "50%", mr: 1 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
             Studio Kiran
            </Typography>
          </Box>

          {/* Search inside drawer */}
          <Box sx={{ my: 1.5 }}>
            <Search />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Nav links */}
          <List sx={{ flexGrow: 1 }}>
            {navLinks.map((link) => (
              <ListItemButton key={link.to} component={Link} to={link.to}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: 0.12,
                  }}
                />
              </ListItemButton>
            ))}

            {/* Account row (mobile) */}
            <ListItemButton
              onClick={() => {
                if (!isAuthenticated) {
                  setAuthOpen(true);
                }
              }}
              component={isAuthenticated ? Link : "button"}
              to={isAuthenticated ? "/account" : undefined}
            >
              <PersonOutlineIcon
                sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
              />
              <ListItemText
                primary={
                  isAuthenticated && user
                    ? `Hi, ${user.name.split(" ")[0]}`
                    : "Sign in"
                }
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>

            {/* Cart link */}
            <ListItemButton component={Link} to="/cart">
              <ShoppingBagOutlinedIcon
                sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
              />
              <ListItemText
                primary={`Cart (${cartCount})`}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          </List>

          {/* Footer */}
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: "auto" }}
          >
            © {new Date().getFullYear()} Studio Kiran
          </Typography>
        </Box>
      </Drawer>

      {/* AUTH POPUP (LOGIN / SIGNUP) */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Header;