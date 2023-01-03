import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Header from "./Component/Header";
import Login from "./Component/Login";

import MainPage from "./Component/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
