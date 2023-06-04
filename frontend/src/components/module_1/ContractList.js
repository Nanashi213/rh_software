import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { TokenContext } from '../../TokenContext';

function ContractList() {
  const {token} = useContext(TokenContext);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios({
        method: "GET",
        url: "http://localhost:5000/candidates/has_test",
        headers: {
          Authorization: 'Bearer ' + token,
        },

    })
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);


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

              <Button variant="dark" href={`/main/hiring/${candidate.id}`}>

                Contractar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ContractList;
