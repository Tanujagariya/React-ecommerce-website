import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Store/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    dispatch(login({ email: form.email, password: form.password, rememberMe: form.rememberMe }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={5} xl={4}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-4">
              <FaUser className="me-2" />
              Login
            </h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="rememberMe" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
