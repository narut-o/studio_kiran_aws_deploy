// import React from 'react'
// import ReactStars from 'react-rating-stars-component';
// import Profile from "../../images/Profile.png";

// const ReviewCard = ({review}) => {
//     const options={
//         edit:false,
//         color:"rgba(20,20,20,0.1)",
//         activeColor:"tomato",
//         value:review.rating,
//         isHalf:true,
//         size:window.innerWidth<600 ?20:25
      
//       }
//   return (
//     <div className='reviewCard' >
//     <img src={Profile} alt='User' />
//     <p>{review.name}</p>
//     <ReactStars {...options} />
//     <span>{review.comment}</span>
//     </div>
//   )
// }

// export default ReviewCard
import React from "react";
import { Box, Typography, Avatar, Stack, Paper } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import Profile from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(0,0,0,0.1)",
    activeColor: "#ff6a3d",
    value: review.rating,
    isHalf: true,
    size: 20,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "16px",
        width: "420px",          // smaller card
        border: "1px solid #e0e0e0", // visible clean border
        mx: "auto",
        position: "relative",
        backgroundColor: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)", // softer but visible
      }}
    >
      {/* TOP ROW */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1.5 }}
      >
        {/* Avatar + user info */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src={Profile}
            alt="User"
            sx={{ width: 48, height: 48 }} // smaller avatar
          />

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {review.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Customer
            </Typography>
          </Box>
        </Stack>

        {/* Stars */}
        <Box sx={{ mt: 0.5 }}>
          <ReactStars {...options} />
        </Box>
      </Stack>

      {/* COMMENT */}
      <Typography
        variant="body2"
        sx={{
          color: "text.primary",
          lineHeight: 1.5,
          fontSize: "14px",
          pr: 3,
        }}
      >
        {review.comment}
      </Typography>

      {/* QUOTE ICON */}
      <Typography
        sx={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: 32,
          color: "rgba(255, 90, 60, 0.35)",
          fontWeight: 300,
          userSelect: "none",
        }}
      >
        ❞
      </Typography>
    </Paper>
  );
};

export default ReviewCard;