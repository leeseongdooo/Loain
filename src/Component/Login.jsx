import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../Css/Login.scss";

function SigninMode() {
  return (
    <div>
      <p>아이디</p>
      <input type="text" />

      <p>비밀번호</p>
      <input type="password" />

      <p>비밀번호 재확인</p>
      <input type="password" />

      <div className="ButtonBox">
        <button>회원가입하기</button>
      </div>
    </div>
  );
}

function LoginMode() {
  return (
    <div>
      <p>아이디</p>
      <input type="text" />

      <p>비밀번호</p>
      <input type="password" />

      <div className="ButtonBox">
        <button>로그인하기</button>
        <button className="SignInBtn">회원가입</button>{" "}
      </div>
    </div>
  );
}

function Login() {
  let LoginImage = [];
  LoginImage[0] = "img/elgasia.jpg";
  LoginImage[1] = "img/platche.jpg";
  LoginImage[2] = "img/rowen.jpg";
  LoginImage[3] = "img/fanArt.jpg";

  console.log(LoginImage.length);

  // 이미지 랜덤으로 나오게 할 변수.
  let randomImage = parseInt(Math.random() * LoginImage.length);

  return (
    <div className="LoginBigBox">
      <div className="LoginBox">
        <div className="WriteArea">
          <h1 className="TitleText">LOA IN</h1>

          <div className="InnerBox">
            <SigninMode />
          </div>
        </div>

        <div className="ImageArea">
          <img src={LoginImage[randomImage]} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
