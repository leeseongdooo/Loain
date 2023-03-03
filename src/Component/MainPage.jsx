import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io";
import "../Css/MainPage.scss";
import SearchCharacter from "./SearchCharacter";

function SearchCharacterInputArea() {

  const [SearchNickName, setSearchNickName] = useState("");
  const navigate = useNavigate();
  
  const SearchEnter = (e) => {
    if (e.key === "Enter")
    {
      navigate(`/Search/${SearchNickName}`)  
    }
  }

  return (
    <div className="SearchCharacterInputAreaBox">
        <h1>LOA IN</h1>
        <input type="text" placeholder="캐릭터명" className="InputNickName" onChange={(e) => {setSearchNickName(e.target.value)}} onKeyPress={(e) => {SearchEnter(e)}} />
    </div>
  )
}

function NoticeArea() {
  const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
  const [LostArk_NoticeInformation, setLostArk_NoticeInformation] = useState(null);

  async function GetNotice() {
    try {
      const response = await axios.get(`/news/notices`, {
        headers: {Authorization: `Bearer ${Key}`,}
      });
      setLostArk_NoticeInformation(response.data);
    } catch (Error){
      console.log(Error)
    }
  }

  useEffect(() => {
    GetNotice();  
  }, [])
  

  return (
    <div className="NoticeAreaBox">
      {/* 로스트아크 공지사항 */}
      <div className="InnerNoticeBox">
        <a href="https://lostark.game.onstove.com/News/Notice/List" target="_blank" className="Title">로스트아크 공지사항</a>
        <div className="LostArk_Notice">
          <div className="Notice_BasketBox">
            {LostArk_NoticeInformation !== null ? LostArk_NoticeInformation.map((Data, index) => {
              if(index < 5)
              {
                return (
                 <div className="MiniNoticeBox">
                   <div style={Data.Type === "공지" ? {color: "#222222"} : Data.Type === "점검" ? {color: "#687de5"} : Data.Type === "상점" ? {color: "#05b9b3"} : {color: "#9c69bf"}}>{Data.Type}</div>
                   <a href={Data.Link} target="_blank" className="Notice_Name">{Data.Title}</a>
                 </div>
              )
              }
            }) : ""}
          </div>
        </div>
      </div>

      {/* 로아인의 공지사항 */}
      <div className="InnerNoticeBox">
        <a href="/" className="Title">로아인 공지사항</a>
        <div className="LOAIN_Notice">
          <div className="Notice_BasketBox">
           
          </div>
        </div>
      </div>
      
    </div>
  )
}


function MainPage() {
  const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";

  const [EventData, setEventData] = useState([]);
  
  const [TouchStartWidth, setTouchStartWidth] = useState(0);
  const [TouchEndWidth, setTouchEndWidth] = useState(0);

  const [NowSlideWidth, setNowSlideWidth] = useState(0);

  const [SlideCount, setSlideCount] = useState(0);
  const EventRef = useRef();
  
  const TouchStart = (e, scroll) => {
    setTouchStartWidth(e.touches[0].pageX);
  
    console.log(e.touches[0].pageX)
  }

  const prev = () => {
    console.log("현재 위치" + NowSlideWidth)
    if(NowSlideWidth < 0)
    {
      setNowSlideWidth(NowSlideWidth + EventRef.current.clientWidth + 10);
    } 

    if(NowSlideWidth < -100)
    {
      setNowSlideWidth(0);
    }
    
  }

  const next = () => {
    console.log("현재 위치" + NowSlideWidth)
    if(NowSlideWidth <= 0)
    {
      setNowSlideWidth(NowSlideWidth - EventRef.current.clientWidth - 10);
    }
    
  }

  const TouchEnd = (e) => {
    
    setTouchEndWidth(e.changedTouches[0].pageX);
    console.log(e.changedTouches[0].pageX);
    console.log(EventData.length * 10 + EventData.length * EventRef.current.clientWidth);
    
    if(e.changedTouches[0].pageX < TouchStartWidth)
    {
      next();
      if(-(EventData.length * 10 + EventData.length * EventRef.current.clientWidth) > NowSlideWidth)
      {
        setNowSlideWidth(0);
      }

    } else {
      prev();
    }
  }

  const leftClick = () => {
    setNowSlideWidth(NowSlideWidth + EventRef.current.clientWidth + 10); 
    setSlideCount(SlideCount - 1)
  }

  useEffect(() => {
    axios
      .get("https://developer-lostark.game.onstove.com/news/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((Response) => {
        // console.log(Response.data);
        setEventData(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
      
  }, []);

 

  return (
    <div className="MainPageBox">
      <SearchCharacterInputArea />
      <Calendar></Calendar>
      <div className="EventBigBox">
          <span className="IntroduceEvent">진행중인 이벤트 {EventData.length !== 0 ? EventData.length + "개" : ""}</span>
          
          <div className="EventBox">
            <IoIosArrowBack className="Icon left" onClick={() => {NowSlideWidth < 0 ? leftClick() : console.log("NO") }} style={NowSlideWidth >= 0 ? {color: "gray"} : {color: "black"}}/>
                <div className="ParentBox" >
                  <div className="InnerBox" style={{ transform: `translate(${NowSlideWidth}px, 0px)` }}>
                    {EventData.length !== 0 ? EventData.map((Data ,index) => {
                      return (
                        <a href={Data.Link} key={index} target="_blank">
                          <div className="CardStyle">
                            {EventData.length !== 0 ? <img src={Data.Thumbnail} ref={EventRef}/> : ""}
                          
                            <div className="EventInfo">
                              <div className="TextArea">
                                <p>{Data.Title}</p>
                                <span className="EventDate">이벤트 기간 : </span>
                                <span>{EventData.length !== 0 ? Data.StartDate.substr(0, 10) : ""} - </span>
                                <span>{EventData.length !== 0 ? Data.EndDate.substr(0, 10) : ""}  </span>
                              </div>

                              <p className="Nowing">진행중</p>
                            </div>
                          </div>
                        </a>
                      )
                  }) : ""}
                </div>
              </div>
              <IoIosArrowForward className="Icon right" onClick={() => {setNowSlideWidth(NowSlideWidth - EventRef.current.clientWidth - 10); setSlideCount(SlideCount + 1)}}/>
        </div>
      </div>
    
      <NoticeArea/>
        
    </div>
  );
}

export default MainPage;
