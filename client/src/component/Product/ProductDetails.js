import React, { useEffect, useState } from "react";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { addToCart } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Stack,
  Tabs,
  Tab,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ReviewsCarousel from "./ReviewsCarousel";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [tab, setTab] = useState(0);

  // Snackbar state (replaces react-alert)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
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
    if (reviewError) {
      setSnackbar({
        open: true,
        message: reviewError,
        severity: "error",
      });
      dispatch(clearErrors());
    }
    if (success) {
      setSnackbar({
        open: true,
        message: "Review submitted",
        severity: "success",
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const increaseQty = () => {
    if (product.stock <= quantity) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    setSnackbar({
      open: true,
      message: "Item added to cart",
      severity: "success",
    });
  };

  const submitReviewToggle = () => setOpen((prev) => !prev);

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", ratingValue);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  const handleTabChange = (_e, value) => setTab(value);

  const starsOptions = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product?.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  if (loading) return <Loader />;

  return (
    <>
      <MetaData title={product?.name} />
      <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff", py: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            {/* LEFT – BIG SQUARE PRODUCT IMAGE */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#f7f7f7",
                  borderRadius: 0,
                  width: "100%",
                  aspectRatio: "1 / 1", // squarish & big
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  "& img": {
                    transition: "transform 0.35s ease",
                  },
                  "&:hover img": {
                    transform: "scale(1.05)", // soft zoom
                  },
                }}
              >
                {product && product.images && product.images.length > 0 && (
                  <Box
                    component="img"
                    src={product.images[0].url}
                    alt={product.name}
                    sx={{
                      width: "75%",
                      height: "75%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </Box>
            </Grid>

            {/* RIGHT – DETAILS */}
            <Grid item xs={12} md={6}>
              {/* Title */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  fontSize: "2.4rem",
                  lineHeight: 1.2,
                  letterSpacing: "0.5px",
                  color: "#222",
                  fontFamily: `"Inter", "Helvetica Neue", "Arial", sans-serif`,
                }}
              >
                {product?.name}
              </Typography>

              {/* Price */}
              <Typography
                sx={{
                  fontWeight: 300,
                  fontSize: "1.2rem",
                  lineHeight: 2.5,
                  letterSpacing: "0.5px",
                  color: "#222",
                  fontFamily: `"Inter", "Helvetica Neue", "Arial", sans-serif`,
                }}
              >
                Rs. {product?.price}
              </Typography>

              {/* qty + add to cart */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", sm: "center" }}
                sx={{ mb: 2.5 }}
              >
                {/* QUANTITY BOX */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #111",
                    borderRadius: 0,
                    height: 48,
                    px: 1,
                    minWidth: 140,
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    onClick={decreaseQty}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      "&:hover": { bgcolor: "#f4f4f4" },
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 400,
                      letterSpacing: 0.4,
                    }}
                  >
                    {quantity}
                  </Typography>

                  <IconButton
                    onClick={increaseQty}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      "&:hover": { bgcolor: "#f4f4f4" },
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* ADD TO CART BUTTON */}
                <Button
                  disabled={product?.stock < 1}
                  fullWidth
                  variant="outlined"
                  onClick={addToCartHandler}
                  sx={{
                    height: 48,
                    borderRadius: 0,
                    borderColor: "#111",
                    color: "#111",
                    fontSize: 12,
                    letterSpacing: 1.6,
                    textTransform: "uppercase",
                    "&:hover": {
                      borderColor: "#111",
                      bgcolor: "#111",
                      color: "#fff",
                    },
                  }}
                >
                  {product?.stock < 1 ? "Out Of Stock" : "Add To Cart"}
                </Button>
              </Stack>

              {/* BUY NOW */}
              <Button
                disabled={product?.stock < 1}
                fullWidth
                sx={{
                  borderRadius: 0,
                  bgcolor: "#4b2fff",
                  color: "#ffffff",
                  py: 1.4,
                  textTransform: "none",
                  fontWeight: 500,
                  mb: 1,
                  "&:hover": { bgcolor: "#3c24cc" },
                }}
              >
                Buy Now
              </Button>

              {/* FEATURES */}
              <Stack spacing={1.8} sx={{ mb: 6 }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <LocalShippingOutlinedIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 300,
                      fontSize: "1rem",
                      lineHeight: 1.2,
                      letterSpacing: "0.5px",
                      color: "#222",
                      fontFamily: `"Inter", "Helvetica Neue", "Arial", sans-serif`,
                    }}
                  >
                    All India delivery
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.2} alignItems="center">
                  <SpaOutlinedIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 300,
                      fontSize: "1rem",
                      lineHeight: 1.2,
                      letterSpacing: "0.5px",
                      color: "#222",
                      fontFamily: `"Inter", "Helvetica Neue", "Arial", sans-serif`,
                    }}
                  >
                    Natural Soya Wax Candle
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.2} alignItems="center">
                  <HandymanOutlinedIcon fontSize="small" />
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 300,
                      fontSize: "1rem",
                      lineHeight: 1.2,
                      letterSpacing: "0.5px",
                      color: "#222",
                      fontFamily: `"Inter", "Helvetica Neue", "Arial", sans-serif`,
                    }}
                  >
                    Handmade
                  </Typography>
                </Stack>
              </Stack>

              {/* TABS */}
              <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 2 }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  TabIndicatorProps={{ sx: { bgcolor: "#111" } }}
                  sx={{
                    minHeight: 0,
                    "& .MuiTab-root": {
                      minHeight: 0,
                      textTransform: "uppercase",
                      fontSize: 12,
                      letterSpacing: 1.6,
                      mr: 4,
                      p: 0,
                    },
                  }}
                >
                  <Tab label="Description" />
                  <Tab label="Size" />
                  <Tab label="Care" />
                </Tabs>

                <Divider sx={{ mt: 1, mb: 4 }} />

                {tab === 0 && (
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.8, color: "text.primary" }}
                  >
                    {product?.description}
                  </Typography>
                )}

                {tab === 1 && (
                  <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                    Approx. burn time: 40 hours. Standard glass jar, single-wick
                    soy wax candle.
                  </Typography>
                )}

                {tab === 2 && (
                  <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                    Trim wick to 5&nbsp;mm before each burn. Allow wax to melt
                    to the edges on the first burn to avoid tunnelling. Do not
                    burn for more than 4 hours at a time and never leave a
                    candle unattended.
                  </Typography>
                )}
              </Box>

              {/* REVIEW BUTTON */}
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="text"
                  onClick={submitReviewToggle}
                  sx={{ textTransform: "none" }}
                >
                  Write a Review
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* REVIEWS SECTION BELOW */}
          <Box sx={{ mt: 8 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {/* Reviews heading if you want */}
            </Typography>
            {product?.reviews && product.reviews[0] ? (
              <Box className="reviews">
                <ReviewsCarousel reviews={product.reviews} />
              </Box>
            ) : (
              <Typography variant="body2">No Reviews Yet</Typography>
            )}
          </Box>
        </Container>
      </Box>

      {/* REVIEW DIALOG */}
      <Dialog open={open} onClose={submitReviewToggle}>
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Rating
            name="rating"
            value={ratingValue}
            onChange={(_e, newValue) => setRatingValue(newValue)}
          />
          <textarea
            className="reviewTextArea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Write your review"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle}>Cancel</Button>
          <Button onClick={reviewSubmitHandler} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
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

export default ProductDetails;