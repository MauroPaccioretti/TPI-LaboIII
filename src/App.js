import "./App.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotFound } from "./Views/NotFound";
import MainAdmin from "./Admin/MainAdmin";
import MainUsers from "./Users/MainUsers";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="admin" element={<MainAdmin />} />
          <Route path="user" element={<MainUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    // <div className="App d-grid h-100">
    // </div>
  );
};

export default App;
