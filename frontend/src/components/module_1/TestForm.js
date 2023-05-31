import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const TestForm = () => {
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
      // Aquí puedes realizar las acciones de envío o llamadas a la API
      console.log(values);
    },
  });

  return (
    <Row className="justify-content-center mt-4">
      <Col md={7}>
        <Form onSubmit={formik.handleSubmit}>
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
