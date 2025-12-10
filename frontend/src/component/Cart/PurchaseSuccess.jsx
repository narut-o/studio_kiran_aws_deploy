import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Container,
  Paper,
  Typography
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Link } from "react-router-dom";
import { clearCart } from "../../actions/cartAction";

const PurchaseSuccessPage = () => {

  const [confetti, setConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });

  // stop confetti after 4 seconds
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(clearCart());
  },[dispatch])

  // update size on resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const orderId = "#29894";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(to bottom, #f5f7fb, #ffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      {/* Confetti overlay */}
     

      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            p: { xs: 4, sm: 6 },
            bgcolor: "transparent",
            boxShadow: "none"
          }}
        >
          {/* Green check circle */}
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              mx: "auto",
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#e6f7e9",
              border: "4px solid #4CAF50"
            }}
          >
            <CheckIcon sx={{ fontSize: 46, color: "#4CAF50" }} />
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "1.7rem", sm: "2rem" }
            }}
          >
            Thank you for your purchase
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 420,
              mx: "auto",
              mb: 3,
              lineHeight: 1.6
            }}
          >
            Your order will be delivered within 6-7 business days,
            you can track your order at my orders.
          </Typography>

          {/* Order ID */}
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", mb: 4 }}
          >
            Order <Box component="span" sx={{ fontWeight: 500 }}>
              {orderId}
            </Box>
          </Typography>

          {/* Button */}
          <Button
            variant="contained"
            component={Link}
            to={'/'}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.3,
              textTransform: "none",
              fontWeight: 500,
              bgcolor: "#111827",
              "&:hover": { bgcolor: "#000" }
            }}
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
          >
            Go to Homepage
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PurchaseSuccessPage;
