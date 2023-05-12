
import Navbar from "../../components/navigation/Navbar.js";
import Footer from "../../components/navigation/Footer.js";
import React from "react";
import About from "../../components/home/About.js";
import JobList from "../../components/home/Joblist.js";

const jobList = [
  {
    id: 1,
    title: "Desarrollador web Full Stack",
    description: "Se busca desarrollador web Full Stack para proyecto de desarrollo de software. Conocimientos requeridos en React, Node.js, MongoDB y GraphQL.",
    requirements: "Experiencia previa de al menos 2 años en desarrollo web Full Stack. Manejo avanzado de React, Node.js, MongoDB y GraphQL.",
    salary: "A convenir"
  },
  {
    id: 2,
    title: "Diseñador gráfico",
    description: "Empresa de publicidad busca diseñador gráfico para trabajar en equipo creativo. Se requiere habilidades en Adobe Creative Suite y experiencia en diseño publicitario.",
    requirements: "Experiencia previa de al menos 3 años en diseño gráfico publicitario. Manejo avanzado de Adobe Creative Suite.",
    salary: "20,000 MXN - 25,000 MXN mensuales"
  },
  {
    id: 3,
    title: "Ingeniero de sistemas",
    description: "Empresa de software busca ingeniero de sistemas para trabajo en desarrollo de aplicaciones empresariales. Conocimientos requeridos en Java, Spring Framework y MySQL.",
    requirements: "Experiencia previa de al menos 3 años en desarrollo de aplicaciones empresariales. Manejo avanzado de Java, Spring Framework y MySQL.",
    salary: "A convenir"
  },
  {
    id: 4,
    title: "Asistente administrativo",
    description: "Empresa de servicios busca asistente administrativo para realizar tareas administrativas generales. Se requiere experiencia previa en el área.",
    requirements: "Experiencia previa de al menos 1 año en tareas administrativas generales. Conocimientos de paquetería de Office y habilidades de organización.",
    salary: "15,000 MXN - 18,000 MXN mensuales"
  },
  {
    id: 5,
    title: "Desarrollador de apps móviles",
    description: "Empresa de desarrollo de software busca desarrollador de apps móviles para proyecto de desarrollo de app empresarial. Conocimientos requeridos en React Native, Firebase y Google Maps API.",
    requirements: "Experiencia previa de al menos 2 años en desarrollo de apps móviles. Manejo avanzado de React Native, Firebase y Google Maps API.",
    salary: "A convenir"
  },
  {
    id: 6,
    title: "Contador público",
    description: "Despacho de contadores busca contador público para llevar la contabilidad de varios clientes. Se requiere experiencia previa en el área y conocimientos en paquetería contable.",
    requirements: "Experiencia previa de al menos 3 años en contabilidad. Manejo avanzado de paquetería contable.",
    salary: "25,000 MXN - 30,000 MXN mensuales"
  },
]

function Home(){
      
    return(
        <>
            <Navbar/>
            <body style={{paddingTop: "40px",paddingBottom: "40px"}}>
            <About/>
            <JobList jobLists={jobList} />
            </body>
            <Footer/>
        </>

    )
}

export default Home;