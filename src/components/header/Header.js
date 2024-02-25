import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container className='nav_container'>
        <Navbar.Brand>
          <Link to="/" className='logo'>Task Master</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
       
          {localStorage.getItem("userInfo") !== null && (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

              <NavDropdown
                title={JSON.parse(localStorage.getItem("userInfo")).name}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item>
                  <Link to='/mynotes'>My Tasks</Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    // console.log(localStorage.getItem("userInfo"));
                    // const x = JSON.parse(localStorage.getItem("userInfo"));
                    // console.log(x);
                    localStorage.removeItem("userInfo");
                    localStorage.removeItem("noteId");
                    // console.log(localStorage.getItem("userInfo"));
                    navigate("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header