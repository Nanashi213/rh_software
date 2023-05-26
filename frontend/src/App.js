import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useMemo } from 'react';
import Home from "./containers/pages/Home.jsx";
import Main from "./containers/pages/Main.jsx";
import Module_1 from "./containers/pages/Module_1.jsx"
import Error404 from "./containers/errors/Error404";

import useToken from './components/useToken.js';
import { TokenContext } from './TokenContext';

function App() {
  const { token, removeToken, setToken } = useToken();

  const value = useMemo(() => ({ token, setToken, removeToken }), [token, setToken, removeToken]);

  return (
    <TokenContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/jobs/:id" element={<Home/>} />
          <Route path="/AplicantForm/:id" element={<Home/>} />
          <Route path="/login" element={<Home/>} />

          {token !== null &&(
            <>
              <Route path="/main" element={<Main/>} />
              <Route path="/main/joboffers" element={<Module_1/>} />
              <Route path="/main/joboffers/:id" element={<Module_1/>} />
            </>
          )}
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
