import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/MainPage.css";

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

  return (
    <div>
      <h1>컴포넌트입니다.</h1>
      <button
        onClick={() => {
          console.log(EventData);
          console.log(typeof EventData[0].Link);
        }}
      >
        클릭
      </button>

      {EventData.map((data, index) => (
        <>
          <img src={data.Thumbnail} alt={data.Title} />
          <a key={index} href={data.Link} target="_blank">
            {data.Title}
          </a>
        </>
      ))}
    </div>
  );
}

export default MainPage;
