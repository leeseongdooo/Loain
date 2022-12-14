import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import "../Css/Header.scss";

function Header() {
  return (
    <header className="HeaderParent">
      <a href="" className="LogoFont">
        LOAIN
      </a>

      <div className="SearchBox">
        <BiSearchAlt2 id="SearchIcon" />
        <input type="text" placeholder="파티 이름을 검색해주세요!" />
      </div>

      <div className="utility">
        <a href="">로그인</a>
        <a href="">회원가입</a>
      </div>
    </header>
  );
}

export default Header;
