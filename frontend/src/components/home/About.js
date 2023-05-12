import { Container, Row, Col } from 'react-bootstrap';
import home_about from "../../assets/home_about.png";

function Body (){
  return (
    <Container className="mt-5 text-justify" id='about' >
      <Row>
        <Col md={6}>
          <h2>Acerca de RH_SOFTWARE</h2>
          <p className='text-justify'>RH_SOFTWARE es una plataforma integral de gestión de talento humano que ofrece soluciones eficientes y personalizadas para facilitar los procesos de contratación, administración del personal, control de nómina y liquidación, y concientización del personal en empresas de diversos sectores.</p>
          <p className='text-justify'>Nuestra misión es brindar herramientas intuitivas y fáciles de usar para agilizar las tareas relacionadas con la gestión del talento humano y ayudar a las empresas a centrarse en el crecimiento y desarrollo de sus empleados, lo que a su vez conduce a un mejor rendimiento organizacional y al éxito empresarial.</p>        
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center">
        <img src={home_about} width={300}  alt="Imagen de about us" className="img-fluid align-items-center" />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
