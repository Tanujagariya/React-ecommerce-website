import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaStar, FaTags, FaFire, FaBoxOpen } from "react-icons/fa";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=4");
        const data = await res.json();
        setTrendingProducts(data.products);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>

      <div className="bg-primary text-white text-center p-5 rounded mb-4">
        <h1>
          <FaFire className="me-2" />
          Welcome to INDITRONICS
        </h1>
        <p className="lead">Discover the best products at amazing prices!</p>
        <NavLink to="/products" className="text-decoration-none">
          <Button variant="light" size="lg">
            <FaShoppingCart className="me-2" />
            Shop Now
          </Button>
        </NavLink>
      </div>

      <Container>
    
        <h3 className="mb-3">
          <FaTags className="me-2 text-primary" />
          Featured Categories
        </h3>
        <Row className="mb-4">
          {["electronics", "fashion", "beauty", "home"].map((cat, idx) => (
            <Col md={3} key={idx}>
              <NavLink to={`/products/category/${cat}`} className="text-decoration-none">
                <Card className="text-center p-3 h-100 shadow-sm border-0">
                  <Card.Body>
                    <FaBoxOpen size={40} className="mb-3 text-primary" />
                    <Card.Title className="text-capitalize">{cat}</Card.Title>
                    <Card.Text>Explore {cat} products</Card.Text>
                    <Button variant="primary" size="sm">
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          ))}
        </Row>

 
        <h3 className="mb-3">
          <FaFire className="me-2 text-danger" />
          Trending Products
        </h3>
        <Row>
          {trendingProducts.map((product) => (
            <Col md={3} key={product.id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <NavLink to={`/products/${product.id}`} className="text-decoration-none text-dark">
                  <Card.Img
                    variant="top"
                    src={product.thumbnail}
                    height={180}
                    style={{ objectFit: "cover" }}
                    alt={product.title}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      <strong>₹{product.price}</strong>{" "}
                      <Badge bg="success" className="ms-2">
                        {product.rating.toFixed(1)} <FaStar />
                      </Badge>
                    </Card.Text>
                  </Card.Body>
                </NavLink>
                <Card.Footer className="bg-white border-0">
                  <Button variant="success" className="w-100">
                    <FaShoppingCart className="me-2" />
                    Buy Now
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
