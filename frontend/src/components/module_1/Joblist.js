import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobOffersList() {
  const [jobOffers, setJobOffers] = useState([ ]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/job_offer",
    }).then((response) => {
      setJobOffers(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, []); // El array vacío como segundo argumento significa que este efecto se ejecutará una vez cuando el componente se monte.
  

  const deleteJobOffer = (jobOfferId) => {
    axios({
      method: "DELETE",
      url:`http://localhost:5000/job_offers/${jobOfferId}`,
  })
  .then((response) => {
    setJobOffers(jobOffers.filter(jobOffer => jobOffer.id !== jobOfferId))
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobOffers.map((jobOffer) => (
            <tr key={jobOffer.id}>
              <td>{jobOffer.id}</td>
              <td>{jobOffer.title}</td>
              <td>{new Date(jobOffer.publication_date).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" >Edit</Button>{' '}
                <Button variant="danger" onClick={() => deleteJobOffer(jobOffer.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default JobOffersList;
