import React from "react";
import NavbarCustome from "../Navbar";
import { NavLink, Outlet } from "react-router-dom";
import "assets/style/MainUsers.css";

const MainUsers = () => {
  // const auth = useAuth();
  // const [lands, setLands] = useState({});
  // const fetchLands = () =>
  //   fetch("https://localhost:7210/api/land/" + auth.currentUser.id)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((body) => {
  //       setLands(body);
  //     });

  // useEffect(() => {
  //   fetchLands();
  // }, []);

  return (
    <div>
      <NavbarCustome />
      MainUsers
      <nav className="tabs">
        <NavLink activeClassName="active" className="tab" to="mylands">
          Mis Lotes
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="myexpenses">
          Mis Expensas
        </NavLink>
        <NavLink activeClassName="active" className="tab" to="editland">
          Editar Lote
        </NavLink>
      </nav>
      <div className="mainusers-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainUsers;
