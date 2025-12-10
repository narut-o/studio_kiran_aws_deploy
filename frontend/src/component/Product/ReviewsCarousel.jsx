// src/components/Review/ReviewsCarousel.jsx
import React, { useRef } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReviewCard from "./ReviewCard";

const ReviewsCarousel = ({ reviews }) => {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
        No reviews yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* Header row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          
        </Typography>

        {reviews.length > 1 && (
          <Box>
            <IconButton
              size="small"
              onClick={() => scrollByAmount(-350)}
              sx={{ mr: 1 }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => scrollByAmount(350)}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Horizontal scroll container */}
      <Box
        ref={scrollRef}
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "stretch",
            justifyContent: "flex-start",
          }}
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review._id || `${review.name}-${review.comment}`}
              review={review}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default ReviewsCarousel;