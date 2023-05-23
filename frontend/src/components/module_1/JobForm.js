import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';


const Job_offer_form = () => {
  const [validated, setValidated] = useState(false);

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript comienzan desde 0
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  console.log(formattedDate);
  const schema = yup.object().shape({
    title: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
    requirements: yup.string().required('Campo obligatorio'),
    publication_date: yup.date().required('Campo obligatorio'),
    vacancies: yup.number().required('Campo obligatorio'),
    salary: yup.number().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      requirements: '',
      publication_date: formattedDate,
      vacancies: 0,
      salary: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Aquí puedes realizar las acciones de envío o llamadas a la API
      console.log(values);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    formik.handleSubmit(event);

    if (formik.isValid) {
      setValidated(true);
      formik.submitForm();
    } else {
      setValidated(false);
    }
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="3">
              Titulo
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="3">
              Descripción
            </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.description && formik.errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.description}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="3">
              Requisitos
            </Form.Label>
            <Col sm="8">
              <InputGroup hasValidation>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="requirements"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.requirements && formik.errors.requirements}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.requirements}
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="3">
              Vacantes
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                name="vacancies"
                value={formik.values.vacancies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.vacancies && formik.errors.vacancies}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.vacancies}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-1">
            <Form.Label column sm="3">
              Salario
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                name="salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.salary && formik.errors.vacancies}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.salary}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Button variant='dark' type="submit">Enviar</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Job_offer_form;
