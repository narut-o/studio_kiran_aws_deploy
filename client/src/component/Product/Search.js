// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import "./Search.css";

// const Search = () => {
//     const [keyword,setKeyword] = useState('');
//     const navigate = useNavigate();
//     const searchSubmitHandler = (event)=>{
//         event.preventDefault();
//         if(keyword.trim())
//         {
//             navigate(`/products/${keyword}`);
//         }else{
//             navigate('/products');
//         }
    

//     }
//   return (
//     <>
//         <form className='searchBox' onSubmit={searchSubmitHandler} >
//           <input
//           type='text'
//           placeholder='Search a product...'
//           onChange={(event)=>setKeyword(event.target.value)}
//            />
//            <input
//                type='submit'
//                value='search'
//            />
//         </form>
//     </>
//   )
// }

// export default Search
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, IconButton, InputAdornment, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={searchSubmitHandler}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 999,
          px: 2,
          py: 0.5,
          border: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Search products…"
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: 15, px: 1 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ opacity: 0.5 }} />
              </InputAdornment>
            ),
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Search;