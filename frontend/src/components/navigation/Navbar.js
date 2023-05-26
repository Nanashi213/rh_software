import {React, useContext} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../../styles/Navbar.css';
import icono from "../../assets/icono.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TokenContext } from '../../TokenContext.js';
import axios from "axios";

function NavigationBar (){
  const { token,removeToken } = useContext(TokenContext);
  const location = useLocation();

  const navigate = useNavigate();
  function logMeOut() {
    axios({
      method: "POST",
      url:"http://localhost:5000/logout",
    })
    .then((response) => {
       removeToken();
       navigate('/');
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
    return (
      <Navbar expand="lg" bg="light" className="navigation-bar" >
        <Container>
          {token !== null ? (
          <>
          <Navbar.Brand href="http://localhost:3000/main"  className="rh-software">
            <img  src={icono} alt="Icono" className="icono" />
            {' '}
            RH_SOFTWARE
          </Navbar.Brand>
          </>
          ):(
            <Navbar.Brand href="http://localhost:3000/"  className="rh-software">
            <img  src={icono} alt="Icono" className="icono" />
            {' '}
            RH_SOFTWARE
          </Navbar.Brand>
          )
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {token !== null ? (
                <>
                <Navbar.Text className="m-2">Hola usuario</Navbar.Text>          
                <Button variant="outline-dark" onClick={logMeOut} className="login-btn">LogOut</Button>
                </>
              ):(
                <>               
              {location.pathname === '/' && (
                <>
                <Nav.Link onClick={() => handleScrollTo('ofertas')} className="nav-item">Ofertas laborales</Nav.Link>
                <Nav.Link onClick={() => handleScrollTo('about')} className="nav-item">Acerca de Nosotros</Nav.Link>
                </>
                )}
                <Button  href={`/login`} variant="outline-dark"  className="login-btn">Login</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavigationBar;
