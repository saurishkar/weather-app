import Navbar from "react-bootstrap/Navbar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <Navbar className="mx-5 mb-5">
        <Navbar.Brand className="">Weather App</Navbar.Brand>
      </Navbar>
      <Weather />
    </div>
  );
}

export default App;
