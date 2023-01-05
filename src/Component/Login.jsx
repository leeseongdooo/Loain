import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../Css/Login.scss";

function SigninMode({ mode, setMode }) {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState(""); // 비밀번호 체크용

  const Idres = /^[a-z]+[a-z0-9]{5,19}$/g;

  const Pwdres =
    "^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$";

  let resCheck = false;

  let TestCheck = (userId2) => {
    return Idres.test(userId2);
  };
  useEffect(() => {
    console.log("아이디 : " + userId);
    console.log("비밀번호 : " + userPwd);

    if (userPwd.length >= 8) {
    }

    // 첫번째 비밀번호칸과 비밀번호 재입력칸 일치하는지 확인
    if (userPwd === checkPwd && userPwd.length > 0) {
      console.log(true);
    } else {
      console.log(false);
    }
  }, [userId, userPwd, checkPwd]);

  return (
    <div>
      <p>아이디</p>
      <input
        type="text"
        placeholder="아이디를 입력해주세요"
        className="SignInMode"
        onChange={(e) => {
          setUserId(e.target.value);
          TestCheck(userId);
          console.log("아이디 정규식 : " + TestCheck(userId));
        }}
      />
      <span
        style={TestCheck(userId) ? { display: "block" } : { display: "none" }}
      >
        {/* {TestCheck(userId) ? "아이디 입력 완료" : "최소 82자 이상"} */}
        ddd
      </span>

      <p>비밀번호</p>
      <input
        type="password"
        placeholder="8자 이상 입력해주세요"
        className="SignInMode"
        onChange={(e) => {
          setUserPwd(e.target.value);
        }}
      />
      <span>최소 8자 이상</span>

      <p>비밀번호 재확인</p>
      <input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        className="SignInMode"
        onChange={(e) => {
          setCheckPwd(e.target.value);
        }}
      />
      <span
        style={
          checkPwd === userPwd && checkPwd.length > 0
            ? { display: "block", color: "green" }
            : checkPwd.length > 0
            ? { display: "block", color: "red" }
            : { display: "none" }
        }
      >
        {checkPwd === userPwd
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다."}
      </span>

      <div className="ButtonBox">
        <button
          onClick={() => {
            setMode("Login");
          }}
        >
          뒤로가기
        </button>
        <button>회원가입하기</button>
      </div>
    </div>
  );
}

function LoginMode({ mode, setMode }) {
  return (
    <div>
      <p>아이디</p>
      <input type="text" className="LoginMode" />

      <p>비밀번호</p>
      <input type="password" className="LoginMode" />

      <div className="ButtonBox">
        <button>로그인하기</button>
        <button
          className="SignInBtn"
          onClick={() => {
            setMode("SignInMode");
          }}
        >
          회원가입
        </button>{" "}
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

  const [NowMode, setMode] = useState("Login");
  // 이미지 랜덤으로 나오게 할 변수.
  let randomImage = parseInt(Math.random() * LoginImage.length);

  return (
    <div className="LoginBigBox">
      <div className="LoginBox">
        <div className="WriteArea">
          <h1 className="TitleText">LOAIN</h1>

          <div className="InnerBox">
            {NowMode === "Login" ? (
              <LoginMode mode={NowMode} setMode={setMode} />
            ) : (
              <SigninMode mode={NowMode} setMode={setMode} />
            )}
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
