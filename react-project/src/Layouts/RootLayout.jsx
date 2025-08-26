// import { Container, Row, Col, Navbar, Nav, Badge, Button } from "react-bootstrap";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Store/Slice/AuthSlice";
// import { toggleTheme } from "../Store/Slice/ThemeSlice";
// import { FaSun, FaMoon, FaShoppingCart, FaHeart, FaUser, FaUserPlus } from "react-icons/fa";

// const RootLayout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


// const cartItems = useSelector((state) => state.cart); 
// const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
// const { isLoggedIn } = useSelector((state) => state.auth);
// const { theme } = useSelector((state) => state.theme);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const pageClass =
//     theme === "dark"
//       ? "bg-dark text-light min-vh-100"
//       : "bg-light text-dark min-vh-100";

//   const navbarClass =
//     theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";

//   return (
//     <div className={pageClass}>
//       <Container fluid>
//         <Row>
//           <Col md={12}>
//             <Navbar expand="lg" className={navbarClass}>
//               <Container fluid>
//                 <Navbar.Brand as={NavLink} to={"/"} className="fw-bold">
//                   INDITRONICS
//                 </Navbar.Brand>

//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="navbarScroll">
//                   <Nav className="me-auto my-2 my-lg-0" navbarScroll>
//                     <NavLink
//                       to={"/products"}
//                       className={({ isActive }) =>
//                         `px-3 nav-link ${
//                           isActive
//                             ? "text-primary fw-bold"
//                             : theme === "dark"
//                             ? "text-light"
//                             : "text-dark"
//                         }`
//                       }
//                     >
//                       Products Category
//                     </NavLink>
//                   </Nav>

//                   <div className="d-flex align-items-center">
//                     {/* Theme toggle */}
//                     <Button
//                       variant={theme === "dark" ? "light" : "dark"}
//                       className="me-3"
//                       onClick={() => dispatch(toggleTheme())}
//                     >
//                       {theme === "dark" ? (
//                         <>
//                           <FaSun className="me-1" /> Light
//                         </>
//                       ) : (
//                         <>
//                           <FaMoon className="me-1" /> Dark
//                         </>
//                       )}
//                     </Button>

//                     {isLoggedIn ? (
//                       <>
//                         {/* Account */}
//                         <NavLink
//                           to="/account"
//                           className="btn btn-outline-primary me-2 d-flex align-items-center"
//                         >
//                           <FaUser className="me-1" /> Account
//                         </NavLink>

//                         {/* Cart */}
//                         <NavLink
//                           to="/cart"
//                           className="btn btn-outline-primary me-2 d-flex align-items-center"
//                         >
//                           <FaShoppingCart className="me-1" /> Cart
//                           <Badge bg="secondary" className="ms-1">
//                             {cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
//                           </Badge>
//                         </NavLink>

//                         {/* Wishlist */}
//                         <NavLink
//                           to="/wishlist"
//                           className="btn btn-outline-primary me-2 d-flex align-items-center"
//                         >
//                           <FaHeart className="me-1 text-danger" /> Wishlist
//                           <Badge bg="secondary" className="ms-1">
//                             {wishlistItems.length}
//                           </Badge>
//                         </NavLink>

//                         {/* Logout */}
//                         <Button variant="outline-danger" onClick={handleLogout}>
//                           Logout
//                         </Button>
//                       </>
//                     ) : (
//                       <>
//                         {/* Register */}
//                         <Button
//                           variant="outline-info"
//                           onClick={() => navigate("/register")}
//                           className="me-2 d-flex align-items-center"
//                         >
//                           <FaUserPlus className="me-1" /> Register
//                         </Button>

//                         {/* Login */}
//                         <Button
//                           variant="outline-success"
//                           onClick={() => navigate("/login")}
//                           className="d-flex align-items-center"
//                         >
//                           <FaUser className="me-1" /> Login
//                         </Button>
//                       </>
//                     )}
//                   </div>
//                 </Navbar.Collapse>
//               </Container>
//             </Navbar>
//           </Col>
//         </Row>

//         <Container className="mt-4">
//           <Outlet />
//         </Container>
//       </Container>
//     </div>
//   );
// };

// export default RootLayout;





import { Container, Row, Col, Navbar, Nav, Badge, Button } from "react-bootstrap";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/Slice/AuthSlice";
import { toggleTheme } from "../Store/Slice/ThemeSlice";
import {
  FaSun,
  FaMoon,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-body text-body min-vh-100">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
              <Container fluid>
                <Navbar.Brand as={NavLink} to={"/"} className="fw-bold">
                  INDITRONICS
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                    <NavLink
                      to={"/products"}
                      className={({ isActive }) =>
                        `px-3 nav-link ${isActive ? "text-primary fw-bold" : ""}`
                      }
                    >
                      Products Category
                    </NavLink>
                  </Nav>

                  <div className="d-flex align-items-center">
                    {/* Theme toggle */}
                    <Button
                      variant={theme === "dark" ? "light" : "dark"}
                      className="me-3"
                      onClick={() => dispatch(toggleTheme())}
                    >
                      {theme === "dark" ? (
                        <>
                          <FaSun className="me-1" /> Light
                        </>
                      ) : (
                        <>
                          <FaMoon className="me-1" /> Dark
                        </>
                      )}
                    </Button>

                    {isLoggedIn ? (
                      <>
                        {/* Account */}
                        <NavLink
                          to="/account"
                          className="btn btn-outline-primary me-2 d-flex align-items-center"
                        >
                          <FaUser className="me-1" /> Account
                        </NavLink>

                        {/* Cart */}
                        <NavLink
                          to="/cart"
                          className="btn btn-outline-primary me-2 d-flex align-items-center"
                        >
                          <FaShoppingCart className="me-1" /> Cart
                          <Badge bg="secondary" className="ms-1">
                            {cartItems.reduce(
                              (acc, item) => acc + (item.quantity || 1),
                              0
                            )}
                          </Badge>
                        </NavLink>

                        {/* Wishlist */}
                        <NavLink
                          to="/wishlist"
                          className="btn btn-outline-primary me-2 d-flex align-items-center"
                        >
                          <FaHeart className="me-1 text-danger" /> Wishlist
                          <Badge bg="secondary" className="ms-1">
                            {wishlistItems.length}
                          </Badge>
                        </NavLink>

                        {/* Logout */}
                        <Button variant="outline-danger" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Register */}
                        <Button
                          variant="outline-info"
                          onClick={() => navigate("/register")}
                          className="me-2 d-flex align-items-center"
                        >
                          <FaUserPlus className="me-1" /> Register
                        </Button>

                        {/* Login */}
                        <Button
                          variant="outline-success"
                          onClick={() => navigate("/login")}
                          className="d-flex align-items-center"
                        >
                          <FaUser className="me-1" /> Login
                        </Button>
                      </>
                    )}
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>

        <Container className="mt-4">
          <Outlet />
        </Container>
      </Container>
    </div>
  );
};

export default RootLayout;
