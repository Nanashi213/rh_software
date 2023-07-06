import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TokenContext } from '../../TokenContext.js';


function JobOffersList() {
  const { token } = useContext(TokenContext);
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
      url:`http://localhost:5000/job_offer/${jobOfferId}`,
      headers: {
        Authorization: 'Bearer ' + token
      } ,
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
    <Container className='justify-content-center'>
      <h1 className='mb-3'>Ofertas de trabajo </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Fecha de publicación</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {jobOffers.map((jobOffer) => (
            <tr key={jobOffer.id}>
              <td>{jobOffer.id}</td>
              <td>{jobOffer.title}</td>
              <td>{new Date(jobOffer.publication_date).toLocaleDateString()}</td>
              <td>
                <Button variant="dark" href={`/main/joboffers/${jobOffer.id}`}>Ver detalles</Button>{' '}
                <Button variant="dark" onClick={() => deleteJobOffer(jobOffer.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default JobOffersList;
