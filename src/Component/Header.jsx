import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiSearchAlt2, BiExit } from "react-icons/bi";
import { RiArrowUpSFill } from "react-icons/ri";
import "../Css/Header.scss";


function YesLogin({NickName}) {
  return (
    <div className="YesLogin">
      <div className="UserMiniProfile">
        <img src="/img/elgasia.jpg" alt="유저이미지" />
        <span>{NickName}</span>
        <RiArrowUpSFill className="DownArrow" />
      </div>
      
      <BiExit className="LogOut" onClick={() => {window.localStorage.setItem("LoginState", false); window.location.replace("/");}}/>
  </div> 
  )
}

function NoLogin() {
  return (
    <div className="NoLogin">
      <Link to="/Login">로그인</Link>
    </div> 
  )
}

function Header() {
  const [LoginStates, setLoginState] = useState(window.localStorage.getItem("LoginState"));
  const [SearchNickName, setSearchNickName] = useState("");
  const NickName = useState(window.localStorage.getItem("userNickName"));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(SearchNickName);
  }, [SearchNickName])

  // 검색함수

  const SearchEnter = (e) => {
    if (e.key === "Enter")
    {
      navigate(`/Search/${SearchNickName}`)  
    }
  }

  return (
    <header className="HeaderParent">
      <Link to="/" className="LogoFont">
        LOAIN
      </Link>

      <div className="SearchBox">
        <BiSearchAlt2 id="SearchIcon" />
        
        <input type="text" placeholder="캐릭터 검색하기." onChange={(e) => {setSearchNickName(e.target.value)}} onKeyPress={(e) => {SearchEnter(e)}}/>
      </div> 

      <div className="utility">

        {
        LoginStates === "true" ? 
        <YesLogin NickName={NickName} /> : <NoLogin/>
      
}
      </div>
    </header>
  );
}

export default Header;
