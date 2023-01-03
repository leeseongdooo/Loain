import React from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import "../Css/Header.scss";

function Header() {
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
        <Link to="/Login">로그인</Link>
        <Link to="/Signin">회원가입</Link>
      </div>
    </header>
  );
}

export default Header;
