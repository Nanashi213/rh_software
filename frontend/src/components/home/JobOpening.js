import {Card, Button } from 'react-bootstrap';

function JobOpenings({jobOffer}) {

  return (
 
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{jobOffer.title}</Card.Title>
          <Card.Text>{jobOffer.description}</Card.Text>
          <Button variant="dark" href={`/jobs/${jobOffer.id}`}>
            Ver más detalles
          </Button>
        </Card.Body>
      </Card>

  );
};

export default JobOpenings;
