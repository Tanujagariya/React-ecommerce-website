// import { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Carousel, Image, Spinner } from "react-bootstrap";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [index, setIndex] = useState(0);
//   const carouselRef = useRef(null);

//   // fetch product by id from API
//   useEffect(() => {
//     setLoading(true);
//     fetch(`https://dummyjson.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching product:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleSelect = (selectedIndex) => {
//     setIndex(selectedIndex);
//   };

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
//         <Spinner animation="border" variant="primary" />
//       </div>
//     );
//   }

//   if (!product) return <h2 className="text-center mt-5">Product not found</h2>;

//   return (
//     <Container className="mt-4">
//       <Row className="d-flex align-items-center">
//         {/* Carousel + Thumbnails */}
//         <Col md={5}>
//           {/* Main Carousel */}
//           <div className="mx-auto" style={{ maxWidth: "500px" }}>
//             <Carousel
//               activeIndex={index}
//               onSelect={handleSelect}
//               controls={true}
//               interval={null}
//               indicators={false}
//               ref={carouselRef}
//               className="overflow-hidden"
//             >
//               {product.images?.map((img, idx) => (
//                 <Carousel.Item key={idx}>
//                   <Image
//                     src={img}
//                     className="w-100"
//                     style={{
//                       borderRadius: "20px",
//                       height: "400px",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Carousel.Item>
//               ))}
//             </Carousel>
//           </div>

//           {/* Thumbnail Images */}
//           <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
//             {product.images?.map((img, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => setIndex(idx)}
//                 style={{
//                   cursor: "pointer",
//                   border: index === idx ? "2px solid black" : "2px solid transparent",
//                   borderRadius: "5px",
//                   padding: "2px",
//                 }}
//               >
//                 <Image
//                   src={img}
//                   style={{
//                     width: "70px",
//                     height: "70px",
//                     objectFit: "cover",
//                     borderRadius: "5px",
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </Col>

//         {/* Product Details */}
//         <Col md={7}>
//           <h2>{product.title}</h2>
//           <p>{product.category}</p>
//           <h4>
//             ₹{product.price}{" "}
//             <small className="text-danger">
//               -{product.discountPercentage}%
//             </small>
//           </h4>
//           <p>{product.description}</p>
//           <p>
//             <b>Brand:</b> {product.brand}
//           </p>
//           <p>
//             <b>Shipping:</b> {product.shippingInformation}
//           </p>
//           <p>
//             <b>Return Policy:</b> {product.returnPolicy}
//           </p>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ProductDetails;


import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Carousel, Image, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity } from "../Store/Slice/CartSlice";
import { FaShoppingCart } from "react-icons/fa"; // FaTrash unnecessary here

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const cartItem = cartItems.find((item) => item.id === Number(id));

  // fetch product by id
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!product) return <h2 className="text-center mt-5">Product not found</h2>;

  return (
    <Container className="mt-4">
      <Row className="align-items-start g-4">
        {/* Carousel + Thumbnails */}
        <Col md={5}>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls
            interval={null}
            indicators={false}
            ref={carouselRef}
          >
            {product.images?.map((img, idx) => (
              <Carousel.Item key={idx}>
                <Image src={img} fluid rounded style={{ height: "400px", objectFit: "cover" }} />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="d-flex justify-content-center mt-3 flex-wrap gap-2">
            {product.images?.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                thumbnail
                style={{
                  width: "70px",
                  height: "70px",
                  cursor: "pointer",
                  border: index === idx ? "2px solid black" : "2px solid transparent",
                }}
                onClick={() => setIndex(idx)}
              />
            ))}
          </div>
        </Col>

        {/* Product Details */}
        <Col md={7}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4>
            ₹{product.price} <small className="text-danger">-{product.discountPercentage}%</small>
          </h4>
          <p>{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>

          {/* Add to Cart / Quantity */}
          <div className="mt-4">
            {!cartItem ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
              >
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>
            ) : (
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="outline-danger"
                  onClick={() => dispatch(decrementQuantity(product.id))}
                >
                  -
                </Button>
                <span className="fw-bold">{cartItem.quantity}</span>
                <Button
                  variant="outline-success"
                  onClick={() => dispatch(incrementQuantity(product.id))}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
