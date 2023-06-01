import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';


const ApliForm = () => {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    offer_id: yup.number().required('Campo obligatorio'),
    firstName: yup.string().required('Campo obligatorio'),
    lastName: yup.string().required('Campo obligatorio'),
    cedula: yup.number().required('Campo obligatorio'),
    email: yup.string().email('Email inválido').required('Campo obligatorio'),
    phonenumber: yup.number().required('Campo obligatorio'),
    CV: yup.mixed().required('Campo obligatorio'),
    certificates: yup.mixed().nullable(),
    terms: yup.bool().oneOf([true], 'Debe aceptar los términos y condiciones').required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      offer_id: id,
      firstName: '',
      lastName: '',
      cedula: '',
      email: '',
      phonenumber: '',
      CV: null,
      certificates: null,
      terms: false,
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
      <Col md={7}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
          <Form.Label>ID de la oferta</Form.Label>
          <Form.Control
            type="number"
            name="offer_id"
            value={formik.values.offer_id}
            onChange={formik.handleChange}
            isInvalid={formik.touched.offer_id && formik.errors.offer_id}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.offer_id}
          </Form.Control.Feedback>
        </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Primer nombre
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          {/* ... (otros campos del formulario) ... */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Primer apellido
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

{/* ... (otros campos del formulario) ... */}

<Form.Group as={Row} className="mb-3">
  <Form.Label column sm="4">
    Cedula
  </Form.Label>
  <Col sm="8">
    <InputGroup hasValidation>
      <InputGroup.Text id="inputGroupPrepend">CC</InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Cedula"
        aria-describedby="inputGroupPrepend"
        name="cedula"
        value={formik.values.cedula}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched.cedula && formik.errors.cedula}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.cedula}
      </Form.Control.Feedback>
    </InputGroup>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
  <Form.Label column sm="4">
    Email
  </Form.Label>
  <Col sm="8">
    <Form.Control
      type="text"
      placeholder="Email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      isInvalid={formik.touched.email && formik.errors.email}
    />
    <Form.Control.Feedback type="invalid">
      {formik.errors.email}
    </Form.Control.Feedback>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
  <Form.Label column sm="4">
    Numero celular
  </Form.Label>
  <Col sm="8">
    <Form.Control
      type="text"
      placeholder="Numero celular"
      name="phonenumber"
      value={formik.values.phonenumber}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      isInvalid={formik.touched.phonenumber && formik.errors.phonenumber}
    />
    <Form.Control.Feedback type="invalid">
      {formik.errors.phonenumber}
    </Form.Control.Feedback>
  </Col>
</Form.Group>

<Form.Group as={Row} className="mb-3">
  <Form.Label column sm="4">
    Hoja de vida
  </Form.Label>
  <Col sm="8">
    <Form.Control
      type="file"
      name="CV"
      onChange={(event) => {
        formik.setFieldValue('CV', event.currentTarget.files[0]);
      }}
      isInvalid={formik.touched.CV && formik.errors.CV}
    />
    <Form.Control.Feedback type="invalid">
      {formik.errors.CV}
    </Form.Control.Feedback>
  </Col>
</Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="4">Certificados</Form.Label>
      <Col sm="8">
      <Form.Control
        type="file"
        name="certificates"
        onChange={(event) => {
          formik.setFieldValue('certificates', event.currentTarget.files[0]);
        }}
        isInvalid={formik.touched.certificates && formik.errors.certificates}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.certificates}
      </Form.Control.Feedback>
      </Col>
    </Form.Group>




          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Form.Check
                label="Aceptar términos y condiciones"
                name="terms"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.terms && formik.errors.terms}
                feedback={formik.errors.terms}
                feedbackType="invalid"
              />
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

export default ApliForm;

        