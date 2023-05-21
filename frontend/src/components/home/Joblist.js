import {Container, Row, Col,Card,Button} from 'react-bootstrap';

function JobList({jobLists}) {

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" id='ofertas'>Ofertas de trabajo</h1>
      <Row>
      {jobLists.map((jobOffer) => (
        <Col md={6} lg={4} key={jobOffer.id}>
        <Card className="mb-4">
        <Card.Body>
          <Card.Title>{jobOffer.title}</Card.Title>
          <Card.Text>{jobOffer.description}</Card.Text>
          <Button variant="dark" href={`/jobs/${jobOffer.id}`}>
            Ver más detalles
          </Button>
        </Card.Body>
      </Card>
        </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList;
