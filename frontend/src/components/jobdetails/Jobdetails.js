import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Jobdetails({jobList}) {
  const { id } = useParams();
  
  const idjob = id;
  const oferta = jobList.find((oferta) => oferta.id.toString() === idjob);
  return (
    <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card className="mb-4" key={oferta.id}>
              <Card.Body>
                <Card.Title>{oferta.title}</Card.Title>
                <Card.Text>{oferta.description}</Card.Text>
                <Card.Text>{oferta.requirements}</Card.Text>
                <Card.Text>{oferta.salary}</Card.Text>
                <Button  className='mr-2' variant="dark" href="/">Regresar</Button>
                <Button className='ml-2' variant="dark"  href={`/AplicantForm/${id}`}>Postularse</Button>
              </Card.Body>
            </Card>
          </Col>

      </Row>

    </Container>
  );
};

export default Jobdetails;
