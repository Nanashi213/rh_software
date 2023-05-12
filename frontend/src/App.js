import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "./containers/pages/Home";
import Jobdetails from "./containers/pages/JobDetails.jsx";
import Login from "./containers/pages/Login.jsx";
import AplicantForm from "./containers/pages/AplicantForm.jsx";
import Error404 from "./containers/errors/Error404";
{/*Display Error
https://carontestudio.com/blog/listado-de-etiquetas-html/
https://react-bootstrap.github.io/layout/grid/
*/}
function App() {
  return (
<>
<Router>
  <Routes>
    
    {/*Display Error*/}
    <Route path="*" element={<Error404 />} />
    {/*Display Home*/}
    <Route path="/" element={<Home />} />
    <Route path="/jobs/:id" element={<Jobdetails/>} />
    <Route path="/AplicantForm/:id" element={<AplicantForm/>} />
    <Route path="/login" element={<Login/>} />


  </Routes>
</Router>
</>
  );
}

export default App;
