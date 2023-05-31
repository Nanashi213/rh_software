import React, { useState, useEffect , useContext} from 'react';
import { useFormik } from 'formik';
import { useParams} from 'react-router-dom';
import * as yup from 'yup';
import {Button , Col, Form, Row} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { TokenContext } from '../../TokenContext.js';


function JobEditForm() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobOffers, setJobOffers] = useState([ ]);

    useEffect(() => {
      axios({
        method: "GET",
        url: "http://localhost:5000/job_offer",
      }).then((response) => {
        setJobOffers(response.data)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    }, []); 

  const [offer, setOffer] = useState(null);
  
  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    id: yup.number().required('Campo obligatorio'),
    title: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
    requirements: yup.string().required('Campo obligatorio'),
    publication_date: yup.string().required('Campo obligatorio'),
    vacancies: yup.number().required('Campo obligatorio'),
    salary: yup.number().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: offer ? {
      id: offer.id || '',
      title: offer.title || '',
      description: offer.description || '',
      requirements: offer.requirements || '',
      publication_date: offer.publication_date || '',
      vacancies: offer.vacancies || '',
      salary: offer.salary || '',
    } : {
      id: '',
      title: '',
      description: '',
      requirements: '',
      publication_date: '',
      vacancies: '',
      salary: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      axios({
       method: "PUT",
       url:`http://localhost:5000/job_offer/${id}`,
        data: {
          id: values.id,
          title: values.title,
          description: values.description,
          requirements: values.requirements,
          publication_date: values.publication_date,
          vacancies: values.vacancies,
          salary: values.salary
        },
        headers: {
          Authorization: 'Bearer ' + token
        } 
      }
      )
      .then(response => {
        console.log(response.data.message);
        alert('Se actualizo la oferta de trabajo');
        navigate('/main/joboffers');
      })
      .catch(error => {
        console.error(error);
        alert('Ocurrió un error al actualizar la oferta de trabajo');
      });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    const foundOffer = jobOffers.find((oferta) => oferta.id.toString() === id);
    if (foundOffer) {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months in JavaScript start from 0
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      foundOffer.publication_date = formattedDate;
  
      setOffer(foundOffer);
    }
  }, [id, jobOffers]);

  if (!offer) {
    return <div>Oferta no encontrada</div>;
  }

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
      <h1 className='mb-3'>Detalles oferta de trabajo </h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
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
                isInvalid={formik.touched.salary && formik.errors.salary}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.salary}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 8, offset: 4 }}>
              <Button variant='dark' type="submit">Editar Oferta</Button>{' '}
              <Button variant="primary" href={`/main/joboffers`}>Regresar</Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default JobEditForm;
