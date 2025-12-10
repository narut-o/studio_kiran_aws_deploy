// import React,{useState} from 'react';
// import './Shipping.css';
// import {useSelector,useDispatch} from 'react-redux';
// import {saveShippingInfo} from '../../actions/cartAction';
// import PinDropIcon from '@mui/icons-material/PinDrop';
// import HomeIcon from '@mui/icons-material/Home';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import PublicIcon from '@mui/icons-material/Public';
// import PhoneIcon from '@mui/icons-material/Phone';
// import {State} from 'country-state-city';
// import {useAlert} from 'react-alert';
// import MetaData from '../layout/MetaData';
// import CheckoutStep from './CheckoutStep';
// import { useNavigate } from 'react-router-dom';



// const Shipping = () => {
//     const dispatch = useDispatch();
//     const alert = useAlert();
//     const navigate = useNavigate();
//     const {shippingInfo} = useSelector(state=>state.cart);

//   const [address, setAddress] = useState(shippingInfo.address);
//   const [city, setCity] = useState(shippingInfo.city);
//   const [state, setState] = useState(shippingInfo.state);
//   const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
//   const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


//   const shippingSubmit=(e)=>{

//     e.preventDefault();

//     if(phoneNo.length>10||phoneNo.length<10)
//     {
//         alert.error("Phone no should be 10 digits");
//         return;
//     }
//     dispatch(saveShippingInfo({address,city,state,pinCode,phoneNo}));
//     navigate('/order/confirm');
//   }


//   return (
//       <>
//           <MetaData title='Checkout' />
//           <CheckoutStep activeStep={0} />
//           <div className='shipping-container' >
//           <div className='shipping-box' >
//           <h2 className='shipping-heading' >Shipping Details</h2>
//           <form
//           className='shipping-form'
//           encType='multipart/form-data'
//           onSubmit={shippingSubmit}
//           >
//           <div>
//               <HomeIcon/>
//               <input
//                   type='text'
//                   placeholder='Address'
//                   required
//                   value={address}
//                   onChange={(e)=>setAddress(e.target.value)}
//               />
//           </div>
//           <div>
//               <LocationCityIcon/>
//               <input
//                   type='text'
//                   placeholder='City'
//                   required
//                   value={city}
//                   onChange={(e)=>setCity(e.target.value)}
//               />
//           </div>
//           <div>
//               <PinDropIcon/>
//               <input
//                   type='number'
//                   placeholder='Pin Code'
//                   required
//                   value={pinCode}
//                   onChange={(e)=>setPinCode(e.target.value)}
                  
//               />
//           </div>
//           <div>
//               <PhoneIcon/>
//               <input
//                   type='number'
//                   placeholder='Mobile'
//                   required
//                   value={phoneNo}
//                   onChange={(e)=>setPhoneNo(e.target.value)}
                 
//               />
//           </div>
//           <div>
//               <PublicIcon/>
//                <select
//                    required
//                    value={state}
//                    onChange={(e)=>setState(e.target.value)}
//                >
//                    <option value='' >State</option>
//                    {State&&State.getStatesOfCountry('IN').map(item=>(
//                        <option key={item.isoCode} value={item.name} >{item.name}</option>
//                    ))}
//                </select>
//           </div>
//           <input
//               type='submit'
//               value='Continue'
//               className='shipping-btn'
//               disabled={state?false:true}
//           />


//           </form>
//           </div>

//           </div>
//       </>
   
//   )
// }

// export default Shipping;
// Shipping.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";

import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { State } from "country-state-city";
import MetaData from "../layout/MetaData";
import CheckoutStep from "./CheckoutStep";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [stateValue, setStateValue] = useState(shippingInfo.state || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  // Snackbar state (instead of react-alert)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = (_event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      setSnackbar({
        open: true,
        message: "Phone number should be 10 digits",
        severity: "error",
      });
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state: stateValue,
        pinCode,
        phoneNo,
      })
    );

    navigate("/order/confirm");
  };

  const isDisabled =
    !address || !city || !stateValue || !pinCode || phoneNo.length !== 10;

  return (
    <>
      <MetaData title="Checkout" />
      <CheckoutStep activeStep={0} />

      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #f5f7ff 0, #f3f4f6 45%, #e5e7eb 100%)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          py: { xs: 4, md: 6 },
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: { xs: 3, md: 4 },
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                textAlign: "center",
                letterSpacing: 0.5,
              }}
            >
              Shipping Details
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={shippingSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {/* Address */}
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* City */}
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Pin Code */}
              <TextField
                label="Pin Code"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDropIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Phone */}
              <TextField
                label="Mobile Number"
                variant="outlined"
                fullWidth
                required
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                helperText="10-digit mobile number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* State */}
              <TextField
                select
                label="State"
                variant="outlined"
                fullWidth
                required
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PublicIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Select State</MenuItem>
                {State &&
                  State.getStatesOfCountry("IN").map((item) => (
                    <MenuItem key={item.isoCode} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>

              {/* Continue Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isDisabled}
                sx={{
                  mt: 1,
                  textTransform: "none",
                  borderRadius: 999,
                  py: 1.3,
                  fontWeight: 500,
                  fontSize: 15,
                  background:
                    "linear-gradient(135deg, #111827 0%, #000000 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #000000 0%, #000000 100%)",
                  },
                }}
              >
                Continue
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Snackbar */}
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

export default Shipping;