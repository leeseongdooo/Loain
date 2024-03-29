import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import Header from "./Component/Header";
import Login from "./Component/Login";

import MainPage from "./Component/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchCharacter from "./Component/SearchCharacter";
import GuildRank from "./Component/GuildRank";

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <style>
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
      </style>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Search/:searchCharacter" element={<SearchCharacter/>}></Route>
          <Route path="/Guild" element={<GuildRank />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
