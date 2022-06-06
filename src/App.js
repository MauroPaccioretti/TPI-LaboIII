import "./App.css";
import AuthContextProvider from "./Context/AuthContextProvider";
import RoutingComponent from "./RoutingComponent";

const App = () => {
  return (
    <AuthContextProvider>
      <RoutingComponent />
    </AuthContextProvider>
  );
};

export default App;
