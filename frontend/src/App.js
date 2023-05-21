import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "./containers/pages/Home.jsx";
import Main from "./containers/pages/Main.jsx";
import Error404 from "./containers/errors/Error404";
import useToken from './components/useToken.js'
import { TokenContext } from './TokenContext';

{/*Display Error
https://carontestudio.com/blog/listado-de-etiquetas-html/
https://react-bootstrap.github.io/layout/grid/


Cambiar en vez de tener muchas pagina que el componente home sea el que cambie segun el routa
*/}
function App() {
  const { token, removeToken, setToken } = useToken();
  return (
<TokenContext.Provider value={{ token, setToken, removeToken }}>
  <Router>
    <Routes>
      {/*Display Error*/}
      <Route path="*" element={<Error404 />} />
      {/*Display Home*/}
      <Route path="/" element={<Home />} />
      <Route path="/jobs/:id" element={<Home/>} />
      <Route path="/AplicantForm/:id" element={<Home/>} />
      <Route path="/login" element={<Home/>} />
      <Route path="/main" element={<Main/>} />
    </Routes>
  </Router>
</TokenContext.Provider>
  );
}

export default App;
