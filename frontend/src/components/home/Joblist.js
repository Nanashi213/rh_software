import {Container, Row, Col} from 'react-bootstrap';
import JobOpenings from './JobOpening.js';


function JobList({jobLists}) {


  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" id='ofertas'>Ofertas de trabajo</h1>
      <Row>
      {jobLists.map((jobOffers) => (
        <Col md={6} lg={4} key={jobOffers.id}>
        <JobOpenings jobOffer={jobOffers} />
        </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList;
