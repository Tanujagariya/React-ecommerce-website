// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Check } from "react-bootstrap-icons";
// import { toast } from "react-toastify";
// import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
// import { addToCart } from "../Store/Slice/CartSlice";

// import ReactPaginate from "react-paginate";

// const Products = () => {
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const dispatch = useDispatch();

//   const [products, setProducts] = useState([]);

//   // pagination state
//   const [itemsPerPage] = useState(6);
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data.products || []);
//         setItemOffset(0);
//       });
//   }, []);

//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = products.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(products.length / itemsPerPage);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % products.length;
//     setItemOffset(newOffset);
//   };

//   const AddToWishlistButton = ({ product }) => {
//     const found = wishlistItems.some((item) => item.productID === product.id);

//     const handleAddToWishlist = (product) => {
//       if (found) {
//         toast.error(product.title + " is already in wishlist");
//       } else {
//         dispatch(addItemToWishlist(product));
//         toast.success(product.title + " has been added into the wishlist");
//       }
//     };

//     return (
//       <Button
//         size="sm"
//         variant="outline-danger"
//         onClick={() => handleAddToWishlist(product)}
//       >
//         {found && <Check size={20} />}
//         Add To Wishlist
//       </Button>
//     );
//   };

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">All Products</h3>

//       {/* Pagination Top */}
//       {products.length > itemsPerPage && (
//         <ReactPaginate
//           nextLabel="next >"
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           marginPagesDisplayed={2}
//           pageCount={pageCount}
//           previousLabel="< previous"
//           pageClassName="page-item"
//           pageLinkClassName="page-link"
//           previousClassName="page-item"
//           previousLinkClassName="page-link"
//           nextClassName="page-item"
//           nextLinkClassName="page-link"
//           breakLabel="..."
//           breakClassName="page-item"
//           breakLinkClassName="page-link"
//           containerClassName="pagination"
//           activeClassName="active"
//           forcePage={itemOffset / itemsPerPage}
//           renderOnZeroPageCount={null}
//         />
//       )}

//       <Row>
//         {currentItems.length > 0 ? (
//           currentItems.map((product) => (
//             <Col md={4} key={product.id} className="g-3">
//               <Card className="h-100 text-center">
//                 <NavLink to={`/products/product/${product.id}`}>
//                   <Card.Img variant="top" src={product.thumbnail} />
//                 </NavLink>
//                 <Card.Body>
//                   <h5 className="fw-bold">{product.title}</h5>
//                   <p className="text-muted mb-1">{product.brand}</p>
//                   <h6>
//                     ₹{product.price}{" "}
//                     <small className="text-danger">
//                       -{product.discountPercentage}%
//                     </small>
//                   </h6>
//                 </Card.Body>
//              <Card.Footer className="d-flex justify-content-between">
//   <Button
//     size="sm"
//     variant="outline-primary"
//     onClick={() => dispatch(addToCart(product))}
//   >
//     Add to Cart
//   </Button>
//   <AddToWishlistButton product={product} />
// </Card.Footer>

//               </Card>
//             </Col>
//           ))
//         ) : (
//           <p>No products found.</p>
//         )}
//       </Row>
    
//     </Container>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Check } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../Store/Slice/CartSlice";
import { addItemToWishlist } from "../Store/Slice/WishlistSlice";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const cartItems = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);

  // Pagination state
  const [itemsPerPage] = useState(6);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setItemOffset(0);
      });
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  const AddToWishlistButton = ({ product }) => {
    const found = wishlistItems.some((item) => item.productID === product.id);

    const handleAddToWishlist = () => {
      if (found) {
        toast.error(`${product.title} is already in wishlist`);
      } else {
        dispatch(addItemToWishlist(product));
        toast.success(`${product.title} added to wishlist`);
      }
    };

    return (
      <Button
        size="sm"
        variant="outline-danger"
        onClick={handleAddToWishlist}
      >
        {found && <Check size={20} />} Add To Wishlist
      </Button>
    );
  };

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">All Products</h3>

      {/* Pagination Top */}
      {products.length > itemsPerPage && (
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          forcePage={itemOffset / itemsPerPage}
          renderOnZeroPageCount={null}
        />
      )}

      <Row>
        {currentItems.length > 0 ? (
          currentItems.map((product) => {
            const cartItem = getCartItem(product.id);
            return (
              <Col md={4} key={product.id} className="g-3">
                <Card className="h-100 text-center">
                  <NavLink to={`/products/product/${product.id}`}>
                    <Card.Img
                      variant="top"
                      src={product.thumbnail}
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  </NavLink>
                  <Card.Body>
                    <h5 className="fw-bold">{product.title}</h5>
                    <p className="text-muted mb-1">{product.brand}</p>
                    <h6>
                      ₹{product.price}{" "}
                      <small className="text-danger">
                        -{product.discountPercentage}%
                      </small>
                    </h6>
                  </Card.Body>

                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    {cartItem ? (
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() =>
                            dispatch(decrementQuantity(product.id))
                          }
                        >
                          -
                        </Button>
                        <span className="fw-bold">{cartItem.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() =>
                            dispatch(incrementQuantity(product.id))
                          }
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <AddToWishlistButton product={product} />
                  </Card.Footer>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Products;
