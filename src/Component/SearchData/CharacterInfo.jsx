import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../Css/CharacterInfo.scss";
import CharacterEquipment from "./CharacterEquipment";

function CharacterInfo() {

    const Key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMDExODYifQ.dp5Rwt6qAxGWBF6L00JpgQ8FRk0LC2McvjnYrcIdaVmlW1lcMOhWfDEuQ3d8PBB_bUevh03dw6Shx3sc8_X_B_cUja3eONQ0MWPPa9ZRvHYBjaBn4RPl4pe_M5quBOaQVhTBhcxNYJoCxVQhHfwf_0K0rmAEDHYdSICEIpeD-Ve8WaEBm7JXa36RBP-vefRtcIZh1O35knWa4bXCjuT4rodTYx4WiE_bt4sCUGfaPfzriAe6P5OjlkGx1YEkk3nYGJCVX-cfdIA5qPAc7612BrjV_YuXx5Qh8XzsPL6m5N9v-h-_GAEW10OWSYvxJabPYV8KhPMKanaEpdrpS6i6jA";
    const NickName = useParams();
    const [SearchCharacter, setSearchCharacter] = useState({});
    


    async function getCharacterInfo() {
        try {
            const response = await axios.get(`https://developer-lostark.game.onstove.com/armories/characters/${NickName.searchCharacter}/profiles`, {
                headers: {Authorization: `bearer ${Key}`}
            });
            console.log(response.data)   
            setSearchCharacter(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }

    console.log(SearchCharacter);
    
    
    useEffect(() => {
        getCharacterInfo();
        
    }, [NickName])
   


    return (
        <div className="CharacterSearchResult">
          
          <div className="profileArea">
            <img src={SearchCharacter.CharacterImage} alt="" className="UserImage" />

            <div className="TextArea">
                <div className="TopArea">
                    <p>{SearchCharacter.ServerName}</p>
                    <p>{SearchCharacter.CharacterClassName}</p>
                </div>

                <div className="MiddleArea">
                     <h2>{SearchCharacter.CharacterName}</h2>
                     <p>칭호: {SearchCharacter.Title}</p>
                     <p>영지: Lv{SearchCharacter.TownLevel} {SearchCharacter.TownName}</p>
                     <p>길드명: {SearchCharacter.GuildName}</p>
                </div>
            

                <div className="BottomArea">
                    <p>아이템 <br/> {SearchCharacter.ItemAvgLevel}</p>
                    <p>전투 <br/> {SearchCharacter.CharacterLevel}</p>
                    <p>원정대 <br/> {SearchCharacter.ExpeditionLevel}</p>
                    <p>스킬포인트 <br/> {SearchCharacter.UsingSkillPoint} / {SearchCharacter.TotalSkillPoint}</p>
                    <p>PVP <br/> {SearchCharacter.PvpGradeName}</p>
                </div>
            </div>
          </div>

          <div className="Specifications">
                  <CharacterEquipment/>
          </div>

          

        </div>
    )
}

export default CharacterInfo;