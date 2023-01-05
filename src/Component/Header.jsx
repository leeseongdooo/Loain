import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import "../Css/Header.scss";

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
        {/* <div className="NoLogin">
          <Link to="/Login">로그인</Link>
        </div> */}

        <div className="YesLogin">
          <div className="UserMiniProfile">
            <img src="/img/elgasia.jpg" alt="유저이미지" />
            <span>{NickName}</span>
            <BiSearchAlt2 />
          </div>
          
          <BiSearchAlt2 className="LogOut" onClick={() => {}}/>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
