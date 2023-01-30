import React, {useState, useEffect} from "react";
import "../Css/Event.scss";
import axios from "axios";


function EventListForm({ListData}) {

    return (
        <div className="PersonalBox">
            <a href={ListData.Link}>
                <img src={ListData.Thumbnail} alt="사진" />
                <p>{ListData.Title}</p>
                <span>{ListData.StartDate.substr(5, 5 )} - {ListData.EndDate.substr(5, 5 )}</span>
            </a>
        </div>
    )
}

function Event() {
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const [EventData, setEventData] = useState([]);
    
    async function getEventData() {
        try {
          //응답 성공
          const response = await axios.get(`https://developer-lostark.game.onstove.com/news/events`, {
            headers: {Authorization: `bearer ${Key}`}
          });
          setEventData(response.data)
          
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }
    useEffect(() => {
        getEventData();
    }, [])
   
    return (
        <>
          
            <div className="FlexBox">
            <h3>현재 이벤트 정보</h3>
                <div className="EventListBox">
                    {
                        EventData.map((Data, index) => 
                            <EventListForm ListData={Data} key={index} />
                        )
                    }
                    ㅇㅇ
                </div>
            </div>
        </>
    )
}

export default Event;