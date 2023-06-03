import React, {useContext, useState}from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../../TokenContext';

const TestForm = () => {
  const token = useContext(TokenContext);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const { id } = useParams();
  const schema = yup.object().shape({
    candidate_id: yup.number().required('Campo obligatorio'),
    test_type: yup.string().required('Campo obligatorio'),
    test_date: yup.date().required('Campo obligatorio'),
    result: yup.string().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      candidate_id: id,
      test_type: '',
      test_date: '',
      result: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/test',
        data: {
          candidate_id: values.candidate_id, // Aquí es donde deberías enviar 'candidate_id'
          test_type: values.test_type,
          test_date: '2021-10-10',
          result: values.result
        },
      }).then((response) => {
        console.log(response.data);
        navigate('/main/candidates');
      }).catch((error) => {
        console.error(error);
      });}
      
  });

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
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>ID del candidato</Form.Label>
          <Form.Control
            type="number"
            name="candidate_id"
            value={formik.values.candidate_id}
            onChange={formik.handleChange}
            isInvalid={formik.touched.candidate_id && formik.errors.candidate_id}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.candidate_id}
          </Form.Control.Feedback>
        </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de prueba</Form.Label>
            <Form.Control
              type="text"
              name="test_type"
              value={formik.values.test_type}
              onChange={formik.handleChange}
              isInvalid={formik.touched.test_type && formik.errors.test_type}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.test_type}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de la prueba</Form.Label>
            <Form.Control
              type="date"
              name="test_date"
              value={formik.values.test_date}
              onChange={formik.handleChange}
              isInvalid={formik.touched.test_date && formik.errors.test_date}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.test_date}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resultado</Form.Label>
            <Form.Control
              type="text"
              name="result"
              value={formik.values.result}
              onChange={formik.handleChange}
              isInvalid={formik.touched.result && formik.errors.result}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.result}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='dark' type="submit">Enviar</Button>{' '}
          <Button variant="dark" href="/main/candidates">Regresar</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default TestForm;
