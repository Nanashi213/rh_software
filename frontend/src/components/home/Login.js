import React, { useState , useContext} from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../TokenContext';
import axios from "axios";

function LoginF() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setToken } = useContext(TokenContext);
  const [loginForm, setloginForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setEmailError('El campo de correo electrónico es obligatorio');
    }
    if (password === '') {
      setPasswordError('El campo de contraseña es obligatorio');
    }

    // Aquí puedes realizar la lógica de autenticación si todos los campos son válidos
    if (email !== '' && password !== '') {
      axios({
        method: "POST",
        url:"http://localhost:5000/token",
        data:{
          email: email,
          password: password
         }
      })
      .then((response) => {
        setToken(response.data.access_token);
        navigate('/main'); // Redirige al usuario a la página de perfil
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          alert("datos errados")}
      })
  
      setloginForm(({
        email: "",
        password: ""}))
  
    }
  };

 
  

  return (
    <>
      <Row>
        <Col md="4" className="d-flex align-items-center justify-content-center">
          <img src="https://via.placeholder.com/500x500" alt="placeholder" width={300} />
        </Col>
        <Col md="6" className="d-flex align-items-center">
          <Container className="mt-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  value={email}
                  onChange={handleEmailChange}
                  isInvalid={emailError !== ''}
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  isInvalid={passwordError !== ''}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="dark" type="submit" >
                Iniciar sesión
              </Button>
              <Button className="mr-2" type="submit" variant="dark" href="/">
                Regresar
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default LoginF;

