import { useLocation } from "react-router-dom";
import Navbar from "../../components/navigation/Navbar.js";
import Sidebar from "../../components/navigation/Sidebar.js";
import Footer from "../../components/navigation/Footer.js";
import JobForm from "../../components/module_1/JobForm.js";
import React from "react";

import {Row, Col} from "react-bootstrap";

function Module_1(){
    const location = useLocation();

    if(location.pathname === '/main/joboffers'){
        return (
            <>
            <Row >
                <Navbar />
            </Row>
            <Row>
                <Sidebar />
                <Col>
                <JobForm/>
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