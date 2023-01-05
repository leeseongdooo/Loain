import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "../Css/Login.scss";

function SigninMode({ mode, setMode }) {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState(""); // 비밀번호 체크용
  const [NickName, setNickName] = useState("");

  const [IdresCheck, setIdresCheck] = useState(false); // 아이디 정규식 통과되면 true를 저장하고 아니면 false를 저장.
  const [PwdresCheck, setPwdresCheck] = useState(false); // 비밀번호 정규식 통과되면 true를 저장하고 아니면 false를 저장.

  const Idres = /^[a-z0-9]+[a-z0-9]{7,19}$/g;
  const Pwdres = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  useEffect(() => {
    // 아이디 정규식 검사.
    setIdresCheck(Idres.test(userId));

    setPwdresCheck(Pwdres.test(userPwd)); // 특수문자와 대문자를 포함한 비밀번호 정규식.

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
        }}
      />
      <span
        style={
          IdresCheck
            ? { display: "block", color: "green" }
            : userId.length > 0
            ? { display: "block", color: "red" }
            : { display: "none" }
        }
      >
        {IdresCheck
          ? "멋진 아이디네요!"
          : "영문자와 숫자를 포함하여 최소 8자로 해주세요!"}
      </span>

      <p>닉네임</p>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        className="SignInMode"
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />

      <p>비밀번호</p>
      <input
        type="password"
        placeholder="8자 이상 입력해주세요"
        className="SignInMode"
        onChange={(e) => {
          setUserPwd(e.target.value);
        }}
      />
      <span
        style={
          PwdresCheck
            ? { display: "block", color: "green" }
            : userPwd.length > 0
            ? { display: "block", color: "red" }
            : { display: "none" }
        }
      >
        {PwdresCheck
          ? "안전한 비밀번호 입니다."
          : "대소문자와 특수문자를 포함하여 8자인 비밀번호로 작성해주세요."}
      </span>

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
        <button
          onClick={() => {
            if (
              IdresCheck === true &&
              PwdresCheck === true &&
              userPwd === checkPwd
            ) {
              window.localStorage.setItem("userId", userId);
              window.localStorage.setItem("userNickName", NickName);
              window.localStorage.setItem("userPwd", userPwd);
              setMode("Login");
            } else {
              alert("회원가입 실패");
            }
          }}
        >
          회원가입하기
        </button>
      </div>
    </div>
  );
}

function LoginMode({ mode, setMode }) {
  const testId = window.localStorage.getItem("userId");
  const testPwd = window.localStorage.getItem("userPwd");

  const [LoginId, setLoginId] = useState("");
  const [LoginPwd, setLoginPwd] = useState();
  const [LoginState, setLoginState] = useState();
  const [FailText, setFailText] = useState("");

  useEffect(() => {
    console.log("로그인 아이디 : " + LoginId);
    console.log("로그인 비밀번호 : " + LoginPwd);
  }, [LoginId, LoginPwd]);

  return (
    <div>
      <p>아이디</p>
      <input
        type="text"
        className="LoginMode"
        onChange={(e) => {
          setLoginId(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (LoginId.length === 0) {
              setFailText("아이디를 입력하세요");
            } else if (LoginId === testId && testPwd === LoginPwd) {
              setFailText("");
              alert("성공");
            } else {
              setFailText("아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
            }
          }
        }}
      />

      <p>비밀번호</p>
      <input
        type="password"
        className="LoginMode"
        onChange={(e) => {
          setLoginPwd(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (LoginId.length === 0) {
              setFailText("아이디를 입력하세요");
            } else if (LoginId === testId && testPwd === LoginPwd) {
              setFailText("");
              alert("성공");
            } else {
              setFailText("아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
            }
          }
        }}
      />
      <span
        className="LoginWrong"
        style={LoginState ? { display: "none" } : { display: "block" }}
      >
        {FailText}
      </span>

      <div className="ButtonBox">
        <button
          onClick={(e) => {
            if (e.keycode === 13) {
              console.log("A");
            }
          }}
        >
          로그인하기
        </button>
        <button
          className="SignInBtn"
          onClick={() => {
            setMode("SignInMode");
          }}
        >
          회원가입
        </button>
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
