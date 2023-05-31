import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function CandidateDetails() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState({ id: 3, name: 'Bob', last_name: 'Smith',phone:'2312312', email: 'bob.smith@example.com', cv:'prueba.pdf', certificates:'prueba.pdf' ,status: 'Applied' });
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/candidates/${id}`)
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);



  if (!candidate) {
    return <div>Candidato no encontrado</div>;
  }

  return (
    <Container className='mt-3 mb-5'>
        <Row>
          <Col md={12} lg={12}>
            <Card className="mb-4" key={candidate.id}>
              <Card.Body>
                <Card.Title>{candidate.name}{'  '}{candidate.last_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
                <Card.Text>{candidate.email}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Teléfono</Card.Subtitle>
                <Card.Text>{candidate.phone}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Estado</Card.Subtitle>
                <Card.Text>{candidate.status}</Card.Text>
                {/*
                <Button variant="success" onClick={() => {}}>Aceptar</Button>
                <Button variant="danger" onClick={() => {}}>Rechazar</Button>
                */}
                <Button variant="dark" href="/main/candidates">Regresar</Button>
              </Card.Body>
            </Card>
            
            <h2>CV</h2>
            <div style={{ width: '100%', height: '50vh', overflow: 'auto' }}>
            <object
                data={`http://localhost:5000/ApplicantUploads/${candidate.cv}`}
                type="application/pdf"
                style={{ width: '100%', height: '100%' }}
              >
                <p>Si no aparece el PDF, <a href={`http://localhost:5000/ApplicantUploads/${candidate.cv}`}>click aqui para descargar.</a></p>
              </object>
            </div>


            <h2>Certificados</h2>
            <div style={{ width: '100%', height: '50vh', overflow: 'auto' }}>
              <object
                data={`http://localhost:5000/ApplicantUploads/${candidate.certificates}`}
                type="application/pdf"
                style={{ width: '100%', height: '100%' }}
              >
                <p>Si no aparece el PDF, <a href={`http://localhost:5000/ApplicantUploads/${candidate.certificates}`}>click aqui para descargar.</a></p>
              </object>
            </div>

          </Col>
      </Row>
    </Container>
  );
};

export default CandidateDetails;
