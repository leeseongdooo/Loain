import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../Css/CharacterEngravings.scss"
import { AiOutlineInfoCircle } from "react-icons/ai";

function EngravingText({Info}) {

    return (
        <div className="EngravingTextBox">
            <p className="TextStyle">{Info.Name}</p>
            <AiOutlineInfoCircle className="Icon" onClick={() => {
                console.log(Info.Description);
            }}/>
        </div>
        
    )
}

function CharacterEngravings() {
    
    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [EquipmentData, setEquipmentData] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [Level, setLevel] = useState([]);

    const GetEquipment = async () =>  {
        try {
            
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/engravings`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            setEquipmentData(response.data.Effects);  
            
            setLevel(response.data.Effects.map((Info) => {
                if(Info.Name.includes("Lv. 3")) {
                    Level.push(3);
                } else if(Info.Name.includes("Lv. 2"))
                {
                    Level.push(2);
                } else if(Info.Name.includes("Lv. 1"))
                {
                    Level.push(1);
                }
            })) 
            console.log(EquipmentData);
            console.log(Level);
           
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      
        GetEquipment();
      
      
    }, [NickName]);
   

    return (
        <div>
            <p className="GuideText" onClick={() => {console.log(Level)}}>각인</p>
            <p></p>
            {EquipmentData !== null ? EquipmentData.map((Info, index) => <EngravingText key={index} Info={Info} />) : <span>로딩중</span>}
        </div>
    )
}

export default CharacterEngravings;