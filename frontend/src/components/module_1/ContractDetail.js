import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function CandidateAffiliationForm (){
  const { id } = useParams();
  const [candidate, setCandidate] = useState({ id: 3, name: 'Bob', last_name: 'Smith',phone:'2312312', email: 'bob.smith@example.com', cv:'prueba.pdf', certificates:'prueba.pdf' ,status: 'Applied' });

  useEffect(() => {
    axios.get(`http://localhost:5000/hiring/${id}`)
      .then(response => {
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
      // Aquí puedes realizar las acciones de envío o llamadas a la API
      console.log(values);
    },
  });

  return (
    <Row className="justify-content-center mt-4">
      <Col md={7}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{candidate.name} {candidate.lastName}</Card.Title>
            <Card.Text>Email: {candidate.email}</Card.Text>
            <Card.Text>Phone: {candidate.phone}</Card.Text>
            <Card.Text>Test Result: {candidate.result}</Card.Text>
          </Card.Body>
        </Card>

        <Form onSubmit={formik.handleSubmit}>
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

          <Button variant='dark' type="submit">Enviar</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CandidateAffiliationForm;
