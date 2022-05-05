import "./App.css";
import Formulario from "./Formulario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./Views/NotFound";
// import Navbar from "./Navbar";
import MainAdmin from "./Admin/MainAdmin";
import MainUsers from "./Users/MainUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />}></Route>
        <Route path="admin" element={<MainAdmin />} />
        <Route path="user" element={<MainUsers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    // <div className="App d-grid h-100">
    // </div>
  );
}

export default App;
