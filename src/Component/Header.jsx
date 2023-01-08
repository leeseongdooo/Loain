import React, { useState } from "react";
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
  const NickName = useState(window.localStorage.getItem("userNickName"));
  console.log(LoginStates);

  return (
    <header className="HeaderParent">
      <Link to="/" className="LogoFont">
        LOAIN
      </Link>

      <div className="SearchBox">
        <BiSearchAlt2 id="SearchIcon" />
        <input type="text" placeholder="파티 이름을 검색해주세요!" />
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
