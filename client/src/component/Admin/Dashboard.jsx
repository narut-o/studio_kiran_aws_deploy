// src/component/Admin/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Chip,
  Stack,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveIcon from "@mui/icons-material/Remove";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import MuiAlert from "@mui/material/Alert";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllOrders, updateOrder } from "../../actions/orderAction";
import {
  CLEAR_ERRORS,
  UPDATE_ORDER_RESET,
} from "../../constants/orderConstants";

import Pagination from "@mui/material/Pagination";
// Snackbar Alert wrapper
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // top-level tab: Orders / Products
  const [mainTab, setMainTab] = useState("ORDERS");

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // ===================== ORDERS STATE =====================
 const {
  loading,
  error,
  orders = [],
  totalAmount = 0,
  totalOrders = 0,
  currentPage = 1,
  totalPages = 1,
} = useSelector((state) => state.allOrders);

  const {
    loading: updatingOrder,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.orderAdmin);

  // inner tabs for orders (status)
  const [orderTab, setOrderTab] = useState("ALL");

  // search + filters
  const [search, setSearch] = useState("");
  const [orderId, setOrderId] = useState("");
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ===================== PRODUCTS STATE =====================
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productSearch, setProductSearch] = useState("");
  const [editedProducts, setEditedProducts] = useState({}); // { [id]: { price, stock } }

  // create-product dialog state
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pStock, setPStock] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pImages, setPImages] = useState([]); // File[]
  const [pPreviews, setPPreviews] = useState([]); // string[]
  const [creatingProduct, setCreatingProduct] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);

  // ===================== EFFECTS =====================
  useEffect(() => {
    dispatch(getAllOrders(page));
  }, [dispatch,page]);

  useEffect(() => {
    if (error) {
      console.error(error);
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      dispatch({ type: CLEAR_ERRORS });
    }
    if (updateError) {
      console.error(updateError);
      setSnackbarMessage(updateError);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [error, updateError, dispatch]);

  useEffect(() => {
  if (isUpdated) {
    setSnackbarMessage("Order updated successfully!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    dispatch(getAllOrders(page));   // use current page
    dispatch({ type: UPDATE_ORDER_RESET });
  }
}, [isUpdated, dispatch, page]);
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      const list = data.products || [];
      setProducts(list);

      const map = {};
      list.forEach((p) => {
        map[p._id] = { price: p.price, stock: p.stock };
      });
      setEditedProducts(map);
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to load products");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===================== ORDERS HELPERS =====================

  const mapOrderStatusToGroup = (order) => {
    const s = (order.orderStatus || "").toLowerCase();
    if (s === "processing") return "NEW";
    if (s === "delivered") return "COMPLETED";
    if (s === "shipped") return "PENDING";
    if (s === "cancelled" || s === "canceled") return "CANCELED";
    return "OTHER";
  };

  const orderTabCounts = useMemo(() => {
    const base = { NEW: 0, COMPLETED: 0, CANCELED: 0, PENDING: 0 };
    orders.forEach((o) => {
      const g = mapOrderStatusToGroup(o);
      if (g === "NEW") base.NEW++;
      else if (g === "COMPLETED") base.COMPLETED++;
      else if (g === "CANCELED") base.CANCELED++;
      else if (g === "PENDING") base.PENDING++;
    });
    return base;
  }, [orders]);

  const clearOrderFilters = () => {
    setOrderId("");
    setCustomer("");
    setPhone("");
    setProductFilter("");
    setPayment("");
    setStatus("");
    setStartDate("");
    setEndDate("");
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        const group = mapOrderStatusToGroup(o);

        if (orderTab !== "ALL" && group !== orderTab) return false;

        if (search.trim()) {
          const term = search.toLowerCase();
          const idMatch = o._id.toLowerCase().includes(term);
          const nameMatch = (o.user?.name || "")
            .toLowerCase()
            .includes(term);
          if (!idMatch && !nameMatch) return false;
        }

        if (orderId && !o._id.toLowerCase().includes(orderId.toLowerCase()))
          return false;

        if (
          customer &&
          !(o.user?.name || "")
            .toLowerCase()
            .includes(customer.toLowerCase())
        )
          return false;

        const phoneField = (o.shippingInfo?.phoneNo || "").toString();
        if (phone && !phoneField.includes(phone)) return false;

        if (productFilter) {
          const names = (o.orderItems || [])
            .map((i) => i.name || "")
            .join(" ")
            .toLowerCase();
          if (!names.includes(productFilter.toLowerCase())) return false;
        }

        if (payment) {
          const pay = (o.paymentInfo?.status || "").toUpperCase();
          if (pay !== payment.toUpperCase()) return false;
        }

        if (status) {
          if (
            (o.orderStatus || "").toLowerCase() !== status.toLowerCase()
          )
            return false;
        }

        if (startDate || endDate) {
          const d = new Date(o.createdAt);
          if (startDate && d < new Date(startDate)) return false;
          if (endDate) {
            const e = new Date(endDate);
            e.setHours(23, 59, 59, 999);
            if (d > e) return false;
          }
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [
    orders,
    orderTab,
    search,
    orderId,
    customer,
    phone,
    productFilter,
    payment,
    status,
    startDate,
    endDate,
  ]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrder(id, newStatus));
  };

  const goToOrder = (id) => navigate(`/admin/order/${id}`);

  const renderPaymentChip = (paymentStatus) => {
    const value = (paymentStatus || "PENDING").toUpperCase();
    if (value === "PAID") {
      return (
        <Chip
          label="Paid"
          size="small"
          sx={{ bgcolor: "#E5F7ED", color: "#14833B", fontWeight: 500 }}
        />
      );
    }
    if (value === "FAILED") {
      return (
        <Chip
          label="Not paid"
          size="small"
          sx={{ bgcolor: "#FFE8E8", color: "#C53030", fontWeight: 500 }}
        />
      );
    }
    return (
      <Chip
        label="Pending"
        size="small"
        sx={{ bgcolor: "#FFF7E6", color: "#B36A00", fontWeight: 500 }}
      />
    );
  };

  const renderStatusChip = (order) => {
    const g = mapOrderStatusToGroup(order);
    if (g === "NEW") {
      return (
        <Chip
          label="New"
          size="small"
          sx={{ bgcolor: "#E5F0FF", color: "#1664FF", fontWeight: 500 }}
        />
      );
    }
    if (g === "COMPLETED") {
      return (
        <Chip
          label="Completed"
          size="small"
          sx={{ bgcolor: "#E5F7ED", color: "#14833B", fontWeight: 500 }}
        />
      );
    }
    if (g === "CANCELED") {
      return (
        <Chip
          label="Canceled"
          size="small"
          sx={{ bgcolor: "#FFE8E8", color: "#C53030", fontWeight: 500 }}
        />
      );
    }
    if (g === "PENDING") {
      return (
        <Chip
          label="Pending"
          size="small"
          sx={{ bgcolor: "#FFF7E6", color: "#B36A00", fontWeight: 500 }}
        />
      );
    }
    return (
      <Chip
        label={order.orderStatus || "Unknown"}
        size="small"
        variant="outlined"
      />
    );
  };

  // ===================== PRODUCTS HELPERS =====================

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
      ),
    [products, productSearch]
  );

  const setProductField = (id, field, value) => {
    const product = products.find((p) => p._id === id) || {};
    setEditedProducts((prev) => {
      const existing = prev[id] || {};
      return {
        ...prev,
        [id]: {
          price:
            typeof existing.price === "number" ? existing.price : product.price,
          stock:
            typeof existing.stock === "number" ? existing.stock : product.stock,
          [field]: value,
        },
      };
    });
  };

  const incrementStock = (id) => {
    const product = products.find((p) => p._id === id) || {};
    setEditedProducts((prev) => {
      const existing = prev[id] || {};
      const base =
        typeof existing.stock === "number" ? existing.stock : product.stock || 0;
      return {
        ...prev,
        [id]: {
          price:
            typeof existing.price === "number" ? existing.price : product.price,
          stock: base + 1,
        },
      };
    });
  };

  const decrementStock = (id) => {
    const product = products.find((p) => p._id === id) || {};
    setEditedProducts((prev) => {
      const existing = prev[id] || {};
      const base =
        typeof existing.stock === "number" ? existing.stock : product.stock || 0;
      const next = Math.max(0, base - 1);
      return {
        ...prev,
        [id]: {
          price:
            typeof existing.price === "number" ? existing.price : product.price,
          stock: next,
        },
      };
    });
  };

  const handleUpdateProduct = async (id) => {
    const product = products.find((p) => p._id === id) || {};
    const edited = editedProducts[id] || {};

    const newPrice =
      edited.price !== undefined && edited.price !== ""
        ? edited.price
        : product.price;
    const newStock =
      edited.stock !== undefined && edited.stock !== ""
        ? edited.stock
        : product.stock;

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`,
        { price: newPrice, stock: newStock },
        { withCredentials: true }
      );
      setSnackbarMessage("Product updated");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to update product");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/product/${id}`,
        { withCredentials: true }
      );
      setSnackbarMessage("Product deleted");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setSnackbarMessage("Failed to delete product");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // ------- Create Product dialog helpers -------

  const resetCreateForm = () => {
    setPName("");
    setPPrice("");
    setPStock("");
    setPCategory("");
    setPDesc("");
    setPImages([]);
    setPPreviews([]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPImages(files);
    setPPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleCreateProduct = async () => {
    if (!pName || !pPrice || !pStock || !pCategory) {
      setSnackbarMessage("Fill name, price, stock and category");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", pName);
    formData.append("description", pDesc);
    formData.append("price", pPrice);
    formData.append("category", pCategory);
    formData.append("stock", pStock);
    pImages.forEach((img) => formData.append("images", img));

    try {
      setCreatingProduct(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/product/new`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setSnackbarMessage("Product created");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      resetCreateForm();
      setOpenCreateProduct(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setSnackbarMessage(
        err.response?.data?.message || "Failed to create product"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setCreatingProduct(false);
    }
  };

  // ===================== RENDER =====================

  return (
    <Box
      sx={{
        bgcolor: "linear-gradient(180deg, #E5ECFF 0%, #F5F7FF 40%, #FFFFFF 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* top-level tabs */}
        <Tabs
          value={mainTab}
          onChange={(_, v) => setMainTab(v)}
          sx={{
            mb: 3,
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: 15,
            },
          }}
        >
          <Tab label="Orders" value="ORDERS" />
          <Tab label="Products" value="PRODUCTS" />
        </Tabs>

        {/* ================= ORDERS VIEW ================= */}
        {mainTab === "ORDERS" && (
          <>
            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Orders
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  Total revenue: ₹{Number(totalAmount).toFixed(2)}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Filter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Export
                </Button>
              </Stack>
            </Box>

            {/* inner tabs for order statuses */}
            <Tabs
              value={orderTab}
              onChange={(_, v) => setOrderTab(v)}
              sx={{
                mb: 2,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontSize: 14,
                  minHeight: 40,
                },
              }}
            >
              <Tab label={`All Orders (${orders.length})`} value="ALL" />
              <Tab label={`New Orders (${orderTabCounts.NEW})`} value="NEW" />
              <Tab
                label={`Completed Orders (${orderTabCounts.COMPLETED})`}
                value="COMPLETED"
              />
              <Tab
                label={`Canceled Orders (${orderTabCounts.CANCELED})`}
                value="CANCELED"
              />
              <Tab
                label={`Pending Orders (${orderTabCounts.PENDING})`}
                value="PENDING"
              />
            </Tabs>

            {/* search bar */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search by order ID or customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  bgcolor: "#FFFFFF",
                },
              }}
            />

            {/* filter card */}
            <Paper
              elevation={1}
              sx={{
                p: 2.5,
                mb: 2,
                borderRadius: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Order ID"
                    placeholder="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Customer"
                    placeholder="First and last name"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone number"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Product"
                    placeholder="Product"
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Payment</InputLabel>
                    <Select
                      label="Payment"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value="PAID">Paid</MenuItem>
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="FAILED">Not paid</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Processing">New</MenuItem>
                      <MenuItem value="Shipped">Pending</MenuItem>
                      <MenuItem value="Delivered">Completed</MenuItem>
                      <MenuItem value="Cancelled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="From"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="To"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Search
                </Button>
                <Button
                  variant="text"
                  sx={{ textTransform: "none" }}
                  onClick={clearOrderFilters}
                >
                  Clear filters
                </Button>
              </Box>
            </Paper>

            {/* orders table */}
            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F5F7FF" }}>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <CircularProgress size={24} />
                        </TableCell>
                      </TableRow>
                    ) : filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((o) => (
                        <TableRow
                          key={o._id}
                          hover
                          sx={{ cursor: "pointer" }}
                          onClick={() => goToOrder(o._id)}
                        >
                          <TableCell>#{o._id.slice(-6)}</TableCell>
                          <TableCell>
                            {new Date(o.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{o.user?.name || "Guest"}</TableCell>
                          <TableCell>
                            ₹{Number(o.totalPrice).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {renderPaymentChip(o.paymentInfo?.status)}
                          </TableCell>
                          <TableCell
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Stack direction="row" spacing={1} alignItems="center">
                              {renderStatusChip(o)}
                              <FormControl size="small">
                                <Select
                                  value={o.orderStatus}
                                  onChange={(e) =>
                                    handleStatusChange(o._id, e.target.value)
                                  }
                                  disabled={updatingOrder}
                                  sx={{ minWidth: 120, fontSize: 13 }}
                                >
                                  <MenuItem value="Processing">
                                    Processing
                                  </MenuItem>
                                  <MenuItem value="Shipped">Shipped</MenuItem>
                                  <MenuItem value="Delivered">
                                    Delivered
                                  </MenuItem>
                                  <MenuItem value="Cancelled">
                                    Cancelled
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Stack>
                          </TableCell>
                          <TableCell
                            align="right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconButton>
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {totalPages > 1 && (
  <Box
    sx={{
      mt: 2,
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => setPage(value)}
      color="primary"
      shape="rounded"
      siblingCount={1}
      boundaryCount={1}
    />
  </Box>
)}
          </>
        )}

        {/* ================= PRODUCTS VIEW ================= */}
        {mainTab === "PRODUCTS" && (
          <>
            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight={600}>
                Products
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2, textTransform: "none" }}
                onClick={() => setOpenCreateProduct(true)}
              >
                Add New Product
              </Button>
            </Box>

            {/* search */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search by product name"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  bgcolor: "#FFFFFF",
                },
              }}
            />

            {/* products table */}
            <Paper elevation={1} sx={{ borderRadius: 3, overflow: "hidden" }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F5F7FF" }}>
                      <TableCell>Product</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingProducts ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress size={24} />
                        </TableCell>
                      </TableRow>
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No products found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((p) => {
                        const edit = editedProducts[p._id] || {};
                        const currentPrice =
                          edit.price !== undefined ? edit.price : p.price;
                        const currentStock =
                          edit.stock !== undefined ? edit.stock : p.stock;

                        const statusLabel =
                          currentStock === 0
                            ? "Out of stock"
                            : currentStock < 5
                            ? "Low stock"
                            : "In stock";

                        const statusColor =
                          currentStock === 0
                            ? { bg: "#FFE8E8", color: "#C53030" }
                            : currentStock < 5
                            ? { bg: "#FFF7E6", color: "#B36A00" }
                            : { bg: "#E5F7ED", color: "#14833B" };

                        return (
                          <TableRow key={p._id} hover>
                            <TableCell>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                {p.images &&
                                  p.images[0] &&
                                  p.images[0].url && (
                                    <Box
                                      component="img"
                                      src={p.images[0].url}
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 2,
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                <Typography variant="body2">{p.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>{p.category}</TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={currentPrice}
                                onChange={(e) =>
                                  setProductField(
                                    p._id,
                                    "price",
                                    Number(e.target.value)
                                  )
                                }
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      ₹
                                    </InputAdornment>
                                  ),
                                }}
                                sx={{ width: 120 }}
                              />
                            </TableCell>
                            <TableCell>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => decrementStock(p._id)}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                  size="small"
                                  type="number"
                                  value={currentStock}
                                  onChange={(e) =>
                                    setProductField(
                                      p._id,
                                      "stock",
                                      Math.max(
                                        0,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                  sx={{ width: 70 }}
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => incrementStock(p._id)}
                                >
                                  <AddCircleOutlineIcon fontSize="small" />
                                </IconButton>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  sx={{ textTransform: "none", ml: 1 }}
                                  onClick={() => handleUpdateProduct(p._id)}
                                >
                                  Update
                                </Button>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={statusLabel}
                                size="small"
                                sx={{
                                  bgcolor: statusColor.bg,
                                  color: statusColor.color,
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteProduct(p._id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        )}

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2500}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* Create Product dialog */}
        <Dialog
          open={openCreateProduct}
          onClose={() => {
            if (!creatingProduct) {
              setOpenCreateProduct(false);
            }
          }}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: { borderRadius: 3, p: 0.5 },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600 }}>Create Product</DialogTitle>
          <DialogContent dividers sx={{ pt: 1.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Product name"
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Price"
                  value={pPrice}
                  onChange={(e) => setPPrice(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Stock"
                  value={pStock}
                  onChange={(e) => setPStock(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                  >
                    <MenuItem value="Candle">Candle</MenuItem>
                    <MenuItem value="Scented Candle">Scented Candle</MenuItem>
                    <MenuItem value="Gift Box">Gift Box</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  multiline
                  minRows={3}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5, color: "text.secondary" }}
                >
                  Photos
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ borderRadius: 2, textTransform: "none", mb: 1 }}
                >
                  Upload images
                  <input
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>

                {pPreviews.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {pPreviews.map((src, idx) => (
                      <Box
                        key={idx}
                        component="img"
                        src={src}
                        alt={`preview-${idx}`}
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          objectFit: "cover",
                          border: "1px solid #E5E7EB",
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => {
                if (!creatingProduct) {
                  setOpenCreateProduct(false);
                  resetCreateForm();
                }
              }}
              sx={{ textTransform: "none" }}
              disabled={creatingProduct}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProduct}
              variant="contained"
              sx={{ borderRadius: 2, textTransform: "none" }}
              disabled={creatingProduct}
            >
              {creatingProduct ? "Saving..." : "Create product"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;