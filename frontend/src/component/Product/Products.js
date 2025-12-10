import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productAction";
import { useParams } from "react-router-dom";

import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import NoProducts from "./NoProducts";
import MetaData from "../layout/MetaData";

import {
  Box,
  Container,
  Grid,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 30000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    loading,
    products,
    error,
    resultPerPage,
    productsCount,
    filteredProductCount,
  } = useSelector((state) => state.products);

  // Snackbar state instead of react-alert
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
    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, error, price, category, ratings]);

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalItems = filteredProductCount || productsCount || 0;
  const totalPages =
    resultPerPage && totalItems ? Math.ceil(totalItems / resultPerPage) : 1;

  const hasProducts = products && products.length > 0;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />

          {/* If no products for this view */}
          {!hasProducts ? (
            <Box
              sx={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
              }}
            >
              <NoProducts />
            </Box>
          ) : (
            <Container maxWidth="lg" sx={{ py: 6 }}>
              {/* Products grid */}
              <Grid container spacing={4} justifyContent="center">
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination – only if there are products AND more than one page */}
              {hasProducts && totalPages > 1 && totalItems > resultPerPage && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderRadius: "999px",
                      },
                      "& .Mui-selected": {
                        bgcolor: "#111 !important",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "#000 !important",
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Container>
          )}
        </>
      )}

      {/* Snackbar for errors */}
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

export default Products;