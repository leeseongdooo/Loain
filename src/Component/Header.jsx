import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiSearchAlt2, BiExit, BiMenu } from "react-icons/bi";
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
  const [MobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();

  const NickName = useState(window.localStorage.getItem("userNickName"));
  const [NowWidth, setNowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  

  const handleResize = () => {
    console.log(`브라우전 화면 사이즈 : ${window.innerWidth}`);
    setNowWidth(window.innerWidth);
  }


  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [SearchNickName])

  // 검색함수

  const SearchEnter = (e) => {
    if (e.key === "Enter")
    {
      navigate(`/Search/${SearchNickName}`)  
    }
  }

  

  return (
    <header className="HeaderParent" >
      <div className="PcVersion" style={NowWidth > 700 ? {display: "flex"} : {display: "none"}}>
        <div className="FirstBox">
          <Link to="/" className="LogoFont">
            LOAIN
          </Link>

          <div className="textBox">
            <div>
              <Link to="/Guild" style={location.pathname === "/Guild" ? {color: "royalblue"} : {}}>길드정보</Link>
            </div>
            
            <div>
              <Link to="/Matching">공대해듀오</Link>
            </div>
          
            <div>
              <Link to="/Market">경매장</Link>
            </div>
            
            <div>
              <Link to="/Notice">공지사항</Link>
            </div>
          </div>
        </div>
        

        <div className="SecondBox">
          <div className="SearchBox" style={NowWidth > 720 && SearchFoucs === true ? {width: "300px"} : {width: "170px"}}>
            <BiSearchAlt2 id="SearchIcon" />
            <input type="text" placeholder="캐릭터 검색하기." onChange={(e) => {setSearchNickName(e.target.value)}} onKeyPress={(e) => {SearchEnter(e)}} onFocus={() => {setSearchFocus(true)}} onBlur={() => {setSearchFocus(false)}}/>
          </div>

          
          <div className="utility">
            {
              LoginStates === "true" ? 
              <YesLogin NickName={NickName} /> : <NoLogin/>
            }
          </div> 
        </div>
      </div>

      <div className="MobileVersion" style={NowWidth < 700 ? {display: "flex"} : {display: "none"}}>

        <Link to="/" className="LogoFont">
          LOAIN
        </Link>

        <BiMenu  className="Icon" onClick={() => {setMobileMenu(true);}}/>

        <div className="ActiveMenu" style={MobileMenu === false ? {right: "-500px"} : {right: "0"}} onClick={() => {setMobileMenu(false)}}>

          <div className="IconBox">
            <BiMenu  className="Icon"/>
          </div>

          <div className="textBox">
            <div>
              <Link to="/Guild" style={location.pathname === "/Guild" ? {color: "royalblue"} : {}}>길드정보</Link>
            </div>
            
            <div>
              <Link to="/Matching">공대해듀오</Link>
            </div>
          
            <div>
              <Link to="/Market">경매장</Link>
            </div>
            
            <div>
              <Link to="/Notice">공지사항</Link>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
