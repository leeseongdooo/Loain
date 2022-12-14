import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import MainPage from "./Component/MainPage";
import Header from "./Component/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;
