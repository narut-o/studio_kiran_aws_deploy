// import React from 'react'
// import {Link} from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
// import "./Home.css";


// // const ProductCard = ({product,ishome}) => {

  
// //   const options={
// //     edit:false,
// //     color:"rgba(20,20,20,0.1)",
// //     activeColor:"green",
// //     value:product.ratings,
// //     isHalf:true,
// //     size:window.innerWidth<600 ?20:25

// // }
// //   return (
// //    <Link className='productCard' to={`/product/${product._id}`} >
   
// //     <img src={product.images[0].url} alt = {product.name} />
// //     <p>{product.name}</p>
// //     {!ishome?<div>
// //         <ReactStars {...options}/> 
// //         <span>({product.numberOfReviews} Reviews)</span>
// //     </div>:<div><p>Fresh Vanilla </p></div>}
// //    {!ishome?<span>{`₹${product.price}`}</span>:<div></div>}
// //    </Link>
// //   )
// // }

// // export default ProductCard;


// // // const ProductCard = ({product,ishome}) => {
// // //   return (
// // //     <div
// // //       style={{
// // //         backgroundColor: "#D9D9DA",
// // //         borderRadius: "16px",
// // //         padding: "24px",
// // //         textAlign: "center",
// // //         boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
// // //         width: "260px",
// // //       }}
// // //     >
// // //       <img
// // //         src={product.images[0].url}
// // //         alt={product.name}
// // //         style={{
// // //           width: "100%",
// // //           borderRadius: "12px",
// // //           marginBottom: "16px",
// // //         }}
// // //       />

// // //       <h3
// // //         style={{
// // //           color: "#2F2F33",
// // //           fontSize: "20px",
// // //           fontWeight: "600",
// // //           marginBottom: "8px",
// // //         }}
// // //       >
// // //         {product.name}
// // //       </h3>

// // //       <p
// // //         style={{
// // //           color: "#2F2F33",
// // //           fontSize: "18px",
// // //           opacity: 0.8,
// // //         }}
// // //       >
// // //         ${product.price}
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;
// // ProductCard.jsx

// import {
//   Card,
//   CardActionArea,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
// } from "@mui/material";

// const ProductCard = ({ product,ishome }) => {
//   return (
    
//     <Card
//       sx={{
//         boxShadow: "none",
//         borderRadius: 0,
//         bgcolor: "#ffffff",
//         textAlign: "center",
//       }}
//     >  <Link 
//   to={`/product/${product._id}`} 
//   style={{ textDecoration: "none", color: "inherit" }}
// >
//       <CardActionArea
//         sx={{
//           "&:hover img": { transform: "scale(1.02)" },
//         }}
//       >
//         {/* Image area */}
     
//        <Box
//   sx={{
//     bgcolor: "#f8f8f8",
//     height: 420,                     // same fixed area
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",              // just in case
//   }}
// >
//   <CardMedia
//     component="img"
//     image={product.images[0].url}
//     alt={product.name}
//     sx={{
//       maxWidth: "100%",
//       maxHeight: "100%",
//       width: "auto",
//       height: "auto",
//       objectFit: "contain",          // keep original ratio
//       transition: "transform 0.25s ease",
//     }}
//   />
// </Box>
       

//         <CardContent sx={{ pt: 3, pb: 4 }}>
//           {/* QUICK ADD */}
        

//           {/* Product name */}
//           <Typography
//             sx={{
//               mt: 2,
//               fontSize: 18,
//               fontWeight: 300,
//               letterSpacing: 0.3,
//               fontFamily: '"Inter","Helvetica Neue",sans-serif',
//               color: "rgba(0,0,0,0.85)",
//             }}
//           >
//             {product.name}
//           </Typography>

//           {/* Price */}
//           <Typography
//             sx={{
//               mt: 1,
//               fontSize: 16,
//               fontWeight: 400,
//               color: "rgba(0,0,0,0.7)",
//             }}
//           >
//             Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//        </Link>
//     </Card>
//   );
// };

// export default ProductCard;
// ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 420, // BIGGER CARD
        mx: "auto",
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderRadius: 0,
        textAlign: "center",
      }}
    >
      {/* Remove underline */}
      <Link
        to={`/product/${product._id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <CardActionArea
          disableRipple
          sx={{
            "&:hover img": { transform: "scale(1.05)" },
            "&:hover": {
              boxShadow: "0 10px 28px rgba(0,0,0,0.07)",
            },
            transition: "box-shadow 0.25s ease",
          }}
        >
          {/* Image Container — 4:3 ratio like screenshot */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "4 / 3",
              bgcolor: "#f7f7f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              src={product.images[0]?.url}
              alt={product.name}
              sx={{
                width: "100%", // Bigger candle image
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
               
              }}
            />
          </Box>

          {/* Text Section */}
          <CardContent sx={{ pt: 4, pb: 6 }}>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 400,
                letterSpacing: 0.25,
                fontFamily: '"Inter","Helvetica Neue",sans-serif',
                color: "rgba(0,0,0,0.9)",
              }}
            >
              {product.name}
            </Typography>

            <Typography
              sx={{
                marginTop: "8px",
                fontSize: 15,
                fontWeight: 400,
                fontFamily: '"Inter","Helvetica Neue",sans-serif',
                color: "rgba(0,0,0,0.6)",
              }}
            >
              Rs.
              {product.price?.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default ProductCard;