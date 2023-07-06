import React, { useState } from 'react';
import { Col, Dropdown, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  }

  return (
    <> 
      <Button onClick={toggleSidebar} variant='dark' className='rounded-0'>
          {isHidden ? "Mostrar Menu" : "Ocultar Menu"}
      </Button>
      <Col xs={2}>
        <div  fixed='start'  className={`ps-3 pe-3 overflow-auto vh-100 bg-dark text-white d-flex flex-column justify-content-center align-items-center ${isHidden ? 'd-none' : ''}`}>
          <Dropdown >
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Modulo 1 
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark text-white">
              <Dropdown.Item as={Link} to="/main/joboffers" className="text-white">Ofertas de trabajo</Dropdown.Item>
              <Dropdown.Item as={Link} to="/main/candidates" className="text-white">Candidatos</Dropdown.Item>
              <Dropdown.Item as={Link} to="/main/hiring" className="text-white">Contratación</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Modulo 2
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark text-white">
              <Dropdown.Item as={Link} to="/option2-1" className="text-white">Option 2-1</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option2-2" className="text-white">Option 2-2</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option2-3" className="text-white">Option 2-3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Modulo 3
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark text-white">
              <Dropdown.Item as={Link} to="/option3-1" className="text-white">Option 3-1</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option3-2" className="text-white">Option 3-2</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option3-3" className="text-white">Option 3-3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Modulo 4
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-dark text-white">
              <Dropdown.Item as={Link} to="/option4-1" className="text-white">Option 4-1</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option4-2" className="text-white">Option 4-2</Dropdown.Item>
              <Dropdown.Item as={Link} to="/option4-3" className="text-white">Option 4-3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    </>
  );
}

export default Sidebar;
