import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ServicioDetalle from "./components/ServicioDetalle";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios/:id" element={<ServicioDetalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
