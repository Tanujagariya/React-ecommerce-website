// import { Button, Container, Image, Table } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { removeItemFromWishlist } from "../Store/Slice/WishlistSlice";
// import { addToCart } from "../Store/Slice/CartSlice";

// const Wishlist = () => {
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const handleMoveToCart = (item) => {
//     const exists = cartItems.some((cartItem) => cartItem.id === item.id);
//     if (exists) {
//       toast.info(item.title + " is already in cart");
//     } else {
//       dispatch(addToCart(item));
//       dispatch(removeItemFromWishlist(item.id));
//       toast.success(item.title + " has been moved to cart");
//     }
//   };

//   return (
//     <Container>
//       <h1>Wishlist</h1>
//       {wishlistItems?.length <= 0 ? (
//         <div>There are no items added in your wishlist yet!!!</div>
//       ) : (
//         <Table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wishlistItems.map((item) => (
//               <tr key={item.id} className="border">
//                 <td>
//                   <Image src={item.thumbnail} style={{ width: "100px" }} />
//                   {item.title}
//                 </td>
//                 <td className="">
//                   <Button
//                     size="sm"
//                     variant="outline-danger"
//                     onClick={() => {
//                       dispatch(removeItemFromWishlist(item.id));
//                       toast.info("Item has been removed from the wishlist");
//                     }}
//                   >
//                     Remove
//                   </Button>

//                   <Button
//                     size="sm"
//                     variant="outline-primary"
//                     onClick={() => handleMoveToCart(item)}
//                   >
//                     Move to Cart
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default Wishlist;



import { Button, Container, Card, Row, Col, Badge } from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromWishlist } from "../Store/Slice/WishlistSlice";
import { addToCart, incrementQuantity } from "../Store/Slice/CartSlice";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
      dispatch(incrementQuantity(item.id));
      toast.success(
        `${item.title} quantity increased to ${cartItem.quantity + 1} in cart`
      );
      dispatch(removeItemFromWishlist(item.id));
    } else {
      dispatch(addToCart(item));
      dispatch(removeItemFromWishlist(item.id));
      toast.success(`${item.title} has been moved to cart`);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center text-primary fw-bold">💖 My Wishlist</h2>

      {wishlistItems?.length <= 0 ? (
        <div className="text-center text-muted fs-5">
          There are no items added in your wishlist yet!!! <br />
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {wishlistItems.map((item) => {
            const cartItem = cartItems.find((c) => c.id === item.id);
            return (
              <Col md={4} sm={6} xs={12} key={item.id}>
                <Card border="light" className="shadow-lg h-100">
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    alt={item.title}
                    className="rounded-top"
                  />
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span className="fs-6">{item.title}</span>
                      <Badge bg="success">₹{item.price || "999"}</Badge>
                    </Card.Title>
                    <Card.Text className="text-muted small">
                      {item.description?.slice(0, 60)}...
                    </Card.Text>

                    <div className="d-flex justify-content-between gap-2">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          dispatch(removeItemFromWishlist(item.id));
                          toast.info("Item has been removed from the wishlist");
                        }}
                      >
                        <FaTrash className="me-1" /> Remove
                      </Button>

                      <Button
                        size="sm"
                        variant={cartItem ? "secondary" : "success"}
                        onClick={() => handleMoveToCart(item)}
                      >
                        <FaShoppingCart className="me-1" />
                        {cartItem
                          ? `Already in Cart (Qty: ${cartItem.quantity})`
                          : "Move to Cart"}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Wishlist;
