// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   clearCart,
//   incrementQuantity,
//   decrementQuantity,
// } from "../Store/Slice/CartSlice";

// const Cart = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );
//   const discount = cartItems.reduce(
//     (acc, item) => acc + (item.discountPercentage || 0) * item.quantity,
//     0
//   );

//   const couponDiscount = 19;
//   const platformFee = 4;

//   const finalAmount = totalPrice - discount - couponDiscount + platformFee;

//   return (
//     <div className="container my-4 d-flex gap-4">
//       <div className="cart-items flex-grow-1">
//         <h2 className="mb-3">My Cart</h2>

//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <>
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Title</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <img
//                         src={item.thumbnail}
//                         alt={item.title}
//                         style={{ width: "80px" }}
//                       />
//                     </td>
//                     <td>{item.title}</td>
//                     <td>₹{item.price}</td>
//                     <td>
//                       <button
//                         onClick={() => dispatch(decrementQuantity(item.id))}
//                         className="btn btn-sm btn-danger me-1"
//                       >
//                         -
//                       </button>
//                       {item.quantity}
//                       <button
//                         onClick={() => dispatch(incrementQuantity(item.id))}
//                         className="btn btn-sm btn-success ms-1"
//                       >
//                         +
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => dispatch(removeFromCart(item.id))}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <button
//               className="btn btn-outline-danger"
//               onClick={() => dispatch(clearCart())}
//             >
//               Clear Cart
//             </button>
//           </>
//         )}
//       </div>

//       <div
//         className="price-details p-3 border"
//         style={{ width: "300px", height: "fit-content" }}
//       >
//         <h5 className="mb-3">PRICE DETAILS</h5>
//         <div className="d-flex justify-content-between mb-2">
//           <span>Price ({cartItems.length} items)</span>
//           <span>₹{totalPrice.toFixed(0)}</span>
//         </div>

//         <div className="d-flex justify-content-between mb-2 text-success">
//           <span>Discount</span>
//           <span>- ₹{discount.toFixed(0)}</span>
//         </div>

//         <div className="d-flex justify-content-between mb-2 text-success">
//           <span>Coupons for you</span>
//           <span>- ₹{couponDiscount}</span>
//         </div>

//         <div className="d-flex justify-content-between mb-3">
//           <span>Platform Fee</span>
//           <span>₹{platformFee}</span>
//         </div>

//         <hr />

//         <div className="d-flex justify-content-between fw-bold mb-3">
//           <span>Total Amount</span>
//           <span>₹{finalAmount.toFixed(0)}</span>
//         </div>

//         <div className="text-success" style={{ fontWeight: "600" }}>
//           You will save ₹{(discount + couponDiscount).toFixed(0)} on this order
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../Store/Slice/CartSlice";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTags,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("SAVE10");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === "SAVE10") {
      setDiscount(10);
      setCouponMessage(`Coupon "SAVE10" applied! You saved 10%.`);
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code. Only 'SAVE10' is valid.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 0 : 0; 
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="container my-4">
      <h2 className="mb-4 d-flex align-items-center gap-2 text-primary fw-bold">
        <FaShoppingCart /> My Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-muted my-5">
          <p>Your cart is empty.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <table className="table align-middle shadow-sm rounded">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: "70px", borderRadius: "6px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="btn btn-sm btn-outline-danger me-1"
                      >
                        <FaMinus />
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="btn btn-sm btn-outline-success ms-1"
                      >
                        <FaPlus />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="btn btn-danger mt-3"
              onClick={() => dispatch(clearCart())}
            >
              <FaTrash /> Clear Cart
            </button>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Order Summary</h5>

                <div className="d-flex justify-content-between">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>

                {discount > 0 && (
                  <div className="d-flex justify-content-between text-success">
                    <span>Discount:</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span className="text-danger">₹{total.toFixed(2)}</span>
                </div>
                <div className="mt-4">
                  <label className="form-label fw-bold">
                    <FaTags /> Apply Coupon
                  </label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-success"
                      onClick={applyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <div
                      className={`mt-2 ${
                        couponMessage.includes("Invalid")
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      {couponMessage}
                    </div>
                  )}
                </div>
                <div className="mt-4 d-grid gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
