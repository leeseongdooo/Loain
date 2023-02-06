import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Calendar from "./Calendar";
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io";
import "../Css/MainPage.scss";
import Event from "./Event";
import SearchCharacter from "./SearchCharacter";


function MainPage() {
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";

  const [EventData, setEventData] = useState([]);
  const [SlideWidth, setSlideWidth] = useState(0);
  const [SlideCount, setSlideCount] = useState(0);
  const EventRef = useRef();


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

  const leftClick = () => {
    setSlideWidth(SlideWidth + EventRef.current.clientWidth + 10); 
    setSlideCount(SlideCount - 1)
  }

  return (
    <div className="MainPageBox">
      

      <div className="EventBigBox">
          <span className="IntroduceEvent">진행중인 이벤트 {EventData.length !== 0 ? EventData.length + "개" : ""}</span>
          
          <div className="EventBox">
            <IoIosArrowBack className="Icon left" onClick={() => {SlideWidth < 0 ? leftClick() : console.log("NO") }} style={SlideWidth >= 0 ? {color: "gray"} : {color: "black"}}/>
                <div className="ParentBox">
                  <div className="InnerBox" style={{left: SlideWidth}}>
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
              <IoIosArrowForward className="Icon right" style={EventData.length - 1 === SlideCount && EventData.length !== 0 ? {display: "none"} : {display: "block"}}onClick={() => {setSlideWidth(SlideWidth - EventRef.current.clientWidth - 10); setSlideCount(SlideCount + 1)}}/>
        </div>
      </div>
    
      <Calendar></Calendar>
        
    </div>
  );
}

export default MainPage;
