import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../../TokenContext.js';


function CandidateDetails() {
  const { token } = useContext(TokenContext);
  const { id } = useParams();

  const [candidate, setCandidate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      
        method: "GET",
        url: `http://localhost:5000/candidate/${id}`,
        headers: {
          Authorization: 'Bearer ' + token
        },
    })
      .then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id, token]);

  const changeStatus = (status) => {
    axios({
      method: "PUT",
      url:`http://localhost:5000//candidate/status/${id}`,
      data: {
        status: status
        },
      headers: {
        Authorization: 'Bearer ' + token
    }
  })
  .then((response) => {
    navigate('/main/candidates')
    console.log('Candidate status changed', response.data)
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      alert(error.response.data.message)
      }
  })};

  if (!candidate) {
    return <div>Candidato no encontrado</div>;
  }

  return (
    <Container className='mt-3 mb-5'>
        <Row>
          <Col md={12} lg={12}>
            <Card className="mb-4" key={candidate.id}>
              <Card.Body>
                <Card.Title>Información del Candidato</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Nombre</Card.Subtitle>
                <Card.Text>{candidate.name}{' '}{candidate.last_name}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Cedula</Card.Subtitle>
                <Card.Text>{candidate.id_card}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
                <Card.Text>{candidate.email}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Teléfono</Card.Subtitle>
                <Card.Text>{candidate.phone}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Estado</Card.Subtitle>
                <Card.Text>{candidate.status}</Card.Text>
                
                <Button variant="success" onClick={() => changeStatus('ACCEPTED')}>Aceptar</Button>{' '}
                <Button variant="danger" onClick={() => changeStatus('REJECTED')}>Rechazar</Button>{' '}
                
                <Button variant="dark" href="/main/candidates">Regresar</Button>
              </Card.Body>
            </Card>
            
            <h2>CV</h2>
            <div style={{ width: '100%', height: '100vh', overflow: 'auto' }}>
            <object
                data={`http://localhost:5000/ApplicantUploads/${candidate.cv}`}
                type="application/pdf"
                style={{ width: '100%', height: '100vh', overflow: 'auto' }}
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
