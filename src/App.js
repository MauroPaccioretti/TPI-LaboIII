import AuthContextProvider from "./Context/AuthContextProvider";
import RoutingComponent from "./RoutingComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <AuthContextProvider>
      <RoutingComponent />
      <ToastContainer />
    </AuthContextProvider>
  );
};

export default App;
