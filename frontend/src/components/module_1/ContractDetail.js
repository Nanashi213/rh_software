import React, { useEffect, useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../../TokenContext.js';


function ContractDetail (){
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [candidate, setCandidate] = useState([]);

  useEffect(() => {
    axios({
      method:"GET",
      url: `http://localhost:5000/hiring/${id}`,
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    ).then(response => {
        setCandidate(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [id]);

  const schema = yup.object().shape({
    affiliation_type: yup.string().required('Campo obligatorio'),
    affiliation_date: yup.date().required('Campo obligatorio'),
    details: yup.string().required('Campo obligatorio'),
    salary: yup.number().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      affiliation_type: '',
      affiliation_date: '',
      details: '',
      salary: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
        method: "POST",
        url: "http://localhost:5000/create_contract_and_affiliation",
        data: {
          candidate_id: id,
          salary: values.salary,
          affiliation_type: values.affiliation_type,
          affiliation_date: '2021-10-10',
          details: values.details
        },
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.error('There was an error!', error);
      });
    changeStatus('HIRED')
    },
  });


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
    navigate('/main/hiring')
    console.log('Candidate status changed', response.data)
  }).catch((error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      alert(error.response.data.message)
      }
  })};


  const handleSubmit = (event) => {
    event.preventDefault();
    if (formik.isValid) {
      setValidated(true);
      formik.submitForm();
    } else {
      setValidated(false);
    }
  };

  

  return (
    <Row className="justify-content-center mt-4">
      <Col md={7}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{candidate.name} {candidate.lastName}</Card.Title>
            <Card.Text>Email: {candidate.email}</Card.Text>
            <Card.Text>Phone: {candidate.phone}</Card.Text>
            {candidate.tests && candidate.tests.map((test, index) => (
              <div key={index}>
                <Card.Text>Test ID: {test.id}</Card.Text>
                <Card.Text>Test Name: {test.test_type}</Card.Text>
                <Card.Text>Test Result: {test.result}</Card.Text>
              </div>
            ))}
          </Card.Body>
        </Card>

        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de afiliación</Form.Label>
            <Form.Control
              type="text"
              name="affiliation_type"
              value={formik.values.affiliation_type}
              onChange={formik.handleChange}
              isInvalid={formik.touched.affiliation_type && formik.errors.affiliation_type}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.affiliation_type}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de afiliación</Form.Label>
            <Form.Control
              type="date"
              name="affiliation_date"
              value={formik.values.affiliation_date}
              onChange={formik.handleChange}
              isInvalid={formik.touched.affiliation_date && formik.errors.affiliation_date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.affiliation_date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              type="text"
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              isInvalid={formik.touched.details && formik.errors.details}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.details}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salario</Form.Label>
            <Form.Control
              type="number"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              isInvalid={formik.touched.salary && formik.errors.salary}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.salary}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='success' type="submit">Enviar</Button>{' '}
          <Button variant="danger" onClick={() => changeStatus('REJECTED')}>Rechazar</Button>{'  '}
          <Button variant="dark" href="/main/hiring">Regresar</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ContractDetail;
