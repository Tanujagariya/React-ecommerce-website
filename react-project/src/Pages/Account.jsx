// import React, { useState } from "react";
// import { Accordion, Container, Form, Button } from "react-bootstrap";
// import {
//   FaUser,
//   FaLock,
//   FaHome,
//   FaClipboardList,
//   FaHeart,
//   FaShoppingCart,
// } from "react-icons/fa";

// const MyAccount = () => {
//   const [activeKey, setActiveKey] = useState(null);

 
//   const [user, setUser] = useState({
//     name: "Tanuja Gariya ",
//     email: "gariyatanu68@gmail.com",
//     address: "Thaskurdwara Bageshwar UK 263642, India",
//   });

 
//   const [cart] = useState([
//     { id: 1, name: "Product 1" },
//     { id: 2, name: "Product 2" },
//   ]);
//   const [wishlist] = useState([
//     { id: 1, name: "Wishlist Item 1" },
//     { id: 2, name: "Wishlist Item 2" },
//   ]);
//   const [orders] = useState([
//     { id: 1, description: "Order #1 - Delivered" },
//     { id: 2, description: "Order #2 - Processing" },
//   ]);

//   const toggleAccordion = (key) => {
//     setActiveKey(activeKey === key ? null : key);
//   };

//   return (
//     <Container className="mt-5">
//       <h3 className="text-center text-primary mb-4">My Account</h3>
//       <Accordion activeKey={activeKey}>
//         {/* Account Info */}
//         <Accordion.Item eventKey="0">
//           <Accordion.Header onClick={() => toggleAccordion("0")}>
//             <FaUser className="me-2 text-primary" /> Account Information
//           </Accordion.Header>
//           <Accordion.Body>
//             {user ? (
//               <>
//                 <p>
//                   <b>Name:</b> {user.name}
//                 </p>
//                 <p>
//                   <b>Email:</b> {user.email}
//                 </p>
//               </>
//             ) : (
//               <p>No user data available.</p>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>

//         {/* Change Password */}
//         <Accordion.Item eventKey="1">
//           <Accordion.Header onClick={() => toggleAccordion("1")}>
//             <FaLock className="me-2 text-warning" /> Change Password
//           </Accordion.Header>
//           <Accordion.Body>
//             {/* Simple change password form */}
//             <Form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 alert("Password update feature not implemented.");
//               }}
//             >
//               <Form.Group className="mb-3" controlId="currentPassword">
//                 <Form.Label>Current Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter current password"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="newPassword">
//                 <Form.Label>New Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter new password"
//                 />
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="confirmPassword">
//                 <Form.Label>Confirm New Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Confirm new password"
//                 />
//               </Form.Group>
//               <Button variant="primary" type="submit">
//                 Update Password
//               </Button>
//             </Form>
//           </Accordion.Body>
//         </Accordion.Item>

//         {/* Address */}
//         <Accordion.Item eventKey="2">
//           <Accordion.Header onClick={() => toggleAccordion("2")}>
//             <FaHome className="me-2 text-success" /> Address
//           </Accordion.Header>
//           <Accordion.Body>
//             {user?.address ? (
//               <p>{user.address}</p>
//             ) : (
//               <p>No address available.</p>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>

//         {/* Orders */}
//         <Accordion.Item eventKey="3">
//           <Accordion.Header onClick={() => toggleAccordion("3")}>
//             <FaClipboardList className="me-2 text-primary" /> Orders
//           </Accordion.Header>
//           <Accordion.Body>
//             {orders && orders.length > 0 ? (
//               <ul>
//                 {orders.map((order) => (
//                   <li key={order.id}>
//                     {order.description || `Order #${order.id}`}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No orders yet.</p>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>

