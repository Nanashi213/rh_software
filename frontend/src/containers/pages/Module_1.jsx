import { useLocation } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar.js";
import Sidebar from "../../components/navigation/Sidebar.js";
import Footer from "../../components/navigation/Footer.js";
import JobForm from "../../components/module_1/JobForm.js";
import JobList from "../../components/module_1/Joblist.js";
import React, { useState } from "react";

import {Row, Col, Button} from "react-bootstrap";

function Module_1(){
const location = useLocation();
const [activeComponent, setActiveComponent] = useState('form');

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
}

export default Module_1;