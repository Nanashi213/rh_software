import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { TokenContext } from '../../TokenContext.js';

function CandidateList() {
  const { token } = useContext(TokenContext);
  const [candidates, setCandidates] = useState([]);


  useEffect(() => {
    axios({
        method: "GET",
        url: "http://localhost:5000/candidates/applied",
        headers: {
          Authorization: 'Bearer ' + token
        },
    }).then((response) => {
      setCandidates(response.data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }, [token]); // El array vacío como segundo argumento significa que este efecto se ejecutará una vez cuando el componente se monte.
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map(candidate => (
          <tr key={candidate.id}>
            <td>{candidate.id}</td>
            <td>{candidate.name}</td>
            <td>{candidate.last_name}</td>
            <td>{candidate.email}</td>
            <td>{candidate.status}</td>
            <td>
              <Button variant="dark" href={`/main/candidates/${candidate.id}`}>
                Ver detalles
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CandidateList;
