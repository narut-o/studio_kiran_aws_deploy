import React from "react";
import { Dialog, Box } from "@mui/material";
import LoginSignup from "../User/LoginSignup";

const AuthDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "transparent",
          boxShadow: "none",
        },
      }}
      BackdropProps={{
        sx: { backgroundColor: "rgba(15,23,42,0.35)"}, // subtle dark blur
      }}
    >
      <Box sx={{ p: { xs: 1.5, md: 2 } }}>
        {/* Pass onClose so the child can close the dialog on success / forgot pw */}
        <LoginSignup onClose={onClose} />
      </Box>
    </Dialog>
  );
};

export default AuthDialog;