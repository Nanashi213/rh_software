import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';


{/* 
La primera parte que reciba la información del candidato (nombre apellido , telefono, email )y la muestre en pantalla con un Card incluyendo el 
resultado de la prueba

Despues un formulario para la afiliacion  y tambien con el salario del candidato

class Affiliation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    affiliation_type = db.Column(db.String(80), nullable=False)
    affiliation_date = db.Column(db.DateTime, nullable=False)
    details = db.Column(db.String(120), nullable=False)


*/}

const CandidateAffiliationForm = ({ candidate }) => {
  const schema = yup.object().shape({
    affiliation: yup.string().required('Campo obligatorio'),
    // Agrega aquí más campos si es necesario
  });

  const formik = useFormik({
    initialValues: {
      affiliation: '',
      // Inicializa aquí más campos si es necesario
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
            <Card.Title>{candidate.name}</Card.Title>
            <Card.Text>Email: {candidate.email}</Card.Text>
            <Card.Text>Phone: {candidate.phone}</Card.Text>
            <Card.Text>Status: {candidate.status}</Card.Text>
          </Card.Body>
        </Card>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Afiliación</Form.Label>
            <Form.Control
              type="text"
              name="affiliation"
              value={formik.values.affiliation}
              onChange={formik.handleChange}
              isInvalid={formik.touched.affiliation && formik.errors.affiliation}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.affiliation}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Agrega aquí más campos de formulario si es necesario */}

          <Button variant='dark' type="submit">Enviar</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default CandidateAffiliationForm;
