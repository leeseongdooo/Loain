import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import "../Css/MainPage.scss";
import Event from "./Event";
import SearchCharacter from "./SearchCharacter";

function MatchCard({}) {
  return (
    <div className="MatchCard">
      <div className="Top">
        <div className="TextArea">
          <img src="" alt="" />
          <h3>저녁에 같이 레이드 가실분!!</h3>
        </div>

        <AiOutlineStar className="Icons" />
      </div>

      <div className="Middle">
        <p>레이드 : </p>
        <p>모집현황 : </p>
      </div>

      <div className="Bottom">
        <span>존중이리퍼</span>

        <div className="ButtonBox">
          <button>상세보기</button>
          <button>지원하기</button>
        </div>
      </div>
    </div>
  );
}
function MainPage() {
  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";

  const [EventData, setEventData] = useState([]);

  useEffect(() => {
    axios
      .get("https://developer-lostark.game.onstove.com/news/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((Response) => {
        setEventData(Response.data);
        console.log(EventData);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

  console.log("A");

  return (
    <div className="MainPageBox">
      <div className="EventBigBox">
        {EventData.map((data, index) => (
          <a key={index} href={data.Link} className="EventCard">
            <img src={data.Thumbnail} alt={data.Title} />
          </a>
        ))}
      </div>

      <div className="QuickMatchParent">
        <div className="QuickMatchChild">
          <ul className="SelectRaid">
            <li>어비스 레이드</li>
            <li>군단장 레이드</li>
          </ul>

          <div className="MatchBox">
            <ul className="SelectRaidBoss">
              <li className="Valtan">발탄</li>
              <li className="BiaKis">비아키스</li>
              <li className="Kukeu">쿠크세이튼</li>
              <li className="Ave">아브렐슈드</li>
              <li className="Iliy">일리아칸</li>
              <li className="Kman">카멘</li>
            </ul>
            <MatchCard />
          </div>
        </div>
      </div>

      <Event />
      <SearchCharacter/>
    </div>
  );
}

export default MainPage;