//         {/* Wishlist */}
//         <Accordion.Item eventKey="4">
//           <Accordion.Header onClick={() => toggleAccordion("4")}>
//             <FaHeart className="me-2 text-danger" /> Wishlist
//           </Accordion.Header>
//           <Accordion.Body>
//             {wishlist && wishlist.length > 0 ? (
//               <ul>
//                 {wishlist.map((item) => (
//                   <li key={item.id}>{item.name}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Your wishlist is empty.</p>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>

//         {/* Cart */}
//         <Accordion.Item eventKey="5">
//           <Accordion.Header onClick={() => toggleAccordion("5")}>
//             <FaShoppingCart className="me-2 text-success" /> Cart
//           </Accordion.Header>
//           <Accordion.Body>
//             {cart && cart.length > 0 ? (
//               <ul>
//                 {cart.map((item) => (
//                   <li key={item.id}>{item.name}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p>Your cart is empty.</p>
//             )}
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//     </Container>
//   );
// };

// export default MyAccount;
import React, { useState } from "react";
import { Accordion, Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import {
  FaUser,
  FaLock,
  FaHome,
  FaClipboardList,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import profileImage from "../assets/tannu.jpeg";

const MyAccount = () => {
  const [activeKey, setActiveKey] = useState(null);

  const [user, setUser] = useState({
    name: "Tanuja Gariya",
    email: "gariyatanu68@gmail.com",
    address: "Thakurdwara Bageshwar UK 263642, India",
    profilePic: profileImage, 
  });

  const [isEditing, setIsEditing] = useState(false);

  const [cart] = useState([
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ]);
  const [wishlist] = useState([
    { id: 1, name: "Wishlist Item 1" },
    { id: 2, name: "Wishlist Item 2" },
  ]);
  const [orders] = useState([
    { id: 1, description: "Order #1 - Delivered" },
    { id: 2, description: "Order #2 - Processing" },
  ]);

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <Container className="mt-5">
      <Card className="mb-4 shadow-sm border-0">
        <Row className="align-items-center p-3">
          <Col xs={3} md={2}>
            <img
              src={user.profilePic}
              alt="Profile"
              className="img-fluid rounded-circle border"
            />
          </Col>
          <Col>
            {isEditing ? (
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" type="submit" size="sm">
                  Save
                </Button>{" "}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <h5 className="mb-1">{user.name}</h5>
                <p className="mb-0 text-muted">{user.email}</p>
                <small className="text-secondary">{user.address}</small>
              </>
            )}
          </Col>
          <Col xs="auto">
            {!isEditing && (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Col>
        </Row>
      </Card>

      <h3 className="text-center text-primary mb-4">My Account</h3>

      <Accordion activeKey={activeKey}>
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => toggleAccordion("0")}>
            <FaUser className="me-2 text-primary" /> Account Information
          </Accordion.Header>
          <Accordion.Body>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header onClick={() => toggleAccordion("1")}>
            <FaLock className="me-2 text-warning" /> Change Password
          </Accordion.Header>
          <Accordion.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Password update feature not implemented.");
              }}
            >
              <Form.Group className="mb-3" controlId="currentPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control type="password" placeholder="Enter current password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Password
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header onClick={() => toggleAccordion("2")}>
            <FaHome className="me-2 text-success" /> Address
          </Accordion.Header>
          <Accordion.Body>
            <p>{user.address}</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header onClick={() => toggleAccordion("3")}>
            <FaClipboardList className="me-2 text-primary" /> Orders
          </Accordion.Header>
          <Accordion.Body>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>{order.description}</li>
                ))}
              </ul>
            ) : (
              <p>No orders yet.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header onClick={() => toggleAccordion("4")}>
            <FaHeart className="me-2 text-danger" /> Wishlist
          </Accordion.Header>
          <Accordion.Body>
            {wishlist.length > 0 ? (
              <ul>
                {wishlist.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header onClick={() => toggleAccordion("5")}>
            <FaShoppingCart className="me-2 text-success" /> Cart
          </Accordion.Header>
          <Accordion.Body>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MyAccount;
