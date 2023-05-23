import Navbar from "../../components/navigation/Navbar.js";
import Sidebar from "../../components/navigation/Sidebar.js";
import Footer from "../../components/navigation/Footer.js";

import React from "react";
import Image_main from "../../assets/main_image.webp";

import {Row, Col, Container} from "react-bootstrap";

function Main () {
    return (
        <>
        <Row >
            <Navbar />
        </Row>
        <Row>
            <Sidebar />
            <Col  className="align-content-center justify-content-center text-center">
                <Container >
                <br/>
                <br/>
                <br/>
                <img  src={Image_main} alt="Imagen de pagina principal" width={500}/>
                <h2>RH_SOFTWARE</h2>
                <p>Software de Recursos Humanos</p>
                </Container>
            </Col>
        </Row>
        <Row>
            <Footer />
        </Row>
        </>
    )
}

export default Main