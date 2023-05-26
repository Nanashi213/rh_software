import { useLocation,useParams } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar.js";
import Sidebar from "../../components/navigation/Sidebar.js";
import Footer from "../../components/navigation/Footer.js";
import JobForm from "../../components/module_1/JobForm.js";
import JobList from "../../components/module_1/Joblist.js";
import JobEditForm from "../../components/module_1/JobEdit.js";
import { useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";


import {Row, Col, Button} from "react-bootstrap";

function Module_1(){
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
    }, []); // El array vacío como segundo argumento significa que este efecto se ejecutará una vez cuando el componente se monte.
    
  
const location = useLocation();
const { id } = useParams();
const [activeComponent, setActiveComponent] = useState('list');

const showForm = () => setActiveComponent('form');
const showList = () => setActiveComponent('list');


if(location.pathname === '/main/joboffers'){
  return (
    <>
        <Row >
            <Navbar />
        </Row>
        <Row>
            <Sidebar />
        <Col>
            <Row className="mb-5">
            <Col className="d-flex justify-content-center">
                <Button variant="dark" className="rounded-0" onClick={showList}>Mostrar Ofertas</Button>
                <Button variant="dark" className="rounded-0" onClick={showForm}>Agregar</Button>

            </Col>
            </Row>
            <Row >
                {activeComponent === 'form' && <JobForm/>}
                {activeComponent === 'list' && <JobList/>}
            </Row>
        </Col>
        </Row>
        <Row>
            <Footer />
        </Row>
    </>
  )
}

if(location.pathname === `/main/joboffers/${id}`){
    return (
      <>
          <Row >
              <Navbar />
          </Row>
          <Row>
              <Sidebar />
          <Col>
            <JobEditForm jobList={jobOffers}/>
          </Col>
          </Row>
          <Row>
              <Footer />
          </Row>
      </>
    )
  }
}

export default Module_1;