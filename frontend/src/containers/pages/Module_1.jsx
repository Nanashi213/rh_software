import { useLocation,useParams } from "react-router-dom";
import React, { useState } from "react";
import Layout from "../Layout.js";
import {Row, Col, Button} from "react-bootstrap";


import JobForm from "../../components/module_1/JobAdd.js";
import JobList from "../../components/module_1/Joblist.js";
import JobEditForm from "../../components/module_1/JobEdit.js";

import CandidateList from "../../components/module_1/CandidateList.js";
import CandidateDetails from "../../components/module_1/CandidateDetail.js";
import CandidateListrev from "../../components/module_1/CandidateListrev.js";
import TestForm from "../../components/module_1/TestForm.js";

import ContractList from "../../components/module_1/ContractList.js";
import ContractDetail from "../../components/module_1/ContractDetail.js";

function Module_1(){ 
  const location = useLocation();
  const { id } = useParams();

  {/* Opciones para ofertas de trabajo */}
  const [activeComponentoffers, setActiveComponentoffers] = useState('list');

  const showFormoffer = () => setActiveComponentoffers('form');
  const showListoffer = () => setActiveComponentoffers('list');

  {/* Opciones para candidatos */}
  const [activeComponentocandidate, setActiveComponentocandidate] = useState('list');

  const showTestcandidate = () => setActiveComponentocandidate('test');
  const showListcandidate = () => setActiveComponentocandidate('list');

  if(location.pathname === '/main/joboffers'){
    return (
    <Layout>
      <Col>
        <Row className="mb-2">
          <Col className="d-flex justify-content-center">
            <Button variant="dark" className="rounded-0" onClick={showListoffer}>Mostrar Ofertas</Button>
            <Button variant="dark" className="rounded-0" onClick={showFormoffer}>Agregar</Button>

          </Col>
        </Row>
        <Row >
          {activeComponentoffers === 'form' && <JobForm/>}
          {activeComponentoffers === 'list' && <JobList/>}
        </Row>
      </Col>
    </Layout>
    )
  }else if(location.pathname === `/main/joboffers/${id}`){
    return (
      <Layout>
        <Col>
          <JobEditForm />
        </Col>
      </Layout>
    )
  }else if(location.pathname === '/main/candidates'){
  return(
    <Layout>
      <Col>
        <Row className="mb-5">
          <Col className="d-flex justify-content-center">
          <Button variant="dark" className="rounded-0" onClick={showListcandidate}>Sin revisar</Button>
            <Button variant="dark" className="rounded-0" onClick={showTestcandidate}>Revisados</Button>
          </Col>
        </Row>
        <Row >
          {activeComponentocandidate === 'test' && <CandidateListrev/>}
          {activeComponentocandidate === 'list' && <CandidateList/>}
        </Row>
      </Col>
    </Layout>
  )
  }else if(location.pathname === `/main/candidates/${id}`){
  return (
    <Layout>      
      <Col>
        <Row className="mb-5">
          <Col className="d-flex justify-content-center">
          </Col>
        </Row>
        <Row >
           <CandidateDetails/>
        </Row>
      </Col>
    </Layout>
  )
  }else if(location.pathname === `/main/candidates/test/${id}`){
    return (
      <Layout>      
        <Col>
          <Row className="mb-5">
            <Col className="d-flex justify-content-center">
            </Col>
          </Row>
          <Row >
            <TestForm/>
          </Row>
        </Col>
      </Layout>
    )
  }
  else if(location.pathname === '/main/hiring'){
    return (
      <Layout>      
        <Col>
          <Row className="mb-5">
            <Col className="d-flex justify-content-center">
            </Col>
          </Row>
          <Row >
            <ContractList/>
          </Row>
        </Col>
      </Layout>
    )
  }else if(location.pathname === `/main/hiring/${id}`){
    return (
      <Layout>      
        <Col>
          <Row className="mb-5">
            <Col className="d-flex justify-content-center">
            </Col>
          </Row>
          <Row >
            <ContractDetail/>
          </Row>
        </Col>
      </Layout>
    )
  }else{
    return(
      <Layout>
        <Col>
          <h1>404</h1>
        </Col>
      </Layout> 
    )
  }
}

export default Module_1;