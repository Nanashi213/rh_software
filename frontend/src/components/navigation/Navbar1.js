import { useState, React} from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../../styles/Navbar.css';
import icono from "../../assets/icono.png";
import 'bootstrap/dist/css/bootstrap.min.css';


function NavigationBar (){
  const [loggedIn, setLoggedIn] = useState(false);
  const userName = "Usuario";

  return (
    <Navbar expand="lg" bg="light" className="navigation-bar" fixed='top'>
      <Container>
        <Navbar.Brand href="http://localhost:3000/"  className="rh-software">
          <img  src={icono} alt="Icono" className="icono" />
          {' '}
          RH_SOFTWARE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {loggedIn ? (
              <Navbar.Text>Hola usuario: {userName}</Navbar.Text>
            ) : (
              <>

                <Button  href={`/login`} variant="outline-dark"  className="login-btn">Login</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default NavigationBar;
