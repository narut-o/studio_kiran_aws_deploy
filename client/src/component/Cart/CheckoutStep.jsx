import React from 'react';
import './CheckoutSteps.css';
import {Typography,Stepper,Step, StepLabel,} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';



const CheckoutStep = ({activeStep}) => {

   

   

    const steps = [
      {
         lable: <Typography>Shipping Details</Typography>,
         icon:<LocalShippingIcon  />

      },
      {
        lable: <Typography>Confirm Order</Typography>,
        icon:<LibraryAddCheckIcon />

     },
     {
        lable: <Typography>Payment</Typography>,
        icon:<AccountBalanceIcon  />

     },
    ];

    const stepStyles = {
        boxSizing:'border-box'
    }
  return (
  <>

     <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} >
       {steps.map((step,index)=>(
           <Step key={index} active={activeStep===index?true:false}
            completed={activeStep>=index?true:false}
            >
           <StepLabel 
           icon={step.icon}
           style={{color: activeStep>=index?'#202428ff':'rgba(0,0,0,0.4)'}}
           >
               {step.lable}
           </StepLabel>

           </Step>
       ))}
      </Stepper>

  </>
  )
}

export default CheckoutStep
