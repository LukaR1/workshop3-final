import {Container, Nav} from "react-bootstrap";
import {Outlet, Link} from "react-router-dom";


export default function App() {
  return (
    <Container fluid>
      <header className="border border-1">
          <Nav
            activeKey="/"
          >
            <Nav.Item>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav.Item>
              <Nav.Item>
                  <Nav.Link as={Link} to="/student">Student</Nav.Link>
              </Nav.Item>

          </Nav>
      </header>
        <Outlet/>
        <footer className="p-5 bg-black bg-opacity-10 text-center">
            Footer
        </footer>
    </Container>
  );
}


