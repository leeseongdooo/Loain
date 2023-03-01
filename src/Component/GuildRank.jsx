import React, {useState, useEffect} from "react";
import axios from "axios";
import "../Css/GuildRank.scss"

function GuildRank() {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    // 루페온, 실리안, 아만, 카마인, 카제로스, 아브렐슈드, 카단, 니나브
    const ServerList = ['루페온', '실리안', '아만', '카마인', '카제로스', '아브렐슈드', '카단', '니나브'];

    const [ChooseServer, setChooseServer] = useState("루페온");
    const [GuildData, setGuildData] = useState(null);
    const [ClickNumber, setClickNumber] = useState(0);  

    async function SearchGuild() {
      try {
        const response = await axios.get(`guilds/rankings?serverName=${ChooseServer}`, {
                headers: {Authorization: `bearer ${Key}`}
          }); 
        setGuildData(response.data);
      } catch(Error) {
        console.log(Error);
      }
    }
    
    useEffect(() => {
        SearchGuild();
    }, [ChooseServer])

    return (
        <div className="GuildRankBox">
            <div className="TopArea">
                {ServerList.map((Data, index) => (
                  <div key={index} className="ServerListStyle" style={ClickNumber === index ? {backgroundColor: "royalblue", color: "white"} : {}}>
                    <p onClick={() => {setChooseServer(Data); setClickNumber(index)}}>{Data}</p>
                  </div>
                ))}
            </div>

            <div className="ListFormOutVersion">
                  <p>순위</p>
                  <p>길드명</p>
                  <p>길드원수</p>
                  <p>길드장 닉네임</p>            
            </div>

            <div className="MiddleArea">
                  {GuildData !== null ? GuildData.map((List, index) => (
                    <div className="ListForm" key={index}>
                        <p>{List.Rank}</p>
                        <p>{List.GuildName}</p>
                        <p>{List.MemberCount}명</p>
                        <p>{List.MasterName}</p>
                        
                    </div>
                  )) : ""}
            </div>
            

        </div>
    )
}

export default GuildRank;