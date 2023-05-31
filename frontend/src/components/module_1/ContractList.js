import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function CandidateList() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'John', last_name: 'Doe', email: 'john.doe@example.com', status: 'Applied' },
    { id: 2, name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', status: 'Applied' },
    { id: 3, name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com', status: 'Applied' },
    { id: 3, name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com', status: 'Applied' },
  ]);

  {/*       SOLICITUDES A LA API CON ESTADO ACCEPTED
  useEffect(() => {
    axios({
        method: "GET",
        url: "http://localhost:5000/candidate",
        
    })
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  */}

  {/*       SOLICITUDES A LA API PARA ASIGNAR UNA PRUEBA
  
  */}
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
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
            <td>
              <Button variant="dark" >{/*Boton par asignar prueba */}
                Asginar prueba
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CandidateList;
