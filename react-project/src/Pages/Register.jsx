import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../Store/Slice/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, registered } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",       
    mobile: "",
    password: "",
    address: "",     
    rememberMe: false,
  });

  useEffect(() => {
    if (registered) {
      navigate("/login");
    }
  }, [registered, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: form.firstName + " " + form.lastName,
      email: form.email,   
      mobile: form.mobile,
      password: form.password,
      address: form.address,   
      rememberMe: form.rememberMe,
    };

    dispatch(registerUser(payload));
  };

  const isFormValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&   
    form.mobile.trim() &&
    form.password.trim() &&
    form.address.trim();     

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Card className="p-4 shadow">
        <h3 className="text-center mb-4">
          <FaUserPlus className="me-2" />
          Register
        </h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="firstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="mobile" className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
            <Form.Text className="text-muted">
              Enter 10-digit mobile number.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
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

          <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
            Register
          </Button>
        </Form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
