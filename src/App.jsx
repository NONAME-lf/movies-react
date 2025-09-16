import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router";

function App() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#">Movies App</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0">
            <NavLink to="/" className="me-3">
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
