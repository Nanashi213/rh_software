import React, { useState} from 'react';
import { Form, Button, Col, Row, InputGroup  } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ApliForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    job_offer_id: yup.number().required('Campo obligatorio'),
    name: yup.string().required('Campo obligatorio'),
    last_name: yup.string().required('Campo obligatorio'),
    id_card: yup.number().required('Campo obligatorio'),
    email: yup.string().email('Email inválido').required('Campo obligatorio'),
    phone: yup.number().required('Campo obligatorio'),
    cv: yup.mixed().required('Campo obligatorio'),
    certificates: yup.mixed().nullable(),
    terms: yup.bool().oneOf([true], 'Debe aceptar los términos y condiciones').required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      job_offer_id: id,
      name: '',
      last_name: '',
      id_card: '',
      email: '',
      phone: '',
      cv: null,
      certificates: null,
      terms: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
        method: 'POST',
        url: 'http://localhost:5000/candidate',
        data: values,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
    },
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
        <Form onSubmit={handleSubmit} noValidate validated={validated} >
          <Form.Group className="mb-3">
          <Form.Label>ID de la oferta</Form.Label>
          <Form.Control
            type="number"
            name="job_offer_id"
            value={formik.values.job_offer_id}
            onChange={formik.handleChange}
            isInvalid={formik.touched.job_offer_id && formik.errors.job_offer_id}
            disabled
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.job_offer_id}
          </Form.Control.Feedback>
        </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Primer nombre
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
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
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.last_name && formik.errors.last_name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.last_name}
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
        name="id_card"
        value={formik.values.id_card}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched.id_card && formik.errors.id_card}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors.id_card}
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
      name="phone"
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      isInvalid={formik.touched.phone && formik.errors.phone}
    />
    <Form.Control.Feedback type="invalid">
      {formik.errors.phone}
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
      name="cv"
      onChange={(event) => {
        formik.setFieldValue('cv', event.currentTarget.files[0]);
      }}
      isInvalid={formik.touched.cv && formik.errors.cv}
    />
    <Form.Control.Feedback type="invalid">
      {formik.errors.cv}
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

        