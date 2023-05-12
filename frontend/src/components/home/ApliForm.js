import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';


const ApliForm = () => {
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
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
    <Row className="justify-content-center">
      <Col md={7}>
        <Form onSubmit={handleSubmit}>
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

            

{/* <Form.Group className="position-relative mb-3">
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import * as formik from 'formik';


function ApliForm() {
  const { Formik } = formik;

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  cedula: yup.number().required(),
  email: yup.string().email().required(),
  phonenumber: yup.number().required(),
  CV: yup.mixed().required(),
  certificates: yup.mixed().required(),
  terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
});
  const { id } = useParams();
  return (
    <Row className="justify-content-center">
    <Col md={7}>
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        firstName: '',
        lastName: '',
        cedula: '',
        email: '',
        phonenumber: '',
        CV: null,
        certificates: null,
        terms: false,
      }}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik101"
              className="position-relative "
            >
              <Form.Label>Primer nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback tooltip>Buena suerte!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Primer apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback tooltip>Buena suerte!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" co>
              <Form.Label>Cedula</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">CC</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Cedula"
                  aria-describedby="inputGroupPrepend"
                  name="cedula"
                  value={values.cedula}
                  onChange={handleChange}
                  isInvalid={!!errors.cedula}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.cedula}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="5"
              controlId="validationFormik103"
              className="position-relative"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="Email@example.com"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />

              <Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="5"
              controlId="validationFormik104"
              className="position-relative"
            >
              <Form.Label>Numero celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="Numero celular"
                name="phonenumber"
                value={values.phonenumber}
                onChange={handleChange}
                isInvalid={!!errors.phonenumber}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.phonenumber}
              </Form.Control.Feedback>
            </Form.Group>

          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Hoja de vida</Form.Label>
            <Form.Control
              type="file"
              required
              name="CV"
              onChange={handleChange}
              isInvalid={!!errors.CV}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.CV}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Certificados</Form.Label>
            <Form.Control
              type="file"
              name="certificates"
              onChange={handleChange}
              isInvalid={!!errors.certificates}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.certificates}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Check
              required
              name="terms"
              label="Aceptar terminos y condiciones"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik106"
              feedbackTooltip
            />
          </Form.Group>
          
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
    </Col>
    </Row>

  );
};

export default ApliForm;


*/}
