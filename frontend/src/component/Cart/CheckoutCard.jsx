import React from 'react'

const CheckoutCard = () => {
  return (
   <>
         <div className='checkout-container' >
       <div className='delivery-details' >
      <div>
      <input type='text' placeholder='Promo' />
        <input type='submit' value='Apply' / > 
      </div>
       
       </div>
         <div className='sub-total' >
         <div>
          <h4>Subtotal</h4>
          <h5>Discount</h5>
          <h5>Delivery</h5>
          <h5>Tax</h5>
         </div>
         <div>
         <h4>₹ 4999</h4>
          <h5> - ₹1299</h5>
          <h5>₹ 0</h5>
          <h5>₹ 880</h5>
         </div>
         </div>
         <div className='total' >
         <div>
         <h4>Total</h4>
         <h4>₹ 2999</h4>
         </div>
         <button className='checkout-btn' >Proceed to checkout</button>
         <button className='continue-btn' >Continue shopping</button>
         </div>
       </div>
   </>
  )
}

export default CheckoutCard
