import React, {useState, useEffect} from "react";
import axios from "axios";
import "../Css/GuildRank.scss"

function GuildRank() {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [TodayAdventureIsland, setTodayAdventureIsland] = useState(null);
    
    async function getTodayAdventure() {
        try {
          //응답 성공
          const response = await axios.get(`/gamecontents/calendar`, {
            headers: {Authorization: `bearer ${Key}`}
          });
          let b = response.data.filter(data => data.CategoryName === "모험 섬");
          
          let today = "2023-02-18";
          
          let a = b.map((data) => {
            if(data.StartTimes[0].includes(today))
            {
              console.log(data)
            }
          })
          
          
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }


    useEffect(() => {
        
    }, [])

    return (
        <div>
            <h1>aa</h1>
        </div>
    )
}

export default GuildRank;