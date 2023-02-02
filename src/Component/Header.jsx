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
  const [SearchFoucs, setSearchFocus] = useState(false);
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

      <div className="CenterBox">
        <div className="textbox">
          <Link to="/Guild">길드정보</Link>
          <Link to="/Aution">거래소</Link>
          <Link to="/Market">경매장</Link>
          <Link to="/Notice">공지사항</Link>
        </div>
        

        <div className="SearchBox">
          <BiSearchAlt2 id="SearchIcon" />
          <input type="text"  style={SearchFoucs === false ? {width: "400px"} : {width: "150px"}}placeholder="캐릭터 검색하기." onChange={(e) => {setSearchNickName(e.target.value)}} onKeyPress={(e) => {SearchEnter(e)}} onFocus={() => {setSearchFocus(true)}}/>
        </div> 
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
